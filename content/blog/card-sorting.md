---
title: "Card Sorting Guide to Open, Closed and Hybrid Sorts for Navigation"
metaTitle: "Card Sorting | Open, Closed and Hybrid Sorts for Navigation"
description: "Card sorting shows how users group content. Choose open, closed or hybrid, size the study, read the results and plan a tree test. Grab the free checklist."
date: 2026-10-24
updated: 2026-10-24
contributors: [umar-sarwar]
author: talha-saleem
type: Guide
services: [ux-research-services]
industries: []
tags: [card sorting, open card sorting, closed card sorting, information architecture, tree testing]
keyword: "card sorting"
funnel: tofu
takeaways:
  - "Card sorting is a UX research method in which participants group labeled cards, so a team can build navigation that matches users' mental models."
  - "Open sorts are generative and find groupings; closed sorts are evaluative and check set categories; hybrid sorts mix both."
  - "Plan 30–50 cards per study, the range Nielsen Norman Group gives to avoid fatigue."
  - "Plan at least 15 participants per user group; at 15, Jakob Nielsen's data correlates 0.90 with a 168-user result."
  - "Read the similarity matrix and dendrogram next to participant comments, then tree test the new menu."
draft: true
qa: pending
---

"Export billing history" is one card in an illustrative card sorting study for a software as a service (SaaS) project-management app, and participants file it in three piles: Billing, Reports and Account. Nobody filed it wrong. The split says the settings menu needs a cross-link or a clearer label, and finding such splits before anyone draws a wireframe is what the method is for.

Teams use this user experience (UX) research method when a menu must be built or rebuilt, and it is one of the six deliverables in our [UX research services](/services/ux-research-services/). The sections take its decisions in order: sort type, sample size, the run, analysis, a worked example (invented for teaching), tools and the tree test that follows.

## What is card sorting in UX research?

**Card sorting is a UX research method in which participants group labeled cards into categories, so a team can shape an information architecture (IA) that matches their mental models.**

Each card names one content item or feature, and in most sorts participants name each group. Information architecture is how a product's content is organized, labeled and connected into menus; mental models are users' expectations of where things live. [Nielsen Norman Group (NN/g) defines the method](https://www.nngroup.com/articles/card-sorting-definition/) by that act of placing labeled cards into groups, and in user interface (UI) and UX design its output feeds navigation labels.

Wikipedia's entry on the method describes it as a knowledge elicitation technique, used in cognitive psychology as well as UX design, and cites Donna Spencer's 2009 book, subtitled *Designing Usable Categories*. A card sorting exercise runs on paper with index cards or online. Our [overview of where this method sits among UX research methods](/blog/ux-research-methods/) helps you confirm it fits your question.

### Which card sorting does this guide cover?

**This guide covers the UX research method for menus and site structure, not the other activities that share its name.**

- **Trading cards:** collectors sort by set or value, by hand or with card sorter machines.
- **Computer science:** sorting algorithms put items in order.
- **Neuropsychology:** the Wisconsin Card Sorting Test measures how flexibly people switch sorting rules.
- **Occupational therapy:** in the Activity Card Sort, clients sort photo cards of everyday activities.
- **Classrooms:** students group words or concepts on cards.

If your question is where users expect a setting to live, read on.

## When does a card sort help your information architecture?

**A card sort helps when you must create or rebuild an information architecture and do not yet know how users group the content.**

Run one for:

- **A new product with no taxonomy**, because users' groupings beat the org chart.
- **Navigation never tested before a redesign**, which our hub lists as a reason to invest in research.
- **Merging products**, because each team's categories fit only its own product. When several separate systems became one platform, the [Mass Media Co. discovery workshop](/case-studies/mass-media-co/) covered information architecture and user flows.
- **Audiences that group differently**, such as admins and end users, where Wikipedia finds the method most useful.
- **Internal jargon in menus**, because an open sort surfaces users' words.

Skip it when:

- **Users cannot find items in an existing menu:** tree test the current structure first.
- **The problem is a task flow or form:** run usability testing, because a sort never shows a screen.
- **You need to know why users need a feature:** start with interviews or [watching users work in their real setting](/blog/contextual-inquiry/).

The FAQs list the method's limits. If your redesign touches navigation, schedule the sort before the first wireframe.

## Open, closed or hybrid card sorting, which fits your stage?

**An open card sort lets participants create and name groups, a closed card sort gives them your categories, and a hybrid mixes both; pick by how much structure exists.**

Optimal Workshop's Card Sorting 101 introduction defines the three sort types the same way.

<!-- visual: three-panel sort board mockup — the same 6 settings cards from the worked example in 3 panels: open (participant-named piles), closed (fixed columns Account, Team, Billing, Integrations), hybrid (fixed columns plus one participant-added column "Data and exports"); labelled "Illustrative" -->

<details class="astext"><summary>Show as text</summary>

| | Open sort | Closed sort | Hybrid sort |
|---|---|---|---|
| Who names groups | Participants | The team, in advance | The team; participants can add groups |
| Best stage | New product or new IA | Categories fixed by business or regulation | Redesign that keeps some groups |
| Main output | Similarity matrix, dendrogram, participant labels | Popular placements matrix | Placements plus new groups |

</details>

### Open card sorting

**An open sort is the discovery format: participants group cards however they like and name each group.**

It uncovers mental models and users' own words. Wikipedia classes open sorts as generative, and NN/g calls them the most common type. Use one when you have content but no structure you trust.

### Closed card sorting

**A closed sort gives participants predefined categories and asks them to place every card in one.**

It checks a set of groups, so Wikipedia classes it as evaluative; that generative versus evaluative split is the core difference. NN/g generally prefers a tree test for validating structure, because it shows whether people find items, not just where they file them. Use one when category names are fixed.

### Hybrid card sorting

**A hybrid sort fixes some categories and lets participants add their own, which suits redesigns that keep part of the menu.**

NN/g generally advises against hybrids because results mix two kinds of data, so analyze participant-added groups apart from placements in your set groups.

In modified-Delphi card sorting, credited by Wikipedia to Celeste Paul, each participant refines the previous participant's structure. Reverse card sorting is another name for tree testing. Our program runs card sorts in its evaluative studies step, because by then interviews have produced an early structure to check and reshape.

<!-- visual: sort-type decision tree — left-to-right yes/no flow from "Do you have categories you must keep?" to open sort, hybrid sort, closed sort or tree test instead; caption "Sort-type decision tree" -->

<details class="astext"><summary>Show as text</summary>

- Do you have categories you must keep?
  - No, the product is new or the structure will be replaced: open sort.
  - Some of them: hybrid sort.
  - All, fixed by business or regulation: what do you need to learn?
    - Where users would file each card: closed sort.
    - Whether users find items: tree test instead.

</details>

When choosing between an open and a closed card sort, start from the decision tree's first question, not your tool's default.

## How many cards and participants does a card sort need?

**An open or closed card sort works best with 30–50 cards and at least 15 participants per user group, with more participants when you need comparable numbers.**

Set the card count at 30–50 cards, NN/g's range for avoiding fatigue. Keep cards at one level of detail and never repeat a word across card labels, because participants then group by the shared word.

For the participant count, [Jakob Nielsen's 2004 analysis](https://www.nngroup.com/articles/card-sorting-how-many-users-to-test/) compared smaller samples with a 168-user result and recommends 15. Generative work needs more people than a 5-user usability test, he explains, and he cites Tullis and Wood's suggestion of 20–30 users. The sample correlation rises fast up to 15, then slowly.

<!-- visual: sample correlation line chart — X participants (5, 15, 30, 60), Y correlation with the 168-user result (0.75, 0.90, 0.95, 0.98), annotation at 15 with only that number large, source line "Jakob Nielsen, NN/g, 2004" -->

<details class="astext"><summary>Show as text</summary>

| Participants | Correlation with the 168-user result |
|---|---|
| 5 | 0.75 |
| 15 | 0.90 |
| 30 | 0.95 |
| 60 | 0.98 |

Source: Jakob Nielsen, Nielsen Norman Group, 2004.

</details>

For a quantitative study, NN/g's 2024 guide gives 30–50 participants. Count each user group separately, since admins and end users group cards differently. Our program runs Optimal Workshop studies with 30–50 participants. Recruiting that many matched people is where in-house sorts tend to stall, so participant recruitment is its own 3–6 day step. Count your user groups before you budget incentives.

## How to run a card sorting study, step by step

**To run a card sort, list the content, write the cards, pick the sort type and format, recruit, pilot, then run it with follow-up questions.**

1. **Inventory the content and write one research question**, because a sort with two questions answers neither.
2. **Write the cards** to the rules above, and have an outsider read them for jargon.
3. **Choose the sort type and format** from the decision tree and the table below.
4. **Recruit participants per user group**, screening for people who use that part of the product.
5. **Pilot test with one colleague**, as NN/g advises, and rewrite any card they hesitate over.
6. **Run the sort with follow-up questions**: why a card went where it did, and which cards were hard.

In our program, the card sort and its tree test run inside the 4–8 day evaluative studies step, so the study duration fits that window. In-house, keep the order: recruit, pilot, launch.

### Moderated or unmoderated, in person or remote?

**Moderated sessions give the reasons behind each grouping, while unmoderated card sorting gives a large sample for the matrix; most studies need both.**

The table compares formats by moderation mode, setup and best use.

| Format | How it runs | Best for |
|---|---|---|
| Moderated, in person | Index cards; the participant thinks aloud | Reasons, around 15 people |
| Moderated, remote | Video call with an online tool | Reasons, participants anywhere |
| Unmoderated, online | Participants sort alone | Similarity scores, 30–50 participants |

The FAQs give session lengths. Book moderated sessions first, so their comments shape the follow-up questions.

### Best practices for a card sort

**Good card sorts share five habits that protect the grouping data.**

- **One research question per sort**, so groups answer one decision.
- **Plain card labels**, so the sort tests grouping, not vocabulary.
- **A "not sure" pile**, so nobody forces a card into a wrong group.
- **A pilot**, so a confusing card costs one session.
- **Some moderated sessions**, as NN/g recommends, so each cluster has a reason.

Copy these into your study plan.

## How do you analyze card sorting results?

**Analysis of a card sort reads card pairs in a similarity matrix, clusters in a dendrogram and participants' group names, then checks each pattern against comments before it shapes the menu.**

Each similarity matrix cell shows the share of participants who put two cards together, the pair's similarity score; a card with no strong partner is one users cannot place. Hierarchical cluster analysis joins the closest pairs into a dendrogram, and where you cut it sets the number of top-level groups. Cut where groups make sense to users and the business.

<!-- visual: annotated similarity matrix and dendrogram — illustrative 8×8 matrix excerpt with heat shading beside a dendrogram with a dashed cut line; split card "Export billing history" highlighted; callouts for one cell, one cluster and the cut; labelled "Illustrative data" -->

<details class="astext"><summary>Show as text</summary>

- **Cell:** share of participants who grouped two cards, such as "Download invoices" and "Update payment method".
- **Cluster:** cards joined early belong together.
- **Cut line:** its height sets the number of top-level groups.
- **Highlighted card:** "Export billing history" joins late, a split card.

Illustrative data.

</details>

Merge synonymous group names, such as "Billing" and "Payments", in a standardization grid; for closed sorts, a popular placements matrix shows which category won each card. A card split across groups needs a cross-link or a clearer label. Nielsen warns against building a structure from similarity scores alone, so weigh clusters against comments. Paper sorts need only a spreadsheet: one row per card, one column per group.

In our program, findings are tagged and presented in a 90-minute readout, the last of its five steps. Note why you cut where you did, because stakeholders will ask.

### How is a card sort different from affinity mapping?

**A card sort has participants group content items to shape navigation, while affinity mapping has researchers cluster their own notes during synthesis.**

The sort shows users' mental models; affinity mapping organizes what the team learned. Use the sort for menus and affinity mapping for interview notes.

## Card sorting example, regrouping a SaaS settings menu

**This illustrative example sends 36 settings cards from a project-management app to an open card sort and turns 9 scattered menu groups into 5 that users recognize.**

Every figure here is invented for teaching, not research data or a client result. The cards included Change password, Two-factor authentication, Invite teammates, Set member roles, Download invoices, Change plan, Export billing history and Connect Slack. Three clusters dominated: people, money and connections. "Export billing history" split between money and a participant pile called "Reports", because some read "export" as data work. "Two-factor authentication" split between account and team groups, because admins set it for everyone. It mirrors a split we design for in [SaaS UI UX design](/industries/saas/): each tenant holds its own users and roles, so screens separate account-level settings from personal settings.

<!-- visual: before/after settings menu — two app sidebars, 9 old groups vs 5 new groups, 2 cross-links marked, the split card "Export billing history" traced from old to new position; labelled "Illustrative composite" -->

<details class="astext"><summary>Show as text</summary>

**Before, 9 groups:** General, Account, Profile, Team, Permissions, Billing, Plans, Integrations, Advanced.

**After, 5 groups:** Account and profile; Team and permissions; Billing and plans; Data and integrations; Notifications.

**Cross-links:** "Export billing history" lives in Billing and plans, linked from Data and integrations; "Two-factor authentication" lives in Account and profile, linked from Team and permissions.

</details>

The next check is a tree test task: "Where would you change who can see invoices?" The answer sits in Team and permissions, although the word "invoices" pulls people toward Billing and plans. Write one such task per split card.

## Which card sorting tools fit open, closed and hybrid sorts?

**Online tools for UX research such as Optimal Workshop, Maze and Lyssna run open and closed card sorts, while Miro boards and paper index cards suit small moderated sorts.**

The table compares six options by sort types and best fit.

| Tool | Sort types | Best fit |
|---|---|---|
| Optimal Workshop | Open, closed, hybrid | Large unmoderated studies, built-in dendrogram |
| Maze | Open, closed | Teams already testing prototypes in Maze |
| Lyssna | Open, closed, hybrid | Sorts followed by survey questions |
| UXtweak | Open, closed, hybrid | Long card lists imported in bulk |
| Miro or FigJam | Any, by hand | Moderated remote sessions |
| Paper index cards | Open or hybrid | In-person moderated sessions |

For a free tool, [Lyssna's 2026 roundup of card sorting tools](https://www.lyssna.com/blog/card-sorting-tools/) lists free plans for Lyssna (three seats), UXtweak (15 responses a month) and Maze (1 study a month); index cards are free but manual. The best software fits your analysis output and participant panel; we use Optimal Workshop. Pilot in two tools before you pay.

## Why tree testing comes after card sorting

**A card sort proposes a menu from users' groupings and tree testing checks it, because a tree test asks participants to find items in a text-only version of the new structure.**

So the card sorting vs tree testing question is about order, not choice. Samhita Tankala's February 2024 NN/g comparison describes the first as generating ideas for an information architecture and the second as evaluating one.

| | Card sort | Tree test |
|---|---|---|
| Participants | Group cards, often naming groups | Find items in a text-only menu |
| Method class | Open generative, closed evaluative | Evaluative |
| Output | Similarity matrix, dendrogram | Success and directness per task |

Optimal Workshop's 2016 post on which comes first sets the order: tree test the current menu, run the card sort, draft the structure, then tree test it with the same tasks. As a tree testing example, the invoice task above scores success (did people end in Team and permissions?) and directness (did they get there without backtracking?).

In our program, the card sort and tree test are one deliverable in Optimal Workshop, and our [web app design services](/services/web-app-design-services/) validate navigation with tree tests of, for example, 10–15 tasks. A full UX research program runs 4–8 weeks at a program price of $25,000–$60,000, and the hub shows [what a UX research program with a card sort costs](/services/ux-research-services/#how-much-does-ux-research-cost): a program with 1 user group, 10 user interviews and 1 card sort sits near $25,000.

One label in three piles looks small, yet it decides where a whole menu branch lives. Pick your sort type from the decision tree, budget 15 or more participants per user group and write the tree test tasks before the first card goes out. Your current menu or sitemap is the brief for that work, whether your team runs the study or you [share the menu or sitemap with us](/contact/). Every project begins with a free consultation and a fixed-scope proposal.

## FAQs

### Is card sorting qualitative or quantitative?

Both, depending on how you run it. Moderated sessions with around 15 participants give reasons, which is qualitative data, while unmoderated studies with 30–50 participants give comparable similarity scores.

### How long does a card sort session take?

Session length for an unmoderated online sort is about 5–30 minutes, depending on the card count, per [Dovetail's guide](https://dovetail.com/ux/open-vs-closed-card-sorting/). [dscout's guide](https://dscout.com/people-nerds/card-sorting) tells researchers to plan for 60 minutes, which suits a moderated session where participants explain their choices.

### Can you run a card sort remotely?

Yes. Remote card sorting runs unmoderated in online tools such as Optimal Workshop and moderated over video calls such as Zoom, as our program does. Remote sessions lose some in-person conversation, Wikipedia notes, so keep a few moderated ones.

### What are the limits of a card sort?

A card sort shows how users group content, not whether they find it in a real interface. NN/g names three limits: no site context, a grouping depth of one level, and fatigue past 50 cards, when a large Miscellaneous pile grows.

### Should a card sort come before or after wireframes?

Before. The sort shapes the menu that wireframes lay out, and a tree test checks it before high-fidelity design. Moving the menu later means redrawing every screen with navigation.

### How many card sorts does a redesign need?

Usually one per user group whose content differs, followed by a tree test. Run a second sort only when large split groups remain that comments cannot explain.
