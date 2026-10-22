# Fact-check: Search Console run 2 additions (2026-10-22)

Scope: content/services/ux-consulting-services.json (commit a67ac8e) and content/services/ux-audit-services.json (uncommitted). Both files were read in full in their current state.

Method note: this agent had no shell, so it could not run `git diff`. Every claim named in the task was checked against the current file text. No content file was edited, because QA is editing in parallel. Fixes are given below as exact current → replacement text.

Locked titles: both metaTitles still match docs/content-system/locked-pages.json (L82, L83). PASS.

Site sources used: content/home.ts, content/pages/about.md, content/case-studies/mass-media-co.md, content/services/ui-ux-design-services-for-startups.json, content/services/usability-testing-services.json, content/locations/*.json, and the two hubs themselves.

## A. ux-consulting-services.json

| # | Claim (line) | Verdict | Source / note |
|---|---|---|---|
| A1 | Types answer: "4 types, from UX strategy for a live product to … AI feature advisory" (L116) | WRONG (order/wording) | The list has 4 types plus an accessibility redirect, and AI feature advisory is the 3rd type, not the last. "from … to AI feature advisory" misstates the range. → F8 |
| A2 | "UX strategy and consulting for a live product … 2–3 weeks" (L120) | TRUE | Hub process (L70), FAQ L313 |
| A3 | "Pre-build UX strategy … sets UX goals, HEART metrics and a roadmap" before leadership funds design work (L124) | TRUE (site) | Hub hire-situation L245 and deliverables L55, L59 |
| A4 | "AI feature advisory": review checks trust, transparency and actionability (L128) | TRUE (site capability) | home.ts L168 "AI experience design": "We design for trust (how do users know the AI is right?), transparency (what is the system doing?), and actionability (what should the user do next?)". The criteria are copied from that line. Note: home.ts states this as a design capability, and this card applies it to a consulting review. No price or timeline is claimed for the card, which is acceptable |
| A5 | Ongoing advisory $15,000–$40,000/month, weekly sessions, quarterly roadmap reviews (L132) | TRUE | home.ts L203; hub FAQ L305 |
| A6 | Accessibility review goes through the UX audit, checks audited screens against WCAG 2.2 AA, and a full-site audit is quoted separately (L136) | TRUE | ux-audit FAQ L244 |
| A7 | Consulting vs audit table: audit "Who is involved: 2 senior UX designers" (L159) | CONFLICT | It matches ux-audit hub L126 and L180 and ecommerce hub L140. It contradicts the same page's FAQ L289 ("UX audit with 1–2 designers") and home.ts L200 ("2–3 weeks · 1–2 designers"). → F1 |
| A8 | Consulting vs design table: 6 criteria; 2–4 designers sprint, 3–6 full design; 4–8 / 8–16 weeks; $25,000–$60,000 / $60,000–$180,000; outputs (L191–L228) | TRUE | home.ts pricing L201–L202; process L107–L115. Row count = 6 |
| A9 | Consultant checklist: NN/g UX maturity model | TRUE | https://www.nngroup.com/articles/ux-maturity-model/ (6 stages: Absent, Limited, Emergent, Structured, Integrated, User-Driven) |
| A10 | Checklist: RICE, HEART activation target, GA4 funnels, JTBD coaching | TRUE (advice; matches hub deliverables L43–L63) | — |
| A11 | Checklist item 6: "because UX consultants leave after weeks" (L259) | WRONG (contradicts own offer) | The same page sells ongoing advisory (L132, FAQ L305), so a UX consultant does not always leave after weeks. → F9 |
| A12 | Checklist item 7: "every project with us begins with a free consultation and a fixed-scope proposal" (L260) | TRUE | about.md L30, word for word |
| A13 | Self-score against the rubric (lesson 2026-10-05) | PASS | We name a senior lead (home.ts hero: Sahar Asif, Senior Manager UX), use a published maturity model, use RICE and HEART, include coaching, fix scope in writing, and have a case where discovery shaped strategy (MMC). No criterion marks us down |
| A14 | MMC answer: "Our Mass Media Co. project shows UX consulting work inside a larger revamp: a discovery workshop that set the product strategy and user flows first" (L267) | WRONG (service attribution) | mass-media-co.md `services` = digital-product-design, web-app, dashboard-ux, mobile-app, ux-research. ux-consulting-services is not in the list (lesson 2026-10-12). blog/ux-strategy-roadmap.md L189 already says "That was a product revamp, not a roadmap engagement". The case also says the workshop "covered" strategy and flows, not "set" them. → F2 |
| A15 | MMC body: separate systems; discovery workshop with stakeholders and users aligned the revamp strategy with business goals; covered product definition, strategy, IA and user flows; 30% order processing efficiency credited to the whole revamp (L268) | TRUE | mass-media-co.md L33–L36, L43, L7, L100 |
| A16 | FAQ "cost to hire a UX designer": audit $5,000–$15,000, 2–3 weeks, "1–2 designers"; sprint $25,000–$60,000, 4–8 weeks, 2–4 designers; embedded $15,000–$40,000/mo, 2–5 designers; full design $60,000–$180,000, 8–16 weeks; consulting $5,000–$15,000, 2–3 weeks (L289) | TRUE except the audit headcount | home.ts L200–L203. The "1–2 designers" contradicts this page's L159 and the audit hub. → F1 |
| A17 | FAQ startups: ~$5,000 for 1 product and 6 interviews; startups hub validates an MVP in 4–8 weeks (L293) | TRUE | Hub L235; startups hub L32, L119 |
| A18 | FAQ remote: remote-first, HQ Reston VA, teams across the US (L297) | TRUE | about.md L11; RULES.md |
| A19 | FAQ remote: interviews, review and roadmap workshop "run without an on-site visit" (L297) | WRONG (scope) | This is stated as always true, but 15 location pages offer on-site workshops for larger engagements (for example LA L169, Seattle L180, Chicago L180, Philadelphia L168). The fact-checker gave the same verdict on the template copy in gsc-run-1 (F1). → F3 |
| A20 | FAQ remote: access shared "in the first 2–3 days, during the stakeholder interview step" (L297) | TRUE | Hub step 1 (L73–L74): 2–3 days, "receive analytics and product access" |
| A21 | FAQ AI: "We use AI to accelerate production work … research with real users and pattern recognition across 200+ products" (L301) | TRUE (site) | home.ts L213; "200+" is a confirmed company fact (RULES.md). "No." to "Is UX at risk from AI?" is the agency's stated position, not a statistic, and the page offers it as a view backed by home.ts |
| A22 | FAQ section answer lists the topics covered (L273) | TRUE | Matches the 10 FAQs |
| A23 | Honesty: no invented clients, results, testimonials, awards, team members or offices | PASS | Only MMC (a real case study) is named, and its figure is credited to the whole project |

## B. ux-audit-services.json

| # | Claim (line) | Verdict | Source / note |
|---|---|---|---|
| B1 | Hero sub: website, SaaS or mobile app; prioritized fix list with effort estimates (L11) | TRUE | home.ts L200; hub deliverables L86–L87 |
| B2 | Definition: "A website UX audit and an app UX audit follow the same method; only the platform guidelines change." (L34) | WRONG (contradicts own page) | L95 on the same page: "What changes is the list of user flows, the platform guidelines and the data source." → F6 |
| B3 | "4 areas" and merged findings: "a contrast failure and a funnel drop-off on the same screen become one recommended fix" (L39–L40) | WRONG (logic) | The hub merges findings (step 3, L130), but two different issues become one fix only when one explains the other. As written, the sentence says every co-located pair merges (lesson 2026-10-11, "with no X, Y happens"). → F7 |
| B4 | Jakob Nielsen's 10 usability heuristics; "consistency and standards"; "match between the system and the real world"; "error prevention" (L44, L56, L142) | TRUE | https://www.nngroup.com/articles/ten-usability-heuristics/ : #2 "Match Between the System and the Real World" ("rather than internal jargon" supports the project-code example; "natural and logical order" covers hierarchy), #4 "Consistency and Standards", #5 "Error Prevention" |
| B5 | WCAG 2.2 AA from the W3C; new 2.2 criteria include Target Size (Minimum) and Focus Not Obscured (Minimum) (L48) | TRUE | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ : 2.4.11 Focus Not Obscured (Minimum) (AA), 2.5.8 Target Size (Minimum) (AA), both new in 2.2. W3C Rec. 12 Dec 2024 (https://www.w3.org/TR/WCAG22/) |
| B6 | "A WCAG 2.2 AA pass also meets WCAG 2.1 AA" (L48) | TRUE (with caveat) | https://www.w3.org/TR/WCAG22/ : "backwards compatible with WCAG 2.1"; "intended that sites that conform to WCAG 2.2 also conform to WCAG 2.0 and WCAG 2.1". The only gap is 4.1.1 Parsing, which was removed in 2.2. The WCAG 2.1 errata (2023, https://www.w3.org/WAI/WCAG21/errata/) say 4.1.1 is always satisfied for HTML or XML content, so the claim holds for web content |
| B7 | DOJ 2024 ADA Title II rule references WCAG 2.1 AA (L48) | TRUE | https://www.ada.gov/resources/2024-03-08-web-rule/ : "WCAG Version 2.1, Level AA is the technical standard"; published April 24, 2024. The IFR of April 20, 2026 moves the compliance dates to April 26, 2027 and April 26, 2028 but keeps the standard. The page states no dates (fine) |
| B8 | EN 301 549 references WCAG 2.1 AA (L48) | OUTDATED | https://nda.ie/news/en301549-published : EN 301 549 V4.1.1 was published on 2 September 2026, and its web, document and software clauses "now reference WCAG 2.2 Level AA instead of WCAG 2.1". V3.2.1 (WCAG 2.1) stays the harmonised version in force until the Official Journal citation, expected 16 December 2026. Corroborated by https://www.dwt.com/insights/2026/09/european-accessibility-act-ict-standards-update (search result). → F4 |
| B9 | Mobile: Apple HIG 44×44 pt on iOS, Material Design 3 48×48 dp on Android (L107) | TRUE | Apple HIG accessibility table: default control size 44x44 pt (https://developer.apple.com/design/human-interface-guidelines/accessibility, verified 2026-10-20 via tutorials/data JSON). The page says "hit targets", not "minimum", so lesson 2026-10-20 is satisfied. M3: "at least 48 x 48dp" (https://m3.material.io/foundations/designing/structure). Matches startups hub L54 |
| B10 | Core Web Vitals field data = Google's real-user metrics for loading, responsiveness and layout stability (L111) | TRUE | https://web.dev/articles/vitals : LCP loading, INP interactivity/responsiveness, CLS visual stability; "all of the Core Web Vitals are, first and foremost, field metrics" |
| B11 | Website audit 3–4 flows near $5,000; 8–10 flows across web and mobile app (L95, L99) | TRUE | Hub cost body L219 |
| B12 | Illustrative report finding: password rules, error prevention, severity 3 of 4, effort 1 day (L142) | TRUE (labelled illustrative) | Severity 1–4 and effort estimates match hub L83 and L87. The heuristic fit is correct (B4). It is marked "illustrative", so no client is implied |
| B13 | "fix roadmap with quick wins first" (L141) | TRUE (site) | Hub L87 (ranked by impact and effort) and L159 ("start with the highest impact per day") |
| B14 | Audit vs usability testing table: "2 senior UX designers" (L180) | CONFLICT | Same as A7. → F1 |
| B15 | Cost body: "Teams that need the fixes designed afterwards continue with UX consulting services or a design sprint." (L219) | WRONG (contradicts sibling hub) | ux-consulting FAQ L309: "Does UX consulting include design work? No." The consulting FAQ L277 also says "screen work is quoted as a design sprint". → F5 |
| B16 | Affordable FAQ: website audit of 3–4 flows about $5,000, "the price at which our engagements start", includes the accessibility check and fix roadmap (L268) | TRUE | about.md L30 "Engagements start at $5,000 for a UX audit"; hub FAQ L244 |
| B17 | Affordable FAQ: "book a 45-minute UX audit session; we review your product and identify its top three friction points" (L268) | TRUE | home.ts L93, nearly word for word. No "free" is claimed (good, because home.ts does not say free) |
| B18 | Choosing FAQ: methods list, severity and effort, "names senior designers" (L272) | TRUE (advice) | Self-score: our audit names heuristic evaluation and analytics review, uses severity 1–4 and effort estimates, and states senior designers (L33). The list is an "or" list, so we do not fail on cognitive walkthrough |
| B19 | UI vs UX audit FAQ: visual layer vs task completion; WCAG 2.2 contrast checks (L264) | TRUE | WCAG 2.2 1.4.3 Contrast (Minimum) AA (https://www.w3.org/TR/WCAG22/) |
| B20 | FAQ answer: "These 10 answers" (L236) | TRUE | 10 FAQs |
| B21 | Internal links: /blog/ecommerce-ux-audit/, /services/saas-ux-design/, /services/design-system-services/, /blog/ux-audit-agency-vs-freelancer/#what-should-you-send-before-asking-for-a-quote | TRUE | The files exist. The anchor matches the H2 "What should you send before asking for a quote?" (L176), and the anchor text "six scope inputs" matches its bold answer |
| B22 | Honesty | PASS | No clients, results or certifications added |

## Fixes (exact current → replacement)

**F1. Audit team size (site-wide conflict; owner decision needed). Hub wins for now (RULES.md concept bindings rule 5).**
The ux-audit hub says "2 designers" (step 2, L126) and "2 senior UX designers" (L180), and so do the consulting table (L159) and the ecommerce hub (L140). home.ts L200 and this run's consulting FAQ L289 say "1–2 designers". The consulting page now prints both versions.
- content/services/ux-consulting-services.json L289
  Current: `$5,000–$15,000 for a 2–3 week UX audit with 1–2 designers,`
  Replacement: `$5,000–$15,000 for a 2–3 week UX audit with 2 designers,`
- Owner (home.ts copy, needs owner approval): content/home.ts L200
  Current: `timeline: "2–3 weeks · 1–2 designers"`
  Replacement: `timeline: "2–3 weeks · 2 designers"`
  If the owner confirms that 1–2 is the real staffing instead, change ux-audit L126 to "1–2 designers run …" and change L180, ux-consulting L159 and ecommerce L140 to "1–2 senior UX designers". Do not publish a third version.

**F2. content/services/ux-consulting-services.json L267 (MMC answer)**
Current: `<strong>Our Mass Media Co. project shows UX consulting work inside a larger revamp: a discovery workshop that set the product strategy and user flows first.</strong>`
Replacement: `<strong>Our Mass Media Co. project was a product revamp, not a UX consulting engagement, but it opened with the discovery work UX consulting is built on: a workshop that aligned strategy with business goals.</strong>`
(Every fact comes from mass-media-co.md L43. The body L268 can stay as it is.)

**F3. content/services/ux-consulting-services.json L297 (remote FAQ)**
Current: `so the stakeholder interviews, the product and analytics review and the roadmap workshop run without an on-site visit.`
Replacement: `so the stakeholder interviews, the product and analytics review and the roadmap workshop can run without an on-site visit.`

**F4. content/services/ux-audit-services.json L48 (EN 301 549)**
Current: `A WCAG 2.2 AA pass also meets WCAG 2.1 AA, the level referenced by the US Department of Justice's 2024 Americans with Disabilities Act (ADA) Title II rule and by the European standard EN 301 549.`
Replacement: `A WCAG 2.2 AA pass also meets WCAG 2.1 AA, the level the US Department of Justice's 2024 Americans with Disabilities Act (ADA) Title II rule adopts. The European standard EN 301 549 moved to WCAG 2.2 AA in version 4.1.1, published in September 2026.`

**F5. content/services/ux-audit-services.json L219 (cost body)**
Current: `Teams that need the fixes designed afterwards continue with <a href=\"/services/ux-consulting-services/\">UX consulting services</a> or a design sprint.`
Replacement: `Teams that need the fixes designed afterwards continue with a design sprint, and teams that need a wider UX plan add <a href=\"/services/ux-consulting-services/\">UX consulting services</a>.`

**F6. content/services/ux-audit-services.json L34 (definition body)**
Current: `A website UX audit and an app UX audit follow the same method; only the platform guidelines change.`
Replacement: `A website UX audit and an app UX audit follow the same method; the user flows, platform guidelines and data sources change.`

**F7. content/services/ux-audit-services.json L40**
Current: `so a contrast failure and a funnel drop-off on the same screen become one recommended fix instead of two separate tickets.`
Replacement: `so when a contrast failure explains a funnel drop-off on the same screen, the report gives one recommended fix instead of two separate tickets.`

**F8. content/services/ux-consulting-services.json L116 (types answer)**
Current: `<strong>Our UX consulting services come in 4 types, from UX strategy for a live product to artificial intelligence (AI) feature advisory; accessibility reviews run through our UX audit.</strong>`
Replacement: `<strong>Our UX consulting services come in 4 types: UX strategy for a live product, pre-build UX strategy, artificial intelligence (AI) feature advisory and ongoing UX advisory; accessibility reviews run through our UX audit.</strong>`

**F9. content/services/ux-consulting-services.json L259 (checklist item 6)**
Current: `Coaching that stays with your team, because UX consultants leave after weeks;`
Replacement: `Coaching that stays with your team, because a fixed-scope UX consulting engagement ends after a few weeks;`

## Notes for QA and the orchestrator

- F1 is the known open conflict from 2026-10-07. This run made it visible on one page (L159 vs L289), so the page fix is required now. The home.ts change needs the owner.
- F4: V3.2.1 (WCAG 2.1) stays the harmonised EN version until the Official Journal citation (expected 16 December 2026). The replacement says "published", not "in force", so it stays true before and after that date.
- Edits were withheld under the role's no-edit rule, and QA is editing in parallel.

VERDICT: FAIL
