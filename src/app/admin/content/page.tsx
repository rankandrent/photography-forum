import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser, isStaff } from "@/lib/session";
import { timeAgo } from "@/lib/format";
import { RunNowButton } from "@/components/ContentTools";

export const metadata: Metadata = {
  title: "Content pipeline",
  robots: { index: false, follow: true },
};

// The "Run pipeline now" server action lives on this route, and a run spends a
// minute or two in web search. Without this it is killed at the default ceiling
// and the button appears to fail.
export const maxDuration = 300;

/**
 * The review-after-publish page. Posts go live on the cron's schedule; this is
 * where the owner reads what went out, fixes anything weak, and watches the
 * queue drain.
 */
export default async function ContentAdminPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=/admin/content");
  if (!isStaff(user)) redirect("/");

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [drafts, queued, publishedToday, failedCount, spend] = await Promise.all([
    prisma.contentDraft.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        title: true,
        status: true,
        threadSlug: true,
        sources: true,
        error: true,
        inputTokens: true,
        outputTokens: true,
        createdAt: true,
        keyword: { select: { keyword: true, volume: true, difficulty: true, funnel: true } },
      },
    }),
    prisma.keywordTarget.count({ where: { status: "QUEUED" } }),
    prisma.contentDraft.count({ where: { status: "PUBLISHED", publishedAt: { gte: since } } }),
    prisma.contentDraft.count({ where: { status: "FAILED" } }),
    prisma.contentDraft.aggregate({ _sum: { inputTokens: true, outputTokens: true } }),
  ]);

  // Claude Opus 5 list pricing, $5 / $25 per million tokens.
  const cost =
    ((spend._sum.inputTokens ?? 0) / 1_000_000) * 5 +
    ((spend._sum.outputTokens ?? 0) / 1_000_000) * 25;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Content pipeline</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Threads are drafted from the keyword queue and published under your account on a daily
        schedule. Read them here and fix anything that reads badly.
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Keywords queued", value: String(queued) },
          { label: "Published (24h)", value: String(publishedToday) },
          { label: "Failed", value: String(failedCount) },
          { label: "API spend", value: `$${cost.toFixed(2)}` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <dt className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</dt>
            <dd className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <RunNowButton />
      </div>

      <ul className="mt-8 space-y-3">
        {drafts.length === 0 && (
          <li className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            Nothing generated yet. Seed the keyword queue, then run the pipeline.
          </li>
        )}
        {drafts.map((draft) => {
          const sources = safeSources(draft.sources);
          return (
            <li
              key={draft.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                    {draft.threadSlug ? (
                      <Link href={`/t/${draft.threadSlug}`} className="hover:underline">
                        {draft.title}
                      </Link>
                    ) : (
                      draft.title
                    )}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono">{draft.keyword.keyword}</span>
                    {` · ${draft.keyword.funnel}`}
                    {draft.keyword.volume !== null && ` · ${draft.keyword.volume}/mo`}
                    {draft.keyword.difficulty !== null && ` · KD ${draft.keyword.difficulty}`}
                    {" · "}
                    {timeAgo(draft.createdAt)}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
                    draft.status === "PUBLISHED"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300"
                  }`}
                >
                  {draft.status}
                </span>
              </div>

              {draft.error && (
                <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 font-mono text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                  {draft.error}
                </p>
              )}

              {sources.length > 0 && (
                <p className="mt-2 text-xs text-slate-400">
                  {sources.length} source{sources.length === 1 ? "" : "s"} cited ·{" "}
                  {(draft.inputTokens ?? 0) + (draft.outputTokens ?? 0)} tokens
                </p>
              )}

              {draft.threadSlug && (
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/t/${draft.threadSlug}`}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
                  >
                    Read
                  </Link>
                  <Link
                    href={`/t/${draft.threadSlug}#edit`}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function safeSources(raw: string): { title: string; url: string }[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
