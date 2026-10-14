# QA report: ecommerce-ux-audit (round 1)

- Date: 2026-10-14 · Reviewer: content-qa · Post: `content/blog/ecommerce-ux-audit.md` at 904897f (clean tree)
- Gates run: `SHOW_DRAFTS=1 npm run build` exit 0 · `npm run seo:check` 0 errors, 6 warnings (all on draft stubs ai-ux-design, fintech-ux-design, generative-ai-ux and the author page; already there, not this post) · `npm run lint` exit 0 (jsx-ast-utils notices only) · `npm run onpage -- /blog/ecommerce-ux-audit/` **score 100, failed: []**
- Items 2–3 (facts, honesty) belong to the fact-checker. Every figure below is flagged only, never changed.

## Checklist

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Intent & cannibalisation | PASS | A store checklist with a buyer-side ending matches informational + commercial intent. No other `keyword`, `anchor` or `metaTitle` in `content/` targets "ecommerce ux audit" (grep). The hubs own "UX audit services" and "E-commerce UX design services", and the post never uses "UX audit cost", "UX audit report" or "checkout UX" as a heading. |
| 4 | Semantic SEO | FIX | All 9 bold answers are one sentence of 24–30 words (L157 sits at the limit of 30). Density is 1.38% on visible text with panels and 1.68% on prose only (12 uses). Keyword in 5/9 H2s (56%). No banned phrases and no hedges (might/may/could/perhaps: 0). Boolean FAQs open with Yes/No/Yes/Yes. Title 58 chars, metaTitle 51 (built), description 151 (built) and ends on "Then request a fixed-scope proposal" (BOFU). Abbreviations: UX, GA4, WCAG, PLP, PDP, SKU, LCP/INP/CLS, CSS, ADA, EU, FTC and CRO are all expanded on first visible use (GA4 and WCAG in takeaways 2 and 4). Defects: US English (F11), bold answer list punctuation (F4), H2 that hides "speed" (F6). |
| 5 | Internal links | PASS (exception) | 5 body links: hub L28 (first 300 words), ux-audit hub deep link L52 (the one cross-hub link), industry L115, hub #vs L231, /contact/ L233. All targets and ids exist in `out/`. Anchors are varied. 5 is accepted under the BOFU new-silo exception: no sibling post, no e-commerce case study, hub cap 2. External links: 5 (Baymard, web.dev, W3C, ada.gov, shopify.dev). |
| 6 | Images | FIX | 6 inline SVGs plus the cover, all in `public/blog/ecommerce-ux-audit/` (2–7 KB each). Each is a `figure` with a `figcaption`, and caption, alt text and file name name the same thing. Rendered at 540px on desktop (26px text shows at 17.5px) and 354px on mobile (about 11.5px, legible in screenshots). The mobile cover (16:9, `object-fit: cover`) crops only the decorative cart and phone icons; the title stays whole. No third-party brand assets. Defects: "catalogue" in the search sheet (D1), and the two-digit numbers 10–12 touch their checkboxes on the checkout card (D2). |
| 6b | Duplication | PASS | Every label in all 6 SVGs ticks off one-for-one against its `astext` panel (rendered as an always-visible div, 6×), with nothing dropped or changed. No third open-prose repeat. The data-pull bold answer names the 4 sets, which RULES requires as the open-prose key fact. |
| 7 | Readability | FIX | No paragraph runs over 4 sentences. 5-gram overlap: every post ≤ 0.49%, ecommerce hub 0.74%, ux-audit hub 0.95%, industry page 0.53% (all < 12%). Defects: F1, F3, F7, F8 and US spelling F11. |
| 7a | Competitor originality | PASS | Fetched shopify.com/blog/ecommerce-ux-audit directly (1,931 tokens). 5-gram overlap is **0.10%**: 3 grams, all proper names ("Nielsen's 10 usability heuristics", "Americans with Disabilities Act"). It has no benefits section, does not mirror the 5 steps or the tips list, and its FAQs use different questions and wording. All 8 serpGaps are covered: the WCAG 2.2 criteria and EAA, the 5-query search sheet starting from zero-result queries, Core Web Vitals thresholds tied to INP taps, the open-funnel data pull, severity × reach ÷ effort, self-audit blind spots, the Shopify theme/app/checkout setting, and Baymard 2025 data. |
| 7b | Silo & leads | PASS + flag | services[0] = ecommerce-ux-design-services. No other silo's post is linked. Funnel BOFU with service-support 5 meets funnel.json. I keep BOFU: MOFU would print a case-study CTA, and no e-commerce case study exists. Lead moments: (1) L73, (2) L204, (3) L231–233, all soft. **Flag (orchestrator/owner, do not change template):** the BOFU CTA box prints "Typical investment: $25,000–$60,000." (built HTML), while the post sells a $5,000–$15,000 audit (L231, takeaway 5). |
| 7c | Variety | FIX | Intro (60-second phone test), H2 frames, visuals and list style are new against `fingerprints.json`. **But the closing repeats the last BOFU post's shapes:** L235 "Your 60-second phone test finds the stalls; the checklist ranks them…" follows usability-testing-cost-per-participant's "Your usability testing cost per participant is where the bill starts; the round is the whole of it." L233 "[send us your X](/contact/) with Y, so Z" follows its "[Send us your audience and number of rounds](/contact/) with each user group…, since…". See F9 and F10. "Every project begins with a free consultation and a fixed-scope proposal" is the orchestrator-sanctioned clause and appears exactly once, so it is an owner note, not a FIX. |
| 7d | Completeness | FAIL | Gaps G1–G3 below. There are also two contradictions: F5 (checkout "comes fifth, not first" vs L58 "then the checkout") and F7 (bringing in auditors when a store "needs more than an audit"). |
| 7e | On-page | PASS | Score 100, no fails (keyword-volume, meta-keywords-keyword, og-keyword, entity-coverage, attribute-coverage, entity-salience, no-hidden-content, figure-caption, h2-then-text, table-intro all pass). Manual items: the author (Talha Saleem) and contributor have roles and LinkedIn; snippet-ready answers; images < 150 KB; `updated` is correct. All 12 attributes appear with their label nouns, and all 24 entities appear with a fact (Hotjar/Clarity: filter to the worst step, Clarity is free; Shopify: the plan limits in FAQ 4). Image placement by eye: the data-pull image follows the GA4 paragraph instead of the paragraph it explains (F2). |
| 8 | Build | PASS | See gates above. FAQPage JSON-LD: all 5 `acceptedAnswer.text` hold only their answer, with the closing paragraph not swallowed. No `<!--` comments in the source or HTML. |

### Keyword-sentence checks (lessons 2026-10-07/08/09/10)

- Title/H1 "E-commerce UX Audit Checklist: What to Check, Score and Fix" reads naturally. First sentence "An e-commerce UX audit (…) starts with a test you can run on your own phone in 60 seconds" passes the "this service" swap. The description reads naturally, and its next step "Then request a fixed-scope proposal" matches BOFU.
- Stacks: "e-commerce UX audit checklist" (allowed secondary), H2 L183 "…e-commerce UX audit findings" and H2 L218 "…an e-commerce UX audit quote". That makes 2 stacks, within the brief's cap of 2, and both are the brief's own outline H2s and ordinary compound nouns ("audit findings", "audit quote"). **Kept on purpose:** rewording them drops keyword H2s to 3/9 = 33%, below the 40% salience rule. Researcher note in learnings.
- `vs` grep: 0 hits. Bold or sentence opening with a digit: 0. `**Because`: 0.
- Every/always/all/never hits tested against the post: L58 "every buyer passes" the checkout (true), L77 "every store" (method), L110 "never fails silently" (design goal), L181 "never an overlay widget" (policy), L157/takeaway 4/FAQ 2 "every audited template" (consistent with "templates, not every page"). L26 "a full audit scores every step" is consistent once G1 is closed (order confirmation currently has no checks).
- Shared-verb pairs in bold answers with 3 or more items: L56, L99, L157, L208 and L220 all hold.

## FIX list (exact old → new; orchestrator applies)

**F1 · L52 (dangling pointer, the anchor reads as a place)**
- old: `The general method sits in [what a UX audit includes on any product](/services/ux-audit-services/#what-does-a-ux-audit-include); read your worst step's section first.`
- new: `The audit method itself, from heuristics to session recordings, is laid out in [what a UX audit includes on any product](/services/ux-audit-services/#what-does-a-ux-audit-include); this post adds the store layer on top.`

**F2 · L62–71 (image–text fit):** move the whole block, from `![Pre-audit data pull card…` through its closing `</details>`, so it sits directly after L58 (`These numbers set the audit scope: … which every buyer passes.`) and before `In GA4, build the funnel exploration…`. Keep one blank line on each side.

**F3 · L73, second sentence (44 words; "access arrives at kick-off, in the first 1–2 days" is unclear) plus the missing next step (owner rule)**
- old: `On our audits, analytics access arrives at kick-off, in the first 1–2 days and well before scoring, which leaves time to confirm the tags: a purchase event that fires twice on reload makes a healthy step look broken.`
- new: `On our audits, we ask for analytics access at kick-off and check the e-commerce tags in the first 1–2 days, before trusting any drop-off number: a purchase event that fires twice on reload makes a healthy step look broken. Before kick-off, open your own funnel exploration on mobile and note the step with the steepest drop.`
- Fact-checker owns the "1–2 days" figure. If they change it, keep this sentence shape.

**F4 · L119 bold answer (the appositive reads as a six-item list)**
- old: `**The 12 checks fall into four groups, cost, account, form and trust, and the first asks whether shoppers see the total cost before the payment step.**`
- new: `**The 12 checks fall into four groups (cost, account, form and trust), and the first asks whether shoppers see the total cost before the payment step.**`

**F5 · L153, last sentence (contradicts L58, which audits the checkout second)**
- old: `A checkout UX audit alone misses everyone who never reaches the cart, so these checks come fifth, not first.`
- new: `A checkout UX audit alone misses everyone who never reaches the cart, so the checklist covers search, listing and product pages as well.`

**F6 · L155 H2 (the section covers speed and the bold answer names it, but the heading drops it; brief question "accessibility and page speed")**
- old: `## How does an e-commerce UX audit cover mobile and WCAG 2.2?`
- new: `## How does an e-commerce UX audit cover mobile, speed and WCAG 2.2?`
- No link targets this id.

**F7 · L216 (self-contradiction: "bring in evaluators" when a store "needs more than an audit")**
- old: `Bring them in when findings will decide a redesign budget, or when a store shows signs it needs more than an audit, such as cart abandonment rising while traffic and prices hold.`
- new: `Bring them in when findings will decide a redesign budget, or when cart abandonment rises while traffic and prices hold.`

**F8 · L231 (attribute labels stacked: "Our e-commerce UX audit has an audit price … and an audit duration", 3× "audit")**
- old: `Our e-commerce UX audit has an audit price of $5,000–$15,000 and an audit duration of 2–3 weeks, per the hub's [comparison of an audit with a full e-commerce redesign](/services/ecommerce-ux-design-services/#e-commerce-ux-design-vs-ux-audit).`
- new: `Our audit price is $5,000–$15,000 for an audit duration of 2–3 weeks, as published in the hub's [comparison of an audit with a full e-commerce redesign](/services/ecommerce-ux-design-services/#e-commerce-ux-design-vs-ux-audit).`
- Keeps both attribute labels and the figures. Density after the fix is 11 uses, about 1.5%.

**F9 · L233, last sentence (repeats usability-testing-cost-per-participant's CTA shape)**
- old: `Either way, [send us your store URL and platform](/contact/) with your funnel exploration, so the scope starts from your own drop-off numbers.`
- new: `Either way, the scope starts from your own drop-off numbers: [send us your store URL and platform](/contact/) and attach the funnel exploration.`

**F10 · L235 closing (repeats the "Your X …; the Y …" closing of usability-testing-cost-per-participant; "the checklist ranks them" is also wrong, because scoring ranks)**
- old: `Your 60-second phone test finds the stalls; the checklist ranks them, and our e-commerce UX design work starts with the templates that score worst.`
- new: `After the first sprint of fixes, repeat the 60-second phone test on mobile data. Any stall it still finds goes to the top of the next audit scope.`

**F11 · US English: "catalogue" → "catalog" (4×)**
- L79 `the catalogue misses` → `the catalog misses`
- L88 `The same results as the catalogue term` → `The same results as the catalog term` (must match D1)
- L208 `catalogue search terms` → `catalog search terms`
- L213 `**Catalogue vocabulary:**` → `**Catalog vocabulary:**`

**F12 · Takeaway 5 ("On this site" reads as if the site is audited)**
- old: `"On this site, an audit takes 2–3 weeks and costs $5,000–$15,000, the range published on the e-commerce hub."`
- new: `"Our store audit takes 2–3 weeks and costs $5,000–$15,000, the range published on our e-commerce UX design page."`

**F13 · FAQ 2 L245 ("above" dangles in the FAQPage snippet)**
- old: `Yes. Each audited template is checked against WCAG 2.2 level AA, including the checkout criteria above. A full-site accessibility audit of every page is quoted separately.`
- new: `Yes. Each audited template is checked against WCAG 2.2 level AA, including Redundant Entry for billing addresses and Focus Not Obscured for sticky bars and chat widgets. A full-site accessibility audit of every page is quoted separately.`

**F14 · FAQ 5 L257 ("The hub" is unclear in a stand-alone snippet)**
- old: `The hub names a move from a custom store to Shopify as a trigger for outside design help.`
- new: `Our e-commerce UX design page lists a move from a custom store to Shopify as one trigger for outside design help.`

### Designer fixes (content-visual-designer)

- **D1** `search-query-test-sheet.svg`: `The same results as the catalogue term` → `The same results as the catalog term` (US English, must match F11).
- **D2** `checkout-pass-fail-card.svg`: the numbers 10, 11 and 12 collide with their checkbox and item text ("☐10Entered…" at 540px). Right-align the numbers in a fixed-width column, or shift the item text right by about 8px for all rows, so the one-digit and two-digit rows line up. Re-screenshot at 1440 and 390.

### Orchestrator items

- **O1 (flag only, known open item):** BOFU CTA box `app/blog/[slug]/page.tsx` L108 prints the hub `priceRange` "$25,000–$60,000" on a post that sells the $5,000–$15,000 audit. Not changed. Owner decision.
- **O2 backlinkSuggestions status:**
  1. `content/services/ecommerce-ux-design-services.json` "E-commerce UX design vs UX audit" answer (required): **pending, apply in the publish commit**, since a hub link to a draft would 404 in production. Old: `Stores without funnel evidence start with the UX audit, then redesign the weakest templates.` New: `Stores without funnel evidence <a href=\"/blog/ecommerce-ux-audit/\">start with the UX audit</a>, then redesign the weakest templates.`
  2. `content/services/ux-audit-services.json` "What is a UX audit?" body (required): **pending, apply in the publish commit**. Old: `A website UX audit and an app UX audit follow the same method; only the platform guidelines change.</p>` New: `A website UX audit and an app UX audit follow the same method; only the platform guidelines change. For online stores, our <a href=\"/blog/ecommerce-ux-audit/\">e-commerce UX audit checklist</a> shows the store-specific checks, from site search to guest checkout.</p>`
  3. `content/industries/ecommerce.json` (skip): **skipped**, with the brief's reason (that sentence already carries the hub link). `links:find` (run by QA, 2026-10-14) found no other page that mentions the keyword.
  - At publish: `grep -rln "/blog/ecommerce-ux-audit/" content/ | grep -v briefs` must list both service JSONs.
- **O3 at publish:** prove draft/production state with `out/blog/ecommerce-ux-audit/index.html`, the sitemap entry and the `href="/blog/ecommerce-ux-audit` hits. Note: `out/` currently holds the SHOW_DRAFTS build.

## Guidance for the writer

- **G1 [H2 "Which 12 checkout checks belong in an e-commerce UX audit?" / after the L153 paragraph]**: the intro (L26), the cover and the funnel map promise "every step … to the order confirmation", but no section checks the confirmation page. Add 2 sentences: the confirmation page repeats the order number, delivery date and items; it offers the account from check 4 (password only, details kept); and support tickets tagged "where is my order" flag it (from the map row "Order summary / Support tickets"). No new statistic. Target 35–45 words.
- **G2 [H2 "Which listing and product page checks find the leaks?" / both lists]**: the brief's outline points "sort order" (PLP) and "review display" (PDP) are missing as checks. Reviews appear only as the FTC rule. Add one bullet to each list in the same "**Item** does X, so/because Y" shape. PLP: sort order defaults to something shoppers choose (for example best-selling or price) and survives filtering. PDP: the rating and review count sit near the price, and reviews can be filtered by the size or fit they mention, which ties to the "wrong size" return tag. Target about 20 words each. Keep the FTC sentence as is.
- **G3 [H2 "Which store data should you pull before the audit starts?" / section end]**: the section ended without a reader next step (owner rule). F3 closes this. If the orchestrator changes F3, the new text must still end on a reader action.

## Fact-checker handoffs (flag only, not changed)

L34 "Most come from Baymard Institute research" (the share of store rules) and "browsers included". L73 "first 1–2 days". L121 and L153 Baymard figures. L187 "two senior UX designers" (hub wording, the brief's conflict note). L233 "45-minute UX audit session" (home.ts L93 wording matches, and it is not called free).

VERDICT: FAIL
