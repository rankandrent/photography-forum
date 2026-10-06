# QA: saas-product-redesign

- Date: 2026-10-06
- Reviewer: content-qa
- Post: `content/blog/saas-product-redesign.md` (draft, 2,175 body words)
- Brief: `content/briefs/saas-product-redesign.json` (+ `.visuals.json`)
- Images: `public/blog/saas-product-redesign/` (cover + 4 inline SVGs)
- Items 2–3 (facts, honesty) are covered by the fact-checker in `saas-product-redesign.facts.md` and are not reviewed here.

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Intent and cannibalisation | PASS |
| 4 | Semantic SEO | FIX (F1, F2) |
| 5 | Internal links | PASS |
| 6 | Images | **FAIL** (X2: decision tree logic and footer) |
| 6b | Image vs table/list duplication | **FAIL** (X1: rollout-exposure-curve.svg) |
| 7 | Readability and cross-post repetition | FIX (F3, F4) |
| 7a | Competitor originality | PASS (judged from snippets; fetch blocked) |
| 7b | Silo and leads | FIX (F5: funnel stage) |
| 7c | Variety | PASS |
| 8 | Build | PASS |

## 1. Intent and cannibalisation: PASS

- "saas product redesign" is commercial investigation / planning. The post scopes, tests, rolls out and measures a redesign, which matches it.
- No other page targets it. I grepped every title, metaTitle, h1 and keyword in `content/` and `src/`; the phrase "saas product redesign" or "saas redesign" appears only in this post. The hub owns "saas ux design" and its price block; the post mentions price once (line 76) and does not compete for cost. The web-app-design FAQ "Can you redesign an existing web app in phases?" is not used as a heading.

## 4. Semantic SEO: FIX

Passing:
- Bold one-sentence answer under all 9 content H2s, 26–30 words each (two at exactly 30: "Which metrics…" and "Which users…"; at the limit, accepted).
- Lengths: title/H1 61 chars (45–70), metaTitle 54 chars (keyword first, no brand), description 156 chars (140–158).
- Keyword in title, slug, H1, metaTitle, description and first sentence. Density by word share: "SaaS product redesign" 8× (1.1%) plus "SaaS redesign" 6× = 1.66% for the central entity; inside 1–2%, not stuffed.
- Brief n-grams all present (ui refresh, UX redesign as "user experience (UX) redesign", onboarding flow, core workflows, activation rate, churn spike, power users, old UI, feature flag, rollout, baseline metrics). All 24 brief entities present (WCAG 2.2 as "Web Content Accessibility Guidelines (WCAG) 2.2").
- Expanded: SaaS, UI, UX, B2B, SUS, WCAG.
- Boolean FAQs: the three "Should/Do you…" answers start Yes/No.
- No banned phrases, no hedges (might/may/could/perhaps), US spelling (color, help-center).
- Built FAQPage JSON-LD: each acceptedAnswer holds only its own answer (no trailing content). One H1, robots index,follow.

FIX:
- **F1 (line 54) HEART is an unexpanded acronym.** Replace
  `Use the goals-signals-metrics process from the [Google HEART framework (Rodden, Hutchinson and Fu, 2010)](https://research.google.com/pubs/archive/36299.pdf) to pick one goal, one signal and one metric per stage.`
  with
  `Use the goals-signals-metrics process from the [Google HEART framework (Rodden, Hutchinson and Fu, 2010)](https://research.google.com/pubs/archive/36299.pdf), which covers happiness, engagement, adoption, retention and task success, to pick one goal, one signal and one metric per stage.`
- **F2 (line 76) awkward opener.** Replace `On our pricing, an onboarding redesign` with `At our rates, an onboarding redesign`.

## 5. Internal links: PASS

- 7 in-body internal links (6–12): hub ×2 (line 39, ~170 words in, and line 160), ToolsGroup case study, `/industries/saas/`, `/services/usability-testing-services/` (the single cross-hub link), TradeZella case study, `/contact/`. All targets exist in `out/`.
- Anchors are varied, no exact-match repeats, no "click here". No links to other silos' posts. The BOFU link discipline in the brief is respected.

## 6. Images: FAIL

Passing for all five files: they exist in `public/` and `out/`, have descriptive alt text, contain no `<image>`/external href or third-party brand assets, and the spelling is clean. Rendered in the built page (served `out/` on :4313, Playwright, each image scrolled into view):
- Inline images are drawn at 800 wide with 26–40px text. Rendered at 712px on 1440 desktop (×0.89, smallest text ≈ 23px) and 354px on 390 mobile (×0.44, smallest text ≈ 11.5px). Legible at both.
- Cover: `.pcover` is 21:8 at 1440 and 16:9 at 390 with `object-fit: cover`. Screenshots at both widths show the full title, kicker and subtitle; only side line-art is cropped on mobile. PASS.

**X2 FAIL: `scope-decision-tree.svg` gives wrong advice and makes a false pointer.**
- Branch logic: "Is the cause confined to 1 journey?" No → "Do several lifecycle stages leak?" No → "Not a redesign: price, positioning or a missing integration". A product whose problem spans several journeys inside one stage (for example, retention falling across 3 core workflows) is told it is a pricing problem. This contradicts the post, which says the not-a-redesign case is when churn interviews name price or integrations (line 58) and when users cannot show the cause is UX (line 43).
- The footer says "Durations and prices: see the table below", but the table holds durations only. Prices are in the prose at line 76.
- Owner: content-visual-designer. Redraw: "Which metric stalled?" → "Can users show the cause is UX (funnel step, recordings, tickets)?" No → "Not a redesign: price, positioning or a missing integration"; Yes → "Is the cause confined to 1 journey?" Yes → Flow fix; No → "Can navigation, roles and components still hold the product?" Yes → Lifecycle redesign; No → Platform rebuild. Footer: "Durations: see the table below". Keep the 800-wide viewBox with ≥ 26px text.
- Then replace the alt text on line 66 with:
  `![Decision tree that starts at "Which metric stalled?": if users cannot show the cause is UX, it is price, positioning or a missing integration rather than a redesign; if the cause is confined to 1 journey, flow fix; if navigation, roles and components can no longer hold the product, platform rebuild; otherwise lifecycle redesign](/blog/saas-product-redesign/scope-decision-tree.svg "Walk the scope decision with your own data")`

## 6b. Duplication: FAIL

**X1 FAIL: `rollout-exposure-curve.svg` (line 137) restates the numbered list at lines 127–133.** Every label on the image is already in the list or the sentence under it: 10% / 25% / 50% example ramp (step 3), 100% (step 4), "Gate: baseline metrics hold" (each step's Gate), "Old-UI toggle on" (steps 2–4), "Sunset … Old UI removed on the published date" (step 5), and "Rollback trigger fires: flag steps back, no new deploy" (line 133, near verbatim). Changing the axis to exposure over time does not add a fact the list lacks. The owner rule says image vs list repetition is a FAIL.
- Fastest fix (orchestrator): delete line 137 and the blank line before it, and remove the third entry from `saas-product-redesign.visuals.json`. 3 inline visuals remain (2–4 is the rule).
- Alternative (designer): replace it with a visual of what the list cannot show, the metric against its thresholds. Plot one metric line (e.g. completion rate) over time with the baseline, target band and rollback-trigger line, and the exposure steps beneath it. Show the step back where the metric crosses the trigger. Use no step names and no percentages from the list.

Checked and OK: the decision tree vs the scope table (the tree carries the questions; the table carries what changes, who feels it and duration, so different items). The risk matrix and the before/after flow sit next to prose only.

## 7. Readability: FIX

- No paragraph over 4 sentences. Short sections, two tables, a numbered list and a bullet list make the post scannable. US English.
- 5-gram overlap: 0.23% with choose-ux-research-agency, 0.00% with ai-ux-design, fintech-ux-design and generative-ai-ux, 0.87% with the hub `saas-ux-design.json` (the price sentence on line 76 paraphrases the hub, which the brief allows once), 0.36% with `industries/saas.json`, and 0.46% with `web-app-design-services.json`. 1.23% combined, well under 12%.
- The shared 5-grams with choose-ux-research-agency are its CTA formula and its NN/g lead-in. Fix both so closings and source lead-ins are not reused across posts:
- **F3 (line 160) closing reuses the previous post's CTA ("free consultation … fixed-scope proposal").** Replace
  `The free consultation returns a scope tier, a baseline-and-rollout plan and a fixed-scope proposal, run as the discovery step of [our SaaS UX design sprint](/services/saas-ux-design/).`
  with
  `You get a scope tier, a baseline-and-rollout plan and a fixed price inside our published ranges, run as the discovery step of [our SaaS UX design sprint](/services/saas-ux-design/).`
  (This matches the brief's leadAngle "fixed price inside the hub's ranges". If the fact-checker rejects "fixed price", keep the original sentence.)
- **F4 (line 117) reused lead-in.** Replace `Nielsen Norman Group's guidance is that [5 users find most usability problems in a qualitative round](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/), and that 3–4 per group suffice` with `Per Nielsen Norman Group, [5 users find most usability problems in a qualitative round](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/), and 3–4 per group suffice`.

## 7a. Competitor originality: PASS (numeric overlap not computable)

- WebFetch of `https://www.eleken.co/blog-posts/product-redesign` returned EGRESS_BLOCKED. A WebSearch snippet gives its structure: diagnose → scope (UI refresh vs UX overhaul vs rebuild) → research plan → prototype/test → manage resistance → launch → iterate, with the Icons8 example. I could not compute a 5-gram percentage.
- Heading order: both follow a project's natural chronology. The post differs: it opens with a definition and myth, puts at-risk segments before testing, adds a mistakes section, and frames every H2 around metrics and thresholds. The scope tiers use our own wording (flow fix / lifecycle redesign / platform rebuild), and there are no famous-brand examples. Not mirrored.
- serpGaps covered: lifecycle metric → scope (table + tree), decision path with weeks and budget, workspace admins, separate tests for existing vs new users, gated rollout with rollback triggers, change aversion vs a worse design with the GV source, SaaS specifics (trial-to-paid, renewal window, plan comparison, saved views), no unsourced uplift numbers. The post covers more than the `beats` page.

## 7b. Silo and leads: FIX

- services[0] = saas-ux-design (correct hub). Silo rules are respected: hub early and near the end, one cross-hub link, an industry page, case studies, no other-silo posts. Service-support 5.
- leadAngle is delivered twice, naturally (line 78 in scope, line 160 after measurement), with no hard sell.
- **F5 funnel stage.** `funnel: bofu` does not match the keyword. All 6 SERP pages in the brief (`beats` + `alsoOutranks`) are how-to and best-practice guides. funnel.json defines MOFU as "Teams comparing approaches or planning the work" and gives BOFU examples of cost, choosing an agency and pricing. The post is a planning guide with two short offers. Replace `funnel: bofu` with `funnel: mofu` in the frontmatter, and update the brief `funnel` and the ledger. The silo's first BOFU post is then still open: the next saas-ux-design post should be BOFU. If the orchestrator keeps BOFU, record the reason in the brief `notes`.

## 7c. Variety: PASS

Compared with fingerprints.json (choose-ux-research-agency, the only entry and the last site-wide post): intro (myth vs scenario), H2 frames, section order and visual types (decision tree / 2x2 / exposure chart / before-after vs checklist / scorecard / red-flag / proposal / timeline) all differ. That is 4 dimensions, which meets the rule. Type (Guide) and table/list style overlap. The CTA angle was close to the previous post ("send X → free consultation + fixed-scope proposal"), which F3 fixes. No reused intro.

## 8. Build: PASS

- `SHOW_DRAFTS=1 npm run build`: exit 0, `/blog/saas-product-redesign` prerendered.
- `npm run seo:check`: 79 pages, 0 errors, 7 warnings, none from this post. One site-level warning says `/industries/saas/` is linked with 3 different anchors, which is intentional anchor variety.
- `npm run lint`: exit 0. Only jsx-ast-utils TSNonNullExpression notices, no errors.

## FAIL list

1. X1: `rollout-exposure-curve.svg` repeats the numbered rollout list and line 133 (owner rule). Delete line 137 or redraw as a metric-vs-threshold chart.
2. X2: `scope-decision-tree.svg` routes "multi-journey, single-stage" problems to "not a redesign" and claims prices are in the table. Redraw per section 6 and update the alt text.

VERDICT: FAIL

---

# Round 2 (re-review after repair round 1)

- Date: 2026-10-06
- Reviewer: content-qa
- Scope: QA F1–F5, X1 and X2 repairs, all images and the cover in the built page at 390px and 1440px, bold answers, FAQ schema, links, build.
- Owner rule 2026-10-06 (`<details class="astext">`) applies to new posts. Per the orchestrator, this post is not failed for visible tables without images.

## Summary

| # | Check | Round 2 |
|---|---|---|
| 1 | Intent and cannibalisation | PASS (unchanged) |
| 4 | Semantic SEO | PASS (F1, F2 applied) |
| 5 | Internal links | PASS |
| 6 | Images | PASS (X2 fixed); FIX R2-F2, R2-F3 housekeeping |
| 6b | Duplication | PASS (X1 fixed: rollout image removed) |
| 7 | Readability | PASS (F3, F4 applied); FIX R2-F1 formatting |
| 7a | Competitor originality | PASS (unchanged) |
| 7b | Silo and leads | PASS (F5 applied: `funnel: mofu` in post and brief) |
| 7c | Variety | PASS |
| 8 | Build | PASS |

## Round 1 fixes

- F1 applied (line 54): HEART expanded as "happiness, engagement, adoption, retention and task success".
- F2 applied (line 76): "At our rates, an onboarding redesign…".
- F3 applied in a different wording (line 157): "A free consultation ends in a fixed price inside our published ranges, and discovery in [our SaaS UX design sprint](/services/saas-ux-design/) starts by recording your baseline." The 5-grams shared with choose-ux-research-agency are now only a URL, the NN/g URL and "software as a service (SaaS)"; the CTA formula is gone. Accepted.
- F4 applied (line 117): "Per Nielsen Norman Group, …".
- F5 applied: `funnel: mofu` in the frontmatter (line 13) and the brief (`"funnel": "mofu"`).
- X1 fixed: the rollout image is gone from the post and from `.visuals.json` (3 inline visuals remain, inside the 2–4 rule).

## X2 decision tree: PASS

I walked every root-to-leaf path in the built page and compared each one with the post:
- Cause is not UX → "Not a redesign: price, positioning or a missing integration". This matches line 43 ("users can show you why") and line 58 (churn interviews name price, positioning or an integration). It is now the only route to that leaf.
- UX, confined to 1 journey → Flow fix. Matches line 62 and line 64 (trials stall in setup, one journey).
- UX, more than 1 journey, structure fails → Platform rebuild. Matches line 64 ("only when navigation, user roles and components can no longer hold the product").
- UX, more than 1 journey, structure holds → Lifecycle redesign. Matches line 62 and line 64 (two stages leak).
- The false footer pointer ("Durations and prices: see the table below") is gone, and the image has no table pointers. Its labels are questions and tier names. The table carries what changes, who feels it and duration, so nothing is duplicated.
- The alt text on line 66 describes all four outcomes in the order the tree resolves them. Accurate.
- Rendering: 712px wide at 1440 (×0.89, smallest text 26px → 23px) and 354px at 390 (×0.44 → 11.5px, the same scale accepted in round 1). Legible at both widths, with no spelling errors. Tightest fit: "Not a redesign:" ends at x 761 in a box that ends at 772. It is inside the box, but redraws should keep at least 16px right padding.

## Images and cover in the built page: PASS

I used Playwright and scrolled each image into view; all loaded (`complete`, `naturalWidth` > 0).
- Cover: `.pcover` is 21/8 at 1440 (1224×466) and 16/9 at 390 (354×199), with `object-fit: cover`. At both widths the kicker, the 3-line title and the subtitle are fully visible. Only the side line-art is cropped on mobile. PASS.
- `redesign-risk-matrix.svg` and `setup-flow-before-after.svg` are unchanged since round 1. Both are legible at 712px and 354px, and their alt text matches the drawings (after = sign-up + 2 screens + first value moment).
- All images exist in `public/` and `out/`, with no external or brand assets.

## Semantic SEO, schema, links: PASS

- Bold answers under all 9 H2s are 26–30 words, one sentence each ("Which metrics…" and "Which users…" are exactly 30, accepted as in round 1).
- Keyword: "saas product redesign" 8× + "saas redesign" 6× in 2,179 words (1.6% for the central entity).
- Built FAQPage JSON-LD has 5 Q/A pairs. Each `acceptedAnswer.text` holds only its own answer. The boolean answers start Yes/No/No. One H1.
- Internal links: 7 in body (hub ×2, at ~170 words and in the closing; ToolsGroup; `/industries/saas/`; usability testing; TradeZella; `/contact/`). All targets exist in `out/`, and anchors are varied.
- 5-gram overlap: ≤ 0.92% against any single page (highest is the hub `saas-ux-design.json`, which shares the allowed price line and the HEART expansion). Well under 12%.

## Build: PASS

- `SHOW_DRAFTS=1 npm run build`: exit 0, `/blog/saas-product-redesign` prerendered.
- `npm run seo:check`: 79 pages, 0 errors, 7 warnings. None come from this post apart from the site-level `/industries/saas/` anchor-variety note.
- `npm run lint`: exit 0. Only the known jsx-ast-utils TSNonNullExpression notices.

## FIX (non-blocking, orchestrator applies)

- **R2-F1 (lines 135–136) missing blank line before an H2.** Removing the rollout image left `…ask what made them switch.` immediately followed by `## Which redesign mistakes turn into churn?`. It renders correctly as an H2, but a blank line is the house markdown style. Replace
  `When someone switches back to the old UI, ask what made them switch.\n## Which redesign mistakes turn into churn?`
  with
  `When someone switches back to the old UI, ask what made them switch.\n\n## Which redesign mistakes turn into churn?`
- **R2-F2 orphan image.** `public/blog/saas-product-redesign/rollout-exposure-curve.svg` is still on disk and is copied to `out/blog/saas-product-redesign/rollout-exposure-curve.svg`, so it ships publicly while no page uses it. Delete `public/blog/saas-product-redesign/rollout-exposure-curve.svg`.
- **R2-F3 stale marker in `content/briefs/saas-product-redesign.visuals.json`.** The decision-tree `marker` still describes the old, wrong logic ("Do several lifecycle stages leak?"). Replace the marker value with:
  `<!-- visual: decision tree. Start at "Which metric stalled?" → "Can users show the cause is UX?" no → "Not a redesign: price, positioning or a missing integration"; yes → "Is the cause confined to 1 journey?" yes → flow fix; no → "Can navigation, roles and components still hold the product?" no → platform rebuild; yes → lifecycle redesign. Leaf nodes show tier names only, no durations or prices. -->`

## FAIL list

None. X1 and X2 from round 1 are resolved.

VERDICT: PASS
