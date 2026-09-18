/**
 * Duplicate detection for generated forum content.
 *
 * The simulation writes replies straight to the database, so nothing stood
 * between a generator that repeats itself and a board full of near-identical
 * posts. That pattern — the same sentence with one noun swapped out — is the
 * textbook signature of spun content, and it is the single fastest way to lose
 * the rankings the whole pipeline exists to win.
 *
 * Every generated body passes through `findDuplicate` before it is persisted.
 */

import { prisma } from "@/lib/prisma";

/**
 * Strip everything that varies without changing what a reader sees as "the
 * same sentence": markdown emphasis, links (label kept, URL dropped), emoji
 * scorecards, punctuation and case. What remains is a bag of words.
 */
export function normalize(text: string): string {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // [label](url) -> label
    .replace(/[*_`~#>]/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}

/** Overlapping n-word sequences — order-sensitive, unlike a plain word set. */
export function shingles(text: string, n = 3): Set<string> {
  const words = normalize(text).split(" ").filter(Boolean);
  if (words.length < n) return new Set(words.length ? [words.join(" ")] : []);
  const out = new Set<string>();
  for (let i = 0; i <= words.length - n; i++) out.add(words.slice(i, i + n).join(" "));
  return out;
}

/**
 * Jaccard similarity over 3-word shingles, in [0, 1].
 *
 * Two replies that differ only in a brand name score well above 0.8 here,
 * while two genuinely different answers to the same question land near 0.1.
 */
export function similarity(a: string, b: string): number {
  const sa = shingles(a);
  const sb = shingles(b);
  if (sa.size === 0 || sb.size === 0) return sa.size === sb.size ? 1 : 0;
  let shared = 0;
  for (const s of sa) if (sb.has(s)) shared++;
  return shared / (sa.size + sb.size - shared);
}

/**
 * Above this, two posts read as the same post. Chosen so a swapped brand name
 * or a reordered clause still counts as a duplicate, while two independent
 * answers that happen to share jargon do not.
 */
export const DUPLICATE_THRESHOLD = 0.45;

/** How many recent simulated posts to compare against outside the thread. */
const RECENT_POST_SAMPLE = 400;

export type DuplicateMatch = { postId: string; score: number; excerpt: string };

/**
 * Returns the closest existing post if `body` is too similar to something the
 * forum already contains, or null when the text is sufficiently novel.
 *
 * Checks the thread first (where repetition is most visible to a reader) and
 * then a window of recent simulated posts across the whole forum (where
 * repetition is most visible to a crawler).
 */
export async function findDuplicate(
  body: string,
  opts: { threadId?: string; threshold?: number } = {}
): Promise<DuplicateMatch | null> {
  const threshold = opts.threshold ?? DUPLICATE_THRESHOLD;

  const candidates = await prisma.post.findMany({
    where: opts.threadId
      ? { OR: [{ threadId: opts.threadId }, { isSimulated: true }] }
      : { isSimulated: true },
    orderBy: { createdAt: "desc" },
    take: RECENT_POST_SAMPLE,
    select: { id: true, body: true },
  });

  let best: DuplicateMatch | null = null;
  for (const c of candidates) {
    const score = similarity(body, c.body);
    if (score >= threshold && (!best || score > best.score)) {
      best = { postId: c.id, score, excerpt: c.body.slice(0, 80) };
    }
  }
  return best;
}

/**
 * Two threads with near-identical titles compete with each other in the SERP
 * and split whatever authority either would have earned alone. The generator
 * works from a keyword pool, so it drifts onto the same phrasing over time.
 */
export async function findDuplicateThreadTitle(
  title: string,
  threshold = 0.6
): Promise<{ threadId: string; score: number; title: string } | null> {
  const candidates = await prisma.thread.findMany({
    orderBy: { createdAt: "desc" },
    take: 1000,
    select: { id: true, title: true },
  });

  let best: { threadId: string; score: number; title: string } | null = null;
  for (const c of candidates) {
    const score = similarity(title, c.title);
    if (score >= threshold && (!best || score > best.score)) {
      best = { threadId: c.id, score, title: c.title };
    }
  }
  return best;
}
