import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/session";
import { markAllReadAction } from "@/actions/notifications";
import { timeAgo } from "@/lib/format";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};

export default async function NotificationsPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=/notifications");

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Notifications</h1>
        {notifications.some((n) => !n.read) && (
          <form action={markAllReadAction}>
            <button type="submit" className="text-sm font-medium text-brand-600 hover:underline">
              Mark all read
            </button>
          </form>
        )}
      </div>

      <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {notifications.length === 0 ? (
          <li>
            <EmptyState
              title="Nothing yet"
              body="Replies, critiques and upvotes on your posts will show up here."
            />
          </li>
        ) : (
          notifications.map((n) => (
            <li
              key={n.id}
              className={`border-b border-slate-100 last:border-0 dark:border-slate-800 ${
                n.read ? "" : "bg-brand-50/50 dark:bg-brand-600/5"
              }`}
            >
              <Link href={n.href} className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <p className="text-sm text-slate-800 dark:text-slate-200">{n.title}</p>
                <p className="mt-0.5 text-xs text-slate-400">{timeAgo(n.createdAt)}</p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
