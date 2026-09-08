import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { THREAD_LIST_SELECT, PAGE_SIZE } from "@/lib/queries";
import { ThreadCard } from "@/components/ThreadCard";
import { Pagination } from "@/components/Pagination";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every thread, reply and gear page on the forum.",
  // Search result pages are thin and near-duplicate; keep them out of the index.
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string; page?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", page: pageParam } = await searchParams;
  const query = q.trim();
  const page = Number(pageParam ?? 1) || 1;

  if (!query) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Search</h1>
        <form action="/search" role="search" className="mt-4">
          <label htmlFor="q" className="sr-only">Search</label>
          <input
            id="q"
            name="q"
            type="search"
            autoFocus
            placeholder="Try 'sharp portraits f/1.8' or '35mm street'"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 dark:border-slate-600 dark:bg-slate-900"
          />
        </form>
      </div>
    );
  }

  // `mode: "insensitive"` maps to ILIKE. For a large board, replace this with a
  // Postgres tsvector column + GIN index — see the README's scaling notes.
  const where = {
    OR: [
      { title: { contains: query, mode: "insensitive" as const } },
      { body: { contains: query, mode: "insensitive" as const } },
      { posts: { some: { body: { contains: query, mode: "insensitive" as const } } } },
      { tags: { some: { tag: { name: { contains: query, mode: "insensitive" as const } } } } },
    ],
  };

  const [threads, total] = await Promise.all([
    prisma.thread.findMany({
      where,
      select: THREAD_LIST_SELECT,
      orderBy: [{ score: "desc" }, { lastPostAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.thread.count({ where }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Search results for &ldquo;{query}&rdquo;
      </h1>
      <p className="mt-1 text-sm text-slate-500">{total} matching threads</p>

      <form action="/search" role="search" className="mt-4">
        <label htmlFor="q" className="sr-only">Search</label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 dark:border-slate-600 dark:bg-slate-900"
        />
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {threads.length === 0 ? (
          <EmptyState
            title="Nothing matched"
            body="Try fewer words, or browse the categories instead."
            ctaHref="/categories"
            ctaLabel="Browse categories"
          />
        ) : (
          threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
        )}
      </div>

      <Pagination
        page={page}
        pageCount={Math.max(1, Math.ceil(total / PAGE_SIZE))}
        basePath="/search"
        params={{ q: query }}
      />

      <p className="mt-6 text-center text-sm text-slate-400">
        Can&apos;t find it? <Link href="/new" className="text-brand-600 hover:underline">Ask the community</Link>
      </p>
    </div>
  );
}
