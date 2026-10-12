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

// entities, attributes and keyword volume per route (blog: content brief; others: page "semantic" block)
const ENT = {}, ATTR = {}, VOL = {};
const semEnt = (d) => d.semantic?.entities ?? d.mentions ?? [];
for (const dir of ["services", "industries", "locations"]) for (const f of fs.readdirSync(`content/${dir}`).filter((x) => x.endsWith(".json") && !x.startsWith("_"))) ENT[`/${dir === "locations" ? "location" : dir}/${f.slice(0, -5)}/`] = semEnt(read(`content/${dir}/${f}`));
for (const f of fs.readdirSync("content/briefs").filter((x) => /^[^.]+\.json$/.test(x))) {
  const b = read(`content/briefs/${f}`), r = `/blog/${b.slug ?? f.slice(0, -5)}/`;
  ENT[r] = b.entities ?? []; ATTR[r] = b.attributes ?? []; VOL[r] = b.volume;
}
// an entity counts as covered when its name, or the short form in its brackets, appears in the text
const entityForms = (e) => { const m = e.match(/^(.*?)\s*\(([^)]+)\)\s*$/); return (m ? [m[1], m[2]] : [e]).map((x) => norm(x)).filter((x) => x.length > 1); };
const countIn = (text, form) => text.split(form).length - 1;

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
    // primary keyword in every meta surface: title, description, meta keywords (first), Open Graph
    const ogTitle = h.match(/<meta property="og:title" content="([^"]*)"/)?.[1]?.replace(/&amp;/g, "&") ?? "";
    const ogDesc = h.match(/<meta property="og:description" content="([^"]*)"/)?.[1]?.replace(/&amp;/g, "&") ?? "";
    const metaKw = (h.match(/<meta name="keywords" content="([^"]*)"/)?.[1] ?? "").replace(/&amp;/g, "&").split(",")[0] ?? "";
    add("meta-keywords-keyword", norm(metaKw) === norm(kw), `meta keywords start with "${kw}" (first is "${metaKw}")`);
    add("og-keyword", has(ogTitle, kw) && has(ogDesc, kw), "og:title and og:description contain the keyword");
    if (isBlog && VOL[p.route] !== undefined) add("keyword-volume", Number(VOL[p.route]) > 0, `keyword has search volume (brief: ${VOL[p.route]})`);
    // entity salience (proxy for Google NLP salience): the keyword's entity leads the page, and related entities/attributes are covered
    const ents = ENT[p.route] ?? [];
    if (isContent && ents.length) {
      const text = norm(body), lead = norm(body.slice(body.indexOf(h1) + h1.length).split(" ").slice(0, 60).join(" "));
      const covered = ents.filter((e) => entityForms(e).some((f) => text.includes(f)));
      const kwCount = countIn(text, norm(kw));
      // rivals: related entities that are not part of the keyword itself (e.g. the city on a location page)
      const kwWords = new Set(norm(kw).split(" "));
      const rivals = ents.filter((e) => !entityForms(e).some((f) => f.split(" ").every((w) => kwWords.has(w)))).map((e) => Math.max(...entityForms(e).map((f) => countIn(text, f))));
      const h2Share = h2s.length ? h2s.filter((x) => has(x, kw) || norm(kw).split(" ").filter((w) => w.length > 3).some((w) => norm(x).includes(w))).length / h2s.length : 0;
      const salience = Math.round(25 * +has(h1, kw) + 25 * +has(lead, kw) + 25 * Math.min(1, h2Share / 0.4) + 25 * +(kwCount >= Math.max(0, ...rivals) * 0.5));
      add("entity-coverage", covered.length / ents.length >= 0.8, `≥ 80% of related entities in the text (${covered.length}/${ents.length}${covered.length < ents.length ? "; missing: " + ents.filter((e) => !covered.includes(e)).slice(0, 5).join(", ") : ""})`, 2);
      add("entity-salience", salience >= 75, `central entity salience ≥ 75 (is ${salience}: H1 ${+has(h1, kw)}, lead ${+has(lead, kw)}, H2 share ${Math.round(h2Share * 100)}%, keyword ${kwCount}× vs top related entity ${Math.max(0, ...rivals)}×)`, 2);
      const attrs = ATTR[p.route] ?? [];
      if (attrs.length) {
        const hitA = attrs.filter((a) => { const ws = norm(a.split("(")[0]).split(" ").filter((w) => w.length > 3); return ws.filter((w) => text.includes(w.replace(/s$/, ""))).length >= Math.ceil(ws.length * 0.6); });
        add("attribute-coverage", hitA.length / attrs.length >= 0.7, `≥ 70% of brief attributes covered (${hitA.length}/${attrs.length})`);
      }
    }
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
  // layout-aware document understanding (Google patent US12393768B2): visible blocks, clear block types,
  // images next to the text they explain, tables introduced by text, nothing important behind a click
  if (isContent) {
    // explanatory images only (in-article visuals, case-study screens, location illustrations);
    // covers, logos, team photos and card thumbnails are not explanatory blocks
    const figs = [...main.matchAll(/<img\b[^>]*>/g)].filter((m) => /src="\/(blog\/[^"]+\/(?!cover)|work\/[^"]+\/(?!cover)|locations\/)/.test(m[0]) && !/<a\b(?:(?!<\/a>)[\s\S])*$/.test(main.slice(Math.max(0, m.index - 600), m.index)));
    const bare = figs.filter((m) => { const before = main.slice(Math.max(0, m.index - 400), m.index), after = main.slice(m.index, m.index + 600); return !(/<figure[^>]*>(?:(?!<\/figure>)[\s\S])*$/.test(before) && /<figcaption/.test(after)); });
    add("figure-caption", bare.length === 0, `every content image sits in <figure> with a <figcaption> (${bare.length} without)`);
    const tables = [...main.matchAll(/<table\b/g)].filter((m) => !/class="astext"(?:(?!<\/div>)[\s\S])*$/.test(main.slice(Math.max(0, m.index - 300), m.index)));
    const lone = tables.filter((m) => !/<\/(p|h2|h3|figure)>$/.test(main.slice(Math.max(0, m.index - 400), m.index).replace(/<\/?div\b[^>]*>|\s+/g, "")));
    add("table-intro", lone.length === 0, `every table follows a paragraph or heading that introduces it (${lone.length} without)`);
    const h2Next = [...main.matchAll(/<\/h2>\s*(?:<\/div>\s*)?<([a-z0-9]+)/g)].map((m) => m[1]);
    const badH2 = h2Next.filter((t) => ["img", "figure", "picture", "svg", "video"].includes(t)).length;
    add("h2-then-text", badH2 === 0, `every H2 is followed by text, not an image (${badH2} not)`);
    const hidden = [...main.matchAll(/<details\b([^>]*)>/g)].filter((m) => !/faq|ptoc|hdr__|cap__item|svc-acc/.test(m[1])).length;
    const longBodies = [...main.matchAll(/class="semv__more-body"[^>]*>([\s\S]*?)<\/div>/g)].filter((m) => words(strip(m[1])) > 90).length;
    add("section-body-short", longBodies === 0, `section detail text ≤ 90 words, entity-dense, no filler (${longBodies} longer)`);
    add("no-hidden-content", hidden === 0, `no main content behind a click: only FAQs and navigation may collapse (${hidden} collapsed blocks)`, 2);
  }
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
