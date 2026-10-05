// Pulls Google Search Console data for the site and saves it for the content agents.
// Run by .github/workflows/gsc-data.yml. Needs two env vars (GitHub secrets):
//   GSC_SERVICE_ACCOUNT  the service-account JSON key (whole file contents)
//   GSC_PROPERTY         e.g. "sc-domain:uiuxdesignservices.us" (domain property)
// No dependencies: signs the OAuth JWT with node:crypto.
import crypto from "node:crypto";
import fs from "node:fs";

const sa = JSON.parse(process.env.GSC_SERVICE_ACCOUNT || "{}");
const property = process.env.GSC_PROPERTY || "sc-domain:uiuxdesignservices.us";
if (!sa.client_email || !sa.private_key) {
  console.error("GSC_SERVICE_ACCOUNT secret is missing or not a service-account JSON key.");
  process.exit(1);
}

const b64 = (x) => Buffer.from(typeof x === "string" ? x : JSON.stringify(x)).toString("base64url");
async function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: "RS256", typ: "JWT" });
  const claim = b64({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 });
  const sig = crypto.createSign("RSA-SHA256").update(`${head}.${claim}`).sign(sa.private_key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claim}.${sig}` }),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error(`token error: ${JSON.stringify(j)}`);
  return j.access_token;
}

const day = (d) => new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);
// GSC data lags ~2-3 days; use the last 28 complete days
const range = { startDate: day(30), endDate: day(3) };

async function query(access, dimensions, rowLimit = 1000) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${access}`, "content-type": "application/json" },
    body: JSON.stringify({ ...range, dimensions, rowLimit, dataState: "final" }),
  });
  const j = await res.json();
  if (j.error) throw new Error(`${dimensions.join("+")}: ${j.error.message}`);
  return (j.rows ?? []).map((r) => ({
    ...Object.fromEntries(dimensions.map((d, i) => [d, r.keys[i]])),
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: Math.round(r.ctr * 10000) / 100,
    position: Math.round(r.position * 10) / 10,
  }));
}

const access = await token();
const [queries, pages, queryPage, countries] = await Promise.all([
  query(access, ["query"]),
  query(access, ["page"]),
  query(access, ["query", "page"], 5000),
  query(access, ["country"], 50),
]);
// Striking distance: queries ranking 5–20 with real impressions — the auditor's first targets
const striking = queryPage.filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 10).sort((a, b) => b.impressions - a.impressions).slice(0, 200);

const out = { property, range, fetched: new Date().toISOString(), totals: { clicks: pages.reduce((s, r) => s + r.clicks, 0), impressions: pages.reduce((s, r) => s + r.impressions, 0) }, striking, queries, pages, queryPage, countries };
fs.mkdirSync("docs/data/gsc", { recursive: true });
fs.writeFileSync("docs/data/gsc/latest.json", JSON.stringify(out, null, 1) + "\n");
fs.writeFileSync(`docs/data/gsc/summary-${range.endDate}.json`, JSON.stringify({ range, totals: out.totals, top: queries.slice(0, 50), striking: striking.slice(0, 50) }, null, 1) + "\n");
console.log(`GSC ${range.startDate}..${range.endDate}: ${queries.length} queries, ${pages.length} pages, ${striking.length} striking-distance rows, ${out.totals.clicks} clicks / ${out.totals.impressions} impressions`);
