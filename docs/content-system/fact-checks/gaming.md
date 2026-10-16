# Fact-check: content/industries/gaming.json (/industries/gaming/)

Date: 2026-10-16 · Checker: fact-checker · Inputs: RULES.md, learnings/fact-checker.md (owner rules), content/briefs/gaming.json, content/case-studies/nitro.md, content/home.ts, content/services/digital-product-design-services.json (parent hub), mobile-app-ui-ux-design-services.json, usability-testing-services.json, ux-audit-services.json, interaction-design-agency.json.

gaming.json was NOT edited (QA is editing wording in parallel; role rule "do not edit the post"). Every fix below gives the exact replacement text for the orchestrator to apply.

## 1. Nitro League and honesty claims (vs content/case-studies/nitro.md)

| # | Location | Claim | Verdict | Source |
|---|---|---|---|---|
| N1 | stats[0] | "$5M — funding Nitro League secured within 3 months" | TRUE | nitro.md Results: "secured **$5M in funding within 3 months**" |
| N2 | stats[1] | "200+ products designed since 2017" | TRUE | RULES.md confirmed company facts |
| N3 | sections[0] image | alt "Nitro League mobile garage screen showing the Sigma car, top-speed stats and the cars collection"; caption "Garage and cars collection UI" | TRUE | nitro.md line 62 (identical alt; caption "Garage and cars collection UI"); file public/work/nitro/mobile-garage-ui.webp exists |
| N4 | sections[1] items[3] | "the 3D garage we designed, where Nitro players inspect, upgrade and show off their race cars" | TRUE | nitro.md "An immersive 3D garage … players inspect, upgrade and show off their cars" |
| N5 | sections[1] items[5] | roadmap and whitepaper pages lead players and investors into the NFT marketplace | TRUE | nitro.md "Marketing website and NFT marketplace … leads players and investors into the marketplace" |
| N6 | sections[2] card 4 | "Nitro came to us when investors doubted crypto products" | TRUE | nitro.md The challenge |
| N7 | sections[3] answer | "shaped the racing game, 3D garage and NFT marketplace website … the project secured $5M in funding within 3 months" | TRUE | nitro.md Our approach (four experiences) and Results; framed as the project's result, not design alone |
| N8 | sections[3] body | "decentralized play-to-earn racing game built on upgradeable NFTs and the Nitro token, for gamers, NFT collectors and investors" | TRUE | nitro.md Overview ("powered by"; paraphrase acceptable) |
| N9 | sections[3] body | Scope quote "idea to product, conceptualisation, art direction, sketching and modeling, MVP launch plan, game and website design, and post-launch enhancements." | TRUE (verbatim) | nitro.md line 32 |
| N10 | sections[3] body | "Discovery and stakeholder interviews led to user flows and a whitepaper; professional gamers validated the result." | TRUE | nitro.md The solution |
| N11 | sections[5] table, "Who does it" row | "Our senior design team, including art direction for UI and brand, as on Nitro League" | WRONG (expanded) | nitro.md says "art direction" only; brief doesNotSupport: "Repeat those words, never expand them." See F1 |
| N12 | faqs[4] | "Nitro League is a play-to-earn racing game with an NFT marketplace, a 3D garage, and tokenomics and IDO … launch screens; its platform also includes a metaverse where users buy and sell properties, production factories and garages." | WRONG (implied) | The question is "Have you designed…?". The metaverse is in nitro.md's Overview platform list only; "Our approach" lists the four experiences we designed (2D simulation game, 3D garage, cars, website/marketplace) and does not include the metaverse. Listing it in a "Yes, we designed" answer implies design work the case study does not claim. See F2 |
| N13 | faqs[4] | tokenomics and IDO launch screens; "IDO (initial decentralized exchange offering)" | TRUE | nitro.md image caption "Tokenomics and IDO launch design"; expansion correct |
| N14 | whole page | No other gaming client, no count of games/studios, no engine programming, no console certification, no game QA, no token-economics design, no AR/VR build, no testimonial, no award | TRUE | Checked every section, FAQ, bullets, semantic fields. Table explicitly says "we do not sell large-scale asset production"; FAQ 1 says "No" to building in Unity/Unreal |
| N15 | whole page | No mention of Apex HCM, Fortna or ToolsGroup; no local office claim | TRUE | grep of gaming.json |
| N16 | case-study rail | nitro.md frontmatter now has `industries: [gaming]` | TRUE (resolved) | nitro.md line 9; the brief's rail conflict is fixed, rail shows Nitro only |

## 2. Prices, timelines, team sizes, process (vs home.ts and parent hub)

| # | Location | Claim | Verdict | Source |
|---|---|---|---|---|
| P1 | priceRange, abstract, sections[6] answer | Full engagement $60,000–$180,000 over 8–16 weeks | TRUE | home.ts Engagement 03; parent hub abstract |
| P2 | sections[6] body | Full engagement 3–6 designers; sprint 2–4 designers | TRUE | home.ts lines 201–202 |
| P3 | sections[6] answer, faqs[2] | Sprint $25,000–$60,000 over 4–8 weeks | TRUE | home.ts Engagement 02 |
| P4 | sections[6] answer, faqs[2] | Sprint scoped as "1–2 surfaces" | UNVERIFIABLE | No site page defines a sprint by surface count (home.ts: "User research, information architecture, wireframes, and interactive prototypes tested with real users"). New scope number = third version. See F3 |
| P5 | sections[6] body, faqs[1] | Audit $5,000–$15,000 over 2–3 weeks; no audit team size stated | TRUE | home.ts Engagement 01; brief conflict note respected |
| P6 | sections[6] body | "Price follows the number of screens and states, target platforms (iOS, Android and web), playtest rounds and website scope" | WRONG (not the hub's factors) | Parent hub cost answer: 4 factors = platforms, user groups, core user flows, validation rounds. "Screens and states" and "website scope" are not hub factors. See F4 |
| P7 | faqs[1] | audit "reviews the in-game store, FTUE and menu flows against player reviews and analytics. Its prioritized findings then scope a UI sprint." | WRONG (partly) | ux-audit-services.json deliverables: heuristic evaluation, analytics review, session-recording review, accessibility check, report, prioritized fix roadmap. "Player reviews" is not a listed input. See F5 |
| P8 | sections[4] answer | 8–16 weeks (40–80 working days), 5 steps | TRUE | Parent hub step answer; sum of steps 5–10+5–15+5–10+10–20+15–25 = 40–80 days |
| P9 | sections[4] answer | "with the first designs in 1–2 weeks" | WRONG (contradicts own steps) | home.ts compare row "Time to first design 1–2 weeks" exists, but placed in this process answer it contradicts the steps directly below: steps 1–2 alone take 10–25 working days (2–5 weeks) before IA/flows, and UI design starts after day 25. See F6 |
| P10 | sections[4] step titles | Step names and day ranges | TRUE | Parent hub lines 73–89, identical |
| P11 | sections[4] step 1 | "Stakeholder interviews set the core loop, target audiences and success metrics." | TRUE (game example of hub step) | Hub step 1 (workshops, JTBD, success metrics); Nitro used stakeholder interviews |
| P12 | sections[4] step 2 | "Designers interview target players and review competitor games…" | WRONG (added action) | Hub step 2: "Researchers interview 5–8 users per user group". Competitor review is not in the step. See F7 |
| P13 | sections[4] step 4, bullets[3], table | 5 players per round on a clickable Figma prototype | TRUE | Hub step 4 "5 users per round … clickable prototype" |
| P14 | sections[4] step 4 | "…the way our usability testing services run sessions" attached to "Five players per round" | WRONG (count mismatch with linked hub) | usability-testing-services.json step: "5–8 participants per round". See F8 |
| P15 | sections[4] step 5 | WCAG 2.2 level AA on web surfaces | TRUE | Hub step 5 |
| P16 | hero.sub | "One senior team" | TRUE | Parent hub metaDescription "from one senior team" |
| P17 | bullets[4], sections[0] body, step 5, table Outputs, faqs[0], semantic ngram | "sliced UI assets" as a deliverable | UNVERIFIABLE vs site | Appears on no site page; hub handoff package = "Annotated Figma files, design tokens and component specifications". Owner rule: deliverables must match the hub. See F9 (or owner confirms the deliverable and the hub is updated first) |
| P18 | sections[1] answer, faqs[0] | screens drawn/spec'd in every state (default, loading, error, empty, locked, reward) | TRUE (with note) | Hub handoff specs cover "states"; interaction hub lists UI states. The six names are game examples, not a new deliverable |
| P19 | sections[1] items[0] | HUD motion and feedback = core of interaction design agency work | TRUE | interaction-design-agency.json (flows, micro-interactions, states, motion) |
| P20 | sections[2] card 3, faqs[3] | touch targets 44×44 pt iOS, 48×48 dp Android | TRUE | mobile hub line 59; Apple HIG game-controls ("frequently used controls are a minimum size of 44x44 pt"); Android accessibility guide ("at least 48dp x 48dp") |
| P21 | engine claims | Studio's Unity/Unreal developers implement; we do not build | TRUE | Parent hub FAQ "Do digital product designers write code? No." (Known open conflict with home.ts FAQ "We deliver design and development" remains for the owner; this page follows the hub.) |

## 3. External standards and links

| # | Location | Claim / link | Verdict | Source |
|---|---|---|---|---|
| E1 | sections[7] item 1 | https://developer.apple.com/design/human-interface-guidelines/designing-for-games — "Designing for games"; with the Game controls page it covers touch controls and game controller support | TRUE; link loads, title "Designing for games" | Page JSON (developer.apple.com/tutorials/data/design/human-interface-guidelines/designing-for-games.json): "Offer touch-based game controls…", "Every platform except watchOS supports physical game controllers"; game-controls page sections "Touch controls" and "Physical controllers" |
| E2 | sections[7] item 2 | App Store Review Guidelines 3.1.1: loot boxes / randomized virtual items must disclose odds of each item type before purchase | TRUE; link loads | developer.apple.com/app-store/review/guidelines/ 3.1.1: "Apps offering 'loot boxes' or other mechanisms that provide randomized virtual items for purchase must disclose the odds of receiving each type of item to customers prior to purchase." |
| E3 | sections[7] item 3 | Google Play payments policy at answer/9858738: randomized virtual items, odds disclosed in advance of purchase | TRUE; link loads, page title "Payments - Play Console Help" | Policy: "…must clearly disclose the odds of receiving those items in advance of, and in close and timely proximity to, that purchase." |
| E4 | sections[1] items[4] | "every loot box shows its odds before purchase, as Apple and Google Play require" | TRUE | E2, E3 |
| E5 | sections[7] item 4 | https://learn.microsoft.com/en-us/gaming/accessibility/guidelines — Xbox Accessibility Guidelines cover subtitles and control remapping | TRUE; link loads (canonical is /en-us/xbox/accessibility/guidelines, same page; both resolve). No version number used on our page (XAG 3.2, 8 Jun 2023) | XAG 104 "Subtitles (text equivalents for speech) are provided for all spoken content"; XAG 107 "Players should be given the option to remap all of the controls within the game itself" |
| E6 | sections[7] item 4 | https://gameaccessibilityguidelines.com/ covers subtitles and control remapping | TRUE; link loads | Full list: "Provide subtitles for all important speech" (Basic); "Allow controls to be remapped / reconfigured" (Basic) |
| E7 | sections[7] answer | "Five platform and accessibility standards" | WRONG (count) | The list names six: Apple HIG, App Store Review Guidelines, Google Play payments policy, Xbox Accessibility Guidelines, Game Accessibility Guidelines, WCAG 2.2. See F10 |
| E8 | sections[7] item 5 | https://www.w3.org/TR/WCAG22/ — level AA needs keyboard access, visible focus and "4.5:1 text contrast" | TRUE with qualifier missing | W3C Recommendation 12 Dec 2024: 2.1.1 Keyboard (A), 2.4.7 Focus Visible (AA), 1.4.3 Contrast (Minimum) (AA) 4.5:1, but large-scale text needs only 3:1. See F11 |
| E9 | internal links | /services/digital-product-design-services/, /, /services/interaction-design-agency/, /services/ui-ux-web-design/, /services/mobile-app-ui-ux-design-services/, /blog/is-discovery-phase-worth-it/, /case-studies/nitro/, /services/usability-testing-services/, /services/ux-audit-services/, /industries/startups/ | TRUE | All source files exist in content/ |

## Fixes (exact replacement text)

- **F1** (sections[5] rows[5][1]) replace with: `Our senior design team, including art direction, as on Nitro League`
- **F2** (faqs[4].a) replace with: `<p>Yes. For Nitro League, a play-to-earn racing game, we designed the 2D racing game, a 3D garage, the website that leads into the NFT marketplace, and tokenomics and IDO (initial decentralized exchange offering) launch screens. Read the <a href="/case-studies/nitro/">Nitro League case study</a>, or see <a href="/industries/startups/">Startups UI UX design</a> for pre-launch teams.</p>` (drops the metaverse; "metaverse" stays in semantic.entities only if QA keeps entity coverage at 80% or more: 21 of 22 printed still passes, or remove it from entities/mentions.)
- **F3** (sections[6].answer) replace "or $25,000–$60,000 over 4–8 weeks for a UI sprint on 1–2 surfaces." with: `or $25,000–$60,000 over 4–8 weeks for a UI sprint.` (faqs[2].a) replace the first sentence with: `Yes. A UI sprint of $25,000–$60,000 over 4–8 weeks can cover only the HUD and menus, and ends with a prototype playtested with players.`
- **F4** (sections[6].body, 2nd sentence) replace with: `Price follows the number of target platforms (iOS, Android and web), player groups, core flows such as the FTUE and the in-game store, and playtest rounds.`
- **F5** (faqs[1].a) replace with: `<p>Yes. Start with an audit of the live game, $5,000–$15,000 over 2–3 weeks, that reviews the in-game store, FTUE and menu flows against usability heuristics and analytics. Its prioritized fix roadmap then scopes a UI sprint.</p>`
- **F6** (sections[4].answer) replace with: `<strong>Our game UI/UX design process takes a game studio from discovery to engine-ready handoff in 8–16 weeks (40–80 working days) and 5 steps.</strong>`
- **F7** (sections[4] step 2 body) replace with: `Researchers interview 5–8 target players per player group to find where onboarding, menus and purchases lose them.`
- **F8** (sections[4] step 4 body) replace with: `Five players per round complete tasks in a clickable Figma prototype, the prototype playtesting our <a href="/services/usability-testing-services/">usability testing services</a> also run, so friction surfaces before engine work starts.`
- **F9** ("sliced UI assets", owner decision; default fix) replace the phrase in each place:
  - bullets[4]: `Hand annotated Figma files and component specs to Unity engine or Unreal Engine developers`
  - sections[0].body: `As a game UI design agency we deliver annotated Figma screens and component specs; the game studio's Unity engine or Unreal Engine developers build them.`
  - sections[4] step 5 body: `Designers finish the HUD and every screen state, then hand annotated Figma files, design tokens and component specs to the Unity engine or Unreal Engine team, with Web Content Accessibility Guidelines (WCAG) 2.2 level AA on web surfaces.`
  - sections[5] rows[2][1]: `Flows, clickable prototypes, UI screens and annotated specs in Figma`
  - faqs[0].a first sentence: `No. Our designers deliver annotated Figma screens, design tokens and component specs, and the game studio's Unity engine or Unreal Engine developers build them.`
  - semantic.ngrams: replace `sliced ui assets` with `figma specs`
  - If the owner confirms we export sliced UI assets, add that to the parent hub's "Developer handoff package" first, then F9 can be dropped.
- **F10** (sections[7].answer) replace with: `<strong>Six platform and accessibility standards shape game UI design services for mobile and web games, and each one changes what players see on screen:</strong>`
- **F11** (sections[7] item 5) replace "4.5:1 text contrast." with: `4.5:1 contrast for normal-size text.`

## Notes for the orchestrator / owner

- Open site-wide conflict (not caused by this page): home.ts FAQ "We deliver design and development" vs parent hub FAQ "Do digital product designers write code? No." This page correctly follows the hub.
- Brief `attributes` and `faqs` still carry "sliced UI assets" and "1–2 surfaces"; treat as unverified brief wording.

VERDICT: FAIL
