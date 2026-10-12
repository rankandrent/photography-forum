# QA report: usability-testing-cost-per-participant (round 1, 2026-10-12)

Post: content/blog/usability-testing-cost-per-participant.md at commit 955baf6 (working tree clean, visuals and links committed).
I did not edit the post. The fact-checker is reviewing it in parallel, and my gate forbids edits. Every FIX below gives exact old/new text for the orchestrator to apply.
Figures and sources are not changed here. Where a FIX touches a sourced sentence, it is marked "fact-checker to confirm".

| # | Check | Result |
|---|---|---|
| 1 | Intent and cannibalisation | PASS |
| 4 | Semantic SEO | FIX (F1–F3, F7, F10) |
| 5 | Internal links | PASS (5, same orchestrator exception as design-system-roi) |
| 6 | Images | FIX (F5, F9) |
| 6b | Duplication (designer's near-repeat flags) | FIX (round strip, F4/F5); receipt and donut PASS |
| 7 | Readability and repetition | PASS (5-gram max 0.4% posts, 1.1% hub) + F12 |
| 7a | Competitor originality | PASS (structural; numeric overlap not computable) |
| 7b | Silo and leads | PASS |
| 7c | Variety | PASS (F12 small frame repeat) |
| 7d | Semantic completeness | FAIL (G1, G2, and the logic defects F4–F8) |
| 7e | On-page | PASS (score 100, failed []) |
| 8 | Build / seo:check / lint | PASS |

## 1. Intent and cannibalisation: PASS
- Commercial-investigation intent ("what one participant really costs, which quote is cheaper per round") is met. Only this post in `content/` contains "cost per participant". The hub's "How much does usability testing cost?" is not reused as an H2.

## 4. Semantic SEO: FIX
- Bold answers: 8/8 present, one sentence each, 18–28 words. The "Why" answers open with "Because" (fragments). Acceptable; F4 replaces one of them anyway.
- Keyword: 6 exact uses / 2,381 body words = 1.26%. Secondaries 1× each, no-show rate 3×. All brief n-grams present in open text.
- Keyword sentences (swap test passes on all of them):
  - Title: "Usability Testing Cost per Participant: The Full Bill, Line by Line"
  - H1: same as the title
  - Description: "Usability testing cost per participant, itemized: …" ("This cost, itemized: …" still reads)
  - First sentence: "Usability testing cost per participant is rarely the number on a panel's price page: …"
- Keyword-stacking grep: 0 hits. `vs` grep: 0 hits. Digit-start grep: 0 hits. `<!--`: 0 in md and in the built HTML.
- metaTitle 52 chars, title 67, description 154 on the built HTML. The description ends on the reader step "Then request a fixed-scope proposal." (BOFU).
- Banned phrases and hedges (might/may/could/perhaps): 0.
- every/always/all/never/only/most were each tested against the post's own rules:
  - L32 "at most" OK.
  - L182 "Every row uses your rates" OK.
  - L201 "Recruitment is part of every engagement" is the brief's own wording.
  - L205 "Every project begins with a free consultation…" is the sanctioned once-only sentence; "free consultation" appears exactly once.
- Abbreviations (checked with `<details>` stripped):
  - NN/g, SUS, SEQ and FDA are expanded.
  - "UX" at L227 is bare → F10.
  - B2B never appears in open text (see G2).
- Boolean FAQs: "Is…" → Yes, "Does…" → Yes, "Can…" → Yes. All 5 FAQ answers have ≥ 2 sentences. Each FAQPage `acceptedAnswer` in out/ holds only its own answer.

### F1 (intro promises more than the body delivers), L26
Moderation, analysis and tool share are priced as "your rate × hours", not from named sources.
- Old: `This guide prices each line from named sources, then moves the unit from one head to one test round, which is how our [usability testing services](/services/usability-testing-services/) are scoped.`
- New: `This guide prices the lines that have published figures from named sources, shows how to price the rest at your own rates, then moves the unit from one head to one test round, which is how our [usability testing services](/services/usability-testing-services/) are scoped.`

### F2 (over-promise), L50
No section fills the tool-share line, and the round, DIY and price sections fill no receipt line. Apply this together with G1.
- Old: `Copy the receipt into a sheet now; each section below fills one of its lines.`
- New: `Copy the receipt into a sheet now; the next four sections fill its lines.`

### F3 (claim stronger than the evidence, and an attribution mismatch with L111), L60
"rarely saves money" does not follow from "slightly reduced no-show rates". L60 credits the finding to "User Interviews' study data", while L111 credits it to MeasuringU's blended analysis. Fact-checker to confirm which attribution is right.
- Old: `Underpaying rarely saves money: in User Interviews' study data, higher incentives slightly reduced no-show rates, as the no-show section below shows.`
- New: `Incentive size also touches attendance: in the no-show data MeasuringU analyzed, higher incentives slightly reduced no-show rates, as the no-show section below shows.`

### F7 (the keyword carrier does not read), L155
"multiply it by a round" has no countable object.
- Old: `Once you know your usability testing cost per participant, multiply it by a round, not by a study; in our process,`
- New: `Once you know your usability testing cost per participant, multiply it by the participants in one round rather than by a whole study; in our process,`

### F10 (abbreviation), L227
- Old: `[discovery-focused UX research](/services/ux-research-services/)`
- New: `[discovery-focused user experience (UX) research](/services/ux-research-services/)`

## 5. Internal links: PASS (5)
- The 5 links: hub (L26, first paragraph), hub #how-much-does-usability-testing-cost (L201), /case-studies/tradezella/, /contact/, /services/ux-research-services/ (the one cross-hub link). All targets exist, and the hub fragment id matches the hub H2. Anchors are varied.
- This is below my 6–12 gate. It matches the design-system-roi precedent (new BOFU silo, no sibling posts, no case study for the service, hub cap 2) and the link builder's BOFU 5–8 spec.
- A 6th link would mean a third hub link. That breaks the hub cap, so do not add one. The orchestrator should confirm the exception again for this silo.

## 6. Images: FIX
- All 6 inline images and the cover exist in public/ and out/, are SVG, and are 2–10 KB.
- Alt text is meaningful (193–370 chars).
- Rendering: 760px wide at 1440 (26px text → 24.7px). At 390 they are 354px wide (11.5px).
- Native renders have no text overlaps. The pink lines in the in-page screenshots of the donut and strip are the reading-progress bar; the native renders are clean.
- The cover at 390 (16:9, object-fit: cover) keeps the whole title.
- No third-party brand assets (Lookback, Maze and the others are named in text only).
- Spelling: "Licence"/"licence" is British → F9.

### F9 (US English), post L45 and L191 plus itemized-receipt.svg (designer)
- L45: `| Tool share | Licence cost ÷ sessions in the licence period |` → `| Tool share | License cost ÷ sessions in the license period |`
- L191: `| Tools | Licence cost ÷ rounds run in the licence period | ______ |` → `| Tools | License cost ÷ rounds run in the license period | ______ |`
- itemized-receipt.svg row 6: redraw the same text as the new L45 (word-for-word check).

## 6b. Duplication: decision on the designer's near-repeat flags
- **Receipt (L30–L34): PASS.** The bold answer names the five line categories. The image adds every sourced range and formula, and none of those is in the section's open prose (they sit in later sections). That is a summary, not a repeat.
- **Donut (L131–L135): PASS.** The bold answer and L133 repeat the segment names and "clip / severity rating / fix per finding". But 3 of the 5 cards carry content that is not in the open text: "pilot the tasks; check the prototype link, recording and consent form", "capture the top observations while they are fresh", and the 1–4 scale. Keep L133: it is the only open-text carrier of the brief entity "usability test report".
- **Round strip (L153–L157): FIX.**
  - Label by label, all 5 blocks (recruit, test, analyze, fix, retest) are in the bold answer, and the covered/not-covered split is stated by "says nothing about what happens after the sessions".
  - The parentheticals are also in open text: "a second round with new participants" at L155 and L174, "changes the design file" at L174.
  - The image also contradicts L32 (see F5).
  - Fix the bold answer, not the image (F4).

### F4, L153 bold answer (28 words)
- Old: `**Because a per-head price says nothing about what happens after the sessions, so compare quotes per round: recruit, test, analyze, fix the design and retest.**`
- New: `**Because a per-head price stops at the participant: it leaves out the moderator's hours and the work that turns findings into a better design, so compare quotes per round.**`

### F5 (the image contradicts the post), round-anatomy-strip.svg + L157 alt + L162 (designer + orchestrator)
- L32 says a panel or recruiter quote prices "the first two lines at most" and that moderation is "hours on your own calendar". The strip shades "Sessions" as "Covered by a typical per-participant price".
- L162 old: `2. **Sessions:** covered by a typical per-participant price.`
- L162 new: `2. **Sessions:** partly covered (the participant's incentive, not the moderator's hours).`
- Designer: half-shade block 2, redraw card 2 with that exact text, and give the legend a third key "Partly covered".
- Title: `One test round, left to right` → `One round and its retest, left to right` (see F6).
- L157 alt new: `Five-block strip of one round and its retest: recruit shaded as covered by a typical per-participant price, sessions half-shaded because the price covers the participant but not the moderator, analysis, design fixes and retest drawn as open dashed outlines marked not covered`

### F6 (inconsistent unit: is the retest inside the round or a second round?)
L155, L165 and the hub define the retest as round 2, while takeaway 5, L153 and L182 put it inside "one round".
- Takeaway 5 old: `"Compare quotes per round, not per head: a round includes analysis, design fixes and a retest that a per-head price leaves out."`
- Takeaway 5 new: `"Compare quotes per round, not per head, and check each quote for the analysis, design fixes and retest round that a per-head price leaves out."`
- L182 old: `Use this bill for one round and one user group, and copy it for each extra group.`
- L182 new: `Use this bill for one round and one user group, plus the retest round that checks its fixes, and copy it for each extra group.`

### F8 (the fill-in bill double-counts and under-counts), L186 and L189
Floater standby pay is counted in both the Incentives and the No-show buffer rows. The moderator hours held for no-shows (part of the L115 formula) are in no row.
- L186 old: `| Incentives | Incentive × completed sessions, plus any paid no-shows or floaters | ______ |`
- L186 new: `| Incentives | Incentive × completed sessions, plus any no-show or late-cancellation payments | ______ |`
- L189 old: `| Moderation | (Setup + session + debrief hours) × loaded rate × sessions | ______ |`
- L189 new: `| Moderation | (Setup + session + debrief hours) × loaded rate × booked sessions, including slots held for no-shows | ______ |`

## 7. Readability: PASS
- No open paragraph has more than 4 sentences (the two long blocks are lists). US English apart from F9.
- 5-gram overlap:
  - Other posts: 0.0–0.4%. The shared grams are the sanctioned CTA sentence and "the system usability scale sus".
  - usability-testing-services hub: 1.1%. These are process facts quoted from the hub.
  - ux-research hub: 0.0%.
- **F11 (thin bullet, undated figure), L87 + FAQ L223.** The own-list channel has no figure in place ("the FAQs give NN/g's figure"), and FAQ4 gives 1.15 hours without the 2002 date. That figure ships into FAQPage schema on its own. Fact-checker to confirm the year belongs to the 1.15 figure.
  - L87 old: `There is no fee, but your staff spend hours finding, screening and scheduling people; the FAQs give NN/g's figure.`
  - L87 new: `There is no fee, but your staff spend hours finding, screening and scheduling people: 1.15 staff hours per participant recruited, on average, in the same NN/g survey.`
  - L223 old: `NN/g's respondents spent an average of 1.15 staff hours per participant recruited.`
  - L223 new: `respondents to NN/g's 2002 survey spent an average of 1.15 staff hours per participant recruited.`

## 7a. Competitor originality: PASS (structural)
- The beats page (cleverx.com/blog/b2b-usability-testing-cost) could not be fetched: WebFetch ENOTFOUND, and curl got proxy 403 connect_rejected. A 5-gram percentage could not be computed.
- I compared structure using search snippets:
  - Their order: recruitment fees by seniority → incentives by seniority → researcher time → study totals → in-house vs agency.
  - Ours: receipt → incentives by audience → recruiting channels and ladder → no-show maths → researcher hours → per-head vs per-round → DIY bill → our price.
  - We use no seniority tiers, no CleverX figure and no in-house-vs-agency section.
- All 6 serpGaps are covered: full one-session bill (L28–50), no-shows turned into money (L107–127), round as the unit (L151–195), non-B2B hard audiences (L103, ladder), why two "5 users" quotes differ (L155), and first-hand researcher hours (L129–149).

## 7b. Silo and leads: PASS
- services[0] is usability-testing-services. Funnel is bofu, service-support 5 (funnel.json minimum 5).
- One cross-hub link. No other silo's posts are linked. No Apex HCM, Fortna or ToolsGroup.
- Lead moments: L149 (hours), L195 (fix/retest rows), L205 (main offer). No incentive-inclusion promise.

## 7c. Variety: PASS
- The intro style (itemized receipt) and the visual set are new. The post differs from the last 3 site-wide posts on 7/7 dimensions.
- The closing CTA sentence is sanctioned (lesson 2026-10-10).
- **F12 (frame reuse, small).** L171–174 repeat ux-audit-agency-vs-freelancer's "Ask … ; a good answer names …" device (L75, L77). Replace with:
  1. `**How many participants per round and per user group?** Ask for both numbers, so two user groups are not quoted as one.`
  2. `**Moderated, unmoderated or both?** The quote should name the tool and session length, because a 15-minute recording and a 60-minute moderated session are different products.`
  3. `**Who analyzes and writes the report?** Look for a report where each finding has a clip and a severity rating.`
  4. `**Are design fixes and a retest included?** The answer should say who changes the design file between rounds and whether round 2 recruits new people.`

## 7d. Semantic completeness: FAIL
Gaps G1 and G2 are below. The logic defects F4–F8 also count here.

## 7e. On-page: PASS
- `npm run onpage -- /blog/usability-testing-cost-per-participant/` → score 100, failed [].
- Manual items:
  - E-E-A-T: real author and contributor, sources cited.
  - Featured snippets: bold answers ≤ 30 words.
  - External sources: 5, verified by the link builder.
  - Images: < 150 KB.
  - `updated` = `date`.

## 8. Build: PASS
- `SHOW_DRAFTS=1 npm run build` exit 0.
- `npm run seo:check`: 0 errors, 6 warnings, all on other pages and pre-existing (ai-ux-design, fintech-ux-design and generative-ai-ux descriptions, author page).
- `npm run lint`: exit 0 (jsx-ast-utils notices only).
- Local server PID 2124 stopped and confirmed gone with ps.

## Flags for the fact-checker (not changed by QA)
- Heat table (L68–72 + SVG): the shading and cells rank audiences ("above the general consumer range", "higher again", "the highest on this table") with no source. Confirm or reduce them to "quote from recruiter".
- Takeaway 3 "to a three-figure agency fee" is undated, while L86 now says the survey ran in 2002. Suggest "to a $107 average agency fee in NN/g's 2002 survey".
- L86 "so treat it as a floor": this is an inference from age. Confirm it is acceptable wording.
- L60 vs L111 attribution of the incentive/no-show finding (F3).

## Guidance for the writer
- **G1 [How many researcher hours sit behind each session? — new paragraph after L147] — tool share has no substance.**
  - Missing: the receipt's 6th line and the brief attribute "tool licence share" appear only as a formula (L45 collapsed, L191).
  - Add 2–3 sentences (50–70 words) naming the tools a round carries: Lookback or Zoom for moderated sessions, Maze or UserTesting for unmoderated studies, Figma for the prototype.
  - Show how to divide a monthly or annual license by the sessions or rounds run in that period.
  - Example: a team that runs one round a year carries the whole license on that round.
  - No prices unless sourced. End with the next step: "add the per-session share to line 6 of the receipt".
- **G2 [What does recruiting add to each participant? — paragraph L103] — the B2B professional step has no open-text substance.**
  - Missing: "B2B professional" (a brief audience attribute and step 4 of the ladder) appears only in the image and the collapsed blocks.
  - Add 1–2 sentences (35–50 words): screen on role, company size and the tools they use, and expect busy calendars, so offer shorter or after-hours slots.
  - Anchor cost to MeasuringU's already-cited $40–$100 specialized-profile panel figure (financial advisors). Add no new numbers.
  - Expand "business-to-business (B2B)" on first use there.

## FAIL list
1. Round strip: duplicates the bold answer and contradicts L32 (F4, F5).
2. The round/retest unit is inconsistent (F6).
3. The fill-in bill double-counts floater pay and omits no-show held hours (F8).
4. The intro over-promises sourced pricing and "each section fills a line" (F1, F2).
5. Completeness gaps G1 (tool share) and G2 (B2B in open text).

VERDICT: FAIL
