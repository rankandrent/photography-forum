# QA report: design-system-roi (2026-10-08, review loop 2, final)

Reviewer: content-qa. Post: `content/blog/design-system-roi.md` (reviewed at 3532bb8 + working tree; gates re-run on 03ea17f). Loop-1 diff checked with `git diff fa70a60 -- content/blog/design-system-roi.md`.
Brief: `content/briefs/design-system-roi.json`. Visuals: `public/blog/design-system-roi/` (7 SVGs; the `break-even-chart.svg` repair was committed in e9d34ff during this review).
Items 2–3 belong to the fact-checker (`design-system-roi.facts.md`, loop 2). Its single required replacement (B6, L223) does not conflict with anything here and is folded into the FIX list below.

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Intent & cannibalisation | PASS |
| 4 | Semantic SEO | PASS (density 1.76% open / 1.42% full) |
| 5 | Internal links | PASS (5, orchestrator exception, unchanged) |
| 6 | Images | PASS |
| 6b | Duplication / Show as text | PASS |
| 7 | Readability & overlap | FIX (F9, a repeated qualifier; overlap 1.87%) |
| 7a | Competitor originality | PASS (snippet-based, as in loop 1) |
| 7b | Silo & leads | PASS (BOFU kept) |
| 7c | Variety | PASS (orchestrator decision on the closing accepted) |
| 7d | Semantic completeness | PASS (G1–G4, F3, F6 and F7 all closed with substance) |
| 7e | On-page | PASS (score 100, failed []) |
| 8 | Build / seo:check / lint | PASS (0 errors) |

## Loop-1 items: status
| Item | Status | Evidence |
|---|---|---|
| F1 density | DONE | 13 exact uses, 0 variants. 13 × 3 ÷ 2,212 open words = **1.76%**; ÷ 2,738 full words = 1.42%. |
| F2 bold L95 | DONE (fact-checker wording) | 28 words, one sentence, and it matches the Results table and chart. |
| F3 tree prose L175 | DONE | "design system now" is the tree's exact leaf (details L171). I walked all 5 paths; none contradicts the prose. |
| F4 "our hub" L148 | DONE | "which we price at…" |
| F5 closing | REPLACED by orchestrator decision | The about.md offer clause appears once, with a new lead-in. Fact-checker B6 corrects the lead-in. |
| F6 rebrand L49 | DONE | "Brand consistency and cheaper rebrands … changes the tokens instead of every screen." |
| F7 adoption lever L124 | DONE | Month 32 recomputed independently (ramp to month 24). |
| F8 $85 label | DONE | Post L109 and SVG group `a3` match word for word. |
| G1 governance L215 | DONE | 3 sentences, about 70 words: who owns the report, the monthly contribution review, the detach-rate rule, plus the hub's handover (governance model, 2 workshops, v1.0). |
| G2 Storybook/Zeroheight L213 | DONE | One substantive sentence each. Chromatic sentence corrected (fact-checker A14). |
| G3 famous numbers L183 | DONE | Names the shapes of claim ("5–10x return", "pays back in a few months") and why finance rejects them. No firm attributed. |
| G4 migration L150 | DONE | Month 26 recomputed independently ($34,000 = 400 h × $85, months 4–9). |

I recomputed the model independently, monthly with a linear ramp: base 16 / 23 / none, ROI 177% / 85% / −8%; halved owner hours → month 39; 24-month ramp → month 32; migration → month 26. All match the post, the chart and fact-check section C.

## 4. Semantic SEO: PASS
- **Bold answers:** 9 H2s, all one sentence and ≤ 30 words. The changed ones are L95 (28 words) and L156 (21 words).
- **Repair repetition check:** I reread each changed bold answer with the sentence that follows it.
  - L95 → L97: no echo.
  - L156 → L158: the bold answer gives the failing case and the next sentence the threshold, so no repeat.
- **Keyword sentences (swap test):**
  - Title, metaTitle, description (147 chars in the built HTML) and the first sentence are unchanged from loop 1. All read naturally.
  - The changed body uses are grammatical: "Time saved moves design system ROI…" (L61), "Most design system ROI models leave out…" (L130), "your design system ROI carries a real cost line" (L221).
- **Entities:** all 21 brief entities and 10 n-grams appear in the open text (the `<details>`-stripped count). Storybook, Zeroheight and design system governance now each carry a full sentence or paragraph.
- **Formatting rules:** abbreviations are expanded, boolean FAQs open with No/No/Yes/No/Yes, and every FAQ answer has 2 or more sentences.
- **Banned phrases and hedges:** none. US English throughout.

## 5. Internal links: PASS
These are the same 5 contextual links as loop 1, and all resolve in `out/`. The `#how-much-does-a-design-system-cost` id exists. The contact anchor is now "bring your baseline sheet to us", which varies it from the other posts.

## 6. Images: PASS
- All 7 SVGs are in `public/` and `out/` (2.5–10 KB), and all 7 `<img>` tags render.
- Only `break-even-chart.svg` changed (group `a3`, viewBox 800×2112).
- I rasterized the changed chart at 628 px and 354 px:
  - Every assumption line sits inside its card, cards are spaced 10 px apart, and the bottom margin is 40 px as before.
  - The longest new line ends at about x 742 of the 760 card edge even in the wider fallback font. Manrope does not load inside an `<img>`.
  - Text renders at about 20 px on desktop and about 11.5 px on mobile, the same as loop 1. No misspellings.
- Plot lines at month 36 match the model (cost ≈ $343k, low ≈ $247k), and the payback markers sit at months 16 and 23.
- The alt text and the `.visuals.json` markdown for the chart are unchanged and still match post L99.

## 6b. Duplication / Show as text: PASS
- Each of the 6 inline images is still followed by its collapsed `<details class="astext">` block.
- The only change inside a details block is L109, which the SVG card matches word for word. The other 5 SVGs are byte-identical to loop 1, as is their text.
- The new prose (L124, L150, L213, L215) adds no list or table, so no new image is needed. The metrics table (L206) still has no image, so nothing is visible twice.

## 7. Readability & overlap: FIX
- **Paragraphs:** all ≤ 4 sentences. L59 counts as 5 only because of "U.S."; it has 4 real sentences.
- **5-gram overlap:** combined **1.87%** across the other 6 posts, the hub, ux-consulting, saas and about.md. The largest single overlap is 1.37%, with the hub.
- **F9 (repair repetition):** "illustrative sensitivity check" appears in L124 and again 26 lines later in L150. See the FIX list.
- **Length:** about 2,575 words of prose; the onpage tool counts 3,269 rendered words. No padding was found: every addition answers a loop-1 gap. The orchestrator's soft-cap exception is accepted.

## 7a. Competitor originality: PASS
The structure is unchanged from loop 1, and the figr page is still unreachable (DNS), so the result rests on snippets. The new text adds no figr framing; the "four pillars" framing does not appear. serpGaps 1–7 are all covered with substance now that gap 2 (L183) and gap 4 (L124 + L150) are filled.

## 7b. Silo & leads: PASS
- `services[0]` = design-system-services. The hub is linked early (L26) and near the end (L221), with 1 cross-hub link. service-support is 5.
- funnel stays **BOFU**, for the reason given in loop 1 (the MOFU template would show a TradeZella CTA).
- The lead angle comes at the 2 moments the brief names (L91 and L221–223), with no hard sell.

## 7c. Variety: PASS
- The structure differs from the last 3 posts on at least 4 dimensions (loop 1).
- The closing repeats the about.md offer clause, which also ends 2 other posts. The orchestrator ruled to keep it once with a new, post-specific lead-in, and I accept that ruling: the lead-in and the anchor are original to this post.

## 7d. Semantic completeness: PASS
- Every H2 has a bold answer, detail and a concrete example or number, and ends with a next step.
- The FAQ answers have 2 or more sentences each.
- There are no trailing sentences, TODOs or vague cells.
- The intro's promises (step-by-step method, price-linked, "not yet" cases) are all delivered, and all 5 takeaways are backed by a section.

## 7e. On-page: PASS
`npm run onpage -- /blog/design-system-roi/` → **score 100, failed []**, 3,269 words. Manual items:
- **Schema:** BlogPosting, BreadcrumbList and FAQPage. I printed each FAQ `acceptedAnswer.text` from `out/`; each holds only its own answer.
- **E-E-A-T and sources:** 2 author/contributor links and 5 external sources.
- **Images:** all under 150 KB.
- **Indexing:** canonical and OG tags are present; there is no noindex.

## 8. Build: PASS
- `SHOW_DRAFTS=1 npm run build`: exit 0.
- `npm run seo:check`: 81 pages, **0 errors**, 7 warnings. All warnings are on other pages or site-wide, and they are the same as loop 1.
- `npm run lint`: exit 0. It prints only the known jsx-ast-utils notice.
- No servers were started, and `ps` showed none running before or after.

## FIX list (exact replacements for the orchestrator)

**FC-B6 (fact-checker, required; L223): ALREADY APPLIED in 03ea17f.** On 03ea17f I re-ran build exit 0, seo:check 0 errors, lint exit 0 and onpage 100 with failed []. The sentence is in `out/`, and "it" now refers to "a proposal". Applied text:
`Your sprints, payroll and tickets fill most of the sheet, but the build fee is the one row your own data cannot fill.` → `Your sprints, payroll and tickets fill most of the sheet, and vendor pricing pages fill the tooling line, but the agency fee in the build row has to come from a proposal.`

**F9 (L150, repeated qualifier):**
`Add 400 engineering hours of migration ($34,000) across months 4–9 and, in this illustrative sensitivity check, the expected case pays back in month 26 instead of 23.` → `Add 400 engineering hours of migration ($34,000) across months 4–9 and the same illustrative model's expected case pays back in month 26 instead of 23.`
(This is wording only. The figures are unchanged and confirmed by fact-check B9.)

**Orchestrator housekeeping:** done. The chart SVG and the designer learnings were committed in e9d34ff. Still to commit: this report and the QA and writer learnings.

Optional (fact-checker B2, non-blocking): L215 `From then on, the two named owners from your business case present the quarterly report,` → `From then on, have the two named owners from your business case present the quarterly report,`. If you apply it, change the rest of the sentence to match: `run a monthly contribution review that accepts or rejects new components, and fix or deprecate any component with a high detach rate in the next release.`

## Guidance for the writer
No completeness gaps remain. Apply F9 as written; FC-B6 is already applied.

FAIL list: none.

VERDICT: PASS
