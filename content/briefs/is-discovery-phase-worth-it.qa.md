# QA report: is-discovery-phase-worth-it (2026-10-10, review loop 2, final)

Post: `content/blog/is-discovery-phase-worth-it.md` at 24fe18b ("repair loop 1"), diffed against the loop-1 review commit 87f3542. The working tree is clean, and `git status -- public/blog/is-discovery-phase-worth-it/ content/briefs/` shows no uncommitted assets. The SVGs are unchanged since loop 1.
Items 2–3 (facts, honesty) belong to the parallel fact-checker and are not covered here.

## Results

| # | Check | Result |
|---|---|---|
| 1 | Intent & cannibalisation | PASS |
| 4 | Semantic SEO | FIX (1 item: F1 bold answer at 38 words) |
| 5 | Internal links | PASS |
| 6 | Images | PASS |
| 6b | Duplication / image first | PASS |
| 7 | Readability | FIX (1 small item) |
| 7a | Competitor originality | PASS (unchanged from loop 1; numeric overlap could not be computed) |
| 7b | Silo, funnel & leads | PASS |
| 7c | Variety | PASS |
| 7d | Semantic completeness | PASS |
| 7e | On-page checklist | PASS (score 100) |
| 8 | Build / seo:check / lint | PASS |

## Loop-1 items: all landed
- FIX 4.1–4.6 and 7.2–7.3 are applied word for word (diff 87f3542..24fe18b).
- 7.1 (the closing) was adapted by the orchestrator. It is now 2 paragraphs of 2 and 3 sentences. The always/every clash with the skip test is gone: the team "scopes that proposal from the inputs above, whether your score points to full discovery, a light sprint or design right away". This matches the 0–2 / 3–4 / 5–6 exits.
- Guidance gaps 1–5 are all filled. Next steps were added at L138, L152 and L164. Jobs to be Done now has substance in open text (L59, with the clinic example labelled made-up). The cost position comes from hub facts only (L195: first steps of an 8–16 week engagement, published $60,000–$180,000 for the whole engagement, #cost link). The post does not say or imply that discovery is sold on its own.

### 1. Intent & cannibalisation: PASS
Unchanged from loop 1. No other page in `content/` targets the query.

### 4. Semantic SEO: FIX
- Built `<title>` is 48 chars, H1 62. The description is 157 chars on the built HTML (no entities) and ends on the BOFU next step "then request a fixed-scope proposal". The "it" antecedent is fixed ("see what discovery hands design").
- Keyword sentences (swap test with "this choice"):
  - L26 "…makes a founder ask: is a discovery phase worth it before anyone designs a screen?" PASS
  - H2 L30: PASS
  - L113: PASS
  - L197 "So, is a discovery phase worth it for your product?" PASS
  - Description: PASS
  - No participle dangles after a comma in any of them.
- Exact keyword: 4 uses in open text (2,408 words), the same number in the full body. Phrase share is about 1.0%. Stacking grep (keyword + project/engagement/team/cost/pricing): none. Digit-first grep: none. Hedges and banned words: none.
- Acronym first use in open text (`<details>` stripped):
  - NFT L26, SVPG L36, HEART and SUS L61, MVP L109 (expanded in the same sentence, before "discovery phase vs MVP"), UI L158, AI L148, NN/g and UX L170: all expanded at first use. The UX in the L109 link URL is not text.
  - "FAQ" at L164 is left as a universal term.
- Boolean FAQs and the L90 body question start with Yes/No: PASS.
- Shared-verb pairs in the new F1 bold answer: "gave Nitro League its user flows" (L146), "gave Vocable the problems each screen was designed around" (L148), "gave Digno its score calculation" (L150). All true and grammatical.
- Bold answers (words): 27, 24, 26, 31, 27, **38**, 22, 25, 25.

**FIX 4.7 (H2 "What did discovery settle…", bold answer L142, 38 words).** It can be shortened without changing a fact. Drop the trailing clause ", and the design was built on that". It is a second "and" clause after a list that already ends in "and Digno…". "Came before the screens" plus each case's "Built:" line already carries the point. Every fact-checker phrase is kept verbatim. Replace:
`**In all three idea-to-product projects, early research came before the screens: it gave Nitro League its user flows, Vocable the problems each screen was designed around, and Digno its score calculation, and the design was built on that.**`
with
`**In all three idea-to-product projects, early research came before the screens: it gave Nitro League its user flows, Vocable the problems each screen was designed around and Digno its score calculation.**`
(31 words, one sentence. It no longer repeats the next line "Each case study reports results from the whole project".)

### 5. Internal links: PASS
- 8 contextual links: Nitro, hub (intro), startups, Vocable, Digno, hub #cost, /contact/, /about/. Every target is in `out/`, and the `#how-much-does-digital-product-design-cost` id exists. Anchors are varied.
- "free consultation" appears exactly once, in about.md's standalone sentence.

### 6. Images: PASS
- Cover + 5 inline SVGs, byte-identical to loop 1 (same sizes, no commit touched `public/`). Every one exists in `out/` with descriptive alt text (109–204 chars).
- The loop-1 rendered-legibility and spelling results still hold (smallest text 24.7px at 1440 and 11.5px at 390 in a 354px column, as in loop 1). No server was needed this loop. `ps` shows no serve, http.server or next processes left over.

### 6b. Duplication / image first: PASS
- 5 images, each followed directly by its `<details class="astext">` block. None of the details blocks changed in the repair.
- The new open paragraphs do not repeat image items:
  - L59 (Jobs to be Done) adds a definition and an example beyond the output-stack row "Picks the users and job every screen serves".
  - L138 refers to the ladder's rungs without listing them.

### 7. Readability: FIX (1 small item)
- 5-gram overlap: at most 0.36% against any single post, 0.51% against all posts combined, 1.06% against the hub (`content/services/digital-product-design-services.json`) and 0.03% against startups. The limit is 12%.
- Every paragraph has 4 or fewer sentences. US English.

**FIX 7.4 (FAQ "Is a design sprint the same as a discovery phase?", L205).** "quickly" appears twice in one 3-sentence answer. Replace:
`A sprint fits when one bet needs testing quickly; a full discovery phase fits when several user groups, jobs or success metrics are still open.`
with
`A sprint fits when one bet needs testing; a full discovery phase fits when several user groups, jobs or success metrics are still open.`

### 7a. Competitor originality: PASS
Unchanged from loop 1, and the repairs added no competitor-style figures. Every serpGap is now covered, including published prices (L195).

### 7b. Silo, funnel & leads: PASS
- `services[0]` is the hub. funnel is BOFU. Service-support is 5.
- leadAngle is delivered at L113 and L189, and the close is a soft ask.
- Production build (no SHOW_DRAFTS): exit 0. `grep -rl 'href="/blog/generative-ai-ux'` over `out/**/*.html` finds 0 files. The draft post itself is not built: `out/blog/is-discovery-phase-worth-it/` holds only the 6 public SVGs, with no index.html and no sitemap entry. seo:check on the production build gives 73 pages, 0 errors, 0 warnings.

### 7c. Variety: PASS
- The closing lead-in (ledger rows) and the CTA anchor ("send us your three riskiest assumptions") are new.
- "Every project begins with a free consultation and a fixed-scope proposal." is now in the closings of 4 consecutive posts. It is kept as the orchestrator-sanctioned about.md offer sentence (semantic-content-writer lesson 2026-10-09), used once. Note for the owner: if this sentence should count as a reused closing under RULES L72, the fix belongs at site level, not in this post.

### 7d. Semantic completeness: PASS
- Every H2 has a bold answer, then how/why, then a concrete example, number or step.
- Every H2 now ends on a reader action or decision.
- All brief entities, attributes, questions and n-grams are covered with substance in open text. Figma and Jobs to be Done now appear outside `<details>` too.
- FAQ answers have 2 or 3 sentences each. No trailing or unfinished sentences. The intro promises (the skip test and the buy-or-skip decision) are delivered, and each takeaway is backed by a section.

### 7e. On-page checklist: PASS
`npm run onpage -- /blog/is-discovery-phase-worth-it/` (SHOW_DRAFTS build): score 100, `failed: []`, 3,212 words.
- FAQPage `acceptedAnswer.text` was printed from `out/`: each of the 5 answers holds only its own text, and the closing paragraph is not leaked.
- Schema: BreadcrumbList, BlogPosting, FAQPage, Person.

### 8. Build: PASS
- `SHOW_DRAFTS=1 npm run build`: exit 0.
- `npm run seo:check`: 0 errors, 6 warnings, all on pre-existing draft stubs and the author archive.
- `npm run lint`: exit 0.
- Production `npm run build`: exit 0. seo:check: 0 errors, 0 warnings. Note: `out/` now holds the production build.

## Guidance for the writer
No completeness gaps remain. Apply FIX 4.7 and FIX 7.4 exactly as written. Neither changes the keyword count, the acronyms or any fact.

## FAIL list
None. 2 FIX lines for the orchestrator: 4.7 (bold answer L142) and 7.4 (FAQ L205).

VERDICT: PASS
