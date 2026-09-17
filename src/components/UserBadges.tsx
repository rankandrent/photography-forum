export interface BadgeUser {
  role?: "USER" | "MOD" | "ADMIN";
  emailVerified?: Date | null;
  website?: string | null;
  portfolioUrl?: string | null;
  experienceLevel?: string | null;
  isVerified?: boolean;
  isPro?: boolean;
  isMentor?: boolean;
  postsCount?: number;
}

export function UserBadges({ user }: { user: BadgeUser }) {
  const isVerified =
    user.isVerified ||
    Boolean(user.emailVerified && (user.portfolioUrl || user.website));

  const isPro =
    user.isPro ||
    user.experienceLevel === "PRO" ||
    user.experienceLevel === "STUDIO";

  const isMentor =
    user.isMentor ||
    (user.postsCount && user.postsCount >= 100) ||
    user.role === "MOD" ||
    user.role === "ADMIN";

  if (!isVerified && !isPro && !isMentor && user.role === "USER") {
    return null;
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-1 text-[11px] font-semibold">
      {user.role === "ADMIN" && (
        <span className="rounded bg-rose-100 px-1.5 py-0.5 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
          🛡️ Admin
        </span>
      )}
      {user.role === "MOD" && (
        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          🛡️ Mod
        </span>
      )}
      {isVerified && (
        <span
          title="Verified Photographer"
          className="inline-flex items-center gap-0.5 rounded bg-sky-100 px-1.5 py-0.5 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300"
        >
          ✅ Verified
        </span>
      )}
      {isPro && (
        <span
          title="Pro Photographer"
          className="inline-flex items-center gap-0.5 rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
        >
          🏆 Pro
        </span>
      )}
      {isMentor && (
        <span
          title="Community Mentor"
          className="inline-flex items-center gap-0.5 rounded bg-purple-100 px-1.5 py-0.5 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300"
        >
          🎓 Mentor
        </span>
      )}
    </div>
  );
}
