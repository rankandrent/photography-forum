import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { urlFor } from "@/lib/storage";
import { toPlainText } from "@/lib/markdown";
import { timeAgo, compact } from "@/lib/format";
import type { ThreadListItem } from "@/lib/queries";

const KIND_BADGE: Record<string, { label: string; className: string }> = {
  CRITIQUE: { label: "Critique", className: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300" },
  SHOWCASE: { label: "Showcase", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" },
  DISCUSSION: { label: "Discussion", className: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300" },
};

export function ThreadCard({ thread }: { thread: ThreadListItem }) {
  const badge = KIND_BADGE[thread.kind] ?? KIND_BADGE.DISCUSSION;
  const cover = thread.photos[0];

  return (
    <article className="flex gap-4 border-b border-slate-100 px-4 py-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50">
      {cover && (
        <Link href={`/t/${thread.slug}`} className="hidden shrink-0 sm:block" tabIndex={-1} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(cover.thumbKey)}
            alt=""
            loading="lazy"
            className="h-20 w-28 rounded-lg object-cover"
          />
        </Link>
      )}

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
          {thread.pinned && (
            <span className="rounded px-1.5 py-0.5 font-semibold text-amber-700 ring-1 ring-amber-300 dark:text-amber-400 dark:ring-amber-700">
              Pinned
            </span>
          )}
          <span className={`rounded px-1.5 py-0.5 font-medium ${badge.className}`}>{badge.label}</span>
          <Link
            href={`/c/${thread.category.slug}`}
            className="font-medium text-slate-500 hover:underline dark:text-slate-400"
            style={{ color: thread.category.color }}
          >
            {thread.category.name}
          </Link>
          {thread.locked && <span className="text-slate-400">🔒 locked</span>}
        </div>

        <h2 className="text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
          <Link href={`/t/${thread.slug}`} className="hover:text-brand-600 hover:underline">
            {thread.title}
          </Link>
        </h2>

        <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          {toPlainText(thread.body, 160)}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <Link href={`/u/${thread.author.username}`} className="flex items-center gap-1.5 hover:underline">
            <Avatar user={thread.author} size={26} />
            {thread.author.name ?? thread.author.username}
          </Link>
          <span>{timeAgo(thread.lastPostAt)}</span>
          <span>{compact(thread._count.posts)} replies</span>
          <span>{compact(thread.viewCount)} views</span>
          <span className="font-medium text-slate-600 dark:text-slate-300">{thread.score} points</span>
          {thread.tags.slice(0, 3).map(({ tag }) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="rounded bg-slate-100 px-1.5 py-0.5 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
