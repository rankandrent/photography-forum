import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "@/lib/format";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Every board on the forum: beginner questions and buying advice, gear and editing, portrait, landscape, wildlife, street and more genres, photo critique, and the business of photography.",
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
      section: true,
      _count: { select: { threads: true } },
      threads: {
        orderBy: { lastPostAt: "desc" },
        take: 1,
        select: { slug: true, title: true, lastPostAt: true },
      },
    },
  });

  // Sections come out in the order their first board appears, so reordering
  // boards is all it takes to reorder sections.
  const sections: { name: string; boards: typeof categories }[] = [];
  for (const c of categories) {
    const section = sections.find((s) => s.name === c.section);
    if (section) section.boards.push(c);
    else sections.push({ name: c.section, boards: [c] });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Categories</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Pick the board that matches what you are asking about — it is how people find your thread.
      </p>

      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <section key={section.name} aria-labelledby={`section-${section.name}`}>
            <h2
              id={`section-${section.name}`}
              className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              {section.name}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {section.boards.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/c/${c.slug}`}
                    className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-500 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{c.name}</span>
                        <span className="shrink-0 text-xs tabular-nums text-slate-400">
                          {c._count.threads} {c._count.threads === 1 ? "thread" : "threads"}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">
                        {c.description}
                      </span>
                      {c.threads[0] ? (
                        <span className="mt-2 block truncate text-xs text-slate-400">
                          Latest: {c.threads[0].title} · {timeAgo(c.threads[0].lastPostAt)}
                        </span>
                      ) : (
                        // An empty board is an invitation, not a dead end.
                        <span className="mt-2 block text-xs font-medium text-brand-600">
                          Be the first to start a thread
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
