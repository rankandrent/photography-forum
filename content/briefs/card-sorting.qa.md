# QA: card-sorting (2026-10-24, loop 1)

Post: `content/blog/card-sorting.md` · Brief: `content/briefs/card-sorting.json` · Visuals: `card-sorting.visuals.json` (5 inline + cover).
Caller allowed direct edits to this post only. **Every fix below is already applied by QA. Do not reapply.** The parallel fact-check
(`docs/content-system/fact-checks/card-sorting.md`, on disk 05:32) F1–F7 are also applied verbatim by QA in the same pass (none of them
collided with a QA edit). Do not reapply them either. Frontmatter `qa:` untouched. Funnel TOFU is the orchestrator's decision (the brief still says `mofu`; the orchestrator should record the relabel in the brief).

Gates after the final edit (SHOW_DRAFTS=1 build, drafts rendered): build 0 errors · `npm run onpage -- /blog/card-sorting/` **100, failed []** ·
`npm run seo:check` 0 errors, 7 warnings, none on /blog/card-sorting/ (the ux-research-methods link resolves because the pillar is built with draft false) ·
`npm run lint` 0 errors. `git checkout docs/content-system/locked-pages.json` run after every seo:check (it added 6 draft routes each time; restored, the file is clean).
Note: `out/` now holds a SHOW_DRAFTS build, so rebuild without it before deploy.

## 1. Intent & cannibalisation: PASS
Informational "card sorting" (1,300/KD 15, Ahrefs 2026-10-24), method guide that matches the SERP. No other page in `content/` has it as keyword, metaTitle or H2. The pillar
ux-research-methods stays cross-method and links here ("how open, closed and hybrid card sorting work"). Numbers agree with the pillar and the hub: 30–50 cards (NN/g),
at least 15 participants per user group (Nielsen 2004 / NN/g), 30–50 participants quantitative and in our program, 3–6 day recruitment, 4–8 day evaluative studies, 90-minute readout, $25,000–$60,000.
No duplicate FAQs between the two posts (pillar: AI, 5-user rule, three types of user testing, five steps, methods per study; here: qual/quant, session length, remote, limits, wireframes, sorts per redesign).

## 2–3. Facts / honesty: see fact-checker (F1–F7 applied). My factual doubts, for FC only:
- "at least 15 participants per user group": FC #18 accepts it as our own advice (not attributed to NN/g). Agreed.
- Tools table "Paper index cards: Open or hybrid": closed sorts on paper are routine, so it was changed to "Open, closed or hybrid" (logic fix, not a new source claim).

## 4. Semantic SEO: PASS after fixes
- Bold answer under every H2/H3, one sentence. Word counts 11–29, except the analysis H2 at 31 (accepted, ~30). Fixed: "matches **their** mental models" (antecedent "a team") → "users' mental models". The tree-testing H2 was 32 words → "A card sort proposes a menu from users' groupings, and tree testing then checks it by asking participants to find items in a text-only version of that menu." (28).
- Essential concepts in each H2 first sentence: fixed the runbook H2 ("pick the sort type" had no sort type or IA) → "pick an open, closed or hybrid sort and its format".
- Keyword: 23 literal "card sorting" in about 2,700 open words (density about 1.7% by words); 7 of 9 content H2s carry it; H1/title/metaTitle/description/first sentence/first meta keyword/og all carry it.
  The title is 66, the metaTitle 59 and the description 154 (built HTML), with no colon. The description ends on "Grab the free checklist.", which matches the TOFU checklist CTA.
- Entities 25/25 and attributes 11/11 appear in the open text (details stripped). Bindings: synonyms card sort / card sorting study (2) / card sorting exercise (1), parent UX research + information architecture, 6 children, 6 related: all present.
  AIO terms: "agreement" was 0 → added "the pair's similarity score or participant agreement" (context word in the same sentence). "uncover mental models" and "navigation and labels" are covered by "It uncovers mental models" and "navigation labels". "name each group" survived the open-sort rewrite (L34).
- PAA 17/17 and AIO questions 8/8 are each answered in an H2/H3/FAQ. queryVariants: what is → L32; how to do → L150; open vs closed → L72; how many participants → L125; card sorting in UX → L32.
- Abbreviations expanded (SaaS, UX, IA, UI, NN/g). No banned phrases or hedges. US English. No HTML comments. "vs" hit: "the card sorting vs tree testing question" has a determiner and a head noun.
- Disambiguation ("tree"): "the decision tree" ×2 → "the sort-type decision tree" (L121, step 3), per the brief's ambiguous-word rule.

## 5. Internal links: PASS (8, TOFU range 8–12)
Hub ×2 (intro L28 + cost deep link #how-much-does-ux-research-cost, id verified in build), pillar /blog/ux-research-methods/, sibling /blog/contextual-inquiry/, case study /case-studies/mass-media-co/, industry /industries/saas/, 1 cross-hub /services/web-app-design-services/, /contact/. All targets exist in `out/`.
FIX applied: the Mass Media Co. anchor "Mass Media Co. discovery workshop" was identical to the same-day pillar's anchor to the same URL, and the sentence was the third same-silo copy of "covered information architecture and user flows" →
"When Mass Media Co. replaced several separate order-taking systems with one platform, [the discovery workshop behind that merger](/case-studies/mass-media-co/) covered information architecture alongside user flows." (No card sort is implied; FC #7 still holds.)
Contact anchor rewritten in the closing (see 7c).

**backlinkSuggestions status (publish-day blocker for the orchestrator, not a post defect):**
1. Hub `ux-research-services.json` "Card sort and tree test." item → `/blog/card-sorting/#how-many-cards-and-participants-does-a-card-sort-need` (id verified in build): **NOT applied yet. Required.**
2. `contextual-inquiry.md` "Menu labels or navigation" bullet → `[card sorting](/blog/card-sorting/)`: **NOT applied yet. Required.**
3. `choose-ux-research-agency.md` L36 → `[a card sort](/blog/card-sorting/#how-to-run-a-card-sorting-study-step-by-step)` (id verified): **NOT applied yet. Required.**
4. ux-research-methods → /blog/card-sorting/: applied ("how open, closed and hybrid card sorting work").
`grep -rln "/blog/card-sorting/" content/ | grep -v briefs` currently lists only ux-research-methods.md and the post itself. Apply 1–3 in the publish commit.

## 6. Images: PASS
All 5 inline SVGs and the cover exist in `public/blog/card-sorting/` and `out/`. They are 1200 wide and ≤ 776 tall, with embedded Manrope `@font-face` and no fallback-only fonts. Each is a `figure.fig-wide` with a figcaption (760px at 1440, 354px at 390). Rendered natively and in page; no spelling errors.
- Board: the 6 cards and 3 panels match the astext table row for row; legend "Illustrative".
- Decision tree: I walked all 4 leaves (none → open; some → hybrid; all + where filed → closed; all + whether found → tree test). They match the panel, the H3s and NN/g's tree-test preference.
- Chart: 0.75/0.90/0.95/0.98 at 5/15/30/60, 168-dot grid with 15 highlighted, and a source line. Matches the panel.
- Matrix: symmetric (28 pairs). The dendrogram is consistent with average linkage. The cut at 50 gives 4 groups, and "Export billing history" joins late. Labelled "Illustrative data", and the panel matches the 4 callouts.
- Before/after: 9 → 5 groups and 2 cross-links match the panel; labelled "Illustrative composite". No third-party brand assets (Slack appears only as a card label).
- Cover 1200×750, same as the last 3 silo covers.

## 6b. Duplication: PASS
Each image is followed by its `astext` panel only. No open list or table repeats image items. I grepped the distinctive labels (Download invoices, Billing and plans, 0.90, Cut line) across the whole post: the text names them only as single facts.
The best-practices H3 overlaps steps 1/2/5 in theme but adds a different reason per item. That is an advisory only.

## 7. Readability: PASS after fixes
- Paragraphs > 4 sentences fixed: H2 4 last paragraph (5 sentences, "30–50 participants" twice) rewritten to 3. The worked-example paragraph (6 sentences) split into 3 + 4.
- Reader-facing internal jargon removed: "which our hub lists as a reason" → "which we list as a reason to invest in UX research"; "and the hub shows [cost link]" → "and our pricing section explains [cost link]".
- 5-gram overlap: contextual-inquiry 0.48%, ux-research-methods 0.37%, customer-journey-map-template 0.41%, hub 0.62%, all other posts < 0.45% (limit 12%). The remaining shared grams are the sanctioned offer sentence, hub price facts and "Nielsen Norman Group (NN/g)".
- Example consistency (illustrative data): "Three clusters dominated: people, money and connections" contradicted the matrix (cut at 50 = account, people, money + the split card), and the intro's three piles (Billing, Reports, Account) did not match the example's two. Fixed:
  "Four clusters dominated (account, people, money and connections), and the matrix excerpt above shows the first three." and "'Export billing history' landed in the three piles from the opening: Billing, Reports and Account. The 'Reports' placements came from participants who read 'export' as data work." The card list now includes "Update payment method" (it is in the matrix).

## 7a. Competitor originality (beats = uxarmy.com/blog/card-sorting-information-architecture/): PASS
Raw HTML fetched (curl, 200). 5-gram overlap **0.36%** (11 grams, mostly question strings). The heading order differs (UXArmy: why → example → types → vs tree testing → process → sample → tips → mistakes → analysis; ours: what → when → types → sample → run → analyze → example → tools → tree testing next). The examples differ (their shopping anecdote vs our settings-menu sort).
Two close paraphrases of UXArmy definitions rewritten: open "participants group cards however they like and name each group" → "participants invent the groups and label each one in their own words". Closed "gives participants predefined categories and asks…" (UXArmy's hybrid frame) → "hands participants a fixed set of predefined categories, and every card must go into one of them."
All 7 serpGaps are covered: one sample answer with the Nielsen curve, the sort-type decision tree, a worked example from cards to matrix to menu to tree-test task, reading the matrix and cut line, the tree-test-first sequence, disambiguation, and limits plus when not to sort.

## 7b. Silo & leads: PASS
services[0] = ux-research-services. Links: up ×2, sideways (pillar, contextual-inquiry), down (case study), 1 cross-hub. funnel TOFU (orchestrator), service-support 4 ≥ 3. The TOFU CTA is the checklist, so no MOFU case-study CTA mis-credits MMC's 30%.
The lead angle is delivered softly: recruitment step (H2 4), the 90-minute readout (H2 6), and in H2 9 the card sort and tree test in the 4–8 day step, the price range and "send us that menu or sitemap". "free consultation" appears exactly once.

## 7c. Variety (last 5 posts incl. contextual-inquiry, customer-journey-map-template, same-day pillar): PASS after fixes
- Intro P2 copied contextual-inquiry's sentence "It is also one of the six deliverables in our [UX research services]" (8-gram, same link). Its "The sections take…" also echoed the pillar's "The sections below route…". Rewritten:
  "…and in our [UX research services](/services/ux-research-services/) it runs as a card sort and tree test pair. Each decision gets a section, in the order you meet it: sort type, sample size, the run, analysis, a worked example (invented for teaching), tools and the tree test that follows."
- The recruitment line matched the pillar's frame ("X is where in-house plans stall, so our program gives participant recruitment its own step of 3–6 days"). My first rewrite converged with the pillar QA's own rewrite ("sets aside 3–6 days … alone"), and the final re-check of the live sibling caught it. Final:
  "Finding that many matched people is the slow part of a card sort, and in our program participant recruitment runs 3–6 days ahead of the first session, so budget incentives per user group."
- Closing: the imperative chain "Pick … budget … write … before the first card goes out" mirrored the pillar's "Write … run it … before anyone books a participant". "menu or sitemap" also appeared twice in one sentence. Rewritten:
  "Three choices protect that decision: the sort type from the sort-type decision tree, 15 or more participants per user group, and tree test tasks drafted alongside the cards. Your current menu or sitemap is the starting brief either way, so run the study in-house or [send us that menu or sitemap](/contact/) and we will suggest the sort type and sample it needs." The sanctioned offer sentence follows.
- Structure differs from contextual-inquiry in intro style, section order, visual types, CTA angle and table style (5 of 7). "Card sorting example, regrouping a SaaS settings menu" shares the comma frame with "contextual inquiry example, a warehouse receiving study". It is the keyword carrier, so this is advisory only.

## 7d. Semantic completeness: PASS (no open writer gaps)
Every H2/H3 has a bold answer, then detail, then an example or number, and ends with a reader step. All brief outline points, 16 questions, 25 entities, 11 attributes and 11 n-grams are covered with substance. Every FAQ answer has ≥ 2 sentences. The FAQPage JSON-LD answers print clean. The intro promise matches the body order, and each takeaway is backed by a section. Gaps found were fixed directly (above).

## 7e. On-page checklist: PASS (100, failed []; manual: h2-then-text, figure captions, table intros, no hidden content, image after its paragraph all OK)

## 8. Build: PASS (see top)

## Guidance for the writer
None open. Every gap was closed in this loop by direct edit (listed above).

## FAIL list
None open. The orchestrator must apply backlinkSuggestions 1–3 (section 5) in the publish commit.

VERDICT: PASS
