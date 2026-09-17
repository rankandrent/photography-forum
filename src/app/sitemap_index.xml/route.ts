import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = siteUrl();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
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

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
