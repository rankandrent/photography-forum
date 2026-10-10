# QA report: is-discovery-phase-worth-it (2026-10-10, review loop 1)

Post: `content/blog/is-discovery-phase-worth-it.md` (commit 87f3542, working tree clean).
Brief: `content/briefs/is-discovery-phase-worth-it.json`. Visuals: `public/blog/is-discovery-phase-worth-it/` (cover + 5 inline, all committed, `git status` clean).
Items 2–3 (facts, honesty) belong to the parallel fact-checker and are not covered here.

## Results

| # | Check | Result |
|---|---|---|
| 1 | Intent & cannibalisation | PASS |
| 4 | Semantic SEO | FIX (6 items) |
| 5 | Internal links | PASS |
| 6 | Images | PASS |
| 6b | Duplication | PASS |
| 7 | Readability | FIX (1 item) |
| 7a | Competitor originality | PASS (overlap could not be computed) |
| 7b | Silo, funnel & leads | PASS (with 1 FIX) |
| 7c | Variety | PASS |
| 7d | Semantic completeness | FAIL (5 gaps, see writer guidance) |
| 7e | On-page checklist | PASS (score 100) |
| 8 | Build / seo:check / lint | PASS |

### 1. Intent & cannibalisation: PASS
- Keyword "is a discovery phase worth it" is a buy-or-skip question. The post answers it in the intro and the first H2 and stays on the decision. It does not drift into a how-to guide.
- Grep of `content/` for "discovery phase" and "product discovery": the only hits are the hub's Double Diamond line, Nitro's case study, and e-commerce/location pages that use "product discovery" in the shopping sense. No `keyword`, title, H1 or metaTitle targets this query. The draft stub `generative-ai-ux` in the same silo covers a different topic.

### 4. Semantic SEO: FIX
- Title (H1) 62 chars, metaTitle 48 (built `<title>` 48, keyword first), description 153 on built HTML (no entities). One H1.
- Keyword sentences quoted and checked with the "this choice" swap test:
  - L26 "…the kind of product that makes a founder ask: is a discovery phase worth it before anyone designs a screen?" PASS
  - H2 "Is a discovery phase worth it for a new product?" PASS
  - L111 "Your score is your own answer to "is a discovery phase worth it?"" PASS
  - L189 "So, is a discovery phase worth it for your product?" PASS
  - Description: "Is a discovery phase worth it? Yes for most new products." PASS
- Keyword stacking (keyword + noun): none. "The discovery phase vs MVP choice" is normal English, but it fails the abbreviation rule (FIX 4.3).
- Density: 4 exact uses. That is 0.93% of the full body (2,579 words including collapsed text) and 1.13% of the open text (2,120 words). This is inside the brief's 4–6 target. Accepted, and no more uses should be added: the two closing uses already sit close together.
- Digit-first sentences: `grep -nE '^(\*\*)?[0-9]+ '` finds none in the body.
- Banned phrases and hedges (might/may/could/perhaps): none.
- Boolean FAQs start with Yes/No: PASS for all three. Body defect at L88: see FIX 4.5.
- Bold answers: one sentence each, all ≤ 31 words. The skip-test bold is 31 words, which is accepted as about 30.
- Shared-verb lists, each pair quoted:
  - H2 1: "assumption about your users / the job they need done / whether they will pay / whether they can use the product … lacks evidence". PASS
  - H2 2: "hands design a product brief / a research report / a sitemap with user flows / agreed success metrics". PASS
  - H2 8: "states a decision / shows the evidence / hands over outputs". PASS
  - H2 9: "Bring your score / your riskiest three assumptions / your number of user groups". PASS
  - L181: "warning signs: no user interviews / only stakeholder opinions / no stated decision / outputs that restate". PASS
  - Description: "Use our 6-question skip test, see what it hands to design" fails. "It" points back to the skip test, and the test hands nothing to design (FIX 4.1).

**FIX 4.1 (description, frontmatter L4).** "it" has the wrong antecedent. Replace:
`description: "Is a discovery phase worth it? Yes for most new products. Use our 6-question skip test, see what it hands to design, then request a fixed-scope proposal."`
with
`description: "Is a discovery phase worth it? Yes for most new products. Use our 6-question skip test, see what discovery hands design, then request a fixed-scope proposal."`
(157 chars. It still ends on the BOFU next step "request a fixed-scope proposal".)

**FIX 4.2 (H2 3 bold answer, L65).** The participle "sorted" dangles after "if they proved wrong". Replace:
`**Test the assumptions that would change the product if they proved wrong, sorted into value, usability and viability, each with a method and an evidence bar.**`
with
`**Test first the assumptions that would change the product if wrong, and sort each into value, usability or viability with a method and an evidence bar.**`

**FIX 4.3 (MVP used before it is expanded, L107).** Replace:
`The discovery phase vs MVP choice is a false one: a minimum viable product (MVP) tests the product in the market, and discovery decides what that MVP has to prove.`
with
`A minimum viable product (MVP) tests the product in the market, and discovery decides what that MVP has to prove, so discovery phase vs MVP is a false choice.`

**FIX 4.4 (UI and UX never expanded in open text).**
- L152: replace `prototype validation and UI design.` with `prototype validation and user interface (UI) design.`
- L162: replace `surveyed UX practitioners` with `surveyed user experience (UX) practitioners`

**FIX 4.5 (L88, boolean question left unanswered).** Replace:
`Can you skip product discovery? The test answers from evidence you hold, not from deadline pressure, and its cut-offs are our rule of thumb from running engagements, not research data.`
with
`Can you skip product discovery? Yes, if the test says so: it scores the evidence you already hold, not deadline pressure, and its cut-offs are our rule of thumb from running engagements, not research data.`

**FIX 4.6 (L59: dangling "scored"; Figma only appears in collapsed text).** Figma, a brief entity, shows up only inside `<details>`. Replace:
`In our process, researchers synthesize the user interviews in Dovetail, and the flows feed a clickable prototype that a later step tests with 5 users per round in Maze, scored with the System Usability Scale (SUS).`
with
`In our process, researchers synthesize the user interviews in Dovetail, and the flows feed a clickable prototype in Figma that a later step tests with 5 users per round in Maze; each round ends with a System Usability Scale (SUS) score.`
(The last clause is the hub's own wording, from the "Prototype and validation" step.)

### 5. Internal links: PASS
- 8 contextual links: Nitro (intro), hub (intro, UP early), startups hub (the only cross-hub link), Vocable, Digno, hub #cost (UP near the end), /contact/, /about/. Every target exists in `out/`. The `#how-much-does-digital-product-design-cost` id exists on the hub. Anchors are all different.
- The 3 case-study DOWN links are accepted as the orchestrator asked. Each one is the source of a quoted figure, and all 3 list `digital-product-design-services` in `services`.
- 2 external sources (SVPG, NN/g article) plus GOV.UK.

### 6. Images: PASS
- Cover + 5 inline SVGs, 3.6–8.7 KB each. No `<image>` embeds, no logos or third-party brand assets. Every image has descriptive alt text.
- Rendered in the built page (python http.server, PID 1652, stopped and confirmed gone with `ps`). `article.prose` measures 760px at 1440 and 354px at 390. Smallest SVG text is 26px in an 800 viewBox, so it renders at 24.7px at 1440 and 11.5px at 390. Spelling checked label by label: no errors.
- Cover at 390: the `.pcover` box is 16:9. The SVG keeps the title, subtitle and "Full, light or skip" fully visible, with no crop of the text.
- At 1440 a thin pink line shows across the top of some element screenshots. It is the header's reading-progress element; the native SVG render (`skip-test-flow.svg`) has no such line. This is not a defect.
- Skip-test flow: every path checked. Scores 0–2, 3–4 and 5–6 lead to full discovery, the light sprint and skip, matching the bold answer, L111 and takeaway 2.

### 6b. Duplication: PASS
Every image's table or list sits in a collapsed `<details class="astext">` block. Labels were ticked off one by one:
- Output stack: 4/4 rows.
- Ledger: 4/4 rows, all 5 columns.
- Skip test: 6 questions + 3 outcomes.
- Ladder: 4/4 rungs.
- Readout: 8/8 lines. The image groups them under Decision/Evidence/Outputs, and no item is dropped.
No open paragraph repeats an image's items.

### 7. Readability: FIX
- 5-gram overlap with existing posts is 0–0.51% per post. With the hub it is 0.98%, with the startups page 0.31%, and 1.93% against all of them combined (limit 12%).
- US English throughout.
- **FIX 7.1 (closing paragraph, L189, 5 sentences, over the 4-sentence limit).** This also fixes a logic clash: "runs discovery as the first step of every … engagement" contradicts the skip test's "5–6: skip discovery and start design". Replace the whole paragraph:
`So, is a discovery phase worth it for your product? Your ledger answers better than any vendor percentage: every row still marked untested is a risk you would carry into code. When the list is ready, [send us your three riskiest assumptions](/contact/) with your skip-test score. Every project begins with a free consultation and a fixed-scope proposal. Our team, with [200+ products since 2017](/about/) behind it, runs discovery as the first step of every digital product design engagement.`
with two paragraphs:
`So, is a discovery phase worth it for your product? Your ledger answers better than any vendor percentage: every row still marked untested is a risk you would carry into code.`
(blank line)
`When the list is ready, [send us your three riskiest assumptions](/contact/) with your skip-test score, and you leave the free consultation with a fixed-scope proposal. Our team, with [200+ products since 2017](/about/) behind it, sizes the discovery and research steps of each engagement to the evidence you already hold.`
- **FIX 7.2 (FAQ "Who from our team…", L207).** The first sentence has no verb and nests commas. Replace:
`The founder or product owner who makes the build, change or stop decision, one or two people who talk to customers every week, such as sales or support, and an engineer for feasibility questions.`
with
`Three roles need a seat: the founder or product owner who makes the build, change or stop decision; one or two people who talk to customers every week, such as sales or support; and an engineer for feasibility questions.`
- **FIX 7.3 (intro, L28).** "so this post stays on…" does not follow from the clause before it. Replace:
`In our [digital product design services](/services/digital-product-design-services/), discovery and user research are the first two steps, so this post stays on the buy-or-skip decision.`
with
`In our [digital product design services](/services/digital-product-design-services/), discovery and user research are the first two steps; this post covers only whether to buy or skip them.`

### 7a. Competitor originality: PASS (numeric overlap not computable)
WebFetch of `lowcode.agency/blog/is-mobile-app-discovery-phase-worth-it` failed with ENOTFOUND. From the WebSearch snippet, the competitor answers "yes", relies on unsourced "30–50% more" and "5–15% of budget" figures, and follows the order "what it is → why worth it → costs → what's included". The post uses none of those figures (L134 says why), and its order is different: decision → outputs → assumptions → skip test → cost of skipping → cases → duration → readout → scoping. The 5-gram percentage could not be measured.
serpGaps:
- Design-led outputs: covered.
- Scored skip test: covered.
- Checkable sources instead of vendor percentages: covered.
- "Stop" as a good outcome: covered.
- Readout checklist: covered.
- First-hand cases: covered.
- Published prices: missing (see Guidance gap 4).

### 7b. Silo, funnel & leads: PASS
- `services[0]` is `digital-product-design-services`, the right hub (discovery and research are hub steps 1–2).
- Hub linked early and near the end. One cross-hub link. No links to other silos' posts.
- Funnel BOFU confirmed. The brief's SERP evidence for the exact query is vendor pages selling discovery and arguing its cost (lowcode.agency, acquaintsoft, dogtownmedia, strv, detroitlabs, elinext). The explainer SERP belongs to the "product discovery phase" variant, not the target. This is the silo's first post, and funnel.json says to start with 1 BOFU. Service-support 5 meets the BOFU minimum of 5.
- leadAngle delivered without a hard sell: the skip-test moment (L111) and the readout moment (L181).
- Draft-only "← Previous guide" points to the stub `generative-ai-ux` (draft). This is an orchestrator check on the production build, not a post defect.

### 7c. Variety: PASS
- Type Article and a mini-case intro are both unused in fingerprints.json.
- The H2 frames and visual types do not repeat the last 5 posts.
- CTA angle (assumptions + score) is new.
- Note: "What does a good discovery readout contain?" + "ask for a sample readout" is close to choose-ux-research-agency's "What should a sample research readout show you?". That post is in another silo and is not among the last 3 site-wide, so this is accepted.
- The closing is not reused. "Every project begins with a free consultation and a fixed-scope proposal" is a formula used on location pages, and FIX 7.1 removes it.

### 7d. Semantic completeness: FAIL
See "Guidance for the writer". Gaps:
1. Three H2s end with no next step.
2. Jobs to be Done is mentioned only in passing in the open text.
3. The cost-position attribute is missing.
4. serpGap "published prices" is not used.
Takeaways are all backed by sections. The intro promises only the skip test and the decision, and both are delivered. Every FAQ answer has 2+ sentences. No TODOs and no sentences that trail off.

### 7e. On-page checklist: PASS
`npm run onpage -- /blog/is-discovery-phase-worth-it/` gave score 100, `failed: []`, 2,976 words.
Manual items:
- E-E-A-T: Faizan Khan (Sr. Product Designer) with Umar Sarwar, both with LinkedIn; case-study proof; updated date. PASS.
- Snippet answers: PASS after FIX 4.2.
- External sources ≥ 2: PASS.
- Image weight under 150 KB: PASS.
- Schema: BlogPosting, BreadcrumbList, FAQPage, Person. Each FAQPage `acceptedAnswer.text` was printed from `out/` and holds only its own answer. PASS.

### 8. Build: PASS
- `SHOW_DRAFTS=1 npm run build`: exit 0.
- `npm run seo:check`: 0 errors, 6 warnings, all on other pages (pre-existing stubs and the author archive).
- `npm run lint`: exit 0 (jsx-ast-utils notices only).

## Guidance for the writer

1. **[H2 "What does skipping discovery cost you later?" / last paragraph]** The section ends on vendor percentages and gives no next step. After L134, add 1 paragraph of 2 sentences, about 45 words: tell the reader to take the top three rows of their ledger and name the rung where each would first surface without discovery; any row that would first show up in a build sprint or after launch is the case for paying for discovery now. Suggested text: "Take the top three rows of your ledger and ask on which rung each would surface without discovery. Any row that would first show up in a build sprint or after launch is your case for paying for discovery now."
2. **[H2 "What did discovery settle for Nitro, Vocable and Digno?" / end]** The section ends on Digno's revenue figure and gives no next step. Add 1 sentence, about 30 words, that links the cases to the reader's own situation. Suggested text: "If your product is where these three started, with no users and no screens yet, score the skip test above and take the result into the scoping step below." Add no new case facts.
3. **[H2 "How long does discovery take inside an engagement?" / end]** The section ends on the clinic-manager example and gives no next step. Add 1–2 sentences, about 35 words, telling the reader to count the 10–25 working days before any screen design when they set a launch date, and to book the people from the FAQ "Who from our team needs to join a discovery phase?" into week one. Use only the hub figures (5–10 + 5–15 days).
4. **[H2 "How do you scope discovery into a proposal?" / paragraph 2]** The brief attribute "cost position (inside the $60,000–$180,000 engagement; no standalone price published)" and serpGap 3 ("reason from … published prices") are missing. A BOFU reader asking "worth it" never learns what discovery costs. Add 1 sentence, about 35 words, before the price-factors sentence. Suggested text: "Discovery has no separate price on our site: its 10–25 working days sit inside the published $60,000–$180,000 engagement, which runs 8–16 weeks." Keep the #cost link. Do not state or imply that discovery can be bought on its own (brief SITE-FACT GAP 4).
5. **[H2 "What does a discovery phase hand to your designers?" / after the output-stack details block]** Jobs to be Done appears in the open text only as "Jobs to be Done mapping" (L154); its other mentions are inside collapsed tables. Add 2 sentences, about 45 words, saying what the Jobs to be Done line in the product brief holds and how the designer uses it. Suggested text: "The Jobs to be Done line names the progress a user hires the product to make, in the user's own words, for example a clinic manager who needs tomorrow's cancelled slots refilled. Designers cut any screen that does not serve that job." Label the clinic as the made-up example used in the ledger.

Apply FIX 4.1–4.6 and 7.1–7.3 as written. Then rerun the onpage score (target ≥ 95) and keep the open-text exact keyword count at 4. None of the suggested texts adds another exact use.

## FAIL list
- 7d: gaps 1–5 above (3 sections without a next step, Jobs to be Done thin, cost position / published-price serpGap missing).
- FIX items that must land before PASS: 4.1 description antecedent, 4.2 dangling "sorted", 4.3 MVP expansion order, 4.4 UI/UX expansion, 4.5 unanswered boolean, 4.6 dangling "scored" + Figma, 7.1 5-sentence closing + skip/always contradiction, 7.2 verbless FAQ sentence, 7.3 intro non sequitur.

VERDICT: FAIL
