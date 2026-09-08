import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Members",
  description: "Photographers active on the forum, ranked by contributions.",
  alternates: { canonical: "/members" },
};

export default async function MembersPage() {
  const members = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    take: 100,
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
      bio: true,
      location: true,
      createdAt: true,
      _count: { select: { threads: true, posts: true, critiques: true } },
    },
  });

  const ranked = [...members].sort(
    (a, b) =>
      b._count.threads + b._count.posts + b._count.critiques -
      (a._count.threads + a._count.posts + a._count.critiques),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Members</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        The people answering questions and giving critique.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {ranked.map((m) => (
          <li key={m.id}>
            <Link
              href={`/u/${m.username}`}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-500 dark:border-slate-800 dark:bg-slate-900"
            >
              <Avatar user={m} size={40} />
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-slate-900 dark:text-slate-100">
                  {m.name ?? m.username}
                </span>
                <span className="block text-xs text-slate-400">@{m.username}</span>
                {m.bio && (
                  <span className="mt-1 line-clamp-2 block text-sm text-slate-500 dark:text-slate-400">
                    {m.bio}
                  </span>
                )}
                <span className="mt-1 block text-xs text-slate-400">
                  {m._count.threads} threads · {m._count.posts} replies · {m._count.critiques} critiques
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
