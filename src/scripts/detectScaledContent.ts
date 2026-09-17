import fs from "fs";
import path from "path";
import { prisma } from "../lib/prisma";

export interface FlaggedThread {
  id: string;
  slug: string;
  title: string;
  author: string;
  reasons: string[];
  similarityScore: number;
  wordCount: number;
  photoCount: number;
  createdAt: string;
}

/** Compute Jaccard similarity between two strings based on 3-gram word tokens */
export function calculateSimilarity(textA: string, textB: string): number {
  const normalize = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, "").trim();
  const a = normalize(textA);
  const b = normalize(textB);
  if (!a || !b) return 0;
  if (a === b) return 1.0;

  const wordsA = a.split(/\s+/).filter((w) => w.length > 2);
  const wordsB = b.split(/\s+/).filter((w) => w.length > 2);

  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  // Generate word bigrams/trigrams for structure-aware comparison
  const getShingles = (words: string[]) => {
    const set = new Set<string>();
    for (let i = 0; i < words.length - 1; i++) {
      set.add(`${words[i]}_${words[i + 1]}`);
    }
    return set;
  };

  const setA = getShingles(wordsA);
  const setB = getShingles(wordsB);

  if (setA.size === 0 || setB.size === 0) return 0;

  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }

  const union = setA.size + setB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

export async function detectScaledContent(): Promise<FlaggedThread[]> {
  console.log("🔍 Scanning forum database for scaled / template content...");

  const threads = await prisma.thread.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      body: true,
      createdAt: true,
      authorId: true,
      isSimulated: true,
      author: { select: { username: true, name: true, isSimulated: true, generatedByAi: true } },
      photos: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const flaggedMap = new Map<string, FlaggedThread>();

  // 1. Scan for burst posting within 60s by same user
  for (let i = 0; i < threads.length; i++) {
    for (let j = i + 1; j < threads.length; j++) {
      const t1 = threads[i];
      const t2 = threads[j];
      if (t1.authorId === t2.authorId) {
        const diffSec = Math.abs(t1.createdAt.getTime() - t2.createdAt.getTime()) / 1000;
        if (diffSec <= 60) {
          [t1, t2].forEach((t) => {
            const existing = flaggedMap.get(t.id) || {
              id: t.id,
              slug: t.slug,
              title: t.title,
              author: t.author.name || t.author.username,
              reasons: [],
              similarityScore: 0,
              wordCount: t.body.split(/\s+/).filter(Boolean).length,
              photoCount: t.photos.length,
              createdAt: t.createdAt.toISOString(),
            };
            if (!existing.reasons.includes("BURST_POSTING_LOOP")) {
              existing.reasons.push("BURST_POSTING_LOOP (<60s gap)");
            }
            flaggedMap.set(t.id, existing);
          });
        }
      }
    }
  }

  // 2. Scan for text similarity > 80% & bot accounts & thin content
  for (let i = 0; i < threads.length; i++) {
    const t1 = threads[i];
    const wordCount = t1.body.split(/\s+/).filter(Boolean).length;
    const photoCount = t1.photos.length;
    const isBot = t1.isSimulated || t1.author.isSimulated || t1.author.generatedByAi;
    const isThin = photoCount === 0 && wordCount < 100;

    let highestSim = 0;
    for (let j = 0; j < threads.length; j++) {
      if (i === j) continue;
      const sim = calculateSimilarity(t1.body, threads[j].body);
      if (sim > highestSim) highestSim = sim;
    }

    const reasons: string[] = [];
    if (highestSim >= 0.80) {
      reasons.push(`DUPLICATE_CONTENT (${(highestSim * 100).toFixed(1)}% match)`);
    }
    if (isBot) {
      reasons.push("BOT_SIMULATED_USER");
    }
    if (isThin) {
      reasons.push(`THIN_TEXT_NO_IMAGE (${wordCount} words, 0 photos)`);
    }

    if (reasons.length > 0) {
      const existing = flaggedMap.get(t1.id) || {
        id: t1.id,
        slug: t1.slug,
        title: t1.title,
        author: t1.author.name || t1.author.username,
        reasons: [],
        similarityScore: Math.round(highestSim * 100),
        wordCount,
        photoCount,
        createdAt: t1.createdAt.toISOString(),
      };
      reasons.forEach((r) => {
        if (!existing.reasons.includes(r)) existing.reasons.push(r);
      });
      existing.similarityScore = Math.max(existing.similarityScore, Math.round(highestSim * 100));
      flaggedMap.set(t1.id, existing);
    }
  }

  const results = Array.from(flaggedMap.values());

  // Generate CSV Report
  const csvHeaders = "thread_id,slug,title,author,reasons,similarity_score,word_count,photo_count,created_at\n";
  const csvRows = results
    .map((r) =>
      [
        r.id,
        `"${r.slug}"`,
        `"${r.title.replace(/"/g, '""')}"`,
        `"${r.author}"`,
        `"${r.reasons.join(" | ")}"`,
        r.similarityScore,
        r.wordCount,
        r.photoCount,
        r.createdAt,
      ].join(",")
    )
    .join("\n");

  const csvContent = csvHeaders + csvRows;
  const outputPath = path.join(process.cwd(), "content_audit_report.csv");
  fs.writeFileSync(outputPath, csvContent, "utf8");

  console.log(`\n✅ Audit complete! Flagged ${results.length} thread(s).`);
  console.log(`📄 CSV Report generated at: ${outputPath}\n`);

  return results;
}

detectScaledContent().catch(console.error);
