import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/session";
import { NewThreadForm } from "@/components/NewThreadForm";

export const metadata: Metadata = {
  title: "Start a thread",
  robots: { index: false, follow: false },
};

export default async function NewThreadPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/login?next=/new");

  const { category } = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
    select: { id: true, name: true, slug: true, section: true },
  });
  const preselected = categories.find((c) => c.slug === category)?.id ?? categories[0]?.id;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Start a thread</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Good threads are specific. Include the gear, the settings and what you already tried.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <NewThreadForm categories={categories} defaultCategoryId={preselected} />
      </div>
    </div>
  );
}
