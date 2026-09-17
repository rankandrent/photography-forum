import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = siteUrl();
  let categories: { slug: string }[] = [];
  try {
    categories = await prisma.category.findMany({
      select: { slug: true },
      orderBy: { position: "asc" },
    });
  } catch (error) {
    console.warn("sitemap-categories error:", error);
  }

  const urls = categories
    .map(
      (c) => `  <url>
    <loc>${base}/c/${c.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
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
