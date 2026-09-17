import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/Avatar";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Team & Moderation Board — PhotographyForum.net",
  description:
    "Meet the photographers, moderators, and team members behind PhotographyForum.net.",
  alternates: { canonical: absoluteUrl("/team") },
};

export default async function TeamPage() {
  const staffMembers = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "MOD"] } },
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
      role: true,
      bio: true,
      location: true,
      website: true,
      instagram: true,
      experienceLevel: true,
      createdAt: true,
      _count: { select: { threads: true, posts: true, critiques: true } },
    },
    orderBy: { role: "asc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Meet Our Team & Moderators
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          PhotographyForum.net is maintained by experienced photographers dedicated to fostering an encouraging, high-quality community.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {staffMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center gap-4">
                <Avatar user={member} size={56} />
                <div>
                  <Link
                    href={`/u/${member.username}`}
                    className="font-bold text-slate-900 hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-400"
                  >
                    {member.name ?? member.username}
                  </Link>
                  <p className="text-xs text-slate-500">@{member.username}</p>
                  <span className="mt-1 inline-block rounded bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                    {member.role === "ADMIN" ? "🛡️ Administrator" : "🛡️ Moderator"}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                {member.bio ?? "Experienced photographer active in gear discussions and community critiques."}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800">
              <span>{member._count.critiques} critiques given</span>
              <span>{member._count.posts} replies</span>
              <Link
                href={`/u/${member.username}`}
                className="font-semibold text-sky-600 hover:underline dark:text-sky-400"
              >
                View Profile →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Team & Moderation Board",
          url: absoluteUrl("/team"),
        }}
      />
    </div>
  );
}
