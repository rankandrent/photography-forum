# QA report: ux-audit-agency-vs-freelancer (2026-10-07, review loop 1)

Reviewer: content-qa. Post: `content/blog/ux-audit-agency-vs-freelancer.md`. Brief: `content/briefs/ux-audit-agency-vs-freelancer.json`.
Visuals: `public/blog/ux-audit-agency-vs-freelancer/` (6 inline + cover). Items 2–3 (facts, honesty) belong to the parallel fact-checker and are skipped here.

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Intent & cannibalisation | PASS |
| 4 | Semantic SEO | FIX (F6) |
| 5 | Internal links | FIX (F1) |
| 6 | Images | PASS (rendering, alt, spelling, assets); see 6b |
| 6b | Duplication / image vs text block | FIX (F2, F3, F5) |
| 7 | Readability & cross-post overlap | PASS |
| 7a | Competitor originality | PASS (numeric overlap only against search snippets; fetch blocked) |
| 7b | Silo & leads | PASS |
| 7c | Variety | FIX (F4, closing reuses the last 2 posts' CTA pattern) |
| 7d | Semantic completeness | FAIL (G1–G6) |
| 7e | On-page checklist | PASS (score 100, failed []) |
| 8 | Build / seo:check / lint | build PASS, lint PASS, seo:check 2 errors on another page (pre-existing; F7) |

## 1. Intent & cannibalisation: PASS
- Keyword "ux audit agency vs freelancer" is commercial investigation. The reader has decided to buy an audit and is picking the provider type. The post answers that in the intro and in 4 "when X fits" sections.
- Grep over `content/` (services, industries, locations, blog, home) for "agency vs freelancer", "ux audit freelancer", "freelance ux audit" and "ai ux audit": no other page targets it. The hub owns "ux audit services", cost, process and deliverables. The post does not re-answer those and links to the hub #cost section. Home.ts owns the general design-hire comparison. The post says "This compares audit providers only, not design hires."

## 4. Semantic SEO: PASS, with one FIX
- Bold answers: all 9 H2s open with a one-sentence bold answer. Word counts: 28, 24, 26, 27, 27, 30, 29, 29, 25. All ≤ 30.
- Lengths (built HTML): title/H1 55, metaTitle 48 (keyword first), description 149 (opens with the keyword).
- Density: the exact long keyword appears 2× in the body plus title, metaTitle and description. The central entity family (UX audit agency 4, freelance UX audit / auditor 6, AI UX audit 4, in-house UX audit 1, each 3 words) is ≈ 2.0% of 2,235 body words by word share. "UX audit" alone is 26× (≈ 2.3%). That is at the top of the range, but it reads naturally and is not stuffed.
- Every brief n-gram is present in the open text (see 7d for the entities that appear only in collapsed blocks).
- Abbreviations: UX, WCAG, AI, B2B and SaaS are expanded. NVDA is not expanded (FAQ 5) → **F6**. UX is used once, inside the exact keyword, before its expansion in the same sentence. I accept this because moving the expansion breaks the keyword match.
- Boolean FAQs: "Is…" Yes, "Can ChatGPT…" No, "Should…" "Yes, it can", "Can an in-house…" Yes. PASS.
- Banned phrases and hedges (might, may, could, perhaps, "Also,", "According to", etc.): none found.

## 5. Internal links: FIX
- Contextual body links: 5. They are the hub (early, anchor "UX audit services", first H2), /industries/saas/, /services/usability-testing-services/ (the single cross-hub link, on the usability-test step), hub #how-much-does-a-ux-audit-cost (second up link, near the end) and /contact/. Every target exists in `out/`. Anchors vary. There are no other-silo posts and no case study, which is correct because no case study covers an audit.
- **5 is below the 6–12 minimum** → **F1**. The hub cap is already used, so add an industry link the post already sets up (`industries: [saas, ecommerce]`).
- Note for the orchestrator (template, not this post): the "related posts" block links choose-ux-research-agency, saas-product-redesign and ai-ux-design, which belong to other silos. That conflicts with RULES "never link to another silo's posts". This happens because the silo has no other post yet.

## 6. Images: PASS
- All 6 inline SVGs and the cover exist in `public/` and `out/`. They have no `<image>` or external href and no third-party brand assets. Each is under 13 KB.
- Alt text is descriptive for all 6 (114–235 chars), and the captions are meaningful.
- Rendered with Playwright on the served `out/`, with each image scrolled into view (`complete`, `naturalWidth` 800). Desktop 1440: drawn at 760px (×0.95, smallest text 26px → ≈ 25px). Mobile 390: drawn at 354px (×0.44, smallest text ≈ 11.5px, the same scale accepted in earlier posts). Legible at both widths.
- Cover: `.pcover` is 21/8 at 1440 (1224×466) and 16/9 at 390 (354×199), with `object-fit: cover`. The kicker, the 3-line title and the subtitle are fully visible at both widths. Only side line-art is cropped on mobile.
- Spelling is clean in every SVG.
- The coverage curve's ranges match the prose (20–50%, 74–87%), and the envelope between them is labelled as a sketch.
- Note: the matrix SVG is 800×3096 and renders 2,941px tall on desktop (3+ screens). This is acceptable because the text twin is collapsed, but the next redraw should consider a wider 4-column layout.

## 6b. Duplication: FIX
- All 5 "Show as text" blocks are collapsed (`<details class="astext">`, `open=false` at both widths). I ticked off the label lists one by one: every SVG carries exactly the items of its text block, with nothing dropped or changed.
- The same sentence is visible twice in the open in 2 places, and a near-duplicate in a third → **F5** (designer):
  - `hybrid-audit-flow.svg` footer "Never hand AI output to the auditor as findings; hand it over as a list to verify." repeats the visible prose under it, line 176, word for word.
  - `audit-scope-sheet.svg` footer "Without them, the cheaper quote is often just a smaller audit." repeats the visible prose above it, line 182, word for word.
  - `audit-provider-matrix.svg` footer "No prices: this compares audit providers only." nearly duplicates the visible prose on line 50.
- The sample-finding annotation is logically wrong in both the image and the text block → **F2**. By the section's own four-part test (evidence, heuristic, severity, fix + effort), the in-house note "ZIP error hard to see on mobile, fix?" has no evidence and no fix, yet it is annotated "Missing: heuristic, severity, effort".
- Vague matrix cells, in the image and the text block → **F3**.

## 7. Readability & cross-post overlap: PASS
- Paragraphs: none longer than 4 sentences. The intro is 4 sentences, against RULES' 2–3; I accept it because it carries the routing answer. US English throughout, and the post is scannable (9 H2s, bullets, 5 visuals).
- 5-gram overlap with existing posts and hubs (body text): choose-ux-research-agency 0.25%, saas-product-redesign 0.25%, ai-ux-design / fintech-ux-design / generative-ai-ux 0%, ux-audit-services hub 0.66%, usability-testing-services 0%. Every result is far under 12%, and the shared grams are only abbreviation expansions.

## 7a. Competitor originality: PASS (with caveat)
- `beats` = blog.flowpoint.ai/…/do-i-need-a-ux-agency-to-audit-my-website…: WebFetch failed with ENOTFOUND and curl got a proxy CONNECT 403. A WebSearch for the exact title returned the page's framing. Its structure is: what is a UX audit → agency pros (expertise, fresh perspective, unbiased) → in-house pros (intimate knowledge, cost-effective).
- 5-gram overlap with the retrieved snippet text: 0%. A full-page percentage could not be computed.
- Structure is not mirrored. The post has no "what is a UX audit" opener and no pros/cons layout. Its order is evaluator evidence → per-option fit → quality test → hybrid → quote inputs.
- All 7 serpGaps are covered with substance: all 4 provider types, evaluator-count evidence, a fair AI split with Baymard data and the accuracy-rate rule, honest routing to a freelancer or in-house team, the same finding written four ways, the hybrid plan, and the 6 scope inputs.

## 7b. Silo & leads: PASS
- `services[0]` is ux-audit-services, the correct hub. Up links: early, plus once near the end. One cross-hub link, which the brief allows. No other-silo post links in the body.
- `funnel: bofu`, serviceSupport 5 (BOFU minimum 5). New silo, so 1 BOFU + 1 MOFU is the right start.
- Caveat: funnel.json lists "in-house ux team vs agency" as a MOFU example. This keyword is closer to BOFU because the audit purchase is already decided and only the vendor type is open, and the SERP shows provider pages and Fiverr gigs. I accept BOFU.
- Lead angle: delivered at both moments, the agency-trigger invitation (line 140) and the scope sheet + price + /contact/. The tone is honest, with no hard sell. See F4 for the closing wording.

## 7c. Variety: FIX
- Against fingerprints.json (choose-ux-research-agency, saas-product-redesign), the post differs in type (Comparison vs Guide), intro (data point vs scenario/myth), visual types (matrix, curve, split card, 4-up, flow, sheet), list/table style and section order. That is ≥ 4 of 7, so the structure passes.
- The closing reuses the CTA pattern of both previous posts: "send your X → free consultation + fixed-scope proposal" plus "compare us with every other provider". Choose-ux-research-agency line 219 says "Send us your research brief … for a free consultation and a fixed-scope proposal, so you can score us on the same rubric as every other agency". This post says "Send us your scope sheet: … at no charge and return a fixed-scope proposal … Then weigh our proposal against every other quote." The brief's ctaAngle (honest routing: a price, or a straight "you do not need us") is there but buried → **F4**.
- H2 frames: "What should you send before asking for a quote?" and the sample-finding H2 echo choose-ux-research-agency's "research brief agencies can quote" and "sample research readout" sections. The framing and visuals differ, so this is acceptable, but the next BOFU post in any silo must not use a "send this before a quote" or "judge a sample deliverable" section again.

## 7d. Semantic completeness: FAIL
The post is strong overall, but several list items and table cells are not finished, and two brief attributes have no substance in the open text. Details are under "Guidance for the writer" (G1–G6).

## 7e. On-page checklist: PASS
- `npm run onpage -- /blog/ux-audit-agency-vs-freelancer/` → **score 100, failed []** (title, H1 and description keyword, first 100 words, slug, ≥ 3 H2s, ≥ 5 internal links, ≥ 3 visuals with alt, schema, ≥ 2 external sources, canonical/OG).
- Manual items:
  - #11 E-E-A-T: author ahmad-ullah plus contributor umar-sarwar, with author box and Person schema. Sources are cited (Baymard ×2, NN/g ×2, Hertzum & Jacobsen). There is no case-study proof because none exists for audits, which is correct.
  - #12: every first sentence is ≤ 30 words.
  - #14: all SVGs are under 13 KB.
  - #16: `updated` matches `date`.
- FAQPage JSON-LD: each `acceptedAnswer.text` holds only its answer, with no trailing text after FAQ 5. BlogPosting and BreadcrumbList are present.

## 8. Build: PASS for the post; gate blocked by an unrelated page
- `SHOW_DRAFTS=1 npm run build`: exit 0, and `/blog/ux-audit-agency-vs-freelancer/` was prerendered with all 6 SVGs plus the cover in `out/`.
- `npm run lint`: exit 0. The only output is 3 jsx-ast-utils notices, not errors.
- `npm run seo:check`: exit 1 with **2 errors, neither in this post**. `/location/ux-design-agency-chicago/` links `/work/tradezella/` and `/work/fortna-warehouse-ux/`, but case studies live at `/case-studies/<slug>/`. This is pre-existing, from the published location page → **F7** (orchestrator). The 7 warnings are on other pages too.
- The local server I started (http.server :4321, PID 2073) was stopped by PID and confirmed gone with `ps`. No other server was running.

## FIX list (exact old → new; orchestrator applies)

**F1, internal link 6 (link builder / writer), post line 135:**
- old: `- **An ecommerce store with app and web checkout.** iOS, Android and web conventions in one audit.`
- new: `- **An [ecommerce store](/industries/ecommerce/) with app and web checkout.** iOS, Android and web conventions in one audit, so a fix to the web checkout does not break the app flow.`

**F2, sample-finding annotation (writer + designer), post line 153:**
- old: `2. **In-house note:** "ZIP error hard to see on mobile, fix?" Missing: heuristic, severity, effort.`
- new: `2. **In-house note:** "ZIP error hard to see on mobile, fix?" Missing: evidence, heuristic, severity, fix, effort.`
- Designer: in `sample-finding-four-ways.svg`, change the In-house "Missing:" chips to `evidence · heuristic · severity · fix · effort`. Re-check the chip wrap and card height. Update the `.visuals.json` marker if it lists the chips.

**F3, vague matrix cells (writer + designer), post table lines 42–46.** Apply the same strings to `audit-provider-matrix.svg`:
- `| Analytics and recordings | Google Analytics 4 plus Hotjar or Microsoft Clarity | Only if they ask | Full access, read apart | Only what you paste in |`
  → `| Analytics and recordings | Google Analytics 4 plus Hotjar or Microsoft Clarity | Only if they request access; confirm it in the proposal | Full access, rarely read alongside the review | Only what you paste in |`
- `| WCAG 2.2 AA depth | Automated checks plus keyboard and screen-reader passes | Varies; ask | Depends on trained staff | Automated rules only |`
  → `| WCAG 2.2 AA depth | Automated checks plus keyboard and screen-reader passes | From automated tools alone to full manual passes; ask which | Depends on trained staff | Automated rules only |`
- `| Evidence per finding | Screenshot, data, heuristic, severity rating | Varies by template | Often a one-line ticket | Generic, unverified |`
  → `| Evidence per finding | Screenshot, data, heuristic, severity rating | Depends on their template; ask for a redacted sample | Often a one-line ticket | Generic, unverified |`
- `| Lead time | Scheduled around a team | One person's calendar | When the roadmap frees time | Minutes |`
  → `| Lead time | Team capacity sets the start; ours runs 2–3 weeks | When one person is free; no cover if they are booked | When sprint time frees up; often slips behind features | Minutes, plus your time to verify each item |`

**F4, closing reuse (writer), post line 197, the sentences after the pricing link:**
- old: `[Send us your scope sheet](/contact/): we talk it through with you at no charge and return a fixed-scope proposal. If a freelancer or internal sweep fits better, we will say so. Then weigh our proposal against every other quote.`
- new: `[Send us your scope sheet](/contact/) and you get one of two straight answers: a fixed price for auditing those flows, or a note that a freelancer or an internal sweep covers your scope without us. Either way, the six inputs stay yours to send to every provider on your shortlist.`

**F5, image footers repeating visible prose (designer):**
- `hybrid-audit-flow.svg`: delete the footer "Never hand AI output to the auditor as findings; hand it over as a list to verify." The prose on line 176 keeps it. Shrink the viewBox height to match.
- `audit-scope-sheet.svg`: delete the footer "Without them, the cheaper quote is often just a smaller audit." The prose on line 182 keeps it. Shrink the viewBox height.
- `audit-provider-matrix.svg`: delete the footer "No prices: this compares audit providers only." Line 50 says it in prose.

**F6, abbreviation (writer), post line 219:**
- old: `screen readers such as NVDA or VoiceOver`
- new: `screen readers such as NonVisual Desktop Access (NVDA) or VoiceOver`

**F7, site gate (orchestrator; not this post), `content/locations/ux-design-agency-chicago.json` line 148:**
- old: `<a href=\"/work/tradezella/\">` → new: `<a href=\"/case-studies/tradezella/\">`
- old: `<a href=\"/work/fortna-warehouse-ux/\">` → new: `<a href=\"/case-studies/fortna-warehouse-ux/\">`
- Then re-run `npm run build && npm run seo:check` and expect 0 errors.

## FAIL list
1. 7d completeness gaps G1–G6 (writer), listed below.
2. Item 5: 5 internal links, under the minimum of 6 (F1).
3. Item 6b: the sample-finding annotation contradicts the section's own test (F2), and 3 images repeat visible prose (F5).
4. Item 7c: the closing reuses the previous posts' CTA pattern (F4).
5. Item 8 gate: seo:check has 2 errors from the Chicago page (F7). This is not caused by the post, but publishing is blocked until it is fixed.

## Guidance for the writer

- **G1 [H2 "When is a freelance UX auditor the right choice?" / first bullet list, lines 70–72]** — Missing: each situation names a case but not *why* one evaluator is enough there. "A small surface. A marketing site plus a sign-up flow." is the thinnest. Add: one "because" clause per bullet. Examples:
  - small surface → "few enough screens that one expert can walk every state in a week"
  - one known drop-off → "the question is narrow, so a second reviewer adds little"
  - strong team → "they already own severity and tickets; they need a reviewer, not a roadmap owner"

  Target: +12–20 words per bullet.
- **G2 [same H2 / vetting list, lines 76–79]** — Missing: three of the four "Ask…" items do not tell the reader what a good answer looks like; only the WCAG item does. Add to each:
  - redacted report: "look for the four parts in the sample-finding section below"
  - severity scale: "a named 0–4 scale applied per finding, not high/medium/low by feel"
  - analytics: "a good answer names the tools, such as Google Analytics 4 funnels and Hotjar or Microsoft Clarity recordings, and shows one finding a recording explained"

  This also gives Hotjar and Microsoft Clarity substance in the open text; today they appear only inside collapsed blocks. Target: +40–60 words.
- **G3 [H2 "UX audit agency vs freelancer: what actually changes?" / matrix text block]** — Missing: 5 cells are vague ("Varies; ask", "Varies by template", "Only if they ask", "Full access, read apart", "Scheduled around a team", "One person's calendar"), and the brief attribute "lead time to start and turnaround" has no substance anywhere else. Apply F3 exactly, and keep the image and text identical (the designer redraws).
- **G4 [H2 "Can your in-house team audit its own product?" / list, lines 91–93]** — Missing: the three "make it work" bullets are bare instructions. Add the why to each:
  - borrowed reviewers → "they do not know the workarounds"
  - fixed sheet → "scores stay comparable between sweeps"
  - one flow per session → "fatigue drops findings late in a long session"

  Target: +8–15 words per bullet.
- **G5 [H2 "What can an AI UX audit tool catch and miss?" / last paragraph, line 126]** — Missing: "automated accessibility checkers that catch part of the WCAG failures" names no tool and no example of what manual testing adds. Add one sentence that names 1–2 real checkers (e.g., axe DevTools, WAVE or Lighthouse) without a percentage, and gives one criterion they cannot judge, e.g., whether link text or alt text makes sense in context. The fact-checker should confirm the tool names. Target: 1–2 sentences, ≤ 40 words.
- **G6 [H2 "What should you send before asking for a quote?" / closing]** — Missing: the brief's ctaAngle (honest routing) is buried mid-paragraph, and the closing repeats the last two posts' CTA. Apply F4. Keep the price sentence and the hub #cost link unchanged.

After the repairs, the body should stay ≤ ~2,400 words. Trim elsewhere if needed (for example, the second sentence of the in-house section's opening paragraph), not in the new "why" clauses.

VERDICT: FAIL
