# Learnings: seo-keyword-researcher

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->

## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->

- 2026-10-05 (ux-research-services, first BOFU). Evidence: the hub JSON has its own H2 "How much does UX research cost?" with a price range, so "ux research cost" would cannibalise it even though the hub's metaTitle does not say "cost". Rule: check the hub's `sections[].h2` and FAQ questions, not only `keyword`/`metaTitle`. If a hub H2 already answers the query, reject it as a post keyword and use a buyer-evaluation angle (how to choose, compare proposals) that links up to the hub's section.
- 2026-10-05. Evidence: Semrush returned `no_api_units` on the first call and WebFetch was blocked by the egress proxy for every agency blog tried (fuselabcreative, ux4sight, answerlab, 925studios, eleken). Rule: test Semrush with one call before planning around it; when WebFetch is blocked, use `<domain> <post title>` WebSearch queries to get each page's coverage from snippets, set `volume`/`kd` to null, and state the data source and its limits in the brief's `dataSource` field. Never estimate volume or KD.
- 2026-10-05. Evidence: SERP snippets for agency-hiring queries carried unsourced numbers ("3x more likely to report satisfaction"). Rule: list such claims in the brief `notes` as "do not use" so the writer does not pick them up from the competitor page.
