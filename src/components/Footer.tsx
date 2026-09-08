import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{site.name}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{site.tagline}</p>
        </div>
        <nav aria-label="Community">
          <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Community</h2>
          <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/categories" className="hover:underline">All categories</Link></li>
            <li><Link href="/challenges" className="hover:underline">Weekly challenge</Link></li>
            <li><Link href="/gear" className="hover:underline">Gear database</Link></li>
            <li><Link href="/members" className="hover:underline">Members</Link></li>
          </ul>
        </nav>
        <nav aria-label="Resources">
          <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Resources</h2>
          <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/guidelines" className="hover:underline">Community guidelines</Link></li>
            <li><Link href="/search" className="hover:underline">Search</Link></li>
            <li><a href="/feed.xml" className="hover:underline">RSS feed</a></li>
            <li><a href="/sitemap.xml" className="hover:underline">Sitemap</a></li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Legal</h2>
          <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/terms" className="hover:underline">Terms of use</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy policy</Link></li>
            <li><Link href="/copyright" className="hover:underline">Copyright &amp; DMCA</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-100 px-4 py-4 text-center text-xs text-slate-400 dark:border-slate-800">
        © {new Date().getFullYear()} {site.name}. Photographs remain the copyright of their authors.
      </div>
    </footer>
  );
}
