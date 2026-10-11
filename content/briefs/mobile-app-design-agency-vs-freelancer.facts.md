# Fact-check: mobile-app-design-agency-vs-freelancer (2026-10-11, review loop 1)

Post: `content/blog/mobile-app-design-agency-vs-freelancer.md`. SVGs: `public/blog/mobile-app-design-agency-vs-freelancer/*.svg`. Site sources: `content/services/mobile-app-ui-ux-design-services.json` (hub), `content/pages/about.md`, `content/home.ts`, `content/case-studies/{tradezella,anyday-app}.md`.

Method notes: WebFetch worked for developer.apple.com and developer.android.com. It failed with ENOTFOUND for nngroup.com, support.google.com and w3.org, and web.archive.org was blocked. Those claims were checked with exact-phrase and domain-limited WebSearch, and the cited URL had to be the top hit.

## A. External claims and links

| # | Claim (line) | Verdict | Source / evidence |
|---|---|---|---|
| 1 | Apple "design guidance asks for controls of at least 44×44 points (pt) so a finger can tap them accurately" (L67), link developer.apple.com/design/tips/ | TRUE | https://developer.apple.com/design/tips/ ("Hit Targets"): "Create controls that measure at least 44 points x 44 points so they can be accurately tapped with a finger." The post's wording ("controls") matches. |
| 2 | Android "accessibility guidance on touch target size asks for at least 48×48 density-independent pixels (dp)" (L67), link support.google.com/accessibility/android/answer/7101858 | TRUE | WebFetch failed (ENOTFOUND). A WebSearch limited to support.google.com returned "Touch target size - Android Accessibility Help" at that exact path as the top hit: "at least 48x48dp". This is confirmed by https://developer.android.com/guide/topics/ui/accessibility/apps (fetched): "a focusable area, or touch target size, of at least 48dpx48dp". |
| 3 | Google's guide: tab bar becomes navigation bar; action sheets become bottom sheets; up arrow separate from system back, which can leave the app (L65, takeaway L19) | TRUE | https://developer.android.com/design/ui/mobile/guides/foundations/translate-designs (fetched, "Translate iOS designs to Android"): "Swap the Tabbar (bottom navigation) for the Navigation Bar"; "Action and Activity sheets to Bottom sheets"; "The up arrow moves the user up a level … while back or edge swipe lives in the system navigation, moving the user backwards and even taking the user out of the app." |
| 4 | Platform pair "Wheel date picker" as the iOS side (L69 alt, L77 table, platform-pairs.svg) | OUTDATED | Since iOS 14, UIDatePicker has compact, inline and wheels styles, and the automatic default is compact. Wheels was the only style before iOS 14. Sources: https://developer.apple.com/documentation/uikit/uidatepickerstyle/wheels and https://developer.apple.com/videos/play/wwdc2020/10205/. Wheels is still one valid style, so the drawing can stay, but the label must not present it as *the* iOS picker. See F9. |
| 5 | "Date pickers differ too" / hub FAQ "small platform variants such as date pickers and back navigation" (L67, L106) | TRUE | Hub FAQ (word for word). The Google guide says "swap any inputs and pickers". |
| 6 | Nielsen 2000 article "argues for testing with no more than five users and running as many small tests as you can afford" (L89) | TRUE | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ (Jakob Nielsen, March 18, 2000). WebFetch failed (ENOTFOUND). An exact-phrase search for "testing no more than 5 users and running as many small tests as you can afford" returned nngroup.com/articles/why-you-only-need-to-test-with-5-users/ as the top hit, and a domain-limited search returned the www. URL used in the post. The paraphrase keeps "no more than" and "as many small tests as you can afford". |
| 7 | "TestFlight, Apple's beta testing service" (L104) | TRUE | https://developer.apple.com/testflight/ (fetched): "upload a beta build … to App Store Connect … start testing multiple builds". Plain text, no link. |
| 8 | "Google Play Console's internal, closed or open testing tracks" (L104), link support.google.com/googleplay/android-developer/answer/9845334 | TRUE | Domain-limited search returned that exact path as the top hit: "Set up an open, closed, or internal test - Play Console Help", which describes the internal, closed and open tracks. |
| 9 | WCAG 2.2 AA contrast (L52, L59, skill-coverage-map.svg) | TRUE | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html (SC 1.4.3 Contrast (Minimum), Level AA, in WCAG 2.2). The hub's step 4 uses the same wording. |
| 10 | Apple HIG on iOS, Material Design 3 on Android (L63) | TRUE | Hub abstract and the Google guide. |
| 11 | "Usability testing on a clickable prototype is the cheapest way to find a broken flow" (L89) | UNVERIFIABLE | Superlative with no source. I could not find a source that ranks it cheapest of all methods. See F8. |

## B. Claims about our own service (vs hub JSON and about.md)

| # | Claim (line) | Verdict | Source / evidence |
|---|---|---|---|
| 12 | "$25,000–$60,000 over 4–8 weeks" (L203) | TRUE | Hub `priceRange` and cost H2. |
| 13 | Phases 3–5 / 5–10 / 5–10 / 5–10 / 2–5 days (L114, twin-timeline.svg pills, alt L116) | TRUE | Hub process steps 1–5. Sum = 20–40 working days = 4–8 weeks (hub step answer). |
| 14 | Prototype "tested with 5 users per round, in Maze or in moderated sessions, before developer handoff" (L89) | TRUE | Hub FAQ "Do you test the app prototype with real users?" and step 3. |
| 15 | Last step "hands over Figma files, specs and assets, then reviews the first TestFlight and Google Play Console builds"; Swift, Kotlin, React Native, Flutter (L104, L106) | TRUE | Hub step 5. |
| 16 | "One design serves a React Native or Flutter app too, with small platform variants such as date pickers and back navigation" (L106) | TRUE | Hub FAQ: "One mobile app design works for a React Native or Flutter app, with small platform variants, for example date pickers and back navigation." |
| 17 | Says nothing about whether we write app code | TRUE | The post only says developers build. It never says who writes the code (home.ts and hub conflict still open; the post stays silent). |
| 18 | "a 4–8 week engagement that ends with a review of your first test builds" (L179) | TRUE | Hub step 5 is the last step and ends with the test-build review. Every agency leaf of the tree maps to this engagement (iOS-only readers are sent to the iOS hub at L83, which has the same price and timeline). |
| 19 | About offer "Every project begins with a free consultation and a fixed-scope proposal." (L205) | TRUE | about.md word for word. Appears once in the post. |
| 20 | Skill-map agency column (L50–55, skill-coverage-map.svg): interviews, one flow map, WCAG 2.2 AA contrast, Maze/moderated rounds, UI kit for both platforms, specs/assets/first test builds reviewed | TRUE | Each cell maps to a hub item: research 5–8 interviews; FAQ "one user flow map"; step 4; step 3; UI kit item; step 5. |
| 21 | "A team holds those lengths because several designers work in parallel inside each phase: Android variants alongside iOS, recruiting during wireframes." (L114) | UNVERIFIABLE (team size and process) | The mobile hub gives no designer count. "Several" reads as 3 or more, but home.ts gives "2–4 designers" for the $25k–$60k sprint, so "several" is a headcount claim the site does not support (the brief says not to state one). The hub never says phases run in parallel or that recruiting starts during wireframes. The hub *does* say "Designers … wireframe the iOS and Android screens" in step 2 and "build the UI kit" (components for iOS and Android) in step 4. See F5. |
| 22 | Twin timeline agency track "Flows and wireframes for both platforms, recruiting starts" (SVG c1s1; Show-as-text L121) | UNVERIFIABLE | Same as row 21: no site page says we start recruiting during wireframes. See F6. |
| 23 | "the illustrative top track adds a recruiting wait and an Android pass" (L114) | WRONG | In twin-timeline.svg the freelancer track is the LEFT column (x=40). The agency track is the right column, so there is no top track. See F5. |
| 24 | Twin timeline: freelancer steps have no length (point g) | TRUE | The SVG freelancer column has no day pills. The header says "(illustrative, varies by person)" and the legend says "Added in sequence, no length given". Card heights follow line count, not duration (agency "Discovery 3–5 days" is 69 px tall, "Flows… 5–10 days" is 183 px), and there is no time axis, so no duration is implied. The body says "no length given because it varies by person". |
| 25 | FAQ "The redesign then starts with a review of the current app, its app store reviews and analytics." (L219) | UNVERIFIABLE (scope) | Hub FAQ wording, but it is about *our* redesign. The post turns it into a general rule for any next team and assumes every switch is a redesign. See F13. |

## C. Case studies

| # | Claim (line) | Verdict | Source |
|---|---|---|---|
| 26 | TradeZella "names web and mobile app design in scope" (L150) | TRUE | tradezella.md: "Scope of work: … and web and mobile app design." |
| 27 | "after the revamp, TradeZella reported a 40% increase in user interaction and a 25% boost in user retention" (L150) | UNVERIFIABLE (attribution) | The numbers and labels match tradezella.md exactly ("increase in user interaction", "boost in user retention"). The case study does not say TradeZella reported them, so "TradeZella reported" adds a source the file does not name. See F11. |
| 28 | Anyday "reports a 40% increase in employee satisfaction from immediate access to wages" (L150), link /case-studies/anyday-app/ | TRUE | anyday-app.md results label, word for word. The file exists. |
| 29 | "Neither result belongs to design alone." (L150) | TRUE | Framed as not design alone, as the brief requires. The Anyday customer quote is not used. |
| 30 | Apex HCM / Fortna / ToolsGroup | TRUE (absent) | No mention in the post or SVGs. |

## D. Internal consistency with the post's own decision tree, and generic claims

I walked every branch of decision-tree.svg. Q1 Yes → Agency. Q1 No → Q2. Q2 Yes → Q4 (left connector labelled Yes). Q2 No → Q3. Q3 No → Freelancer. Q3 Yes → Q4. Q4 Yes → Freelancer + your PM. Q4 No → Agency. The SVG matches the Show-as-text list and the alt text. **TRUE.** The H2 bold answer (L154) includes every condition, and the six situation lines (L169–177) each route correctly. The fitness-studio examples (L34) also route correctly.

| # | Claim (line) | Verdict | Why |
|---|---|---|---|
| 31 | Intro: "Pick a freelancer for a one-platform app with a few flows, or when someone on your team can run user testing and review builds. Pick an agency when two-platform design or testing has no owner in-house, or when a launch date …" (L26) | WRONG | Tree: a one-platform app whose flows must be tested, with nobody in-house to run testing → Agency (Q3 Yes → Q4 No). "A few flows" is not the tree's condition ("no flows to test"). The freelancer conditions also ignore Q1 (a fixed launch date → Agency first). See F1. |
| 32 | Takeaway: "A freelancer fits a one-platform app with few flows, or a team whose product manager runs user testing." (L18) | WRONG | Same as row 31. The tree's Q4 also requires recruiting, moderating *and* reviewing test builds, and Q1 overrides both freelancer routes. See F2. |
| 33 | FAQ "Hire a freelancer for a one-platform app with a few flows, or when your PM runs testing and build review. Otherwise, or when a launch date cannot slip, hire an agency" (L211) | WRONG | Same "a few flows" problem as row 31. See F3. |
| 34 | "Stage changes the answer: a freelancer for the demo, an agency once the app heads for both stores." (L179) | WRONG | Tree: both stores → Q4. If someone in-house recruits, moderates and reviews builds → Freelancer + your PM, not Agency. See F4. |
| 35 | Bold: "… and a solo freelancer is usually strong in two or three." (L40) | UNVERIFIABLE | An unsourced numeric generalization about freelancers. Honesty rule: numbers need a named source. See F7. |
| 36 | "when a solo designer gets sick or signs a bigger client, the timeline pauses" (L125) | UNVERIFIABLE (categorical) | Stated as always true. Some freelancers have backups or subcontractors (the post says so itself at L59: "subcontract"). See F12. |
| 37 | Hedged generalizations: "often draws screens as good" (L26), "many freelance quotes" (L87), "Many freelance contracts end at file delivery" (L108), "Freelance totals often leave out" (L215), "per hour in many cases, but not always per project" (L215) | TRUE (hedged opinion) | No "always/never" wording. None of these is a statistic, and no market rates are quoted. |
| 38 | "A team holds those lengths because several designers …" (L114) | see row 21 | — |

## E. SVG text (all files)

- cover.svg: title and tagline only. TRUE.
- skill-coverage-map.svg: matches the L48–55 table; agency cells are supported (row 20). TRUE.
- platform-pairs.svg: tab bar/navigation bar, back/system back + up arrow, action sheet/bottom sheet and 44/48 are TRUE. The touch-target squares are 88 px and 96 px, both 2 px per unit, so they are proportional. The "Wheel date picker" label is OUTDATED (row 4, F9).
- twin-timeline.svg: day pills and "(4–8 weeks)" are TRUE. No freelancer lengths (TRUE). "recruiting starts" is UNVERIFIABLE (F6).
- phone-checklist.svg: check 2 "on Android, system back should return a screen, not exit." is WRONG as written. Google's guide says system back legitimately takes the user "out of the app" from the top level, so "not exit" holds only from inner screens (F10). The other checks are advice. TRUE.
- decision-tree.svg: all branches TRUE (section D).
- quote-line-items.svg: seven lines match the L191–199 table. No prices. TRUE.

## Fixes (exact old → new)

**F1 (L26, row 31)**
Old: "Pick a freelancer for a one-platform app with a few flows, or when someone on your team can run user testing and review builds. Pick an agency when two-platform design or testing has no owner in-house, or when a launch date other teams depend on cannot slip."
New: "If a launch date other teams depend on cannot slip, pick an agency. Otherwise, pick a freelancer for a one-platform app with no flows to test, or when someone on your team can run user testing and review builds; if nobody can, pick an agency."

**F2 (L18 takeaway, row 32)**
Old: "A freelancer fits a one-platform app with few flows, or a team whose product manager runs user testing."
New: "Without a fixed launch date, a freelancer fits a one-platform app with no flows to test, or a team whose product manager runs user testing and build review."

**F3 (L211 FAQ, row 33)**
Old: "Hire a freelancer for a one-platform app with a few flows, or when your PM runs testing and build review. Otherwise, or when a launch date cannot slip, hire an agency; the decision tree shows each path."
New: "If a launch date other teams depend on cannot slip, hire an agency. Otherwise, hire a freelancer for a one-platform app with no flows to test or when your PM runs testing and build review, and an agency when nobody in-house runs them; the decision tree shows each path."

**F4 (L179, row 34)**
Old: "Stage changes the answer: a freelancer for the demo, an agency once the app heads for both stores."
New: "Stage changes the answer: a freelancer for the demo, an agency once the app heads for both stores and nobody in-house runs testing and build review."

**F5 (L114, rows 21 and 23)**
Old: "A team holds those lengths because several designers work in parallel inside each phase: Android variants alongside iOS, recruiting during wireframes. A solo designer works in sequence, so the illustrative top track adds a recruiting wait and an Android pass, with no length given because it varies by person."
New: "Inside those phases, our designers wireframe the iOS and Android screens in the same step and build one UI kit for both platforms, so Android is not a separate pass at the end. A solo designer often works through the platforms in sequence, so the illustrative left track adds a recruiting wait and an Android pass, with no length given because it varies by person."
(Built from hub step 2 "Designers … wireframe the iOS and Android screens", step 4 "build the UI kit" and the UI kit item "Components for iOS and Android". Plural "designers" matches the hub and home.ts, and the fix gives no count.)

**F6 (twin-timeline.svg card c1s1 and Show-as-text L121, row 22)**
SVG old: the three lines "Flows and wireframes for" / "both platforms," / "recruiting starts".
SVG new: two lines, "Flows and wireframes for" / "iOS and Android". Remove the third line and shrink the card. Keep the "5–10 days" pill.
L121 old: "- **Agency team (4–8 weeks):** discovery → flows and wireframes for both platforms, recruiting starts → prototype and testing → visual UI for iOS and Android side by side → handoff."
L121 new: "- **Agency team (4–8 weeks):** discovery → flows and wireframes for iOS and Android → prototype and testing → visual UI for iOS and Android side by side → handoff."

**F7 (L40 bold, row 35)**
Old: "**A mobile app design project needs six skills (research, user flows, interface design, test moderation, two-platform fluency and handoff), and a solo freelancer is usually strong in two or three.**"
New: "**A mobile app design project needs six skills (research, user flows, interface design, test moderation, two-platform fluency and handoff), and few solo freelancers are equally strong in all six.**"

**F8 (L89, row 11)**
Old: "Usability testing on a clickable prototype is the cheapest way to find a broken flow."
New: "Usability testing on a clickable prototype finds a broken flow before any code is written."

**F9 (L69 alt, L77, platform-pairs.svg r2c0, row 4)**
L69 alt old: "wheel vs Material date picker" → new: "iOS vs Material date picker"
L77 old: "| Wheel date picker | Material date picker |" → new: "| iOS date picker (compact, inline or wheels) | Material date picker |"
SVG r2c0 label old: "Wheel date picker" → new: "iOS date picker" (the wheel drawing can stay, because wheels is one current iOS style).

**F10 (L138 and phone-checklist.svg card i2)**
L138 old: "2. **Back navigation:** on Android, system back should return a screen, not exit."
L138 new: "2. **Back navigation:** on Android, system back from an inner screen should return to the previous screen, not exit the app."
SVG i2 old lines: "on Android, system" / "back should return a" / "screen, not exit."
SVG i2 new lines: "on Android, from an" / "inner screen, system" / "back goes back a" / "screen, not out." (Add one line of card height.)

**F11 (L150, row 27)**
Old: "after the revamp, TradeZella reported a 40% increase in user interaction and a 25% boost in user retention."
New: "after the revamp, the case study reports a 40% increase in user interaction and a 25% boost in user retention."

**F12 (L125, row 36)**
Old: "when a solo designer gets sick or signs a bigger client, the timeline pauses, while a team keeps one point of accountability without one point of failure."
New: "when a solo designer without a backup gets sick or signs a bigger client, the timeline pauses, while a team keeps one point of accountability without one point of failure."

**F13 (L219, row 25)**
Old: "The redesign then starts with a review of the current app, its app store reviews and analytics."
New: "If the next team is ours, a mobile app redesign starts with a review of the current app, app store reviews and analytics before any new screens are designed."
(Hub FAQ wording.)

Note for the orchestrator: the conflicts below are still open and the post now handles both correctly. home.ts says "2–4 designers" for the $25k–$60k sprint, while the mobile hub gives no count. home.ts says "We deliver design and development", while the hub ends at test-build review.

VERDICT: FAIL
