# Fact-check: ux-design-agency-denver (location page)

- File checked: `content/locations/ux-design-agency-denver.json` (`draft: true`, updated 2026-10-18)
- Checked against: `docs/content-system/RULES.md`; brief `content/briefs/ux-design-agency-denver.json` (siteFacts, factCheckList); `content/home.ts`; `content/pages/about.md`; `content/services/ux-audit-services.json`, `usability-testing-services.json`, `ux-research-services.json`; published location pages (Dallas, Atlanta, Austin, LA, Seattle); my Dallas report `docs/content-system/fact-checks/ux-design-agency-dallas.md`
- Date: 2026-10-18. The location file was **not edited** (role rule). Every fix below is an exact replacement for the orchestrator to apply.

## 1. Honesty screen

| Check | Result |
|---|---|
| Denver/Colorado office or local team | PASS. Body: "headquartered in Reston, Virginia, with no Colorado office"; FAQ 1: "No. … no Denver or Colorado office"; abstract: "with no Colorado office". No "Eastern-based team" or "Reston headquarters team" wording (Dallas F2 is applied). |
| Denver/Colorado clients implied | **FAIL (F1, F2, F3).** The abstract says Front Range companies "work with us", FAQ 2 says "The UX design Denver teams buy from us", and the hero says our team "runs … for … energy operators from Denver to Boulder". All three present Colorado companies as current clients. |
| How often Denver teams hire or ask us | **FAIL (F7).** The FAQ intro "what Front Range product leaders ask before they buy" presents inquiry knowledge we have no data for. The draft's earlier "account for most of the product work we are asked about" and "typically hand off" lines are already gone (brief HONESTY fixes applied). The Boulder FAQ says "can start with", which is correct. |
| Apex HCM, Fortna, ToolsGroup | PASS. Not mentioned. |
| Invented stats, testimonials, awards, ratings, certifications, rankings | PASS. The page has no statistics and no quotes. "Top Denver UX design companies" appears only as the buyer's phrase, and no rank is claimed. |
| Team roles | PASS. No "researchers" role. Table and Boulder FAQ use about.md's "the designers who run your research stay through design and testing" (Dallas F1 is applied). |
| Capability claims (aerospace consoles, field and outdoor use) | PASS with a note. These are framed as capability ("Can you…? Yes"), and the published LA page already offers aerospace "mission planning" tools. One body sentence reads like a track record, see F8. No case study is cited. |

## 2. Site facts (one intent = one answer)

| # | Claim on page | Site source | Verdict |
|---|---|---|---|
| S1 | Remote-first, HQ Reston, Virginia | about.md "headquartered at … Reston, Virginia, and we work remote-first" | TRUE |
| S2 | Audit $5,000–$15,000, 2–3 weeks (pricing, table, abstract, meta "from $5,000") | home.ts Engagement 01; ux-audit hub | TRUE |
| S3 | Sprint $25,000–$60,000, 4–8 weeks, 2–4 designers (process answer, table, pricing, Boulder FAQ) | home.ts Engagement 02 "4–8 weeks · 2–4 designers". No audit headcount is stated (correct per the brief's open conflict). | TRUE |
| S4 | Full redesign with design system $60,000–$180,000, 8–16 weeks | home.ts Engagement 03 | TRUE |
| S5 | Embedded team $15,000–$40,000 per month | home.ts Engagement 04 | TRUE |
| S6 | "The final number depends on the number of journeys, the platforms involved, the depth of user research and whether a design system is part of the work." | home.ts cost-factor FAQ (scope, research depth, platforms, design system maturity). No count is stated (Dallas F4 is applied). | TRUE |
| S7 | "every project begins with a free consultation and a fixed-scope proposal" | about.md, word for word | TRUE |
| S8 | Start "1–2 weeks after proposal approval" (table, last FAQ) | Same as the published Dallas FAQ; home.ts "Time to first design 1–2 weeks" | TRUE |
| S9 | UX audit item: heuristic review, "WCAG 2.2 level AA", analytics, "ranked by impact and effort", "prioritized fix roadmap" | ux-audit hub deliverables and abstract (Dallas F6 is applied) | TRUE |
| S10 | Usability testing: "5–8 participants per round for each user group" | usability hub: "5–8 participants per round … match real user groups"; "5–8 participants per user group" | TRUE |
| S11 | Usability testing: "repeated until critical issues are gone" | usability hub: a fixed "2–3 test rounds with design fixes between rounds", priced by "the number of test rounds". An open-ended "until" promise conflicts with a fixed-scope price, and no other page says it (grep: Denver only). | **WRONG → F4** |
| S12 | User research: no participant count | ux-research hub 10–15 per group vs Atlanta 5–12. Leaving the count out is the brief's fix. | TRUE |
| S13 | Card sorts and tree tests before screen design | ux-research hub deliverable "Card sort and tree test"; home.ts sprint includes "information architecture" | TRUE |
| S14 | Mobile app design for iOS and Android | about.md platforms; mobile-app hub exists | TRUE |
| S15 | Process: 4–8 weeks, 5 stages, 2–4 designers, reviews inside Mountain Time hours, "sharing progress twice a week" | home.ts Engagement 02; Atlanta "reviews twice a week"; Dallas "demos inside Central Time business hours" | TRUE as wording. Stage sum, see N1. |
| S16 | Stage 5: "annotated specs, **tokens** and components move to your engineers" | The sprint's deliverables (home.ts Engagement 02; this page's own last FAQ: "annotated specs and components") do not include tokens. Tokens belong to the design-system engagement (Engagement 03). Dallas and Atlanta stage 5 also have no tokens. | **WRONG (adds a deliverable) → F5** |
| S17 | Last FAQ: starts "beginning with a framing call and a user research plan" | This is true for a sprint (stage 1 framing call). The FAQ covers every "Denver UX project", including the audit, whose step 1 is a kick-off on "user flows, user groups and metrics in scope" (ux-audit hub) with no user research plan. The second sentence of the same answer separates sprint and audit, so the first sentence must hold for both. | **WRONG (overgeneralised) → F6** |
| S18 | Sprint ends with research findings, Figma files, an interactive prototype tested with real users, annotated specs and components; audit ends with a prioritized fix roadmap | home.ts Engagement 02; about.md; ux-audit hub (same as Dallas F5) | TRUE |
| S19 | On-site workshops on the Front Range "for larger engagements" / "we travel to the Front Range" | The same offer appears on every published location page (Dallas, Austin "we travel to Austin", Atlanta). Not on about.md or the hubs. | TRUE (consistent with site). Owner note repeated from Dallas: this offer exists only on location pages. |
| S20 | Time zone: "Eastern Time schedule from Reston HQ, 6–7 hours of overlap with Mountain Time" | Dallas F2 wording; arithmetic in E7 | TRUE. Owner confirmation of ET working hours is still open from Dallas F2. |
| S21 | `priceRange` "$5,000–$60,000" | Same as published location pages | TRUE |
| S22 | Counts: "five sectors" (5 items), "6 types of UX work" (6), "four practical gains" (4 cards), "5 stages" (5), "six answers" (6 FAQs) | Counted in the file | TRUE |
| S23 | Benefit cards (trial conversion, fewer operator errors, online sales and fewer returns, shorter onboarding) | Generic claims with no figures | TRUE (no numbers to check) |
| S24 | Internal links: /, /industries/saas/, /industries/ecommerce/, /industries/healthcare/, /services/data-visualization-agency/, mobile-app-ui-ux-design-services, ecommerce-ux-design-services, ux-audit-services, usability-testing-services, ux-research-services | All 9 JSON files exist; home = content/home.ts | TRUE |

The page has no external links.

## 3. External facts

| # | Claim | Verdict | Source |
|---|---|---|---|
| E1 | SaaS and B2B software in Denver and Boulder | TRUE. Metro Denver EDC 2023 IT-Software study: employment concentration rank 5th; Denver County 33.8% and Boulder County 19.3% of the cluster's employment (2022); 89,440 direct jobs. | https://www.metrodenver.org/wp-content/uploads/2026/06/202320IT20_20Software20Industry20Cluster20Study.pdf (read via r.jina.ai) |
| E2 | Denver Tech Center is a business district in the south metro, with software employers | TRUE. Greenwood Village: "Home to part of the Denver Tech Center…", "well-positioned in the south metro region". The EDC IT-Software study notes Zoom "reopened its Denver Tech Center offices". | https://greenwoodvillage.com/index.aspx?NID=1561 ; EDC IT-Software study above |
| E3 | Aerospace and space well represented | TRUE. EDC 2023 Aerospace study: Colorado "ranks first in the United States for our high concentration of private aerospace jobs"; "second-largest space economy in the United States, behind California"; 36,870 employees at nearly 350 companies (2022 data). The page states no ranking and names no company. | https://www.metrodenver.org/wp-content/uploads/2026/06/202320Aerospace20Industry20Cluster20Study.pdf (read via r.jina.ai) |
| E4 | Outdoor brands and consumer gear companies well represented along the Front Range | TRUE on the headquarters basis. VF Corporation (The North Face, JanSport, Smartwool) lists its principal executive offices at 1551 Wewatta Street, Denver (FY2026 annual report, fiscal year ended March 28, 2026). Colorado OEDIT names Boa and Icelantic Skis (Denver) and Yeti Cycles (Golden) as major outdoor employers. The page does not mention the Outdoor Retailer show. | https://www.sec.gov/Archives/edgar/data/0000103379/000119312526270631/d49994dars.pdf ; https://choosecolorado.com/key-industries/outdoor-recreation |
| E5 | Energy and utilities, including oil and gas and renewables | TRUE. Metro Denver EDC: "The Colorado Front Range is a national leader in both natural and renewable resources"; Colorado ranks "4th in oil production, 8th in natural gas production, 6th in installed wind capacity"; the cluster is 2.8% of Front Range employment vs 2.1% nationally. The page does not name the Golden lab. If it is ever added, use "National Laboratory of the Rockies" (renamed from NREL, effective 2025-12-01), never "NREL". | https://www.metrodenver.org/work-here/industries/energy-natural-resources ; https://www.energy.gov/eere/articles/energy-department-renames-nrel-national-lab-rockies |
| E6 | Health systems and digital health | TRUE. EDC 2023 Healthcare and Wellness study: "Healthcare & Wellness is the largest cluster in the region with nearly 246,850 workers"; it names HCA-HealthONE, UCHealth, Denver Health and others; digital-health examples include DispatchHealth and Virta Health's Denver HQ. The page names no system. | https://www.metrodenver.org/wp-content/uploads/2026/06/202320Healthcare20and20Wellness20Industry20Cluster20Study.pdf (read via r.jina.ai) |
| E7 | Denver and Colorado are on Mountain Time; 6–7 hours overlap with an Eastern Time schedule | TRUE. 49 CFR 71.7(d) runs the Central/Mountain line "southerly along the Kansas Colorado boundary", so all of Colorado is in the Mountain zone (71.8). ET is 2 hours ahead: a 9–5 ET day is 7 a.m.–3 p.m. MT, so it overlaps a 9–5 MT day for 6 hours, and for 7 if ET work runs to 6 p.m. | https://www.law.cornell.edu/cfr/text/49/71.7 ; https://www.law.cornell.edu/cfr/text/49/71.8 |
| E8 | Front Range includes Denver and Boulder ("along the Front Range", "Denver to Boulder") | TRUE. The Front Range Passenger Rail District (a state-created district) plans Front Range stops in Fort Collins, Loveland, Longmont, Boulder, Denver, Littleton, Douglas County, Colorado Springs and Pueblo. The Metro Denver EDC also calls its region "the Colorado Front Range". | https://ridethefrontrange.com/media ; https://www.metrodenver.org/work-here/industries/energy-natural-resources |
| E9 | WCAG 2.2 level AA | TRUE. W3C Recommendation, 12 December 2024; defines levels A, AA and AAA. | https://www.w3.org/TR/WCAG22/ |

## 4. Notes (not blocking)

- **N1, stage arithmetic, site-wide (repeat of Dallas N1).** The stages add up to 1–2 + 5–10 + 2–3 + 10–20 + 5–10 = 23–45 working days against "4–8 weeks" (20–40). Do not change Denver alone. The owner decides site-wide (suggested: design stage "10–15 days" on all location pages).
- **N2, stale records for the orchestrator.** (a) The brief's factCheckList URLs `metrodenver.org/sites/default/files/data_central/2023%20…Cluster%20Study.pdf` now redirect to the Data & Reports listing. The current files are under `metrodenver.org/wp-content/uploads/2026/06/…` (E1, E3, E6). The 2023 Energy PDF did not render, so E5 relies on the EDC energy industry page. (b) My Dallas report listed Denver and Miami as "published", and S10 cited Atlanta for "after proposal approval". In fact Denver, Miami, Houston and San Diego are `draft: true`, and only Dallas carries "after proposal approval".
- **N3, open owner item.** Please confirm the Eastern Time working hours (Dallas F2). The 6–7 hour figure depends on them.

## 5. Fixes required (exact replacements)

**F1, `abstract`, second sentence (implied Colorado clients).**
Replace `SaaS, aerospace, outdoor, health and energy companies along Colorado's Front Range work with us for user research, interface design, prototyping and usability testing.`
with: `SaaS, aerospace, outdoor, health and energy companies along Colorado's Front Range can hire us for user research, interface design, prototyping and usability testing.`

**F2, FAQ "Do UX/UI services in Denver need a local office?", last sentence (implied Denver clients).**
Replace `The UX design Denver teams buy from us is research-led:`
with: `The UX design Denver teams can buy from us is research-led:`
(The rest of the sentence stays.)

**F3, `hero.sub` (present-tense service to named local sectors reads as current clients).**
Replace `our remote-first team, headquartered in Reston, Virginia, runs user research, interface design and usability testing for software-as-a-service (SaaS) companies, aerospace programs, outdoor brands selling gear online, health systems and energy operators from Denver to Boulder, Colorado.`
with: `our remote-first team, headquartered in Reston, Virginia, offers user research, interface design and usability testing to software-as-a-service (SaaS) companies, aerospace programs, outdoor brands selling gear online, health systems and energy operators from Denver to Boulder, Colorado.`
(The literal "UX agency Denver" still opens the sub.)

**F4, hand-off item "Usability testing." body.**
Replace `Moderated remote sessions with 5–8 participants per round for each user group, repeated until critical issues are gone.`
with: `Moderated remote sessions with 5–8 participants per round for each user group, with design fixes between rounds.`
(Usability hub abstract: "runs 2–3 test rounds with design fixes between rounds".)

**F5, stage "Prove and ship (5–10 days)" body.**
Replace `and annotated specs, tokens and components move to your engineers.`
with: `and annotated specs and components move to your engineers.`
(This matches the page's own last FAQ and home.ts Engagement 02. Tokens belong to the design-system engagement.)

**F6, last FAQ ("How soon can a Denver UX project start?"), first sentence.**
Replace `A Denver UX project with us starts 1–2 weeks after proposal approval, beginning with a framing call and a user research plan.`
with: `A Denver UX project with us starts 1–2 weeks after proposal approval, beginning with a kick-off call on the users, flows and success metrics in scope.`
(This holds for both the sprint's framing call and the ux-audit hub's kick-off: "user flows, user groups and metrics in scope".)

**F7, FAQ section `answer` (implied inquiry knowledge).**
Replace `<strong>These six answers cover what Front Range product leaders ask before they buy Denver UI/UX design services from a remote-first UX/UI design company.</strong>`
with: `<strong>These six answers cover common questions Front Range product leaders can put to a remote-first UX/UI design company before they buy Denver UI/UX design services.</strong>`
(This keeps the synonym, "remote-first", "Front Range" and the secondary phrase.)

**F8, first section body, last sentence (reads as a track record).**
Replace `One team covers a SaaS trial-to-paid funnel, a mission-planning console and a utility dashboard for field crews.`
with: `One team can cover a SaaS trial-to-paid funnel, a mission-planning console and a utility dashboard for field crews.`

Everything not listed above is TRUE. The fixes change no SVG text, and the `visual.scenes` labels are generic. After F1 to F8, the keyword carriers ("UX agency Denver" in hero, body, pricing and FAQ 2) are unchanged.

VERDICT: FAIL. Apply F1 to F8, then the page can publish. N1 and N3 go to the owner and do not block this page.
