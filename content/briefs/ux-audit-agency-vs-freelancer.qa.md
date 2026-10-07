# QA report: ux-audit-agency-vs-freelancer (2026-10-07, review loop 2, final)

Reviewer: content-qa. Post: `content/blog/ux-audit-agency-vs-freelancer.md` (commit ff75215 + uncommitted SVG/visuals.json redraws). Brief: `content/briefs/ux-audit-agency-vs-freelancer.json`.
Items 2–3 (facts, honesty) belong to the parallel fact-checker. Orchestrator decisions respected: About-page offer wording in the closing, the shared 5-gram "a free consultation and a fixed-scope proposal", F7 done, and the sample-finding image repeating the one-sentence scenario (context, not a duplicated list).

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Intent & cannibalisation | PASS |
| 4 | Semantic SEO | PASS |
| 5 | Internal links | PASS (6, F1 applied) |
| 6 | Images | PASS |
| 6b | Duplication | PASS (F2, F5 applied in both SVG and text) |
| 7 | Readability & cross-post overlap | FIX (F8: bold answer restated by the next sentence) |
| 7a | Competitor originality | PASS (unchanged from loop 1; fetch blocked, snippet-based) |
| 7b | Silo & leads | PASS |
| 7c | Variety | PASS (closing re-led per orchestrator decision) |
| 7d | Semantic completeness | PASS (G1–G6 resolved) |
| 7e | On-page checklist | PASS (score 100, failed []) |
| 8 | Build / seo:check / lint | PASS (0 errors) |

## 1. Intent & cannibalisation: PASS
No change since loop 1. The post is commercial investigation, and no other page in `content/` targets the keyword.

## 4. Semantic SEO: PASS
- Bold answers: all 9 H2s are one bold sentence of 28, 27, 26, 27, 27, 30, 29, 29 and 25 words (all ≤ 30).
- onpage gave title 48 (metaTitle), H1 55 and a description of 149 that opens with the keyword.
- Keyword density: "ux audit" appears 24× in 2,508 body words (≈ 1.9% by word share), and the exact keyword 2× in the body. Within the 1–2% range.
- Entities, with `<details>` stripped:
  - Hotjar and Microsoft Clarity now appear in the open text, in the freelancer vetting item (fixes the loop-1 gap).
  - "in-house UX team" appears only in the collapsed table, but the H2 "Can your in-house team audit its own product?" covers the concept with substance. Accepted.
  - All 12 n-grams appear in the open text.
- Abbreviations: NVDA is now expanded (F6 applied).
- Boolean FAQs start Yes/No (FAQ 4 "Yes, it can").
- No banned phrases or hedges. US spelling throughout.

## 5. Internal links: PASS
- 6 contextual links:
  1. hub (early, anchor "UX audit services")
  2. /industries/saas/
  3. /industries/ecommerce/ (new, F1)
  4. /services/usability-testing-services/ (single cross-hub link)
  5. hub #how-much-does-a-ux-audit-cost (near the end)
  6. /contact/
- All targets exist in `out/`. Anchors vary.
- seo:check warns that /industries/ecommerce/ and /industries/saas/ are now linked with 3 different anchors site-wide. This is a warning, not an error, and varied anchors are what the rules ask for.

## 6. Images: PASS
- 6 inline SVGs plus the cover, all in `public/` and `out/`. No `<image>`, no external hrefs, no brand assets. The largest is 13.7 KB (the matrix).
- Alt text is 132–235 characters and descriptive.
- Rendered with Playwright on the served `out/`, each image scrolled into view, all `complete` with naturalWidth 800. Desktop draws them at 760px (smallest text ≈ 24.7px). Mobile draws them at 354px (smallest text ≈ 11.5px, the same scale accepted in loop 1).
- Mobile screenshots of the matrix, the sample finding, the hybrid flow, the scope sheet and the curve are legible. Removing the footers left no blank bands.
- Cover: 21/8 at 1440 and 16/9 at 390, `object-fit: cover`. The title, kicker and subtitle are fully visible at 390.
- Spelling in every SVG is clean.
- Advisory (not blocking): the matrix SVG is now 800×3318 and renders 3,152px tall on desktop. A 4-column wide layout would be better at the next redraw.

## 6b. Duplication: PASS
- All 5 "Show as text" blocks are collapsed (`open=false` at both widths).
- I ticked off every SVG label against its text twin. The matrix (all 28 cells, including the F3 rewrites), split card, sample finding, hybrid flow and scope sheet all match item for item, with nothing dropped.
- F2: the in-house chips now read evidence · heuristic · severity · fix · effort in both the SVG and the text block.
- F5: the three footers are gone from the matrix, hybrid flow and scope sheet SVGs, and `.visuals.json` now says "no footer".
- The coverage curve has no text twin. It is a chart, and its 4 figures are cited in the prose; accepted in loop 1.

## 7. Readability & cross-post overlap: FIX
- No paragraph is over 4 sentences, and every FAQ answer has ≥ 2 sentences.
- 5-gram overlap: choose-ux-research-agency 0.37%, saas-product-redesign 0.33%, the other posts 0%, ux-audit-services hub 0.92%, about.md 0.33%. All far under 12%, and the shared grams are the accepted offer sentence, abbreviation expansions and the hub's audit-component list.
- **F8**: the fact-check repair rewrote the bold answer under "Why do independent evaluators matter more than the logo?". It now opens "In Jakob Nielsen's heuristic evaluation studies, single evaluators found 20–51% of usability problems and 3–5 usability specialists found 74–87%". The very next sentence opens "In Jakob Nielsen's original heuristic evaluation studies, single evaluators found 20–51% of the usability problems … 3–5 usability specialists found 74–87%". That is the same claim twice, back to back, in visible text (and a third time in the curve directly below). See the FIX list.

## 7a. Competitor originality: PASS
Structure is unchanged since loop 1, so the loop-1 result stands. The fetch was blocked, so I compared against search snippets: 0% overlap, no pros/cons mirroring, and all 7 serpGaps still covered with substance.

## 7b. Silo & leads: PASS
- `services[0]` is ux-audit-services. Up links are early and near the end, with one cross-hub link.
- funnel is bofu and serviceSupport is 5, which meets the BOFU minimum of 5.
- Lead moment 1 (line 140) now uses the hub's audit components.
- Lead moment 2 (line 197) routes the reader honestly first ("The sheet works with any provider…"). It then invites only "When our column of the matrix matches your scope", with no hard sell.

## 7c. Variety: PASS
- The closing still ends on the About page's offer sentence, which the orchestrator accepted. Its lead now belongs to this post: the reader keeps the sheet and uses it with every provider, with a callback to the matrix column.
- The "Send us your X" opener and the "score us against every other agency" line are gone, so it no longer mirrors choose-ux-research-agency's closing pattern.
- Intro, type, visual types and section order still differ from both fingerprints.

## 7d. Semantic completeness: PASS
- G1: each freelancer-fit bullet now gives its reason.
- G2: every vetting item says what a good answer looks like, except the WCAG item, which states the two options to compare.
- G3: no vague matrix cells remain, and the lead-time row now carries both start and turnaround.
- G4: each in-house bullet now gives its reason.
- G5: names axe DevTools, WAVE and Lighthouse plus a criterion they cannot judge.
- G6: closing re-led.
- Every H2 has a bold answer, then detail, then an example, number or step. Every FAQ answer has ≥ 2 sentences.
- The intro's promises (freelancer, agency, in-house, AI pre-scan) are each delivered by a section, and all 5 takeaways are backed.
- The post ends with a next step (/contact/).
- One brief point was dropped deliberately: the first-hand "2 designers review independently" claim. The fact-checker did not confirm it, and the merge explanation stays as buyer guidance, which is acceptable.

## 7e. On-page checklist: PASS
- `npm run onpage -- /blog/ux-audit-agency-vs-freelancer/` gave score **100, failed []**.
- Manual items: author plus contributor with Person schema; 5 external sources; first sentences ≤ 30 words; SVGs ≤ 14 KB; `updated` = `date`.
- In the built HTML, the 5 FAQPage `acceptedAnswer.text` values each hold only their answer.
- H2 id `what-should-you-send-before-asking-for-a-quote` exists, as the brief's backlink suggestion needs.

## 8. Build: PASS
- `SHOW_DRAFTS=1 npm run build`: exit 0. The post was prerendered and all 7 SVGs are in `out/blog/ux-audit-agency-vs-freelancer/`, with no stale files.
- `npm run seo:check`: exit 0, **0 errors**, 8 warnings, all on other pages or the site-wide anchor-variety note. The Chicago F7 errors are gone.
- `npm run lint`: exit 0 (3 jsx-ast-utils notices, not errors).
- My server (http.server :4321, PID 3328, read from `ps`) was stopped by PID and confirmed gone with `ps`. No other server was running before or after.

## FIX list (exact old → new; orchestrator applies)

**F8, post line 56, H2 "Why do independent evaluators matter more than the logo?" (writer):**
- old: `In Jakob Nielsen's original heuristic evaluation studies, single evaluators found 20–51% of the usability problems (Nielsen and Molich, 1990), and aggregates of 3–5 usability specialists found 74–87% (Nielsen, 1992), which is why`
- new: `The single-evaluator range comes from Nielsen and Molich (1990) and the 3–5 specialist range from aggregated evaluations in Nielsen (1992), which is why`
- The rest of the sentence ("[Nielsen Norman Group recommends 3–5 evaluators who review independently](…) before comparing notes.") is unchanged.
- No figure, population or source changes, so the fact-checker's ruling stands.

## FAIL list
None.

## Guidance for the writer
No completeness gaps remain. Apply F8 only.

VERDICT: PASS
