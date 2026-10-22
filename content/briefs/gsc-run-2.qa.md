# QA: Search Console run 2 (ux-consulting-services, ux-audit-services)

Date: 2026-10-22 · Reviewer: content-qa · Scope: content/services/ux-consulting-services.json (commit a67ac8e), content/services/ux-audit-services.json (commit 34ba895). Direct edits are in these two files only.

## Gates (after my edits, fresh build)
- `npm run build`: PASS (exit 0).
- `npm run seo:check`: PASS, 89 pages, 0 errors. The 1 warning is pre-existing and not on these routes (home → startups anchors).
- `node scripts/onpage-audit.mjs`: /services/ux-consulting-services/ **100**, /services/ux-audit-services/ **100**, no failed checks.
- `npm run lint`: PASS (exit 0). Only the known jsx-ast-utils TSNonNull notices print.
- Locked pages (Keywords rule 6): PASS. Neither slug, `metaTitle` nor og:title changed (`git diff` shows no metaTitle line; locked-pages.json untouched; seo:check locked-route check clean). The H1s are unchanged too.

## Checklist
| # | Item | Result |
|---|---|---|
| 1 | Keyword rules 1–3 (volume 500 each, keyword in meta/H1/first 60 words, salience; every H2 on both pages carries the keyword) | PASS |
| 2 | Rule 4/6: no title/slug/og change on live pages | PASS |
| 3 | Rule 5, PAA: every question answered, with the direct answer in the first sentence (consulting 4/4, audit 3/3) | PASS |
| 4 | Rule 5, AI Overview entities and attributes covered with facts | FIX applied. The consulting page lacked "usability testing" as a phrase (0 hits); it is now in the vs-design table |
| 5 | Concept bindings / one answer site-wide (hub facts) | FIX applied. Reviewer count fixed (see C2/A3/A4); audit cost body contradicted the consulting page (A5) |
| 6 | Layout: bold answer under each H2 (≤ ~30 words), tables introduced, section text ≤ 90 words | PASS after fixes. Longest bodies: audit cost 83 (was 76, 88 mid-edit, trimmed), WCAG H3 72, definition 71; all others 48–70 |
| 7 | FAQs one paragraph each; FAQPage `acceptedAnswer.text` clean | PASS. 20/20 answers printed from out/, no `</p><p>`, no glued sentences, no entities or tags |
| 8 | Honesty: site facts only; no invented clients/stats/offices; no Apex HCM/Fortna/ToolsGroup | PASS after C5 (0 hits for the removed clients; Mass Media Co. quotes match mass-media-co.md L33–43, L100; the 30% is credited to the whole revamp) |
| 9 | Consistency between the pages ("What does UX stand for?") | FIX applied (C6, A6) |
| 10 | Pricing/team consistency with home.ts | FIX applied (C2, C8, A3, A4) |
| 11 | Cannibalization consulting vs audit; owner of "ui ux consulting and audit" | FIX applied (C7). Owner = audit page |
| 12 | Overlap with other service pages (5-gram) | PASS. consulting vs audit 2.4%, audit vs consulting 2.6%, audit vs mobile-app 2.1%, all others < 2% |
| 13 | Internal links (≤ 1 contextual per target + template cards) | PASS. design-system, saas-ux-design and ux-consulting each have 1 contextual link + 1 template card on the audit page |
| 14 | Abbreviations expanded on first visible use | FIX applied: AI on the audit page (A5). UX, UI, SaaS, WCAG, W3C, ADA, HIG, HEART, RICE and MVP were already expanded |
| 15 | Readability of rendered pages in out/ | PASS after C1 (the types list read as 5 types under a "4 types" answer) |

## Fixes applied (old → new, both files)

**ux-consulting-services.json**
- C1 Types H2 bold answer: "…come in 4 types, from UX strategy for a live product to artificial intelligence (AI) feature advisory; accessibility…" → "…come in 4 types: strategy for a live product, pre-build UX strategy, artificial intelligence (AI) feature advisory and ongoing advisory; accessibility reviews run through our UX audit." The 5th card title changed from "Accessibility review." to "Accessibility review through our UX audit." Reason: the rendered page showed 5 H3 cards under "4 types", and the "from X to Y" range did not match the card order.
- C2 vs-audit table "Who is involved" row: "2 senior UX designers" → "1–2 senior UX designers" (home.ts L200: "2–3 weeks · 1–2 designers").
- C3 vs-design answer: "Requests for … often cover both the advice and the user interface (UI) screens" → "A request for UX design consulting services or UI UX consulting services can mean the advice, the user interface (UI) screens or both". Reason: "often" implied inquiry data we do not have (implied-client test). The GSC strings are kept.
- C4 vs-design "Main output" (UX design): "…interactive prototypes tested with real users and high-fidelity screens" → "…high-fidelity screens and interactive prototypes checked in usability testing with real users". Reason: AI Overview entity "usability testing" had 0 literal hits on the page.
- C5 Proof H2 bold: "shows UX consulting work inside a larger revamp" → "shows the strategy work UX consulting covers, done inside a larger revamp". Reason: mass-media-co.md `services:` does not list ux-consulting-services, so the page must not call it a consulting engagement.
- C6 FAQ "What does UX stand for?": rewritten so it no longer near-duplicates the audit page ("how a person finds, understands and uses a product…" vs "how easily a person finds, understands and completes tasks…"). New: "UX stands for user experience, meaning every interaction a person has with a product, from sign-up to getting support. User experience design consulting improves it by changing the priorities, metrics and team habits behind those interactions. Our product review also checks the user interface (UI), the screens and controls users touch, in each key flow, so UI consulting services start from the same review." The GSC strings "user experience design consulting" and "ui consulting services" are kept.
- C7 FAQ "Is UX consulting different from a UX audit?": "Teams that want UI UX consulting and audit work together can book both, …" → "Teams that need both can book them as one sequence, …". Reason: GSC (docs/data/gsc/latest.json queryPage) already ranks /services/ux-audit-services/ for "ui ux consulting and audit" (pos 19.1, 21 impr.) and "ui/ux consulting and audit" (pos 22.1, 26 impr.), and the audit page has the dedicated FAQ. One owner = the audit page.
- C8 FAQ "How much does it cost to hire a UX designer?": the old answer led with the audit price on the consulting page and gave consulting last. New: "Hiring UX designers through our agency costs $5,000–$180,000 per project, or $15,000–$40,000 per month for an embedded team of 2–5 designers. UX consulting with a senior UX consultant and a UX audit with 1–2 designers each cost $5,000–$15,000 over 2–3 weeks, a research and UX design sprint with 2–4 designers costs $25,000–$60,000 over 4–8 weeks, and full design with a design system runs $60,000–$180,000 over 8–16 weeks with 3–6 designers." Every figure matches home.ts L200–203.

**ux-audit-services.json**
- A1 Definition body: "…follow the same method; only the platform guidelines change." → "…follow the same method with different user flows and platform guidelines." Reason: it contradicted the types body ("What changes is the list of user flows, the platform guidelines and the data source").
- A2 Check body: "can they read the interface" → "can they understand and use the interface". The heuristics area covers more than reading.
- A3 Process step 2: "2 designers run … independently." → "1–2 designers run the heuristic evaluation, analytics review, session-recording review and accessibility check; on a two-designer audit, each reviewer works independently." (home.ts 1–2 designers)
- A4 vs-usability table "Who evaluates": "2 senior UX designers" → "1–2 senior UX designers".
- A5 Cost body: "Teams that need the fixes designed afterwards continue with UX consulting services or a design sprint." → "Fixes that need designing continue in a design sprint, and a UX strategy beyond the fixes comes from UX consulting services." Reason: the consulting page says UX consulting does not include design work (FAQ "Does UX consulting include design work? No."). "an AI tool's quote" → "an artificial intelligence (AI) tool's quote" (first visible use of AI on this page).
- A6 FAQ "What does UX stand for?": the second sentence (the UI definition) repeated the next FAQ ("UI audit vs UX audit"). It is now "A UX audit measures that ease: it finds where users of your website or app hesitate, make errors or give up, and explains why."
- A7 FAQ "How do you choose a UX audit company?": "A strong answer names…" → "A strong quote names…" (the antecedent was unclear).

## Not fixed here (outside the two files): orchestrator / owner
- O1 (orchestrator, briefs): content/briefs/ux-consulting-services.run2.json `gscQueries["ui ux consulting and audit"]` still names the consulting FAQ. After C7 it belongs to the audit page; update the brief so the next run does not add it back.
- O2 (owner decision, reviewer count): content/blog/ecommerce-ux-audit.md L191 ("On our audits, two senior UX designers review independently") and the framing of content/blog/ux-audit-agency-vs-freelancer.md ("Independent evaluators" row) still imply 2 reviewers on every audit. The service pages now follow home.ts (1–2). The owner should confirm whether every audit gets 2 reviewers; if so, home.ts L200 changes instead. Never publish a third version.
- O3 (fact-checker): docs/content-system/fact-checks/gsc-run-2.md landed after my first edits (VERDICT FAIL, F1–F9). It is merged below; no stale old → new pair remains for the orchestrator.

## Merge with the parallel fact-check (docs/content-system/fact-checks/gsc-run-2.md)
| FC fix | Status |
|---|---|
| F1 audit team size | **Resolved the other way, by orchestrator instruction**: both pages now say "1–2" (home.ts L200), not the FC's "2". Still open outside my scope: content/services/ecommerce-ux-design-services.json L140 "2 senior UX designers", blog/ecommerce-ux-audit.md L191, and the blog/ux-audit-agency-vs-freelancer framing (see O2). Owner decides; then align these copies. |
| F2 MMC bold answer | Applied in merged form (supersedes my C5): "<strong>Our Mass Media Co. project was a product revamp, not a UX consulting engagement, but it opened with consulting-style discovery: a workshop that aligned strategy with business goals.</strong>" (27 words; the FC wording was 34, which is over the ~30 cap) |
| F3 remote FAQ | Applied: "…and the roadmap workshop can run without an on-site visit." |
| F4 EN 301 549 | Applied (I verified it independently: NDA Ireland and Deque give V4.1.1, published 2 Sep 2026, WCAG 2.2 AA). The WCAG H3 is now 84 words (≤ 90). |
| F5 cost body | Already covered by my A5 (same meaning, shorter): "Fixes that need designing continue in a design sprint, and a UX strategy beyond the fixes comes from UX consulting services." |
| F6 definition body | Merged with my A1: "…follow the same method with different user flows, platform guidelines and data sources." |
| F7 merged findings logic | Applied: "so when a contrast failure explains a funnel drop-off on the same screen, the report gives one recommended fix instead of two separate tickets." |
| F8 types answer | Already covered by my C1 (31 words vs the FC's 33; same content). |
| F9 checklist item 6 | Applied: "Coaching that stays with your team, because a fixed-scope UX consulting engagement ends after a few weeks; …" |

Final gates after the merge: build exit 0; seo:check 0 errors (1 pre-existing home warning); onpage consulting 100, audit 100, site average 100; lint exit 0. FAQPage JSON-LD: 10 + 10 answers, all clean.

- Advisory: "human-centred" (ISO 9241-210 wording, pre-existing) is kept as the standard's own term.

## Guidance for the writer
No open gaps. Every PAA and AI Overview item now has an answering sentence. The repeated patterns are logged as writer lessons.

VERDICT: PASS
