import "dotenv/config";
/**
 * Seeds the keyword queue.
 *
 * Every row below came out of Ahrefs Keywords Explorer filtered to one thing:
 * queries whose SERP carries the `discussion` feature — the "Discussions and
 * forums" block. That filter is the whole point. It is Google stating, per
 * query, that it wants forum content there, which is why the difficulty numbers
 * are 0-7 on keywords with real volume.
 *
 *   npm run seed:keywords
 *
 * Re-running is safe: keywords are upserted by name, and one already published
 * keeps its status.
 */
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

type Funnel = "TOFU" | "MOFU" | "BOFU";

type Row = {
  keyword: string;
  volume: number;
  difficulty: number;
  trafficPotential: number;
  cluster: string;
  categorySlug: string;
  // TOFU: awareness ("what is X"). MOFU: consideration ("X vs Y", "how to").
  // BOFU: decision ("best X under $500", "is X worth it") — closest to a buy,
  // and where an honest forum answer beats a spec sheet.
  funnel: Funnel;
};

const KEYWORDS: Row[] = [
  // ---- TOFU (awareness) — someone new to the topic, just orienting -----------
  { keyword: "what is a mirrorless camera", volume: 5500, difficulty: 0, trafficPotential: 4700, cluster: "Mirrorless vs DSLR", categorySlug: "gear-talk", funnel: "TOFU" },
  { keyword: "how to learn photography", volume: 1800, difficulty: 0, trafficPotential: 3800, cluster: "Learning", categorySlug: "technique", funnel: "TOFU" },
  { keyword: "what is dslr vs mirrorless", volume: 200, difficulty: 2, trafficPotential: 4800, cluster: "Mirrorless vs DSLR", categorySlug: "gear-talk", funnel: "TOFU" },
  { keyword: "how to clean camera lens", volume: 1300, difficulty: 7, trafficPotential: 800, cluster: "Care", categorySlug: "technique", funnel: "TOFU" },
  { keyword: "what's the difference between lightroom and lightroom classic", volume: 200, difficulty: 0, trafficPotential: 800, cluster: "Lightroom", categorySlug: "editing", funnel: "TOFU" },

  // ---- MOFU (consideration) — comparing, deciding how, weighing options ------
  { keyword: "is mirrorless better than dslr", volume: 400, difficulty: 3, trafficPotential: 1000, cluster: "Mirrorless vs DSLR", categorySlug: "gear-talk", funnel: "MOFU" },
  { keyword: "is dslr or mirrorless better", volume: 200, difficulty: 2, trafficPotential: 900, cluster: "Mirrorless vs DSLR", categorySlug: "gear-talk", funnel: "MOFU" },
  { keyword: "how to do product photography", volume: 900, difficulty: 0, trafficPotential: 3000, cluster: "Technique", categorySlug: "technique", funnel: "MOFU" },
  { keyword: "how to sell photography", volume: 300, difficulty: 5, trafficPotential: 7000, cluster: "Business", categorySlug: "business", funnel: "MOFU" },
  { keyword: "why is lightroom so slow", volume: 250, difficulty: 0, trafficPotential: 150, cluster: "Lightroom", categorySlug: "editing", funnel: "MOFU" },
  { keyword: "how to cull photos in lightroom", volume: 150, difficulty: 0, trafficPotential: 20, cluster: "Lightroom", categorySlug: "editing", funnel: "MOFU" },
  { keyword: "how to remove chromatic aberration in lightroom", volume: 200, difficulty: 0, trafficPotential: 1400, cluster: "Lightroom", categorySlug: "editing", funnel: "MOFU" },
  { keyword: "how to fix red eye in lightroom", volume: 150, difficulty: 0, trafficPotential: 150, cluster: "Lightroom", categorySlug: "editing", funnel: "MOFU" },
  { keyword: "how to use lightroom presets", volume: 200, difficulty: 0, trafficPotential: 80, cluster: "Lightroom", categorySlug: "editing", funnel: "MOFU" },

  // ---- BOFU (decision) — about to buy, wants the honest verdict --------------
  { keyword: "what are good cameras for photography", volume: 250, difficulty: 14, trafficPotential: 91000, cluster: "Buying", categorySlug: "gear-talk", funnel: "BOFU" },
  { keyword: "what is a good camera for photography", volume: 250, difficulty: 14, trafficPotential: 65000, cluster: "Buying", categorySlug: "gear-talk", funnel: "BOFU" },
  { keyword: "best budget mirrorless camera under 500", volume: 300, difficulty: 8, trafficPotential: 12000, cluster: "Buying", categorySlug: "gear-talk", funnel: "BOFU" },
  { keyword: "best camera for beginners", volume: 900, difficulty: 12, trafficPotential: 20000, cluster: "Buying", categorySlug: "gear-talk", funnel: "BOFU" },
  { keyword: "best lens for portrait photography", volume: 500, difficulty: 10, trafficPotential: 9000, cluster: "Buying", categorySlug: "gear-talk", funnel: "BOFU" },
  { keyword: "best camera for video under 1000", volume: 200, difficulty: 9, trafficPotential: 8000, cluster: "Buying", categorySlug: "gear-talk", funnel: "BOFU" },
];

async function main() {
  const categories = new Set(
    (await prisma.category.findMany({ select: { slug: true } })).map((c) => c.slug),
  );

  let created = 0;
  let skipped = 0;

  for (const row of KEYWORDS) {
    // Priority orders the queue: volume matters, but a keyword nobody else can
    // rank for matters more, so weight the inverse of difficulty.
    const priority = Math.round(row.volume / 10) + (30 - row.difficulty);
    const categorySlug = categories.has(row.categorySlug) ? row.categorySlug : null;

    const existing = await prisma.keywordTarget.findUnique({
      where: { keyword: row.keyword },
      select: { status: true },
    });
    if (existing && existing.status !== "QUEUED") {
      skipped += 1;
      continue;
    }

    await prisma.keywordTarget.upsert({
      where: { keyword: row.keyword },
      update: {
        volume: row.volume,
        difficulty: row.difficulty,
        trafficPotential: row.trafficPotential,
        cluster: row.cluster,
        funnel: row.funnel,
        categorySlug,
        priority,
      },
      create: {
        keyword: row.keyword,
        volume: row.volume,
        difficulty: row.difficulty,
        trafficPotential: row.trafficPotential,
        cluster: row.cluster,
        funnel: row.funnel,
        serpFeatures: "discussion",
        categorySlug,
        priority,
      },
    });
    created += 1;
  }

  const queued = await prisma.keywordTarget.count({ where: { status: "QUEUED" } });
  console.log(`Seeded ${created} keywords (${skipped} already used). Queue now holds ${queued}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
