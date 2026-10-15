# Fact-check: ux-design-agency-dallas (location page)

- File checked: `content/locations/ux-design-agency-dallas.json` (`draft: true`, updated 2026-10-15)
- Checked against: `docs/content-system/RULES.md`, `content/briefs/ux-design-agency-dallas.json` (siteFacts), `content/home.ts`, `content/pages/about.md`, `content/services/ux-audit-services.json`, `usability-testing-services.json`, `ux-research-services.json`, `design-system-services.json`, `content/industries/finance.json`, published location pages (Atlanta, Austin, LA, SF, Denver, NY, Miami)
- Date: 2026-10-15. The location file was **not edited** (QA is editing wording in parallel, and the role rule says do not edit). Every fix below is an exact replacement for the orchestrator to apply.

## 1. Honesty screen

| Check | Result |
|---|---|
| Dallas office, local team or Dallas clients implied | PASS. The body says "no Dallas office and no local team"; the first FAQ answers "No" and says "no Dallas office". No Dallas company is named as a client. The industry list names sectors only. |
| Apex HCM, Fortna, ToolsGroup | PASS. None mentioned (grep: 0 hits). |
| Invented stats, testimonials, awards, ratings, certifications | PASS. The page has no statistics, quotes, awards or ratings. |
| Claims of writing production code | PASS. "Components" and "annotated specs" go to "your developers". Nothing says we write production code. |
| Team-location wording | **FAIL (F2).** "Eastern-based team" is a claim about where the team sits. See F2. |
| Ranking / "top" claim | PASS. "We publish no rankings." "Top Dallas UX design companies" is only used as the buyer's phrase. |

## 2. Site facts (one intent = one answer)

| # | Claim on page | Site source | Verdict |
|---|---|---|---|
| S1 | Remote-first, HQ Reston, Virginia | about.md "headquartered at … Reston, Virginia, and we work remote-first" | TRUE |
| S2 | "designing digital products since 2017" | home.ts stats; RULES.md confirmed fact | TRUE |
| S3 | Audit $5,000–$15,000, 2–3 weeks (pricing H2, table, abstract) | home.ts pricing Engagement 01; ux-audit hub | TRUE |
| S4 | Sprint $25,000–$60,000, 4–8 weeks | home.ts Engagement 02 | TRUE |
| S5 | Full design and design system $60,000–$180,000, 8–16 weeks | home.ts Engagement 03; design-system hub | TRUE |
| S6 | Embedded team $15,000–$40,000 per month | home.ts Engagement 04 | TRUE |
| S7 | "2–4 designers" on a sprint (process answer, table, FAQ) | home.ts Engagement 02 "4–8 weeks · 2–4 designers". No audit headcount is stated, which is correct per the brief. | TRUE |
| S8 | Table "2–4 designers on a sprint: **researchers**, UX and UI designers together" | home.ts team has no researcher title. about.md: "The designers who run your research stay through design, testing and handoff." | **WRONG → F1** |
| S9 | Time to first design 1–2 weeks; in-house 6–10 weeks (hiring + ramp) | home.ts compare row 1 | TRUE |
| S10 | Start "1–2 weeks after proposal approval" | Atlanta FAQ (published); home.ts 1–2 weeks to first design | TRUE |
| S11 | Usability testing "5–8 participants per round for each user group"; FAQ "5–8 participants per user group" | usability-testing hub: "5–8 participants per round … match real user groups"; "5–8 participants per user group" | TRUE |
| S12 | "Every project begins with a free consultation and a fixed-scope proposal" | about.md, word for word | TRUE |
| S13 | "Four variables set the final number: the flows in scope, the platforms, the research depth and whether a component library is included" | home.ts FAQ lists 5 cost factors (scope and complexity, research and testing depth, platforms, design system maturity, team seniority). The ux-audit hub lists 4 different ones (flows, platforms, user groups, accessibility depth). | **WRONG (third version of the cost-factor answer) → F4** |
| S14 | Experience audit: "WCAG check at WCAG 2.2 … ranked by business impact" | ux-audit hub: "WCAG 2.2 level AA"; roadmap "ranked by impact and effort" | **Partly WRONG → F6** (the ranking basis differs from the hub; the level is missing) |
| S15 | Interface design: responsive web and native app screens in Figma | about.md: platforms are websites, web apps, iOS and Android; "We design in Figma" | TRUE |
| S16 | Component library and design system definitions | design-system hub: tokens, components, usage guidelines, governance; multi-brand systems priced on the hub | TRUE |
| S17 | Prototype validation with real users before development | home.ts benefits / FAQ "tested before engineering starts" | TRUE |
| S18 | Process: 5 stages, "4–8 weeks", "two reviews per week" | Atlanta (published) uses the same stages and "reviews twice a week"; the startups page has "2 founder reviews per week" | TRUE as wording, but see N1 (stage arithmetic) |
| S19 | Recruiting "through your customer lists or a research panel" | ux-research hub: "through a recruitment panel or the client's customer list" | TRUE |
| S20 | Compliance FAQ: review checkpoints with legal and compliance; disclosure and consent copy in prototypes; documented decisions | finance.json: compliance reviewers involved from day one, legal reviewers mark up disclosure wording, consent screens need sign-off; home.ts deliverable "iteration log" | TRUE (the "documented decisions" sentence is supported by the iteration log) |
| S21 | On-site workshops in DFW / travel "for larger engagements" | Same offer is on every published location page (Atlanta, Austin, LA, SF, Denver, Miami). Not on about.md or the hubs. | TRUE (consistent with the site). Owner note: this offer exists only on location pages. |
| S22 | Last FAQ: "At the end you receive research findings, Figma files, an interactive prototype, annotated specs and reusable components" | This holds for a sprint or full design (home.ts; about.md "annotated Figma files, components and specs"). It does not hold for the $5,000 audit, which ends with "a prioritized fix roadmap" (ux-audit hub). The FAQ is unscoped, and the page sells the audit as the entry point. | **WRONG (overgeneralised) → F5** |
| S23 | `priceRange` "$5,000–$60,000" | brief: same on all published location pages | TRUE |
| S24 | Benefit cards (fewer support contacts, adoption, faster delivery, unified brands) | Generic claims with no figures; home.ts benefits ("Save money on rework"); design-system hub (consistency across products) | TRUE (no numbers to check) |
| S25 | Internal links: /, /services/ux-consulting-services/, usability-testing-services, dashboard-design-services, saas-ux-design, ux-audit-services, design-system-services, /industries/finance/, /industries/ecommerce/ | All 8 JSON files exist in content/services and content/industries | TRUE |

The page has no external links.

## 3. External facts

| # | Claim | Verdict | Source |
|---|---|---|---|
| E1 | WCAG 2.2 is the standard to check against | TRUE. W3C Recommendation, current version dated 12 December 2024. | https://www.w3.org/TR/WCAG22/ |
| E2 | Dallas works on Central Time; Eastern is 1 hour ahead | TRUE. The Central/Mountain boundary in Texas starts at the east line of Hudspeth County, far west of Dallas. ET and CT are the 2nd and 3rd standard zones. | https://www.law.cornell.edu/cfr/text/49/71.7 ; https://www.law.cornell.edu/uscode/text/15/263 |
| E3 | "7–8 hours of overlap with Central Time" | TRUE as arithmetic (a 9–5 ET day overlaps 9–5 CT for 7 hours, and 8 if ET work runs to 6 p.m.). This matches the pattern on sibling pages (LA/SF 5–6 h Pacific, Denver 6–7 h Mountain). The wording around it fails, see F2. | Arithmetic from E2 |
| E4 | Plano, Irving, Frisco, Texas, and Uptown Dallas are in DFW | TRUE. Plano and Irving are principal cities of the Dallas–Plano–Irving division. Frisco is a non-principal DFW municipality. Uptown is a Dallas neighbourhood with its own Public Improvement District. | https://www.dallasfed.org/research/heart/dallas ; https://sph.uth.edu/research/centers/dell/webinars/Texas%20Metropolitan%20Statistical%20Areas(1)(1).pdf ; https://dallasecodev.org/493/Uptown-PID |
| E5 | Banking, insurance and financial services well represented in DFW | TRUE. The Dallas Fed says the financial services cluster "grew 22 percent from 2016 through 2023". Charles Schwab (Westlake), Comerica and Texas Capital (Dallas) have their HQs in the area. | https://www.dallasfed.org/research/heart/dallas ; https://en.wikipedia.org/wiki/List_of_companies_in_the_Dallas%E2%80%93Fort_Worth_metroplex |
| E6 | Telecom and wireless well represented | TRUE. AT&T's HQ is Whitacre Tower in downtown Dallas, and the company is moving to Plano (partial occupancy targeted for mid-2028), still inside DFW. Verizon has a large Irving base. The Dallas Fed counts telecom among the major business-services employers. | https://www.nbcdfw.com/news/local/att-new-hq-leaving-downtown-dallas/3964483/ ; https://www.dallasfed.org/research/heart/dallas |
| E7 | Retail and consumer brands well represented | TRUE on headquarters: 7-Eleven (Irving/Dallas), Michaels (Irving), Neiman Marcus (Dallas) and J.C. Penney (Plano) are listed among DFW HQs. Caveat: the Dallas Fed lists retail *employment* as less concentrated locally than nationally. The page's wording ("well represented") is acceptable on the HQ basis. | https://en.wikipedia.org/wiki/List_of_companies_in_the_Dallas%E2%80%93Fort_Worth_metroplex ; https://www.dallaschamber.org/wp-content/uploads/2026/03/EDG2026_BE-MajorCosHQs.pdf (search snippet; the PDF did not render) |
| E8 | Commercial and residential real estate well represented | TRUE. The Dallas Fed says the real estate, construction and development cluster "rose 23 percent from 2016 through 2023", and CBRE is headquartered in Dallas. | https://www.dallasfed.org/research/heart/dallas |
| E9 | "B2B software and **HR technology**" well represented across DFW | **UNVERIFIABLE → F3.** The Dallas Fed page names "IT manufacturing and services" but nothing on HR tech. Searches found no regional source showing an HR-tech concentration, and Paycom's DFW site is an expansion, not an HQ. The line also sits close to the removed HR/payroll case study. | https://www.dallasfed.org/research/heart/dallas |

## 4. Note for the owner (not blocking this page)

**N1, stage arithmetic, site-wide.** The five stages add up to 1–2 + 5–10 + 2–3 + 10–20 + 5–10 = **23–45 working days**. The page (and the hubs: "4–8 weeks (20–40 working days)") says 4–8 weeks. The upper end overshoots by 5 days. The same "10–20 days" design stage, with the same other stages, appears on 17 published location pages (Atlanta, LA, Austin, Miami, Denver, Boston, NY, Philadelphia, Phoenix, San Diego, Seattle, Columbus, DC, Chicago, St. Louis, Houston, SF). Under the one-answer rule I am not asking for a Dallas-only change, which would create a third version. Suggested site-wide fix for the owner: set the design stage to "10–15 days" on all location pages, which gives 23–40 working days and stays inside 4–8 weeks.

## 5. Fixes required (exact replacements)

**F1, table row "Team size and skills", column "Remote-first agency (us)".**
Replace `2–4 designers on a sprint: researchers, UX and UI designers together`
with: `2–4 designers on a sprint; the designers who run your research stay through design and testing`
(Taken from about.md: "The designers who run your research stay through design, testing and handoff." home.ts names no researcher role.)

**F2, "Eastern-based team" (table row "Time zone" and `abstract`).** The site states only an HQ in Reston and remote-first work. home.ts's compare table says we fail when "You need US-only teams", so the claim that the team itself is Eastern-based is not supported. Make it a claim about the schedule, as the published Austin page does ("Eastern Time base", "Our Eastern Time schedule").
- Table cell: replace `Eastern-based team, 7–8 hours of overlap with Central Time` with `Eastern Time schedule from Reston HQ, 7–8 hours of overlap with Central Time`
- Abstract last sentence: replace `and our Eastern-based team keeps 7–8 hours of daily overlap with Central Time.` with `and we work an Eastern Time schedule from Reston with 7–8 hours of daily overlap with Central Time.`
- Owner: please confirm that the designers keep Eastern Time working hours. The "overlap" figures on every location page depend on it.

**F3, industry list item 5.**
Replace `B2B software and HR technology, for example payroll and workforce dashboards.`
with: `B2B software and IT services, for example workforce and reporting dashboards.`
(Dallas Fed names an "IT manufacturing and services" cluster. No source supports HR tech as a DFW strength. The count of five sectors in the answer still holds.)

**F4, pricing H2 answer, second sentence.**
Replace `Four variables set the final number: the flows in scope, the platforms, the research depth and whether a component library is included.`
with: `The final number depends on the flows in scope, the platforms, the research depth and whether a component library is included.`
(This removes the count, which conflicted with home.ts's 5 cost factors and the ux-audit hub's 4. The items listed are all in home.ts's factors.)

**F5, last FAQ answer ("How soon can a Dallas UX/UI project start?").**
Replace the whole answer with:
`<p>A Dallas UX/UI project with us starts 1–2 weeks after proposal approval. A research and design sprint ends with research findings, Figma files, an interactive prototype tested with real users, and annotated specs and components for your engineers; a UX audit ends with a prioritized fix roadmap.</p>`
(Sources: home.ts Engagement 02 "interactive prototypes tested with real users"; about.md "annotated Figma files, components and specs"; ux-audit hub "ends with a prioritized fix roadmap".)

**F6, "Experience audit." item body.**
Replace `A heuristic usability review plus a Web Content Accessibility Guidelines (WCAG) check at WCAG 2.2, with analytics showing where plan upgrades or loan applications stall, ranked by business impact.`
with: `A heuristic usability review plus a Web Content Accessibility Guidelines (WCAG) 2.2 level AA check, with analytics showing where plan upgrades or loan applications stall, ranked by impact and effort.`
(ux-audit hub: "WCAG 2.2 level AA"; "ranked by impact and effort". "WCAG 2.2" stays a whole phrase. Check that the entity "WCAG 2.2" still matches in the on-page script.)

Everything not listed above is TRUE. The fixes change no SVG text. `visual.scenes` labels are generic and need no change.

VERDICT: FAIL. Apply F1 to F6, then the page can publish. N1 goes to the owner as a site-wide conflict and does not block this page.
