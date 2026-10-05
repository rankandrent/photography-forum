# Learnings: content-qa

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->
- 2026-10-05 (owner): Image/table duplication is a FAIL. For every image, read the 10 lines around it; if a table or list nearby carries the same items, FAIL it and name the image. I missed this in choose-ux-research-agency (4 images repeated their tables/lists) and the owner caught it after publishing.
- 2026-10-05 (owner): FAIL a bold H2 answer longer than ~30 words (one sentence). Report the H2 and a shorter version.


## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->
- 2026-10-05 (choose-ux-research-agency): the SVGs looked fine as native-size screenshots, but inside the built page (`.prose img`, 628px desktop / 354px mobile) the 14–18px text rendered at 4–9px. Images on the page are `loading="lazy"`, so `naturalWidth` reads 0 until each image is scrolled into view. Rule: serve `out/` locally (python http.server), scroll each image into view, record rendered width ÷ viewBox width, and judge legibility at rendered text size (≥ 12px desktop). Do not judge from native-size renders.
- 2026-10-05 (choose-ux-research-agency): reading the built FAQPage JSON-LD showed that a closing paragraph after the last FAQ was included in that FAQ's schema answer. The markdown alone did not show this. Rule: always print each FAQPage `acceptedAnswer.text` from `out/…/index.html` and check that it holds only the answer.
- 2026-10-05 (choose-ux-research-agency): the `beats` page was EGRESS_BLOCKED, and a WebSearch of the exact title returned the page's opening definition and framing snippets, enough to judge intro and focus but not a 5-gram percentage. Rule: when the fetch is blocked, compare structure from the snippets, say in the report that the numeric overlap could not be computed, and still require every serpGap to be covered.
- 2026-10-05 (choose-ux-research-agency, round 2): round 1 passed the cover from desktop alone. At 390px the `.pcover` box switches to 16:9 with `object-fit: cover`, which cropped the 1600×600 cover's left-aligned title. Rule: for every image, read the container's computed `object-fit` and `aspect-ratio` at each viewport, then screenshot the element at 390px and 1440px. Inline images and the cover both count; a cropped hero is a FAIL even when the inline graphics pass.
