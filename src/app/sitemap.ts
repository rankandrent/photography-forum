import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";

/** Revalidate hourly — new threads should appear in the sitemap the same day. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();

  const [threads, categories, gear, tags, challenges, users] = await Promise.all([
    prisma.thread.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { lastPostAt: "desc" },
      take: 20000,
    }),
    prisma.category.findMany({ select: { slug: true } }),
    prisma.gear.findMany({ select: { slug: true } }),
    prisma.tag.findMany({ select: { slug: true } }),
    prisma.challenge.findMany({ select: { slug: true, endsAt: true } }),
    prisma.user.findMany({ select: { username: true }, take: 5000 }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "hourly", priority: 1 },
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
    ...categories.map((c) => ({
      url: `${base}/c/${c.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
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
    ...users.map((u) => ({
      url: `${base}/u/${u.username}`,
      changeFrequency: "weekly" as const,
      priority: 0.3,
    })),
  ];
}
