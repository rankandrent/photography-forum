import Link from "next/link";

export type ForumStats = {
  forumsCount: number;
  topicsCount: number;
  postsCount: number;
  onlineCount: number;
  membersCount: number;
};

export function ForumInformation({ stats }: { stats: ForumStats }) {
  const { forumsCount, topicsCount, postsCount, onlineCount, membersCount } = stats;

  // Format large numbers (e.g. 23800 -> 23.8 K)
  const formatCompact = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + " M";
    if (num >= 1000) return (num / 1000).toFixed(1) + " K";
    return num.toLocaleString();
  };

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header with underline accent */}
      <div className="relative mb-3.5 border-b border-slate-100 pb-2 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-base">📊</span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Forum Information
          </h2>
        </div>
        {/* Red / Brand Active Line */}
        <div className="absolute -bottom-px left-0 h-0.5 w-24 bg-rose-500 rounded-full" />
      </div>

      {/* Statistics Bar */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-sm text-slate-700 dark:text-slate-300">
        {/* Forums */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500">💭</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{forumsCount}</span>
          <span className="text-slate-500 dark:text-slate-400">Forums</span>
        </div>

        {/* Topics */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500">💬</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{formatCompact(topicsCount)}</span>
          <span className="text-slate-500 dark:text-slate-400">Topics</span>
        </div>

        {/* Posts */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500">📣</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{formatCompact(postsCount)}</span>
          <span className="text-slate-500 dark:text-slate-400">Posts</span>
        </div>

        {/* Online Members */}
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 ring-1 ring-emerald-500/20 dark:bg-emerald-950/40 dark:ring-emerald-500/30">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-700 dark:text-emerald-300">{onlineCount}</span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Online Now</span>
        </div>

        {/* Members */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500">👤</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{formatCompact(membersCount)}</span>
          <span className="text-slate-500 dark:text-slate-400">Members</span>
        </div>
      </div>
    </section>
  );
}
