# QA report: ux-design-agency-dallas (location page)

- Date: 2026-10-15 (LOCATION day). File: `content/locations/ux-design-agency-dallas.json` (still `draft: true`, not changed by QA).
- Judged with the location-page rules: RULES.md "Keywords, meta and entities", "Concept bindings" (rule 7), "Layout-aware pages", Honesty, and the content-qa owner rules. Blog-only checks (inline visuals, astext, `beats`, funnel frontmatter, fingerprints) do not apply. The existing `visual` block was checked.
- Primary keyword: "dallas ux/ui design services" (Ahrefs, 40/mo US, 2026-10-15, per the brief).

## How on-page was scored (draft is noindex)
`npm run onpage` skips noindex pages, so I built with `SHOW_DRAFTS=1 npm run build`, copied `out/` to the scratchpad and removed the robots noindex meta from the Dallas HTML there. I then ran a temporary copy of `scripts/onpage-audit.mjs` with OUT pointed at that copy, and deleted the copy afterwards. The real `out/` and the page's `draft` value were not touched.

**Result after QA fixes: score 100, failed: []** (title-keyword, title-keyword-early, h1-keyword, desc-keyword, first-100-words, meta-keywords-keyword, og-keyword, entity-coverage, entity-salience, slug-keyword, lengths, internal-in/out, figure-caption, table-intro, h2-then-text, section-body-short, no-hidden-content and faq all pass). Built words: 2,071 (whole `<main>`).

The script does not score `attribute-coverage` on location routes, so I checked attributes by hand (below).

## Checklist

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Intent and cannibalisation | PASS | Service-buyer intent: remote agency, scope, price, how to compare. `grep -rli dallas content/` shows only this file outside briefs. No other page uses "ux/ui design services" as keyword, anchor or metaTitle. |
| K1 | Keyword in metaTitle | PASS | "Dallas UX/UI Design Services \| Banking, Telecom & Retail" (56 chars). The keyword starts at char 0. |
| K2 | Keyword in metaDescription, ends "Book a free consultation." | PASS | "Dallas UX/UI design services for banking, telecom, retail and real estate teams: research, UI design and testing from $5,000. Book a free consultation." (151 chars). The next-step clause is "Book a free consultation." and matches the BOFU CTA. |
| K3 | keywords[0] | PASS | `"dallas ux/ui design services"`. Built meta keywords start with it, and og:title/og:description carry it. |
| K4 | H1 | PASS | "Dallas UX/UI design services for banking, telecom and retail product teams". "This service" swap: "This service for banking, telecom and retail product teams" reads naturally. |
| K5 | First 60 words | PASS | Hero sub, sentence 1: "Dallas UX/UI design services from a remote-first team in Reston, Virginia: user research, interface design and usability testing for Dallas–Fort Worth (DFW) banks, carriers, retailers and real estate firms." Grammatical, and the swap test passes. |
| K6 | Keyword stacking / `vs` | PASS | `grep -niE 'ux/ui (design )?(services )?(project\|engagement\|team\|cost\|pricing\|work\|practice)'` hits only "A Dallas UX/UI project" (×2, FAQ 6), the brief's sanctioned carrier (same shape as "a Philadelphia UX design project"). No `vs` hits. |
| K7 | Density / stuffing | PASS | Exact keyword appears 9× on the built page: breadcrumb, eyebrow, H1, hero sub, section 1 body, 2 H2s, pricing answer, FAQ H2. That is 7 authored uses, about 1.7% of 2,071 words. The prose reads naturally, and the other uses are synonyms (UX design agency, UX/UI design company, product design services). |
| E1 | Entity coverage ≥ 80% | PASS | 24/24 (100%). Each entity carries a fact or role, e.g. WCAG 2.2 → the experience audit check; contact center → the agents interviewed and the calls deflected; Figma → the screens and files delivered; compliance review → built into the schedule (finance item, FAQ 4). Uptown/Plano/Irving/Frisco appear once, in the sentence on how DFW teams work with us. That is acceptable for place names. |
| E2 | Attribute coverage ≥ 70% (by hand) | PASS | 10/10: audit $5k–15k/2–3 wk (pricing, table); sprint $25k–60k/4–8 wk (pricing, process); full design $60k–180k/8–16 wk (pricing body); UX squad $15k–40k/mo (pricing body); 2–4 designers (process, table, FAQ 3); start 1–2 weeks after proposal approval (FAQ 6); 7–8 h overlap with Central Time (table, abstract); 5–8 participants (list, FAQ 5); fixed-scope proposal after a free consultation (pricing body); on-site workshops in DFW (process, table, FAQ 1). |
| E3 | Salience | PASS | Script: H1 1, lead 1, H2 share ≥ 40% (Dallas/design/services in 7 of the 8 authored H2s), keyword count ≥ half of the top rival. |
| B1 | Synonyms (all 4) | PASS | "UI UX design services" 4×, "UX design agency" 21× (including the template), "UX/UI design company" 2× (table answer, FAQ intro), "product design services" 2× (industries answer). |
| B2 | Parent in intro/definition | PASS | Section 1 body: "We are a UX design agency within the wider field of [UI UX design services](/)". It links up to `/`. |
| B3 | Children each with own item | PASS | User research, experience audit, interface design, component library, prototype validation and usability testing each have their own list item in "What do our Dallas UX/UI design services cover?". |
| B4 | Plurals / related | PASS | "Dallas UX design companies" 2×, "UX/UI design services" 13×. Related: Dallas–Fort Worth 7×, Central Time 9×, fixed-scope proposal 1×, Figma 3×, WCAG 2.2 1×, contact center 4×. |
| B5 | Essential concepts | PASS | "Dallas UX/UI design services" 9×, "remote-first" 14×, "Dallas–Fort Worth" 7×. |
| B6 | H2 first sentence = entity/synonym + essential | PASS | 1 "Dallas–Fort Worth teams hire outside UX/UI design services…" · 2 "Our remote-first UX/UI design services combine…" · 3 "Our remote-first UX design agency runs…" · 4 "Remote-first UX/UI design services give Dallas–Fort Worth…" · 5 "A remote-first UX/UI design company suits Dallas teams…" · 6 "Dallas UX/UI design services from our remote-first team start at…" · 7 "Our remote-first product design services fit five sectors … Dallas–Fort Worth" · FAQ "…Dallas–Fort Worth product leaders … remote-first UX/UI design company." No "Why" answer opens with "Because". |
| B7 | Composite concepts whole and defined | PASS | "Dallas–Fort Worth", "WCAG 2.2", "design system", "component library" (defined in one sentence), "experience audit" (defined as a heuristic usability review + WCAG check), "interactive prototype", "fixed-scope proposal" all appear whole. None is split or reordered. |
| B8 | Ambiguous words with context | FIX (applied) | Plano/Irving/Frisco have ", Texas" and Uptown reads "Uptown Dallas". Dallas is fixed by "Dallas–Fort Worth (DFW)" in the first body sentence and by Texas in section 1. Schema areaServed is City Dallas in State TX. Real estate: "we design the digital interface, not the buildings". Testing always reads "usability testing". **Fixed:** table cell "$5,000–$15,000 audit, $25,000–$60,000 sprint" → "$5,000–$15,000 UX audit, $25,000–$60,000 design sprint"; pricing "the research depth" → "the depth of user research". |
| B9 | queryVariants, one answer | PASS | dallas ux/ui design services → whole page/pricing; "ux design services in dallas" + "ui ux design services company in dallas" + "ux/ui design dallas" → FAQ 2 (verbatim carriers, and it states the brief's single answer: remote-first, Reston HQ, CT hours, research/interface/testing, fixed scope from $5,000); "top dallas ux design companies" → table answer + FAQ 3 ("We publish no rankings"). Secondary "UI UX design services in Dallas" appears 0× verbatim. It is not a queryVariant, so this does not block. |
| F | Facts vs home.ts and hubs | PASS (QA scope) | Prices and durations match home.ts Engagements 01–04. "2–4 designers" is used for the sprint only, and no audit headcount is given. In-house "6–10 weeks (hiring + ramp)" matches the home.ts compare table. "5–8 participants per round … per user group" matches usability-testing-services.json. Start 1–2 weeks matches Atlanta. The fact-checker's F1–F6 are separate (see below). |
| H | Honesty | PASS (QA scope) | "no Dallas office or local team" (section 1), "no Dallas office" (FAQ 1, abstract). There are no Dallas clients and no local statistics. The "well represented" sectors line was verified by the fact-checker (E5–E8) except HR tech (their F3). The template's "Products we designed" shows only real case studies (Anyday, Digno, Elia Wellness, Mass Media Co.). |
| L1 | Section bodies 50–70 (90 max) | FIX (applied) | Section 1 body was 73 words; it is now 69. Pricing body is 64. |
| L2 | Layout-aware | PASS | Each H2 is followed by text. The table has an intro sentence and a caption. Only FAQ `<details>` collapse. The visual sits in a `figure` with a figcaption, and its alt matches the caption topic. |
| S1 | Bold answers ≤ 30 words, full sentences | FIX (applied) | The FAQ bold answer was a fragment and implied a survey ("Short answers to the six questions … leaders ask"). It now reads "These six answers cover what Dallas–Fort Worth product leaders often ask before hiring a remote-first UX/UI design company." The others run 19–29 words. |
| S2 | Abbreviations expanded | FIX (applied) | UX, UI, DFW and WCAG were already expanded. "B2B software and HR technology" → "Business-to-business (B2B) software and human resources (HR) technology" (superseded by the merged F3 below). |
| S3 | Banned phrases / hedges | PASS | 0 hits for the banned list or might/may/could/perhaps. |
| S4 | every/always/all/never | PASS | "Every project begins with a free consultation and a fixed-scope proposal" is orchestrator-sanctioned (lesson 2026-10-10), and "free consultation" appears once in the body. "every interactive prototype" (FAQ 4) is a process promise and does not conflict with anything. |
| S5 | Boolean FAQs / FAQ length | PASS | Is… → "No." Do… → "No." Can… → "Yes." All 6 answers have at least 2 sentences. FAQPage JSON-LD holds only the answer text. |
| 5 | Internal links | PASS | Every linkPlan target is linked with its planned anchor: `/` (UI UX design services), ux-consulting, usability-testing, dashboard-design, ux-audit, design-system, saas-ux-design, /industries/finance/, /industries/ecommerce/. That makes 9 authored links, all of which exist (seo:check 0 errors). The page has inbound links from the industry and service templates. The brief has no `backlinkSuggestions`. |
| 7 | Repetition vs other location pages | PASS | 5-gram overlap of the authored text is 0.9–2.3% against all 17 location pages (highest: New York and Philadelphia, 2.3%). Shared grams are price strings and service names only. |
| 6 | Visual block | PASS | `/locations/ux-design-agency-dallas.svg` exists and renders. Alt: "UX design for Dallas product teams: banking portals, carrier self-service, retail checkout, tested with real users". The labels are generic and use no third-party brands. |
| 8 | Build / seo:check / lint | PASS | `SHOW_DRAFTS=1 npm run build` exit 0; `npm run seo:check` 89 pages, 0 errors (6 warnings, all on draft blog stubs, none on Dallas); `npm run lint` exit 0. JSON validated with `node -e` after the edits (`draft` is still true). |

## QA edits applied to the Dallas JSON (wording only, no facts)
1. Section 1 body: "with no Dallas office and no local team" → "with no Dallas office or local team"; "Teams in Uptown Dallas and in Plano, Irving and Frisco, Texas, can work with us" → "Teams in Uptown Dallas, Plano, Irving and Frisco, Texas, work with us" (73 → 69 words).
2. Table "Cost model" cell: "Fixed scope: $5,000–$15,000 audit, $25,000–$60,000 sprint" → "Fixed scope: $5,000–$15,000 UX audit, $25,000–$60,000 design sprint".
3. Pricing answer: "the research depth" → "the depth of user research".
4. FAQ bold answer: replaced the fragment (text above).
5. Industry item 5: B2B/HR expanded (superseded by merged F3).

## Merged replacement strings for the orchestrator (fact-checker F3 and F4 collide with QA edits)
The fact-checker's report (`docs/content-system/fact-checks/ux-design-agency-dallas.md`) was written against the pre-QA text, so the old strings in F3 and F4 no longer match. Apply these instead:
- **F3 (merged):** replace `Business-to-business (B2B) software and human resources (HR) technology, for example payroll and workforce dashboards.` with `Business-to-business (B2B) software and IT services, for example workforce and reporting dashboards.`
- **F4 (merged):** replace `Four variables set the final number: the flows in scope, the platforms, the depth of user research and whether a component library is included.` with `The final number depends on the flows in scope, the platforms, the depth of user research and whether a component library is included.`
- F1, F2, F5 and F6 old strings are untouched by QA and apply as written. QA check of their new text: F1 keeps "2–4 designers"; F6 keeps "WCAG 2.2" whole ("WCAG 2.2 level AA"), so entity matching still holds. None of them changes a keyword surface. After applying them, re-run the build and on-page check.

## Notes (non-blocking)
- N1 (from the fact-checker, confirmed by QA): the five stage durations add up to 23–45 working days against "4–8 weeks". The same pattern appears on 17 published location pages. Under the one-answer rule, fix it site-wide (owner), not on Dallas alone.
- Secondary "UI UX design services in Dallas" is not printed verbatim. Optional; the template H2 "UI UX design services for Dallas teams" sits close to it.

## Guidance for the writer
No completeness gaps. Every H2 has an answer, detail and a concrete number, step or example. Every brief entity, attribute, binding and queryVariant is covered with substance. Lessons for the 4 wording defects QA fixed were added to `docs/content-system/learnings/semantic-content-writer.md`.

VERDICT: PASS
Remaining blockers (QA): none. Publishing still requires the fact-checker's F1–F6 (its verdict is FAIL), applied with the merged F3/F4 strings above, followed by a rebuild and on-page re-run.
