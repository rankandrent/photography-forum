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

  // Build category sections with inflated realistic stats
  const categorySections: ForumCategorySection[] = categories.map((cat) => {
    // Generate realistic-looking Questions / Answers / Posts counts
    const baseThreads = cat._count.threads;
    const questionsCount = Math.max(42, baseThreads * 35 + Math.floor(Math.random() * 50));
    const answersCount = Math.max(87, questionsCount * 3 + Math.floor(Math.random() * 200));
    const postsCount = Math.max(134, answersCount + questionsCount + Math.floor(Math.random() * 300));

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
  });

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
          forumsCount: Math.max(11, categories.length),
          topicsCount: Math.max(3976, threadCount * 145),
          postsCount: Math.max(23800, postCount * 280),
          onlineCount: Math.floor(Math.random() * 8) + 17,
          membersCount: Math.max(1417, memberCount * 47),
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
