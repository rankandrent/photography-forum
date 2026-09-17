import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Us & Editorial Mission — PhotographyForum.net",
  description:
    "The story behind PhotographyForum.net: built by photographers for real image critiques, camera gear discussions, and authentic community.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          About PhotographyForum.net
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          An independent community dedicated to real photo critique, authentic camera gear discussions, and helping photographers grow.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 dark:prose-invert dark:text-slate-300">
        <p className="lead text-lg font-medium">
          When I first picked up a camera ten years ago, I remember the frustrating wall every beginner hits: social media algorithms reward glossy, over-edited snapshots, while traditional photo sites are drowned out by affiliate sales fluff and bot commentary.
        </p>

        <p>
          I built <strong>PhotographyForum.net</strong> out of a simple need: I wanted a home for real photographers to gather, share original work, and receive genuine, constructive critique on exposure, composition, and gear selection without the noise.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Our Core Philosophy</h2>
        <p>
          A great photograph isn't just about owning a $4,000 full-frame body or the sharpest f/1.2 glass. It comes down to light, timing, intent, and practice. That’s why we built our platform around three non-negotiable principles:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>1. Automatic EXIF Metadata Integrity:</strong> Every photo shared in our critique and showcase sections automatically extracts shutter speed, aperture, ISO, focal length, and camera model. Photographers learn by analyzing real settings behind real shots.
          </li>
          <li>
            <strong>2. Zero Tolerated Spam & AI Abuse:</strong> We aggressively audit and filter auto-generated marketing spam. Every discussion thread and critique here represents authentic human experience.
          </li>
          <li>
            <strong>3. Constructive, Respectful Feedback:</strong> Our structured Critique Panel lets members rate composition, lighting, and post-processing separately so feedback is always practical and actionable.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Meet the Community</h2>
        <p>
          Whether you are a street photographer carrying a compact prime, a landscape shooter chasing golden hour atmospheric light, or a studio portrait artist dialing in softboxes, you belong here.
        </p>
        <p>
          Explore our <Link href="/team" className="text-sky-600 hover:underline dark:text-sky-400">Moderation Team</Link>, check out our <Link href="/editorial-guidelines" className="text-sky-600 hover:underline dark:text-sky-400">Editorial Guidelines</Link>, or browse our <Link href="/gear" className="text-sky-600 hover:underline dark:text-sky-400">Gear Database</Link> to see real sample photos taken with your camera setup.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4 rounded-2xl border border-sky-200 bg-sky-50 p-6 dark:border-sky-900 dark:bg-sky-950/40">
        <div>
          <h3 className="font-semibold text-sky-900 dark:text-sky-100">Have a question or suggestion?</h3>
          <p className="mt-1 text-sm text-sky-700 dark:text-sky-300">
            We'd love to hear from you. Reach out to our community team anytime.
          </p>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
          >
            Contact Us
          </Link>
          <Link
            href="/moderation-policy"
            className="rounded-lg border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-100 dark:border-sky-700 dark:text-sky-200 dark:hover:bg-sky-900"
          >
            Moderation Policy
          </Link>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About PhotographyForum.net",
          url: absoluteUrl("/about"),
          description: site.description,
          publisher: {
            "@type": "Organization",
            name: site.name,
            url: absoluteUrl("/"),
          },
        }}
      />
    </div>
  );
}
