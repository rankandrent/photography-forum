import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { listThreads, type Sort } from "@/lib/queries";
import { currentUser } from "@/lib/session";
import { ThreadCard } from "@/components/ThreadCard";
import { Pagination } from "@/components/Pagination";
import { SortTabs } from "@/components/SortTabs";
import { EmptyState } from "@/components/EmptyState";
import { JsonLd } from "@/components/JsonLd";
import { site, siteUrl } from "@/lib/site";
import { compact } from "@/lib/format";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

type Props = { searchParams: Promise<{ sort?: string; page?: string }> };

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const sort = (params.sort ?? "latest") as Sort;
  const page = Number(params.page ?? 1) || 1;

  const [user, { threads, pageCount }, categories, challenge, stats] = await Promise.all([
    currentUser(),
    listThreads({ sort, page }),
    prisma.category.findMany({
      orderBy: { position: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        color: true,
        _count: { select: { threads: true } },
      },
    }),
    prisma.challenge.findFirst({
      where: { status: { in: ["OPEN", "VOTING"] } },
      orderBy: { endsAt: "asc" },
      select: {
        slug: true,
        title: true,
        theme: true,
        status: true,
        endsAt: true,
        _count: { select: { entries: true } },
      },
    }),
    Promise.all([prisma.thread.count(), prisma.post.count(), prisma.user.count(), prisma.photo.count()]),
  ]);

  const [threadCount, postCount, memberCount, photoCount] = stats;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
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

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <SortTabs basePath="/" active={sort} />
            {threads.length === 0 ? (
              <EmptyState
                title="Nothing here yet"
                body="Be the first to start a discussion — a good first thread is a specific question about a photo you are working on."
                ctaHref="/new"
                ctaLabel="Start a thread"
              />
            ) : (
              threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
            )}
          </div>
          <Pagination page={page} pageCount={pageCount} basePath="/" params={{ sort: params.sort }} />
        </div>

        <aside className="space-y-6">
          {challenge && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {challenge.status === "VOTING" ? "Voting open" : "This week's challenge"}
              </h2>
              <h3 className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                <Link href={`/challenges/${challenge.slug}`} className="hover:underline">
                  {challenge.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{challenge.theme}</p>
              <p className="mt-3 text-xs text-slate-400">
                {challenge._count.entries} entries · closes {challenge.endsAt.toLocaleDateString()}
              </p>
              <Link
                href={`/challenges/${challenge.slug}`}
                className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                {challenge.status === "VOTING" ? "Vote now" : "Enter"}
              </Link>
            </section>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Categories</h2>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/c/${c.slug}`} className="group flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-slate-800 group-hover:text-brand-600 dark:text-slate-200">
                        {c.name}
                      </span>
                      <span className="block truncate text-xs text-slate-400">
                        {c._count.threads} threads
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              New here?
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Read the{" "}
              <Link href="/guidelines" className="font-medium text-brand-600 hover:underline">
                community guidelines
              </Link>{" "}
              before your first critique. Specific beats polite.
            </p>
          </section>
        </aside>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: site.name,
          url: siteUrl(),
          description: site.description,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: threads.slice(0, 10).map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteUrl()}/t/${t.slug}`,
              name: t.title,
            })),
          },
        }}
      />
    </div>
  );
}
