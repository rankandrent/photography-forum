import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community guidelines",
  description: "How to ask, answer and critique on the forum so everyone gets something out of it.",
  alternates: { canonical: "/guidelines" },
};

export default function GuidelinesPage() {
  return (
    <Prose title="Community guidelines">
      <p>
        {site.name} works because people give each other real feedback. These rules keep it that way.
      </p>

      <h2>Giving critique</h2>
      <ul>
        <li>Say what works before what doesn&apos;t. Both need a reason.</li>
        <li>Be specific: &ldquo;the horizon tilts left&rdquo; helps, &ldquo;nice shot&rdquo; does not.</li>
        <li>Critique the photograph, never the photographer.</li>
        <li>If you rate low, explain what you would have done instead.</li>
      </ul>

      <h2>Asking for critique</h2>
      <ul>
        <li>Say what you were going for — we cannot tell you if you got there otherwise.</li>
        <li>Post the frame you actually want feedback on, not ten variants of it.</li>
        <li>Leave the EXIF intact. Settings are half the conversation.</li>
      </ul>

      <h2>Posting photos</h2>
      <ul>
        <li>Only upload photographs you took, or have permission to post.</li>
        <li>Get consent before posting recognisable people in private settings.</li>
        <li>Label heavy compositing or AI generation when it is not obvious.</li>
      </ul>

      <h2>Not allowed</h2>
      <ul>
        <li>Harassment, slurs, or personal attacks.</li>
        <li>Reposting other people&apos;s work as your own.</li>
        <li>Affiliate spam and drive-by self-promotion. Share work, not funnels.</li>
        <li>Sexual content involving minors — reported to authorities, no exceptions.</li>
      </ul>

      <h2>Moderation</h2>
      <p>
        Reports go to a queue moderators read daily. We remove content, lock threads, or suspend
        accounts depending on severity. If you think a decision was wrong, reply to the moderator
        who made it.
      </p>
    </Prose>
  );
}
