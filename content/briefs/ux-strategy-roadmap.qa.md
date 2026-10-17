# QA report: /blog/ux-strategy-roadmap/ (content/blog/ux-strategy-roadmap.md)

Date: 2026-10-17 · Reviewer: content-qa · Brief: content/briefs/ux-strategy-roadmap.json · Visuals: content/briefs/ux-strategy-roadmap.visuals.json · Parallel fact-check: docs/content-system/fact-checks/ux-strategy-roadmap.md (read before writing; its F1–F5 are merged below where they touch the same lines)

## Gates

| Gate | Result |
|---|---|
| `SHOW_DRAFTS=1 npm run build` | PASS (exit 0), before and after the QA edits. The draft renders `index, follow` under SHOW_DRAFTS, so no noindex strip was needed (I still ran the scratch-copy method from the 2026-10-15 lesson; the temp script in `scripts/` was deleted, and `docs/data/onpage/latest.json` was not touched) |
| on-page (`onpage-audit.mjs /blog/ux-strategy-roadmap/`) | **100**, `failed: []`, before and after the edits (3,252 words incl. panels) |
| `npm run seo:check` | PASS, 0 errors. 0 warnings for this route; the 6 warnings are on the draft stubs ai-ux-design, fintech-ux-design, generative-ai-ux and the design-team author page (pre-existing) |
| `npm run lint` | PASS (exit 0; the jsx-ast-utils notices are pre-existing) |

## QA edits made directly in the post (wording/structure only, no facts; none touch a line in the fact-checker's F1–F5)

1. L28 intro, the fragment "Below: the evidence to collect, scoring with RICE …, horizons, reviews and a one-page example." became a step answer for the `queryVariants` entry "how to create a ux roadmap" (no H2 or FAQ answered it in one extractable sentence): "To build a roadmap of such rows, collect the evidence, score each theme with RICE (reach, impact, confidence and effort), pick a metric from the Google HEART framework (happiness, engagement, adoption, retention and task success), place it on a horizon and review the whole plan quarterly; a one-page example follows."
2. L30 H2 "What is a UX strategy roadmap, and how does it differ?" → "… and how does it differ from a product roadmap?" ("differ" had no object; the brief question is "How is a UX roadmap different from a product roadmap?"). No link targets the old anchor id.
3. L34 "That prioritized roadmap is the main output" → "The prioritized roadmap is the main output" (the antecedent of "That" was the strategy document in the previous sentence).
4. L60 "Stakeholder interviews come next, at an interview count of 6–10 leads across …" → "Stakeholder interviews come next; we set the interview count at 6–10 leads across …" (the attribute label was bolted on and the sentence did not parse).
5. L241 closing. "A feature list is a fine place to begin, not a reason to wait. … [send us your current roadmap or backlog](/contact/) as it stands; rows that still read like …" repeated the reassurance shape of mobile-app-design-agency-vs-freelancer's closing ("a blank line is unfinished scope, not a flaw. [Send us that quote…](/contact/)"), and the fact-checker noted its ambiguous promise. New: "Before you book anything, run the intro's test on your own plan: count the rows that name a user, a problem, evidence, a metric and an owner. Every project begins with a free consultation and a fixed-scope proposal, so [send us your current roadmap or backlog](/contact/) with that count; in the consultation we point out which rows are still features and what evidence is missing." (The consultation wording is the brief's leadAngle; no written review is promised. "free consultation" still appears exactly once, about.md wording.)

## 1. Intent and cannibalisation: PASS
- "ux strategy roadmap" 150/mo, KD 2 (Ahrefs API v3, US, 2026-10-17, recorded in the brief). SERP is how-to/definition pages, so an informational MOFU guide matches.
- No other page in `content/` targets it. The hub (ux-consulting-services) carries "Roadmaps" in its metaTitle and the n-gram, but it is a service page; the post never defines or prices UX consulting on its own terms and links up twice. Accepted, per the brief's mitigation.

## 4. Semantic SEO: PASS (after edits) + FIX H1–H2 below
| Check | Result |
|---|---|
| title / H1 | "UX Strategy Roadmap: How to Build One Leadership Will Fund" (58). PASS |
| metaTitle / og:title (built) | "UX Strategy Roadmap: How to Build, Score and Review It" (54). PASS |
| description / og:description (built) | 150 chars; keyword first; ends on the reader step "See an example, then book a consultation." (MOFU CTA). PASS |
| meta keywords (built) | first = "ux strategy roadmap". PASS |
| keyword sentence, first 60 words | "In user experience (UX) planning, a UX strategy roadmap fails the moment one of its rows reads like this…" Reads naturally with "this plan" swapped in. PASS |
| keyword stacks | `UX strategy roadmap example` only (H2 8 + its bold answer), allowed by the brief. No `vs` strings. PASS |
| density | 12 exact uses in 2,429 open words (panels and alt stripped) = 1.48%. PASS |
| H2 salience | 5 of 10 H2s (incl. FAQs) carry the keyword = 50%. PASS |
| bold answers | 9/9 present, one sentence, 25–30 words. None starts with a digit or "Because". PASS |
| every/always/all/never/only | 8 hits quoted and tested: "every interviewer is also a stakeholder" (internal interviewer, true); "earns a theme only when it causes a user problem"; "every number is illustrative"; "Every theme in now carries a baseline" (board: 61%, 38%, true); "every quarter" (cadence); "Every project begins…" (about.md, sanctioned once); "plans studies only". None contradicts a rule in the post. PASS |
| abbreviations (open text, details stripped) | UX, RICE, HEART, GA4, B2B, SaaS, OKRs expanded on first use. **CHI is not expanded (L136): FIX H1** |
| boolean FAQs | "Is…" → "No.", "Can…" → "Yes." PASS |
| banned phrases / hedges | 0 hits (also, as mentioned, according to, might, may, could, perhaps, leverage, seamless, delve…). PASS |
| shared-verb pairs | Bold answers, description, new intro and closing: each pair reads on its own ("rows name a user / a problem / evidence / a metric / an owner"). PASS |
| HTML comments | 0 (`grep '<!--'`). PASS |
| FAQPage JSON-LD | 5 answers, each holds only its own answer. PASS |

Entities 23/23 in visible text with a fact (FigJam and "time horizons" are short but tied to a use: "a FigJam board or one slide is enough"; "keep time horizons in quarters, not dates"). Attributes 11/11 use the literal labels. N-grams 11/11 (incl. "now, next, later board", "quarterly review", "user problem").

## Concept bindings, rule 7 suitability check: PASS
- Synonyms: UX roadmap 10×, user experience roadmap 1× (L36, NN/g sentence), UX design roadmap 1× (L230). Plurals "UX roadmaps" only in the brief; not required.
- Parent: "UX strategy" in the intro chain and the definition; "UX consulting services" is the up-link anchor (L34).
- Children: roadmap themes (H2 3), RICE score (H2 4 + card), success metric (H2 5), time horizons (H2 6 bullets), theme owner (H2 7), review cadence (H2 9 bullets). PASS
- H2 first sentences: 9/9 name UX strategy roadmap or UX roadmap plus "prioritized themes" or "product team".
- Composite concepts whole: Google HEART framework, Goals-Signals-Metrics, Jobs to be Done, design debt, UX maturity, RICE prioritization; each defined at first use.
- Ambiguous words: strategy (always "UX strategy" or "product revamp strategy"), roadmap, impact/reach/confidence (all inside the RICE context), workshop (L179 "not a UX strategy training course"), maturity ("UX maturity"). PASS
- Query variants: what is (H2 1), how to create (intro step sentence after QA edit 1), what should a UX roadmap include (FAQ 1, same answer as H2 1/H2 8), how to prioritize (H2 4), example (H2 8). PASS
- Hub facts: 6–10 interviews, 2–3 days, 2–4 days, 2-hour workshop, $5,000–$15,000, 2–3 weeks / 10–15 working days, quarterly roadmap reviews in ongoing advisory all match ux-consulting-services.json (fact-checker claims 22–29). F3 corrects the one scope slip.

## Layout-aware page: PASS
- Each H2 is followed by its bold text answer, never an image; every table/image has an intro sentence ("The table compares…", "as the card shows…", "The grid applies it…", "The board shows…").
- 6 inline images, all `<figure class="fig-wide">` with a figcaption; each `astext` renders as an always-visible `div.astext` (display: block) directly after its figure. Only FAQ, nav and TOC use `<details>`.
- Each image sits right after the paragraph that introduces it; alt, caption and file name name the same thing.

## 5. Internal links: PASS (6, MOFU range 6–10)
| # | Line | Target | Anchor | Exists |
|---|---|---|---|---|
| 1 | L34 | /services/ux-consulting-services/ (hub, early, < 300 words) | UX consulting services | yes |
| 2 | L38 | /services/ux-audit-services/ (the one cross-hub link) | fix roadmap from a UX audit | yes |
| 3 | L77 | /case-studies/tradezella/ | TradeZella trading journal revamp | yes |
| 4 | L187 | /case-studies/mass-media-co/ | Mass Media Co. discovery workshop | yes |
| 5 | L239 | /services/ux-consulting-services/#how-much-does-ux-consulting-cost (hub, near end; id matches sectionId()) | what a UX strategy engagement costs | yes |
| 6 | L241 | /contact/ | send us your current roadmap or backlog | yes |
Anchors are varied, none "click here". External sources: 5 (NN/g ×2, GA4 help, Intercom, research.google), all loaded per the fact-checker. No sibling posts exist in the silo; no other silo's post is linked.

**TradeZella sentence (link builder, L77):** the link sits on the section's own topic (stakeholder discovery), the sentence does not call TradeZella a UX consulting engagement, and no TradeZella result (40%, 25%, 30%, 4.7) is used. One wording drift: "discovery sessions … **mapped** their long-term vision before we rebuilt **any** user flow" vs tradezella.md L88 "We ran discovery sessions with the stakeholders **to understand** their long-term vision. Then we rebuilt the user flows…". Apply the fact-checker's **F4** as written (it is exactly the case-study wording). With F4 the sentence uses only tradezella.md facts. PASS with F4.

**Backlink suggestions (publish-day check):**
- #1 (required): ux-consulting-services.json, "What is UX consulting?" body, link "a roadmap for people and process" → /blog/ux-strategy-roadmap/. **Not applied yet** (grep of content/ finds no `/blog/ux-strategy-roadmap/` outside the post). **FIX H4 (orchestrator, before publish).**
- #2: skip (alternative on the same page; one link per target per source page). Reason recorded in the brief.
- #3: skip (weak topic match on the audit hub; reason recorded in the brief).

## 6. Images: PASS + FIX H3
- 7 files in public/blog/ux-strategy-roadmap/ (6 inline + cover), all referenced, all copied to out/. SVG, 3–8 KB each, Manrope/system font, no third-party logos or raster assets.
- Landscape rule: viewBox 1200 × 760–798, smallest text 38px. Rendered at 760px (1440 viewport) = 24px text; at 354px (390 viewport) = 11.2px, the expected result for this rule. Cover 1600×600: at 390 (16:9 crop, object-position 50% 50%) the title and subtitle are fully visible.
- Native renders read: spelling correct, no overlap or clipping. The card label "Illustrative" is present on the RICE card, HEART grid and board.
- Word-for-word, image vs its astext panel: four-roadmaps (16/16 cells), evidence ledger (5/5 rows, 3 fields each), feature-to-theme (4/4 rows), RICE card (5/5 rows, 6 values each; arithmetic recomputed, all correct), HEART grid (3/3 × 5), board (6/6 cards × 5 fields) all match. Only legends and column headers are image-only (ledger headers "Input / What it tells the roadmap / Evidence level"; the RICE legend "Tested or measured / Mixed / Opinion only", whose words are in takeaway 3 and L109; the board legend "Theme / RICE score / Metric and target / Owner" = the panel's header row).
- **Board strategy band (asked to judge):** the band shows only the labels "Goal | Users and problem | Success measures". The full sentences are in the blockquote directly above (L195–197), and the band labels are word for word the blockquote's bold lead-ins. **Acceptable.** Nothing is visible twice; the image claims to be the board, not the strategy text; the labels are a band "header" that points to the adjacent text block; and the designer's learnings (2026-10-17) show that the full band at 38px pushed the image to 1,030–1,204px tall, against the landscape rule. Do not add the band sentences to the panel; that would show them a second time in the open.
- **FIX H3 (designer):** the evidence ledger contradicts the RICE card's colour key. On the RICE card, dark pink = "Tested or measured" (100%) and light pink = "Mixed" (80%). In evidence-ledger.svg, "Analytics" (GA4 funnels) uses the light pink, while "Research" uses the dark one, though L109 gives analytics 100% too. Change the "Analytics" pill on row 2 to the same dark fill + white text as the "Research" pills. Keep "Analytics if counted" (row 4) light/dashed, since it means "mixed unless counted". No text changes, so the panel stays word for word.
- Fact-checker **F5** (board "Confidence 50% → 80%" → "50% → 100%") changes one SVG text line and panel L214 together; after it is applied, re-check that the card text still ends inside x = 893.5.

## 6b. Duplication: PASS
Every table/list an image shows lives only in its astext panel. The open prose carries one sentence per key fact (bold answers, the "Mobile approval … ranks last" reading, the capacity sentence), not the rows. The H2 2 bold answer names the five inputs once; the panel adds what each tells the roadmap and its evidence level, so it is not a pure repeat.

## 7. Readability: PASS + FIX H1
- US English, no filler. The one paragraph over 4 sentences: **L136 HEART paragraph (5 sentences) → FIX H1** (split, merged with F1).
- 5-gram overlap (open text) vs every post: max 0.63% (is-discovery-phase-worth-it: HEART category list + the sanctioned consultation sentence); hub ux-consulting-services.json 1.39%. All far below 12%.
- Closing/CTA shapes vs the last 4 posts (ecommerce-ux-audit, usability-testing-cost-per-participant, mobile-app-design-agency-vs-freelancer, design-system-roi) printed side by side. The old closing matched the mobile post's "X is Y, not Z + send us that [artifact]" shape; fixed by QA edit 5.

## 7a. Competitor originality (beats = procreator.design/blog/build-ux-roadmap-for-saas-product/): PASS
- Fetched raw (curl, HTTP 200, 2,621 words). 5-gram overlap with the post's open text: **0.00%**.
- Their order: what is → 6 steps (vision, journey, themes, prioritize, develop, iterate) → UX vs product roadmap → when (5 stages) → FAQs (how to create, tools, how often). Ours: definition + 4-plan table → evidence → rewrite → RICE → HEART → horizons → ownership/workshop → example → cadence/mistakes/help. Not mirrored; no lifecycle list, no Q1–Q4 table, no 0–3/3–6/6+ phases; FAQ wording differs.
- serpGaps 9/9 covered with substance: worked RICE table with evidence-tied confidence; HEART via Goals-Signals-Metrics with baseline → target; 5-input evidence ledger; before/after row rewrite; owner + decision rights + workshop agenda; horizon placement rules; NN/g maturity stage → research themes first; real timing (10–15 working days); no unsourced stats.

## 7b. Silo and leads: PASS
- services[0] = ux-consulting-services (hub exists); funnel mofu, serviceSupport 5 (≥ 4); new silo starting with 1 MOFU.
- Silo rules: hub ×2 (early + near end), 1 cross-hub (ux-audit), case studies ×2 (precedent and link-builder range 1–2; neither lists the hub service, and both are presented as product revamps, MMC explicitly "not a roadmap engagement"), no other-silo posts.
- leadAngle: moment 1 (L77 interviews in 2–3 days), moment 2 (L130 2–4 days scoring step), moment 3 (L239–241 price, duration, consultation). Natural, no hard sell.
- Template CTA: `relatedCaseStudies()` returns no case study for this post (no case study lists ux-consulting-services and `industries: []`), so the MOFU inline CTA falls back to "Want senior designers to handle this for you?" + hub summary + "Typical investment: $5,000–$15,000". The price matches the post, and no case result is implied. The brief's "MMC as the featured MOFU case" cannot render. Owner note only, not a post defect.

## 7c. Variety (fingerprints.json): PASS
Last 3 site-wide: ecommerce-ux-audit (Checklist, 60-second phone test), usability-testing-cost-per-participant (Guide, itemized receipt), mobile-app-design-agency-vs-freelancer (Comparison, contrarian take). This post differs in intro (before/after row), H2 frames, section order, visual types and list style (5 of 7); the type (Guide) matches one post. The silo has no earlier posts. Housekeeping for the orchestrator (from the brief): 2 fingerprints entries sit in `fields` instead of `posts`; append this post to `posts`.

## 7d. Semantic completeness: PASS (no writer gaps open after the QA edits and FIX H1)
- Each H2 has bold answer → how/why → a concrete example, number or step, and ends on a reader action ("rebuild it with the next two sections", "List the inputs you already hold…", "Rewrite your own feature rows…", "Score your top five themes with engineering in the room", "Write the baseline from the last full quarter…", "Sort your scored list…", "Send the scored table a day ahead…", "Write your own top band…", closing step).
- All 10 brief questions answered (strategy document vs roadmap: L34 + L193).
- FAQs are each 2–3 sentences. Takeaways 1–5 are each backed by a section. The intro promises (evidence, RICE, HEART, horizons, quarterly review, example) are all delivered.
- Outline deviations accepted: the process and "when to hire" hub deep links were dropped for the hub cap of 2 (brief allows it); the "when to get help" criteria are written in the post's own words (L239).

## 7e. On-page checklist: PASS
Score 100 (≥ 95). Manual items: E-E-A-T (author sahar-asif + contributor umar-sarwar, both with LinkedIn; updated 2026-10-17; 5 cited sources); snippets (9 bold answers ≤ 30 words; ol/ul/tables where they fit); images SVG < 8 KB; canonical + OG present; owner additions all ticked (volume 150 recorded; keyword in all meta surfaces; salience; 23/23 entities, 11/11 attributes; nothing important behind a click; figures with captions; tables introduced).

## FIX list (exact replacements; the orchestrator applies them together with the fact-checker's F1–F5)

**H1 (merges F1 + paragraph split + CHI expansion), L136, replace the whole paragraph:**
Old:
"The Google HEART framework comes from a [2010 CHI paper by Google's Kerry Rodden, Hilary Hutchinson and Xin Fu](https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/) that names five categories of user-centered metrics. Happiness is attitude, such as a survey score. Engagement is depth of use, such as invoices sent per week. Adoption is new users of a product or feature, such as activation rate, the share of new users who reach the first key action. Retention is who comes back, and task success is completion, such as admins finishing an invite without help."
New (two paragraphs):
"The Google HEART framework comes from a [2010 paper by Google's Kerry Rodden, Hilary Hutchinson and Xin Fu](https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/), presented at the Conference on Human Factors in Computing Systems (CHI); it names five categories of user-centered metrics. Happiness is attitude, such as a survey score.

Engagement is how often, how intensely or how deeply people use the product, such as invoices sent per user per week. Adoption is new users of a product or feature, such as activation rate, the share of new users who reach the first key action. Retention is who comes back, and task success covers efficiency, effectiveness and errors, such as the share of admins finishing an invite without help."
(Apply this instead of F1. F2 on L138 is unaffected, so apply it as written.)

**H2 (fact-checker items, confirmed by QA, apply as written):** F2 (L138), F3 (L228), F4 (L77, TradeZella), F5 (L214 + board SVG). Their old strings are not touched by any QA edit.

**H3 (designer):** evidence-ledger.svg, row 2 "Analytics" pill: use the dark fill and white text of the "Research" pills (see section 6). No text change.

**H4 (orchestrator, before publish):** backlinkSuggestions #1 in content/services/ux-consulting-services.json, "What is UX consulting?" body: wrap "a roadmap for people and process" in `<a href="/blog/ux-strategy-roadmap/">…</a>`. Then rebuild and confirm `grep -rl 'href="/blog/ux-strategy-roadmap/' out/services/ux-consulting-services/index.html`.

After H1–H4: rebuild with SHOW_DRAFTS=1, re-run the on-page script (expect 100) and `npm run seo:check 2>&1 | grep ux-strategy` (expect nothing), and diff the post against commit 0cb8faa (the orchestrator WIP commit that already holds the QA edits 1–5) to reread every sentence the repair changes.

## Guidance for the writer
No completeness gaps are open. The four wording defects QA found were fixed in place (QA edits 1–5), and H1 is an exact replacement. Lessons are logged in semantic-content-writer.md.

## Lessons written
- docs/content-system/learnings/semantic-content-writer.md: answer each queryVariant in one sentence (no "Below:" fragments); expand an abbreviation that sits inside a link anchor (CHI); no paragraph of one-clause definitions over 4 sentences; attribute labels need a verb.
- docs/content-system/learnings/content-visual-designer.md: one colour = one meaning across all images in a post.
- docs/content-system/learnings/content-link-builder.md: keep the case study's own verb when adding a case-study sentence.
- docs/content-system/learnings/content-qa.md: cross-image legend check; quote the answering sentence for every queryVariant.

## Blockers
None in the post after the QA edits. Publishing is conditional on H1–H4 and the fact-checker's F2–F5 being applied (the fact-checker's own verdict is FAIL until they are).

VERDICT: PASS
