# Learnings: content-visual-designer

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->

## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->

- 2026-10-05 (choose-ux-research-agency): Python-generated cover.svg had a shared line-style string plus an
  extra `stroke-width`, producing a duplicate attribute; Chromium's DOMParser rejected it ("Attribute
  stroke-width redefined") while the image still looked fine in a quick glance. Rule: never append an
  attribute to a reused attribute string; always run the DOMParser `parsererror` check on every SVG, not just a screenshot.
- 2026-10-05 (choose-ux-research-agency): Manrope is not installed in the render sandbox, so the fallback font
  is wider; a 470px pill label overflowed, and 18px bold questions over ~40 characters overran a 420px card.
  Rule: size text boxes for the fallback font (about 0.6em per character bold, 0.52em regular), wrap card
  text over ~36 characters onto two lines, and check getBBox overflow plus a screenshot before finishing.
  Playwright here is global (`/opt/node22/lib/node_modules/playwright`), not in the repo's node_modules.
- 2026-10-05 (choose-ux-research-agency): Process steps without a stated duration (e.g. "Observers invited")
  tempt invented timings on a Gantt. Rule: draw a bar only for durations the post states; show untimed steps
  as an icon and text row, and keep sublabels to words from the post (deleted an invented "Before sessions run").
