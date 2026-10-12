# Fact-check: usability-testing-cost-per-participant (round 1, 2026-10-12)

Files checked: `content/blog/usability-testing-cost-per-participant.md` and the 7 SVGs in
`public/blog/usability-testing-cost-per-participant/`. Our claims were checked against
`content/services/usability-testing-services.json`, `content/case-studies/tradezella.md` and `content/pages/about.md`.

Method: WebFetch returned `ENOTFOUND` for every host (userinterviews.com, handbook.gitlab.com, measuringu.com,
nngroup.com, mhealth.jmir.org). Following lessons 18 and 37, each claim was verified by WebSearch, with a domain filter
where possible, and the cited URL had to come back as a result. Following the orchestrator's instruction (fact-checker
wins conflicts), I applied the fixes directly to the post and SVGs. The "Fix applied" column holds the exact text now in
the files.

## Claims

| # | Claim (as received) | Verdict | Source | Fix applied |
|---|---|---|---|---|
| 1 | User Interviews: about three in four completed moderated consumer sessions, US and Canada only, paid $60–$100/hr; $100 most common at 25% | TRUE | https://www.userinterviews.com/blog/the-ultimate-guide-to-user-research-incentives ("74% … between $60 and $100 per hour"; "$100/hour … 25%"; "limited to U.S. and Canada"; 25,000+ sessions) | none |
| 2 | "in User Interviews' study data, higher incentives slightly reduced no-show rates" | TRUE | Same UI guide (remote no-show 10% at $60, 8% at $80, 6% at $100); MeasuringU https://measuringu.com/ux-2024/ ("higher incentives help to slightly reduce no-show rates") | none |
| 3 | GitLab: $20 unmoderated up to 10 min, $40 for 25–30 min, $120 for a 60-min interview | TRUE (figures) | https://handbook.gitlab.com/handbook/upstream-studios/research-operations/participation-gratuities/ | none to figures |
| 4 | GitLab link `handbook.gitlab.com/handbook/product/ux/ux-research-coordination/participation-gratuities/` | UNVERIFIABLE | No search returned this path. Two searches returned `/handbook/upstream-studios/research-operations/participation-gratuities/` ("Research participation incentives"). The link-builder's "SWAPPED" note went the wrong way. | Link changed to `https://handbook.gitlab.com/handbook/upstream-studios/research-operations/participation-gratuities/` |
| 5 | MeasuringU usability-cost: panels about $7–$10 general consumer, $40–$100 specialized (financial advisors) | OUTDATED (figures TRUE, article about 8 years old, undated in post) | https://measuringu.com/usability-cost/ | "[MeasuringU's breakdown of usability test costs](https://measuringu.com/usability-cost/), an older article, lists panels from about $7–$10 per participant for a general consumer profile and $40–$100 for specialized profiles such as financial advisors." |
| 6 | NN/g: $107 average agency fee per participant | TRUE | https://www.nngroup.com/articles/recruiting-test-participants-for-usability-studies/ ("the average agency fee was $107 per participant") | none |
| 7 | NN/g survey "run in 2002" | UNVERIFIABLE | The article is dated January 19, 2003 (Jakob Nielsen) and reports a survey of 201 usability professionals. Neither the article nor the report PDF gives a survey year. | "…reported an average agency recruiting fee of $107 per participant in its survey of 201 usability professionals, published in January 2003, so treat it as a floor and get current quotes." |
| 8 | NN/g: 1.15 staff hours per participant recruited in-house | TRUE | Same NN/g article ("about 1.15 hours of staff time per participant") | none |
| 9 | MeasuringU no-show: User Interviews about 14,000 studies at 9%, MeasuringU ops at 5%, average about 8% | TRUE | https://measuringu.com/typical-no-show-rate-for-moderated-studies/ ("User Interviews (14k studies and 9% no-show) and … Operations Team data (24 studies and 5% no-show)"; "About 8%") | none |
| 10 | MeasuringU "treats 10% as a conservative planning figure in place of its older 10–20% guidance" (body, takeaway 4, receipt SVG and its text and alt) | UNVERIFIABLE | Three searches found no MeasuringU text calling 10% a (conservative) planning figure. The page says the 2018 article "suggested … a 10% to 20% no-show rate". | Body: "…into an average of about 8%, below the 10–20% it suggested in 2018." Takeaway 4: "MeasuringU's newer data puts the average no-show rate for moderated studies at about 8%, so book floaters and spread their cost across completed sessions." Receipt SVG, text row and alt: "MeasuringU average about 8%". |
| 11 | "MeasuringU's over-recruiting advice treats no-shows as only one of the ways a booked session is lost" (unlinked) | TRUE | https://measuringu.com/how-much-should-you-over-recruit/ (average over-recruitment needed was 19%, against an 8% no-show average) | none |
| 12 | NN/g older adults: screener on technology experience and devices owned; building trust | TRUE | https://www.nngroup.com/articles/usability-testing-older-adults/ (screener should ask "age, experience using technology, and the types of devices they own"; "building trust") | none |
| 13 | JMIR mHealth and uHealth 2021 "Going Remote": care packages mailed; some participants needed a smartphone or home internet supplied | TRUE | https://pmc.ncbi.nlm.nih.gov/articles/PMC7935399/ (Hill et al. 2021, e26702: "a subset of participants did not have a smartphone or home internet and required the study to provide these") | none |
| 14 | FDA summative human factors validation follows its own sample-size rules | TRUE | https://www.fda.gov/media/80481/download (minimum 15 participants per distinct user population) | none |
| 15 | Tools: Lookback, Zoom, Figma, Maze, UserTesting; SUS and SEQ | TRUE | Hub `usability-testing-services.json` (deliverables) | none |
| 16 | Heat table ordinal labels: specific segment "above the general consumer range", B2B "higher again", clinician "the highest on this table"; legend "darker = costs more" | UNVERIFIABLE | No source ranks incentives for specific consumer segments or clinicians. User Interviews supports B2B > consumer, but the post never cites it. | Cells now read "Quote from recruiter" (older adults keep "; add setup support", supported by JMIR). Legend changed to "darker = harder to recruit", matching the ladder order. Alt changed to "shading darkens as recruiting gets harder, in the same order as the recruitment ladder". |
| 17 | Ladder step 1 "the baseline, a 5–8 day step in our process" (SVG, text and alt) | WRONG (vs hub) | The hub's 5–8 day recruitment step has no audience qualifier, and its near-$60,000 example includes physicians. Calling 5–8 days the general-consumer baseline under rising lead-time arrows implies our hard-audience recruiting takes longer than the hub states. | SVG: "The starting point". Text: "…the starting point for cost and lead time." Alt: "(online research panel, the starting point)". The body sentence "participant recruitment is a 5–8 day step before the first round" stays (TRUE). |
| 18 | Our price: $25,000–$60,000, 4–8 weeks, 2–3 rounds, design fixes between rounds; 4 price factors incl. recruitment difficulty | TRUE | Hub abstract and cost section | none |
| 19 | "Recruitment is part of every engagement, alongside a test plan, moderated sessions and unmoderated studies, SUS and SEQ scoring, a report…, and design fixes in Figma between rounds" | WRONG (lesson 42) | Through "every engagement", the sentence makes unmoderated studies part of every engagement, but the hub's near-$25,000 example is "2 moderated rounds" only and the near-$60,000 example adds "unmoderated Maze studies". | "Our usability testing services include six deliverables: a test plan, participant recruitment, moderated sessions, unmoderated studies, SUS and SEQ scoring, and a report with a clip, severity rating and fix for every finding. Between rounds, designers fix the highest-severity issues in Figma." (hub deliverables answer and process step 4, word for word) |
| 20 | 45–60 min think-aloud over Lookback or Zoom on a Figma prototype; every participant answers SUS and SEQ; every finding gets a clip, a 1–4 severity rating and a fix | TRUE | Hub deliverables | none |
| 21 | Round 2 uses new participants against the round 1 task success rate | TRUE | Hub process step 5 | none |
| 22 | Unmoderated Maze and UserTesting studies run 20–50 participants | TRUE | Hub deliverables | none |
| 23 | FAQ: "Our rounds use 5–8 participants per user group" | WRONG (merges two hub sections) | The hub says "5–8 participants per round" (deliverables) and "5–8 participants per user group for the first round" (process step 2). It never says that every round uses 5–8 per group. | "We screen and schedule 5–8 participants per user group for the first round, so a product with two distinct groups is budgeted per group; add one or two floaters per group on top." |
| 24 | TradeZella quote: "follow industry best practices for financial dashboards and were tested with traders before launch" | TRUE (exact) | `content/case-studies/tradezella.md` line 88 | none |
| 25 | "Specialist audiences are part of that work: in the TradeZella…" | WRONG (framing) | "that work" points to this usability testing engagement, but TradeZella's `services` list has no usability-testing-services (it lists ux-research, dashboard, SaaS, web and mobile). | "Specialist audiences are not new to us: in the [TradeZella trading dashboard redesign](/case-studies/tradezella/), the visuals "follow … before launch," in the case study's words." |
| 26 | Takeaway 3: "$7–$10 … (MeasuringU) to a three-figure agency fee" | OUTDATED (undated figures in a takeaway, lesson 25) | As in #5 and #7 | "Published recruiting figures are dated: about $7–$10 per general consumer on a panel (an older MeasuringU article) and a $107 agency average (NN/g, 2003), so get current quotes; your own list costs staff hours." |
| 27 | "Every project begins with a free consultation and a fixed-scope proposal." | TRUE | `content/pages/about.md` line 30 | none |

## Honesty

- No team size, designer count or hours-per-session claimed as our fact (grep for "designers", "team of": none in the post or SVGs).
- No claim that incentives are included or passed through. "Participant recruitment" is stated only as a hub deliverable.
- No Apex HCM, Fortna or ToolsGroup in the post or SVGs (grep: no matches).
- No TradeZella results attributed to testing.
- No local office, award or testimonial.

## Notes for the orchestrator

1. Hub inconsistency: `usability-testing-services.json` says "5–8 participants per round" (deliverables) but "5–8 participants per user group for the first round" (process). Its process step 3 runs "Moderated and unmoderated sessions" in every round 1, while the near-$25,000 example is moderated only. Please resolve this on the hub.
2. Stale records in other agents' files (I did not edit them): `content/briefs/usability-testing-cost-per-participant.visuals.json` lines 9 and 17 still carry the old receipt and ladder alt text. In `content/briefs/usability-testing-cost-per-participant.json`, lines 232 and 287 hold the unverified GitLab path and line 290 says "10% conservative planning figure".
3. Each SVG fix was a text-only change. The only geometry change is the heat-table legend: the swatches shrank from 40 px wide on a 46 px step to 30 px on a 34 px step, so the longer legend ends at about 750 px, inside the 760 px margin. Please run `npm run build && npm run seo:check && npm run lint` and QA's overlap check again.

Received draft: FAIL (4 WRONG, 2 OUTDATED, 4 UNVERIFIABLE, fixed in place). Every claim in the files as they now stand is TRUE.

VERDICT: PASS
