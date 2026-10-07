// On-page SEO audit of every indexable built page, following docs/content-system/ONPAGE-CHECKLIST.md
// (based on Semrush's on-page SEO checklist). Run after a build:
//   npm run build && npm run onpage            # all pages → docs/data/onpage/latest.json + summary
//   npm run onpage -- /blog/saas-product-redesign/   # one page, printed
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const OUT = "out";
const only = process.argv[2];
const read = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const lc = (s = "") => s.toLowerCase().replace(/\s+/g, " ").trim();

// target keyword per route, from content
const KW = { "/": "ui ux design services" };
for (const f of fs.readdirSync("content/services").filter((x) => x.endsWith(".json") && !x.startsWith("_"))) KW[`/services/${f.slice(0, -5)}/`] = lc(read(`content/services/${f}`).anchor);
for (const f of fs.readdirSync("content/industries").filter((x) => x.endsWith(".json") && !x.startsWith("_"))) KW[`/industries/${f.slice(0, -5)}/`] = lc(read(`content/industries/${f}`).anchor);
for (const f of fs.readdirSync("content/locations").filter((x) => x.endsWith(".json") && !x.startsWith("_"))) { const d = read(`content/locations/${f}`); KW[`/location/${f.slice(0, -5)}/`] = lc(d.keyword ?? d.anchor); }
for (const f of fs.readdirSync("content/blog").filter((x) => x.endsWith(".md") && !x.startsWith("_"))) { const d = matter(fs.readFileSync(`content/blog/${f}`, "utf8")).data; if (d.keyword) KW[`/blog/${f.slice(0, -3)}/`] = lc(d.keyword); }

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;/g, "'").replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ").trim();
const words = (t) => (t.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []).length;
// hyphen/space variants count as the same word: "e-commerce" = "ecommerce" = "e commerce"
const norm = (s = "") => lc(s).replace(/(?<=[a-z0-9])[-‐‑](?=[a-z0-9])/g, "");
const compact = (s = "") => norm(s).replace(/[\s-]+/g, "");
// keyword match that tolerates word order inside the title/H1 (all words present) and exact phrase
const has = (text, kw) => { const t = norm(text), k = norm(kw), tc = compact(text); return t.includes(k) || tc.includes(compact(kw)) || k.split(" ").filter((w) => w.length > 2).every((w) => t.includes(w) || tc.includes(w)); };

// inbound internal links per route
const pages = walk(OUT).filter((f) => f.endsWith("index.html")).map((file) => ({ file, route: "/" + path.relative(OUT, path.dirname(file)).replace(/\\/g, "/") + (path.dirname(file) === OUT ? "" : "/"), html: fs.readFileSync(file, "utf8") })).filter((p) => !/<meta name="robots" content="noindex/.test(p.html));
const inbound = {};
for (const p of pages) {
  const main = p.html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  for (const [, href] of main.matchAll(/href="(\/[^"#?]*)/g)) if (href !== p.route) (inbound[href] ??= new Set()).add(p.route);
}

const results = [];
for (const p of pages.filter((x) => !only || x.route === only)) {
  const kw = KW[p.route];
  const h = p.html;
  const main = h.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? h;
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, "&") ?? "";
  const desc = h.match(/<meta name="description" content="([^"]*)"/)?.[1]?.replace(/&amp;/g, "&") ?? "";
  const h1 = strip(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "");
  const h2s = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1]));
  const body = strip(main);
  const first100 = body.split(" ").slice(0, 160).join(" ");
  const imgs = [...main.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { try { const d = JSON.parse(m[1]); return [d, ...(d["@graph"] ?? [])]; } catch { return []; } }).map((d) => d["@type"]).flat().filter(Boolean);
  const internalOut = new Set([...main.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]).filter((x) => x !== p.route)).size;
  const externalOut = [...main.matchAll(/href="(https?:\/\/(?!uiuxdesignservices\.us)[^"]+)"/g)].length;
  const slugWords = p.route.split("/").filter(Boolean).pop()?.split("-").length ?? 0;
  const isBlog = p.route.startsWith("/blog/") && KW[p.route];
  // archives, listings and legal pages are judged on meta/links only, not on content depth
  const isContent = p.route === "/" || /^\/(services|industries|location|case-studies)\/[^/]+\/$/.test(p.route) || !!isBlog || p.route === "/about/";
  const checks = [];
  const add = (id, ok, msg, weight = 1) => checks.push({ id, ok, msg, weight });
  if (kw) {
    add("title-keyword", has(title, kw), `title contains "${kw}"`, 2);
    const kw0 = norm(kw).split(" ")[0], at = norm(title).indexOf(kw0);
    add("title-keyword-early", at > -1 && at < 25, "keyword starts in the first ~25 chars of the title");
    add("h1-keyword", has(h1, kw), `H1 contains "${kw}"`, 2);
    add("desc-keyword", has(desc, kw), "meta description contains the keyword");
    add("first-100-words", has(first100, kw), "keyword appears near the top of the page (first ~100 words)");
    if (p.route !== "/") add("slug-keyword", norm(kw).split(" ").filter((w) => w.length > 3).some((w) => compact(p.route).includes(w)), "URL slug carries the keyword");
  }
  add("title-length", title.length >= 30 && title.length <= 60, `title 30–60 chars (is ${title.length})`);
  add("desc-length", desc.length >= 120 && desc.length <= 158, `meta description 120–158 chars (is ${desc.length})`);
  add("one-h1", (main.match(/<h1[\s>]/g) || []).length === 1, "exactly one H1");
  if (isContent) add("h2-structure", h2s.length >= 3, `≥ 3 H2 sections (has ${h2s.length})`);
  add("slug-short", slugWords <= 6, `slug ≤ 6 words (has ${slugWords})`);
  if (isContent) add("content-depth", words(body) >= (isBlog ? 1200 : 600), `${isBlog ? "≥ 1,200" : "≥ 600"} words of content (has ${words(body)})`, 2);
  add("internal-out", internalOut >= (isContent ? 5 : 3), `≥ ${isContent ? 5 : 3} internal links out (has ${internalOut})`);
  add("internal-in", (inbound[p.route]?.size ?? 0) >= (p.route === "/" ? 0 : 3), `≥ 3 pages link here (has ${inbound[p.route]?.size ?? 0})`, 2);
  if (isBlog) add("external-sources", externalOut >= 2, `≥ 2 external sources (has ${externalOut})`);
  add("img-alt", imgs.every((i) => /\balt="[^"]+"/.test(i) || /aria-hidden|role="presentation"|alt=""/.test(i)), "every content image has alt text");
  if (isContent) add("visuals", imgs.length >= (isBlog ? 3 : 1), `${isBlog ? "≥ 3" : "≥ 1"} images (has ${imgs.length})`);
  add("schema", ld.length > 0, `structured data present (${[...new Set(ld)].join(", ") || "none"})`);
  if (isBlog) add("schema-article", ld.includes("BlogPosting"), "BlogPosting schema");
  if (isBlog || /^\/(services|industries|location)\/[^/]+\/$/.test(p.route)) add("faq", ld.includes("FAQPage") || /faq/i.test(h2s.join(" ")), "FAQ section / FAQPage schema");
  add("canonical", /<link rel="canonical"/.test(h), "canonical tag");
  add("og-image", /property="og:image"/.test(h), "Open Graph image");
  const total = checks.reduce((s, c) => s + c.weight, 0), got = checks.filter((c) => c.ok).reduce((s, c) => s + c.weight, 0);
  results.push({ type: isBlog ? "blog" : isContent ? "content" : "archive", route: p.route, keyword: kw ?? null, score: Math.round((got / total) * 100), failed: checks.filter((c) => !c.ok).map((c) => `${c.id}: ${c.msg}`), title, h1, words: words(body) });
}
results.sort((a, b) => a.score - b.score);
if (only) { console.log(JSON.stringify(results[0] ?? { error: "route not found or noindex" }, null, 2)); process.exit(0); }
fs.mkdirSync("docs/data/onpage", { recursive: true });
fs.writeFileSync("docs/data/onpage/latest.json", JSON.stringify({ generated: new Date().toISOString(), pages: results }, null, 1) + "\n");
const avg = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
console.log(`On-page audit: ${results.length} pages · average score ${avg}/100\n`);
for (const r of results.slice(0, 25)) console.log(`${String(r.score).padStart(3)}  ${r.route}${r.failed.length ? "\n      - " + r.failed.join("\n      - ") : ""}`);
