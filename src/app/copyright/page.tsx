import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Copyright & DMCA",
  description: `How to report infringing photographs on ${site.name}.`,
  alternates: { canonical: "/copyright" },
};

export default function CopyrightPage() {
  return (
    <Prose title="Copyright &amp; takedown">
      <p>
        Every photograph on {site.name} belongs to the member who uploaded it. Reposting someone
        else&apos;s work without permission is grounds for removal and a ban.
      </p>

      <h2>Reporting infringement</h2>
      <p>Send a notice that includes all of the following:</p>
      <ul>
        <li>The URL of the infringing post on this site.</li>
        <li>Proof you own the original (a link to where it was first published, or the RAW file).</li>
        <li>Your contact details.</li>
        <li>
          A statement that you believe in good faith the use is not authorised, and that the
          information in your notice is accurate.
        </li>
      </ul>
      <p>
        Set your takedown contact address here before launch. Complete notices are acted on within
        two business days.
      </p>

      <h2>Counter-notice</h2>
      <p>
        If your content was removed and you believe that was a mistake, reply to the removal
        notification with your reasoning. We restore content when the claim does not hold up.
      </p>

      <h2>Repeat infringers</h2>
      <p>Accounts with repeated valid claims against them are permanently removed.</p>
    </Prose>
  );
}
