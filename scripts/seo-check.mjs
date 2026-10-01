// Audits the static export in ./out — run after `npm run build`:  npm run seo:check
// Checks every indexable page for: one <h1>, title & description length, canonical,
// og:image, img alt text, valid JSON-LD, and broken internal links / missing OG images.
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const exists = (href) => {
  const p = path.join(OUT, decodeURI(href));
  return fs.existsSync(p) && fs.statSync(p).isFile() ? true : fs.existsSync(path.join(p, "index.html"));
};

const pages = walk(OUT).filter((f) => f.endsWith("index.html"));
let errors = 0, warnings = 0;
const report = (lvl, file, msg) => { if (lvl === "error") errors++; else warnings++; console.log(`${lvl === "error" ? "✗" : "!"} ${file.replace(OUT, "") || "/"}  ${msg}`); };
const titles = new Map(), descs = new Map();

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  const route = "/" + path.relative(OUT, path.dirname(file)).replace(/\\/g, "/");
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const h1s = (html.match(/<h1[\s>]/g) || []).length;

  if (h1s !== 1) report("error", file, `expected 1 <h1>, found ${h1s}`);
  if (!title) report("error", file, "missing <title>");
  else if (title.length > 65) report("warn", file, `title is ${title.length} chars (aim ≤ 60): "${title}"`);
  if (!desc) report("error", file, "missing meta description");
  else if (desc.length < 70 || desc.length > 160) report("warn", file, `description is ${desc.length} chars (aim 70–160)`);
  if (!/<link rel="canonical"/.test(html)) report("error", file, "missing canonical");
  const og = html.match(/<meta property="og:image" content="https?:\/\/[^/]+([^"]+)"/)?.[1];
  if (!og) report("error", file, "missing og:image");
  else if (!exists(og.split("?")[0])) report("error", file, `og:image file not found: ${og}`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\balt="/.test(img)) report("error", file, `img without alt: ${img.slice(0, 80)}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { report("error", file, "invalid JSON-LD"); }
  }
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (!href.startsWith("/_next") && !exists(href)) report("error", file, `broken link → ${href}`);
  }
  titles.set(title, [...(titles.get(title) || []), route]);
  descs.set(desc, [...(descs.get(desc) || []), route]);
}
// ---- Semantic-SEO checks (Koray-style) on service & industry pages ----
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ");
const words = (t) => (t.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []).length;
const BOILERPLATE_H2 = /^(frequently asked questions|related ui ux design services|ready to launch|not sure where your design|send us your project)/i;
const SUPPLEMENTARY_H2 = /(by industry|case studies|insights|faqs|services for)$/;
const thin = [], noImage = [], h2Patterns = new Map(), anchors = new Map();

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  const route = "/" + path.relative(OUT, path.dirname(file)).replace(/\\/g, "/") + "/";
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";

  // anchor text per internal target (short anchors only — cards wrap whole blocks)
  for (const [, href, inner] of main.matchAll(/<a[^>]*href="(\/(?:services|industries)\/[^"#?]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const text = strip(inner).replace(/\s+/g, " ").replace(/[→]/g, "").trim().toLowerCase();
    if (!text || text.length > 60 || /^(all |view all|explore|our )/.test(text)) continue;
    if (!anchors.has(href)) anchors.set(href, new Set());
    anchors.get(href).add(text);
  }

  if (!/^\/(services|industries)\/[^/]+\/$/.test(route)) continue;
  // main content = hero + abstract + semantic sections + FAQ (shared blocks excluded)
  const mainBits = [
    ...main.matchAll(/<section class="phero[\s\S]*?<\/section>/g),
    ...main.matchAll(/<section class="sem-abstract[\s\S]*?<\/section>/g),
    ...main.matchAll(/<section[^>]*class="[^"]*\bsem\b[\s\S]*?<\/section>/g),
    ...main.matchAll(/<section[^>]*id="faq"[\s\S]*?<\/section>/g),
  ].map((m) => m[0]).join(" ");
  const wc = words(strip(mainBits));
  if (wc < 600) thin.push(`${route} (${wc})`);
  if (!/<img\b/.test(main)) noImage.push(route);

  // templated heading vectors: H2s with the page's own H1 words removed
  const svcFile = /^\/(services|industries)\//.test(route) && path.join("content", route.replace(/\/$/, "") + ".json");
  const svc = svcFile && fs.existsSync(svcFile) ? JSON.parse(fs.readFileSync(svcFile, "utf8")) : {};
  const h1Words = new Set(strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "") + " " + (svc.centralEntity ?? "") + " " + (svc.anchor ?? "")).toLowerCase().match(/[a-z0-9-]+/g) || []);
  for (const [, h] of main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
    const text = strip(h).replace(/\s+/g, " ").trim();
    if (BOILERPLATE_H2.test(text)) continue;
    // query-shaped H2s that carry the page's own central entity are intentional
    if (svc.centralEntity && text.toLowerCase().includes(svc.centralEntity.toLowerCase())) continue;
    const pattern = text.toLowerCase().split(/\s+/).filter((w) => !h1Words.has(w)).join(" ");
    // supplementary blocks (industry chips, case studies, insights, FAQs) are shared on purpose
    if (!pattern || SUPPLEMENTARY_H2.test(pattern)) continue;
    if (!h2Patterns.has(pattern)) h2Patterns.set(pattern, []);
    h2Patterns.get(pattern).push(route);
  }
}
if (thin.length) report("warn", OUT, `${thin.length} service/industry pages have < 600 words of main content: ${thin.join(", ")}`);
if (noImage.length) report("warn", OUT, `${noImage.length} service/industry pages have no image (visual semantics)`);
for (const [pattern, r] of h2Patterns) if (r.length >= 3) report("warn", OUT, `templated H2 "${pattern}" repeated on ${r.length} pages`);
for (const [href, set] of anchors) if (set.size > 2) report("warn", OUT, `${href} is linked with ${set.size} different anchors: ${[...set].join(" | ")}`);

for (const [t, r] of titles) if (t && r.length > 1) report("warn", OUT, `duplicate title on ${r.join(", ")}`);
for (const [d, r] of descs) if (d && r.length > 1) report("warn", OUT, `duplicate description on ${r.join(", ")}`);

// ---- Writing-rule lint (Koray rules) on content/services/*.json ----
const BANNED = [/\bAlso,/, /\bAs (stated|mentioned|explained)\b/i, /\bAccording to\b/i, /should know/i, /In today's/i, /It is important to note/i, /\bIn conclusion\b/i, /\bdelve\b/i, /\bleverage\b/i, /\bseamless/i, /cutting-edge/i, /world-class/i];
const HEDGES = /\b(might|may|could|perhaps|possibly)\b/i;
const BOOL_Q = /^(is|are|do|does|did|can|will|should|would|has|have)\b/i;
const ABBR = { UX: "user experience", UI: "user interface", IA: "information architecture", WCAG: "Web Content Accessibility Guidelines", SUS: "System Usability Scale", KPI: "key performance indicator", MVP: "minimum viable product", HIG: "Human Interface Guidelines" };
const LINT_DIRS = ["content/services", "content/industries"];
let lintCount = 0;
let LINT_PREFIX = "/services/";
const lint = (f, msg) => { lintCount++; report("warn", `${LINT_PREFIX}${f}`, `[writing] ${msg}`); };
for (const SVC_DIR of LINT_DIRS) {
LINT_PREFIX = SVC_DIR.replace("content", "") + "/";
for (const f of fs.readdirSync(SVC_DIR).filter((x) => x.endsWith(".json") && !x.startsWith("_"))) {
  const d = JSON.parse(fs.readFileSync(path.join(SVC_DIR, f), "utf8"));
  const slug = f.replace(/\.json$/, "");
  if (!d.sections?.length) { lint(slug, "no semantic sections"); continue; }
  const texts = [["abstract", d.abstract ?? ""]];
  d.sections.forEach((sec, i) => {
    if (!sec.answer) lint(slug, `section ${i + 1} "${sec.h2}" has no answer`);
    else if (!/<strong>/.test(sec.answer)) lint(slug, `section ${i + 1} "${sec.h2}" answer is not bold`);
    texts.push([sec.h2, [sec.answer, sec.body, sec.caption, ...(sec.items ?? []).map((x) => (typeof x === "string" ? x : `${x.title} ${x.body}`)), ...(sec.rows ?? []).flat(), ...(sec.h3s ?? []).map((h) => `${h.h3} ${h.body}`)].filter(Boolean).join(" ")]);
    for (const q of [...(sec.faqs ?? []), ...(d.faqs ?? [])]) {
      texts.push([q.q, `${q.q} ${q.a}`]);
      if (BOOL_Q.test(q.q) && !/^(yes|no)\b/i.test(strip(q.a).trim())) lint(slug, `boolean FAQ "${q.q}" does not start with Yes/No`);
    }
  });
  const all = strip(texts.map((t) => t[1]).join(" ")).replace(/\s+/g, " ");
  for (const [where, t] of texts) {
    const plain = strip(t);
    for (const re of BANNED) if (re.test(plain)) lint(slug, `banned phrase ${re} in "${where}"`);
    const h = plain.match(HEDGES);
    if (h) lint(slug, `hedge "${h[0]}" in "${where}"`);
  }
  for (const n of d.semantic?.ngrams ?? []) if (!all.toLowerCase().includes(n.toLowerCase())) lint(slug, `n-gram "${n}" missing from page text`);
  const heroText = strip(`${d.hero?.h1 ?? ""} ${d.hero?.sub ?? ""}`);
  for (const [ab, full] of Object.entries(ABBR)) {
    const first = all.search(new RegExp(`\\b${ab}\\b`));
    if (first < 0) continue;
    if (!all.toLowerCase().includes(full.toLowerCase()) && !heroText.toLowerCase().includes(full.toLowerCase())) lint(slug, `abbreviation ${ab} is never expanded ("${full} (${ab})")`);
  }
}
}
if (!lintCount) console.log("✓ writing rules: all service and industry pages pass");

console.log(`\n${pages.length} pages checked · ${errors} errors · ${warnings} warnings`);
process.exit(errors ? 1 : 0);
