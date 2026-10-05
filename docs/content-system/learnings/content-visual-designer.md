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
- 2026-10-05 (choose-ux-research-agency, QA FAIL): all 5 inline infographics were drawn on a 1200px-wide viewBox with 14–18px text. The blog's `.prose img` shows them at 628px on desktop and 354px on mobile, so the text rendered at 7–9px on desktop and 4–5px on mobile, and could not be read. The screenshots had been checked only at native size. Rule: design for the rendered width. In a 1200px viewBox the smallest text is ≥ 24px and labels are ≥ 28px (≥ 12px at 628px), or use an 800px viewBox with ≥ 16px text. Keep graphics to labels and leave sentences to the post. Screenshot the image inside the built page at 1440px and 390px before handing back.
- 2026-10-05 (choose-ux-research-agency, repair round 1): the repair brief offered "800px wide with ≥ 18px text", but 18px in an 800px viewBox renders at 8px on the 354px phone column; the ≥ 11px-at-354px check needed ≥ 25px. Rule: derive the minimum font from the narrowest display width, `min_svg_px = 11 × viewBoxWidth / 354` (26px at 800 wide, 38px at 1200), and verify with `naturalWidth` vs rendered width inside the built page, not with a fixed px rule.
- 2026-10-05 (choose-ux-research-agency, repair round 1): the 800-wide redesigns worked by stacking one item per full-width card (red flags, proposal units, timeline steps each on its own row with a mini 10-day strip) and dropping every sublabel; tables became label + weight + blank boxes. Rule: for inline graphics, one idea per row, at most ~30 characters per line at 26px (wrap questions onto two lines), and let the canvas grow tall (800×1050 to 800×1570 was fine).
- 2026-10-05 (choose-ux-research-agency, repair round 1): the orchestrator had already swapped the markers into the post, so changing alt text in visuals.json does not reach the post on its own. Rule: when a redesign changes what an image shows, update visuals.json and also report the exact post lines whose alt text the orchestrator must replace.
- 2026-10-05 (choose-ux-research-agency, QA round 2 FAIL): the cover was drawn at 1600×600 with text from x=100. The post template crops it with `object-fit: cover` to 21:8 on desktop but 16:9 on mobile (`.pcover`, `app/globals.css`), so at 390px only x ≈ 267–1333 is visible, and the hero read "w to choose a / research agency". Rule: keep all cover text inside the 16:9 centre safe area, x 300–1300 and y 40–560. Make the smallest cover text ≥ 30px (≥ 10px at the 0.332 mobile scale). Screenshot `.pcover` in the built page at 390px.
- 2026-10-05 (choose-ux-research-agency, cover redraw after QA round 2): while I redrew the cover, the orchestrator also changed mobile `.pcover--img` to `aspect-ratio: auto` (the full 8:3 image, 354×133 at 390px), so the mobile scale became 0.221, not the 0.332 the brief assumed, and a 30px kicker rendered at about 6.6px. Rule: measure the live `.pcover` box in the built page before choosing sizes, design for both cases (all text in x 300–1300 for a 16:9 crop, and kicker/subtitle ≥ 36–40px for the uncropped 0.221 scale), and use a 3-line 80px title, which measured 300–961 with the fallback font. Also stop the server with `kill` on the PID, because `pkill -f "serve out"` matches and kills the calling shell.
