# Learnings: onpage-seo-auditor

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->
- 2026-10-06 (owner): Follow the Semrush on-page SEO checklist (docs/content-system/ONPAGE-CHECKLIST.md) on every page — blogs, services, industries, locations — and guide the writer and QA daily so every new post has the full checklist.

## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->
- 2026-10-06 (first run): markdown pages (about, privacy, terms) used `title` as both the H1 and the `<title>`, so short H1s produced 8–16-char titles. `content/pages/*.md` now accepts `metaTitle`. Rule: fix a short page title with `metaTitle` and leave the H1 alone.
- 2026-10-06: `has()` in onpage-audit.mjs needs every keyword word longer than 2 chars to appear literally, so a singular or a synonym fails ("Startup" vs "startups", "Fintech" vs "finance"). The "e-commerce" anchor also never matches the "ecommerce" slug. Rule: when writing a fix, use the anchor's exact word forms and keep any synonym as the angle after the `|`. Treat the ecommerce slug failure as a script issue and never change a URL for it.
- 2026-10-06: seo:check measures the description in built HTML, where an apostrophe renders as `&#x27;` (+5 chars). Rule: avoid apostrophes in descriptions within 5 chars of the 158/160 limit, or re-run seo:check after each one.
