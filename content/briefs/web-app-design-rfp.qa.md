# QA report: web-app-design-rfp (2026-10-09, review loop 2, final)

Reviewer: content-qa. I diffed the post against the loop-1 commit fff7337 (repairs e0895c5 and ca5d91e). The tree was clean (`git status` showed nothing uncommitted under public/blog/web-app-design-rfp/ or content/briefs/).
Build: `SHOW_DRAFTS=1 npm run build` at HEAD ca5d91e.

## Loop-1 items

| Item | Status | Evidence |
|---|---|---|
| F1 bold answer fragment | Fixed | L40, 29 words, one sentence, names "The RFP". |
| F2 vague subject | Fixed | L42 "The same nine sections work for a user experience (UX) design RFP…". |
| F3 "in this order, starting with" | Fixed | L64 now points to the grid "behind sections 3 and 4". |
| F4 "never sees" | Fixed | L70 "a read-only state that the buyer's edit screen does not cover". |
| F5 WCAG first open use | Fixed | L144 expanded. |
| F6 misplaced modifier | Fixed | L169. |
| F7 Q&A first open use | Fixed (moved) | The first open use is now L96 "question-and-answer (Q&A) window" (fact F4 moved it earlier); L193/L215 are bare, which is correct. |
| F8 garden path | Fixed | L221 "…should test method…". |
| F9 closing | Fixed (adapted) | L225 keeps About's standalone sentence once; it adds no "we will…" promise. Reads cleanly. |
| F10 scoring pill colon | Fixed | The SVG text reads "Suggested example weights, not a standard". |
| F11 section map height | Fixed | 800×1597 two-column. Renders 760×1517 at 1440 (was 2,595) and 354×707 at 390. |
| G1 handoff prose | Fixed | L159, about 68 words, 4 sentences. It explains the breakpoints (1280/1440/1920 px plus phone layouts, matching hub L63/L202 "for example 3 breakpoints"), Storybook mapping and the developer review, each with its reason. The collapsed list is not repeated line by line. |
| G2 section 9 format | Fixed | L193: page limit (twelve pages), order of the evaluation criteria, written Q&A to all bidders, and the reason (score like with like, no private answers). |

## Checklist

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Intent & cannibalisation | PASS | Unchanged since loop 1. No other page in content/ targets the keyword. |
| 2–3 | Facts / honesty | skipped | fact-checker. |
| 4 | Semantic SEO | PASS | Built HTML: title 57 ("Web App Design RFP: Template, Scope Inventory and Scoring"), H1 58, description 147, which ends on the next step "Then request a fixed-scope proposal." The exact keyword appears 8 times: 1.24% of 2,589 body words, 1.63% of 1,958 open words. Every bold answer is one sentence of ≤ 29 words. `grep -nE '^(\*\*)?[0-9]+ '` finds nothing. Abbreviations checked on the text with `<details>` stripped: RFP, IA, UI, UX, WCAG, W3C, Q&A, SUS, NDAs, GSA and SOW are each expanded at first open use. B2B appears only in alt text and in the image, where it is expanded. Boolean FAQs open Yes / No / Yes. No banned phrases or hedges. |
| 5 | Internal links | PASS (orchestrator exception, as in loop 1) | 5 contextual links, all targets build, hub linked in the first paragraph. |
| 6 | Images | PASS | All 7 SVGs exist in public/ and out/, and `ls out/blog/web-app-design-rfp/` matches the post's 7 images. No brand assets, alt text is descriptive, and the section-map alt describes the new 2-column layout. Rendered in the built page with fixed/sticky elements hidden by `visibility` (see the lesson): the inline images are 760px at 1440 (scale 0.95, so 26px text renders at about 24.7px) and 354px at 390 (about 11.5px, legible in the screenshots, the same level as loop 1). The cover is 1224×466 at 1440 and 354×199 at 390 with `object-fit: cover`, and the title is fully visible. Spelling is clean. |
| 6b | Duplication | PASS | All 6 `details.astext` blocks are closed at 1440 and 390. Section map SVG text vs. table: 9/9 rows × 4 fields word for word, plus a legend card. The scoring SVG matches its 3 list items. The other images are unchanged since loop 1. |
| 7 | Readability | PASS (1 small FIX) | US English. Every paragraph is ≤ 4 sentences. 5-gram overlap: hub 1.18%, highest blog 0.54% (design-system-roi), both < 12%. The new text adds no padding: G1 + G2 + the 18F caveat come to about 145 words, all required, so I accept the 2,589-word body. One small logic imprecision: F12. |
| 7a | Competitor originality | PASS | Unchanged since loop 1 (simpalm blocked, structure compared from snippets, all serpGaps covered; the handoff gap is now in open text through G1). |
| 7b | Silo & leads | PASS | services[0] web-app-design-services, BOFU, serviceSupport 5. Lead angle is soft: L96 first call, L225 bidder list. |
| 7c | Variety | PASS | Unchanged since loop 1. |
| 7d | Completeness | PASS | G1 and G2 are delivered with substance. Every H2 has a bold answer, a reason and a concrete example or number. The research H2 now ends on its action list, and the scoring H2 ends on the weights image. Both sections still tell the reader what to do ("Write these lines…", "Publish… score quality before opening price"). Each takeaway is backed by a section. No trailing sentences, and every FAQ answer is ≥ 2 sentences. |
| 7e | On-page | PASS | `npm run onpage -- /blog/web-app-design-rfp/` gives score 100 with `failed: []`. The FAQPage JSON-LD holds 5 answers, each containing only its answer text. Images < 150 KB (max 12 KB). |
| 8 | Build | PASS | `SHOW_DRAFTS=1 npm run build` exit 0. `npm run seo:check`: 82 pages, 0 errors, 6 warnings, all on other pages (draft stubs and the design-team author page). `npm run lint` exit 0 (only the known jsx-ast-utils notice). |

## Keyword sentences (swap test "this document")

- Title, metaTitle, description: unchanged since loop 1. PASS.
- L26 first sentence: unchanged. PASS.
- L64: "Fill the web app design RFP template in this order; the next section shows how to build the role and workflow grid behind sections 3 and 4." PASS.
- L191: "A web app design RFP that states its band lets each bidder say early whether your scope fits it." PASS.
- L225: "Your web app design RFP now describes the work in units any bidder can price, ours included: a grid, a state list and acceptance lines." PASS. The next two sentences read cleanly, and no participle dangles.
- L42 secondary n-grams: "The same nine sections work for a user experience (UX) design RFP or any RFP for UI UX design services." PASS.
- L221: "the questions to ask in a design RFP interview should test method" PASS.

## FIX list (exact replacements for the orchestrator, non-blocking)

F12 (L42, the order starts with context and goals, not with "who uses the product")
- old: `The order runs from who uses the product and what they do to the evidence and files you expect back.`
- new: `After context and goals, the order runs from who uses the product and what they do to the evidence and files you expect back.`

F13 (optional, L70 repeats takeaway 1 almost word for word, and L191 lists the same four factors a third time)
- old: `Both totals feed the quote: workflows and user roles are two of the four factors our web app design price depends on.`
- new: `Both totals feed the quote, because every workflow needs its own wireframes and every role its own views.`
  (This uses only post content: L54 "Each role adds views" and L55 "Sets wireframe and prototype effort". If the fact-checker objects, keep the current wording.)

## Guidance for the writer

None. There are no completeness gaps in this loop.

## Notes for the orchestrator

- Production build: the SHOW_DRAFTS build still renders "← Previous guide" to the /blog/fintech-ux-design/ draft stub. Confirm it is absent in the build without SHOW_DRAFTS before publishing.
- backlinkSuggestions (hub cost section, saas.json) are still pending after publishing.
- Servers: no servers were running before I started. I started python http.server PID 3780 on port 8766, stopped it with `kill 3780`, and `ps` confirmed it was gone.

## FAIL list

- None. F12 is a one-line logic polish and F13 is optional; neither blocks publishing.

VERDICT: PASS
