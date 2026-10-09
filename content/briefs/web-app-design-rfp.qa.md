# QA report: web-app-design-rfp (2026-10-09, review loop 1)

Reviewer: content-qa. Files: content/blog/web-app-design-rfp.md, content/briefs/web-app-design-rfp.json, public/blog/web-app-design-rfp/*.svg.
Build: `SHOW_DRAFTS=1 npm run build` from a clean tree (HEAD fff7337, `git status` clean before and after).

## Checklist

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Intent & cannibalisation | PASS | Commercial-investigation / vendor procurement intent, matches the template + scoring body. `rg -i "rfp\|request for proposal" content/` (excluding briefs) finds only this post and choose-ux-research-agency's FAQ "Do I need an RFP to hire a UX research agency?" (different silo and query, and its "No, unless procurement rules" answer is consistent with this post's L30). No hub/industry/location page targets the keyword. |
| 2–3 | Facts / honesty | skipped | fact-checker. |
| 4 | Semantic SEO | FIX | metaTitle 57 chars, title 58, description 147 on the built HTML (no entities). The description ends on a next step: "Then request a fixed-scope proposal." (matches the BOFU CTA). Density: 7 exact uses, 1.15% of 2,445 words (1.52% of the 1,837 open words); in range. Every bold answer is one sentence of 21–29 words, except L40, which is a fragment (F1). Boolean FAQs open with Yes / No / Yes. No banned phrases or hedges. No digit-first sentence (`grep -nE '^(\*\*)?[0-9]+ '` returns nothing). Abbreviations: WCAG and Q&A are expanded only inside collapsed `<details>`, and their first open-text use is unexpanded (F5, F7). Keyword sentences quoted and tested below. |
| 5 | Internal links | PASS (orchestrator exception) | There are 5 contextual links: hub (intro, L26), digital-product-design (the one cross-hub link, L36), TradeZella (L223), /contact/ (L225) and the hub cost deep link (L225). All targets build, and `#how-much-does-web-app-design-cost` exists on the hub. Anchors vary. The hub is linked early and again near the end. That is below the 6–12 rule. I accept it as the orchestrator directed: Apex HCM is a TODO stub, the only same-silo post (fintech-ux-design) is a draft stub, and BOFU posts stay lean per RULES. No genuinely relevant non-hub target exists. |
| 6 | Images | FIX (non-blocking) | All 7 SVGs exist in public/ and out/, are 4–12 KB, have no `<image>` or external href, and no third-party brand assets. Alt text is descriptive. Screenshots inside the built page: desktop renders at 760/800 = 0.95 (26px text shows at about 24.7px), mobile at 354/800 = 0.4425 (about 11.5px), and both are legible in the 390 screenshots. Cover: 21:8 at 1440, 16:9 `object-fit: cover` at 390, and the title is fully visible (no crop). Spelling is clean. Section map height: 2,595px at 1440 (2.9 viewports) and 1,209px at 390. It is acceptable for loop 1, because it is legible, complete and the only home of the 9-section template, but it is the tallest image on the site. F11 (designer) asks for a 2-column redraw. quality-gate-scoring.svg pill reads "Suggested example weights, not a standard:" with a trailing colon (F10). |
| 6b | Duplication | PASS | All 6 `<details class="astext">` blocks are collapsed (`open=false` at both widths). Labels were checked one by one: section map 9/9 rows × 4 fields, grid 9 rows × 5 cells + totals, six states 6/6, acceptance 6/6, rewrites 5/5, scoring 3 stages and weights. Nothing dropped or changed. The timeline (L215–219) is a visible list with no image, as intended. |
| 7 | Readability | FIX | US spelling. No paragraph over 4 sentences. 5-gram overlap: highest blog 0.62% (design-system-roi), hub 1.07% (shared phrases are hub facts: "5–8 users per role", "1280, 1440 and 1920 px", "teams that build a new product from zero"). All far below 12%. Grammar and logic defects: F2, F3, F4, F6, F8, F9. |
| 7a | Competitor originality | PASS (numeric overlap not computable) | simpalm.com is blocked twice (WebFetch ENOTFOUND, curl proxy 403 connect_rejected), so I used search snippets. Simpalm order: organization → project → audience → scope → timeline → budget → proposal timeline → proposal format → evaluation. Ours: context, goals, users and roles, workflow inventory, screen states and data, research access, requirements and handoff, budget and timeline, proposal format and evaluation. Four sections are design-specific and absent from simpalm, the tail order is generic to any RFP, and there are no shared examples. All 7 serpGaps are covered (gap 6, handoff, mostly in image or collapsed text, see G1). |
| 7b | Silo & leads | PASS | services[0] = web-app-design-services (correct hub). One cross-hub link, no other-silo posts. funnel bofu is confirmed: the SERP in the brief is vendor RFP templates and procurement scoring pages (simpalm, wapiti, sixfeetup, chopdawg, rfp360), the same vendor-selection intent as funnel.json's BOFU example "how to choose a ux design agency". The reader has budget and is inviting bidders this month. serviceSupport is 5 (≥5). Lead angle: mid-post invitation L96 (half-filled grid on a first call) and closing L225 (bidder list), with no hard sell. Note: the "← Previous guide" link to /blog/fintech-ux-design/ (a draft stub in the same silo) appears only because of SHOW_DRAFTS. Confirm it is absent in the production build. |
| 7c | Variety | PASS | Type Checklist (last 4: Guide, Guide, Comparison, Guide), intro style definition (unused so far), new visual types (section map, role × workflow matrix, six-state strip, acceptance card, rewrite card, scoring gate) and a new CTA angle (bidder list). This differs on more than 4 axes from the last 5 posts. The intro and closing are not reused. |
| 7d | Completeness | FAIL | 2 gaps (G1, G2), see the guidance below. |
| 7e | On-page | PASS | `npm run onpage -- /blog/web-app-design-rfp/` gives score 100 with `failed: []`. Manual items: real author (Sahar Asif) and contributor (Umar Sarwar) with LinkedIn, a case-study proof link, 5 verified-looking external sources (fact-checker owns verification), updated date set, a ≤30-word bold answer per H2 (after F1), images < 150 KB. FAQPage `acceptedAnswer.text` holds only the answer text for all 5 questions (checked in out/). |
| 8 | Build | PASS | `SHOW_DRAFTS=1 npm run build` exit 0. `npm run seo:check`: 82 pages, 0 errors, 6 warnings, all on other pages (draft stubs ai-ux-design, fintech-ux-design, generative-ai-ux and the design-team author page). `npm run lint`: 0 errors (only the known jsx-ast-utils TSNonNullExpression notice). |

## Keyword sentences (quoted, swap test "this document")

- Title: "Web App Design RFP Template: 9 Sections Agencies Can Price". PASS.
- metaTitle: "Web App Design RFP: Template, Scope Inventory and Scoring". PASS.
- Description: "Web app design RFP template: 9 sections, a workflow and role inventory, sample data rules and scoring weights. Then request a fixed-scope proposal." PASS. The next-step clause is "Then request a fixed-scope proposal."
- First sentence L26: "A web app design RFP is the request for proposal (RFP) you send design agencies when … and its scope section decides whether the quotes that come back can be compared at all." PASS. Grammatical. "its" could in theory attach to "application", but no reader will read it that way.
- L64: "Fill the web app design RFP template in this order, starting with the grid in the next section." FAIL (logic). "In this order" means section 1 (context) first, but "starting with the grid" points to sections 3–4. See F3.
- L191: "A web app design RFP that states its band lets each bidder say early whether your scope fits it." PASS.
- L225: "Your web app design RFP now describes the work in units any bidder can price, ours included: a grid, a state list and acceptance lines." PASS. The sentence after it is a non sequitur (F9).
- Secondary n-gram sentences: L42 "The frame works as a user experience (UX) design RFP…" FAIL (vague subject, stuffed, F2). L221 "questions to ask in a design RFP interview test method" FAIL (garden path, the reader parses "interview test method" as one noun, F8).

## FIX list (exact replacements for the orchestrator)

F1 (L40, bold answer is a fragment and does not name the entity)
- old: `**Nine sections: context, goals, users and roles, workflow inventory, screen states and data, research access, requirements and handoff, budget and timeline, and proposal format with evaluation.**`
- new: `**The RFP needs nine sections: context, goals, users and roles, workflow inventory, screen states and data, research access, requirements and handoff, budget and timeline, and proposal format and evaluation.**` (29 words)

F2 (L42)
- old: `The frame works as a user experience (UX) design RFP or as an RFP for UI UX design services.`
- new: `The same nine sections work for a user experience (UX) design RFP or any RFP for UI UX design services.`

F3 (L64)
- old: `Fill the web app design RFP template in this order, starting with the grid in the next section.`
- new: `Fill the web app design RFP template in this order; the next section shows how to build the role and workflow grid behind sections 3 and 4.`

F4 (L70, "never" fails against the post's own grid: a buyer also sees orders read-only once submitted)
- old: `needs a read-only state the buyer never sees.`
- new: `needs a read-only state that the buyer's edit screen does not cover.`

F5 (L146, first open-text use of WCAG)
- old: `For a commercial web app, name WCAG 2.2 level AA, the current`
- new: `For a commercial web app, name Web Content Accessibility Guidelines (WCAG) 2.2 level AA, the current`

F6 (L169, misplaced modifier: "Instead of long requirement lists, the … team recommended")
- old: `Instead of long requirement lists, the General Services Administration's (GSA) former 18F team recommended [a statement of objectives for performance-based services](https://guides.18f.gov/derisking-government-tech/buying-development-services/) when buying custom software.`
- new: `For custom software, the General Services Administration's (GSA) former 18F team recommended [a statement of objectives for performance-based services](https://guides.18f.gov/derisking-government-tech/buying-development-services/) instead of long requirement lists.`

F7 (L193, first open-text use of Q&A)
- old: `List the dates in one line: proposal deadline, Q&A window, interviews,`
- new: `List the dates in one line: proposal deadline, question-and-answer (Q&A) window, interviews,`

F8 (L221, garden-path sentence)
- old: `The interview replaces spec work: questions to ask in a design RFP interview test method ("how would you test the approval flow?"), not finished screens.`
- new: `The interview replaces spec work: the questions to ask in a design RFP interview should test method ("how would you test the approval flow?"), not finished screens.`

F9 (L225, "Since every project begins with…" does not cause "takes one email"; non sequitur)
- old: `Since every project begins with a free consultation and a fixed-scope proposal, adding us to the bidder list takes one email: [send us your RFP](/contact/), then compare our number with [the published web app design price range](/services/web-app-design-services/#how-much-does-web-app-design-cost).`
- new: `Adding us to the bidder list takes one email: [send us your RFP](/contact/), and we will answer with a free consultation and a fixed-scope proposal priced against your inventory. Compare that number with [the published web app design price range](/services/web-app-design-services/#how-much-does-web-app-design-cost).`
  (Keeps "free consultation" once in this section, per the orchestrator's once-only clause rule.)

F10 (designer, quality-gate-scoring.svg): the subtitle pill text `Suggested example weights, not a standard:` should become `Suggested example weights, not a standard` (drop the trailing colon; it was copied from the details lead-in that introduces a list).

F11 (designer, recommended, non-blocking for this loop): redraw rfp-section-map.svg as a 2-column card grid (5 + 4 cards) with a target viewBox height of ≤ 1,600 so the page image is under about 1,500px at 1440. Keep the 26px minimum text and every field word for word.

## Guidance for the writer

G1. [H2 "How do you write acceptance criteria?" / new paragraph after the `</details>` at L159, before "Ask your own counsel…"]
Missing: the handoff half of the section has no open prose. Storybook has 0 mentions outside the image and collapsed text, the breakpoints and devices attribute is covered only by "the breakpoints" in the bold answer, and the developer review has no explanation. The serpGap "handoff is never defined" is delivered only by the image.
Add: 3–4 sentences that explain why each handoff line belongs in the RFP, with one concrete example:
(a) Name the breakpoints (for example 1280, 1440 and 1920 px, the three our web app design handoff uses, plus phone layouts for the tasks users finish on a phone) so every bidder prices the same number of layouts.
(b) Mapping component specs to your Storybook stories by name lets engineers reuse coded components instead of rebuilding them from screenshots.
(c) A scheduled developer review of the first builds is where drift between design and code gets caught. Make it an accepted deliverable, not a favor.
Source for the numbers: content/services/web-app-design-services.json ("Design handoff package" item and the FAQ "3 desktop breakpoints"). Target 60–90 words. Do not repeat the checklist line by line. Explain the why.

G2. [H2 "How do you state budget, timeline and weights?" / paragraph L193, or a new 2-sentence paragraph before the scoring image]
Missing: the brief attribute "proposal format, page limit and Q&A window" and RFP section 9 have no open-text substance. The page limit appears only as "check the page limit and format" in the timeline list and as "twelve pages maximum" inside the collapsed table.
Add: 2 sentences on how to write section 9, for example: set a page limit (for example twelve pages), require proposals to follow the order of your evaluation criteria so each score maps to one part, and state that questions arrive in writing during the Q&A window and answers go to every bidder. Say why: a fixed format lets evaluators score like with like.
Target 35–50 words. Keep it out of the FAQs.

Not counted as gaps:
- The brief's 18F under-20-pages citation was not verifiable (writer learnings, 2026-10-09), so the FAQ correctly gives 6–10 pages as our recommendation only.
- The Apex HCM down link was dropped as a stub, per the orchestrator.

## Notes for the orchestrator

- After publishing, confirm that the production build (without SHOW_DRAFTS) does not render the "← Previous guide" link to the fintech-ux-design draft stub.
- The brief's backlinkSuggestions (hub cost section, saas.json) are still pending after publishing.
- Servers: I started python http.server PID 2204 on port 8765, stopped it, and confirmed with `ps`. No other servers were running.

## FAIL list

- 7d Completeness: G1 (handoff acceptance has no open prose, Storybook and breakpoints only in image or collapsed text), G2 (proposal format, page limit and Q&A window attribute thin).
- 4/7 language: F1–F9 must be applied (F3, F4, F6, F8, F9 are logic or grammar defects in visible text).

VERDICT: FAIL
