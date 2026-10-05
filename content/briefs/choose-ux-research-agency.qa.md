# QA: choose-ux-research-agency

- Date: 2026-10-05
- Reviewer: content-qa
- Post: `content/blog/choose-ux-research-agency.md` (draft)
- Brief: `content/briefs/choose-ux-research-agency.json`
- Images: `public/blog/choose-ux-research-agency/*.svg` (6 files)
- Items 2–3 (facts, honesty) are covered by the fact-checker in `choose-ux-research-agency.facts.md` and are not reviewed here.

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Intent and cannibalisation | PASS |
| 4 | Semantic SEO | FIX (F1, F4, F5) |
| 5 | Internal links | PASS |
| 6 | Images | **FAIL** (text not legible at rendered size) |
| 7 | Readability | FIX (F2, F3) |
| 7a | Competitor originality | PASS (judged from search snippets; fetch blocked) |
| 7b | Silo and leads | PASS |
| 7c | Variety | PASS |
| 8 | Build | PASS |

## 1. Intent and cannibalisation: PASS

- The keyword "how to choose a ux research agency" is commercial investigation, and the post is a buyer's evaluation guide with a scorecard, pitch questions, red flags, proposal normalization and contract terms. That matches the intent.
- No other page targets it. I grepped every title, H1, `keyword` and `metaTitle` in `content/` (services, industries, locations, blog, home.ts). The hub owns "ux research services" (metaTitle "UX Research Services | User Interviews & Journey Maps"). The only "choosing" copy elsewhere is a homepage FAQ about choosing a "UI UX design service" (a different entity) and an Atlanta location FAQ about choosing a UX design agency (a different keyword).
- The post mentions the hub's cost range once (line 171) and links to the hub for pricing, as the brief asks, so it does not compete on cost.

## 4. Semantic SEO: FIX

Passing checks:
- Every H2 opens with a bold, direct answer sentence (10/10). The FAQ H3s answer directly.
- Lengths: title 55 chars (45–70), metaTitle 57 chars (≤ 60, keyword first, no brand), description 151 chars (140–158).
- Density: the central entity "UX research agency" appears 12 times, plus 2 plural uses, in 2,325 body words. That is 1.5% by word share (1.8% with the plural), inside 1–2%. The exact long keyword appears in the title, metaTitle and intro. The long phrase "how to hire a ux research agency" appears once (line 195).
- Entities from the brief that are covered: research brief, research plan, participant recruitment, screener survey, user interviews, contextual inquiry, usability testing, synthesis, research readout, research repository, Dovetail, SOW, RFP, informed consent, PII, HIPAA BAA, Insights Association Code of Standards, ISO 9241-210. All 10 attributes are covered.
- N-grams from the brief: all present except "ux research partner" (0 uses; see F4).
- Abbreviations are expanded on first use: UX, RFP, PII, IP, B2B, SaaS, SOW, PHI, HIPAA, BAA, HHS, NDA.
- Boolean FAQs start with Yes/No: "Should…" starts "No, it does not have to." and "Do I need an RFP…" starts "No."
- No banned phrases. No hedges (might, may, could, perhaps all 0).

**F1 (writer). The closing paragraph is swallowed into the last FAQ's FAQPage schema.** The last two lines of the post sit under `### How fast can a UX research agency start fieldwork?`. In the built `out/blog/choose-ux-research-agency/index.html`, the FAQPage JSON-LD answer for that question ends with "A scorecard only works when every agency fills it in with real answers, ours included. Start with our UX research services and send the brief you wrote with this guide." The paragraph also repeats the line-197 CTA. Delete these two lines at the end of the file (the blank line and the paragraph):

```

A scorecard only works when every agency fills it in with real answers, ours included. Start with our UX research services and send the brief you wrote with this guide.
```

The file should end with the last FAQ answer: `…so first sessions land in week two. Hard-to-recruit groups take longer.` The second hub link (line 171) and the contact CTA (line 197) stay. The template also adds a hub CTA after the article.

**F4 (writer). The secondary keyword and n-gram "ux research partner" is missing.** Replace line 80:

`**Method fit.** A vendor runs the methods you ordered; a partner asks why you ordered them, and pushes back with a reason tied to your decision.`

with:

`**Method fit.** A vendor runs the methods you ordered; a UX research partner asks why you ordered them, and pushes back with a reason tied to your decision.`

**F5 (writer). The generative/evaluative bullets repeat the hub's definition sentence.** The hub says "generative research finds what to build, and evaluative research checks whether a design works for users". The post's bullets reuse "Generative research finds what to build" and "Evaluative research checks whether a design works" word for word. The brief says not to re-explain methods and to describe them only from the buyer's angle. Replace lines 35–36:

```
- **Generative research** finds what to build, through user interviews and contextual inquiry.
- **Evaluative research** checks whether a design works, through usability testing, tree tests and concept tests.
```

with:

```
- **Generative research** answers "what should we build?", so the agency needs field time for user interviews and contextual inquiry.
- **Evaluative research** answers "does this design work?", so the agency needs a prototype to put in front of users through usability testing, tree tests or concept tests.
```

## 5. Internal links: PASS

- 8 internal body links: `/services/ux-research-services/` ×2, `/industries/saas/`, `/case-studies/tradezella/`, `/services/usability-testing-services/`, `/case-studies/toolsgroup-supply-chain-ux/`, `/industries/healthcare/`, `/contact/`. That is within 6–12.
- Every target exists in `out/` as `<path>/index.html` (checked against the built HTML).
- The first hub link is at about word 223 ("UX research services", inside the first section). The second is at about word 1,788 of 2,325 ("our UX research program and pricing page").
- Anchors are all different. The brief's British "programme" was correctly changed to "program".
- Advisory only, not blocking: `seo:check` warns that `/industries/saas/` is linked with 3 different anchors site-wide. One of them is this post's "software as a service (SaaS) products". This is a warning, 0 errors.

## 6. Images: FAIL

Passing checks:
- All 6 SVGs exist in `public/blog/choose-ux-research-agency/` and are copied to `out/`.
- All 6 parse in Chromium's DOMParser with no `parsererror`.
- No text bounding box falls outside its viewBox, and no text overlaps.
- No `<image>`, external URLs or third-party logos or brand assets.
- Alt texts describe each image's content specifically. Captions are present.
- I pulled every text node and checked spelling and wording against the post. There are no typos, and the figures match the post: weights 15/20/15/15/10/10/15 = 100%, 8 vs 24 interviews, days 1–2/2–4/4–5/5–10. The proposal graphic is labelled "Hypothetical example for illustration, not market data".
- All 5 inline images load on the built page once scrolled into view (naturalWidth 1200).

**FAIL (content-visual-designer). Infographic text is not legible at the size the page shows it.** In the built page, `.prose img` renders the 1200px-wide SVGs at **628px on a 1440px desktop (scale 0.52)** and **354px on a 390px phone (scale 0.30)**. The images are not linked to a full-size view. Measured font sizes in the SVGs and their rendered size on desktop:

| File | Smallest text (SVG px → desktop px → mobile px) | Main labels (SVG → desktop → mobile) |
|---|---|---|
| agency-scorecard.svg | 14 → 7.3 → 4.1 (criterion sublabels) | 18 → 9.4 → 5.3 |
| first-two-weeks-timeline.svg | 14 → 7.3 → 4.1 (day numbers, "Days 1–2") | 15–17 → 7.8–8.9 → 4.4–5.0 |
| proposal-normalization.svg | 15 → 7.8 → 4.4 (chips) | 18 → 9.4 → 5.3 |
| red-flag-map.svg | 15 → 7.8 → 4.4 (warning sublabels) | 18–20 → 9.4–10.5 → 5.3–5.9 |
| research-brief-checklist.svg | 15–16 → 7.8–8.4 → 4.4–4.7 (field prompts) | 22 → 11.5 → 6.5 |

An in-page screenshot at 1440px confirms that the scorecard's "what to check" lines and the timeline's descriptions cannot be read without zooming. The cover passes (smallest text is 20px on a 1600px-wide hero).

Required fix (redesign the 5 inline SVGs, keeping the same content and files):
- Every text element must render at ≥ 12px at the 628px desktop column. In a 1200px-wide viewBox that means **≥ 24px for the smallest text and ≥ 28px for row and card labels**. The other option is a narrower viewBox (for example 800px wide, with ≥ 16px and ≥ 19px text).
- To make room, cut the words per graphic to labels only. The full wording already lives in the post's tables and lists. For example, drop the scorecard's "what to check" sublabels and the timeline's description sentences.
- For mobile, use a single-column, taller layout (the timeline and red-flag map stack well) so text stays ≥ 10px at 354px. Or the orchestrator wraps each inline image in a link to its full-size SVG (template change in `app/blog/[slug]/page.tsx`).
- Re-run the DOMParser and getBBox checks, plus an in-page screenshot at 1440px and 390px, before handing back.

## 7. Readability: FIX

- No paragraph has more than 4 sentences (scripted check). The page is scannable: 5 tables, numbered steps for the brief, red flags and the first 2 weeks, and bulleted checks. There is no filler.
- Word count is 2,325 including tables (1,908 excluding them), about 2,295 after F1. That is about 4% over the writer spec's 2,200 cap. The overage is in tables, which help scanning, so I am not asking for cuts. The writer already has a lesson on budgeting words per H2.
- 5-gram overlap: 0.00% with `ai-ux-design`, `fintech-ux-design`, `generative-ai-ux` (all three are "TODO" stubs). 0.34% with the hub `ux-research-services.json`. 0.00% with `usability-testing-services.json`. 0.34% across all of them combined, under 12%. The hub overlap is the generative/evaluative definition, handled in F5.
- US English: there are no British spellings ("normalize", "program", "synthesize", "rigor" are all US). There are two British "agree X" constructions:

**F2 (writer).** Line 57: replace `the client still writes the brief, agrees the objectives and keeps stakeholders bought in.` with `the client still writes the brief, agrees on the objectives and keeps stakeholders bought in.`

**F3 (writer).** Line 185: replace `**In the first 2 weeks a good UX research agency agrees the research questions, finalizes the screener, starts recruitment and books the first sessions.**` with `**In the first 2 weeks a good UX research agency agrees on the research questions, finalizes the screener, starts recruitment and books the first sessions.**`

## 7a. Competitor originality: PASS (limited evidence)

- WebFetch of `https://fuselabcreative.com/how-to-choose-a-ux-research-agency/` returned EGRESS_BLOCKED, so I judged it from WebSearch snippets of the page. A numeric 5-gram overlap against the full competitor text was not possible.
- The snippets show the page opens with a definition ("A UX research agency is a specialist team that studies how real people…"), frames the agency as "turning vague concerns into testable questions", and centers on usability testing ("usability testing… often sits at the center of well-run UX research services").
- This post opens with a scenario, not a definition, and starts from the product decision. Usability testing is one method among several. None of the snippet phrasing appears in the post. The heading order and examples are not mirrored.
- All 7 brief serpGaps are covered:
  - weighted scorecard (line 65 table and the SVG)
  - recruitment test: screener, no-show policy, fraud checks, incentives (lines 84–102)
  - proposal normalization (lines 152–171)
  - contract and data terms: recordings, PII retention, consent, HIPAA BAA (lines 173–181)
  - redacted sample readout and traceability (lines 104–116)
  - research-specific criteria: dedicated researchers, synthesis, repository handover
  - the first 2 weeks (lines 183–197)
- AnswerLab's partner-vs-vendor idea appears in one sentence in our own words (line 80), as the brief requires.

## 7b. Silo and leads: PASS

- `services[0]` is `ux-research-services`, the correct hub. The only cross-hub link is `usability-testing-services`, inside the participant-count paragraph, which is where the brief allows it. There are no links to other silos' posts.
- `funnel: bofu`. The keyword is a buyer-ready query and matches the funnel.json BOFU example "how to choose a ux design agency". serviceSupport is 5, which meets the BOFU minimum of 5.
- The lead angle is delivered naturally:
  - "We answer these 12 on a first call…" (line 137)
  - the $25,000–$60,000 / 4–8 weeks range with a link to the hub (line 171)
  - "Send us your research brief… scoped research plan with a fixed price, plus a 30-minute call with the lead researcher" (line 197)
  
  None of these is a hard sell.

## 7c. Variety: PASS

- `fingerprints.json` has no posts. The only other blog files are `ai-ux-design`, `fintech-ux-design` and `generative-ai-ux`. They are all `type: Article` in other silos with body "TODO: article body.", so this post has no structure, intro or closing to repeat.
- The post follows its own brief fingerprint: scenario intro and the outline's section order.
- The orchestrator should add this post's fingerprint when it publishes.

## 8. Build: PASS

- `SHOW_DRAFTS=1 npm run build`: exit 0. The draft is rendered at `out/blog/choose-ux-research-agency/index.html`.
- `npm run seo:check`: exit 0, "78 pages checked · 0 errors · 7 warnings". None of the warnings is about this post's own metadata. The one link warning is the site-wide `/industries/saas/` anchor note above. The rest are about existing stub posts and an author page.
- `npm run lint`: exit 0. The only output is jsx-ast-utils "TSNonNullExpression" notices, which are not errors.
- JSON-LD on the post includes BreadcrumbList, BlogPosting and FAQPage (5 questions). The FAQPage content bug is F1.

## FIX list (orchestrator applies)

- F1: delete the closing paragraph after the last FAQ.
- F2: line 57, "agrees the objectives" becomes "agrees on the objectives".
- F3: line 185, "agrees the research questions" becomes "agrees on the research questions".
- F4: line 80, "a partner asks why" becomes "a UX research partner asks why".
- F5: rewrite the generative/evaluative bullets (lines 35–36) as given above.

## FAIL list

- Item 6: all 5 inline infographics (`agency-scorecard.svg`, `first-two-weeks-timeline.svg`, `proposal-normalization.svg`, `red-flag-map.svg`, `research-brief-checklist.svg`). Text renders at 7–11px on desktop (628px column) and 4–6.5px on mobile (354px). The content-visual-designer must re-export them to the spec in section 6. QA then re-checks item 6 only.

VERDICT: FAIL
