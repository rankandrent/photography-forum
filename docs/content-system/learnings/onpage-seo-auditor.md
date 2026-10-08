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
- 2026-10-07: the score cannot see readability. ux-audit-agency-vs-freelancer scored 100 while its first sentence used the keyword ungrammatically ("settle UX audit agency vs freelancer"). Rule: for every new post, read the title, description, first sentence and first H2 aloud before accepting a 100. "Keyword present" is the floor, not the bar.
- 2026-10-07: `has()` and the slug check now treat hyphen and space variants as one word through `norm()` and `compact()` ("e-commerce" = "ecommerce" = "e commerce"), which moved /industries/ecommerce/ from 96 to 100 with no URL change. Synonyms and singular/plural still fail on purpose. Rule: when a page fails only on a spelling variant, fix the matcher. When it fails on a synonym, fix the copy.
- 2026-10-07: some honesty facts are defined by their verb. While adding the /about/ link to saas-product-redesign, a first rewording turned "designed 200+ products" into "shipped 200+ products", which is a new claim. Rule: when you add a link to a sentence that holds a company fact (200+ products designed, since 2017, Reston HQ), link the existing words and keep every word of the fact unchanged.
- 2026-10-08: the alt check only tests that alt text exists, so template-made alt text can still be broken. `HomeSections.tsx` and `app/page.tsx` ran `role.toLowerCase()`, which turned "Principal UX Designer" into "principal ux designer" on / and /about/. Category titles were built as "Product design Guides". Every page still scored 100. Rule: once per run, grep the built `out/**/index.html` `alt="…"` and `<title>` values for lowercased acronyms (` ux`, `ui/ux`, ` kam`) and mixed case ("design Guides"). Fix the template line, not the content.
- 2026-10-08: each post brief (`content/briefs/<slug>.json`) has `backlinkSuggestions`, some marked conditional ("Apply only after SITE-FACT CONFLICT 1 is resolved"). Rule: before running `links:find` for a new post, read the brief's `backlinkSuggestions` and `notes`. Apply the ones not yet in place, and send the conditional ones to the owner as proposals, never as edits.
- 2026-10-08: "first run of an existing lesson" is not the same as "first time the gap happened". The 2026-10-06 writer lesson already asked for a description next step, yet 3 of 4 posts lack one. Rule: before calling a gap new, check every published post for it (`grep '^description:' content/blog/*.md`). If 2 or more pages already have it, escalate it now.
