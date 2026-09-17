import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Moderation Policy — PhotographyForum.net",
  description:
    "Learn about our content moderation standards, anti-spam rules, and community guidelines on PhotographyForum.net.",
  alternates: { canonical: absoluteUrl("/moderation-policy") },
};

export default function ModerationPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Content Moderation Policy
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          How we enforce quality, integrity, and safety across PhotographyForum.net.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 dark:prose-invert dark:text-slate-300">
        <h2>1. Objective & Community Standards</h2>
        <p>
          PhotographyForum.net is committed to maintaining a welcoming, authentic environment for photographers of all skill levels. We actively monitor content to protect our members from spam, abusive behavior, and low-quality automated content.
        </p>

        <h2>2. Prohibited Content</h2>
        <ul>
          <li><strong>Scaled Content Abuse & Spam:</strong> Auto-generated posts, repetitive affiliate link farming, and template replies are strictly prohibited.</li>
          <li><strong>Harassment & Disrespect:</strong> Unconstructive criticism or personal attacks will result in immediate content removal and user suspension.</li>
          <li><strong>Copyright Infringement:</strong> Posting photographs owned by others without permission is forbidden.</li>
        </ul>

        <h2>3. Verification & Badges</h2>
        <p>
          Members can earn <strong>Verified Photographer</strong>, <strong>Pro</strong>, and <strong>Mentor</strong> badges by verifying portfolio work, sharing original photos with EXIF metadata, and providing helpful community feedback.
        </p>

        <h2>4. Reporting & Enforcement</h2>
        <p>
          If you encounter inappropriate posts or spam, click the "Report" button on any post. Our moderation team reviews reported items within 24 hours.
        </p>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Content Moderation Policy",
          url: absoluteUrl("/moderation-policy"),
        }}
      />
    </div>
  );
}
