# Fact-check: ux-audit-agency-vs-freelancer (review loop 2, final)

Checked 2026-10-07 against `content/blog/ux-audit-agency-vs-freelancer.md`, the SVGs in
`public/blog/ux-audit-agency-vs-freelancer/` (mainly `evaluator-coverage-curve.svg` and
`audit-provider-matrix.svg`), and these site sources: `content/services/ux-audit-services.json` (hub),
`content/pages/about.md` and `content/home.ts`.

**Method.** WebFetch was blocked again (EGRESS_BLOCKED) for wave.webaim.org, developer.chrome.com and
deque.com. I verified each new external claim with a WebSearch limited to the vendor's own domain. A
claim counts as verified only when the result list contained only that vendor's pages (plus the
vendor's mirror) and a snippet that supports the sentence. The loop-1 claims that this loop did not
touch (Baymard, NN/g, Hertzum and Jacobsen, WCAG, the internal links) are still TRUE as recorded in
loop 1. Their text did not change except through the F-fixes below.

## Part A: loop-1 fixes F1–F13

| Fix | Location | Status | Note |
|---|---|---|---|
| F1 | L56, Nielsen sentence | APPLIED word for word | 20–51% (Nielsen and Molich, 1990) and 3–5 usability specialists 74–87% (Nielsen, 1992). |
| F2 | Takeaway L17 | APPLIED word for word | |
| F3 | Bold answer L54 | APPLIED word for word | |
| F4 | Coverage-curve SVG, alt text, caption (L58) | APPLIED | SVG label "20–51%". Y tick "51%". Label "3–5 specialists". Source line "Nielsen &amp; Molich (1990); Nielsen (1992)". Alt text and caption match F4 word for word. I checked the tick positions against the axis (0% at y=640, 100% at y=250, 3.9 px per %): 20% → 562.0, 51% → 441.1, 74% → 351.4, 87% → 300.7. All are plotted correctly. The 1-evaluator bar spans 20–51% and the 3–5 band spans 74–87%. "Flattens after 5" and "Shading … is a sketch" are unchanged (TRUE in loop 1). The "1 evaluator" label is acceptable because the source line and caption name the studies. |
| F5 | L56, Hertzum and Jacobsen | APPLIED word for word | Keeps "average". |
| F6 | Matrix agency WCAG cell (L43 + SVG) | APPLIED in both | "WCAG 2.2 AA check of audited screens; ask how it is tested". |
| F7 | L136 | APPLIED word for word | |
| F8 | L60 | APPLIED word for word | No first-person merge claim is left. |
| F9 | L140 | APPLIED word for word | Every item is a hub deliverable (hub "What does a UX audit include?"); 2–3 weeks and "prioritized fix roadmap ranked by impact and effort" come from the hub abstract. |
| F10 | FAQ L211 | APPLIED word for word | |
| F11 | L68 | APPLIED word for word | |
| F12 | L159 | APPLIED word for word | |
| F13 | Closing L197 | APPLIED in substance; the writer reworded it, so I checked it as new text in B9–B11 | Contains about.md's exact phrase "every project begins with a free consultation and a fixed-scope proposal". The removed promise ("we will say so") did not come back. |

## Part B: new text added in loop 2

| # | Claim (post line) | Verdict | Source / method |
|---|---|---|---|
| B1 | axe DevTools, WAVE and Lighthouse are automated accessibility checkers (L126) | TRUE | https://www.deque.com/axe/devtools/extension/ (Deque: axe DevTools "only tests for accessibility issues that can be accurately detected via automation"). https://wave.webaim.org/help (WebAIM's WAVE evaluation tool). https://developer.chrome.com/docs/lighthouse/accessibility/scoring (Lighthouse automated accessibility audits). |
| B2 | "None of them can judge whether alt text or link text makes sense in context" (L126) | TRUE | WAVE Help: WAVE "cannot tell you if your alternative text is equivalent and appropriate", so it shows the alt text for a human to evaluate. Lighthouse scoring: a score of 100 "does not guarantee that the audited page is accessible; manual testing is still important". Deque: automated tools "can't detect issues that require understanding what information and meaning should be conveyed via language, context". Link purpose in context is WCAG 2.4.4, which needs human judgement (consistent with W3C sources from loop 1, #19). Caveat: axe DevTools Pro's paid "Intelligent Guided Tests" ask a *person* whether alt text describes the image. The judging is still done by the human, so the sentence holds for the tools' automated checks. |
| B3 | "manual keyboard and screen-reader testing covers that" (L126) | TRUE (acceptable) | Screen-reader testing is how a human hears alt text and link text in context. Keyboard testing covers focus and operability. Together they describe the manual layer the vendor sources say is needed. This is not a precise standards claim. |
| B4 | Freelancer vetting: "Ask how they test WCAG 2.2 AA: tools plus keyboard and screen-reader passes, or tools alone." (L78) | TRUE (advice) | This is a question for the buyer to ask and makes no claim about us. |
| B5 | Freelancer vetting: "Google Analytics 4 funnels and Hotjar or Microsoft Clarity recordings" (L79) | TRUE | GA4 funnel exploration: https://support.google.com/analytics/answer/9327974. Hotjar recordings / session replay: https://www.hotjar.com/product/recordings/. Clarity session recordings: https://learn.microsoft.com/en-us/clarity/session-recordings/recordings-overview. These match the hub's analytics and session-recording deliverables. |
| B6 | Matrix agency "Independent evaluators: Ask how many review, and whether separately" (L40 + SVG) | TRUE | This is advice with no count, so it does not conflict with the hub ("2 designers") or home.ts ("1–2 designers"). |
| B7 | Matrix agency "Lead time: Team capacity sets the start; ours runs 2–3 weeks" (L46 + SVG) | TRUE | Hub abstract and process: "takes 2–3 weeks (10–15 working days)". home.ts also says "2–3 weeks". "Team capacity sets the start" is a general statement with no start-date promise. |
| B8 | Other new or changed matrix cells. Freelancer analytics "Only if they request access; confirm it in the proposal". Freelancer WCAG "From automated tools alone to full manual passes; ask which". In-house lead time "When sprint time frees up; often slips behind features". AI lead time "Minutes, plus your time to verify each item". (L42–46 + SVG) | TRUE (opinion, consistent) | These generalizations contain no statistics. They are consistent with the prose (L74–81, L95, L101, L126). The table text and SVG match cell for cell (I checked all 28 cells). |
| B9 | "our audits run $5,000–$15,000 over 2–3 weeks" plus the hub pricing deep link (L197) | TRUE | Hub `priceRange` and abstract. The anchor `#how-much-does-a-ux-audit-cost` matches the hub H2. |
| B10 | "The sheet works with any provider: give the same six answers to each freelancer and agency on your shortlist, and their quotes line up row by row." (L197) | TRUE (advice) | This is advice to the reader and contains no offer or promise from us. |
| B11 | "When our column of the matrix matches your scope, [share the sheet with our audit team](/contact/); every project begins with a free consultation and a fixed-scope proposal." (L197) | TRUE | about.md L30, word for word: "every project begins with a free consultation and a fixed-scope proposal". It adds no call length, attendee, fixed price, turnaround or referral promise. `/contact/` exists. "Our column" means the agency column, whose cells now match the hub. |

## Honesty and self-rubric

- No clients, results, testimonials, awards, certifications, invented team members or local offices
  appear in the post or the SVGs. The sample finding is still labelled illustrative.
- Agency column scored against our own site: every cell is now advice or matches the hub (WCAG 2.2
  AA check of audited screens; GA4 plus Hotjar or Clarity; screenshot plus severity; roadmap
  handover; 2–3 weeks).
- Remaining orchestrator note from loop 1 (not a post defect): the hub says "2 designers" and
  home.ts L201 says "1–2 designers". The post now states no count. Align the two site pages before a
  later post states one. Readers who apply the post's 3–5 benchmark will find our audit below it.
  The post now treats the count as a question to ask, not a claim, so it does not contradict the site.

## Fixes (exact old → new)

None. Every loop-1 fix is applied, and every new claim is TRUE.

VERDICT: PASS
