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
          <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Community &amp; Trust</h2>
          <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/about" className="hover:underline font-medium text-sky-600 dark:text-sky-400">About Us</Link></li>
            <li><Link href="/team" className="hover:underline">Team &amp; Moderators</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact &amp; Support</Link></li>
            <li><Link href="/categories" className="hover:underline">All categories</Link></li>
            <li><Link href="/gear" className="hover:underline">Gear database</Link></li>
            <li><Link href="/members" className="hover:underline">Members</Link></li>
          </ul>
        </nav>
        <nav aria-label="Resources">
          <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Standards &amp; Verification</h2>
          <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/editorial-guidelines" className="hover:underline">Editorial Guidelines</Link></li>
            <li><Link href="/moderation-policy" className="hover:underline">Moderation Policy</Link></li>
            <li><Link href="/guidelines" className="hover:underline">Community Guidelines</Link></li>
            <li><Link href="/search" className="hover:underline">Search</Link></li>
            <li><a href="/sitemap_index.xml" className="hover:underline">Sitemap Index</a></li>
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
      {/* Amazon's Associates Operating Agreement requires this sentence
          verbatim — it is not a phrasing to improve on. It belongs sitewide,
          but note it does not replace disclosing an affiliate link where the
          link actually appears, which is what the FTC asks for. */}
      <div className="border-t border-slate-100 px-4 py-4 text-center text-xs text-slate-400 dark:border-slate-800">
        <p>
          {site.name} is a participant in the Amazon Services LLC Associates Program, an affiliate
          advertising program designed to provide a means for sites to earn advertising fees by
          advertising and linking to Amazon.com. As an Amazon Associate we earn from qualifying
          purchases.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} {site.name}. Photographs remain the copyright of their
          authors.
        </p>
      </div>
    </footer>
  );
}
