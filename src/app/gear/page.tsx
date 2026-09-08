import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gear database",
  description:
    "Every camera and lens discussed on the forum, with real sample photos taken with each body and lens by members — pulled automatically from EXIF.",
  alternates: { canonical: "/gear" },
};

const TYPE_LABEL: Record<string, string> = {
  CAMERA: "Cameras",
  LENS: "Lenses",
  LIGHTING: "Lighting",
  ACCESSORY: "Accessories",
};

export default async function GearIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const gear = await prisma.gear.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { brand: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: [{ type: "asc" }, { brand: "asc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      brand: true,
      type: true,
      releaseYear: true,
      _count: { select: { cameraPhotos: true, lensPhotos: true, owners: true } },
    },
  });

  const grouped = gear.reduce<Record<string, typeof gear>>((acc, item) => {
    (acc[item.type] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Gear database</h1>
      <p className="mt-1 max-w-2xl text-slate-500 dark:text-slate-400">
        Every body and lens the community shoots with. When you upload a photo, {site.name} reads
        its EXIF and files the shot under the right gear page automatically — so each page shows
        real sample images, not marketing renders.
      </p>

      <form action="/gear" role="search" className="mt-5">
        <label htmlFor="gear-q" className="sr-only">Search gear</label>
        <input
          id="gear-q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search by brand or model…"
          className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
        />
      </form>

      {gear.length === 0 && (
        <p className="mt-8 text-sm text-slate-500">No gear matched &ldquo;{query}&rdquo;.</p>
      )}

      {Object.entries(grouped).map(([type, items]) => (
        <section key={type} className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            {TYPE_LABEL[type] ?? type}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/gear/${item.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-500 dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="block font-medium text-slate-900 dark:text-slate-100">
                    {item.name}
                  </span>
                  <span className="block text-xs text-slate-400">
                    {item.brand}
                    {item.releaseYear ? ` · ${item.releaseYear}` : ""}
                  </span>
                  <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">
                    {item._count.cameraPhotos + item._count.lensPhotos} sample photos ·{" "}
                    {item._count.owners} members own it
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
