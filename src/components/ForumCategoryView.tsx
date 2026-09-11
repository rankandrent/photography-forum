import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { timeAgo, compact } from "@/lib/format";

export type ForumCategoryThread = {
  id: string;
  slug: string;
  title: string;
  score: number;
  createdAt: Date;
  lastPostAt: Date;
  author: { username: string; name: string | null; image: string | null };
  tags: { tag: { slug: string; name: string } }[];
  _count: { posts: number };
};

export type ForumCategorySection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  threads: ForumCategoryThread[];
  questionsCount: number;
  answersCount: number;
  postsCount: number;
};

/**
 * Traditional forum category layout — category header with stats,
 * latest threads underneath with vote/reply counts, author, time, tags.
 * Matches classic phpBB / vBulletin forum style.
 */
export function ForumCategoryView({ categories }: { categories: ForumCategorySection[] }) {
  return (
    <div className="space-y-6">
      {categories.map((cat) => {
        // Deterministic "viewing" count for realism based on category slug
        const viewingCount = 3 + (cat.slug.length * 3) % 9;

        return (
          <section
            key={cat.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Category Header */}
            <div className="flex items-start justify-between gap-4 border-b-2 px-5 py-4" style={{ borderBottomColor: cat.color }}>
              <div className="flex items-start gap-3">
                {/* Category Icon Circle */}
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-lg"
                  style={{ backgroundColor: cat.color }}
                >
                  💬
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    <Link href={`/c/${cat.slug}`} className="hover:underline" style={{ color: cat.color }}>
                      {cat.name}
                    </Link>
                    <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                      ({viewingCount} viewing)
                    </span>
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{cat.description}</p>
                </div>
              </div>

              {/* Right Stats */}
              <div className="hidden shrink-0 text-right text-xs text-slate-500 dark:text-slate-400 sm:block">
                <div>
                  <span className="text-slate-400">Questions:</span>{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-300">{compact(cat.questionsCount)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Answers:</span>{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-300">{compact(cat.answersCount)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Posts:</span>{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-300">{compact(cat.postsCount)}</span>
                </div>
                {/* Collapse toggle arrow */}
                <div className="mt-1 text-base" style={{ color: cat.color }}>▲</div>
              </div>
            </div>

            {/* Thread Listings */}
            {cat.threads.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                No threads yet in this category.{" "}
                <Link href="/new" className="font-medium text-brand-600 hover:underline">
                  Start one →
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {cat.threads.map((thread) => (
                  <li key={thread.id} className="flex items-center gap-4 px-5 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    {/* Vote / Reply / Views Columns */}
                    <div className="hidden shrink-0 sm:flex items-center gap-2">
                      {/* Votes Box */}
                      <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400">▲</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{thread.score}</span>
                        <span className="text-[10px] text-slate-400">▼</span>
                      </div>
                      {/* Replies Box */}
                      <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400">💬</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{thread._count.posts}</span>
                      </div>
                    </div>

                    {/* Thread Info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        <Link href={`/t/${thread.slug}`} className="hover:underline" style={{ color: cat.color }}>
                          {thread.title}
                        </Link>
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Avatar user={thread.author} size={18} />
                          By{" "}
                          <Link href={`/u/${thread.author.username}`} className="font-semibold hover:underline" style={{ color: cat.color }}>
                            {thread.author.name ?? thread.author.username}
                          </Link>
                          ,{" "}
                          {timeAgo(thread.createdAt)}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span>↩ replies {thread._count.posts}</span>
                        {thread.tags.length > 0 && (
                          <>
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            <span className="flex gap-1">
                              🏷{" "}
                              {thread.tags.slice(0, 3).map(({ tag }) => (
                                <Link
                                  key={tag.slug}
                                  href={`/tag/${tag.slug}`}
                                  className="font-medium hover:underline"
                                  style={{ color: cat.color }}
                                >
                                  {tag.name}
                                </Link>
                              ))}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Copy / Bookmark icon placeholder */}
                    <div className="hidden shrink-0 sm:block text-slate-300 dark:text-slate-600 text-lg">
                      📋
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* View All Link */}
            {cat.threads.length > 0 && (
              <div className="border-t border-slate-100 px-5 py-2.5 text-right dark:border-slate-800">
                <Link
                  href={`/c/${cat.slug}`}
                  className="text-xs font-semibold hover:underline"
                  style={{ color: cat.color }}
                >
                  view all questions ›
                </Link>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
