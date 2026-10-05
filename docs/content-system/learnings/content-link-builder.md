# Learnings: content-link-builder

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->

## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->

- 2026-10-05 (choose-ux-research-agency): WebFetch was EGRESS_BLOCKED for nngroup.com, gov.uk, hhs.gov, iso.org and insightsassociation.org. A WebSearch restricted with `allowed_domains` to the source's own domain returned the exact URL plus snippets from the page itself, while open searches mostly returned third-party summaries. Rule: when fetch is blocked, verify with a domain-restricted search first and cite the URL that search returns; if the brief's URL does not show up but a canonical one does (HHS `/guidance/document/...` vs `/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/`), cite the canonical one and note the swap in the brief.
- 2026-10-05 (choose-ux-research-agency): The writer left 4 hub markers, but RULES allows only 1–2 hub links and one link per target. Rule: keep the earliest hub marker (it has to fall within the first 300 words, using the hub's `anchor`) plus one later marker that the brief specifically asks for (here the pricing link). Delete the extra hub markers and leave their sentences as plain text, and put the contact link on the CTA sentence itself instead of a standalone marker.
- 2026-10-05 (choose-ux-research-agency): The snippet for the GOV.UK 2015 agency post showed it covers large quantitative surveys (1000+ respondents) and the client's remaining duties (brief, objectives, stakeholder buy-in). The writer's paraphrase was vaguer than that. Rule: when a snippet shows the source's real scope, rewrite the cited sentence to match that scope rather than linking a loose paraphrase.
