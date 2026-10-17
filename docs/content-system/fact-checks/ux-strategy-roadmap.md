# Fact-check: ux-strategy-roadmap (2026-10-17)

Post: `content/blog/ux-strategy-roadmap.md` (read 2026-10-17, 264 lines). SVGs: `public/blog/ux-strategy-roadmap/*.svg` (7 files, all text read).
Site sources: `content/services/ux-consulting-services.json` (hub), `content/services/ux-audit-services.json`, `content/home.ts`, `content/pages/about.md`, `content/case-studies/tradezella.md`, `content/case-studies/mass-media-co.md`.
I did not edit the post or the SVGs (role rule, and QA is editing in parallel). Every fix below is an exact replacement for the orchestrator to apply.

## External sources fetched

| URL | Loads | Supports its sentence |
|---|---|---|
| https://www.nngroup.com/articles/ux-roadmaps/ | Yes (Sarah Gibbons, 5 July 2020) | Yes |
| https://www.nngroup.com/articles/ux-maturity-model/ | Yes (Pernice, Gibbons, Moran, Whitenton, 13 June 2021, reviewed 24 Jan 2024) | Yes |
| https://support.google.com/analytics/answer/9327974 | Yes ("[GA4] Funnel exploration") | Yes |
| https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/ | Yes (Sean McBride, 5 January 2018) | Yes |
| https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/ | Yes (CHI 2010; Rodden, Hutchinson, Fu) | Yes for the link sentence. The category glosses that follow it fail against the full PDF (F1–F3) |
| Paper PDF: https://research.google.com/pubs/archive/36299.pdf (301 to static.googleusercontent.com) | The PDF came back as binary. Full text was read through the r.jina.ai text proxy of that URL | Source for F1–F3 |

## Claims

| # | Claim (post line) | Verdict | Source / evidence |
|---|---|---|---|
| 1 | HEART = happiness, engagement, adoption, retention and task success (L28, L136, takeaways) | TRUE | Paper: "HEART: Happiness, Engagement, Adoption, Retention, and Task success" |
| 2 | "2010 CHI paper by Google's Kerry Rodden, Hilary Hutchinson and Xin Fu" naming "five categories of user-centered metrics" (L136) | TRUE | research.google page (Proceedings of CHI 2010). PDF affiliation line: "Google 1600 Amphitheatre Parkway, Mountain View". Abstract: "the HEART framework for user-centered metrics" |
| 3 | "Happiness is attitude, such as a survey score" (L136) | TRUE | Paper: "metrics that are attitudinal in nature". iGoogle tracked them "via a weekly in-product survey" |
| 4 | "Engagement is depth of use, such as invoices sent per week" (L136) | WRONG (narrowed) | Paper: engagement is measured through "the frequency, intensity, or depth of interaction over some time period" and is reported as a per-user average. The post keeps only "depth", and its own example (sends per week) measures frequency. **F1** |
| 5 | "Adoption is new users of a product or feature, such as activation rate…" (L136) | TRUE (example is ours) | Paper: "Adoption metrics track how many new users start using a product during a given time period", "especially useful for new products and features". The paper's own example is "accounts created in the last seven days". Activation rate is the post's example, and the hub uses the same gloss |
| 6 | "Retention is who comes back" (L136) | TRUE | Paper: "how many of the users from a given time period are still present in some later time period" |
| 7 | "task success is completion, such as admins finishing an invite without help" (L136) | WRONG (narrowed) | Paper: Task Success covers "efficiency, effectiveness, and error rate" (time to complete a task, percent of tasks completed). "Completion" is only effectiveness. The post later says mismatched tables "slow task success" (L101), and the board uses "Time to find" (L213), which is an efficiency metric the post's own definition leaves out. **F1** |
| 8 | "The paper's Goals-Signals-Metrics process picks the number: state the theme's goal, name the user action that signals it, then track that signal in GA4 or a survey." (L138) | WRONG (steps misdescribed) | The name is exact: the paper says "Goals-Signals-Metrics process" (heading "GOALS – SIGNALS – METRICS"). The steps are not. The paper says signals are how success "might manifest itself in user behavior or attitudes", not "user action" only, and the third step is "how these signals can be translated into specific metrics", not tracking the signal. **F2** |
| 9 | RICE "comes from Intercom" (L107) | TRUE | Intercom blog: "we began developing our own scoring system" |
| 10 | Sean McBride defined the scales: reach = people per period, impact 3 (massive) to 0.25 (minimal), confidence 100/80/50%, effort in person-months (L107) | TRUE | Intercom: reach "number of people/events per time period". Impact 3 massive, 2 high, 1 medium, 0.5 low, 0.25 minimal. Confidence 100% high, 80% medium, 50% low. Effort in "person-months". Author Sean McBride, 5 Jan 2018 |
| 11 | "That mapping is our practice, not Intercom's" (L109); person-weeks adaptation (L107) | TRUE (labelled) | Intercom does not tie confidence to evidence type |
| 12 | NN/g (Gibbons): UX roadmap = "living, strategic plan that aligns a UX team on upcoming work and the problems to solve, built on user-focused themes rather than features" (L36) | TRUE | NN/g: "A strategic, living artifact that aligns, prioritizes, and communicates a UX team's future work and problems to solve". Themes are "user problems to solve". "Roadmaps should not map out every specific feature" |
| 13 | "Nielsen Norman Group splits roadmap time into now, next and future; we call the last column later" (L161) | TRUE | NN/g: "most typically organized in three columns: Now, Next, and Future" |
| 14 | UX maturity = "a company's desire and ability to deliver user-centered design, judged on its strategy, culture, process and outcomes" (L75) | TRUE | NN/g: "measures an organization's desire and ability to successfully deliver user-centered design". Factors: Strategy, Culture, Process, Outcomes |
| 15 | Six stages: Absent, Limited, Emergent, Structured, Integrated, User-driven (L75) | TRUE | NN/g maturity model, same order |
| 16 | "A company at Limited or Emergent needs research and process themes before redesign themes" (L75) | TRUE (editorial advice) | NN/g does not state it. It is worded as the post's own advice and not attributed. It matches the hub's maturity framing |
| 17 | GA4 funnel exploration "shows where users drop out between steps" (L60) | TRUE | Google: "how well they are succeeding or failing at each step"; a user who misses a step "fall[s] out of the funnel" |
| 18 | Jobs to be Done "describes the progress a person is trying to make"; "When I…, I want to…, so…" (L83) | TRUE (note) | Christensen's JTBD "progress" framing. The When/I want/so format is usually called a job story (a JTBD format). Not wrong, so no fix required |
| 19 | Product backlog owned by the product owner (table) | TRUE | Scrum: the Product Owner is accountable for Product Backlog management |
| 20 | Fix roadmap row: interface issues, design and engineering leads, issues fixed (table, SVG 1) | TRUE (editorial) | ux-audit hub: "prioritized fix roadmap ranked by impact and effort", effort in design and development days. Cross-hub link loads |
| 21 | FigJam board as a workshop tool (L179) | TRUE | FigJam is Figma's online whiteboard. Worded as "is enough" (advice), not as a site claim |
| 22 | Stakeholder interviews: interview count 6–10 leads across product, engineering, sales and support (L60, takeaways) | TRUE | Hub deliverable 1 and step 1 |
| 23 | "on our engagements, these interviews run in the first 2–3 days" (L77) | TRUE | Hub step 1 "Stakeholder interviews (2–3 days)" |
| 24 | "Our maturity scoring and strategy step turns findings into RICE-scored initiatives in 2–4 days" (L130) | TRUE | Hub step 3 (2–4 days), "turned into initiatives with RICE scores and HEART metrics" |
| 25 | "the roadmap is presented in a 2-hour workshop where owners and dates are agreed on" (L179, takeaways, H2 bold L171) | TRUE | Hub step 4 |
| 26 | "That prioritized roadmap is the main output of our UX consulting services" (L34) | TRUE | Hub hero ("a prioritized roadmap it can act on") and vs-table "Main output: UX strategy roadmap and UX metrics framework". The post's roadmap carries the HEART metrics |
| 27 | Engagement price $5,000–$15,000, duration 2–3 weeks; delivers interviews, RICE and HEART work and the workshop; four factors move the price (L239) | TRUE | Hub priceRange, cost section ("4 factors"), steps. Deep link id `how-much-does-ux-consulting-cost` matches `sectionId()` |
| 28 | "Ongoing advisory adds weekly sessions and quarterly roadmap reviews, and interface design work is quoted separately" (L239) | TRUE | Hub FAQs ("weekly advisory sessions and quarterly roadmap reviews"; design work "quoted as a design sprint or a full design engagement"). No designer count, so the home.ts "2–5 designers" conflict is avoided as the brief asked |
| 29 | FAQ: "10–15 working days from the first stakeholder interview to the roadmap workshop"; the product and process review is the longest step (L255) | TRUE | Hub FAQ is word for word. Step lengths 2–3 / 4–6 / 2–4 / 2 days, so review (4–6) is the longest |
| 30 | "On our engagements, quarterly roadmap reviews move UX maturity up one stage at a time." (L228) | WRONG (scope) | The 2–3 week engagement ends at the workshop, and the hub puts quarterly roadmap reviews only in ongoing advisory (FAQ "Can UX consulting be ongoing?"). The hub benefit says reviews "develop the company's UX maturity one stage at a time on the Nielsen Norman Group model". The post ties that outcome to "our engagements" as an observed result. **F3** |
| 31 | "Every project begins with a free consultation and a fixed-scope proposal" (L241) | TRUE | about.md word for word |
| 32 | TradeZella: "discovery sessions with the stakeholders mapped their long-term vision before we rebuilt any user flow" (L77) | WRONG (overstated) | tradezella.md, The solution: "We ran discovery sessions with the stakeholders to understand their long-term vision. Then we rebuilt the user flows…". "Mapped" implies an artifact the file never names. The post correctly does not call it a consulting engagement (services lack ux-consulting-services). **F4** |
| 33 | Mass Media Co.: stakeholders and users together, align the product revamp strategy with business goals, covering product definition, IA and user flows; "a product revamp, not a roadmap engagement" (L187) | TRUE | mass-media-co.md, Our approach. No result (30%) is attributed to the workshop |
| 34 | RICE card arithmetic: 900×2×1/4=450; 2,400×1×1/6=400; 600×1×1/2=300; 1,200×0.5×0.8/3=160; 1,500×2×0.5/10=150 (L120–124, SVG 4) | TRUE | Recomputed. "Largest reach times impact" for mobile (3,000) is correct, and it ranks last |
| 35 | Capacity: 10 person-weeks = invite (4) + first invoice (6), export waits (L199) | TRUE | 4+6=10. Consistent with the Now rule (L163) |
| 36 | HEART grid bars (SVG 5) | TRUE | Bars are 271.333 px wide. 61%→165.5, 85%→230.6, 38%→103.1, 50%→135.7, 3.1/5→168.2, 4.0/5→217.1: all match |
| 37 | Board: "Mobile approval test: Confidence 50% → 80%" (L214, SVG 6 y=584) | WRONG (contradicts post's own mapping) | L109 and takeaway 3: "usability testing or analytics earns 100%", "tested or measured 100%", and 80% means "mixed evidence … with no test". L167 says this item is "its usability testing round or interview study". A finished test therefore lands at 100%, not 80%. **F5** |
| 38 | Horizon placement of all six board rows vs the three rules (L163–165) | TRUE | Invite and first invoice: 100%, baseline, fits 10 pw. Export: 100% but no capacity, so Next. Find: 80%, Next. Mobile: 50%, Later. Its test sits in Next |
| 39 | "Illustrative" labels | TRUE | RICE card ("Illustrative, invented inputs"), HEART grid and board carry an in-image label. All three text tables say "Illustrative". The example section says "every number is illustrative". The feature-to-theme SVG has no numbers and its alt says illustrative |
| 40 | Honesty: no Apex HCM / Fortna / ToolsGroup, no invented clients, stats, awards, offices or team, no production-code claim | TRUE | Full read of the post and the SVG text. Only TradeZella and Mass Media Co. are named, both from case-studies/ |
| 41 | One intent = one answer site-wide | TRUE | Grep of content/ for UX consulting prices and timelines outside the hub finds only the brief. The post repeats the hub's figures only |

## Fixes (exact replacements)

**F1, L136, replace the last three sentences of the paragraph:**
Old: "Engagement is depth of use, such as invoices sent per week. Adoption is new users of a product or feature, such as activation rate, the share of new users who reach the first key action. Retention is who comes back, and task success is completion, such as admins finishing an invite without help."
New: "Engagement is how often, how intensely or how deeply people use the product, such as invoices sent per user per week. Adoption is new users of a product or feature, such as activation rate, the share of new users who reach the first key action. Retention is who comes back, and task success covers efficiency, effectiveness and errors, such as the share of admins finishing an invite without help."
(Paper: "frequency, intensity, or depth of interaction", reported per user; Task Success = "efficiency, effectiveness, and error rate". No SVG text changes.)

**F2, L138, first sentence:**
Old: "The paper's Goals-Signals-Metrics process picks the number: state the theme's goal, name the user action that signals it, then track that signal in GA4 or a survey."
New: "The paper's Goals-Signals-Metrics process picks the number: state the theme's goal, name the user behavior or attitude that would show success, then turn that signal into a metric you track in GA4 or a survey."
(Paper: success "might manifest itself in user behavior or attitudes"; signals are "translated into specific metrics". The HEART grid SVG already uses goal / signal / baseline → target and needs no change.)

**F3, L228, last sentence of the Quarterly review bullet:**
Old: "On our engagements, quarterly roadmap reviews move UX maturity up one stage at a time."
New: "In ongoing advisory, quarterly roadmap reviews develop a company's UX maturity one stage at a time on the Nielsen Norman Group model."
(Hub benefit card, word for word except "a company's", plus the hub FAQ that places quarterly roadmap reviews in ongoing advisory.)

**F4, L77, second sentence:**
Old: "In the [TradeZella trading journal revamp](/case-studies/tradezella/), discovery sessions with the stakeholders mapped their long-term vision before we rebuilt any user flow."
New: "In the [TradeZella trading journal revamp](/case-studies/tradezella/), we ran discovery sessions with the stakeholders to understand their long-term vision, then rebuilt the user flows."
(tradezella.md The solution, word for word.)

**F5, L214 text table and SVG `one-page-roadmap-board.svg`:**
- L214 old: `| Mobile approval test | Next | Research task | Confidence 50% → 80% | Research lead |`
- L214 new: `| Mobile approval test | Next | Research task | Confidence 50% → 100% | Research lead |`
- SVG: change `<text x="382" y="584" …>Confidence 50% → 80%</text>` to `Confidence 50% → 100%`. It is one line. At 38px it ends at about x≈800, inside the card edge at x=893.5, so no other geometry moves.
(Alternative if the designer prefers 80%: rename the card "Mobile approval interviews". The post's mapping does not define what an interview study earns, so 80% would then need a sentence. The first option is simpler.)

## Notes (no fix required)

- L241 "rows that still read like 'redesign the settings page' are where the rewrite starts". This could be read as a free rewrite during the consultation. The brief says not to promise a review before the call. The sentence is soft and names no deliverable, so it passes. QA may prefer "…are where an engagement's rewrite would start."
- L96 / L122: "export logs" support "Finance managers rebuild reports in spreadsheets" only by inference (logs count exports, not spreadsheet work), yet that theme gets 100% confidence. It is illustrative, so it does not fail, but a reader applying the mapping strictly would rate it 80%.
- Brief `externalSources` notes were accurate this run (GA4 page, maturity URL and research.google URL all resolve).
- Site conflicts flagged in the brief (home.ts embedded team "2–5 designers… shipping features"; no UX consulting card on home.ts) are still open for the owner. The post avoids both.

VERDICT: FAIL
