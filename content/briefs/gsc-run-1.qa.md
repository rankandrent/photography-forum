# QA: Search Console run 1 (2026-10-22)

Scope: d362ffc (template links, hub/industry H1s), 14331f3 (writer content edits), plus QA fixes in the working tree.
Parallel fact-check: docs/content-system/fact-checks/gsc-run-1.md (F1–F8) reconciled below.

## Verdict per change

| Change | Result | Notes / fix applied by QA |
|---|---|---|
| Blocks.tsx button "See the full service catalog", intro ReactNode | PASS | Removes the "UI UX design services" exact anchor to /services/ from every ServiceGrid. Lint clean. |
| Location ServiceGrid intro (16 pages) | FIX → PASS | Was "{city} teams get the same … run remotely by senior designers." Echoed the H2 ("… for {city} teams"), implied-client verb, and "run remotely" contradicts on-site workshops on 15 pages (fact-check F1). Now: "These are the same UI UX design services we deliver nationwide (user research, UX and UI design, design systems and usability testing), run remote-first by senior researchers and designers." True per content/home.ts meta + RULES (remote-first). |
| Industry ServiceGrid intro (9 pages) | FIX → PASS | `lower(i.title)` rendered "startups products" (and "finance products"). Now title-free: "Each option below draws on our core UI UX design services, from user research to usability testing, scoped to the users and workflows of your product." Checked rendered on all 9 pages incl. e-commerce, EdTech, media, supply chain, startups. |
| Anchor variety for Home | PASS (advisory) | 25 template links use the exact anchor "UI UX design services"; Home also gets logo/breadcrumb links. Location and industry sentences now differ in wording. Owner may later vary the anchor per page type. |
| /location/ H1 "UX design agency locations across the US" | PASS | Matches hub meta title keyword; no colon; score 100. |
| startups/ecommerce H1 | PASS | Match their locked meta titles; no service-page H1 duplication. QA tried "Startup …" (singular, GSC query "startup ui ux design agency") but onpage `h1-keyword` dropped the page to 89, so reverted to "Startups UI UX design agency for founders and early product teams". |
| ux-research-services consulting FAQ | FIX → PASS | Merged `<p></p><p>` into one paragraph (FAQPage schema read "roadmap.A full study"); "programme" → "program"; removed the 3rd link to /services/ux-consulting-services/ (already linked in cards + pricing body). Facts verified by fact-check #5–8. FAQ intro "six answers" = 6 FAQs. |
| ux-research-services St. Louis link | FIX → PASS | Implied-client/local wording replaced: "Remote sessions also suit bioscience and health users: our St. Louis UX design agency page explains how we schedule them around lab and clinic hours." (St. Louis page FAQ states it.) Fact-check F7 replacement ("As a … St. Louis UX design agency, we book…") not used: it reads as a local-presence claim. |
| supply-chain transportation FAQ | FIX → PASS | Fact-check F4 and F5 applied (FMCSA binds drivers, includes stops in traffic); F5 "may not" tripped seo:check hedge rule → "must not". FAQ intro "six answers" topics match the 6 questions in order. |
| SF H1 | FIX → PASS | F2 applied: "UX design agency San Francisco and Silicon Valley product teams can hire" (exact keyword kept; meta title untouched). |
| SF office FAQ LA link | FIX → PASS | Removed sentence: stacked keyword ("UX design agency Los Angeles studios and brands can hire"), off-topic in an office answer, and LA is already linked from the page's "We also work with teams in" chips (one link per target). |
| SF Silicon Valley FAQ | FIX → PASS | F3 applied (stage map from startups.json; price floor wording, not a required audit step). |
| Phoenix hero sub + deliverables answer | PASS | "remote-first … UX design services in Phoenix, Tempe, Chandler and Scottsdale" with no office claim; F6 meta description (implied client) applied, 156 chars, not a locked field. |
| choose-ux-research-agency "When to hire a UX research agency" | FIX → PASS | Bold answer 28 words; F8 applied ("which sessions with users can explain"). 5 moments mirror the hub's "When should a product team invest…" list in order (consistent facts, 5 shared 5-grams of 203, below threshold); advisory only. |

## Duplication
- Location JSON 5-gram max overlap: SF 5.3 → 5.2% (vs Phoenix), Phoenix 6.8 → 6.7% (vs Seattle).
- The template sentence adds ~1.2 pp to rendered-page overlap (Seattle↔New York 33.4 → 34.6%, rendered incl. template chrome); industry rendered max 24.3 → 25.5%. Short, single sentence; accepted.

## Checks (final run)
- `npm run build`: 0 errors. `npm run seo:check`: 0 errors, 1 warning (pre-existing: Home → /services/ui-ux-design-services-for-startups/ with 3 anchors; content/home.ts not touched in this run). `node scripts/onpage-audit.mjs`: no page below its previous score; edited pages 100 (choose-ux-research-agency 98, unchanged: `keyword-volume` brief null). `npm run lint`: 0 errors.
- Locked meta titles unchanged (seo:check locked-pages pass).

## Advisory (not changed, pre-existing)
- ux-research-services.json still uses "programme" in abstract/sourceContext/pricing body (UK spelling); semantic n-gram L240 depends on it, so change with the owner.
- supply-chain.json "colours" (UK spelling) in the yard-map card.
- Phoenix pricing body "A UX design agency Phoenix leaders can hold to a number" (keyword stacking pattern, QA lesson 2026-10-09).
- SF and Phoenix FAQ intros ("questions San Francisco teams ask most", "Phoenix teams usually ask us") imply inquiry data we do not have.

VERDICT: PASS
