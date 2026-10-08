# QA report: design-system-roi (2026-10-08, review loop 1)

Reviewer: content-qa. Post: `content/blog/design-system-roi.md` (commit fa70a60 + working tree). Brief: `content/briefs/design-system-roi.json`. Visuals: `public/blog/design-system-roi/` (7 SVGs).
Items 2–3 (facts, honesty) belong to the parallel fact-checker. Orchestrator decision respected: 5 internal links accepted (hub cap 2 + 1 other hub + 1 industry + contact). I found no other genuinely relevant non-hub target (see item 5).

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Intent & cannibalisation | PASS |
| 4 | Semantic SEO | FIX (F1 density 2.2% → 1.8%, F2 bold-answer grammar) |
| 5 | Internal links | PASS (5, orchestrator exception; no further candidate) |
| 6 | Images | PASS (FIX F8 on one chart label) |
| 6b | Duplication | PASS |
| 7 | Readability & cross-post overlap | FIX (F4 "our hub" jargon; overlap 1.76%) |
| 7a | Competitor originality | PASS (figr fetch blocked: DNS; snippet-based) |
| 7b | Silo & leads | PASS: funnel stays **BOFU** (reasoning below) |
| 7c | Variety | FIX (F5 closing reused for the 3rd time) |
| 7d | Semantic completeness | **FAIL** (G1–G4, plus F3, F6, F7) |
| 7e | On-page checklist | PASS (score 100, failed []) |
| 8 | Build / seo:check / lint | PASS (0 errors) |

## 1. Intent & cannibalisation: PASS
- The intent is commercial investigation: the reader has to justify a design system purchase to finance. The post converts the hub's published price into a payback model, which matches.
- No title, H1, `keyword`, `metaTitle` or anchor in `content/` (services, industries, locations, blog) uses ROI, payback or business case. The hub's cost and benefits H2s are linked, not restated.

## 4. Semantic SEO: FIX
- **Bold answers:** 9 H2s, each a single bold sentence of 28, 20, 19, 26, 27, 21, 27, 21 and 24 words (all ≤ 30). The worked-example answer reads choppily ("month 23 expected, month 16 high, and not within 5 years low"). See F2.
- **Lengths (built HTML):** metaTitle 55, H1 61, description 147, which opens with "Design system ROI".
- **Keyword density (site convention: uses × 3 words ÷ body words):** 17 exact uses plus 1 "ROI of a design system" = 18 × 3 / 2,360 = **2.3%** of the full body, and 2.6% of the open text (`<details>` stripped). That is over the 1–2% cap. The brief's "20–35 uses" target is 2.5–5% under this convention. F1 cuts 4 uses, giving 14 × 3 / 2,360 = 1.8%.
- **Keyword sentences, quoted (swap test with "this"):**
  - Title: "Design System ROI: Build the Business Case Your CFO Will Sign". OK.
  - metaTitle: "Design System ROI: Calculate Payback Before You Fund It". OK.
  - Description: "Design system ROI, calculated step by step: baseline hours, build and upkeep cost, payback month and a one-page business case your CFO can approve." OK.
  - First sentence: "How do you prove design system ROI before anyone signs a $60,000 purchase order?" OK.
  - Body: "how to calculate design system ROI step by step", "The arithmetic behind design system ROI is the standard one", "Time saved moves design system ROI more than any other input", "Three more cases push design system ROI below zero", "4 metrics prove design system ROI after launch", "your design system ROI carries a real cost line", "report them next to design system ROI, not inside it". All grammatical, none ungrammatical. The 4 uses removed in F1 are the most mechanical ones ("design system ROI models/model/sheet/estimate").
- **Abbreviations expanded:** ROI, UI, QA, BLS, WCAG, CFO, CTO, VP, CPO and SaaS. OK.
- **Boolean FAQs:** No / No / Yes / No / Yes. OK. Every FAQ answer has 2 sentences.
- **Banned phrases and hedges:** none (the one "may" match is the month "May 2025"). US spelling throughout.

## 5. Internal links: PASS (orchestrator exception)
Five contextual links, all resolving in the build:
1. `/services/design-system-services/` (intro, first 100 words, anchor "design system services")
2. `/industries/saas/` ("software as a service (SaaS) product")
3. `/services/ux-consulting-services/` ("embedded design team for upkeep", the 1 cross-hub link)
4. `/services/design-system-services/#how-much-does-a-design-system-cost` (2nd hub link near the end; the id exists in `out/services/design-system-services/index.html`)
5. `/contact/` ("Book a free consultation")

Anchors vary, and the hub is linked early and again near the end. The brief's `#design-system-vs-ui-kit` and `#process` fragments are dropped because of the hub cap (accepted).

Other candidates checked and rejected:
- No case study mentions design systems, components or tokens.
- `/industries/startups/` contradicts the 2+ team threshold (brief SITE-FACT CONFLICT 1).
- No other post in this silo exists.

seo:check warns, site-wide, that `/industries/saas/` has 3 different anchors across the site. That is a warning only, and varied anchors are what we want.

## 6. Images: PASS (one label FIX)
- All 7 files exist in `public/` and `out/blog/design-system-roi/`, and all are 2.5–10 KB SVGs.
- Fonts are Manrope/system only, with no `<image>`, external hrefs or third-party logos.
- Rasterized at 628 px (prose width): every image text renders at about 20–28 px on desktop and about 11.5 px at 354 px on mobile. No misspellings.
- The cover is simulated at the 390 px 16:9 `object-fit: cover` crop (x 267–1333 of 1600). The title, eyebrow and subtitle stay fully visible; only the decorative side art is cropped.
- **Break-even chart:** I recomputed the model month by month. Payback is month 16 (high) and month 23 (expected), with none for low. 5-year ROI is −8% / 85% / 177%, and "halve owner hours" gives month 39. The plotted lines match: cost ≈ $343k at month 36, high ≈ $740k, expected ≈ $493k, low ≈ $247k.
- **Decision tree:** I walked all 5 paths. Each matches the bullets, but the paragraph under the tree contradicts path 1 (see F3).
- **F8 (designer + writer):** "$85 blended (3 engineers to 1 designer, BLS medians ÷ 0.70)" does not follow from the post's own numbers: (3 × $92.06 + $68.35) ÷ 4 = **$86.13**. Keep $85 (every result depends on it), but label it as rounded:
  - Post line 109 and the matching text in `break-even-chart.svg`: `$85 blended (3 engineers to 1 designer, BLS medians ÷ 0.70)` → `$85 blended (about $86 at 3 engineers to 1 designer, BLS medians ÷ 0.70, rounded down)`
  - The SVG line wraps, so the designer must re-flow it to 2 lines inside the same card.

## 6b. Duplication: PASS
- Each of the 6 inline images is followed by a collapsed `<details class="astext">` block.
- I compared labels one by one: formula (4/4 items), worksheet (5 rows × 3 columns), break-even (results 3 rows + assumptions 6 rows), cost stack (6 layers), tree (4 questions, 5 outcomes) and one-pager (6 blocks). Nothing is dropped or changed.
- The one-pager's CFO/CTO/CPO tabs are not in its text block, but the open paragraph above covers them, so the image is not a repeat of the visible text.
- The metrics table (line 204) has no image. Nothing is visible twice in the open.

## 7. Readability & overlap: FIX
- Paragraphs: all ≤ 4 sentences. Lists and tables are scannable.
- 5-gram overlap with all 6 other posts, the hub, ux-consulting and saas pages is **1.76%** combined (max 1.27% with the hub, mostly the hub's own threshold wording). That is under 12%.
- **F4:** line 148 says "which our hub prices at $15,000–$40,000 per month". "Our hub" is internal pipeline jargon and does not say which page.

## 7a. Competitor originality: PASS
- `https://figr.design/blog/design-system-roi`: WebFetch failed (ENOTFOUND), so I could not compute 5-gram overlap.
- The WebSearch snippet shows figr frames the case as four pillars (speed, cost, quality, brand) and treats consistency as a secondary "mechanism".
- Our order (definition → inputs → baseline → worked example → missed costs → negative case → one-pager → metrics → scoping) and our examples do not mirror it, and no pillar framing is paraphrased.
- serpGaps: 1, 3, 5, 6 and 7 are covered with substance. Gap 2 (name which famous numbers to drop) is only generic (G3). Gap 4 (show how slow adoption moves payback) is missing (F7).

## 7b. Silo & leads: PASS. Funnel decision: **BOFU** (keep)
- `services[0]` = design-system-services, which is correct. The hub is linked up early and near the end. No other silo's posts are linked. There is 1 cross-hub link, and service-support is 5 (≥ BOFU minimum 5).
- **Funnel evidence:** the brief's SERP is mixed, not guide-dominated. Vendor ROI calculators (zeroheight, knapsack) and vendor/agency business-case pages make up about half of page 1, and formula guides (Smashing, uxpin, figr) the rest. The searcher has already decided to buy and needs the purchase approved. That is the pricing step of funnel.json's BOFU reader, and the post's cost input is the hub price.
- **Practical blocker for MOFU:** with `industries: [saas]`, the MOFU template would render "See how we did this for TradeZella" (a dashboard revamp) as the inline CTA. That implies a design system result we do not have (`app/blog/[slug]/page.tsx` L100–103). BOFU avoids that false implication.
- **Lead angle:** delivered naturally at both moments, the UI inventory as the first deliverable (line 91) and the scoping call with the baseline sheet (lines 215–219). There is no hard sell.

## 7c. Variety: FIX
- Compared with the last 3 site-wide posts (fingerprints), this post differs on intro (question), H2 frames, section order, list style and 5 of 6 visual types. The decision tree repeats saas-product-redesign. That is ≥ 4 dimensions, so the structure passes.
- **F5:** the closing reuses the exact clause "every project begins with a free consultation and a fixed-scope proposal". It is the 3rd post to do so (choose-ux-research-agency L219, ux-audit-agency-vs-freelancer L195), and it says "free consultation" twice in one sentence.

## 7d. Semantic completeness: FAIL
- Every section ends with a next step, and every takeaway is backed by a section. There is no TODO, trailing sentence or thin FAQ.
- Failures:
  - Two brief entities/n-grams appear only in passing: design system governance, Storybook/Zeroheight (G1, G2).
  - One serpGap is generic (G3) and one is missing (F7).
  - The worked example leaves out 2 of the 5 costs the next section says "most models leave out" (G4).
  - The prose under the decision tree contradicts it (F3).
  - The brief attribute "risk avoided (… rebrand cost)" has no substance (F6).

## 7e. On-page checklist: PASS
`SHOW_DRAFTS=1 npm run build`, then `npm run onpage -- /blog/design-system-roi/`: **score 100, failed []**, 3,041 rendered words.

Manual items:
- E-E-A-T: Talha Saleem plus Umar Sarwar, with LinkedIn links and the updated date. No case-study proof exists for this service, so the worked example is labelled illustrative.
- Snippets: every H2 answer is ≤ 30 words.
- External sources: 5.
- Image weight: all < 150 KB.
- Schema: BlogPosting, BreadcrumbList and FAQPage. Each FAQ `acceptedAnswer.text` holds only its own answer (checked in `out/`).
- Canonical and OG: present; no noindex.

## 8. Build: PASS
- `SHOW_DRAFTS=1 npm run build`: exit 0.
- `npm run seo:check`: 81 pages, **0 errors**, 7 warnings (all on other pages or site-wide).
- `npm run lint`: exit 0. It prints only the known jsx-ast-utils TSNonNullExpression notice.

## FIX list (exact replacements for the orchestrator)

**F1 (density, 4 edits)**
- L59: `Loaded hourly cost is where most design system ROI models go soft, so anchor it to public data.` → `Loaded hourly cost is where most ROI models go soft, so anchor it to public data.`
- L85: `Each signal feeds your design system ROI model with a different number: hours, duplication and rework.` → `Each signal feeds your model with a different number: hours, duplication and rework.`
- L91: `For a design system ROI estimate before any purchase, run signals 1 and 3 yourself:` → `For a rough estimate before any purchase, run signals 1 and 3 yourself:`
- L150: `Give each layer its own row in your design system ROI sheet so a reviewer` → `Give each layer its own row in your ROI sheet so a reviewer`

**F2 (L95 bold answer)**
`**In this illustrative model, a 3-team product pays back a mid-range design system in month 23 expected, month 16 high, and not within 5 years low.**` → `**In this illustrative model, a 3-team product pays back its $145,500 build plus upkeep in month 23 (expected) or month 16 (high), and never within 5 years (low).**` (27 words; L124 still adds the mechanism without repeating the months.)

**F3 (L173, contradicts the decision tree)**
`Run the model when 2 or more positive signals hold: several teams on one product, a second product or platform coming, one component in several versions, repeated accessibility fixes.` → `Run the model when the tree ends at "design system now", and treat each extra signal as a reason to use the expected scenario rather than the low one: a second product or platform coming, one component in several versions, repeated accessibility fixes.`

**F4 (L148)**
`which our hub prices at $15,000–$40,000 per month.` → `which we price at $15,000–$40,000 per month.`

**F5 (L219 closing)**
`[Book a free consultation](/contact/) with your baseline sheet in hand and we scope the build against your own hours; every project begins with a free consultation and a fixed-scope proposal.` → `[Book a free consultation](/contact/) and bring your baseline sheet: we scope the build against your own hours and send a fixed-scope proposal whose figure drops straight into the ask block of your one-pager.`

**F6 (L49, brief attribute "rebrand cost")**
`- **Brand consistency**, because shared design tokens hold the same color and type values in every product.` → `- **Brand consistency and cheaper rebrands**, because shared design tokens hold the same color and type values in every product, so a later rebrand changes the tokens instead of every screen.`

**F7 (after L124, serpGap 4; recomputed with the post's own model)**
Insert after `…breaks even in month 39.`: ` Adoption speed moves the date as well: stretch the ramp to full rate from month 12 to month 24 and the expected case pays back in month 32 instead of 23.`

**F8:** see item 6 (post L109 + `break-even-chart.svg` label).

## Guidance for the writer

- **G1. [H2 "Which metrics prove the ROI after launch?", after the table]**
  - Missing: "design system governance" (brief entity and n-gram) appears once, as a passing clause.
  - Add: a 3-sentence paragraph saying who owns the quarterly report (the named owners from the business case), how contributions are reviewed (a monthly contribution review that accepts or rejects new components), and the rule that links metrics to action (a component with a high detach rate gets fixed or deprecated in the next release).
  - Anchor it in the hub's process step "Governance and rollout (5–10 days): we set up design system governance, train product teams in 2 workshops and release version 1.0", stated as what our engagement hands over.
  - Target: 55–80 words. No new link (hub cap). Do not use the exact keyword.
- **G2. [Same H2, the Chromatic sentence at L211]**
  - Missing: Storybook appears only in a table cell, and Zeroheight only in a tooling list, so both are mentioned in passing.
  - Add: one sentence each.
    - Storybook: the catalogue of coded components; the share of library components with a story is the coded-coverage number to report.
    - Zeroheight: the documentation site where usage rules live; only claim the analytics or page-view features the fact-checker can verify on zeroheight.com, otherwise describe it as the place teams look up usage.
  - Target: 35–55 words.
- **G3. [H2 "How do you turn the numbers into a one-page business case?", L181 "Drop any headline multiple…"]**
  - Missing: serpGap 2 promises to say *which* famous numbers to drop and why; the sentence is generic.
  - Add: one sentence naming the shapes of claim to drop, e.g. "5–10x returns" or "payback in 2–4 months" figures that circulate in vendor posts without a method, sample or team size.
  - Do not attribute them to Forrester, McKinsey or any named firm (brief DO-NOT-USE list; no primary source). The fact-checker must confirm the wording.
  - Target: 25–40 words.
- **G4. [H2 "Which costs do most ROI models leave out?", after L150]**
  - Missing: the post's own worked example has no migration row and no separate adoption-support line, the 2 costs this section says most models leave out. A finance reader will spot it.
  - Add these 2 sentences, recomputed with the same model: `The worked example above folds adoption support into its 60 owner hours and has no migration row. Add 400 engineering hours of migration ($34,000) across months 4–9 and its expected case pays back in month 26 instead of 23.`
  - Target: 35–45 words.
- **Apply F3, F6 and F7 as written.** They close the tree contradiction, the missing "rebrand cost" attribute and serpGap 4.

FAIL list:
- 7d: G1–G4 (+ F3, F6, F7).
- Also apply FIXes: F1, F2, F4, F5 and F8.

VERDICT: FAIL
