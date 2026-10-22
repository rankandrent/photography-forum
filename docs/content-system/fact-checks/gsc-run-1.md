# Fact-check: Search Console run 1 edits (2026-10-22)

Scope: the ServiceGrid intros in app/location/[slug]/page.tsx and app/industries/[slug]/page.tsx; content/services/ux-research-services.json (new consulting FAQ and St. Louis sentence); content/industries/supply-chain.json (transportation FAQ and FMCSA); content/locations/ux-design-agency-san-francisco.json; content/locations/ux-design-agency-phoenix.json; content/blog/choose-ux-research-agency.md (new "When to hire a UX research agency" section).

Method note: this agent had no shell, so it could not run `git diff HEAD~1` or `git diff`. The files listed above were read in full in their current state, and the claims named in the task were checked. No files were edited because QA is editing in parallel.

Locked titles: the metaTitle of all six content files still matches docs/content-system/locked-pages.json. PASS.

## Claims

| # | Claim (file) | Verdict | Source |
|---|---|---|---|
| 1 | Location intro: "user research, UX and UI design, design systems and usability testing" (location page.tsx L83) | TRUE | content/home.ts meta.description uses the same list |
| 2 | Location intro: "run remotely by senior designers" | WRONG (scope) | Remote-first is TRUE (RULES.md) and "senior designers" is site-wide (ux-consulting metaDescription, Denver, Chicago, Dallas). But 15 location pages offer on-site workshops or sessions (SF L71, LA L84, NY L72, Chicago L84, Phoenix L72, St. Louis L84 and others), so "run remotely" contradicts them. See F1 |
| 3 | Location intro: "{city} teams get the same … services" | Implied-client wording (fact-checker lesson 2026-10-18) | Folded into F1 |
| 4 | Industry intro: "We apply our core UI UX design services to {industry} products: user research, UX and UI design, design systems and usability testing" (industries page.tsx L107) | TRUE | home.ts meta.description. Not a fact issue, but for QA: `lower("Startups")` renders "startups products" |
| 5 | UX research consulting FAQ: our UX consulting gives guidance "in 2–3 weeks for $5,000–$15,000" | TRUE | ux-consulting-services.json abstract, priceRange, FAQ "How long" |
| 6 | Same FAQ: "through a UX maturity assessment, a product and analytics review and a prioritized UX strategy roadmap" | TRUE | ux-consulting-services.json deliverables 2, 3 and 5 (a true subset of the 6) |
| 7 | Same FAQ: the full study is "4–8 weeks and $25,000–$60,000", with participants recruited, interviews and contextual inquiry run, and personas, journey maps and a JTBD opportunity map delivered | TRUE | ux-research-services.json abstract and process steps 2, 3 and 5 |
| 8 | Same FAQ: "commission the study when the plan needs new user evidence" | TRUE | ux-consulting cost body: "teams that need new user evidence add UX research services" |
| 9 | UX research FAQ section answer: "These six answers" | TRUE | There are 6 FAQs |
| 10 | "Zoom and Optimal Workshop" for remote interviews and card sorts | TRUE | https://www.optimalworkshop.com/card-sorting ("Participants can complete the study from anywhere") |
| 11 | "Bioscience and health teams that hire us as a remote-first St. Louis UX design agency get sessions booked around lab and clinic hours" | Fact TRUE, wording is an implied client | St. Louis page FAQ: "schedule them around lab and clinic hours". The "teams that hire us … get" wording is an implied-client pattern (lesson 2026-10-18). See F7 |
| 12 | Supply chain FAQ: we cover TMS software, fleet and yard apps and control-tower views for dispatch teams, with the load-board example | TRUE | supply-chain.json product list (L50–L59) and body L38 |
| 13 | Supply chain FAQ: "each logistics UX prototype is tested by operators on the real devices they use" | TRUE | supply-chain.json process step 4 |
| 14 | Supply chain FAQ: driver apps "block handheld interaction while the vehicle moves, as FMCSA rules require" | WRONG | 49 CFR 392.80 and 392.82 (https://www.law.cornell.edu/cfr/text/49/392.80, https://www.law.cornell.edu/cfr/text/49/392.82) bar *drivers* from texting and from using a hand-held mobile telephone while driving, and bar *motor carriers* from allowing or requiring it. They set no requirement for app design. "Driving" includes temporary stops for traffic, a traffic control device or other momentary delays, so "while the vehicle moves" is too narrow. The texting definition (https://www.law.cornell.edu/cfr/text/49/390.5) excludes fleet management and dispatching devices used for a purpose not otherwise prohibited. See F4 |
| 15 | Supply chain standards list L173: "driver apps block texting and handheld interaction while the vehicle moves" | WRONG (same scope error; the FAQ must match it) | Same sources as #14. See F5 |
| 16 | Supply chain FAQ section answer: "These six answers" with the listed topics | TRUE | 6 FAQs, topics match |
| 17 | SF H1: "UX design agency San Francisco and Silicon Valley product teams hire" | WRONG (implied client) | A present-tense "hire" with a local group as subject is an implied-client claim (RULES.md honesty; lesson 2026-10-18). The FAQ on the same page correctly says "can hire". See F2 |
| 18 | SF FAQ: "without a Bay Area office", "Do you have an office … No", HQ in Reston | TRUE | RULES.md; no office claim present |
| 19 | SF FAQ: "anything from a pre-seed MVP to a Series B redesign" | WRONG | industries/startups.json maps pre-seed to validation and seed to the MVP ("validation at pre-seed, a minimum viable product (MVP) at seed … design debt cleanup at Series B"). The SF page's own industry list says "seed and Series A teams preparing an MVP". See F3 |
| 20 | SF FAQ: "Engagements start with a $5,000–$15,000 UX audit over 2–3 weeks" | WRONG | The same page says "Every engagement starts with a free consultation and a fixed-scope proposal" (L158), and the sprint is sold without an audit. The page abstract's floor wording ("Engagements start at $5,000 for a 2–3 week UX audit") is correct. See F3 |
| 21 | SF FAQ: the sprint is "4–8 week … $25,000–$60,000"; the audit is $5,000–$15,000 over 2–3 weeks | TRUE | home.ts pricing; ux-audit hub |
| 22 | SF FAQ: Southern California teams get "the same Pacific Time overlap" from the LA page, "for streaming, e-commerce and game products" | TRUE | LA page FAQ: "We overlap 5–6 hours a day with Pacific Time", and its industry list covers streaming, e-commerce/DTC and gaming. The SF page also says 5–6 hours. Optional for QA: the sentence reads awkwardly ("the UX design agency Los Angeles studios and brands can hire") |
| 23 | Phoenix: Arizona stays on MST all year; 2 h behind ET in winter, 3 h in summer; 5–6 shared hours | TRUE | https://www.timeanddate.com/time/us/arizona-no-dst.html; https://en.wikipedia.org/wiki/Time_in_Arizona (the Navajo Nation exception does not apply to Phoenix). Arithmetic: 9–5 days give 6 h overlap in winter and 5 h in summer |
| 24 | Phoenix: "a semiconductor hub around Chandler" | TRUE | https://www.chandleraz.gov/news-center/intel-breaks-ground-two-new-semiconductor-factories (Intel Ocotillo campus, Chandler) |
| 25 | Phoenix: no Phoenix office; on-site observation or workshops when needed | TRUE | Honest; consistent with the other location pages |
| 26 | Phoenix metaDescription: "UX design agency Phoenix teams hire for semiconductor, payments, health and logistics" | WRONG (implied client) | Same pattern as #17. It may predate this run; fix it while the page is open. See F6 |
| 27 | Blog section: the 5 "moments" | TRUE | Each one matches a situation in the ux-research hub list ("When should a product team invest…"), in the same order and with the same conditions |
| 28 | Blog: "analytics show the usage but not the reason, which only sessions with users explain" | WRONG ("only" claim) | Counterexample: in-product surveys and feedback widgets also collect the reason, and the site lists Hotjar for this (home.ts tools: "Behavior analytics, session recording"). See F8 |
| 29 | Blog: "a card sort or tree test has to come first" for an untested IA | TRUE (advice) | The hub lists card sort and tree test as the IA method |
| 30 | Blog: in-house fallback ("a small evaluative round in-house is often enough") | TRUE (advice) | Honest; no claim about us. Lesson 2026-10-05 rubric check: the "independence" criterion does not mark us down when we are hired for research |

## Fixes (exact current → replacement)

**F1. app/location/[slug]/page.tsx L83 (rendered on every location page)**
Current: `{l.city} teams get the same <Link href={routes.home}>UI UX design services</Link> we offer across the US: user research, UX and UI design, design systems and usability testing, run remotely by senior designers.`
Replacement: `{l.city} teams can get the same <Link href={routes.home}>UI UX design services</Link> we offer across the US: user research, UX and UI design, design systems and usability testing, run remote-first by senior designers.`

**F2. content/locations/ux-design-agency-san-francisco.json L13 (hero.h1; the H1 may change, the metaTitle is untouched)**
Current: `UX design agency San Francisco and Silicon Valley product teams hire`
Replacement: `UX design agency San Francisco and Silicon Valley product teams can hire`

**F3. content/locations/ux-design-agency-san-francisco.json L183 (FAQ "Do you work with Silicon Valley teams?")**
Current: `<p>Yes. Silicon Valley startups and product teams can hire our remote-first UX design agency for anything from a pre-seed MVP to a Series B redesign, without a Bay Area office. Engagements start with a $5,000–$15,000 UX audit over 2–3 weeks, and a 4–8 week research and design sprint costs $25,000–$60,000.</p>`
Replacement: `<p>Yes. Silicon Valley startups and product teams can hire our remote-first UX design agency for anything from a pre-seed validation prototype to a Series B design debt cleanup, without a Bay Area office. Engagements start at $5,000 for a 2–3 week UX audit, and a 4–8 week research and design sprint costs $25,000–$60,000.</p>`

**F4. content/industries/supply-chain.json L186 (FAQ "Do you design transportation and logistics software?")**
Current: `Driver apps capture proof of delivery and block handheld interaction while the vehicle moves, as FMCSA rules require, and each logistics UX prototype is tested by operators on the real devices they use.`
Replacement: `Driver apps capture proof of delivery and keep typing and handheld phone use out of the driving flow, because FMCSA rules (49 CFR 392.80 and 392.82) bar commercial drivers from texting or using a hand-held mobile phone while driving, including stops in traffic. Each logistics UX prototype is tested by operators on the real devices they use.`

**F5. content/industries/supply-chain.json L173 (standards list; keep it consistent with F4)**
Current: `Federal Motor Carrier Safety Administration (FMCSA) rules (49 CFR 392.80 and 392.82): driver apps block texting and handheld interaction while the vehicle moves.`
Replacement: `Federal Motor Carrier Safety Administration (FMCSA) rules (49 CFR 392.80 and 392.82): drivers may not text or use a hand-held mobile phone while driving, including stops in traffic, so driver apps keep typing and handheld input out of the driving flow.`

**F6. content/locations/ux-design-agency-phoenix.json L10 (metaDescription; not a locked field)**
Current: `UX design agency Phoenix teams hire for semiconductor, payments, health and logistics: research, UI design and testing from $5,000. Book a free consultation.`
Replacement (156 chars): `UX design agency Phoenix teams can hire for semiconductor, payments, health and logistics: research, UI design and testing from $5,000. Book a consultation.`

**F7. content/services/ux-research-services.json L202 (FAQ "Can UX research be done remotely?")**
Current: `Bioscience and health teams that hire us as a remote-first <a href="/location/st-louis-ux-design-agency/">St. Louis UX design agency</a> get sessions booked around lab and clinic hours.`
Replacement: `As a remote-first <a href="/location/st-louis-ux-design-agency/">St. Louis UX design agency</a>, we book sessions for bioscience and health teams around lab and clinic hours.`

**F8. content/blog/choose-ux-research-agency.md L35**
Current: `- **Feature adoption stays low** and analytics show the usage but not the reason, which only sessions with users explain.`
Replacement: `- **Feature adoption stays low** and analytics show the usage but not the reason, which sessions with users can explain.`

## Notes for QA and the orchestrator (not fact failures)

- Industry ServiceGrid intro: `lower(i.title)` renders "startups products". Consider a per-industry noun or "products for {lower(i.title)}".
- Hub conflict check (owner rule 2026-10-14): every price, duration and deliverable in the new consulting FAQ matches both hubs exactly. No third version is published.
- Access route: ecfr.gov redirected to unblock.federalregister.gov, and r.jina.ai returned 401. Cornell LII served the CFR text.

VERDICT: FAIL
