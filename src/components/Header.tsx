import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { currentUser, isStaff } from "@/lib/session";
import { logoutAction } from "@/actions/account";
import { Avatar } from "@/components/Avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/lib/site";

const NAV = [
  { href: "/categories", label: "Categories" },
  { href: "/gear", label: "Gear" },
  { href: "/challenges", label: "Challenges" },
];

export async function Header() {
  const user = await currentUser();
  const unread = user
    ? await prisma.notification.count({ where: { userId: user.id, read: false } })
    : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-600" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18M3.5 8h17M3.5 16h17M7 3.8 17 20.2M17 3.8 7 20.2" strokeWidth="1" />
          </svg>
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form action="/search" role="search" className="ml-auto hidden max-w-xs flex-1 sm:block">
          <label htmlFor="site-search" className="sr-only">Search the forum</label>
          <input
            id="site-search"
            type="search"
            name="q"
            placeholder="Search threads…"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 sm:ml-0">
          <ThemeToggle />

          {user ? (
            <>
              <Link
                href="/notifications"
                aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
                className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                {unread > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>

              {isStaff(user) && (
                <Link
                  href="/moderation"
                  className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40 sm:block"
                >
                  Mod
                </Link>
              )}

              <Link href={`/u/${user.username}`} className="rounded-lg p-1" aria-label="Your profile">
                <Avatar user={user} size={32} />
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg px-2 py-1.5 text-sm text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Sign out
                </button>
              </form>

              <Link
                href="/new"
                className="ml-1 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                New thread
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>

      <nav aria-label="Mobile" className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-1.5 dark:border-slate-800 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-lg px-3 py-1 text-sm text-slate-600 dark:text-slate-400"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
