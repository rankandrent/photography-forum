import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = siteUrl();
  let tags: { slug: string }[] = [];
  try {
    tags = await prisma.tag.findMany({
      select: { slug: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.warn("sitemap-tags error:", error);
  }

  const urls = tags
    .map(
      (t) => `  <url>
    <loc>${base}/tag/${t.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
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
