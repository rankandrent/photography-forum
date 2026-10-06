---
name: onpage-audit
description: Runs the onpage-seo-auditor agent over the whole site (blogs, services, industries, locations, case studies) against the Semrush-based on-page checklist, applies safe fixes, and coaches the writer and QA agents. Use for "on-page SEO audit/check" or the daily on-page run.
---

# On-page audit

1. Run the `onpage-seo-auditor` agent with the Agent tool (it builds, runs `npm run onpage`, reviews,
   fixes up to 10 safe items and writes lessons for the writer, QA and researcher).
2. Review its diff: revert anything that changes a URL, price, honesty fact or case-study number, or
   rewrites a section wholesale.
3. `npm run build && npm run seo:check && npm run onpage && npm run lint` — must pass.
4. Commit `docs/data/onpage/`, the edits and the learnings as `On-page audit <date>: <n> fixes, avg <score>`
   and deploy (git fetch site main && git merge --ff-only site/main; git push site HEAD:main; push
   origin claude/inspiring-mendel-i7gp8c).
5. Report: average score and trend, fixes, proposals for the owner, lessons sent to the team.
