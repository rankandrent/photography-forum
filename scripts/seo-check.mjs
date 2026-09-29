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
for (const [t, r] of titles) if (t && r.length > 1) report("warn", OUT, `duplicate title on ${r.join(", ")}`);
for (const [d, r] of descs) if (d && r.length > 1) report("warn", OUT, `duplicate description on ${r.join(", ")}`);

console.log(`\n${pages.length} pages checked · ${errors} errors · ${warnings} warnings`);
process.exit(errors ? 1 : 0);
