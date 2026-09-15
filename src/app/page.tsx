import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/session";
import { JsonLd } from "@/components/JsonLd";
import { ForumInformation } from "@/components/ForumInformation";
import { ForumCategoryView, type ForumCategorySection } from "@/components/ForumCategoryView";
import { site, siteUrl } from "@/lib/site";
import { compact } from "@/lib/format";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [user, categories, stats] = await Promise.all([
    currentUser(),
    prisma.category.findMany({
      orderBy: { position: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        color: true,
        threads: {
          take: 3,
          orderBy: { lastPostAt: "desc" },
          select: {
            id: true,
            slug: true,
            title: true,
            score: true,
            createdAt: true,
            lastPostAt: true,
            author: { select: { username: true, name: true, image: true } },
            tags: { select: { tag: { select: { slug: true, name: true } } } },
            _count: { select: { posts: true } },
          },
        },
        _count: { select: { threads: true } },
      },
    }),
    Promise.all([
      prisma.thread.count(),
      prisma.post.count(),
      prisma.user.count(),
      prisma.photo.count(),
    ]),
  ]);

  const [threadCount, postCount, memberCount, photoCount] = stats;

  // Build category sections with real, accurate database stats
  const categorySections: ForumCategorySection[] = await Promise.all(
    categories.map(async (cat) => {
      const questionsCount = cat._count.threads;
      const answersCount = await prisma.post.count({
        where: { thread: { categoryId: cat.id } },
      });
      const postsCount = questionsCount + answersCount;

      return {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        color: cat.color,
        threads: cat.threads,
        questionsCount,
        answersCount,
        postsCount,
      };
    })
  );

  // Derive real active human users + dynamic time-of-day guest presence
  const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
  const realActiveUsersCount = await prisma.user.count({
    where: {
      isSimulated: false,
      notificationsSeenAt: { gte: fifteenMinsAgo },
    },
  });

  const date = new Date();
  const hour = date.getHours();
  const activeRatio = 0.20 + 0.25 * Math.sin(((hour - 8) * Math.PI) / 12);
  const guestVisitors = Math.max(3, Math.round(memberCount * activeRatio));
  const dynamicOnlineCount = realActiveUsersCount + guestVisitors;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Hero Banner (only for logged-out visitors) */}
      {!user && (
        <section className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 px-6 py-10 text-white sm:px-10 sm:py-14">
          <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            {site.tagline}
          </h1>
          <p className="mt-3 max-w-xl text-slate-300">
            Post a frame, get a structured critique. Ask about a lens and hear from people who own
            it. Every uploaded photo shows the settings it was shot at.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              Join the community
            </Link>
            <Link href="/categories" className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
              Browse categories
            </Link>
          </div>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-300">
            <div><dt className="inline font-semibold text-white">{compact(threadCount)}</dt> <dd className="inline">threads</dd></div>
            <div><dt className="inline font-semibold text-white">{compact(postCount)}</dt> <dd className="inline">replies</dd></div>
            <div><dt className="inline font-semibold text-white">{compact(photoCount)}</dt> <dd className="inline">photos</dd></div>
            <div><dt className="inline font-semibold text-white">{compact(memberCount)}</dt> <dd className="inline">members</dd></div>
          </dl>
        </section>
      )}

      {/* Forum Information Statistics Bar */}
      <ForumInformation
        stats={{
          forumsCount: categories.length,
          topicsCount: threadCount,
          postsCount: postCount + threadCount,
          onlineCount: dynamicOnlineCount,
          membersCount: memberCount,
        }}
      />

      {/* Traditional Forum Category View */}
      <ForumCategoryView categories={categorySections} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: site.name,
          url: siteUrl(),
          description: site.description,
        }}
      />
    </div>
  );
}
