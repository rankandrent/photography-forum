# Fact-check: web-app-design-rfp (2026-10-09, review loop 2, final)

Checked: `content/blog/web-app-design-rfp.md` and all 7 SVGs in `public/blog/web-app-design-rfp/`.
Site sources: `content/services/web-app-design-services.json` (hub), `content/pages/about.md`,
`content/case-studies/tradezella.md`, `app/contact/page.tsx`.

The loop-1 verdicts for claims 1–13, 15, 16, 18–21 and 27–34 still stand: the text in those places has not
changed, and the external links are the same five URLs I verified in loop 1. This report covers the loop-1 fixes
(F1–F8) and all new text (G1, G2, the closing and the "four factors" claim).

## Loop-1 fixes applied

| Fix | Post line | Status |
|---|---|---|
| F1 takeaway 1, "two of the four factors" | 17 | Applied word for word. TRUE (hub: "The price depends on 4 factors"). |
| F2 section order sentence | 42 | Applied word for word. TRUE (no claim about agencies remains). |
| F3 "Both totals feed the quote" | 70 | Applied word for word. TRUE. |
| F4 stalled-grid sentence (writer adapted it) | 96 | Promise removed and "question-and-answer (Q&A) window" is fine. **New defect:** the writer changed "If yours stalls" to "If yours does". The sentence before it ends "no single team holds the full workflow list", so the nearest reading of "does" is "if your team does hold the full list", which is the opposite of the intended condition and doesn't fit a "half-filled grid". See F9. |
| F5 "lets every agency price" | 102 | Applied word for word. TRUE. |
| F6 UI kit components | 122 | Applied word for word. TRUE (hub UI kit lists "filters, bulk actions"). |
| F7 four price factors | 191 | Applied word for word. TRUE (matches hub cost answer). |
| F8 18F + point system | 195 | Applied word for word. TRUE (18F Federal Field Guide: "invite the most highly rated for a verbal interview" and "Don't use a point system to score proposals"). |

## New claims

| # | Claim (post location) | Verdict | Source / evidence |
|---|---|---|---|
| G1a | "Our design handoff uses three desktop breakpoints, for example 1280, 1440 and 1920 px" (line 159) | TRUE | Hub FAQ: "responsive layouts for 3 desktop breakpoints". The handoff deliverable is "for example 3 breakpoints at 1280, 1440 and 1920 px". The post keeps "for example" on the widths. |
| G1b | "plus mobile layouts for tasks users complete on a phone" (line 159) | TRUE | Hub FAQ, almost word for word: "mobile layouts for the tasks users complete on a phone". |
| G1c | "Mapping specs to Storybook stories by name lets engineers match designs to components already in code." (line 159) | TRUE | Hub handoff: "component specs mapped to Storybook". "by name" is the buyer's acceptance line, and the sentence is advice, not a "we" claim. Storybook docs: a story "captures the rendered state of a UI component" and stories sit beside the coded component (https://storybook.js.org/docs/get-started/whats-a-story, search-verified). |
| G1d | "Make the developer review of first builds an accepted deliverable, because that review catches gaps between design and code." (line 159) | TRUE | Hub step 6: "We hand over Figma files and component specs, then review the first builds with developers." This is phrased as an instruction to the buyer. The reason given is general reasoning, not a statistic. |
| G1e | Nothing claims that we write production code | TRUE | G1 describes reviewing builds only, which matches hub step 6. The "design and development" FAQ (line 231) is still from the buyer's side. Rubric self-check: we pass all six acceptance lines on the hub's own claims (WCAG 2.2 AA in step 5, breakpoints, states in the UI kit and FAQ, Storybook, developer review). |
| G2a | "a page limit (for example twelve pages) and sections in the order of your evaluation criteria, so evaluators score like with like" (line 193) | TRUE (advice) | This is an imperative suggestion. It names no authority and is not presented as a standard. "twelve pages" matches the sample line in the table and the section-map SVG ("Proposals: twelve pages maximum"). It doesn't conflict with the FAQ's "roughly 6–10 pages", which is about the RFP's own length, not the proposal's. |
| G2b | "State that questions come in writing during the Q&A window, so no bidder gets a private answer." (line 193) | TRUE (advice) | Also imperative and unattributed. It agrees with timeline step 1 ("publish every answer to all bidders"). The 18F sentence is in the next paragraph and covers scoring only, so 18F is not borrowed to support G2. An explicit "our suggestion" label is not needed for an unattributed imperative. |
| G3 | "Every project begins with a free consultation and a fixed-scope proposal" (line 225) | TRUE | `about.md`, word for word. It appears once in the post. No call length, attendee, price or turnaround is promised. |
| G4 | "and you can set ours beside the other bids and the published web app design price range" (line 225) | TRUE | No promise. The anchor `#how-much-does-web-app-design-cost` matches the hub H2. |
| G5 | "ours included" / "Adding us to the bidder list takes one email" (line 225) | TRUE | `/contact/` has a mailto address and a form (loop 1, item 21). |
| G6 | "four factors" (lines 17, 70, 191) | TRUE | Hub cost answer: "The price depends on 4 factors: the number of workflows, the number of user roles, the number of test rounds and the size of the component library." The intro (line 26, "help set the fee") is still consistent with this. |

## SVGs

The text in `acceptance-pass-fail.svg` matches the six pass lines in the post (lines 150–155) word for word. The
"Proposal format and evaluation" card in `rfp-section-map.svg` ("Page limit, … (Q&A) window, weights",
"Proposals: twelve pages") matches the table and G2. `quality-gate-scoring.svg` still carries "Suggested example
weights, not a standard". The other SVGs are unchanged and still match loop 1.

## External links

| URL | Loads (search-verified) | Supports its sentence |
|---|---|---|
| https://www.w3.org/TR/WCAG22/ | Yes | Yes |
| https://www.section508.gov/develop/applicability-conformance/ | Yes | Yes |
| https://www.aiga.org/resources/aiga-position-on-spec-work | Yes | Yes |
| https://guides.18f.gov/derisking-government-tech/buying-development-services/ | Yes | Yes |
| https://www.acquisition.gov/far/2.101 | Yes | Yes |

## Fixes (exact old → new)

**F9 (line 96, adapted F4 reverses its condition)**
- Old: `If yours does, bring the half-filled grid to a first call with us, and list any workflow nobody can confirm as an open question for bidders in the question-and-answer (Q&A) window.`
- New: `If your draft stalls, bring the half-filled grid to a first call with us, and list any workflow nobody can confirm as an open question for bidders in the question-and-answer (Q&A) window.`
- Change only the first three words. Everything else in the sentence is TRUE as written.

Nothing else needs to change. Once F9 is applied, every claim is TRUE.

VERDICT: FAIL
