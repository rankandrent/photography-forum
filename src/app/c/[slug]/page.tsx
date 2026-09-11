import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { listThreads, type Sort } from "@/lib/queries";
import { ThreadCard } from "@/components/ThreadCard";
import { Pagination } from "@/components/Pagination";
import { SortTabs } from "@/components/SortTabs";
import { EmptyState } from "@/components/EmptyState";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { listingCanonical, missingPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });
  if (!category) return missingPageMetadata("Category not found");
  const canonical = listingCanonical(`/c/${slug}`, page);
  const n = Number(page ?? 1) || 1;
  return {
    // Page 2 carrying the same <title> as page 1 reads as a duplicate in the
    // SERP even once the canonical is right, so number it.
    title: n > 1 ? `${category.name} — page ${n}` : category.name,
    description: category.description,
    alternates: { canonical },
    openGraph: { title: category.name, description: category.description, url: canonical },
  };
}

export async function generateStaticParams() {
  // Runs during `next build`, which may happen before the database exists.
  // These pages render on demand anyway, so an empty list is a safe fallback.
  try {
    const categories = await prisma.category.findMany({ select: { slug: true } });
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const sort = (sp.sort ?? "latest") as Sort;
  const page = Number(sp.page ?? 1) || 1;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const { threads, pageCount, total } = await listThreads({ categoryId: category.id, sort, page });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:underline">Home</Link> / <span>{category.name}</span>
      </nav>

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            <span className="h-3 w-3 rounded-full" style={{ background: category.color }} />
            {category.name}
          </h1>
          <p className="mt-1 max-w-2xl text-slate-500 dark:text-slate-400">{category.description}</p>
          <p className="mt-1 text-sm text-slate-400">{total} threads</p>
        </div>
        <Link
          href={`/new?category=${category.slug}`}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          New thread
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <SortTabs basePath={`/c/${category.slug}`} active={sort} />
        {threads.length === 0 ? (
          <EmptyState
            title={`No threads in ${category.name} yet`}
            body="Start the first one — a specific question gets better answers than a general one."
            ctaHref={`/new?category=${category.slug}`}
            ctaLabel="Start a thread"
          />
        ) : (
          threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
        )}
      </div>

      <Pagination page={page} pageCount={pageCount} basePath={`/c/${category.slug}`} params={{ sort: sp.sort }} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: category.name, item: absoluteUrl(`/c/${slug}`) },
          ],
        }}
      />
    </div>
  );
}
