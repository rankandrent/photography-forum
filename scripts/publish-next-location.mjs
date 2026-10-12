// Location publisher (run hourly by .github/workflows/publish-location.yml).
// Publishes at most 3 location pages per week, on 3 random days at random
// hours, so new city pages do not land on a fixed daily pattern. Each run
// publishes ONE page (the lowest `order` draft with content) only when a
// slot of this week has come due and has not been used yet; a slot missed by
// a delayed or skipped run is caught up by a later run (never 2 on one day).
// Flags: --force publishes now; --plan prints this week's slots and exits.
import fs from "node:fs";
import path from "node:path";

const DIR = "content/locations";
const PER_WEEK = 3;
const HOURS = [13, 23]; // UTC window, about 9am–7pm US Eastern

const now = new Date();
const today = now.toISOString().slice(0, 10);
const force = process.argv.includes("--force");

// Monday 00:00 UTC of the current week
const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - ((now.getUTCDay() + 6) % 7)));
const weekKey = monday.toISOString().slice(0, 10);

// Seeded PRNG: the same week always yields the same slots, so hourly runs agree
let seed = [...`locations:${weekKey}`].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 2166136261);
const rnd = () => ((seed = (Math.imul(seed, 1103515245) + 12345) >>> 0) / 2 ** 32);
const days = [0, 1, 2, 3, 4, 5, 6].sort(() => rnd() - 0.5).slice(0, PER_WEEK).sort((a, b) => a - b);
const slots = days.map((d) => {
  const t = new Date(monday);
  t.setUTCDate(t.getUTCDate() + d);
  t.setUTCHours(HOURS[0] + Math.floor(rnd() * (HOURS[1] - HOURS[0])), Math.floor(rnd() * 60));
  return t;
});

if (process.argv.includes("--plan")) {
  console.log(`Week of ${weekKey}: ${slots.map((t) => t.toISOString().slice(0, 16).replace("T", " ")).join(", ")} UTC`);
  process.exit(0);
}

const pages = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .map((f) => ({ file: path.join(DIR, f), data: JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) }));

if (!force) {
  // never publish twice on the same day (re-runs, manual dispatch)
  if (pages.some((p) => p.data.published === today)) {
    console.log(`A location page was already published today (${today}).`);
    process.exit(0);
  }
  const due = slots.filter((t) => t <= now).length;
  const done = pages.filter((p) => p.data.published && p.data.published >= weekKey && !p.data.draft).length;
  if (done >= due) {
    console.log(`No slot due (${done}/${PER_WEEK} published this week; next: ${slots.find((t) => t > now)?.toISOString() ?? "next week"}).`);
    process.exit(0);
  }
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
