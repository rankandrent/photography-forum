import { prisma } from "@/lib/prisma";
import { siteUrl, site } from "@/lib/site";
import { toPlainText } from "@/lib/markdown";

export const revalidate = 900;

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!,
  );
}

export async function GET() {
  const base = siteUrl();
  const threads = await prisma.thread.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      slug: true,
      title: true,
      body: true,
      createdAt: true,
      author: { select: { name: true, username: true } },
      category: { select: { name: true } },
    },
  });

  const items = threads
    .map(
      (t) => `    <item>
      <title>${escapeXml(t.title)}</title>
      <link>${base}/t/${t.slug}</link>
      <guid isPermaLink="true">${base}/t/${t.slug}</guid>
      <pubDate>${t.createdAt.toUTCString()}</pubDate>
      <category>${escapeXml(t.category.name)}</category>
      <dc:creator>${escapeXml(t.author.name ?? t.author.username)}</dc:creator>
      <description>${escapeXml(toPlainText(t.body, 400))}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${base}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=900, s-maxage=900",
    },
  });
}
