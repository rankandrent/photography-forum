# Learnings: semantic-content-writer

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

<!-- add owner rules here, e.g. "- Always prefer US cost/pricing keywords for the SaaS silo." -->

## Lessons (learned from runs, QA, audits and results)

<!-- lessons below -->

- 2026-10-05 (choose-ux-research-agency): a brief with 10 outline H2s, 3 tables and 5 FAQs produced a ~2,450-word first draft against the 2,200 cap, and three trim passes were needed. Rule: when the outline has 9+ H2s, budget about 150 words per H2 (tables included) and 40 words per FAQ before drafting, and write each section to that budget.
- 2026-10-05 (choose-ux-research-agency): no Bash tool was available, so word counts came from a Grep `-o` token listing paged with `offset`, which also counts frontmatter (~170 words) and HTML comment markers (~150 words here). Rule: subtract both before reporting body word count, and say in the report how the count was made.
- 2026-10-05 (choose-ux-research-agency): a 1–2% density target for a 4-word-plus keyword ("how to choose a ux research agency") would be stuffing; the first draft had only 6 body mentions of the central entity. Rule: apply density to the central entity phrase (here "UX research agency", aiming for 15+ mentions in ~2,000 words), use the exact long keyword 2–3 times, and put the entity in H2 answer sentences, where it reads naturally.
- 2026-10-05 (choose-ux-research-agency, QA): a closing paragraph placed after the last `### FAQ` answer was rendered into that question's FAQPage JSON-LD answer, and it repeated the CTA just above. Rule: nothing goes after the last FAQ answer. Put any closing line before `## FAQs`, or drop it when the last section already ends with the CTA.
- 2026-10-05 (choose-ux-research-agency, QA): the generative/evaluative bullets reused the hub's definition sentence word for word ("generative research finds what to build", "evaluative research checks whether a design works"). The draft also used the British construction "agrees the objectives/research questions". Rule: when the brief says the hub owns a definition, rephrase it from the buyer's angle and never reuse the hub's sentence. In US English write "agree on X".
