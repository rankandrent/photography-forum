---
name: site-audit
description: Runs the site-seo-auditor agent over the whole site, applies its small safe improvements, and commits them with an audit report. Use for "audit the site", "improve the content", or the recurring weekly audit.
---

# Site audit

1. Run the `site-seo-auditor` agent with the Agent tool. It writes
   `docs/content-system/audits/<YYYY-MM-DD>.md` and makes at most 10 small, verified edits.
2. Review its diff yourself (`git diff`): revert anything that adds an unverifiable claim, changes a
   price, URL or honesty fact, or rewrites a page wholesale.
3. `npm run build && npm run seo:check && npm run lint` — must pass.
4. Commit as `Site audit <date>: <n> improvements` and push the way this repo deploys.
5. Report to the user: edits made (file + reason), top proposals that need their decision, and the
   next blog topics per hub (feed them to `/content-pipeline`).
