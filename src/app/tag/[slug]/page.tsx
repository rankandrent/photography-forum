import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { listThreads } from "@/lib/queries";
import { ThreadCard } from "@/components/ThreadCard";
import { Pagination } from "@/components/Pagination";
import { EmptyState } from "@/components/EmptyState";
import { listingCanonical, missingPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  // Tag URLs are guessable and the page 404s on an unknown one, so confirm the
  // tag exists rather than emitting an indexable title for a page with nothing
  // on it.
  const tag = await prisma.tag.findUnique({
    where: { slug },
    select: { name: true, _count: { select: { threads: true } } },
  });
  if (!tag) return missingPageMetadata("Tag not found");

  // A tag with nothing under it is a real page with no content on it. The tag
  // list is seeded in bulk, so most of them start out this way; letting them be
  // indexed would put hundreds of near-identical empty pages in front of Google
  // and drag the whole site's assessment down with them. They become indexable
  // by themselves the moment someone uses one.
  const empty = tag._count.threads === 0;
  const n = Number(page ?? 1) || 1;

  return {
    title: n > 1 ? `#${tag.name} — page ${n}` : `#${tag.name}`,
    description: `Threads tagged #${tag.name} on the photography forum.`,
    alternates: { canonical: listingCanonical(`/tag/${slug}`, page) },
    ...(empty ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const page = Number((await searchParams).page ?? 1) || 1;

  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) notFound();

  const { threads, pageCount, total } = await listThreads({ tagSlug: slug, page });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">#{tag.name}</h1>
      <p className="mt-1 text-sm text-slate-500">{total} threads</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {threads.length === 0 ? (
          <EmptyState title="No threads with this tag yet" body="Tags appear here as soon as someone uses them." />
        ) : (
          threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
        )}
      </div>

      <Pagination page={page} pageCount={pageCount} basePath={`/tag/${slug}`} />
    </div>
  );
}
