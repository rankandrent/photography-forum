# Fact-check: content/industries/edtech.json (industry page, 2026-10-19)

Checked against: RULES.md (honesty), learnings/fact-checker.md, content/briefs/edtech.json, content/case-studies/elia-wellness.md, content/home.ts, content/pages/about.md, content/services/{digital-product-design-services, usability-testing-services, ux-audit-services, web-app-design-services, mobile-app-ui-ux-design-services, ui-ux-web-design, interaction-design-agency}.json, content/industries/{gaming,saas}.json. edtech.json was NOT edited (QA edits in parallel); every fix is an exact replacement below.

## 1. Elia Wellness and honesty

| # | Claim (field) | Verdict | Source |
|---|---|---|---|
| 1 | Stat "40% growth in user registrations for Elia Wellness" | TRUE | elia-wellness.md `result`, results table |
| 2 | Elia answer: "a wellness LMS … from idea to product … platform reports 40% growth in user registrations" | TRUE | elia-wellness.md Overview ("learning management system (LMS)"), Scope ("idea to product"), Results |
| 3 | "a wellness initiative by the Sydney Adventist Church … learning platform for older adults based on its book *Live More*" | TRUE | Overview + The challenge ("older adults", "people over 50") |
| 4 | Scope quote "idea to product, strategy, web app, mobile app and website." | TRUE (verbatim) | Overview, Scope of work |
| 5 | Five experiences: social feed, wellness score across 7 dimensions, block-based courses, badges, progress monitoring | TRUE | Our approach, five H3s |
| 6 | "30+ boost in wellness scores among active users" | TRUE (verbatim, no unit added) | `results`, Results table |
| 7 | Course builder: blocks such as text, images, video and challenges | TRUE | "Deliver engaging courses" |
| 8 | Badges: "lessons unlock bucket-list items such as seeing a sunrise" | TRUE | "Showcase achievements with badges" |
| 9 | Mixed-ages card: "very different comfort levels with technology … large touch targets and simple rating scales" | TRUE | The challenge + The solution (tablet questionnaire). No claim that Elia was tested; the usability-testing link carries no participant count |
| 10 | Learner dashboard: "The next lesson, today's progress and weekly course stats show at a glance, as on the Today's Progress card we designed for Elia." | WRONG (minor) | Case image caption: "Today's Progress card at 50% and weekly course stats bar chart". The card does not show the next lesson, and the weekly stats are a separate chart, but "as on the … card" puts all three on it. **F2** |
| 11 | Onboarding: "a pre-course questionnaire that sets each learner's starting point, like the personal growth questionnaire Elia learners fill in on a tablet" | WRONG (minor) | The Solution: the questionnaire is on mobile ("On mobile, learners move between … a personal growth questionnaire") and "works on tablets too". The case never says it sets a starting point or baseline. **F3** |
| 12 | Intro: "Edtech teams bring us the screens learners and course authors use every week…" | WRONG | Present-tense client verb (lesson 2026-10-18): implies several edtech clients, but the only one is Elia (the FAQ itself says "our one published edtech project"). **F1** |
| 13 | FAQ LMS: "a wellness LMS for adults 50+ … our one published edtech project … 40% growth" | TRUE | case study title/metaTitle "adults 50+" |
| 14 | FAQ children: "we do not claim children's products as past work" | TRUE (honest) | — |
| 15 | FAQ website: "Elia's scope covered its website as well as the web app and mobile app" | TRUE | Scope |
| 16 | No other edtech, school or university client, count, COPPA/FERPA/SCORM/LTI/xAPI/curriculum work claimed | TRUE | grep of page: none. SCORM FAQ answers "No"; table says "we do not write curriculum"; standards answer says "legal compliance and certification stay with the product owner" |
| 17 | No Elia testimonial quoted | TRUE | — |
| 18 | Case-study rail: elia-wellness.md now has `industries: [edtech]` | TRUE (brief conflict resolved) | elia-wellness.md L9 |
| 19 | Table "Our senior design team, as on Elia Wellness" | TRUE | — |
| 20 | Card "our SaaS UI UX design work" | TRUE | industries/saas.json exists; Vocable, Digno, TradeZella carry `industries: [saas]` |

## 2. Prices, timelines, team sizes, steps, participants, deliverables

| # | Claim | Verdict | Source |
|---|---|---|---|
| 21 | Full engagement $60,000–$180,000, 8–16 weeks, 3–6 designers | TRUE | home.ts L202; hub priceRange/abstract |
| 22 | Sprint $25,000–$60,000, 4–8 weeks, 2–4 designers | TRUE | home.ts L201 |
| 23 | UX audit $5,000–$15,000, 2–3 weeks; no audit team size stated | TRUE | home.ts L200; ux-audit hub abstract |
| 24 | "200+ products designed since 2017" | TRUE | RULES.md confirmed facts |
| 25 | "8–16 weeks (40–80 working days) and 5 steps" | TRUE | hub steps answer. Sum check: 5–10 + 5–15 + 5–10 + 10–20 + 15–25 = 40–80 days = stated total |
| 26 | Step names and day ranges (all 5) | TRUE (exact) | hub L73–L91 |
| 27 | Step 1 "Stakeholder workshops … success metrics" | TRUE | hub step 1 |
| 28 | Step 2 "Researchers interview 5–8 learners per user group, and course authors" | WRONG | Hub: "5–8 users per user group". The page lists learners, course authors and administrators as the user groups, so "5–8 learners per user group" is incoherent and drops the per-group count for authors. **F4** |
| 29 | Step 4 / table "5 learners per round … on Maze … ends with a usability score" | TRUE | hub step 4 ("5 users per round … Maze … SUS score"). No usability-testing link in either sentence, and the usability-testing link (mixed-ages card) has no count, so the hub's 5 and the usability-testing hub's 5–8 are never put in conflict |
| 30 | Step 5 "hand annotated Figma files, design tokens and component specs … at WCAG 2.2 level AA" | TRUE | hub handoff package L63 + step 5 |
| 31 | Step 5 "The developer handoff is where our design work ends and your build begins." | WRONG | Hub step 5: designers "hand the Figma files to engineering and stay with the engineers through launch"; home.ts L210 "stay through engineering and launch. No handoff". **F5** |
| 32 | Screens answer "every screen state: default, loading, empty, error and completed" | TRUE | hub handoff "states"; interaction-design-agency lists loading/empty/error; same pattern published on gaming.json L54 |
| 33 | Price factors "target platforms (web app, iOS, Android and website), user groups, core user flows such as onboarding, and validation rounds" | WRONG | Hub has exactly 4 factors (platforms, user groups, core flows, validation rounds), and its examples are web and mobile. The website is a separate engagement: ui-ux-web-design hub L120 "run the 2 projects as separate engagements", $25,000–$60,000. "website" as a platform priced inside $60k–$180k repeats gaming F4 ("website scope"). Comes from the brief attribute (stale brief record). **F6** |
| 34 | "edtech design services for one surface, for example the course player, run as a sprint" | TRUE | no new count (gaming F3 respected) |
| 35 | FAQ live platform: audit "against usability heuristics and analytics, with a WCAG 2.2 level AA check. Its prioritized fix roadmap then scopes a design sprint." | TRUE | ux-audit hub abstract, L55, L190; same wording published on gaming.json L210 |
| 36 | Mobile touch targets 44×44 pt iOS / 48×48 dp Android | TRUE | mobile-app hub L59 |
| 37 | Course builder as "a logged-in tool our web app design services cover" | TRUE | web-app hub abstract ("admin consoles") |
| 38 | Website FAQ via UI UX web design practice | TRUE | ui-ux-web-design hub |
| 39 | SCORM FAQ "No. … your engineers write the code" | TRUE | hub FAQ "Do digital product designers write code? No." |
| 40 | Meta "Book a free consultation" | TRUE | about.md L30 |
| 41 | No "first designs in 1–2 weeks", no "sliced UI assets" | TRUE | grep: absent |

## 3. Standards

Count: the standards answer says "Five", and the list names 5 distinct standards (WCAG 2.2, ADA Title II, Section 508, COPPA, FERPA). WCAG 2.1 and 2.0 appear only as the versions the ADA and 508 rules adopt. TRUE.

| # | Claim | Verdict | Source |
|---|---|---|---|
| 42 | WCAG 2.2 level AA asks for keyboard access, visible focus and "4.5:1 contrast for normal-size text" | TRUE | https://www.w3.org/TR/WCAG22/ (W3C Rec. 12 Dec 2024): 2.1.1 Keyboard (A, included in AA), 2.4.7 Focus Visible (AA), 1.4.3 Contrast (Minimum) (AA) 4.5:1, large text 3:1. The contrast qualifier is present. Link loads |
| 43 | ADA Title II: DOJ rule requires state and local governments, including public schools and universities, to make web content and mobile apps meet WCAG 2.1 level AA | TRUE | https://www.ada.gov/resources/2024-03-08-web-rule/ lists public schools, community colleges and public universities; WCAG 2.1 AA; web content and mobile apps. No dates on the page (fine). Note: ada.gov confirms the IFR of April 20, 2026 (April 26, 2027 for 50,000+, April 26, 2028 for smaller entities and special districts), so the dates could be added with this link if wanted |
| 44 | Section 508: federal agencies must buy accessible ICT; Revised 508 Standards incorporate WCAG 2.0 level AA | TRUE | https://www.access-board.gov/ict/ ("ICT developed, procured, maintained, or used by federal agencies"; E205.4 "Level A and Level AA … WCAG 2.0", incorporated by reference). "buy" = procure, a subset |
| 45 | COPPA: operators of services directed to children under 13 must get verifiable parental consent before collecting personal information | TRUE | Linked https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa (scope: "directed to children under 13"); consent wording from 16 CFR 312.5(a)(1) "obtain verifiable parental consent before any collection, use, or disclosure" (eCFR via r.jina.ai; ecfr.gov and federalregister.gov redirected to unblock.federalregister.gov). The FTC page gives no dates, and the page states none (fine) |
| 46 | Card: "products for children need parental consent before sign-up" | WRONG (minor) | 312.5(a)(1) ties consent to collection of the child's personal information, not to sign-up as such, and limits it to under-13s. **F7** |
| 47 | FERPA protects student education records at schools that receive US Department of Education funds | TRUE | https://studentprivacy.ed.gov/ferpa (34 CFR 99.1(a): institutions receiving funds "under any program administered by the Secretary"; 99.3 education records). Link loads |
| 48 | "Sharable Content Object Reference Model (SCORM)" | TRUE | ADL Initiative https://www.adlnet.gov/research/scorm (search snippet; adlnet.gov past-projects page returned 503). "Sharable" spelling correct |

## 4. Links

All external links load and support their sentences (rows 42–47). Internal targets exist: /services/{digital-product-design-services, web-app-design-services, mobile-app-ui-ux-design-services, ux-audit-services, usability-testing-services, ui-ux-web-design}/, /industries/saas/, /blog/is-discovery-phase-worth-it/, /case-studies/elia-wellness/, /work/elia-wellness/cover.webp. Image alt and caption match the case study word for word.

## Fixes (exact replacements)

**F1** `intro` (L12). Replace with:
"We design the screens learners and course authors use every week: the dashboard, course player, course builder and mobile app, tested with learners before engineering starts."

**F2** sections[1].items[0].body (Learner dashboard, L57). Replace with:
"The next lesson, today's progress and weekly course stats show at a glance, as on the Today's Progress card and weekly course stats chart we designed for Elia."
(The next lesson then sits in the general list only; if QA prefers, drop "The next lesson," instead.)

**F3** sections[1].items[4].body (Learner onboarding, L73). Replace with:
"Sign-up, the first lesson and a pre-course questionnaire, like the personal growth questionnaire Elia learners fill in on a phone or a tablet."

**F4** sections[4].items[1].body (User research, L121). Replace with:
"Researchers interview 5–8 users per user group, such as learners and course authors, to find where onboarding, lessons and progress tracking lose learners. These learner interviews shape every later flow."

**F5** sections[4].items[4].body (UI design and handoff, L133). Replace with:
"Designers finish every screen state and hand annotated Figma files, design tokens and component specs to your engineers, at WCAG 2.2 level AA. After the developer handoff, the designers stay with your engineers through launch."

**F6** sections[6].body, second sentence (cost, L184). Replace with:
"Price follows 4 factors: target platforms (web app, iOS and Android), user groups, core user flows such as onboarding, and validation rounds."

**F7** sections[2].items[3].body (Accessibility and privacy card, L100). Replace with:
"Public schools and universities buy learning platforms against Web Content Accessibility Guidelines (WCAG) accessibility rules, and products for children under 13 need parental consent before they collect a child's personal information. The standards list further down names each rule and the screen it changes."

## Stale brief records (for the orchestrator)

- Brief attribute "target platforms (web app, iOS, Android and website)" contradicts gaming F4 and the ui-ux-web-design hub's separate engagement; it caused F6. The attribute check only needs the label "target platforms".
- Brief externalSources note says the FTC COPPA page carries the 2025 amendment dates; it does not (only the Federal Register notice does, and federalregister.gov currently redirects to unblock.federalregister.gov).
- Brief asked to confirm the ADA IFR dates: ada.gov does confirm them (row 43). The page dropped them, which is also fine.
- Brief/outline step-2 wording "interview 5–8 learners per user group" caused F4.

VERDICT: FAIL
