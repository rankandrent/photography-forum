# QA report: /industries/edtech/ (content/industries/edtech.json)

Date: 2026-10-19 · Reviewer: content-qa (+ link checker) · Brief: content/briefs/edtech.json · Parallel fact-check: docs/content-system/fact-checks/edtech.md (VERDICT: FAIL, F1–F7) · Build: `SHOW_DRAFTS=1 npm run build` (page is `index, follow`)

## Gates (after the QA edits)

| Gate | Result |
|---|---|
| `SHOW_DRAFTS=1 npm run build` | PASS (exit 0), before and after the QA edits |
| `node scripts/onpage-audit.mjs /industries/edtech/` | **100**, failed [] (2,311 words) |
| `npm run seo:check` | 0 errors. `grep edtech` finds 0 warnings for this route. The 6 warnings are on draft blogs in the SHOW_DRAFTS build (the production build gave 0 warnings) |
| `npm run lint` | PASS (exit 0) |
| JSON | valid (`node -e JSON.parse`) after every edit |

## 1. Intent and cannibalisation: PASS
- "edtech ui/ux design services": Ahrefs US 40/mo, KD 2, pulled 2026-10-19. Page 1 is vendor service pages, so the intent is commercial and a service page matches it.
- No other page targets it. The Boston ("…Health & Edtech UX") and Philadelphia ("…Health, Pharma & EdTech UX") metaTitles are city-intent location pages that only name the vertical, so they do not conflict.

## Keyword, meta and entities: PASS
| Surface | Rendered | Result |
|---|---|---|
| title / og:title | "EdTech UI/UX Design Services \| LMS & E-Learning Platforms" (57) | keyword first, PASS |
| description / og:description | "EdTech UI/UX design services for LMS and e-learning platforms: learner dashboards, course players, badges and mobile apps. Book a free consultation." (148) | ends on "Book a free consultation.", PASS |
| meta keywords | first = "edtech UI/UX design services" | PASS |
| H1 | "EdTech UI/UX design services for learning platforms, course players and learner apps" | PASS, reads naturally |
| First 60 words | "Our edtech UI/UX design services plan and design the screens learners and course authors use: …" | PASS. The "this service" swap reads correctly, and the keyword is not stacked on a noun |
| H2 share | full keyword in 5 of 13 rendered H2s, and "edtech" in 6 more (template CTA H2s excluded) | PASS (≥ 40%) |
| Salience | keyword 11× vs the top rival "course authors" 10× and Elia Wellness 9× (all ≤ the brief's caps) | PASS |
| Entities | 23/23 in visible text, each with a fact (gamification is defined, Maze is tied to prototype rounds, and each standard has its effect on screens) | PASS |
| Attributes (by hand; the script skips industries) | 12/12: full edtech engagement, design sprint, audit of a live learning platform, target platforms, user groups, learner interviews, prototype rounds, developer handoff, accessibility level, touch targets, parental consent, learner motivation | PASS |
| OG image | out/og/industries/edtech.png generated | PASS |
| Abbreviations | UI/UX (abstract, same pattern as gaming), LMS (hero sub), SaaS, WCAG (card 4, before step 5), ADA Title II, COPPA, FERPA, SCORM are all expanded at first use. No SUS | PASS |
| Banned phrases and hedges | 0 hits | PASS |
| Keyword stacking | every "edtech UI/UX design services X" hit is followed by a verb or preposition. "edtech UX design partner" is grammatical | PASS |
| "vs" | H2 "Edtech UI/UX design vs instructional design": both halves are mass nouns, so it is grammatical without articles | PASS |

## Concept bindings (rule 7 suitability check): PASS after QA edits, except 2 hub contradictions open in the fact-check (F4, F6)
- Synonyms: edtech UX design (card H2, table, standards), edtech design services (Elia answer, cost body), e-learning platform UX design (FAQ 4) and learning platform design (screens answer) each print at least once. The variants edtech design agency, edtech UI UX design agency, edtech website design and edtech UX are all present.
- Parent: "digital product design services" is in the abstract and linked in the definition body. "UI UX design services" links to `/`.
- Children: each of the 6 has its own list item (title + body).
- Related: LMS, gamification, instructional design, course authors, WCAG 2.2 and Figma are all present.
- H2 first sentences: 9/9 name the entity or a synonym together with learners or a learning platform.
- Composite concepts are kept whole (learning management system, Web Content Accessibility Guidelines, developer handoff, design tokens).
- Ambiguous words: every "score" is a wellness score or a usability score. "Engagement" appears only as "full edtech engagement". "Course" is never "of course". "Dashboard" says whose. "Standard" is either an accessibility/privacy standard or an "e-learning content standard". "Module" is "course module". "Audit" is "UX audit".
- Query variants (one answer):
  - "edtech ui/ux design services" is answered by the definition bold.
  - "edtech design agency": "As an edtech design agency, we design the learner and author screens, and your engineers build them…"
  - "edtech ui ux design agency": "An edtech UI UX design agency tests prototypes with learners before engineering starts…"
  - "hire edtech design expert" is answered by the hero line "One senior team takes a learning platform … from idea to tested, developer-ready Figma designs" plus the cost bold.
  - "e-learning platform ux design" is answered by the definition bold, and its literal form is in FAQ 4.
- Hub consistency: prices, weeks, team sizes, the 5 step names, the day ranges, 40–80 days, touch targets and "designers do not write code" all match home.ts L200–202 and digital-product-design-services. **Found by QA and fixed in place:** step 5 said "the developer handoff is where our design work ends", but the hub says the designers "stay with the engineers through launch" (same as FC F5). **Still open (fact-check):** F4, step 2 "5–8 learners per user group" vs the hub's "5–8 users per user group", and F6, "website" as a price-factor platform vs the hub's 4 factors with web and mobile examples. Both are rule-7 contradictions, so the page fails until they are applied.

## Layout-aware page: PASS
- Section bodies: definition 61 words, Elia 70, cost 69 (all within 50–70). The list, card, step and standards items run 23–45 words each, and their sections are 145–191 words, the same block pattern accepted on gaming. The script found 0 bodies over 90 words.
- Every page H2 is followed by its bold answer. No H2 is followed by an image.
- 1 figure, cover.webp, inside `figure.semv__figure` with a figcaption. The alt and the caption "The Elia Wellness dashboard" match the case study word for word, and the figure sits after the sentence that names it. Note that the on-page `figure-caption` regex skips `cover` files, so I checked this one by hand.
- The table intro ends "The table compares both disciplines." Only the FAQ collapses. Bold is used only on answers.
- FAQ: 5 answers, each 3 sentences, Yes/No first. Each FAQPage `acceptedAnswer` holds only its own answer.

## Honesty and client signals: PASS (page). One sitewide advisory remains
I traced every client signal to its component:
- Case-study rail (`caseStudiesForIndustry('edtech')`): shows **Elia Wellness only**, because elia-wellness.md L9 has `industries: [edtech]`.
- StatsRow: "40% growth in user registrations for Elia Wellness" and "200+ products designed since 2017". Both are confirmed.
- FinalCta testimonial: none (`home.testimonial` is undefined). There is no blockquote and no Przybylko quote.
- Benefits "Why edtech teams work with us": not rendered (no `benefits` and no `useDefaults`).
- ServiceGrid: the 6 relatedServices.
- **HeroTrust (advisory, owner question carried from gaming):** `TRUST_LOGOS` renders NBCUniversal, 7-Eleven, Groupon, Sterne Kessler and Nitro League under "Trusted by teams at". home.ts L7–8 calls these names draft placeholders. The row is sitewide and has no edtech label, so it does not block this page.
- Elia is the only learning-platform proof ("our one published edtech project"). No school, university or K-12 client is implied: schools and universities appear only as buyers under ADA Title II and FERPA, and parents and teachers only as possible user groups. COPPA and FERPA appear only as standards that apply ("legal compliance and certification stay with the product owner"; FAQ 4 "we do not claim children's products as past work").
- **Fixed by QA:** `intro` "Edtech teams bring us…" was a present-tense client habit. It renders on /industries/ (out/industries/index.html), not on this page, but it is still live. FC F1 found the same problem, and the merged text is applied.

## 5. Internal links (link checker): PASS
All targets exist in `out/`: digital-product-design-services, `/`, web-app-design-services, mobile-app-ui-ux-design-services, ui-ux-web-design, ux-audit-services, usability-testing-services, /industries/saas/, /case-studies/elia-wellness/, /blog/is-discovery-phase-worth-it/. The page has 10 unique contextual internal targets and 5 primary external sources (W3C, ada.gov, access-board.gov, ftc.gov, studentprivacy.ed.gov).

| linkPlan | Page | Status |
|---|---|---|
| up digital-product-design-services "digital product design services" | definition body | applied |
| up `/` "UI UX design services" | definition body | applied |
| across web app / mobile / UI UX web design / UX audit / usability testing | course builder item, mobile item, website FAQ, cost body, mixed-ages card (no participant count) | all applied, and each anchor names the target's concept |
| sibling /industries/saas/ "SaaS UI UX design" | "Several user groups" card | applied |
| sibling /industries/startups/ (optional) | n/a | skipped, as the brief allows once the SaaS link is used (FAQ 4 is already 52 words) |
| down /case-studies/elia-wellness/ "Elia Wellness case study" | Elia section | applied |
| down … "and the LMS FAQ" | FAQ 1 | **missing, added by QA**: anchor "Elia Wellness" (varied) |
| down /blog/is-discovery-phase-worth-it/ | step 1 | applied |
| deepLinkOption hub cost section (optional) | n/a | skipped: the cost body is already 69/70 words |

**Inbound links (skill §3.1, no orphan page). `grep -rn industries/edtech content/` finds 0 contextual links today.** `internal-in` passes only through the nav and listings. Status of each brief inbound entry:
1. content/case-studies/elia-wellness.md: `industries: [edtech]` is **applied**. The Overview link is **not applied**: link "learning management system (LMS)" (L25) → `/industries/edtech/` with the anchor "edtech UI/UX design services" (REQUIRED).
2. content/locations/ux-design-agency-boston.json L156: **not applied**. Link "Edtech" → `/industries/edtech/` with "edtech UI/UX design" (REQUIRED).
3. content/locations/ux-design-agency-philadelphia.json L33: **not applied**. Link "learning platforms" → `/industries/edtech/` (REQUIRED).
4. content/pages/about.md: skipped, with the brief's reason (the row already links the case study).

## Overlap: PASS
5-gram overlap vs gaming.json is **9.61%** (< 12%). The others are all under 1% (saas 0.74%, ecommerce 0.48%, startups 0.37%, the rest ≤ 0.11%). The shared grams are almost all required fact strings: prices and weeks, the hub's step names and days, the handoff package, touch targets, WCAG wording and "The table compares both disciplines.". Copied phrasing: the FAQ intro shape ("These answers cover the 5 questions … ask most before …") was rewritten by QA. "draws on the senior team behind our UI UX design services" and "is already live? Yes. Start with" are kept, because the score is well under the limit.

## QA edits applied to edtech.json (rebuilt, re-audited: 100)
1. `intro`: "Edtech teams bring us the screens … the dashboard, …, tested before engineering starts." → "We design the screens learners and course authors use every week: the learner dashboard, course player, course builder and mobile app, tested with learners before engineering starts." (merged with FC F1, so **F1 is applied, skip it**)
2. sections[1].items[1].body: "so learners never lose their place." → "so learners keep their place in the lesson." (an absolute outcome claim)
3. sections[4].items[4].body: "The developer handoff is where our design work ends and your build begins." → "After the developer handoff, the designers stay with your engineers through launch." (hub contradiction, FC F5 text, so **F5 is applied, skip it**)
4. sections[8].answer (FAQ intro): "These answers cover the 5 questions learning platform teams ask most before hiring an edtech UX design partner." → "Before a learning platform team hires an edtech UX design partner, five questions settle the fit: past LMS work, who writes the code, live redesigns, children's products and the website." (implied inquiry data, and a copied gaming shape)
5. sections[8].faqs[0].a: "For Elia Wellness," → "For <a href=\"/case-studies/elia-wellness/\">Elia Wellness</a>," (linkPlan placement)

## For the orchestrator: fact-check fixes still to apply
Apply **F2, F3, F4, F6 and F7** from docs/content-system/fact-checks/edtech.md as written. None of their old strings was touched by QA. F1 and F5 are already in (see above). After F4 and F6, the attributes "learner interviews" and "target platforms" still print. F7 lengthens a card, not a scored section body. Then rebuild and re-run `node scripts/onpage-audit.mjs /industries/edtech/` (expect 100) and `npm run seo:check 2>&1 | grep edtech` (expect nothing).

## Guidance for the writer
None open in the copy beyond the FC fixes. Lessons were written to semantic-content-writer.md (implied-client test on every field, the hub step body after handoff, FAQ intro shape), content-link-builder.md (two-placement linkPlan entries) and seo-keyword-researcher.md (prescribed brief text caused the intro, step-2 and website-factor defects).

## Blockers
1. FC F4 and F6 are open hub contradictions (rule 7). F2, F3 and F7 are open factual wording fixes. All 5 have exact replacements in the fact-check report.
2. The 3 required inbound contextual links (elia-wellness.md, Boston, Philadelphia) must land in the same publish.
3. Owner advisory, not a blocker: the HeroTrust draft logos.

VERDICT: FAIL
