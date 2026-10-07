# Fact-check: ux-audit-agency-vs-freelancer

Checked 2026-10-07 (review loop 1) against `content/blog/ux-audit-agency-vs-freelancer.md`, the brief,
the 7 SVGs in `public/blog/ux-audit-agency-vs-freelancer/`, and these site sources:
`content/services/ux-audit-services.json` (hub), `content/pages/about.md`, `content/home.ts`
and `content/case-studies/*.md`.

**Method.** WebFetch was blocked (EGRESS_BLOCKED) for baymard.com, nngroup.com, tandfonline.com,
wikipedia.org and every mirror of the Nielsen papers I tried. I verified each external claim with a
WebSearch. A claim counts as verified only when the search returned the exact URL in the post and a
snippet that supports the sentence. I checked every number separately. Site claims were checked by
reading the files above ("site file" in the table).

## Claims

| # | Claim (post line) | Verdict | Source / method |
|---|---|---|---|
| 1 | Baymard 2023 test of 12 webpages; GPT-4 found 14% of the issues human experts found on the live pages (L26, intro); link `baymard.com/blog/gpt-ux-audit` | TRUE | https://baymard.com/blog/gpt-ux-audit (exact URL returned; title "Testing ChatGPT-4 for 'UX Audits' Shows an 80% Error Rate & 14–26% Discoverability Rate"; published October 2023 by Christian Holst; "12 webpages"; "just 14% of the UX issues actually present on the live webpage", compared with human UX professionals). |
| 2 | 20% accuracy, 80% false-positive rate (L20, L99, L101, L207) | TRUE | Same URL: "a 20% accuracy rate", "an 80% false-positive error rate". |
| 3 | Scored "against its own UX benchmarkers" (L101) | TRUE | Same URL: compared with "6 different highly trained UX benchmarkers working at Baymard". |
| 4 | Per page: 2.9 correct issues, 18.5 missed on the live page, 1.3 likely harmful suggestions (L101) | TRUE | Same URL: "on average correctly identified 2.9 UX issues, but then overlooked 18.5 UX issues on the live webpage … came up with 1.3 suggestions that are likely harmful to UX". Each number checked. |
| 5 | 26% of the issues in screenshots and 14% on the live page, because a screenshot cannot show interaction (L101; split card SVG and its text block; FAQ L207) | TRUE | Same URL: "discovered 26% of the UX issues in the screenshot … and just 14% … on the live webpage (as interaction-related UX issues cannot be ascertained from an image)". The SVG bars (26% and 14%) and the source line "Baymard Institute, 2023 GPT-4 test" match. The examples (error handling, a tap) are the post's own illustrations of "interaction-related". |
| 6 | Baymard's AI heuristic evaluation article: 50–75% accuracy in public tests of generative AI tools and premade prompts; 95% for UX-Ray against human expert auditors; presented as Baymard's own claim (L103); link | TRUE | https://baymard.com/blog/ai-heuristic-evaluations (exact URL returned; title "AI Heuristic UX Evaluations with a 95% Accuracy Rate"; "Public tests of generative AI tools and 'premade prompts' … show Accuracy Rates of just 50–75%, while UX-Ray has a documented 95% Accuracy Rate, when compared to how human expert UX auditors would have evaluated the same site"). The post labels the 95% as Baymard's own claim, which the brief requires. |
| 7 | UX-Ray is Baymard's own ecommerce tool (L103) | TRUE | Same URL plus https://baymard.com/lp/ux-benchmark-tool (UX-Ray is Baymard's tool). The NN/g article below calls Baymard "an independent ecommerce-specialized UX organization". |
| 8 | NN/g's conversation with Baymard's cofounders asks AI UX tools to publish an accuracy rate against human experts (L105); link `nngroup.com/articles/baymard-ai-tool-accuracy/` | TRUE | https://www.nngroup.com/articles/baymard-ai-tool-accuracy/ (exact URL returned; "Demand Accuracy from AI: Lessons from Baymard Institute", 30 Jan 2026, with Christian and Jamie Holst, cofounders; "most AI tools for UX fail to measure and report how their accuracy compares to human-produced outputs … the vast majority not even publishing an accuracy rate"). |
| 9 | "Single evaluators caught 20–50% of the usability problems" in Nielsen's original studies (L56; takeaway L17; bold answer L54; coverage-curve SVG "1 evaluator 20–50%"; alt text L58) | UNVERIFIABLE as written (number differs from the primary source) | The primary source is Nielsen and Molich (1990), "Heuristic evaluation of user interfaces" (CHI '90, doi 10.1145/97243.97281). Its abstract says individual evaluators "only found between 20 and 51% of the usability problems". Searches limited to nngroup.com returned paraphrases of "20% to 50%", but I could not confirm that the cited NN/g page contains that wording, because the snippets mix NN/g with arXiv 2507.02306. Use the primary figure, 20–51%. See F1–F4. |
| 10 | "3–5 usability specialists caught 74–87%" (L56) | TRUE as a Nielsen finding, but the link does not prove it | The primary source is Nielsen (1992), "Finding usability problems through heuristic evaluation" (CHI '92, doi 10.1145/142750.142834): aggregates of 3–5 usability specialists found 74–87%. I could not confirm that figure on the linked NN/g page. The sentence names "Nielsen's original … studies" and links NN/g only for the recommendation, so it stands if the source is named precisely (F1). |
| 11 | "One evaluator finds 20–50%…; 3–5 independent evaluators find 74–87%" as a general rule (takeaway L17; bold answer L54; SVG label "3–5 evaluators 74–87%") | WRONG (overgeneralized) | The 74–87% applies to usability *specialists* in the 1992 study, not to any 3–5 evaluators. The 20–51% comes from a different study (1990) with non-specialist evaluators. The takeaway and bold answer turn two study results into a present-tense law and leave out "specialists". See F2, F3, F4. |
| 12 | NN/g recommends 3–5 evaluators who review independently before comparing notes (L56); link `…/how-to-conduct-a-heuristic-evaluation/theory-heuristic-evaluations/` | TRUE | Exact URL returned by a WebSearch limited to nngroup.com, "The Theory Behind Heuristic Evaluations, by Jakob Nielsen". Snippets: "recommendation is normally to use three to five evaluators"; each evaluator inspects the interface alone, and "only after all evaluations have been completed are the evaluators allowed to communicate". |
| 13 | SVG "flattens after 5" | TRUE | Same NN/g page: "one does not gain that much additional information by using larger numbers". The SVG says the shading is a sketch. |
| 14 | Hertzum and Jacobsen "named the reason the evaluator effect" (L56) | WRONG (minor) | The evaluator effect is the phenomenon (different evaluators find different problems), not its reason. The term first appeared in Jacobsen, Hertzum and John (1998). The cited paper's title is "The Evaluator Effect: A Chilling Fact About Usability Evaluation Methods". See F5. |
| 15 | "Across the 11 studies they reviewed, any two evaluators applying the same method to the same interface agreed on only 5–65% of the problems" (L56); link `tandfonline.com/doi/abs/10.1207/S15327590IJHC1501_14` | WRONG (leaves out "average") | The link is TRUE: the exact URL was returned by a WebSearch limited to tandfonline.com (IJHCI vol. 15, 2003, issue 1, pp. 183–204, Hertzum and Jacobsen). The abstract says: "The average agreement between any 2 evaluators who have evaluated the same system using the same UEM ranges from 5% to 65%", and "A review of 11 studies". 11 studies is TRUE. Without "average", the 5–65% reads as the agreement of every pair. See F5. |
| 16 | Jakob Nielsen's 10 usability heuristics; heuristic 1 "visibility of system status"; heuristic 9 "help users recognize, diagnose and recover from errors" (L92, L154–155; sample-finding SVG) | TRUE | https://www.nngroup.com/articles/ten-usability-heuristics/ (WebSearch limited to nngroup.com), with heuristic 1 and heuristic 9 pages returned. |
| 17 | WCAG 3.3.1 Error Identification (L155; sample-finding SVG) | TRUE | https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html (Level A, part of WCAG 2.2). |
| 18 | WCAG 2.2 AA as the current standard (L19, L26, L43, L78, L130, L192, L219) | TRUE | https://www.w3.org/TR/WCAG22/ (W3C Recommendation; current version dated 12 Dec 2024). |
| 19 | Automated tools cannot judge whether alt text is meaningful; automated checkers catch only part of WCAG failures (L126, L219) | TRUE | https://www.w3.org/WAI/test-evaluate/tools/selecting/ and https://www.w3.org/TR/accessibility-conformance-challenges/ (WebSearch limited to w3.org: tools cannot check every aspect automatically, human judgement is required, and whether alt text describes the image cannot be identified programmatically). No percentage is given, which is correct. |
| 20 | NVDA and VoiceOver are screen readers; Google Analytics 4, Hotjar, Microsoft Clarity (L43, L191, L219) | TRUE | Common knowledge, and the tools match the hub's analytics and session-recording deliverables. |
| 21 | "Our UX audit services sit in the agency column" (L32), where the matrix agency WCAG cell says "Automated checks plus keyboard and screen-reader passes" (matrix SVG + L43) | UNVERIFIABLE for our audit | The post places us in the agency column, so each cell in that column becomes a claim about our audit. The hub only says "Audited screens are checked against WCAG 2.2 level AA" and "Every UX audit includes a WCAG 2.2 level AA check of the audited screens". No site page mentions keyboard or screen-reader passes. See F6. The other agency cells match the hub: GA4 plus Hotjar or Clarity; screenshot plus severity; the roadmap handover. |
| 22 | Agency trigger "A contract-driven accessibility deadline. Keyboard and screen-reader testing inside the audit" (L136), followed by "that is the scope our audit is built for" (L140) | UNVERIFIABLE (our capability is not on the site) | Same as #21. The hub supports "a WCAG 2.2 AA requirement in a contract" as a trigger and a WCAG 2.2 AA check of audited screens. It does not mention keyboard or screen-reader testing. See F7. |
| 23 | Other agency triggers: B2B SaaS roles; app and web checkout; redesign approval; inherited product, every key flow swept in weeks (L134–139) | TRUE | Hub: "A website UX audit and an app UX audit follow the same method"; the $15,000 example ("web app and mobile app … 2 user groups … full WCAG 2.2 AA check"); the "When should a company hire" list (redesign planned, new product owner inherits a product); "covers every key user flow" in 2–3 weeks. |
| 24 | "In our audits, more than one evaluator reviews the product independently … Then we merge: duplicates collapse …, a finding only one reviewer flagged gets a second look …, and severity is agreed together." (L60) | WRONG (designer count conflicts across the site; merge steps are not on the site) | The hub says "2 designers run … independently". `content/home.ts` L201 says "2–3 weeks · 1–2 designers", so a 1-designer audit contradicts "more than one". Per the orchestrator: no designer count for our audits. The merge details (duplicates, second look, severity agreed together) are not on the site. The hub only says "Findings are merged, evidenced with screenshots and given a severity rating and an effort estimate." See F8. |
| 25 | "…that is the scope our audit is built for: 2–3 weeks, independent reviews by more than one evaluator, and a fix roadmap ranked by impact and effort." (L140) | WRONG (designer count) | 2–3 weeks and "prioritized fix roadmap ranked by impact and effort" are TRUE (hub abstract). "Independent reviews by more than one evaluator" has the same conflict as #24. See F9. |
| 26 | FAQ: "At least two independent evaluators; NN/g recommends 3–5 … Our audits merge independent reviews by more than one evaluator into one list with agreed severity" (L211) | WRONG | "Our audits … more than one evaluator" has the same problem as #24. "At least two" also contradicts the source the post cites: NN/g recommends 3–5, "about five evaluators, but certainly at least three". Our own hub (2 designers) and home.ts (1–2) are below that, so the FAQ would make readers mark us down (self-rubric check). See F10. |
| 27 | "We would honestly point you to a freelancer for:" (L68) | UNVERIFIABLE (behavioral promise) | No site page promises to refer buyers to freelancers. This comes from the brief's leadAngle/ctaAngle, which is unverified. See F11. |
| 28 | "Hold us to the same test. Ask every shortlisted provider for one redacted finding before you sign." (L159) | UNVERIFIABLE (implied offer) | It implies we will supply a redacted sample finding. No site page offers one, and no case study covers an audit (`grep -i audit content/case-studies` returned nothing). See F12. |
| 29 | "our audits run $5,000–$15,000 over 2–3 weeks" (L197); hub deep link `#how-much-does-a-ux-audit-cost` | TRUE | Hub `priceRange` "$5,000–$15,000" and "takes 2–3 weeks"; home.ts L201 and L261. The anchor matches the hub H2 "How much does a UX audit cost?". |
| 30 | "[Send us your scope sheet](/contact/): we talk it through with you at no charge and return a fixed-scope proposal." (L197) | UNVERIFIABLE as worded (paraphrase of the site offer) | about.md: "every project begins with a free consultation and a fixed-scope proposal". "We talk it through with you" adds a step that is not described. Use the site's exact words. See F13. `/contact/` exists (`app/contact/page.tsx`). |
| 31 | "If a freelancer or internal sweep fits better, we will say so." (L197) | UNVERIFIABLE (unconfirmed behavioral promise; flagged per orchestrator) | Not stated on any site page. It comes from the brief's leadAngle ("an honest answer if a freelancer … would do"). See F13. |
| 32 | Meta description "send a 6-input scope sheet for a fixed-scope quote" | TRUE (acceptable) | It matches about.md's "fixed-scope proposal" and the post's 6-input sheet. |
| 33 | Sample-finding SVG and list (L146–156): labelled illustrative, "Not a client finding"; severity "3 of 4" | TRUE | Clearly labelled as hypothetical. The severity scale matches the hub ("a severity rating from 1 to 4"). No client is named. |
| 34 | Hybrid flow SVG (4 steps, owners, hand-offs) and scope-sheet SVG (6 inputs) | TRUE (consistent) | Each node matches the "Show as text" blocks (L169–172, L188–193) word for word. They contain no external facts. |
| 35 | Matrix SVG, non-agency columns (freelancer, in-house, AI tool) | Opinion / generalization, consistent with the prose | They are not statistics, and the SVG says "No prices". "AI tool: Automated rules only" for WCAG matches L126. |
| 36 | Internal links `/services/ux-audit-services/`, `/services/usability-testing-services/`, `/industries/saas/` | TRUE | The files exist: `content/services/ux-audit-services.json`, `content/services/usability-testing-services.json`, `content/industries/saas.json`. |
| 37 | Honesty: no clients, results, testimonials, awards or local offices for audits | TRUE | None in the post or SVGs. The cover has no claims. |

## Fixes (exact old → new)

Every external figure below was checked word for word against the source snippets. Every "we/our"
replacement uses only phrases from the hub (`ux-audit-services.json`) or about.md, or is rewritten
as advice to the reader.

**F1 (L56, first sentence)**
- Old: "In Jakob Nielsen's original heuristic evaluation studies, single evaluators caught 20–50% of the usability problems and 3–5 usability specialists caught 74–87%, which is why [Nielsen Norman Group recommends 3–5 evaluators who review independently](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/theory-heuristic-evaluations/) before comparing notes."
- New: "In Jakob Nielsen's original heuristic evaluation studies, single evaluators found 20–51% of the usability problems (Nielsen and Molich, 1990), and aggregates of 3–5 usability specialists found 74–87% (Nielsen, 1992), which is why [Nielsen Norman Group recommends 3–5 evaluators who review independently](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/theory-heuristic-evaluations/) before comparing notes."

**F2 (takeaway L17)**
- Old: "Provider type changes what a UX audit finds: one evaluator finds 20–50% of usability problems, 3–5 independent evaluators 74–87%."
- New: "Provider type changes what a UX audit finds: in Nielsen's studies, single evaluators found 20–51% of usability problems and 3–5 usability specialists found 74–87%."

**F3 (bold answer L54)**
- Old: "**One evaluator finds 20–50% of usability problems in a heuristic evaluation; 3–5 independent evaluators find 74–87%, so a solo review misses issues by design.**"
- New: "**In Jakob Nielsen's heuristic evaluation studies, single evaluators found 20–51% of usability problems and 3–5 usability specialists found 74–87%, so a solo review misses issues by design.**"

**F4 (coverage-curve SVG, its alt text and caption, L58)**
- SVG label "20–50%" → "20–51%". Y-axis tick "50%" → "51%" (or drop the tick).
- SVG label "3–5 evaluators" → "3–5 specialists".
- SVG source lines "Source: Nielsen Norman Group" / "(Nielsen's heuristic evaluation studies)" → "Source: Nielsen & Molich (1990);" / "Nielsen (1992)".
- Alt text old: "Curve showing one evaluator finds 20 to 50% of usability problems and 3 to 5 independent evaluators find 74 to 87%" → new: "Curve showing single evaluators found 20 to 51% of usability problems and 3 to 5 usability specialists found 74 to 87% in Jakob Nielsen's studies"
- Caption old: "Share of usability problems found by number of independent evaluators (Nielsen Norman Group)" → new: "Share of usability problems found by number of evaluators (Nielsen and Molich, 1990; Nielsen, 1992)"

**F5 (L56, Hertzum and Jacobsen sentence)**
- Old: "[Hertzum and Jacobsen](https://www.tandfonline.com/doi/abs/10.1207/S15327590IJHC1501_14) named the reason the evaluator effect: across the 11 studies they reviewed, any two evaluators applying the same method to the same interface agreed on only 5–65% of the problems."
- New: "[Hertzum and Jacobsen](https://www.tandfonline.com/doi/abs/10.1207/S15327590IJHC1501_14) call this the evaluator effect: in the 11 studies they reviewed, the average agreement between any two evaluators who evaluated the same system with the same method ranged from 5% to 65%."

**F6 (matrix, agency cell "WCAG 2.2 AA depth": SVG text and table L43)**
- Old: "Automated checks plus keyboard and screen-reader passes"
- New: "WCAG 2.2 AA check of audited screens; ask how it is tested"
- (Owner note: if our audits do include keyboard and screen-reader passes, add that to the hub first. The original cell can then return.)

**F7 (L136)**
- Old: "- **A contract-driven accessibility deadline.** Keyboard and screen-reader testing inside the audit, not a second project."
- New: "- **A contract-driven accessibility deadline.** A WCAG 2.2 AA check of the audited screens inside the audit, not a second project."

**F8 (L60)**
- Old: "In our audits, more than one evaluator reviews the product independently before anyone reads another's notes. Then we merge: duplicates collapse into one entry, a finding only one reviewer flagged gets a second look against the evidence, and severity is agreed together."
- New: "Whoever runs your audit, ask how the findings are merged. In a sound merge, duplicates collapse into one entry, a finding only one reviewer flagged gets a second look against the evidence, and severity is agreed together."

**F9 (L140, last sentence)**
- Old: "If two or more lines above describe your product, that is the scope our audit is built for: 2–3 weeks, independent reviews by more than one evaluator, and a fix roadmap ranked by impact and effort."
- New: "If two or more lines above describe your product, that is the scope our audit is built for: 2–3 weeks, a heuristic evaluation, an analytics review, a session-recording review and an accessibility check, ending with a prioritized fix roadmap ranked by impact and effort."

**F10 (FAQ L211)**
- Old: "At least two independent evaluators; Nielsen Norman Group recommends 3–5 for a heuristic evaluation. Our audits merge independent reviews by more than one evaluator into one list with agreed severity; ask any provider how many people review, and whether separately."
- New: "Three to five, each reviewing independently: that is Nielsen Norman Group's recommendation for a heuristic evaluation. Ask any provider how many people review your product, and whether they review separately before the findings are merged."

**F11 (L68)**
- Old: "We would honestly point you to a freelancer for:"
- New: "A freelancer is the better buy for:"

**F12 (L159)**
- Old: "Hold us to the same test. Ask every shortlisted provider for one redacted finding before you sign."
- New: "Ask every shortlisted provider for one redacted finding before you sign."

**F13 (L197, CTA; uses about.md's exact words "every project begins with a free consultation and a fixed-scope proposal")**
- Old: "[Send us your scope sheet](/contact/): we talk it through with you at no charge and return a fixed-scope proposal. If a freelancer or internal sweep fits better, we will say so. Then weigh our proposal against every other quote."
- New: "[Send us your scope sheet](/contact/): every project begins with a free consultation and a fixed-scope proposal. Send the same sheet to any freelancer you shortlist, and weigh our proposal against every other quote."

## Notes for the orchestrator

- Site inconsistency (not fixable in the post): the hub says "2 designers" and lists "2 senior UX
  designers" in the comparison table. `content/home.ts` L201 says "1–2 designers". Fixes F8–F10 remove
  every designer count from the post. Align the two pages before any later post states a count.
- Self-rubric check: the post tells readers that 3–5 independent evaluators is the benchmark. Our audit
  (2 per the hub, 1–2 per home.ts) is below it. After F8–F10 the post no longer claims otherwise.
  Readers who ask "how many?" will still hear 1–2, so keep the honest framing ("a named second
  reviewer narrows the gap").
- The brief's leadAngle (a "fixed price within the range … by 2 independent reviewers, plus an honest
  answer if a freelancer … would do") is not a site offer. Do not bring it back in repair rounds.

VERDICT: FAIL
