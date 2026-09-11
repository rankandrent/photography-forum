import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { timeAgo } from "@/lib/format";
import type { SidebarData } from "@/lib/discovery";

/**
 * Recent activity, shown beside a thread. On narrow screens it drops below the
 * post rather than competing with it — the reader came for the thread.
 */
export function ForumSidebar({ data }: { data: SidebarData }) {
  const { recentThreads, recentPosts } = data;

  return (
    <aside className="space-y-4 lg:sticky lg:top-20" aria-label="Recent activity">
      <Panel title="Recent topics" href="/?sort=new">
        {recentThreads.length === 0 ? (
          <Empty>No topics yet.</Empty>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentThreads.map((t) => (
              <li key={t.slug} className="py-2 first:pt-0 last:pb-0">
                <Link
                  href={`/t/${t.slug}`}
                  className="line-clamp-2 text-sm font-medium text-slate-800 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400"
                >
                  {t.title}
                </Link>
                <p className="mt-0.5 text-xs text-slate-400">
                  {t._count.posts} {t._count.posts === 1 ? "reply" : "replies"} ·{" "}
                  {timeAgo(t.lastPostAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Recent posts">
        {recentPosts.length === 0 ? (
          <Empty>No replies yet.</Empty>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentPosts.map((p) => (
              <li key={p.id} className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <Avatar user={p.author} size={26} />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <Link
                      href={`/u/${p.author.username}`}
                      className="font-medium text-slate-700 hover:underline dark:text-slate-300"
                    >
                      {p.author.name ?? p.author.username}
                    </Link>{" "}
                    · {timeAgo(p.createdAt)}
                  </p>
                  <Link
                    href={`/t/${p.thread.slug}#post-${p.id}`}
                    className="line-clamp-2 text-sm text-slate-800 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400"
                  >
                    {p.thread.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </aside>
  );
}

function Panel({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {title}
        </h2>
        {href && (
          <Link href={href} className="text-xs font-medium text-brand-600 hover:underline">
            All
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-400">{children}</p>;
}
