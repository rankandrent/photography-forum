import Link from "next/link";
import { timeAgo } from "@/lib/format";
import type { RelatedThread } from "@/lib/discovery";

/**
 * "What else is worth reading" at the end of a thread — the point at which a
 * reader either goes deeper into the forum or leaves.
 */
export function RelatedThreads({ threads }: { threads: RelatedThread[] }) {
  if (threads.length === 0) return null;

  return (
    <section className="mt-8" aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
      >
        Related topics
      </h2>
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {threads.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/t/${t.slug}`}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span className="min-w-0 text-sm text-slate-800 dark:text-slate-200">{t.title}</span>
              <span className="shrink-0 text-xs text-slate-400">
                {t._count.posts} {t._count.posts === 1 ? "reply" : "replies"} ·{" "}
                {timeAgo(t.lastPostAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
