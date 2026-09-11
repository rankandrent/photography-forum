import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/session";
import { toPhotoView, PHOTO_SELECT } from "@/lib/photo-view";
import { ExifStrip } from "@/components/ExifStrip";
import { ChallengeEntryForm, EntryVoteButton } from "@/components/ChallengeForms";
import { Avatar } from "@/components/Avatar";
import { urlFor } from "@/lib/storage";
import { missingPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const challenge = await prisma.challenge.findUnique({
    where: { slug },
    select: { title: true, theme: true, description: true },
  });
  if (!challenge) return missingPageMetadata("Challenge not found");
  return {
    title: challenge.title,
    description: challenge.description || challenge.theme,
    alternates: { canonical: `/challenges/${slug}` },
  };
}

export default async function ChallengePage({ params }: Props) {
  const { slug } = await params;
  const [challenge, viewer] = await Promise.all([
    prisma.challenge.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        theme: true,
        description: true,
        status: true,
        startsAt: true,
        endsAt: true,
        votingEndsAt: true,
        entries: {
          select: {
            id: true,
            caption: true,
            userId: true,
            user: { select: { username: true, name: true, image: true } },
            photos: { select: PHOTO_SELECT },
            _count: { select: { votes: true } },
          },
        },
      },
    }),
    currentUser(),
  ]);
  if (!challenge) notFound();

  const myVotes = viewer
    ? await prisma.challengeVote.findMany({
        where: { userId: viewer.id, entry: { challengeId: challenge.id } },
        select: { entryId: true },
      })
    : [];
  const votedIds = new Set(myVotes.map((v) => v.entryId));
  const myEntry = viewer ? challenge.entries.find((e) => e.userId === viewer.id) : undefined;

  // During voting and after it, rank by votes; while submissions are open keep
  // the order neutral so early entries don't get a head start.
  const entries =
    challenge.status === "OPEN"
      ? challenge.entries
      : [...challenge.entries].sort((a, b) => b._count.votes - a._count.votes);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/challenges" className="hover:underline">Challenges</Link> / <span>{challenge.title}</span>
      </nav>

      <header>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {challenge.status}
        </span>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{challenge.title}</h1>
        <p className="mt-1 text-lg text-slate-600 dark:text-slate-400">{challenge.theme}</p>
        {challenge.description && (
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{challenge.description}</p>
        )}
        <p className="mt-3 text-sm text-slate-400">
          Submissions close {challenge.endsAt.toLocaleDateString()} · voting closes{" "}
          {challenge.votingEndsAt.toLocaleDateString()} · {challenge.entries.length} entries
        </p>
      </header>

      {challenge.status === "OPEN" && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">
            {myEntry ? "Your entry is in" : "Enter this challenge"}
          </h2>
          {viewer ? (
            <ChallengeEntryForm challengeId={challenge.id} hasEntry={Boolean(myEntry)} />
          ) : (
            <p className="text-sm text-slate-500">
              <Link href="/login" className="font-medium text-brand-600 hover:underline">Sign in</Link> to enter.
            </p>
          )}
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-slate-900 dark:text-slate-100">
          {challenge.status === "CLOSED" ? "Results" : "Entries"}
        </h2>

        {entries.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            No entries yet — be the first.
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2">
            {entries.map((entry, index) => {
              const photo = entry.photos[0];
              return (
                <li
                  key={entry.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                >
                  {photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(photo.displayKey)}
                      alt={entry.caption ?? ""}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      className="w-full object-cover"
                      style={{ aspectRatio: "4/3" }}
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Link href={`/u/${entry.user.username}`} className="flex items-center gap-2 text-sm hover:underline">
                        <Avatar user={entry.user} size={30} />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {entry.user.name ?? entry.user.username}
                        </span>
                      </Link>
                      {challenge.status === "CLOSED" && index < 3 && (
                        <span className="text-lg" aria-label={`Rank ${index + 1}`}>
                          {["🥇", "🥈", "🥉"][index]}
                        </span>
                      )}
                    </div>
                    {entry.caption && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{entry.caption}</p>
                    )}
                    {photo && <ExifStrip photo={toPhotoView(photo)} />}
                    <div className="mt-2">
                      <EntryVoteButton
                        entryId={entry.id}
                        votes={entry._count.votes}
                        voted={votedIds.has(entry.id)}
                        disabled={
                          !viewer || challenge.status !== "VOTING" || entry.userId === viewer.id
                        }
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
