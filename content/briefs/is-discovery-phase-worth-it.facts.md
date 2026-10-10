# Fact-check: is-discovery-phase-worth-it

Run: 2026-10-10, review loop 2 (final). Checked `content/blog/is-discovery-phase-worth-it.md` and every SVG in
`public/blog/is-discovery-phase-worth-it/` (cover, output-stack, assumption-ledger, skip-test-flow,
escalation-ladder, readout-checklist) against `content/services/digital-product-design-services.json` (hub),
`content/services/ui-ux-design-services-for-startups.json`, `content/pages/about.md` and `content/home.ts`.

Method: WebFetch failed with `ENOTFOUND` (hbr.org). I verified the Jobs to be Done definition with WebSearch.
The three external links (svpg.com four-big-risks, gov.uk how-the-discovery-phase-works, nngroup.com
discoveries-in-industry-revealed) are unchanged since loop 1 and stay TRUE (see the loop-1 verification).

## Loop-1 fixes

| Fix | Applied? | Note |
|---|---|---|
| F1 (case H2 bold answer) | Yes, word for word (line 142) | I re-checked my own wording against nitro.md, vocable.md and digno.md (approach/solution sentences): TRUE |
| F2 (sprint sentence, clause removed) | Yes (line 109) | TRUE against startup hub "Design sprint." |
| F3 (FAQ sprint fit) | Yes, word for word (line 205) | Agrees with the startup hub and the post's skip test |
| F4 (user groups) | Yes, word for word (line 195) | Hub step 2 |

## New and changed text

| # | Claim (post wording, short) | Verdict | Source |
|---|---|---|---|
| 1 | Cost position (l.195): "Discovery and research are the first steps of an engagement that runs 8–16 weeks, and its price follows four factors (platforms, user groups, core user flows and validation rounds). The published range for the whole engagement is $60,000–$180,000" | TRUE | Hub `priceRange` "$60,000–$180,000", cost answer "costs $60,000–$180,000 and takes 8–16 weeks… 4 factors: platforms, user groups, core user flows, validation rounds". "its" resolves to the engagement. The sentence gives no discovery-only price and does not say discovery is sold separately. The link fragment is unchanged from loop 1. |
| 2 | "together they show how much discovery and research the engagement needs" (l.193) | TRUE | Hub steps 1–2 are ranges (5–10, 5–15 days), and user groups is a price factor |
| 3 | "count the first 10–25 working days for discovery and research before information architecture starts" (l.164) | TRUE | Hub steps 1 (5–10 days) + 2 (5–15 days) = 10–25. Step 3 is information architecture. |
| 4 | JTBD paragraph (l.59): "names the progress a user hires the product to make, in the user's own words"; clinic example labelled "made-up"; "Designers cut any screen that does not serve that job" | TRUE | Christensen's definition: a job is the progress a customer is trying to make in a given circumstance, and customers "hire" products to do it (https://english.ckgsb.edu.cn/knowledge/article/clayton-christensen-on-innovation-finding-the-jobs-to-be-done/). Hub deliverable: brief defines "target users, Jobs to be Done". "In the user's own words" and "cut any screen" are advice, not theory claims. The example is labelled made-up and matches the ledger SVG ("A made-up clinic scheduling app"). |
| 5 | Figma + SUS (l.61): researchers synthesize in Dovetail; the flows feed a clickable prototype in Figma that a later step tests with 5 users per round in Maze; each round ends with a SUS score | TRUE | Hub step 2 (Dovetail), deliverable "A Figma prototype covers the core user flows", step 3 (flows) → step 4 ("5 users per round … clickable prototype on Maze … each round ends with a System Usability Scale (SUS) score") |
| 6 | "Can you skip product discovery? Yes, if the test says so: … its cut-offs are our rule of thumb … not research data" (l.90) | TRUE | Starts with Yes. Keeps the rule-of-thumb label, matching the SVG "Rule of thumb" tag. |
| 7 | Next-step endings: l.84 ("the closing section asks for that list"), l.113 ("a first call with us"), l.138, l.152, l.164, l.189 | TRUE | l.84 matches the closing's ask (l.199). "first call" matches home.ts ("before the first call", "Book a call"). There is no call length or attendee claim. The rest are advice to the reader. |
| 8 | Closing (l.199): "Every project begins with a free consultation and a fixed-scope proposal." | TRUE | about.md, word for word. It appears once in the body. |
| 9 | Closing (l.199): "Our team … scopes that proposal from the inputs above, whether your score points to full discovery, a light sprint or design right away." | WRONG | The hub FAQ says "Every digital product design engagement includes 5–8 user interviews per user group", and the hub process runs "from discovery to developer handoff". The site does not offer an engagement that goes to "design right away", and no site page says how the proposal is scoped. This is a promise beyond about.md (learning 23). See F5. |
| 10 | Intro (l.28): "In our digital product design services, discovery and user research are the first two steps; this post covers only whether to buy or skip them." | WRONG | "them" points to our two steps, so the sentence says a buyer can buy or skip them. That implies the steps are optional or sold on their own, which contradicts the same hub FAQ ("Every … engagement includes 5–8 user interviews per user group") and the hub's 5-step process. See F6. |
| 11 | l.158: "The full engagement runs 8–16 weeks (40–80 working days) … before information architecture, prototype validation and user interface (UI) design" | TRUE | Hub process answer, steps 3–5 |
| 12 | l.162: "The designers who run your research stay through design, testing and handoff" | TRUE | about.md, word for word |
| 13 | "[200+ products since 2017](/about/)" | TRUE | RULES.md confirmed facts. about.md: "more than 200 digital products" since 2017. |
| 14 | SVGs (all six) | TRUE | Each SVG's text matches its "Show as text" block. Skip-test exits are 0–2 full / 3–4 light (5-day design sprint) / 5–6 skip, the same as l.88 and l.105. The ledger SVG is labelled "Illustrative example" and "A made-up clinic scheduling app". There are no numbers that are not in the post. |

## Fixes (exact old → new)

**F5 (claim 9, closing, l.199)**
- Old: `Our team, with [200+ products since 2017](/about/) behind it, scopes that proposal from the inputs above, whether your score points to full discovery, a light sprint or design right away.`
- New: `Our team has designed [200+ products since 2017](/about/).`
- Basis: RULES.md confirmed fact and about.md. The new sentence drops the scoping promise and the "design right away" option, which the hub FAQ excludes. The sentence before it (the about.md offer) stays as it is.

**F6 (claim 10, intro, l.28)**
- Old: `In our [digital product design services](/services/digital-product-design-services/), discovery and user research are the first two steps; this post covers only whether to buy or skip them.`
- New: `In our [digital product design services](/services/digital-product-design-services/), discovery and user research are the first two of five steps in every engagement; this post helps you judge whether your product needs a discovery phase before design starts.`
- Basis: hub process ("runs in 5 steps, from discovery to developer handoff") and hub FAQ ("Every digital product design engagement includes 5–8 user interviews per user group").

Neither F5 nor F6 changes text that appears in an SVG, alt text or takeaway.

Note for the orchestrator (not a post fix): `content/home.ts` line 199 says "Full design and build engagements are scoped after discovery." This conflicts with about.md ("every project begins with a free consultation and a fixed-scope proposal") and with the hub FAQ ("the client's engineers write the code"). The post does not repeat it, but the site copy needs a review.

VERDICT: FAIL
