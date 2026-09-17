import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Editorial & Content Verification Standards — PhotographyForum.net",
  description:
    "How PhotographyForum.net verifies gear advice, photo critique standards, and EXIF metadata integrity.",
  alternates: { canonical: absoluteUrl("/editorial-guidelines") },
};

export default function EditorialGuidelinesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Editorial & Verification Standards
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Our commitment to authentic photography advice, EXIF transparency, and expert community review.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 dark:prose-invert dark:text-slate-300">
        <h2>1. EXIF Metadata Extraction</h2>
        <p>
          We automatically parse and display EXIF metadata (camera body, lens model, focal length, aperture, shutter speed, ISO) from uploaded JPEG, PNG, and WebP images. This provides verifiable evidence of capture conditions and gear usage.
        </p>

        <h2>2. Gear Recommendation Accuracy</h2>
        <p>
          Camera and lens discussions must name specific, verifiable product models (e.g., <em>Sony a6700</em>, <em>Fujifilm X-T5</em>, <em>Sigma 18-50mm f/2.8</em>) rather than vague brand slogans.
        </p>

        <h2>3. Affiliate Disclosure</h2>
        <p>
          Some gear recommendation links contain affiliate tracking tags (`rel="sponsored nofollow"`). Commissions earned support server hosting and community maintenance without adding any cost to members.
        </p>

        <h2>4. Expert Contribution</h2>
        <p>
          Members holding <strong>Pro</strong> or <strong>Mentor</strong> badges undergo review of their portfolio and community history to ensure technical answers are accurate and helpful.
        </p>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Editorial & Verification Standards",
          url: absoluteUrl("/editorial-guidelines"),
        }}
      />
    </div>
  );
}
