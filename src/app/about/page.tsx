import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Avatar } from "@/components/Avatar";

export const metadata: Metadata = {
  title: "About Us & Editorial Standards — PhotographyForum.net",
  description:
    "Learn about PhotographyForum.net, our community mission, editorial integrity, photography moderation standards, and how we empower creators.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About PhotographyForum.net",
    description:
      "Independent community for camera gear discussions, portrait critiques, astrophotography techniques, and real photographer advice.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <header className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
          📷 Independent Photography Community
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          About PhotographyForum.net
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Dedicated to authentic camera gear reviews, hands-on photo critiques, and genuine advice between photographers.
        </p>
      </header>

      {/* Grid Content */}
      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Our Mission</h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
            PhotographyForum.net was created to provide a distraction-free, independent space for photographers of all skill levels - from beginners taking their first steps to seasoned professionals shooting landscapes, weddings, astrophotography, and street portraits.
          </p>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
            In an era of generic algorithm-driven content, we prioritize real-world experience, side-by-side gear comparisons, exact camera setting suggestions, and constructive image critiques.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Editorial Integrity & Affiliate Transparency</h2>
          <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
            <p className="leading-relaxed">
              <strong>Transparent Recommendations:</strong> We only recommend camera bodies, prime lenses, zooms, and lighting equipment that have proven real-world value for photographers.
            </p>
            <p className="leading-relaxed">
              <strong>Affiliate Disclosure:</strong> When members click outbound links to purchase camera gear on Amazon or authorized retailers, we may earn a small associate commission at zero extra cost to the buyer. All affiliate links use standard <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-sky-600 dark:bg-slate-800 dark:text-sky-300">rel="sponsored ugc"</code> disclosures.
            </p>
            <p className="leading-relaxed">
              <strong>No Sponsored Bias:</strong> Brands cannot pay for positive reviews or forum rankings. Discussions are driven purely by real user feedback and hands-on shooting performance.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Community & Moderation Standards</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-slate-600 dark:text-slate-400">
            <li><strong>Constructive Critiques:</strong> Image feedback must focus on composition, lighting, exposure, and editing techniques. Personal insults are strictly forbidden.</li>
            <li><strong>No Spam or Bot Endorsements:</strong> Auto-generated promotional spam, generic duplicate posts, or off-topic commercial advertising are immediately removed by our moderation team.</li>
            <li><strong>EXIF Data Preservation:</strong> We encourage members to share camera body, lens, focal length, aperture, shutter speed, and ISO details with uploaded photos to foster learning.</li>
          </ul>
        </section>

        {/* Quick Links Footer Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-sky-500/10 p-6 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200">
          <div>
            <h3 className="font-bold">Have questions or want to join the discussion?</h3>
            <p className="text-xs text-sky-700 dark:text-sky-300">Check out our community guidelines or start a new thread today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/guidelines"
              className="rounded-xl border border-sky-300 bg-white px-4 py-2 text-xs font-semibold text-sky-700 shadow-sm hover:bg-sky-50 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800"
            >
              Community Guidelines
            </Link>
            <Link
              href="/new"
              className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-sky-500"
            >
              Start New Thread
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
