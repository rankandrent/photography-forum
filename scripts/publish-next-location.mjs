// Daily publisher (run by .github/workflows/publish-location.yml).
// Publishes ONE location page per run: the lowest `order` draft that already has
// content (at least one section). Prints the published slug, or nothing to do.
import fs from "node:fs";
import path from "node:path";

const DIR = "content/locations";
const today = new Date().toISOString().slice(0, 10);
const pages = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .map((f) => ({ file: path.join(DIR, f), data: JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) }));

// never publish twice on the same day (re-runs, manual dispatch)
if (pages.some((p) => p.data.published === today) && !process.argv.includes("--force")) {
  console.log(`A location page was already published today (${today}).`);
  process.exit(0);
}

const next = pages
  .filter((p) => p.data.draft && (p.data.sections?.length ?? 0) > 0)
  .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))[0];

if (!next) {
  console.log("No draft location page with content is waiting.");
  process.exit(0);
}

delete next.data._note;
next.data.draft = false;
next.data.published = today;
next.data.updated = today;
fs.writeFileSync(next.file, JSON.stringify(next.data, null, 2) + "\n");
console.log(`Published ${path.basename(next.file, ".json")}`);
const queue = pages.filter((p) => p.data.draft && p !== next).length;
console.log(`${queue} draft page(s) left in the queue.`);
