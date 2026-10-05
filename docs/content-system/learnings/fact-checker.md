# Learnings: fact-checker

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->

## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->

- 2026-10-05 (choose-ux-research-agency): The post cited the right NN/g URL but changed its numbers ("4–5 per group" where the article says 3–4 per group for two groups and 3 for three or more). Rule: when a sentence gives a number next to a correct citation, check every number against that source separately. A correct link does not prove the figure.
- 2026-10-05 (choose-ux-research-agency): The writer's "lead moment" offer (a 30-minute call with the lead researcher, the researcher on the line) came from the brief's `leadAngle`, not from the site. The site only promises "a free consultation and a fixed-scope proposal" (`content/pages/about.md`), and the team in `content/home.ts` has no researcher title. Rule: check every first-person offer (call length, who attends, fixed price, turnaround) against about.md, the form cards and home.ts. Treat the brief's leadAngle as unverified.
- 2026-10-05 (choose-ux-research-agency): A buyer rubric ("if the answer is 'our design team', research is a phase") contradicted the site's own positioning ("The designers who run your research…"), so readers who applied the post's rubric would mark the agency down. Rule: when a post gives a vendor-evaluation rubric, score our own agency against it using the site's claims, and flag any criterion we would fail.
- 2026-10-05 (method): WebFetch was blocked (EGRESS_BLOCKED) for insightsassociation.org and other domains. A WebSearch limited to the source's domain that returns the exact URL plus supporting snippets worked for verification. If the post's URL differs from the URL the search returns (for example, no `www.`), mark the link UNVERIFIABLE and give the URL the search returned as the replacement.
