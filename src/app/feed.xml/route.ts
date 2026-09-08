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
  // Prerendered at build time, so the database may not be reachable yet. An
  // empty channel is a valid feed; the revalidation fills it in on the first
  // request after the database is live. The whole access sits inside the try
  // because an unset DATABASE_URL throws synchronously, before any promise.
  type FeedThread = {
    slug: string;
    title: string;
    body: string;
    createdAt: Date;
    author: { name: string | null; username: string };
    category: { name: string };
  };
  let threads: FeedThread[] = [];

  try {
    threads = await prisma.thread.findMany({
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
  } catch (error) {
    console.warn("feed: database unavailable, emitting an empty channel", error);
  }

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
