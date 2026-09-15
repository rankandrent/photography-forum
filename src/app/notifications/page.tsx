import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/session";
import { markAllReadAction } from "@/actions/notifications";
import { timeAgo } from "@/lib/format";
import { EmptyState } from "@/components/EmptyState";
import { MarkNotificationsSeen } from "@/components/MarkNotificationsSeen";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};

const ICONS: Record<string, { glyph: string; label: string }> = {
  reply: { glyph: "💬", label: "Reply" },
  vote: { glyph: "▲", label: "Upvote" },
  critique: { glyph: "🎯", label: "Critique" },
  answer: { glyph: "✓", label: "Accepted answer" },
  moderation: { glyph: "🛡", label: "Moderation" },
};

export default async function NotificationsPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=/notifications");

  const [notifications, me] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: user.id },
      // A collapsed notification that just took a new vote belongs at the top,
      // so order by when it last changed, not when it was first created.
      orderBy: { updatedAt: "desc" },
      take: 100,
    }),
    prisma.user.findUnique({
      where: { id: user.id },
      select: { notificationsSeenAt: true },
    }),
  ]);

  const seenAt = me?.notificationsSeenAt ?? null;
  const unread = notifications.filter((n) => !n.read);
  const hasUnseen = unread.some((n) => !seenAt || n.updatedAt > seenAt);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const groups = [
    { label: "Today", items: notifications.filter((n) => n.updatedAt >= startOfToday) },
    { label: "Earlier", items: notifications.filter((n) => n.updatedAt < startOfToday) },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <MarkNotificationsSeen hasUnseen={hasUnseen} />

      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Notifications</h1>
          {unread.length > 0 && (
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {unread.length} unread
            </p>
          )}
        </div>
        {unread.length > 0 && (
          <form action={markAllReadAction}>
            <button type="submit" className="text-sm font-medium text-brand-600 hover:underline">
              Mark all as read
            </button>
          </form>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <EmptyState
            title="You're all caught up"
            body="Replies, critiques, accepted answers and upvotes on your posts will show up here."
          />
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.label} aria-labelledby={`group-${group.label}`}>
              <h2
                id={`group-${group.label}`}
                className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                {group.label}
              </h2>
              <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                {group.items.map((n) => {
                  const icon = ICONS[n.type] ?? { glyph: "•", label: "Notification" };
                  return (
                    <li
                      key={n.id}
                      className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                    >
                      {/* A plain <a>, deliberately: see app/notifications/[id]/route.ts. */}
                      <a
                        href={`/notifications/${n.id}`}
                        className={`flex items-start gap-3 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                          n.read ? "" : "bg-brand-50/60 dark:bg-brand-600/10"
                        }`}
                      >
                        <span
                          aria-label={icon.label}
                          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm dark:bg-slate-800"
                        >
                          {icon.glyph}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-sm ${
                              n.read
                                ? "text-slate-600 dark:text-slate-400"
                                : "font-medium text-slate-900 dark:text-slate-100"
                            }`}
                          >
                            {n.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-400">
                            {timeAgo(n.updatedAt)}
                          </span>
                        </span>
                        {!n.read && (
                          <span
                            aria-label="Unread"
                            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
