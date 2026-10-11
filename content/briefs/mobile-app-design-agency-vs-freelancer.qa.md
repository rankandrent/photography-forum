# QA report: mobile-app-design-agency-vs-freelancer (2026-10-11, review loop 1)

Reviewer: content-qa. Post: `content/blog/mobile-app-design-agency-vs-freelancer.md` (HEAD 88393a1, tree clean; `git status` shows no uncommitted post, SVG or brief files).
Brief: `content/briefs/mobile-app-design-agency-vs-freelancer.json`. Visuals: `public/blog/mobile-app-design-agency-vs-freelancer/` (7 SVGs).
Items 2–3 (facts, honesty) belong to the parallel fact-checker. F2 and F3 below rewrite sentences that hold cited facts (Google translate guide, Apple and Android touch targets), so the orchestrator should merge them with any fact-checker FIX on L65–L67. The links and the numbers stay unchanged.

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Intent & cannibalisation | PASS |
| 4 | Semantic SEO | FIX (F5 WCAG expansion, F6 dp in takeaway, F9 keyword-sentence antecedent) |
| 5 | Internal links | PASS (6) |
| 6 | Images | PASS |
| 6b | Duplication | FIX (F1 twin timeline, F2/F3 platform pairs) |
| 7 | Readability & cross-post overlap | FIX (F7, F8, F10, F13) |
| 7a | Competitor originality | PASS (fetch blocked; snippet-based) |
| 7b | Silo & leads | PASS (BOFU confirmed) |
| 7c | Variety | FAIL (F11, F12: verdict and closing frame recycled from ux-audit-agency-vs-freelancer) |
| 7d | Semantic completeness | FAIL (G1, G2; plus routing contradictions F4, F14, F15) |
| 7e | On-page checklist | PASS (score 100, failed []) |
| 8 | Build / seo:check / lint | PASS (0 errors) |

## 1. Intent & cannibalisation: PASS
- The keyword is commercial investigation: a buyer choosing a provider type for an iOS and Android app. The post answers that from the first paragraph.
- `grep` over `content/` (briefs excluded): only this post holds the keyword or metaTitle. ux-audit-agency-vs-freelancer targets "ux audit agency vs freelancer" (a different hub). The hub owns "mobile app UI UX design services". home.ts, the digital-product FAQ and St. Louis cover generic hiring, and this post stays mobile-specific.

## 4. Semantic SEO: FIX
- Lengths measured on the built HTML: title/H1 58, metaTitle 53, description 148 ✓.
- Description: "Mobile app design agency vs freelancer: compare who covers iOS and Android, user testing and developer handoff. Then request a fixed-scope proposal." The next-step clause is "Then request a fixed-scope proposal." (matches the BOFU CTA) ✓. Shared-verb pairs all hold: "who covers iOS and Android", "who covers user testing", "who covers developer handoff" ✓.
- Keyword sentences ("this choice" swap test):
  - L26 "The mobile app design agency vs freelancer decision is usually framed…" → "This choice decision"… The carrier "decision" is the brief-prescribed head noun, and it reads naturally as a compound ✓.
  - L30 "the mobile app design agency vs freelancer question turns on…" ✓.
  - L179 "If the tree settles the mobile app design agency vs freelancer question in favor of an agency, that is the work we run…": the keyword phrase is fine, but "that" has no antecedent noun → **F9**.
  - L205 "Weighing a mobile app design agency vs freelancer usually ends with…" ✓ (brief carrier).
- `grep ' vs '`: all body hits carry a determiner or carrier. L69 is alt text (the "tab bar vs navigation bar" pairs) ✓.
- Keyword + noun stacking: none ✓. Digit-first sentences or bold answers: `grep -nE '^(\*\*)?[0-9]+ '` returned 0 hits ✓. Dangling participles: 8 comma + participle hits, each modifies the right noun ✓.
- Density: 4 exact uses in 2,370 body words (plus title and H1), which is 1.01% by word share ✓.
- Bold answers: 29, 30, 30, 26, 29, 29, 27, 31, 26 words. L154 (31) is accepted at "~30", because its content is exact against the tree. Each one is a single sentence ✓.
- Abbreviations: PM (L34), UI and UX (L36), HIG (L63), pt and dp (L67) are expanded ✓. **WCAG** is expanded only inside the collapsed `<details>` (L52). Its first open-text use, L59, is bare → **F5**. **dp** appears bare in takeaway 3, which renders above the article → **F6**.
- Boolean H2 and FAQs open with Yes or No ✓ (L63, L215, L219, L223, L227). Each FAQ answer has ≥ 2 sentences ✓. FAQPage JSON-LD: each `acceptedAnswer.text` holds only its answer ✓.
- Banned phrases and hedges (might, may, could, perhaps): 0 hits ✓.
- Entities (`<details>` stripped): every brief entity appears in the open text. Upwork has only one passing mention (L185) → covered by G2.
- n-grams: all 12 are present ✓.

## 5. Internal links: PASS
6 contextual links: hub (L36, about word 170) → iOS hub (the single cross-hub link, L83) → TradeZella, Anyday (L150) → hub #cost (L203, closing UP link) → /contact/ (L205). All targets exist in `out/`, and `id="how-much-does-mobile-app-ui-ux-design-cost"` is present on the hub. Anchors vary, and no other silo's posts are linked. That is lean, as BOFU should be. The link builder's drop of the two extra hub deep links (hub cap) is accepted.

## 6. Images: PASS
- All 7 SVGs (cover + 6) exist in `public/` and `out/`, each 2–13 KB, with no `<image>` or third-party brand assets. Text only names iOS, Android and Material, with no logos.
- Every alt is descriptive (219–286 chars). Captions are set.
- Rendering was checked in the built page (python http.server on PID 2376, stopped and confirmed gone with `ps`; no other server was running before). `article` is 760px at 1440 and 354px at 390, so the scale is 0.95 / 0.44. The smallest SVG text is 26px, which renders at 24.7px desktop and 11.5px mobile. All images are legible and spelled correctly.
- Cover at 390: `object-fit: cover` crops it to 16:9 (354×199). The title, subtitle and question all stay inside the crop ✓.
- The pink line at the top of some screenshots is the reading-progress bar (lesson 2026-10-10), not an image defect.
- I walked every decision-tree path against the prose and the scenario bullets. All 5 leaves agree with L160–L163 and with the six scenario lines ✓. The tree's text matches the details block word for word.

## 6b. Duplication: FIX
- **twin-timeline.svg (designer's flag): decision is TRIM the open sentence.** L114 prints all five agency phase lengths ("discovery 3–5 days, flows and wireframes 5–10, prototype and testing 5–10, visual UI 5–10 and handoff 2–5"). The image's agency track shows the same five pills, so the content is visible twice. The collapsed text block (L121) *drops* the lengths the image carries, which is the reverse defect. Move the lengths into the block → **F1**.
- **platform-pairs.svg (not flagged by the designer):** L65–L67 name all five of the image's pairs in the open text: tab bar → navigation bar, action sheet → bottom sheet, up arrow / system back, 44 pt / 48 dp, and "Date pickers differ too". Trim the enumeration and keep the cited sentences and their numbers (the touch-target figures stay, because the source links and the pt/dp expansions live there) → **F2, F3**.
- skill-coverage-map: the bold answer lists only the six skill names. The ratings and notes appear only in the image and the collapsed block ✓. Phone checklist, decision tree and quote card: the open prose holds summaries or subsets only ✓. Every collapsed block carries all items of its image ✓ (twin timeline aside, F1).

## 7. Readability & cross-post overlap: FIX
- 5-gram overlap: ux-audit-agency-vs-freelancer 0.6% (the shared grams are about.md's offer sentence and the WCAG expansion), hub JSON 1.9%, every other post ≤ 0.6% ✓ (< 12%).
- L150 has 5 sentences → **F10**. L83 "stretchers show the same screens" is coined jargon and a comma splice → **F7**. L131 "hire a mobile app designer, freelancer or agency" reads as three options → **F8**. FAQ L219 "The redesign then starts…" has no antecedent, because switching providers is not a redesign → **F13**.

## 7a. Competitor originality: PASS (numeric overlap not computable)
WebFetch of codewave.com failed with ENOTFOUND, and curl through the proxy failed with a 403 CONNECT. WebSearch snippets show its frame: freelancers vs design firms, freelancer skills (UI, UX, graphic design, prototyping), and the Upwork/Freelancer/Fiverr marketplaces, then agency, pros/cons and verdict. The post uses none of that order. It has no definition section, no pros/cons columns and no marketplace list (Upwork appears once, as a contract type), and its examples are its own. All 7 serpGaps are covered: skills map, two-platform pairs, testing ownership, test-build review, calendar time, install test, and honest routing + quote lines.

## 7b. Silo & leads: PASS
- services[0] = mobile-app-ui-ux-design-services ✓. There is 1 cross-hub link (iOS, for App-Store-only readers) ✓.
- **BOFU confirmed.** This is the silo's first post (funnel.json: start with 1 BOFU), with service-support 5 (minimum 5) ✓. The searcher has decided to hire and is choosing the provider type, and the SERP is provider-comparison pages. The template renders consultation + price, and the post states the $25,000–$60,000 / 4–8 week range once ✓. Note: funnel.json lists "in-house ux team vs agency" as a MOFU example. This query is narrower (a hiring decision with a quote in hand), and the precedent is ux-audit-agency-vs-freelancer (BOFU). Moving to MOFU would make the template pull a case-study CTA (lesson 2026-10-08), so keep BOFU.
- leadAngle: moment 1 is at L179 and moment 2 at L205 ✓. "If a freelancer fits better, we say so" is deliberately *not* added, because the orchestrator rejected that promise in ux-audit (writer learnings 2026-10-07). The post's honest freelancer routing carries that tone instead. "free consultation" appears exactly once, in about.md's sanctioned sentence (owner note, not a FIX).

## 7c. Variety: FAIL
Against fingerprints.json, the post differs from the last 3 site-wide posts on 7/7 attributes, and the silo is empty. Against ux-audit-agency-vs-freelancer, it differs on intro (contrarian vs data point), H2 frames, section order and visual types (4 of 7) ✓. The structure, the examples (fitness booking app, referral screen, investor demo) and the image set are its own ✓.
Paraphrase reuse that the 5-gram score cannot see:
- **F11**: takeaway 2 "A freelancer fits a one-platform app with few flows, or a team whose product manager runs user testing." repeats ux-audit's takeaway 2 ("A senior freelancer fits one platform, 2–3 key flows and an in-house owner for the fixes") and its startup FAQ. The same verdict shape also sits in the intro (L26) and FAQ 1 (L211). It is also *wrong for this post*, because the tree routes on "tested before code", not on flow count → fixed together with F4 and F14.
- **F12**: L32 "has quoted a smaller project, not a cheaper one" restates ux-audit L180 ("the cheaper quote is often just a smaller audit"). L203 "Our mobile engagements run $25,000–$60,000 over 4–8 weeks, and the hub shows [pricing link]" has the same frame as ux-audit L195 ("our audits run $5,000–$15,000 over 2–3 weeks; the hub explains the [pricing link]").

## 7d. Semantic completeness: FAIL
Section walk (bold → detail → example → next step):
- H2 1 ✓, except that its next step asks for "three answers" while the tree asks four questions (launch date first) → **F16**.
- H2 2 is thin. See G1.
- H2 3, H2 4 and H2 5 are complete ✓. H2 5's bold "Handoff is where the two models differ most" contradicts the post's own skill map, where test moderation is the only "often missing" row and handoff is "partial" → **F17**.
- H2 6 is complete after F1. H2 7 is complete ✓. H2 8 is complete, apart from F15.
- H2 9: the brief question "How do I compare a freelancer's hourly quote with an agency's fixed price?" gets one sentence (L185) → G2.
- every/always/all/never test (`grep`): L112 "does every task… alone", L150 "Hold every case study", L185 "every revision round", L205 "Every project begins" (sanctioned) and L215 "not always per project" are consistent with the tree. Routing summaries that contradict the tree:
  - **F4**: intro L26 "Pick a freelancer for a one-platform app with a few flows". Counter-case: a one-platform app with 3 flows that must be tested and no in-house tester → the tree says agency (Q3 Yes → Q4 No).
  - **F14**: FAQ L211, same defect.
  - **F15**: L179 "an agency once the app heads for both stores" vs Q2 Yes → Q4 Yes → "freelancer + your PM".
- The intro promises only what the body delivers ✓. Each takeaway is backed by a section ✓ (after F11).

## 7e. On-page checklist: PASS
`SHOW_DRAFTS=1 npm run build` exit 0, then `npm run onpage -- /blog/mobile-app-design-agency-vs-freelancer/` gave `score: 100, failed: []`, words 2932 (page). Manual items:
- 11: real author (saliha-shahzad) + contributor ✓.
- 12: answer-first ✓ (F17 aside).
- 13: 5 external sources ✓.
- 14: SVGs < 14 KB ✓.
- 16: `updated` = date ✓.
Keyword sentences are quoted in §4.

## 8. Build: PASS
- `SHOW_DRAFTS=1 npm run build`: exit 0.
- `npm run seo:check`: 0 errors, 6 warnings, all pre-existing on other pages (ai-ux-design, fintech-ux-design, generative-ai-ux, author/design-team).
- `npm run lint`: exit 0. The jsx-ast-utils notices are informational.
- Note for the orchestrator: `out/` now holds a SHOW_DRAFTS build. Rebuild without it before any deploy.

## FIX list (exact replacements for the orchestrator)

**F1 (6b, twin timeline): trim the open sentence and put the lengths in the collapsed block.**
- L114 old: `Our published timeline adds up five phases: discovery 3–5 days, flows and wireframes 5–10, prototype and testing 5–10, visual UI 5–10 and handoff 2–5. A team holds those lengths`
- L114 new: `Our published timeline fits five phases into 4–8 weeks, shown on the agency track below. A team holds those lengths`
- L121 old: `- **Agency team (4–8 weeks):** discovery → flows and wireframes for both platforms, recruiting starts → prototype and testing → visual UI for iOS and Android side by side → handoff.`
- L121 new: `- **Agency team (4–8 weeks):** discovery (3–5 days) → flows and wireframes for both platforms, recruiting starts (5–10 days) → prototype and testing (5–10 days) → visual UI for iOS and Android side by side (5–10 days) → handoff (2–5 days).`

**F2 (6b, platform pairs, L65)**
- old: `treats the Android version as planned work: the iOS tab bar becomes a navigation bar, and action sheets become bottom sheets. It also separates the in-app up arrow from the system back gesture, which can leave the app.`
- new: `treats the Android version as planned work, not a reskin: navigation, sheets and back behavior each change, and Android's system back gesture can take the user out of the app.`

**F3 (6b, L67)**: delete ` Date pickers differ too.` (the image and its text block carry it).

**F4 (7d, intro L26)**
- old: `Pick a freelancer for a one-platform app with a few flows, or when someone on your team can run user testing and review builds.`
- new: `Pick a freelancer for a one-platform app whose flows need no user testing before code, or when someone on your team can recruit testers, moderate sessions and review builds.`

**F5 (4, L59)**
- old: `and ask how they check contrast against WCAG 2.2 AA.`
- new: `and ask how they check contrast against Web Content Accessibility Guidelines (WCAG) 2.2 AA.`

**F6 (4, takeaway 3)**
- old: `48×48 dp touch targets."`
- new: `48×48 density-independent pixel (dp) touch targets."`

**F7 (7, L83)**
- old: `fluent designers show different navigation, stretchers show the same screens.`
- new: `a fluent designer shows different navigation, while one who stretches iOS screens shows the same layout twice.`

**F8 (7, L131)**
- old: `Before you hire a mobile app designer, freelancer or agency, run these checks.`
- new: `Before you hire a mobile app designer, whether a freelancer or an agency, run these checks.`

**F9 (4, L179)**
- old: `in favor of an agency, that is the work we run as a 4–8 week engagement that ends with a review of your first test builds.`
- new: `in favor of an agency, your app fits the 4–8 week engagement we run, which ends with a review of your first test builds.`

**F10 (7, L150, 5 sentences)**
- old: `Neither result belongs to design alone. Install the apps before the first call`
- new: `Neither result belongs to design alone.\n\nInstall the apps before the first call` (a real blank line, so it becomes its own paragraph).

**F11 (7c/7d, takeaway 2)**
- old: `"A freelancer fits a one-platform app with few flows, or a team whose product manager runs user testing."`
- new: `"A freelancer fits a one-platform app whose flows need no testing before code, or a team whose product manager recruits, moderates and reviews test builds."`

**F12 (7c)**
- L32 old: `has quoted a smaller project, not a cheaper one.`
- L32 new: `has priced a different app from an agency quoting both platforms, test rounds and build review.`
- L203 old: `Our mobile engagements run $25,000–$60,000 over 4–8 weeks, and the hub shows [what drives mobile app design pricing](/services/mobile-app-ui-ux-design-services/#how-much-does-mobile-app-ui-ux-design-cost).`
- L203 new: `Set both totals against our published $25,000–$60,000 range for 4–8 weeks; flows, platforms, test rounds and UI kit size are [what drives mobile app design pricing](/services/mobile-app-ui-ux-design-services/#how-much-does-mobile-app-ui-ux-design-cost) inside it.`

**F13 (7, FAQ L219)**
- old: `The redesign then starts with a review of the current app, its app store reviews and analytics.`
- new: `An agency that takes over then starts with a review of the current app, its app store reviews and analytics.`

**F14 (7d, FAQ L211)**
- old: `Hire a freelancer for a one-platform app with a few flows, or when your PM runs testing and build review. Otherwise, or when a launch date cannot slip, hire an agency; the decision tree shows each path.`
- new: `Hire a freelancer for a one-platform app whose flows need no user testing before code, or when your PM recruits, moderates and reviews test builds. Hire an agency otherwise, or whenever a launch date other teams depend on cannot slip; the decision tree shows each path.`

**F15 (7d, L179)**
- old: `an agency once the app heads for both stores.`
- new: `an agency once the app heads for both stores and nobody in-house owns testing and build review.`

**F16 (7d, H2 1)**
- L32 old: `Price against quality hides those three variables.`
- L32 new: `Price against quality hides those three variables, and a fourth: whether a launch date other teams depend on can slip.`
- L36 old: `Write down your three answers before reading on: platforms at launch, test rounds, and who will look at the first build.`
- L36 new: `Write down four answers before reading on: platforms at launch, test rounds, who will look at the first build, and how fixed the launch date is.`

**F17 (7d, H2 5 bold, contradicts the skill map)**
- old: `**Handoff is where the two models differ most, because the design has to reach developers as buildable specs and someone has to check the first test builds against it.**`
- new: `**At handoff, the design has to reach developers as buildable specs, and someone has to check the first test builds against it.**` (22 words)

## Guidance for the writer
- **G1 [H2 "What work sits inside a mobile app design project?", after L42]** — Missing: open-text substance on *why* the skill gaps matter for a mobile app. The section has the bold answer, one sentence and the image, so the six skills have no worked consequence. Add: one concrete mobile example per gap type, using rows from the map. (a) With no test moderation, the onboarding flow is first seen by users in the TestFlight build, after code. (b) With partial iOS + Android fluency, the Android pass becomes a second purchase (tie it to quote line 1). Cite no statistics. Target: 2–3 sentences, 45–60 words. Re-check that the bold answer is not restated.
- **G2 [H2 "How do you compare a freelancer's quote with an agency's?", L185]** — Missing: the brief question "How do I compare a freelancer's hourly quote with an agency's fixed price?" gets one sentence, and Upwork is a passing mention. Add the conversion steps: ask the hourly freelancer for estimated hours per quote line and a cap on revision rounds; multiply by their own rate; set the capped total beside the fixed-scope proposal's included rounds. Mention that Upwork contracts can be hourly or fixed-price, so ask which one the quote is (fact-checker to verify against Upwork's help pages). Give no market rates. Target: 2–3 sentences, 50–70 words, placed before the image.
- After G1/G2, re-run the bold-answer word count, the paragraph sentence count (≤ 4) and the body word count (now 2,370; stay ≤ about 2,450 by trimming elsewhere if needed).

VERDICT: FAIL
