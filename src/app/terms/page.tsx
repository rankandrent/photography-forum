import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `The terms you agree to when using ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Prose title="Terms of use" updated="on launch">
      <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        Template text. Have a lawyer in your jurisdiction review this before you launch publicly.
      </p>

      <h2>1. Your account</h2>
      <p>
        You must be 13 or older to register. You are responsible for what is posted from your
        account and for keeping your password secure.
      </p>

      <h2>2. Your content stays yours</h2>
      <p>
        You keep full copyright in every photograph and post you upload. By posting, you grant{" "}
        {site.name} a non-exclusive, worldwide licence to store, resize and display that content on
        the site and in previews of the site. You can revoke it by deleting the content.
      </p>

      <h2>3. What you may not post</h2>
      <p>
        Content you do not have the rights to, unlawful material, malware, or anything covered by
        the community guidelines as not allowed.
      </p>

      <h2>4. Moderation and termination</h2>
      <p>
        We may remove content or suspend accounts that break these terms. Serious or repeated
        breaches can result in permanent removal without notice.
      </p>

      <h2>5. No warranty</h2>
      <p>
        The service is provided &ldquo;as is&rdquo;. Advice given by members is their opinion, not
        professional guidance.
      </p>

      <h2>6. Changes</h2>
      <p>We will post material changes to these terms on the forum before they take effect.</p>
    </Prose>
  );
}
