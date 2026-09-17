import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = siteUrl();

  let categories: { slug: string }[] = [];
  let threads: { slug: string; updatedAt: Date }[] = [];
  let tags: { slug: string }[] = [];
  let users: { username: string }[] = [];

  try {
    [categories, threads, tags, users] = await Promise.all([
      prisma.category.findMany({ select: { slug: true } }),
      prisma.thread.findMany({
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
        take: 50000,
      }),
      prisma.tag.findMany({ select: { slug: true } }),
      prisma.user.findMany({ select: { username: true }, take: 50000 }),
    ]);
  } catch (error) {
    console.warn("sitemap.xml error:", error);
  }

  const totalUrls = 1 + categories.length + threads.length + tags.length + users.length;

  // Split into sitemap index if total URLs exceed 50,000
  if (totalUrls > 50000) {
    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${base}/sitemap-posts.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${base}/sitemap-categories.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${base}/sitemap-tags.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${base}/sitemap-users.xml</loc>
  </sitemap>
</sitemapindex>`;

    return new NextResponse(indexXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  const homepageUrl = `  <url>
    <loc>${base}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  const categoryUrls = categories
    .map(
      (c) => `  <url>
    <loc>${base}/c/${c.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  const threadUrls = threads
    .map(
      (t) => `  <url>
    <loc>${base}/t/${t.slug}</loc>
    <lastmod>${t.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n");

  const tagUrls = tags
    .map(
      (t) => `  <url>
    <loc>${base}/tag/${t.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("\n");

  const userUrls = users
    .map(
      (u) => `  <url>
    <loc>${base}/u/${u.username}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${homepageUrl}
${categoryUrls}
${threadUrls}
${tagUrls}
${userUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
