# QA report: mobile-app-design-agency-vs-freelancer (2026-10-11, review loop 2, final)

Reviewer: content-qa. Post HEAD 189cb6c (repair d5bbd4d + image sync 189cb6c); `git status` clean (post, SVGs, briefs all committed).
Diff reviewed: `git diff 88393a1 HEAD -- content/blog/mobile-app-design-agency-vs-freelancer.md`. Items 2–3 belong to the fact-checker (its facts win, per the orchestrator).

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Intent & cannibalisation | PASS (unchanged) |
| 4 | Semantic SEO | PASS (Q4 housekeeping FIX) |
| 5 | Internal links | PASS (6, unchanged) |
| 6 | Images | PASS |
| 6b | Duplication | PASS (F1–F3 closed) |
| 7 | Readability & overlap | FIX (Q3) |
| 7a | Competitor originality | PASS (unchanged; codewave fetch blocked in loop 1) |
| 7b | Silo & leads | PASS |
| 7c | Variety | FIX (Q5) |
| 7d | Completeness + routing | PASS on G1/G2; FIX Q1, Q2 (routing order / scenario scope) |
| 7e | On-page | PASS (score 100, failed []) |
| 8 | Build / seo:check / lint / production build | PASS |

## Loop-1 items
F1 ✓ (L114 has no lengths; all five day ranges sit in the collapsed block L121 and match the SVG pills). F2 ✓, F3 ✓ (L65/L67 no longer enumerate the pairs). F4 ✓ intro, F14 ✓ FAQ 1, F15 ✓ (stage line removed). F5 ✓ (WCAG expanded at L59, its first open-text use). F6 ✓. F7 ✓. F8 ✓. F9 ✓ (L181). F10 ✓ (L150/L152 split). F11 ✓ (takeaway 2 now lists the tree's questions in order). F12 ✓ partly; see Q5. F13 ✓ (fact-checker wording). F16 ✓ (L32 names the fourth variable, L36 points at the tree). F17 ✓ (bold 22 words).
- **G1 closed:** L42, 2 sentences / 58 words, two concrete consequences (TestFlight-after-code; Android as quote line 1, which matches the card's line 1). The bold answer is not restated.
- **G2 closed:** L187 gives the conversion steps (hours per line, revision cap, own rate, capped total) and the Upwork hourly vs fixed-price distinction. Upwork now has substance in the open text. See Q3 and Q4 for two defects in that paragraph.
- Removed "One design serves a React Native or Flutter app too" (writer trim, logged in writer learnings 2026-10-11). L104 still names Swift, Kotlin, React Native and Flutter, so it is accepted, not a gap.

## Routing summaries vs decision-tree.svg
Tree (SVG and L162–165 agree): Q1 fixed launch date Yes → agency; Q2 both platforms Yes → Q4, No → Q3; Q3 testing No → freelancer, Yes → Q4; Q4 Yes → freelancer + your PM, No → agency. Solo track is on the left in twin-timeline.svg (x=64), so L114 "left track" is right.
- Intro L26 ✓: walked all 5 leaves; order is override → skip leaf → shared node.
- Takeaway 2 ✓: the four questions in the tree's order.
- FAQ 1 L213 ✓: all 5 leaves.
- Agency bullets L177–179 ✓.
- **H2 bold L156 ✗ (Q1):** not rewritten in the repair. It still puts the launch date last: "Hire a freelancer for a one-platform app with no flows to test … ; otherwise, or with a fixed launch date, hire an agency." Counter-case: a one-platform app with no flows to test and a campaign date → the first clause says freelancer, the last says agency. The tree says agency (Q1 first).
- **Freelancer bullets L171–172 ✗ (Q2):** counter-case: a UI refresh or one new flow in an iOS + Android app with nobody in-house to review builds → tree Q2 Yes → Q4 No → agency. The bullets route it to a freelancer because their scope is not stated.
- every/always/all/never grep: L40 "all six", L42 "every fix becomes a code change" (conditional on no testing), L112 "every task", L150 "every case study", L173 "never becomes a build", L187 "every revision round", L207 "Every project begins" (sanctioned about.md sentence; "free consultation" ×1), L217 "not always". None contradicts the tree. Superlatives: L148 "The first three checks matter most" was unchanged since loop 1; the checklist image does not rank its checks, so there is no conflict.

## 4. Semantic SEO: PASS
- Built HTML: title 53 (metaTitle), H1 58, meta description 148: "Mobile app design agency vs freelancer: compare who covers iOS and Android, user testing and developer handoff. Then request a fixed-scope proposal." The next step is "Then request a fixed-scope proposal." ✓
- Keyword sentences ("this choice" swap): L26 "The mobile app design agency vs freelancer decision is usually framed…" ✓ (brief carrier); L30 "the … question turns on" ✓; L181 "If the tree settles the … question in favor of an agency, your app fits the 4–8 week engagement we run, which ends with…" ✓ ("which" → engagement); L207 "Weighing a mobile app design agency vs freelancer usually ends with…" ✓. Stacking grep: only the "decision/question" carriers ✓. `vs` grep: all carry a determiner ✓. Digit-first grep: 0 ✓. Banned phrases and hedges: 0 ✓.
- Comma + participle hits checked: L42 "after developers have coded it" ✓; L187 "multiply by…" (imperative series) ✓.
- Density: 4 exact uses in 2,456 body words = 0.98% (body only); 1.22% counting the rendered H1. Accepted, because the brief caps at 4–6 and no further use reads naturally.
- Bold answers: 29, 29, 30, 26, 22, 29, 27, 31 (L156, see Q1; the fix keeps 31), 26. One sentence each ✓.
- Abbreviations on `<details>`-stripped text plus takeaways: PM L34, UI/UX L36, WCAG L59, HIG L63, pt/dp L67, dp in takeaway 3 ✓.
- FAQs: boolean ones open Yes/No; each has ≥ 2 sentences. FAQPage JSON-LD answers hold only their answer ✓.
- **Q4 (housekeeping):** L187 ends with `<!-- source: https://support.upwork.com/… -->`. It is invisible, but it ships in the public HTML and twice in the RSC payload. No other post carries source comments.

## 5. Internal links: PASS
These are unchanged from loop 1: hub L36, iOS hub L83, TradeZella and Anyday L150, hub #cost L205, /contact/ L207. All targets build.

## 6 / 6b. Images and duplication: PASS
- 7 SVGs (2–13 KB) in `public/` and `out/`. Resynced platform-pairs ("iOS date picker (compact, inline or wheels)"), phone-checklist (card 2 rewritten) and twin-timeline ("Flows and wireframes for iOS and Android", no "recruiting starts"): every label matches its Show-as-text block word for word, alts match, visuals.json markers updated, and native-render text-in-box overflow is 0.
- Built page (python http.server PID 3781, no other server before; stopped, `ps` confirms it is gone): `article.prose` measures 760px at 1440 and 354px at 390, a scale of 0.95 / 0.44. The smallest SVG text (26) renders at 24.7 / 11.5px, the same as loop 1. Every image is followed by a closed `<details class="astext">`. The open `ul`s are takeaways, the 4 test questions and the 6 scenario lines; none repeats an image. The cover at 390 is cropped to 354×199 and the title, subtitle and question stay inside ✓. The floating CTA bar and the progress line in screenshots are overlays (lessons 10-09/10-10).

## 7. Readability & overlap: FIX
- No paragraph > 4 sentences. Body 2,456 words (cap about 2,450) ✓. 5-gram overlap: ux-audit 0.6% (about.md offer + WCAG expansion only), hub 2.8%, all others < 0.8% ✓.
- **Q3:** L187 "set that capped total beside the rounds the fixed-scope proposal includes" compares a dollar total with a count of rounds. This was my own G2 wording.

## 7c. Variety: FIX
Takeaways, intro close, price sentence and closing were set side by side with ux-audit-agency-vs-freelancer. The intro and takeaways now follow the tree's cascade, which is a different shape from ux-audit's "senior freelancer: one platform, 2–3 flows, owner" ✓. Closing ✓.
- **Q5:** L205 still carries two echoes. (a) "with four, the lower total covers less of the app" restates ux-audit L180 "the cheaper quote is often just a smaller audit", and it repeats this post's own L32 ("priced a different app"). (b) "Set both totals against our published $25,000–$60,000 range for 4–8 weeks; … are [what drives …pricing] inside it" keeps ux-audit L195's "range for N weeks; [pricing factors] … within that range" ending, and "are what drives … inside it" reads awkwardly.

## 7b. Silo & leads: PASS
BOFU; service-support 5; services[0] is the mobile hub. Lead moment 1 is at L181 (natural, site wording) and lead moment 2 at L207. One price statement ($25k–$60k / 4–8 weeks) ✓.

## 7e. On-page: PASS
`SHOW_DRAFTS=1 npm run build` → `npm run onpage -- /blog/mobile-app-design-agency-vs-freelancer/`: `score: 100, failed: []`, words 3052. Manual items: real author + contributor ✓, answer-first ✓, 5 external sources ✓, SVGs < 14 KB ✓, updated = date ✓.

## 8. Build: PASS
- `SHOW_DRAFTS=1 npm run build`: exit 0. `npm run seo:check`: 0 errors, 6 warnings, all pre-existing on other pages. `npm run lint`: exit 0.
- **Production build (no SHOW_DRAFTS), run last:** exit 0. There is no `out/blog/mobile-app-design-agency-vs-freelancer/index.html`, the sitemap has 0 hits, and `grep -rl 'href="/blog/mobile-app-design-agency-vs-freelancer'` over `out/**/*.html` returns 0. The folder exists only for the copied SVGs (lesson 10-10). seo:check on the production build: 75 pages, 0 errors, 0 warnings. **`out/` now holds the production build.** After applying the FIXes below, rebuild once more before publishing.

## FIX list (exact replacements for the orchestrator)

**Q1 (7d, L156 bold: tree order, 31 words)**
- old: `**Hire a freelancer for a one-platform app with no flows to test, or when your PM runs testing and build review; otherwise, or with a fixed launch date, hire an agency.**`
- new: `**If your launch date can slip, hire a freelancer for a one-platform app with no flows to test, or when your PM runs testing and build review; otherwise, hire an agency.**`

**Q2 (7d, L169 scenario scope)**
- old: `Freelancer situations:`
- new: `Freelancer situations (one platform with no flow to test, or a PM who reviews the builds):`

**Q3 (7, L187)**
- old: `and set that capped total beside the rounds the fixed-scope proposal includes.`
- new: `and set that capped total beside the fixed-scope proposal's price and the revision rounds it includes.`

**Q4 (4, L187: remove the public source comment; make it a citation)**
- old: `On Upwork, ask which contract the quote assumes: hourly contracts bill logged hours weekly, up to any weekly limit you set, while fixed-price contracts pay by milestones you fund before work starts. <!-- source: https://support.upwork.com/hc/en-us/articles/211063418-How-hourly-and-fixed-price-contracts-are-different-on-Upwork -->`
- new: `On Upwork, ask which contract the quote assumes, because [Upwork's hourly and fixed-price contracts](https://support.upwork.com/hc/en-us/articles/211063418-How-hourly-and-fixed-price-contracts-are-different-on-Upwork) work differently: hourly contracts bill logged hours weekly, up to any weekly limit you set, while fixed-price contracts pay by milestones you fund before work starts.`
- If the fact-checker cannot confirm the URL, delete only the ` <!-- source: … -->` comment instead and keep the reference in facts.md.

**Q5 (7c, L205)**
- old: `with four, the lower total covers less of the app. Set both totals against our published $25,000–$60,000 range for 4–8 weeks; flows, platforms, test rounds and UI kit size are [what drives mobile app design pricing](/services/mobile-app-ui-ux-design-services/#how-much-does-mobile-app-ui-ux-design-cost) inside it.`
- new: `with four, add your extra cost for each empty line to its total before you compare. Our proposals land between $25,000 and $60,000 for 4–8 weeks, and your count of flows, platforms, test rounds and UI kit components is [what drives mobile app design pricing](/services/mobile-app-ui-ux-design-services/#how-much-does-mobile-app-ui-ux-design-cost) toward one end or the other.`

## Guidance for the writer
No completeness gaps remain. G1 and G2 are closed, and every H2 has bold → detail → example → next step. Apply Q1–Q5 as written; none of them changes the word count by more than about 10 words.

VERDICT: PASS
