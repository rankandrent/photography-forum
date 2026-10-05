// Internal-link opportunities ("use the topical authority you already have").
// Finds built pages that already talk about a topic but don't link to the target page,
// so a contextual link can move that relevance to the page that best satisfies the intent.
//
//   npm run build && node scripts/link-opportunities.mjs "<target path>" "<phrase>" ["<phrase>" ...]
//   e.g. node scripts/link-opportunities.mjs /blog/choose-ux-research-agency/ "ux research agency" "research partner"
//
// Output: per source page — the section (with its #id for a jump link), the sentence containing the
// phrase, and whether the page is a conversion page (contact, BOFU landing pages: link sparingly).
import fs from "node:fs";
import path from "node:path";

const [target, ...phrases] = process.argv.slice(2);
if (!target || !phrases.length) {
  console.error('usage: node scripts/link-opportunities.mjs "/target/path/" "phrase" ["phrase" ...]');
  process.exit(1);
}
const OUT = "out";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;/g, "'").replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ");
const CONVERSION = /^\/(contact|privacy|terms)\//;
const res = phrases.map((p) => new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}\\b`, "i"));

const rows = [];
for (const file of walk(OUT).filter((f) => f.endsWith("index.html"))) {
  const html = fs.readFileSync(file, "utf8");
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  const route = "/" + path.relative(OUT, path.dirname(file)).replace(/\\/g, "/") + (path.dirname(file) === OUT ? "" : "/");
  if (route === target) continue;
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const linked = main.includes(`href="${target}"`);
  // split main into sections by elements with an id (sections and h2s)
  const parts = main.split(/(?=<(?:section|h2)[^>]*\sid="[^"]+")/);
  for (const part of parts) {
    const id = part.match(/^<(?:section|h2)[^>]*\sid="([^"]+)"/)?.[1] ?? "";
    for (const para of part.match(/<(p|li|td)[^>]*>[\s\S]*?<\/\1>/g) ?? []) {
      if (/<a\b/.test(para) && para.includes(`href="${target}"`)) continue;
      const text = strip(para).trim();
      const hit = res.find((r) => r.test(text));
      if (!hit) continue;
      const sentence = text.split(/(?<=[.!?])\s+/).find((s) => hit.test(s)) ?? text;
      rows.push({ route, section: id ? `#${id}` : "", alreadyLinksTarget: linked, conversionPage: CONVERSION.test(route), phrase: text.match(hit)[0], sentence: sentence.slice(0, 220) });
    }
  }
}
// best sources first: pages that don't link yet, informational before conversion pages
rows.sort((a, b) => Number(a.alreadyLinksTarget) - Number(b.alreadyLinksTarget) || Number(a.conversionPage) - Number(b.conversionPage) || a.route.localeCompare(b.route));
const seen = new Set();
const unique = rows.filter((r) => { const k = r.route + r.sentence; if (seen.has(k)) return false; seen.add(k); return true; });
console.log(`Target ${target} — ${unique.length} mentions on ${new Set(unique.map((r) => r.route)).size} pages\n`);
for (const r of unique.slice(0, 60)) {
  console.log(`${r.route}${r.section}${r.alreadyLinksTarget ? "  (already links target)" : ""}${r.conversionPage ? "  (conversion page: skip)" : ""}\n   "${r.phrase}" → ${r.sentence}\n`);
}
