# QA: how-to-design-an-mvp (BLOG day 2026-10-20, loop 1)

Post: `content/blog/how-to-design-an-mvp.md` (MOFU, hub `ui-ux-design-services-for-startups`, author faizan-khan).
Brief, visuals, the 7 SVGs and the parallel fact-check (`docs/content-system/fact-checks/how-to-design-an-mvp.md`, FAIL, F1–F7) were all read.
QA made the wording/structure edits listed in section 0 directly, as the orchestrator allowed. Facts were not touched.
The orchestrator committed them in 3003519. Line numbers below refer to the file after those edits.

## Gates

| Gate | Result |
|---|---|
| `SHOW_DRAFTS=1 npm run build` | exit 0 (run 3 times, last after every QA edit) |
| on-page (scratch copy of `out/`, noindex stripped, temp script copy deleted) | **100**, `failed: []`, before and after the edits |
| `npm run seo:check` (SHOW_DRAFTS) | 0 errors, 7 warnings. 6 are draft stubs or author pages. 1 comes from this post (hub anchor variety, see 7) |
| `npm run lint` | exit 0 |
| production `npm run build` + seo:check | exit 0, 86 pages, 0 errors, 0 warnings. Draft not live: no `out/blog/how-to-design-an-mvp/index.html`, 0 sitemap hits, 0 `href="/blog/how-to-design-an-mvp` in `out/**/*.html`. `out/` now holds the production build |

## 0. Edits QA made (in 3003519; old → new)

1. Intro (L26–30). The old intro copied ecommerce-ux-audit's 3-sentence shape: "[Entity (expansion)] starts with/as [device]…" + "This guide/checklist covers…" + "Our [hub] …". Rewritten to: "A minimum viable product (MVP) rests on one sentence with four blanks, and until each blank holds an answer, working out how to design an MVP screen by screen is guesswork:" … "Here is how to design an MVP in 6 steps, in order: write the hypothesis, cut the feature list, map user flows with their states, draw wireframes and then user interface (UI) screens, test with 5 users and hand off to developers. Our user experience (UX) team runs that sequence as a 4–8 week engagement within [UI UX design for startups](…)." The ordered step sentence also answers the queryVariants "how to design an mvp" and "mvp design process" on its own.
2. L36: deleted the restating sentence "MVP design includes everything from the hypothesis to the files developers build from."
3. L65: "so interviews ask … each user relies on today. We set the interview count at 5–8 Jobs to be Done interviews." → "so each interview asks … the user relies on today. We set the interview count at 5–8."
4. L71 bold: was 31 words, now 28: "A feature cut list sorts a startup's MVP features into keep, do by hand or later, …"
5. L93: "Two items survive any cut:" → "Two items survive the cut wherever they apply:". **F2 overlaps this; see the merged string in section 2.**
6. L121, Vocable: link removed (see 5). "AI"/"SaaS" were unexpanded, and the "journey ≠ flow" stretch is handled with the fact-checker's F6 wording: "Mapping before screens is how we worked on Vocable, an artificial intelligence (AI) content marketing platform we took from idea to MVP: we mapped the full creator journey and designed each screen around a problem we heard in stakeholder interviews." **F6 is applied by this edit.**
7. L141, sentence 1: "a rough prototype" → "a low-fidelity clickable prototype" (fixes the ambiguous word "prototype"), plus the replacement 6th link: "; our [startups UI UX design](/industries/startups/) work sizes each design output to the funding stage." Fact source: industries/startups.json "design work sized to the funding stage". Sentence 2 (F1's old string) is untouched.
8. L218 bold: "outside the sprint week" → "outside the design sprint week" (disambiguates "sprint"). L220: "five steps, and those five steps map" → "five steps that map".
9. L232: "Bring your cut sheet and hypothesis sentence to a first call with us, since the Keep column sets the flow count." (a second contact CTA 17 lines before the closing one) → "Block the founder review slots in your calendar before the design sprint starts."
10. L243 bullet: "…; start where the core job happens (step 2)" → "… before the core job is proven (step 2)" (FAQ 3 already gives that advice).
11. L247–249. The closing copied 2 recent shapes: ux-strategy-roadmap's "run the intro's test … send us X with that count", and usability-testing-cost's "… is one of the four price factors". Rewritten: "If your plan shows one of these, return to the step in parentheses before any code is written." / "If you would rather not work out how to design an MVP alone, [send us your feature list](/contact/) as it stands today, long or short. Every project begins with a free consultation and a fixed-scope proposal; in the consultation we sort your list into keep, do by hand and later, and size the 3–5 MVP flows that set the proposal's scope." (This is the leadAngle offer. The free-consultation sentence is the sanctioned about.md line and appears once.)
12. FAQ 2: "Each flow" → "Each user flow". FAQ 3: "diary" (British) → "schedule". Added "in the illustrative example". "the number of platforms is one of the four price factors" → "so it raises the price of the engagement". FAQ 5: "On this site, MVP design costs…" → "Our MVP design work costs… The number of MVP flows and platforms, the depth of user research and the scope of the starter design system decide where a project lands."

## 1. Intent & cannibalisation: PASS
How-to/planning intent. SERP page 1 is all how-to guides, so MOFU fits. No other page in `content/` targets "how to design an mvp". The hub and industries/startups own the service and stage intents, and no H2 restates a hub H2. is-discovery-phase-worth-it is not linked and not argued against.

## 4. Semantic SEO: PASS (after the edits)
- Title 57 chars, metaTitle 56 (built `<title>` 56), description 155 (built), ending on the next step "Then book a free consultation." (matches the MOFU CTA "Get a free consultation").
- Keyword sentences (swap test with "this plan"): H1 ✓; L26 "working out how to design an MVP screen by screen is guesswork" ✓; L30 "Here is how to design an MVP in 6 steps" ✓; L59, L125 (H2), L197, L249, FAQ 1 ✓. No keyword stacked before a noun. The only `vs` hit is the image caption/file name (brief-approved label).
- Density: 7 literal uses in about 2,500 open words = 1.4%. Rivals: core user flow 9, Figma 6 (≤ 12).
- Bold answers: 11/11, one sentence, 17–29 words. None opens with a digit or "Because".
- Banned phrases: 0. Hedges (might/may/could/perhaps): 0. Boolean FAQs: "Can…" → "Yes,", "Does…" → "Yes.".
- Abbreviations, checked with `<details>` stripped: MVP, UI, UX, GDPR, CCPA, WCAG, CSS, SUS and AI are all expanded at first open use. pt/dp are expanded in the panel.
- Entities 25/25, attributes 11/11 (label nouns printed literally), n-grams 12/12, all in open text with a fact.
- Concept bindings (rule 7): synonyms 4/4 (MVP design 14, minimum viable product design 1, MVP UX design 1, MVP UI design 2). Parent "UI UX design for startups" in the intro, "product design" in the definition. Children 6/6, each with an H2/H3. Related 6/6. Every H2 first sentence names MVP plus "core user flow" or "startup". Composites (System Usability Scale, GV Design Sprint, Figma Dev Mode, starter design system) are never split. Ambiguous words carry their context words (sprint fixed at L218; prototype fixed at L141). **Hub consistency: FAIL on F3** (the sprint does not produce the feature list; hub step 2 does). See section 2.
- QueryVariants, one answering sentence each: "how to design an mvp" / "mvp design process" → L30 ordered step sentence. "how to design ux for an mvp" → L104 "To design UX for an MVP, draw each user flow in FigJam…". "what does mvp design include" → L34 bold. "how long does it take to design an mvp" → L218 bold.
- Absolutes (`every/always/all/never/only/most`) tested against the post's rules. "survive any cut" fixed (edit 5, then F2). **"We treat 68 as a flag, not a pass mark" vs L188 "score is 68 or higher → handoff" is a contradiction: F5 (blocker).**

## 5. Internal links: PASS (after the edit)
Body: 6 internal links = MOFU minimum 6 (link-builder range 6–10).
1. L30 hub `/services/ui-ux-design-services-for-startups/` "UI UX design for startups" (early, < 300 words).
2. L141 `/industries/startups/` "startups UI UX design" (new, replaces Vocable).
3. L191 `/services/usability-testing-services/` (the one cross-hub link).
4. L230 hub `#how-much-does-ui-ux-design-for-startups-cost` "what a 4–8 week MVP design engagement costs" (the second hub link near the end; the id exists in the built hub).
5. L232 `/case-studies/nitro/` (hub-tagged).
6. L249 `/contact/`.

All targets exist in `out/`. Anchors vary, and none is "click here".

**Vocable decision (asked): link dropped, name kept.** vocable.md `services` = saas-ux-design, digital-product-design-services, web-app-design-services, ux-research-services. It never used this hub, so a DOWN link breaks the RULES silo rule ("case studies that used that service"), and the brief said "named once without a link". The sentence's facts are all vocable.md's ("from idea to MVP"; "We mapped the full creator journey and designed each screen around a problem we heard in stakeholder interviews", word for word). "Flow before screens" stretched a *journey* into flows, so F6's "Mapping before screens" frame is used. The 6th link is /industries/startups/, which the orchestrator offered. It is also the true source of the post's founder-time, investor-demo and pre-seed facts. The brief's "not linked, one link per concept" note is overridden by the MOFU minimum.

**Nitro $5M (asked):** the body never ties the $5M to MVP design. L232 uses only nitro.md scope and solution wording (grep `5M` in the post: 0). **The MOFU CTA box** (template, after H2 1) prints: "See how we did this for **Nitro League** — Play-to-earn racing game that secured $5M in 3 months. Want the same approach for your product? [Get a free consultation] [Read the case study →]". This is the case study's own result line, and Nitro is hub-tagged with "MVP launch plan" in scope, so QA accepts it. The orchestrator owns the call (brief siteFacts.conflicts).

**backlinkSuggestions (publish-day status):** #1 hub "ships the smallest product that tests 1 value proposition" (required): **not yet applied**. #2 skip (alternative to #1). #3 industries/startups.json "ship the smallest product that delivers the core job" (required): **not yet applied**. Orchestrator FIX at publish. Linking a draft from live pages before publish would 404. Today `grep -rln "/blog/how-to-design-an-mvp/" content/ | grep -v briefs` lists only the post.

## 6. Images: PASS
- 6 inline `figure.fig-wide` + figcaption + cover. viewBox 1200 × 700–796 (landscape), smallest text 38px, cover 1600×600. No `<image>`, no external hrefs, no brand assets.
- In-page at 1440: article 760px, images 760px wide, smallest text 24px. At 390: 354px (11.2px, as expected under the landscape rule). Cover at 390: 16:9 `object-fit: cover`, title and subtitle fully visible. The floating "Our services / Free consultation" bar seen in screenshots is a template overlay, not an image defect.
- Word-for-word, image vs panel: comparison 16/16 cells; cut sheet 5+3+4 = 12 items; flow map 6/6 steps with states; spec card 4/4 rows × 3 fields; test plan hypothesis, 3 tasks, observe, score (68 marker at 584 + 0.68 × 484 ✓); handoff 8/8. Spelling ✓, US "canceled" ✓. Alt, caption and file name name the same thing.
- **F1b** (fact-checker) changes the spec-card alt text only; no SVG text changes.

## 6b. Duplication: PASS
Every image's list or table lives only in its always-visible astext panel (built as `div.astext`; the only `<details>` are FAQ, nav and TOC). The open prose carries one sentence per key fact. The step 5 decision list is open text and is not in the image.

## 7. Readability: PASS
No paragraph over 4 sentences. US English ("diary" fixed). 5-gram overlap: hub 2.00%, industries/startups 1.02%, is-discovery-phase-worth-it 0.61%, every other post ≤ 0.44% (all < 12%).

**Word cap (asked):** open text (panels, alt and URLs stripped) is **2,498** words (2,248 before FAQs). Raw file is 3,315 tokens (was 3,335). The cap is not measured the same way across the site. The same counter gives published ux-strategy-roadmap 2,471 open words (fingerprint "words" 2,477, passed), and ecommerce-ux-audit 2,372 open / 3,328 raw for a recorded 2,200. By the writer's own calibration (about 3,330 raw tokens = 2,200), the post is at the cap. QA trimmed restatements, the duplicate CTA and FAQ padding. It did not cut further, because every remaining section carries a brief entity, attribute, serpGap or required FAQ (completeness owner rule). The mistakes bullets are 13–16 words each and already tight. F2/F3/F5/F7 will add about 45 words. That is acceptable at this parity, but the orchestrator should not add anything else.

## 7a. Competitor originality: PASS
Upsilon (beats) fetched with curl (HTTP 200, about 3,800 words). 5-gram overlap **0.20%**. Its outline (why quality → UX/UI types → 7 steps with personas → 5 tips → cost → FAQ) is not mirrored, and none of its examples are used. All 8 serpGaps are covered: hypothesis + activation signal, three-question cut rule + concierge MVP, states, platform and WCAG minimums, test plan with NN/g + SUS/MeasuringU + decision rule, handoff pack, the hub's 5-step timeline, and no dated or unsourced statistics.

## 7b. Silo & leads: PASS
services[0] = the hub, which exists. MOFU, serviceSupport 5 (≥ 4). New silo: this post is its MOFU starter. Hub ×2, 1 cross-hub, 1 hub-tagged case study, 1 industry page, no other silo's post. leadAngle: moment 1 (L98, changed by F3, which keeps the sprint), moment 2 (L158 starter design system inside the UI step), moment 3 (closing offer). No hard sell, no implied-client claims.

## 7c. Variety: PASS (after edits 1 and 11)
Fill-in hypothesis intro (new style), Step 1–6 H2 spine, 6 new visual types, the "send your feature list" CTA angle. It differs from the last 3 posts on 6 of 7 fields; only the type (Guide) matches ux-strategy-roadmap. QA put the intro and the closing/CTA lines side by side with the last 5 posts; the matching shapes are listed in edits 1, 9 and 11, and are now removed.

## 7d. Semantic completeness: PASS for QA items, pending the F-fixes
Every H2 and H3 follows bold answer → detail → example or number. Every section ends on a reader action (re-read after the edits: L53, L67, L98, L123, L158, L191, L214, L232, L247). FAQ answers have 2 sentences each. The intro promises 6 steps and the body delivers 6. All 5 takeaways are backed by sections. No TODO, no trailing sentence, no `<!--` comment.

## 7e. On-page checklist: PASS
Score 100, `failed: []`. Manual items: author faizan-khan + contributor umar-sarwar. 5 external sources, all loading per the fact-checker. Snippet formats: ol for steps, ul for lists, a table in the comparison panel. Every SVG is under 8 KB. Keyword in every meta surface. `keyword-volume` 150 (Ahrefs, 2026-10-20).

## 8. Build: PASS (see Gates)
The seo:check warning caused by this post: "/services/ui-ux-design-services-for-startups/ is linked with 3 different anchors". **Justified, not fixed.** The anchor is the brief's parent binding ("UI UX design for startups", rule 1), and RULES E1173 rule 4 asks for varied anchors.

## 2. Fact-checker fixes: QA concurs, they are blockers

The fact-checker's own verdict is FAIL. QA confirms F3 (a rule-7 hub conflict) and F5 (an internal contradiction) as QA failures too. Apply every fix as written in the facts report, except as noted below:
- **F1, F1b, F3, F4, F5, F7:** apply as written. Their old strings are untouched by QA's edits.
- **F2 (merged with QA edit 5):** replace "Two items survive the cut wherever they apply:" with "Two items override the three questions:". The L95 bullet replacement stays as written.
- **F6:** already applied by QA edit 6 (F6 wording plus "artificial intelligence (AI) content marketing platform" in place of "AI content marketing SaaS", and no link).
- FC's non-blocking #38 (L34 "that a startup's developers can build" → "that developers can build"): QA agrees. The H2 1 bold keeps its essential concept "core user flows".

## Guidance for the writer
No completeness gaps remain beyond the fact-checker's fixes, and the orchestrator can apply those mechanically. For loop 2, the writer only needs to check, after F2/F3/F5 land:
- [H2 Step 2 / L98] After F3, check that the paragraph still ends on the reader action "Run the three questions on your own list first." (keep it last), and that the lead moment still names the 5-day GV Design Sprint. About 45 words; no new facts.
- [H2 Step 5 / L185–189] After F5, make sure the three moves do not overlap. "Revisit the hypothesis" should still read as the case where users finish the tasks and the score holds, but they say they would keep texting. Keep each bullet to 1 sentence.

## FAIL list
1. F3: the sprint is credited with the feature cut and with "drafts steps 1 and 2", which contradicts hub steps 1–2 (rule 7). L98, L222.
2. F5: "68 as a flag, not a pass mark" is followed by a ≥ 68 handoff gate, and the handoff and revisit conditions overlap. L185, L188.
3. F1/F1b, F2 (merged), F4, F7: fact and scope errors per the facts report.

VERDICT: FAIL
