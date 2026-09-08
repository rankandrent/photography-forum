import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `What data ${site.name} collects and why.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Prose title="Privacy policy" updated="on launch">
      <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        Template text. Adapt it to what your deployment actually does, then have it reviewed.
      </p>

      <h2>What we store</h2>
      <ul>
        <li>Account: username, email, password hash, and anything you add to your profile.</li>
        <li>Content: your threads, replies, critiques, votes and uploaded photos.</li>
        <li>
          Photo metadata: EXIF read from your uploads (camera, lens, exposure, capture time) is
          stored and shown publicly. GPS coordinates are <strong>not</strong> stored.
        </li>
        <li>Technical: server logs containing IP address and user agent, kept for abuse handling.</li>
      </ul>

      <h2>Why</h2>
      <p>
        To run the forum, show your posts to other members, prevent abuse, and power the gear pages.
        We do not sell personal data.
      </p>

      <h2>Third parties</h2>
      <p>
        Sign-in with Google is optional and only used to authenticate you. Hosting, database and
        image storage providers process data on our behalf.
      </p>

      <h2>Your rights</h2>
      <p>
        You can edit or delete your content at any time, and request full account deletion — which
        removes your profile, posts and uploads.
      </p>

      <h2>Cookies</h2>
      <p>
        A session cookie keeps you signed in and a small preference is stored locally for your
        light/dark theme choice. No advertising cookies are set.
      </p>
    </Prose>
  );
}
