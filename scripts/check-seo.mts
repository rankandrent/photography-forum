/**
 * SEO smoke test.
 *
 * Every tag checked here has been silently missing at some point: the homepage
 * shipped without an og:image for weeks, boards carried no CollectionPage, and
 * pages meant to be crawlable-but-unindexed were sending `nofollow`, which
 * stopped crawlers walking through to the threads.
 *
 * Run it against production after a deploy, or against a dev server:
 *   npm run check:seo
 *   npm run check:seo -- http://localhost:3000
 */

const base = (process.argv[2] ?? "https://photographyforum.net").replace(/\/$/, "");

type Check = { name: string; pass: boolean; detail: string };

function meta(html: string, attr: "name" | "property", key: string): string | null {
  const re = new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`, "i");
  const alt = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${key}"`, "i");
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? null;
}

function jsonLdTypes(html: string): Set<string> {
  return new Set([...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1]));
}

async function get(path: string) {
  const res = await fetch(`${base}${path}`, { redirect: "follow" });
  return { status: res.status, html: await res.text(), headers: res.headers };
}

const checks: Check[] = [];
const add = (name: string, pass: boolean, detail = "") => checks.push({ name, pass, detail });

// ---------------------------------------------------------------- homepage
{
  const { status, html } = await get("/");
  add("home responds 200", status === 200, `status ${status}`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  add("home <title> present", title.length > 0, title);
  add("home <title> <= 70 chars", title.length > 0 && title.length <= 70, `${title.length} chars`);

  const desc = meta(html, "name", "description") ?? "";
  add("home description 120-165 chars", desc.length >= 120 && desc.length <= 165, `${desc.length} chars`);

  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1] ?? "";
  add("home canonical on this host", canonical.startsWith(base), canonical || "(missing)");

  add("home viewport meta", /name="viewport"/.test(html));

  for (const [attr, key] of [
    ["property", "og:title"],
    ["property", "og:description"],
    ["property", "og:image"],
    ["name", "twitter:card"],
    ["name", "twitter:image"],
  ] as const) {
    const v = meta(html, attr, key);
    add(`home ${key}`, Boolean(v), v ?? "(missing)");
  }

  const types = jsonLdTypes(html);
  add("home WebSite schema", types.has("WebSite"));
  add("home SearchAction schema", types.has("SearchAction"));
}

// ------------------------------------------------------------ og image route
{
  const res = await fetch(`${base}/og?title=check`);
  const ct = res.headers.get("content-type") ?? "";
  add("/og renders an image", res.status === 200 && ct.startsWith("image/"), `${res.status} ${ct}`);
}

// ------------------------------------------------------------- board page
{
  const { status, html } = await get("/c/gear-talk");
  add("board responds 200", status === 200, `status ${status}`);
  const types = jsonLdTypes(html);
  add("board CollectionPage schema", types.has("CollectionPage"));
  add("board BreadcrumbList schema", types.has("BreadcrumbList"));
  add("board og:image", Boolean(meta(html, "property", "og:image")));
}

// -------------------------------------------------------------- thread page
{
  const sitemap = await (await fetch(`${base}/sitemap-posts.xml`)).text();
  const threadUrl = sitemap.match(/<loc>([^<]*\/t\/[^<]*)<\/loc>/)?.[1];
  if (!threadUrl) {
    add("found a thread URL in sitemap-posts.xml", false, "no /t/ URL");
  } else {
    const html = await (await fetch(threadUrl)).text();
    const types = jsonLdTypes(html);
    add("thread DiscussionForumPosting schema", types.has("DiscussionForumPosting"));
    add("thread InteractionCounter schema", types.has("InteractionCounter"));
    add("thread og:image", Boolean(meta(html, "property", "og:image")));
  }
}

// ------------------------------------------------------------ robots/sitemaps
{
  const robots = await get("/robots.txt");
  add("robots.txt responds 200", robots.status === 200);
  const sitemapLine = robots.html.match(/^Sitemap:\s*(\S+)/im)?.[1];
  add("robots.txt declares a sitemap", Boolean(sitemapLine), sitemapLine ?? "(missing)");
  if (sitemapLine) {
    const res = await fetch(sitemapLine);
    add("declared sitemap responds 200", res.status === 200, `${sitemapLine} -> ${res.status}`);
  }
}

// ------------------------------------------------- noindex pages stay followable
for (const path of ["/login", "/register"]) {
  const { html } = await get(path);
  const robots = meta(html, "name", "robots") ?? "";
  add(`${path} is not nofollow`, !/nofollow/i.test(robots), robots || "(none)");
}

// ------------------------------------------------------------------- report
const failed = checks.filter((c) => !c.pass);
for (const c of checks) {
  console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.name}${c.detail ? `  — ${c.detail}` : ""}`);
}
console.log(`\n${checks.length - failed.length}/${checks.length} passed against ${base}`);
if (failed.length) process.exit(1);
