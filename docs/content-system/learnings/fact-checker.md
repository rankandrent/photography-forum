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
- 2026-10-05 (choose-ux-research-agency, round 2): The writer pasted my round-1 replacement sentences word for word, so any wording I added became a new claim. One example is "at least 3 per group", where the NN/g source says "3 users from each category" and supports "at least" only in a parenthetical. Rule: before proposing a replacement sentence, check its exact wording against the source as strictly as the original post. In repair rounds, re-check the pasted replacements rather than assuming they are TRUE because I wrote them.
- 2026-10-06 (saas-product-redesign): The scope decision tree SVG sent "several lifecycle stages do not leak" to "Not a redesign: price, positioning or a missing integration". The post ties that verdict to what churn interviews say, so the diagram made a claim the text never made, and the alt text repeated it. Rule: walk every branch of a decision tree or matrix in the SVG and check each leaf against the post's own conditions, not only the labels. A branch the prose does not support is WRONG even when every label is spelled correctly.
- 2026-10-06 (saas-product-redesign): The post's CTA merged the free consultation with the hub's paid discovery step ("the free consultation returns … a baseline-and-rollout plan … run as the discovery step"). It also turned the brief's "first-hand angle" (week-1 asks: ticket export, churn-survey text, top accounts by seat count) into "we ask for" statements that no site page makes. Rule: for every "we …" sentence, find which site step it belongs to (free consultation in about.md, or a numbered process step on the hub) and flag sentences that mix the two or add deliverables. When a "we" process claim is not on the site, rewrite it as advice to the reader (imperative) instead of deleting it.
- 2026-10-06 (method): library.gv.com search results carry a Medium `?gi=` tracking parameter. A difference of only a tracking query string is not a URL mismatch, unlike a host difference such as a missing `www.`. Rule: compare host and path. Ignore tracking parameters (`?gi=`, `utm_*`) when deciding whether the post's link matches the URL the search returned.
