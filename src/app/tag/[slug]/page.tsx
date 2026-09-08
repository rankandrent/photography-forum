import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { listThreads } from "@/lib/queries";
import { ThreadCard } from "@/components/ThreadCard";
import { Pagination } from "@/components/Pagination";
import { EmptyState } from "@/components/EmptyState";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `#${slug}`,
    description: `Threads tagged #${slug} on the photography forum.`,
    alternates: { canonical: `/tag/${slug}` },
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
