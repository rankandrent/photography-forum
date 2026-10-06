# Learnings: content-qa

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->
- 2026-10-06 (owner, REPLACES the 2026-10-05 duplication rule): An image may repeat a table/list ONLY if that table/list is wrapped in `<details class="astext">` (collapsed "Show as text"). FAIL if the same content is visible twice in the open, or if an image drops or changes items of the block it represents.
- 2026-10-05 (owner): Image/table duplication is a FAIL. For every image, read the 10 lines around it; if a table or list nearby carries the same items, FAIL it and name the image. I missed this in choose-ux-research-agency (4 images repeated their tables/lists) and the owner caught it after publishing.
- 2026-10-05 (owner): FAIL a bold H2 answer longer than ~30 words (one sentence). Report the H2 and a shorter version.


## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->
- 2026-10-05 (choose-ux-research-agency): the SVGs looked fine as native-size screenshots, but inside the built page (`.prose img`, 628px desktop / 354px mobile) the 14–18px text rendered at 4–9px. Images on the page are `loading="lazy"`, so `naturalWidth` reads 0 until each image is scrolled into view. Rule: serve `out/` locally (python http.server), scroll each image into view, record rendered width ÷ viewBox width, and judge legibility at rendered text size (≥ 12px desktop). Do not judge from native-size renders.
- 2026-10-05 (choose-ux-research-agency): reading the built FAQPage JSON-LD showed that a closing paragraph after the last FAQ was included in that FAQ's schema answer. The markdown alone did not show this. Rule: always print each FAQPage `acceptedAnswer.text` from `out/…/index.html` and check that it holds only the answer.
- 2026-10-05 (choose-ux-research-agency): the `beats` page was EGRESS_BLOCKED, and a WebSearch of the exact title returned the page's opening definition and framing snippets, enough to judge intro and focus but not a 5-gram percentage. Rule: when the fetch is blocked, compare structure from the snippets, say in the report that the numeric overlap could not be computed, and still require every serpGap to be covered.
- 2026-10-05 (choose-ux-research-agency, round 2): round 1 passed the cover from desktop alone. At 390px the `.pcover` box switches to 16:9 with `object-fit: cover`, which cropped the 1600×600 cover's left-aligned title. Rule: for every image, read the container's computed `object-fit` and `aspect-ratio` at each viewport, then screenshot the element at 390px and 1440px. Inline images and the cover both count; a cropped hero is a FAIL even when the inline graphics pass.
- 2026-10-06 (saas-product-redesign): the designer and writer both logged that they "fixed" the rollout image's duplication by switching to an exposure-over-time axis, yet a label-by-label check showed every label on the image already in the list or the sentence under it. Rule: for each image, list its text labels and tick each one off against the adjacent list or table and the following paragraph. If nearly all are present, FAIL it whatever the other agents' reports say. An axis change is not new content.
- 2026-10-06 (saas-product-redesign): text, alt, spelling and legibility checks all passed on the decision tree, but walking each root-to-leaf path showed a branch that gave wrong advice and a footer that pointed to prices the table does not hold. Rule: for any decision tree or flow image, walk every path as a concrete case and compare it with the post's prose. Check every "see the table/section" pointer on an image against the real content.
