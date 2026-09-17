import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = siteUrl();
  let threads: { slug: string; updatedAt: Date }[] = [];
  try {
    threads = await prisma.thread.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 50000,
    });
  } catch (error) {
    console.warn("sitemap-posts error:", error);
  }

  const urls = threads
    .map(
      (t) => `  <url>
    <loc>${base}/t/${t.slug}</loc>
    <lastmod>${t.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
