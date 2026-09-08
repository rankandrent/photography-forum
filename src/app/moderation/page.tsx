import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser, isStaff } from "@/lib/session";
import { timeAgo } from "@/lib/format";
import { toPlainText } from "@/lib/markdown";
import { ResolveButtons, RoleSelect } from "@/components/ModerationTools";

export const metadata: Metadata = {
  title: "Moderation",
  robots: { index: false, follow: false },
};

export default async function ModerationPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=/moderation");
  if (!isStaff(user)) redirect("/");

  const [reports, members] = await Promise.all([
    prisma.report.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      take: 100,
      select: {
        id: true,
        reason: true,
        status: true,
        createdAt: true,
        reporter: { select: { username: true } },
        thread: { select: { slug: true, title: true } },
        post: { select: { id: true, body: true, thread: { select: { slug: true, title: true } } } },
      },
    }),
    user.role === "ADMIN"
      ? prisma.user.findMany({
          orderBy: { createdAt: "desc" },
          take: 50,
          select: { id: true, username: true, name: true, email: true, role: true },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Moderation</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Reports from members, newest open first.
      </p>

      <section className="mt-6">
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Reports</h2>
        {reports.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            The queue is empty. Nice.
          </p>
        ) : (
          <ul className="space-y-3">
            {reports.map((r) => {
              const target = r.thread ?? r.post?.thread;
              return (
                <li
                  key={r.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{r.reason}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        by @{r.reporter.username} · {timeAgo(r.createdAt)} ·{" "}
                        <span
                          className={
                            r.status === "OPEN"
                              ? "font-semibold text-amber-600"
                              : "text-slate-400"
                          }
                        >
                          {r.status}
                        </span>
                      </p>
                      {target && (
                        <Link
                          href={r.post ? `/t/${target.slug}#post-${r.post.id}` : `/t/${target.slug}`}
                          className="mt-2 block text-sm text-brand-600 hover:underline"
                        >
                          {target.title}
                        </Link>
                      )}
                      {r.post && (
                        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                          {toPlainText(r.post.body, 160)}
                        </p>
                      )}
                    </div>
                    {r.status === "OPEN" && <ResolveButtons reportId={r.id} />}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {user.role === "ADMIN" && (
        <section className="mt-10">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Members &amp; roles</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
                <tr>
                  <th scope="col" className="px-4 py-2">Member</th>
                  <th scope="col" className="px-4 py-2">Email</th>
                  <th scope="col" className="px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {members.map((m) => (
                  <tr key={m.id}>
                    <td className="px-4 py-2">
                      <Link href={`/u/${m.username}`} className="hover:underline">
                        {m.name ?? m.username}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-slate-500">{m.email}</td>
                    <td className="px-4 py-2">
                      <RoleSelect userId={m.id} role={m.role} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
