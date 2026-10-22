# Learnings: site-seo-auditor

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->

## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->

- 2026-10-21 (owner rule, final, all pages): no ":" in any title: meta title, og:title, H1 (`title`, `hero.h1`) or `coverTitle`. The meta title starts with the exact primary keyword, then " | " and a short benefit; the H1 carries the exact keyword joined with plain words or a comma. `npm run seo:check` now errors on a colon. Evidence: owner, after the GSC keyword report. Rule: RULES.md Keywords rule 4.
- 2026-10-21 (owner rule): Google's AI Overview and People Also Ask for the primary keyword are required inputs, never ignored. The brief's `aiOverview` (cited sources, entities, attributes, terms, questions) and `paa` must each be covered on the page with a real fact, and every PAA question answered directly in an H2/H3 or FAQ; one missing item fails QA. Rule: RULES.md Keywords rule 5.
- 2026-10-22 (owner rule, final): protect live rankings. Never change a live page's slug/URL. Never change a live page's meta title or og:title without the owner's explicit approval for that page; propose it instead. H1, body, sections, FAQs and internal links may be improved. `npm run seo:check` now errors if a route in docs/content-system/locked-pages.json disappears or its title changes. Rule: RULES.md Keywords rule 6.
