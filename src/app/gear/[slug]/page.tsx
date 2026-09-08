import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/session";
import { PHOTO_SELECT, toPhotoView } from "@/lib/photo-view";
import { PhotoGallery } from "@/components/PhotoGallery";
import { GearToggle } from "@/components/GearToggle";
import { Avatar } from "@/components/Avatar";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { urlFor } from "@/lib/storage";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const gear = await prisma.gear.findMany({ select: { slug: true } });
  return gear.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gear = await prisma.gear.findUnique({
    where: { slug },
    select: { name: true, brand: true, description: true, type: true },
  });
  if (!gear) return { title: "Gear not found" };

  const kind = gear.type === "LENS" ? "lens" : "camera";
  return {
    title: `${gear.name} — sample photos & discussion`,
    description:
      gear.description ??
      `Real sample photos taken with the ${gear.brand} ${gear.name}, plus every forum thread about this ${kind}.`,
    alternates: { canonical: `/gear/${slug}` },
    openGraph: { title: gear.name, url: `/gear/${slug}` },
  };
}

export default async function GearPage({ params }: Props) {
  const { slug } = await params;
  const [gear, viewer] = await Promise.all([
    prisma.gear.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        brand: true,
        type: true,
        description: true,
        releaseYear: true,
        owners: {
          take: 24,
          select: { user: { select: { username: true, name: true, image: true } } },
        },
        _count: { select: { owners: true } },
      },
    }),
    currentUser(),
  ]);
  if (!gear) notFound();

  const [photos, owned] = await Promise.all([
    prisma.photo.findMany({
      where: gear.type === "LENS" ? { lensGearId: gear.id } : { cameraGearId: gear.id },
      orderBy: { createdAt: "desc" },
      take: 24,
      select: {
        ...PHOTO_SELECT,
        thread: { select: { slug: true, title: true } },
        uploader: { select: { username: true, name: true, image: true } },
      },
    }),
    viewer
      ? prisma.userGear
          .findUnique({ where: { userId_gearId: { userId: viewer.id, gearId: gear.id } } })
          .then(Boolean)
      : Promise.resolve(false),
  ]);

  // Threads that mention this gear by name — cheap and surprisingly effective.
  const threads = await prisma.thread.findMany({
    where: {
      OR: [
        { title: { contains: gear.name, mode: "insensitive" } },
        { body: { contains: gear.name, mode: "insensitive" } },
      ],
    },
    orderBy: { lastPostAt: "desc" },
    take: 10,
    select: { slug: true, title: true, _count: { select: { posts: true } } },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/gear" className="hover:underline">Gear</Link> / <span>{gear.name}</span>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{gear.name}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {gear.brand}
            {gear.releaseYear ? ` · released ${gear.releaseYear}` : ""} · {gear._count.owners} members
            own it
          </p>
          {gear.description && (
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{gear.description}</p>
          )}
        </div>
        {viewer && <GearToggle gearId={gear.id} owned={owned} />}
      </header>

      <section className="mt-8">
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">
          Sample photos from members
        </h2>
        {photos.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            No photos shot with this yet. Upload one — the EXIF will file it here automatically.
          </p>
        ) : (
          <>
            <PhotoGallery photos={photos.map(toPhotoView)} />
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
              {photos.slice(0, 6).map((p) => (
                <li key={p.id} className="flex items-center gap-1.5">
                  <Avatar user={p.uploader} size={16} />
                  <Link href={`/u/${p.uploader.username}`} className="hover:underline">
                    {p.uploader.name ?? p.uploader.username}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {threads.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">
            Threads mentioning the {gear.name}
          </h2>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {threads.map((t) => (
              <li key={t.slug}>
                <Link href={`/t/${t.slug}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <span className="text-sm text-slate-800 dark:text-slate-200">{t.title}</span>
                  <span className="shrink-0 text-xs text-slate-400">{t._count.posts} replies</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {gear.owners.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Members with this</h2>
          <ul className="flex flex-wrap gap-2">
            {gear.owners.map(({ user }) => (
              <li key={user.username}>
                <Link
                  href={`/u/${user.username}`}
                  className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3 text-sm hover:border-brand-500 dark:border-slate-700"
                >
                  <Avatar user={user} size={22} />
                  {user.name ?? user.username}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: gear.name,
          brand: { "@type": "Brand", name: gear.brand },
          description: gear.description ?? undefined,
          category: gear.type,
          url: absoluteUrl(`/gear/${gear.slug}`),
          image: photos[0] ? absoluteUrl(urlFor(photos[0].displayKey)) : undefined,
        }}
      />
    </div>
  );
}
