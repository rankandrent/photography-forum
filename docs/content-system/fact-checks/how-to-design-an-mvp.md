# Fact-check: how-to-design-an-mvp (BLOG day 2026-10-20)

Checked: `content/blog/how-to-design-an-mvp.md` (line numbers below are from the file as read on 2026-10-20, before QA's parallel edits) and the 7 SVGs in `public/blog/how-to-design-an-mvp/`.
Site sources: `content/services/ui-ux-design-services-for-startups.json` (hub), `content/industries/startups.json`, `content/home.ts`, `content/pages/about.md`, `content/case-studies/nitro.md`, `content/case-studies/vocable.md`, `content/services/usability-testing-services.json`.
The post was not edited (role rule, and QA is editing in parallel). Every fix below is an exact replacement for the orchestrator to apply.

## Claims

| # | Claim (line) | Verdict | Source / note |
|---|---|---|---|
| 1 | Lean Startup: the MVP is the quickest way into the build-measure-learn loop; build, measure how customers respond, decide to pivot or persevere (L38) | TRUE | https://theleanstartup.com/principles: "developing a minimum viable product (MVP) … to begin the process of learning as quickly as possible", and "turn ideas into products, measure how customers respond, and then learn whether to pivot or persevere." The link loads and supports the sentence. |
| 2 | Comparison table and SVG 1: investor demo = "clickable prototype of the next 2 releases a funding round pays for"; MVP = working product users rely on today (L44–53, mvp-vs-prototype-vs-investor-demo.svg) | TRUE (site wording) | Copied from industries/startups.json FAQ L198. The "2" is the site's own wording, not a statistic. The SVG text matches the table. |
| 3 | "An MVP stops before product-market fit is proven" (L53) | TRUE | Matches the hub: "expand to full product design after product-market fit". |
| 4 | Jobs to be Done: a product is something a person hires to make progress on a job (L65) | TRUE (framework description) | Christensen, HBS Working Knowledge https://hbswk.hbs.edu/item/6496.html, plus secondary summaries of *Competing Against Luck*. No link in the post. |
| 5 | 5–8 Jobs to be Done interviews (L65, L139, L223) | TRUE | Hub step 2 and the deliverables list. |
| 6 | Activation rate = share of early users who complete the core action in their first session (L67) | TRUE | Hub benefit card "Increases activation rate". |
| 7 | Feature cut list leaves 3–5 user flows such as sign-up, core action and payment (L71, L93, L259) | TRUE | Hub "MVP user flows" item. The three questions are labelled "our working rule, not a published method". |
| 8 | Concierge MVP definition (L79) | TRUE (framework description) | The standard Lean Startup usage: a person delivers the service by hand. |
| 9 | Cut sheet: 12 features = Keep 5 / by hand 3 / later 4, labelled "Illustrative, invented startup" (L81–91, feature-cut-sheet.svg) | TRUE | The counts add up to 12 and the SVG matches the text panel. Walked against the three questions: invoicing, imports and reminders go to "by hand"; calendar sync, waitlist, dashboard and multi-therapist go to "later". "Delete account" fails Q1 and Q2, so it sits in Keep only because of the override in L93. See F2, which makes that override explicit. |
| 10 | "Sign-up consent and data deletion, because GDPR covers users in the EU and CCPA applies past its revenue or data thresholds" (L95) | WRONG (in part) | Data deletion holds: GDPR Art. 17 right to erasure (https://gdpr-info.eu/art-17-gdpr/), and the CCPA right to delete (https://oag.ca.gov/privacy/ccpa, FAQ D.1). "Sign-up consent" does not hold. GDPR Art. 6(1) gives six lawful bases, and an account usually rests on (b) contract rather than consent (https://gdpr-info.eu/art-6-gdpr/). The CCPA is an opt-out law, with opt-in only for under-16s (OAG FAQ B). GDPR reaches non-EU firms when they offer goods or services to people in the EU or monitor them there (Art. 3(2), https://gdpr-info.eu/art-3-gdpr/), not simply because a firm has "EU users". The CCPA thresholds (>$25M revenue, 100,000+ residents or households, or ≥50% of revenue from selling data) support "revenue or data thresholds". → **F2** |
| 11 | In-app delete-account flow in any iOS app that offers account creation; App Store Review Guideline 5.1.1(v) (L96) | TRUE | https://developer.apple.com/app-store/review/guidelines/: "If your app supports account creation, you must also offer account deletion within the app." |
| 12 | "On our startup engagement the cut happens inside a 5-day GV Design Sprint, whose decide day ends with 1 direction" (L98) | WRONG (vs hub) | Hub step 1 (sprint) covers mapping, sketching, deciding on 1 direction, prototyping and testing. The **prioritized feature list** comes from hub step 2 (user research). The decide day itself is TRUE (https://www.gv.com/sprint/: Wednesday, "decide which ones have the best chance"). → **F3** |
| 13 | Timeline item 1, "Design sprint (5 days) … drafts steps 1 and 2" (L222) | WRONG (vs hub) | Same cause as #12. The sprint aligns founders on 1 target user and 1 core problem (step 1). The feature list (step 2) comes from user research, and item 2 already covers it. → **F3** |
| 14 | FigJam is Figma's whiteboard (L104) | TRUE | Figma product naming. The hub FAQ also names Figma and FigJam. |
| 15 | Flow map, 6 steps with state tags (L108–119, core-flow-map-with-states.svg) | TRUE | The SVG text matches the panel word for word. The alt text says "illustrative". The figure has no numbers apart from step numbers. |
| 16 | Vocable: "an AI content marketing SaaS we took from idea to MVP: we mapped the full creator journey and designed each screen around a problem we heard in stakeholder interviews" (L121) | TRUE text, link FAIL | vocable.md description: "How we took Vocable from idea to MVP". Our approach, word for word: "We mapped the full creator journey and designed each screen…". The case study maps a *journey*, not user flows, so "Flow before screens" stretches the source. vocable.md `services` does **not** include ui-ux-design-services-for-startups, and the brief says "may be named once without a link". A DOWN link must go to a case study tagged with this hub (RULES silo). No metrics are claimed. → **F6** |
| 17 | Low-fidelity first, high-fidelity UI after 5–8 interviews; "pre-seed teams … need problem interviews and a rough prototype before polished UI" (L139–141) | TRUE (site) | Matches industries/startups.json FAQ and the hub step order (research in step 2, UI in step 4). |
| 18 | "The Apple Human Interface Guidelines and Material Design 3 each set a **minimum** touch target size for iOS and Android" (L141); alt text "annotated with minimum touch target sizes" (L143) | OUTDATED (Apple) | The current HIG Accessibility table lists iOS/iPadOS as **default** control size 44x44 pt and **minimum** control size 28x28 pt (https://developer.apple.com/design/human-interface-guidelines/accessibility, read through the tutorials/data JSON). Material Design 3 is TRUE: "at least 48 x 48dp" (https://m3.material.io/foundations/designing/structure, domain-limited search, all hits on m3.material.io; Google Android accessibility help https://support.google.com/accessibility/android/answer/7101858 says "at least 48dp … as described in the Material Design Accessibility guidelines"). The hub's "44×44 pt hit targets on iOS" has no "minimum" and stays correct. → **F1** |
| 19 | Table and SVG 4: iOS hit target 44×44 pt (Apple HIG); Android 48×48 dp (Material Design 3) (L149–150, screen-spec-card.svg) | TRUE | 44×44 pt is Apple's stated default iOS size, and the label "hit target" does not say minimum. 48×48 dp: source as in #18. |
| 20 | WCAG 2.2 SC 2.5.8: 24 by 24 CSS pixels at level AA, with exceptions such as enough spacing (L141, L151, SVG) | TRUE | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html: "(Level AA) The size of the target for pointer inputs is at least 24 by 24 CSS pixels, except when: Spacing … Equivalent … Inline … User agent control … Essential." The link loads and supports the sentence. |
| 21 | SC 1.4.3 contrast 4.5:1 for body text, level AA (L141, L152, SVG) | TRUE | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html: "at least 4.5:1", except large-scale text (at least 18 point or 14 point bold) at 3:1, Level AA. "Body text" means normal-size text, so 4.5:1 holds. Optional wording (not blocking): "a contrast ratio of at least 4.5:1 for body text (3:1 for large text of 18 point, or 14 point bold)". |
| 22 | Design tokens; starter design system of 20–30 core components; built in the UI design and prototype step (5–12 days) (L156–158, handoff SVG) | TRUE | Hub deliverable "Starter design system", hub step 4, hub FAQ "Does MVP design include a design system?". The post never calls it a full design system. |
| 23 | 5 users per round; Nielsen 2000: 5 users find about 85% of usability problems, so the budget goes further in several small rounds (L164) | TRUE | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ (Jakob Nielsen, 18 March 2000): "After the first study with five participants has found 85% of the usability problems…"; "Spend this budget on 3 studies with 5 users each!"; "better to distribute your budget for user testing across many small tests". Stale brief record: the brief says 19 March 2000, but the page says 2000-03-18. The post says only "2000", so nothing needs changing. |
| 24 | Maze runs the clickable Figma prototype unmoderated and records each participant's path and misclicks (L166) | TRUE | Maze help: individual and common paths, misclick rate (https://help.maze.co/articles/6580904349-prototype-test-understanding-your-prototype-test-results, search-verified). Hub: "A Figma prototype is tested with 5 users in Maze." |
| 25 | SUS: 10-item questionnaire, scored 0–100, not a percentage; Sauro reports an average of 68 across 500 studies (L168, L181, test-plan SVG) | TRUE | https://measuringu.com/sus/ (Jeff Sauro): "The SUS is a 10 item questionnaire"; "Even though a SUS score can range from 0 to 100, it isn't a percentage"; "The average SUS score from all 500 studies is a 68." The link loads and supports the sentence. SVG slider: 584 + 0.68 × 484 = 913.12, which matches the marker. Labelled "Illustrative". |
| 26 | "We treat 68 as a flag, not a pass mark" followed by "Move to the developer handoff when … the score is 68 or higher" (L185–189) | WRONG (internal) | The handoff rule turns 68 into a pass gate, which contradicts the sentence before it and the brief ("Do not invent a pass threshold"). The "handoff" and "revisit" conditions also overlap: users who finish without help, score ≥ 68 and say they would keep texting meet both. → **F5** |
| 27 | "Teams without time to recruit and moderate can hand the round to our usability testing services" (L191) | WRONG (scope) | The usability-testing hub sells a 4–8 week engagement that "runs 2–3 test rounds with design fixes between rounds". A single round is not a published offer. The hub does include "participant recruitment" and "moderated usability sessions". This is the post's one cross-hub link, which is allowed. → **F7** |
| 28 | On our startup engagement, the handoff delivers annotated Figma files at the end of the testing and handover step (L197) | TRUE | Hub step 5. |
| 29 | Figma Dev Mode is the developer-focused workspace for inspecting designs, measurements, variables and generated code snippets (L197) | TRUE | https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode: "a developer-focused workspace for inspecting designs, viewing properties and generated code"; measurements, "styles and variables", "autogenerated code snippets". |
| 30 | Dev Mode "needs a paid plan with a Full or Dev seat" (L197) | WRONG (in part) | Same help article: "Professional, Education, Organization, Government, and Enterprise plans" and "Requires a Full or Dev seat". The Education plan is free, so "paid plan" is too narrow. → **F4** |
| 31 | Handoff pack of 8 items (L199–212, handoff-pack-checklist.svg) | TRUE (advice) | The SVG has 8 items, the same as the panel. These are presented as the reader's checklist, and only "annotated Figma files" is tied to our engagement (L197). Note: copy deck, analytics event and open questions are not hub deliverables. Keep them as advice and never as "our handoff includes". |
| 32 | 4–8 weeks = 20–40 working days; the 5 steps and their durations (L218–226) | TRUE | Hub process. The step sum 5 + 3–7 + 4–8 + 5–12 + 3–8 = **20–40 days**, which matches the stated total. The step contents match the hub, except item 1's mapping (#13). |
| 33 | Founders: about 2–4 hours per week, 2 review sessions of 45 minutes, Figma comments within 1 working day; remote sprint 2–3 hours per day for 5 days (L20, L218, L228) | TRUE | industries/startups.json abstract and FAQ L206; hub FAQ "Can a startup design sprint run remotely?". "Outside the sprint week" reconciles the two pages and contradicts neither. |
| 34 | Price $25,000–$60,000 set by flows, platforms, research depth and starter design system scope; link to #how-much-does-ui-ux-design-for-startups-cost (L20, L230, L249, L263, L271) | TRUE | Hub cost section. The anchor id follows sectionId() in components/sections/SemanticSections.tsx. The hub's $25k/$60k examples are not restated. |
| 35 | Nitro League: case study traces it "from idea to MVP launch plan"; work began with product discovery and stakeholder interviews, and the user flows were mapped from those (L232) | TRUE | nitro.md scope ("idea to product … MVP launch plan …") and The solution ("We started with product discovery and stakeholder interviews. From these we mapped the user flows"). nitro.md `services` includes this hub. The body does **not** mention the $5M. Orchestrator: the MOFU template box still prints "Play-to-earn racing game that secured $5M in 3 months" (brief siteFacts.conflicts). That is allowed because it is the case study's own result line, but it is your call. |
| 36 | "Every project begins with a free consultation and a fixed-scope proposal" (L249) | TRUE | about.md L30, word for word. |
| 37 | "In our practice, the MVP design mistakes that cause the most startup rework are…" (L236) | TRUE (labelled opinion) | No figure. It is scoped "in our practice", and the site states 200+ products since 2017. |
| 38 | Team size, who builds, honesty (whole post and SVGs) | TRUE | No designer count. No claim that we write production code or build the MVP. No Apex HCM, Fortna or ToolsGroup (grep: 0). No local office, award or testimonial. Every client verb is present tense or a case-study past tense taken from the case files. Note (not blocking): L34 "that a startup's developers can build" quietly assigns the build to the client, and home.ts FAQ says "We deliver design and development". The brief says stay silent, so the safer wording is "that developers can build". |
| 39 | Cover SVG: "6 steps from idea to tested screens" | TRUE | The post has 6 steps. |
| 40 | Illustrative labels | TRUE | The physiotherapy example is labelled at L59 ("illustrative startup"), on the cut sheet (SVG + panel "Illustrative, invented startup") and on the test plan (SVG + panel "Illustrative"). The flow-map alt says "illustrative". No unlabelled invented number was found. |

## Fixes (exact replacement text)

**F1 (L141, sentence 2), OUTDATED.** Replace
"The Apple Human Interface Guidelines and Material Design 3 each set a minimum touch target size for iOS and Android."
with
"The Apple Human Interface Guidelines set a default control size for iOS, and Material Design 3 sets a minimum touch target size for Android."
**F1b (L143 alt text).** Replace "annotated with minimum touch target sizes and the 4.5:1 body text contrast ratio" with "annotated with touch target sizes and the 4.5:1 body text contrast ratio".
(Optional, L149: "44×44 points (pt), the default control size".) No SVG text changes.

**F2 (L93 last sentence and L95), WRONG.** Replace "Two items survive any cut:" with
"Two items override the three questions:"
and replace the L95 bullet with
"- **Data deletion on request**, because the General Data Protection Regulation (GDPR) gives people in the European Union a right to erasure when you offer them your product, and the California Consumer Privacy Act (CCPA) gives California consumers a right to delete once a business passes its revenue or data thresholds."
(Owner conflict: industries/startups.json L178 has the same overstatement, "GDPR applies to any startup with EU users … so sign-up consent and data deletion belong in the MVP". Report it to the owner. Do not edit it in this run.)

**F3 (L98 and L222), WRONG vs hub.** Replace L98 with
"Founders defend every feature they wrote. On our startup engagement, the 5-day GV Design Sprint decides on 1 direction, and the user research step after it turns the interview findings into a prioritized feature list. Run the three questions on your own list first."
Replace L222 with
"1. **Design sprint (5 days):** map, sketch, decide on 1 direction, prototype and test with 5 users; drafts step 1."

**F4 (L197, last clause), WRONG in part.** Replace "it needs a paid plan with a Full or Dev seat." with
"it needs a Full or Dev seat on a Professional, Education, Organization, Government or Enterprise plan."

**F5 (L185 and L188), WRONG (internal).** Replace L185 with
"We treat 68 as one signal next to what users do, not as a pass mark on its own. After each round, pick one of three moves:"
Replace L188 with
"- **Move to the developer handoff** when users finish every task without help, the score is 68 or higher and no one says they would keep texting patients, because more rounds would polish rather than teach."
(L187 and L189 are unchanged, and the 5-user test plan SVG has no decision row, so no SVG change.)

**F6 (L121), link not allowed by the silo rule.** Replace with (link removed, quote kept exact)
"Mapping before screens is how we worked on Vocable, an AI content marketing SaaS we took from idea to MVP: we mapped the full creator journey and designed each screen around a problem we heard in stakeholder interviews."

**F7 (L191, sentence 1), WRONG scope.** Replace with
"Teams without time to recruit and moderate can hand testing to our [usability testing services](/services/usability-testing-services/), which include participant recruitment and moderated sessions."

Not blocking (recommended): L34 "that a startup's developers can build" → "that developers can build" (#38). L141 large-text qualifier for 1.4.3 (#21).

## Stale records / conflicts for the orchestrator

- Brief externalSources: the NN/g date "19 March 2000" should be **18 March 2000** (page metadata 2000-03-18).
- Brief externalSources and outline: "Apple … 44×44 pt minimum control size". The current HIG gives 44×44 as the default and 28×28 as the minimum.
- Owner conflict: industries/startups.json L178 (GDPR "applies to any startup with EU users", "sign-up consent") overstates the law. See F2.
- MOFU CTA box shows Nitro's $5M result (template). The body never ties it to MVP design.

## Edits withheld

No file in `content/blog/` or `public/blog/how-to-design-an-mvp/` was edited (fact-checker role rule; QA edits wording in parallel). None of the fixes touches SVG text.

VERDICT: FAIL
