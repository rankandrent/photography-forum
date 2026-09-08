import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/session";
import { listThreads } from "@/lib/queries";
import { Avatar } from "@/components/Avatar";
import { ThreadCard } from "@/components/ThreadCard";
import { Pagination } from "@/components/Pagination";
import { ProfileForm } from "@/components/ProfileForm";
import { EmptyState } from "@/components/EmptyState";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { urlFor } from "@/lib/storage";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
    select: { username: true, name: true, bio: true },
  });
  if (!user) return { title: "Member not found" };
  const label = user.name ?? user.username;
  return {
    title: `${label} (@${user.username})`,
    description: user.bio ?? `${label}'s photos, threads and gear on the photography forum.`,
    alternates: { canonical: `/u/${user.username}` },
  };
}

export default async function ProfilePage({ params, searchParams }: Props) {
  const { username } = await params;
  const page = Number((await searchParams).page ?? 1) || 1;

  const profile = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
      bio: true,
      location: true,
      website: true,
      instagram: true,
      role: true,
      createdAt: true,
      gear: { select: { gear: { select: { id: true, slug: true, name: true, type: true } } } },
      _count: { select: { threads: true, posts: true, photos: true, critiques: true } },
    },
  });
  if (!profile) notFound();

  const viewer = await currentUser();
  const isSelf = viewer?.id === profile.id;

  const [{ threads, pageCount }, recentPhotos] = await Promise.all([
    listThreads({ authorId: profile.id, sort: "new", page }),
    prisma.photo.findMany({
      where: { uploaderId: profile.id, thread: { isNot: null } },
      orderBy: { createdAt: "desc" },
      take: 12,
      select: { id: true, thumbKey: true, thread: { select: { slug: true } } },
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="flex flex-wrap items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <Avatar user={profile} size={72} />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {profile.name ?? profile.username}
          </h1>
          <p className="text-sm text-slate-500">@{profile.username}</p>
          {profile.role !== "USER" && (
            <span className="mt-1 inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
              {profile.role === "ADMIN" ? "Admin" : "Moderator"}
            </span>
          )}
          {profile.bio && <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{profile.bio}</p>}

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            {profile.location && <li>📍 {profile.location}</li>}
            {profile.website && (
              <li>
                <a href={profile.website} rel="me nofollow noopener" target="_blank" className="text-brand-600 hover:underline">
                  Portfolio
                </a>
              </li>
            )}
            {profile.instagram && (
              <li>
                <a
                  href={`https://instagram.com/${profile.instagram}`}
                  rel="me nofollow noopener"
                  target="_blank"
                  className="text-brand-600 hover:underline"
                >
                  @{profile.instagram}
                </a>
              </li>
            )}
            <li>Joined {profile.createdAt.toLocaleDateString()}</li>
          </ul>

          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <div><dt className="inline font-semibold">{profile._count.threads}</dt> <dd className="inline text-slate-500">threads</dd></div>
            <div><dt className="inline font-semibold">{profile._count.posts}</dt> <dd className="inline text-slate-500">replies</dd></div>
            <div><dt className="inline font-semibold">{profile._count.photos}</dt> <dd className="inline text-slate-500">photos</dd></div>
            <div><dt className="inline font-semibold">{profile._count.critiques}</dt> <dd className="inline text-slate-500">critiques given</dd></div>
          </dl>
        </div>
      </header>

      {profile.gear.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Kit</h2>
          <ul className="flex flex-wrap gap-2">
            {profile.gear.map(({ gear }) => (
              <li key={gear.id}>
                <Link
                  href={`/gear/${gear.slug}`}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
                >
                  {gear.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recentPhotos.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Recent photos</h2>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {recentPhotos.map((photo) => (
              <li key={photo.id}>
                <Link href={`/t/${photo.thread!.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(photo.thumbKey)}
                    alt=""
                    loading="lazy"
                    className="aspect-square w-full rounded-lg object-cover transition hover:opacity-90"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {isSelf && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-slate-100">Edit your profile</h2>
          <ProfileForm user={profile} />
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Threads</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          {threads.length === 0 ? (
            <EmptyState title="No threads yet" body="Nothing posted here so far." />
          ) : (
            threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
          )}
        </div>
        <Pagination page={page} pageCount={pageCount} basePath={`/u/${profile.username}`} />
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: profile.name ?? profile.username,
            alternateName: profile.username,
            description: profile.bio ?? undefined,
            url: absoluteUrl(`/u/${profile.username}`),
          },
        }}
      />
    </div>
  );
}
