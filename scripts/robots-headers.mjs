// Runs after `next build`: appends one X-Robots-Tag block per exported page to
// out/_headers, copied from that page's <meta name="robots">, so the header and
// the meta tag always agree (index pages vs noindex placeholders).
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const blocks = [];
for (const file of walk(OUT).filter((f) => f.endsWith("index.html")).sort()) {
  const html = fs.readFileSync(file, "utf8");
  const robots = (html.match(/<meta name="googlebot" content="([^"]+)"/) ?? html.match(/<meta name="robots" content="([^"]+)"/))?.[1];
  if (!robots) continue;
  const dir = path.relative(OUT, path.dirname(file)).replace(/\\/g, "/");
  if (dir.startsWith("og") || dir.includes("__empty")) continue;
  const route = dir ? `/${dir}/` : "/";
  blocks.push(`${route}\n  X-Robots-Tag: ${robots}\n`);
}
fs.appendFileSync(path.join(OUT, "_headers"), `\n${blocks.join("\n")}`);
console.log(`robots-headers: ${blocks.length} pages`);
