import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = siteUrl();
  let users: { username: string }[] = [];
  try {
    users = await prisma.user.findMany({
      select: { username: true },
      take: 50000,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("sitemap-users error:", error);
  }

  const urls = users
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
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
