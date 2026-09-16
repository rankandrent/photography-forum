import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";

/** Dynamic sitemap — new threads appear in the sitemap instantly upon creation. */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();

  // This route is prerendered during `next build`, which can run before the
  // database exists or is reachable. A sitemap is not worth failing a deploy
  // over: fall back to the static pages and let the hourly revalidation pick up
  // the real content on the first request after the database is live.
  let threads: { slug: string; updatedAt: Date }[] = [];
  let categories: { id: string; slug: string }[] = [];
  let categoryFreshness: { categoryId: string; _max: { lastPostAt: Date | null } }[] = [];
  let gear: { slug: string }[] = [];
  let tags: { slug: string }[] = [];
  let challenges: { slug: string; endsAt: Date }[] = [];
  let users: { username: string }[] = [];

  try {
    [threads, categories, gear, tags, challenges, categoryFreshness] = await Promise.all([
      prisma.thread.findMany({
        select: { slug: true, updatedAt: true },
        orderBy: { lastPostAt: "desc" },
        take: 20000,
      }),
      // A board with no threads is an empty page, thin content.
      prisma.category.findMany({
        where: { threads: { some: {} } },
        select: { id: true, slug: true },
      }),
      // Only gear pages that have at least 2 owners or photos to avoid thin gear pages
      prisma.gear.findMany({
        where: {
          OR: [
            { owners: { some: {} } },
            { cameraPhotos: { some: {} } },
            { lensPhotos: { some: {} } },
          ],
        },
        select: { slug: true },
      }),
      // Only tags that actually hold active threads
      prisma.tag.findMany({
        where: { threads: { some: {} } },
        select: { slug: true },
      }),
      prisma.challenge.findMany({ select: { slug: true, endsAt: true } }),
      // Category last post timestamp for freshness
      prisma.thread.groupBy({ by: ["categoryId"], _max: { lastPostAt: true } }),
    ]);
  } catch (error) {
    console.warn("sitemap: database unavailable, emitting static pages only", error);
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "hourly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/categories`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/gear`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/challenges`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/members`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/guidelines`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/copyright`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...staticPages,
    ...categories.map((c) => {
      const lastPostAt = categoryFreshness.find((f) => f.categoryId === c.id)?._max.lastPostAt;
      return {
        url: `${base}/c/${c.slug}`,
        ...(lastPostAt ? { lastModified: lastPostAt } : {}),
        changeFrequency: "daily" as const,
        priority: 0.8,
      };
    }),
    ...threads.map((t) => ({
      url: `${base}/t/${t.slug}`,
      lastModified: t.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...gear.map((g) => ({
      url: `${base}/gear/${g.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...tags.map((t) => ({
      url: `${base}/tag/${t.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
    ...challenges.map((c) => ({
      url: `${base}/challenges/${c.slug}`,
      lastModified: c.endsAt,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
