# Fact-check: ux-research-methods

Post: `content/blog/ux-research-methods.md` (frontmatter `funnel: tofu`, the brief says mofu; see note N3)
Brief: `content/briefs/ux-research-methods.json`
Images: `public/blog/ux-research-methods/*.svg` (all `<text>` nodes read)
Site sources: `content/services/ux-research-services.json` (hub), `content/services/usability-testing-services.json`, `content/case-studies/mass-media-co.md`, `content/pages/about.md`, `content/home.ts`
Date: 2026-10-24. I edited nothing except this report.

## External links (all 5 load and support their sentences)

| Link | Loads | Supports sentence |
|---|---|---|
| https://www.nngroup.com/articles/which-ux-research-methods/ | Yes (Rohrer, 17 Jul 2022, "Last reviewed Jul. 15, 2026") | Yes |
| https://csus.libguides.com/res-meth/quant-res | Yes ("Four types of Quantitative Research": Descriptive, Comparative, Quasi-experimental, Experimental (empirical)) | Yes |
| https://www.nngroup.com/articles/research-methods-glossary/ | Yes (Budiu, 10 Sep 2023) | Yes |
| https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ | Yes (Nielsen, 18 Mar 2000) | Yes |
| https://www.nngroup.com/videos/why-40-participants-quantitative-research/ | Yes (Laubheimer, 7 Oct 2024) | Yes |

Sources named but not linked (all verified): dovetail.com/research/method-vs-methodology, nngroup.com/articles/synthetic-users, userinterviews.com/ux-research-field-guide-chapter/user-research-types, sagepub.com (Creswell and Poth), iso.org/standard/77520.html (search result, the page returned 403).

## Claims

| # | Claim (line) | Verdict | Source |
|---|---|---|---|
| 1 | ISO 9241-210 is titled "Human-centred design for interactive systems" (33) | TRUE | iso.org/standard/77520.html: "ISO 9241-210:2019 … Part 210: Human-centred design for interactive systems" (current edition, replaced 2010) |
| 2 | Dovetail: a method is a procedure for reaching an objective; a methodology is the strategy underneath it (39) | TRUE | dovetail.com/research/method-vs-methodology: "A method is simply the procedure you use to accomplish an objective"; methodology is "the underlying strategy used in the research study" |
| 3 | "Technique" level labelled as our own framing (39) | TRUE (labelled) | n/a |
| 4 | Think-aloud = participant voices their thoughts while using the interface (43) | TRUE | NN/g glossary |
| 5 | Quantitative designs taught as four types: descriptive, comparative, quasi-experimental, experimental, in Sacramento State's guide (57) | TRUE | csus.libguides.com/res-meth/quant-res |
| 6 | Creswell and Poth, *Qualitative Inquiry and Research Design: Choosing Among Five Approaches*, 4th edition, 2018; five approaches: narrative, phenomenology, grounded theory, ethnography, case study (58) | TRUE (with a note) | SAGE book246896 lists the 4th edition, 5 approaches, publication "December 2016". Library catalogs give imprint [2017] and copyright ©2018 (ENMU call number H61 .C73 2018, Taylor's catalogue). APA cites the copyright year, so "2018" is the standard citation year. No change needed. |
| 7 | No single standard list of seven research methods exists (55, 60) | TRUE (editorial) | Lists differ by author; no standards body defines one |
| 8 | Rohrer/NN/g "When to Use Which User-Experience Research Methods" places 20 methods on three dimensions (93) | TRUE | Article lists 20 methods; attitudinal vs behavioral, qualitative vs quantitative, context of use |
| 9 | Qualitative data comes from watching or hearing people; quantitative through an instrument such as a survey or analytics tool (96) | TRUE | Rohrer: "observing or hearing them directly"; "through a measurement or an instrument such as a survey or an analytics tool" |
| 10 | Context of use: natural (field study), scripted (usability benchmarking), limited (card sorting), none (desirability study) (97) | TRUE (with a note) | Rohrer: natural = field studies; benchmarking "usually very tightly scripted"; limited = participatory design, concept testing, card sorting/tree testing; not using the product = brand and aesthetic-attribute studies. Rohrer never names the desirability study under "none", but NN/g's glossary defines it as an aesthetic-appeal study, which fits his "aesthetic" example. Accepted. |
| 11 | Desirability study = people pick words for their reaction to a product (97) | TRUE | NN/g glossary: participants view a product and pick words from a list that describe their reaction to it |
| 12 | 2x2 map: 15 methods; caption "our drawing of the NN/g framework" (99, SVG) | TRUE | Count is 15. Card sorting can be "quantitative or qualitative" (Rohrer), so "card sorting with a large sample" is fine. Tree testing and eyetracking placements are our drawing, and the caption says so. |
| 13 | Usability test is qualitative with 5 participants, quantitative with 40 (110) | TRUE | Nielsen 2000 and Laubheimer 2024 |
| 14 | Moderated/unmoderated and remote/in-person both described in the User Interviews field guide chapter (110) | TRUE | userinterviews.com user-research-types (updated 1 Nov 2025): "The difference between moderated and unmoderated research methods is the role of the researcher"; remote vs in-person: "the participant and the researcher are in different locations" |
| 15 | "Rohrer advises that most usability studies should rely on behavior" (114) | TRUE | Rohrer: "While most usability studies should rely on behavior…" |
| 16 | NN/g time dimension names three stages: strategize, design, launch and assess (128) | TRUE | Rohrer: Strategize (generative), Design (formative), Launch & Assess (summative) |
| 17 | Generative research such as interviews, a diary study or participatory design (128) | TRUE | Rohrer Strategize list: "Field studies, diary studies, interviews, surveys, participatory design, concept testing" |
| 18 | Summative evaluation measures the finished product, "usually against a competitor or an earlier version of itself", per NN/g's glossary (128) | TRUE | Glossary: "…usually by comparing it with that of a competitor or of one of its own prior versions." |
| 19 | User Interviews guide adds continuous research after launch (128); after-launch list: NPS and feedback surveys, product analytics, support feedback (137, SVG) | TRUE | User Interviews: "Research doesn't end once you've launched … NPS and other user feedback surveys, product analytics … customer support and feedback channels" |
| 20 | Stage strip: **Design (formative): card sorting, tree testing, concept testing, usability testing** (135; SVG product-stage line 107 "Concept testing") | **WRONG** | Line 128 introduces the strip with "NN/g's time dimension names three stages", and the strip uses NN/g's stage labels, so readers will take the lists as NN/g's. NN/g puts concept testing under **Strategize**. Its Design list is "Card sorting, tree testing, usability testing, remote testing (moderated and unmoderated)". Concept testing sits in Design only in our program (hub step 4), and the strip's "Our program" row already says so. **Fix F3.** |
| 21 | Launch and assess (summative): usability benchmarking, A/B testing, clickstream analytics, surveys (136) | TRUE | Rohrer Launch & Assess list |
| 22 | Strategize program row: research framing (2–4 days), generative fieldwork with user interviews and contextual inquiry (7–15 days) (134, SVG) | TRUE | Hub steps 1 and 3 |
| 23 | Design program row: evaluative studies (4–8 days), "card sorts, tree tests and concept tests check the early information architecture and design concepts" (135, SVG) | TRUE | Hub step 4 (word for word) |
| 24 | Cheat sheet compares 12 methods (147); 12 cards in SVG | TRUE | Count |
| 25 | User interviews: 10–15 interview participants per user group (our program), one hour each (155, SVG, takeaway 18) | TRUE (hub conflict, see H1) | Hub FAQ: "10–15 interview participants per user group"; deliverable: "10–15 one-hour interviews". Live sibling posts (customer-journey-map-template, contextual-inquiry) print the same version. |
| 26 | Contextual inquiry: 4–6 users (our program); about 2 hours a session; moderated, on-site in our program (156, SVG) | TRUE | Hub: "observe 4–6 users" (no "per user group", correct); hub FAQ: "contextual inquiry needs on-site visits"; 2 hours = Holtzblatt's session length, as in the live contextual-inquiry post |
| 27 | Diary studies: days or months (NN/g) (158, SVG) | TRUE | Glossary: "over an extended period that can range from a few days to months" |
| 28 | Focus group: 6–9 people per group (NN/g) (160, SVG) | TRUE | Glossary: "conducts a meeting with a group of 6–9 people". NN/g's Rohrer article says "Groups of 3–12 participants", so NN/g gives two figures. The post prints the glossary figure with an NN/g label, which is accurate. Optional: write "(NN/g glossary)". |
| 29 | Concept testing: qualitative, attitudinal; within the 4–8 days of evaluative studies (our program) (161, SVG) | TRUE | Glossary: "early-stage attitudinal method … usually through a qualitative survey"; hub step 4 |
| 30 | Card sorting: both data types, attitudinal, 30–50 participants (our program) (162, SVG); FAQ "card sorting, which runs with 30–50 participants in our program" (255) | TRUE (known conflict) | Hub card sort/tree test item: "30–50 participants". Rohrer: card sorting is "A quantitative or qualitative method". The brief's CONFLICT 1 (NN/g 15) is handled in the card-sorting post, whose line 146 gives 30–50 for a quantitative study, matching this post. |
| 31 | Tree testing: 30–50 participants with the card sort (our program) (163, SVG) | TRUE | Hub item "Card sort and tree test … 30–50 participants" |
| 32 | Usability testing: 5 per qualitative round, 40 quantitative (NN/g); 1–3 weeks per round (164, SVG) | TRUE | Nielsen 2000; Laubheimer 2024; usability hub FAQ "a single usability testing round takes 1–3 weeks" (study-length row, correct unit) |
| 33 | First-click test stops after the first click; five-second test asks what people recall after five seconds; eyetracking records where eyes move and needs special equipment (172) | TRUE | Glossary: "immediately after their first click"; "shown a design for five seconds" then describe; eyetracking "requires special equipment" |
| 34 | "Our usability testing services run moderated and unmoderated rounds" (172) | TRUE | Usability hub step 3: "Moderated and unmoderated sessions run on the prototype" |
| 35 | Usability benchmarking repeats scripted tasks to set a benchmark and track it across releases (174) | TRUE | Glossary: compares with a previous version or a competitor using task metrics; Rohrer: benchmarking is tightly scripted |
| 36 | Heuristic evaluation: experts, usability principles, no users (174) | TRUE | Standard definition (NN/g heuristic evaluation method); not in the glossary |
| 37 | Participant recruitment is its own step of 3–6 days (176) | TRUE | Hub step 2 |
| 38 | "Rohrer notes that nearly all projects gain when teams combine methods, yet many use only the one or two they know best" (182); FAQ 267 | TRUE | Rohrer: "Nearly all projects would benefit from multiple research methods…"; "many design teams only use one or two methods that they are most familiar with" |
| 39 | Our program: research plan, recruitment, interviews and contextual inquiry, card sorts and tree tests on the early IA, concept testing; 2–4 personas, 1 journey map per persona, JTBD opportunity map (198) | TRUE | Hub deliverables and steps 1–5 |
| 40 | Mass Media Co. sentence: "we ran user interviews alongside the Mass Media Co. discovery workshop with stakeholders and users, which covered product definition, strategy, information architecture and user flows" (200) | **WRONG (in part)** | mass-media-co.md line 27 lists "user interviews" only in the **Scope of work**. Line 43 (Our approach) says "We ran a discovery workshop with MMC stakeholders and users … The workshop covered product definition, strategy, information architecture and user flows." Nothing says the interviews ran "alongside" (at the same time as, or as part of) the workshop. "B2B marketing platform" (title) and the workshop facts are TRUE. The "which covered" clause can also attach to "stakeholders and users". **Fix F1.** |
| 41 | Five-step program ends with findings tagged in Dovetail and a 90-minute readout (202) | TRUE | Hub step 5 |
| 42 | Cost lines: recruiting, researcher hours, tools (208); shortcut table (212–216) | TRUE (editorial) | "More participants in less time" matches the usability hub FAQ; recruiting from a panel or the client's customer list matches hub step 2 |
| 43 | "For a startup, 8–10 user interviews set a floor" (218) | **WRONG** | Hub FAQ: "UX research for a startup, **for example** 8–10 user interviews, shows which problem to solve…". The hub gives an example, not a minimum. "Set a floor" turns it into a minimum and drops the hedge (lesson 2026-10-09). It also sits next to the post's own 10–15 per user group. **Fix F2.** |
| 44 | Our program runs 4–8 weeks and costs $25,000–$60,000; price set by user groups, participants, methods, recruitment difficulty (243) | TRUE | Hub cost H2 (4 factors exact) |
| 45 | Hospital clinicians as hard-to-recruit users (240) | TRUE | Hub cost body: "hard-to-recruit participants, for example hospital clinicians" |
| 46 | "Every project begins with a free consultation and a fixed-scope proposal" (245) | TRUE | about.md line 30 (word for word) |
| 47 | Synthetic users = AI-generated profiles that simulate a user group; Rosala and Moran (2024) advise against them as a replacement and suggest treating output as hypotheses to test (251) | TRUE | nngroup.com/articles/synthetic-users (21 Jun 2024): "an AI-generated profile that attempts to mimic a user group"; "Do not use synthetic-user research as a replacement for real-user research"; "Treat the data you acquire from synthetic users as hypotheses that need testing" |
| 48 | "We use AI to speed up production … pattern recognition across 200+ products" (251) | TRUE | home.ts line 213; RULES.md confirmed fact "200+ products designed" |
| 49 | 5-user rule: Nielsen, 5 users find about 85% of problems; several small rounds beat one large one (NN/g, 2000) (255) | TRUE | Nielsen 18 Mar 2000: "After the first study with five participants has found 85% of the usability problems"; "better to distribute your budget for user testing across many small tests" |
| 50 | Quantitative studies need about 40 participants (255; takeaway 18) | TRUE | Laubheimer: "40 participants is an appropriate number for most quantitative studies" ("about" keeps NN/g's hedge) |
| 51 | Unmoderated testing runs on tools such as Maze without a researcher (259) | TRUE | Usability hub FAQ |
| 52 | Five steps: research framing, participant recruitment, generative fieldwork, evaluative studies, synthesis and readout; 4–8 weeks (20–40 working days) (263) | TRUE | Hub process. Step sum: 2–4 + 3–6 + 7–15 + 4–8 + 4–7 = 20–40 working days, which matches. |
| 53 | Our program pairs generative fieldwork with evaluative studies in one engagement (267) | TRUE | Hub steps 3–4 |
| 54 | "Our UX research services combine five of these methods in one program" (27) | TRUE | Hub: user interviews, contextual inquiry, card sorts, tree tests, concept tests |
| 55 | Takeaway: "Most product decisions need 2–3 methods, each answering the question the previous one raised" (19) | **UNVERIFIABLE** | "Most product decisions need" is a quantified claim with no source. Rohrer supports only "Nearly all projects would benefit from multiple research methods". The FAQ (267) states the 2–3 count correctly as advice ("Plan on two or three"). **Fix F4.** |
| 56 | Illustrative items: intro meeting labelled "an illustrative composite, not a client" (25); worked example labelled "illustrative example" (196) | TRUE (honesty) | No stats or outcome figures in either |
| 57 | Combination chain SVG and router SVG text match the astext panels | TRUE | Text of all 8 router rows and 5 chain steps matches the panels word for word. No numbers. |
| 58 | Intro "the second for a tree test" (can people find invoices in the new menu) | TRUE (editorial) | Glossary: tree testing asks users to locate items in a hierarchy |

## Honesty

- No invented clients, testimonials, awards or statistics. Both scenario passages are labelled illustrative.
- Every "our program" figure comes from the hub or the usability hub. The one exception is Mass Media Co. timing (F1).
- The only case study named is Mass Media Co. (`services` includes ux-research-services). The 30% result is not attributed to research methods anywhere in the body.
- The AI stance is quoted from home.ts. The CTA wording is from about.md.

## Fixes (exact current → replacement)

**F1 (line 200, Mass Media Co.; case-study timing claim)**
Current: `In a real engagement for a B2B marketing platform, we ran user interviews alongside the [Mass Media Co. discovery workshop](/case-studies/mass-media-co/) with stakeholders and users, which covered product definition, strategy, information architecture and user flows.`
Replacement: `In a real engagement for a B2B marketing platform, the scope of work listed user interviews, and the [Mass Media Co. discovery workshop](/case-studies/mass-media-co/) we ran with stakeholders and users covered product definition, strategy, information architecture and user flows.`
(Built only from mass-media-co.md lines 27 and 43. Anchor unchanged. No timing word between the interviews and the workshop.)

**F2 (line 218, startup interviews; hub hedge dropped)**
Current: `For a startup, 8–10 user interviews set a floor: they show which problem to solve before engineering budget goes into a build.`
Replacement: `For a startup, a study of, for example, 8–10 user interviews shows which problem to solve before engineering budget goes into a build.`

**F3 (stage strip; concept testing placed in NN/g's Design stage). Two places:**
- Post line 135, current: `- **Design (formative):** card sorting, tree testing, concept testing, usability testing. Our program: evaluative studies (4–8 days), where card sorts, tree tests and concept tests check the early information architecture and design concepts.`
  Replacement: `- **Design (formative):** card sorting, tree testing, usability testing, unmoderated testing. Our program: evaluative studies (4–8 days), where card sorts, tree tests and concept tests check the early information architecture and design concepts.`
- SVG `public/blog/ux-research-methods/product-stage-research-methods.svg` line 107, current text node `Concept testing` (x=414 y=278.3). Replacement text: `Unmoderated testing`. It has the same chip and a similar length to "Usability benchmarking" in the next column, so no layout change is needed. No other SVG text changes. The program row keeps "concept tests".
(Alternative if the writer wants to keep concept testing visible: add it to Strategize instead. That column already holds 4 chips, so the swap above is the minimal fix.)

**F4 (line 19, takeaway; unsourced "most")**
Current: `  - "Most product decisions need 2–3 methods, each answering the question the previous one raised."`
Replacement: `  - "Nearly every project benefits from more than one method, so plan on 2–3, each answering the question the previous one raised."`
(Rohrer: "Nearly all projects would benefit from multiple research methods". The 2–3 count stays as advice, matching FAQ line 267.)

## Hub conflicts for the owner (no post change; do not publish a third version)

- **H1, interview count unit.** The hub states the interview count three different ways:
  - FAQ: "10–15 interview participants per user group".
  - Deliverable: "10–15 one-hour interviews", with no per-group qualifier.
  - Research plan example: "12 user interviews across 2 user groups" (6 per group).
  - Cost examples: "1 user group, 10 user interviews" and "3 user groups, 20 user interviews" (about 7 per group).

  The post and the live siblings follow the FAQ. The owner should pick one unit and make the hub's examples match it.
- **H2, focus group size.** NN/g gives two figures: glossary 6–9, Rohrer 3–12. The post uses 6–9 with an NN/g label, which is accurate. No site conflict.

## Notes (non-fact, for QA/orchestrator)

- **N1.** `ux-research-method-spec-cards.svg` has viewBox height 917, over the RULES.md "height ≤ 800" landscape rule (the house-style README replaced only the text-size rule). This is not a fact issue.
- **N2.** The brief's `related.externalSources` statuses checked out this time: all 5 links verified, and the gcu.edu → csus swap is correct.
- **N3.** The post's frontmatter says `funnel: tofu` and its description says "get the free checklist", while the brief says mofu. With TOFU, the template prints the checklist CTA, which avoids the brief's CONFLICT 2 (MMC 30% in the MOFU CTA). The orchestrator should confirm that the funnel change was intended.
- **N4.** Edits were withheld under the role's no-edit rule. Every fix above is an exact replacement for the orchestrator to apply.

## Lessons (not appended to learnings: only whole-file Write is available, so they are listed here for the orchestrator to append)

1. 2026-10-24 (ux-research-methods): The stage strip used NN/g's stage labels, and the sentence before it credits "NN/g's time dimension", but it put concept testing under Design. NN/g lists it under Strategize. The misplacement came from our own program, whose evaluative step includes concept tests. Rule: when a post lists methods under a source's named categories (stages, quadrants, types), check each item against that source's own list for the category. Keep our program's placement in the "our program" row only.
2. 2026-10-24 (ux-research-methods): "we ran user interviews alongside the … discovery workshop" joined a Scope-of-work item (user interviews) to an Our-approach activity (workshop) with a timing word. The case study gives no timing. Rule: when a case-study sentence links two activities with "alongside / during / as part of / in", find both in the same section of the case file. If one appears only in the scope line, rewrite as "the scope listed X, and we ran Y".
3. 2026-10-24 (method): Book edition years differ by record type. SAGE lists the Creswell and Poth 4th edition as "December 2016", catalogs give imprint [2017], and the copyright is ©2018. Rule: for a book year, check the publisher page and one library catalog's copyright line. Accept the copyright year (the APA citation year), and record all three dates in the report so later runs do not re-flag it.

VERDICT: FAIL
