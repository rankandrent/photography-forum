import "dotenv/config";
/**
 * Bulk-creates topic tags from prisma/topic-tags.json.
 *
 *   npm run seed:tags
 *
 * The JSON carries the counts they were imported with, purely so the ordering
 * below can put the well-used ones first; nothing stores them. A tag's real
 * count on this forum is derived from its threads, and starts at zero.
 *
 * Re-running is safe — tags are upserted by slug, and existing ones keep the
 * name they already have.
 */
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { slugify } from "../src/lib/slug.js";
import { readFile } from "node:fs/promises";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

type Entry = { name: string; count: number };

async function main() {
  const raw = await readFile(new URL("../prisma/topic-tags.json", import.meta.url), "utf8");
  const entries = JSON.parse(raw) as Entry[];

  // Several names collapse to the same slug ("price alerts" / "price-alerts",
  // "M4/3" / "M43"). They are the same topic, so the first one wins — the file
  // is ordered by count, which makes that the more commonly used spelling.
  const bySlug = new Map<string, string>();
  for (const entry of [...entries].sort((a, b) => b.count - a.count)) {
    const slug = slugify(entry.name);
    if (!slug || bySlug.has(slug)) continue;
    bySlug.set(slug, entry.name.trim());
  }

  console.log(`${entries.length} entries → ${bySlug.size} unique slugs.`);

  const existing = new Set(
    (await prisma.tag.findMany({ select: { slug: true } })).map((t) => t.slug),
  );

  const toCreate = [...bySlug]
    .filter(([slug]) => !existing.has(slug))
    .map(([slug, name]) => ({ slug, name }));

  if (toCreate.length === 0) {
    console.log("Nothing new to add.");
    return;
  }

  // One statement per batch rather than 1,000 round trips — over a connection
  // pooler that difference is minutes, not milliseconds.
  const BATCH = 200;
  let added = 0;
  for (let i = 0; i < toCreate.length; i += BATCH) {
    const chunk = toCreate.slice(i, i + BATCH);
    const result = await prisma.tag.createMany({ data: chunk, skipDuplicates: true });
    added += result.count;
    console.log(`  ${Math.min(i + BATCH, toCreate.length)}/${toCreate.length}`);
  }

  const total = await prisma.tag.count();
  console.log(`Added ${added}. The forum now has ${total} tags.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
