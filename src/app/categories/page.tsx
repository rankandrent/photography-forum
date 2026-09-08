import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "@/lib/format";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Every board on the forum: gear talk, editing and post-processing, photo critique, the business of photography, and showcase.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      color: true,
      _count: { select: { threads: true } },
      threads: {
        orderBy: { lastPostAt: "desc" },
        take: 1,
        select: { slug: true, title: true, lastPostAt: true },
      },
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Categories</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Pick the board that matches what you are asking about — it is how people find your thread.
      </p>

      <ul className="mt-6 space-y-3">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/c/${c.slug}`}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-500 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: c.color }} />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900 dark:text-slate-100">{c.name}</span>
                <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">
                  {c.description}
                </span>
                {c.threads[0] && (
                  <span className="mt-2 block truncate text-xs text-slate-400">
                    Latest: {c.threads[0].title} · {timeAgo(c.threads[0].lastPostAt)}
                  </span>
                )}
              </span>
              <span className="shrink-0 text-sm font-medium tabular-nums text-slate-400">
                {c._count.threads}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
