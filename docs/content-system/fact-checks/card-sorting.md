# Fact-check: card-sorting (2026-10-24)

Post: `content/blog/card-sorting.md`. Brief: `content/briefs/card-sorting.json`. SVGs: `public/blog/card-sorting/*.svg` (6 files, all text read).
Site facts checked against: `content/services/ux-research-services.json` (hub), `content/services/web-app-design-services.json`, `content/case-studies/mass-media-co.md`, `content/industries/saas.json`, `content/pages/about.md`, sibling posts `ux-research-methods.md` and `contextual-inquiry.md`.
No file other than this report was edited.

## External sources (all fetched 2026-10-24)

| Source | Status |
|---|---|
| https://www.nngroup.com/articles/card-sorting-definition/ (Tankala & Sherwin, 2 Feb 2024) | Loads. Linked in post line 34. |
| https://www.nngroup.com/articles/card-sorting-how-many-users-to-test/ (Nielsen, 18 Jul 2004) | Loads. Linked line 129. |
| https://www.nngroup.com/articles/card-sorting-tree-testing-differences/ (Tankala, 23 Feb 2024) | Loads. Named, not linked. |
| https://en.wikipedia.org/wiki/Card_sorting | Loads. Named, not linked. |
| https://www.optimalworkshop.com/101-guides/card-sorting-101/introduction-to-card-sorting | Loads. Named, not linked. |
| https://www.optimalworkshop.com/blog/comes-first-card-sorting-tree-testing (29 Mar 2016) | Loads. Named, not linked. |
| https://dovetail.com/ux/open-vs-closed-card-sorting/ | Loads. Linked line 279. |
| https://dscout.com/people-nerds/card-sorting | Loads. Linked line 279. |
| https://www.lyssna.com/blog/card-sorting-tools/ ("11 best card sorting tools for UX research", 9 Jul 2026) | Loads. Linked line 251. |
| https://help.maze.co/hc/en-us/articles/360051963234-Card-Sorting | Loads (used for fix 3). |
| https://www.uxtweak.com/pricing/ (read via r.jina.ai; direct fetch was empty) | Free plan: "15 with per-tool limitations", Card Sorting response limit per study "10", number of cards "20". |
| Rosenfeld Media / WorldCat search for Spencer's book | *Card Sorting: Designing Usable Categories*, Rosenfeld Media, 2009. |

## Claims

| # | Line | Claim | Verdict | Source / note |
|---|---|---|---|---|
| 1 | 32, 34 | NN/g defines card sorting as placing labeled cards into groups | TRUE | NN/g definition: "participants place individually labeled cards into groups" |
| 2 | 36 | Wikipedia: knowledge elicitation technique, used in cognitive psychology and UX design | TRUE | Wikipedia lead |
| 3 | 36 | Donna Spencer's 2009 book, subtitled *Designing Usable Categories*, cited by Wikipedia | TRUE | Wikipedia references; Rosenfeld Media 05/01/2009 announcement |
| 4 | 44 | The Wisconsin Card Sorting Test measures how flexibly people switch sorting rules | TRUE | WCST measures set-shifting (Lancaster Univ. psychology glossary and others) |
| 5 | 45 | In the Activity Card Sort, clients sort photo cards of everyday activities | TRUE | Baum & Edwards ACS: photographs of instrumental, social and leisure activities, sorted by participation level (AOTA listing, StrokEngine). ACS:AIP uses line drawings, which does not change the one-liner |
| 6 | 57 | Hub lists untested navigation before a redesign as a reason to invest | TRUE | Hub "When should…": "A redesign is planned, if the navigation and information architecture have never been tested." |
| 7 | 58 | Mass Media Co.: several separate systems became one platform; the discovery workshop covered IA and user flows | TRUE | mass-media-co.md lines 4, 33, 43. Note: the sentence does not claim a card sort, which is correct because no case study describes one. Do not let later edits add "card sort" to it |
| 8 | 59 | Wikipedia finds the method most useful when audiences group differently | TRUE | Wikipedia lists it as one of three conditions (that line carries "citation needed") |
| 9 | 74, table 80–84, board SVG | Optimal Workshop's 101 guide defines open, closed and hybrid the same way; popular placements matrix for closed sorts | TRUE | OW 101 definitions and its "Popular placements matrix for closed card sorts" guide |
| 10 | 92 | Wikipedia: open = generative; NN/g: open is the most common type | TRUE | Wikipedia; NN/g "the most common type of card sort" |
| 11 | 98 | Wikipedia: closed = evaluative; NN/g generally prefers tree testing for validating structure | TRUE | Wikipedia; NN/g "we typically recommend tree testing" |
| 12 | 104 | "NN/g generally advises against hybrids because results mix two kinds of data" | **WRONG** | NN/g's reason is that "the predefined categories bias users into identifying similarly structured categories." See fix 1 |
| 13 | 106 | Modified-Delphi card sorting, credited by Wikipedia to Celeste Paul: each participant refines the previous structure | TRUE | Wikipedia |
| 14 | 106 | Reverse card sorting is another name for tree testing | TRUE | Wikipedia ("more popularly called tree testing"); NN/g definition article |
| 15 | 106 | "Our program runs card sorts in its evaluative studies step, because by then interviews have produced an early structure to check and reshape." | **WRONG (site fact)** | Hub step 4 says card sorts "check the early information architecture". No hub step says interviews produce the structure, and "reshape" is not in the hub. See fix 2 |
| 16 | 108, decision-tree SVG | Decision tree branches (none → open; some → hybrid; all fixed → closed or tree test) | TRUE | Every leaf matches the post's H3s and NN/g's tree-testing preference. SVG text matches the astext panel |
| 17 | 18 (takeaway), 125, 127 | 30–50 cards to avoid fatigue (NN/g); avoid repeating words across labels | TRUE | NN/g "30–50 cards to prevent user fatigue"; "avoid identical words in labels" |
| 18 | 19, 125, 269 | "at least 15 participants per user group" | TRUE as advice | 15 is Nielsen's and NN/g's figure. "Per user group" is the post's own advice and appears in neither source, and the post never attributes it to them. Acceptable as written. Do not add "as NN/g says" to it |
| 19 | 19, 129–142, chart SVG | Nielsen 2004: compared with a 168-user result, recommends 15; correlations 0.75 / 0.90 / 0.95 / 0.98 at 5 / 15 / 30 / 60; 5-user usability tests vs generative card sorting; Tullis & Wood 20–30 | TRUE | Nielsen 2004, all figures quoted exactly. Chart geometry checked: y-axis 0.70 at y=400, 1.00 at y=96 (1,013.3 px per 1.0); points at 349.3 / 197.3 / 146.7 / 116.3 match exactly. x-axis is linear at 10 px per participant. Dot grid = 14×12 = 168 dots with 15 highlighted |
| 20 | 146, 275, table 169–171 | NN/g 2024: 30–50 participants for quantitative; around 15 qualitative | TRUE | NN/g: "at least 15" qualitative; "at least 30–50" quantitative |
| 21 | 146 | Our program runs Optimal Workshop studies with 30–50 participants; recruitment is its own 3–6 day step | TRUE | Hub deliverable "Card sort and tree test… 30–50 participants"; step 2 "Participant recruitment (3–6 days)". Consistent with ux-research-methods.md (30–50, our program) |
| 22 | 156 | "Pilot test with one colleague, as NN/g advises" | **WRONG** | NN/g: run a pilot "with a smaller group of participants". It names no colleague and gives no count. See fix 4 |
| 23 | 159, 267 | Card sort and tree test run inside the 4–8 day evaluative studies step and are one deliverable in Optimal Workshop | TRUE | Hub deliverable item 4 and step 4 |
| 24 | 183 | Some moderated sessions, as NN/g recommends | TRUE | NN/g "important to run a few moderated sessions" |
| 25 | 189–206, matrix SVG | Similarity matrix, hierarchical clustering, dendrogram, standardization grid; Nielsen warns against building a structure from similarity scores alone | TRUE | Wikipedia; OW 101; Nielsen 2004 ("I don't recommend designing an information architecture based purely on a card sort's numeric similarity scores"). The illustrative matrix is symmetric (all 28 pairs checked), and the dendrogram is exact average linkage on it: joins at 85, 82, 78, 67, 34.7, 22.3 and 6.9, at 1.28 px per point from x=600 (100) to x=728 (0). The cut at 50 gives 4 groups, and "Export billing history" joins late (34.7). Labelled "Illustrative data" |
| 26 | 208 | Findings tagged and presented in a 90-minute readout, the last of five steps | TRUE | Hub step 5 |
| 27 | 218–234, before/after SVG, board SVG | Worked example: 36 cards, 9 → 5 groups, cross-links | TRUE (honesty) | Labelled "invented for teaching, not research data or a client result", and the SVGs say "Illustrative" / "Illustrative composite". The 9 and 5 group lists match between the SVG and the text panel. No client is named |
| 28 | 220 | SaaS: "each tenant holds its own users and roles, so screens separate account-level settings from personal settings" | TRUE | saas.json line 39 (narrowed from "users, roles, integrations and contract terms", which is a fair subset) |
| 29 | 238, 244–245 | Optimal Workshop, Maze and Lyssna run open and closed sorts; OW open/closed/hybrid with a dendrogram; Maze open/closed | TRUE | OW 101; Maze help center: open and closed supported, "Hybrid card sorting is not currently supported" |
| 30 | 246 | Lyssna: "Sorts followed by survey questions" | **WRONG** | Lyssna's own row says "ask follow-up questions, etc." See fix 5 |
| 31 | 247 | UXtweak open/closed/hybrid; long lists imported in bulk | TRUE | Lyssna roundup: "Choose from open, closed, and hybrid card sorting"; "import a card and category list from a CSV file" |
| 32 | 251 | Lyssna's 2026 roundup lists free plans: Lyssna (three seats), UXtweak (15 responses a month), Maze (1 study a month) | **WRONG in context** | All three figures are in the roundup. But the sentence opens "For a free tool". The same roundup's Maze row says "card sorting available on Enterprise plans", and Maze's help center says "Closed card sorting is available in all paid plans. Open card sorting is available in the Team and Enterprise plan." So Maze's free plan does not run card sorts. UXtweak's free plan caps card sorts at 20 cards and 10 responses per study (pricing page), which is below the post's own 30–50 cards. See fix 3 |
| 33 | 251 | We use Optimal Workshop | TRUE | Hub |
| 34 | 257 | Tankala, Feb 2024 NN/g: card sorting generates ideas for an IA, tree testing evaluates | TRUE | NN/g: "Card sorting is used to generate ideas for an IA while tree testing is used to evaluate IA options." |
| 35 | 262 table | Tree test is evaluative; card sort open generative / closed evaluative | TRUE | Tankala 2024; Wikipedia |
| 36 | 265 | OW 2016: tree test the current menu, card sort, draft, tree test with the same tasks; success and directness | TRUE | OW blog 29 Mar 2016 ("same or very similar tasks") |
| 37 | 267 | Web app design services validate navigation with tree tests of, for example, 10–15 tasks | TRUE | web-app-design-services.json line 47 ("for example 10–15 tasks per test") |
| 38 | 267 | Program 4–8 weeks, $25,000–$60,000; 1 user group + 10 interviews + 1 card sort near $25,000; deep link `#how-much-does-ux-research-cost` | TRUE | Hub cost section (verbatim); section id matches the H2 |
| 39 | 269 | Every project begins with a free consultation and a fixed-scope proposal | TRUE | about.md line 30 (verbatim) |
| 40 | 279 | "Session length for an unmoderated online sort is about 5–30 minutes, depending on the card count, per Dovetail" | **WRONG** | Dovetail: "allowing 5–30 minutes depending on the number of cards and complexity", with no unmoderated or online qualifier. See fix 6 |
| 41 | 279 | dscout tells researchers to plan for 60 minutes | TRUE | dscout People Nerds: "Usually, card sorts last 60 minutes, so plan for that amount of time" (general guidance). "which suits a moderated session" is the post's own gloss and is not attributed. Acceptable |
| 42 | 283 | Remote: unmoderated in online tools such as Optimal Workshop, moderated over video calls such as Zoom, as our program does; Wikipedia notes lost in-person interaction | TRUE | Hub FAQ "card sorts over video calls and online tools, for example Zoom and Optimal Workshop"; Wikipedia "lack of personal interaction" |
| 43 | 287 | NN/g's three limits: no site context, one level, fatigue past 50 cards with a Miscellaneous pile | TRUE (minor) | NN/g lists four limits; the fourth is "challenging to interpret". "Names three limits" reads as the complete list. See fix 7 |
| 44 | 36 | Link `/blog/ux-research-methods/` | TRUE | File exists, `draft: false`, same silo |
| 45 | — | Honesty: no invented clients, stats, testimonials, offices | TRUE | Only illustrative data, all labelled. No removed client (Apex HCM, Fortna, ToolsGroup). The author is a real team member (talha-saleem) |

## Fixes (exact current → replacement)

1. **Line 104 (hybrid reason).**
   Current: `NN/g generally advises against hybrids because results mix two kinds of data, so analyze participant-added groups apart from placements in your set groups.`
   Replacement: `NN/g generally advises against hybrids because the predefined categories bias participants toward similarly structured groups, so analyze participant-added groups apart from placements in your set groups.`

2. **Line 106 (hub step mapping).**
   Current: `Our program runs card sorts in its evaluative studies step, because by then interviews have produced an early structure to check and reshape.`
   Replacement: `Our program runs card sorts in its evaluative studies step, which follows generative fieldwork and checks the early information architecture.`
   (Built from hub steps 3–4 wording only.)

3. **Line 251 (free tools).**
   Current: `For a free tool, [Lyssna's 2026 roundup of card sorting tools](https://www.lyssna.com/blog/card-sorting-tools/) lists free plans for Lyssna (three seats), UXtweak (15 responses a month) and Maze (1 study a month); index cards are free but manual.`
   Replacement: `For a free tool, [Lyssna's 2026 roundup of card sorting tools](https://www.lyssna.com/blog/card-sorting-tools/) lists free plans for Lyssna (three seats) and UXtweak (15 responses a month, with card sorts capped at 20 cards on UXtweak's free plan), while Maze offers card sorting only on paid plans; index cards are free but manual.`
   (Sources: Lyssna roundup Maze row "card sorting available on Enterprise plans"; help.maze.co "Closed card sorting is available in all paid plans"; uxtweak.com/pricing Card Sorting number of cards "20".)

4. **Line 156 (pilot).**
   Current: `5. **Pilot test with one colleague**, as NN/g advises, and rewrite any card they hesitate over.`
   Replacement: `5. **Pilot test with a small group of participants**, as NN/g advises, and rewrite any card they hesitate over.`
   (Brief attribute "pilot test (one run with a colleague before launch)" is unsourced; the label noun "pilot test" survives.)

5. **Line 246 (Lyssna row).**
   Current: `| Lyssna | Open, closed, hybrid | Sorts followed by survey questions |`
   Replacement: `| Lyssna | Open, closed, hybrid | Sorts with follow-up questions |`

6. **Line 279 (Dovetail).**
   Current: `Session length for an unmoderated online sort is about 5–30 minutes, depending on the card count, per [Dovetail's guide](https://dovetail.com/ux/open-vs-closed-card-sorting/).`
   Replacement: `Session length for a card sort is about 5–30 minutes, depending on the number of cards and their complexity, per [Dovetail's guide](https://dovetail.com/ux/open-vs-closed-card-sorting/).`

7. **Line 287 (limits count).**
   Current: `NN/g names three limits: no site context, a grouping depth of one level, and fatigue past 50 cards, when a large Miscellaneous pile grows.`
   Replacement: `NN/g's limits include no site context, a grouping depth of one level, and fatigue past 50 cards, when a large Miscellaneous pile grows.`

None of the fixes touch SVG text. No image needs a redraw.

## Notes for the orchestrator (not failures)

- Funnel mismatch: the brief says `funnel: mofu` (CONFLICT 3 fallback). The post has `funnel: tofu` and a checklist description, which is the documented fallback. If that was deliberate, record it in the brief.
- CONFLICT 4: the post uses only "Optimal Workshop", which is correct. The 101 guide names neither "OptimalSort" nor "Optimal Card Sorting", and NN/g 2024 still says "OptimalSort". Do not add "formerly OptimalSort".
- The intro puts "Export billing history" in "Billing, Reports and Account" piles, while the example and board SVG name the open-sort piles "Money" and "Reports". This is illustrative and harmless; a writer may align the pile names.
- The brief's `externalSources` date for Nielsen 2004 (18 Jul) matches NN/g. Wikipedia's reference says 19 July. The post prints only "2004", so it is fine.

VERDICT: FAIL
