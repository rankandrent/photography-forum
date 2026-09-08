import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { urlFor } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Weekly photo challenges",
  description:
    "A new theme every week. Submit one frame, vote on everyone else's, and see the results — the fastest way to shoot more and get seen.",
  alternates: { canonical: "/challenges" },
};

const STATUS_STYLE: Record<string, string> = {
  OPEN: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  VOTING: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  CLOSED: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  UPCOMING: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
};

export default async function ChallengesPage() {
  const challenges = await prisma.challenge.findMany({
    orderBy: [{ startsAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      theme: true,
      status: true,
      endsAt: true,
      _count: { select: { entries: true } },
      entries: {
        take: 4,
        orderBy: { createdAt: "desc" },
        select: { photos: { select: { thumbKey: true }, take: 1 } },
      },
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Weekly challenges</h1>
      <p className="mt-1 max-w-2xl text-slate-500 dark:text-slate-400">
        One theme, one frame, one week. Submissions open first, then the community votes.
      </p>

      {challenges.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          No challenges have been posted yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {challenges.map((c) => (
            <li key={c.id}>
              <Link
                href={`/challenges/${c.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-500 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[c.status]}`}>
                    {c.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    {c._count.entries} entries · closes {c.endsAt.toLocaleDateString()}
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {c.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{c.theme}</p>

                {c.entries.some((e) => e.photos[0]) && (
                  <ul className="mt-3 flex gap-2">
                    {c.entries.map((e, i) =>
                      e.photos[0] ? (
                        <li key={i}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={urlFor(e.photos[0].thumbKey)}
                            alt=""
                            loading="lazy"
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </li>
                      ) : null,
                    )}
                  </ul>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
