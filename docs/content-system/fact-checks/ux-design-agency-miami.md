# Fact-check: ux-design-agency-miami (location page)

- File checked: `content/locations/ux-design-agency-miami.json` (`draft: true`, updated 2026-10-21)
- Checked against: `docs/content-system/RULES.md`; brief `content/briefs/ux-design-agency-miami.json` (siteFacts, factCheckList); `content/home.ts`; `content/pages/about.md`; `content/services/ux-audit-services.json`, `usability-testing-services.json`, `ux-research-services.json`; `content/industries/finance.json`, `gaming.json`; `content/case-studies/nitro.md`, `tradezella.md`, `anyday-app.md`; sibling location pages (Denver, Dallas, Atlanta, SF, Austin and others); my Dallas and Denver reports.
- Date: 2026-10-21. The location file was **not edited** (role rule). Every fix below is an exact replacement for the orchestrator to apply.

## 1. Honesty screen

| Check | Result |
|---|---|
| Miami/Florida office or local team | PASS. S1 body: "with no Miami or Florida office"; FAQ 1: "No. … no Miami or Florida office"; abstract: the same. No "Eastern-based team" or "Reston headquarters team" wording. Schedule only: "we work an Eastern Time schedule from Reston, Virginia". |
| Miami clients implied (present-tense verbs) | PASS. Every local-subject sentence uses "can": "A Miami team can hand off", "South Florida companies can bring in", "Miami teams can work with us", "The UI UX design Miami teams can buy from us", "Fintech and crypto founders can hire us", abstract "can hire our remote-first team". The hero sub is a noun phrase ("services … for fintech and crypto platforms …"), with no "runs … for" verb (Denver F3 is applied). |
| XTM / Anyday | PASS. Not mentioned anywhere on the page (grep). |
| Apex HCM, Fortna, ToolsGroup | PASS. Not mentioned. |
| How often Miami teams hire or ask us | PASS. No "usually", "most", "ask us most" or "typically". FAQ intro: "common questions … can put to". |
| Case study framed as a Miami sector example | **FAIL (F5).** The industries list puts Nitro (frontmatter `industries: [gaming]`) inside the fintech/crypto sector item under "Which Miami industries…", next to "well represented in Miami". That reads as a local sector example and presents play-to-earn games as a Miami strength, which no source shows. |
| Team designs, writes, moderates or tests in Spanish | **FAIL (F1–F4).** No sentence says "we speak/moderate in Spanish", but the claim is implied three ways: (a) S3 item 1 offers help before launching "a Spanish **or Portuguese** version", and nothing on the site or page supports Portuguese work; (b) the table's Research row contrasts "Participants screened for each user group, including Spanish-speaking users" with "English speakers only", so bilingual-ready research includes people who do not take part in English, which means Spanish-language sessions; (c) the pricing answer makes "English- and Spanish-speaking users" two user groups, and the hand-off item says our "moderated remote sessions" run "for each user group". siteFacts.language: no site page states Spanish capability. |
| H1 "Miami UI/UX design services for products used in English and Spanish" | PASS. The subject is the products, not the team. The page backs it only with product work (layouts, a language switch, per-country formats, strings supplied by the client's translators: FAQ 2, item 5, stage 4). It stays a PASS only if F2–F4 are applied, so no research or testing sentence implies Spanish-language sessions. |
| Invented stats, testimonials, awards, ratings, rankings | PASS. The page has no statistics or quotes. "Top Miami UX design companies" appears only as the buyer's phrase in FAQ 1. |
| Team roles | PASS. No "researchers" title. |

## 2. Site facts (one intent = one answer)

| # | Claim on page | Site source | Verdict |
|---|---|---|---|
| S1 | Remote-first, HQ Reston, Virginia | about.md "headquartered at … Reston, Virginia, and we work remote-first" | TRUE |
| S2 | Audit $5,000–$15,000, 2–3 weeks (pricing, abstract, meta and FAQ 1 "from $5,000") | home.ts Engagement 01; ux-audit hub; about.md "Engagements start at $5,000 for a UX audit". No audit headcount stated. | TRUE |
| S3 | Sprint $25,000–$60,000, 4–8 weeks, 2–4 designers (process answer, pricing) | home.ts Engagement 02 "4–8 weeks · 2–4 designers" | TRUE |
| S4 | Complete redesign with design system $60,000–$180,000, 8–16 weeks | home.ts Engagement 03 | TRUE |
| S5 | Embedded team $15,000–$40,000 per month | home.ts Engagement 04 | TRUE |
| S6 | Cost factors: flows in scope, platforms, depth of user research, number of user groups, design system; no count | home.ts cost FAQ; ux-research and ux-audit hubs ("the number of user groups") | TRUE as a list. The example in brackets fails, see F4. |
| S7 | "Every project begins with a free consultation and a fixed-scope proposal" | about.md, word for word | TRUE |
| S8 | Start "1–2 weeks after proposal approval", kick-off "on the users, flows, success metrics and languages in scope" | Published Dallas FAQ; home.ts "Time to first design 1–2 weeks"; Denver F6 wording plus "languages" | TRUE |
| S9 | Sprint ends with research findings, Figma files, an interactive prototype tested with real users, annotated specs and components; audit ends with a prioritized fix roadmap | home.ts Engagement 02; about.md; ux-audit hub. No tokens (Denver F5 applied). | TRUE |
| S10 | UX audit item: heuristic review, WCAG 2.2 level AA, "ranked by impact and effort", "prioritized fix roadmap" | ux-audit hub (Dallas F6) | TRUE |
| S11 | Usability testing: "Moderated remote sessions with 5–8 participants per round for each user group, with design fixes between rounds" | usability hub: "5–8 participants per round … match real user groups"; "2–3 test rounds with design fixes between rounds"; moderated sessions are a hub deliverable | TRUE as wording. In context it implies Spanish moderation through the user-group definition, see F4. |
| S12 | User research: no interview count; recruited "from your customer list or a recruitment panel"; remote over video | ux-research hub step 3 and remote FAQ | TRUE |
| S13 | KYC onboarding "designed to reduce abandonment without weakening compliance"; FAQ 3 trust signals, identity verification, error recovery, legal team owns disclosures | finance.json: "Simplify onboarding and KYC flows while preserving regulatory requirements"; KYC FAQ; legal reviewers mark up disclosure wording | TRUE |
| S14 | Design in Figma; mobile-first screens | about.md "We design in Figma"; platforms list | TRUE |
| S15 | Process: 5 stages, "progress is shared twice a week", reviews "inside Miami's Eastern Time working day" | Denver, Atlanta, SF ("twice a week"); Denver "reviews inside Mountain Time hours" | TRUE as wording. Stage sum, see N1. ET hours, see N2. |
| S16 | Stage 2 "expert review … short list of opportunities ranked by impact"; S2 answer "combined into one project or booked separately to support an in-house design team" | Denver stage 2 (same phrase); Denver S2 answer "as a full package or as individual pieces that fill a gap in an internal design team" | TRUE (no new scope) |
| S17 | On-site workshops in South Florida "for larger engagements" / "we travel to South Florida" | Same offer on every published location page; not on about.md or hubs | TRUE (consistent with the site). Owner note repeated: this offer exists only on location pages. |
| S18 | Booking and reservation UX (hotels, cruises, experiences); travel/hospitality item (booking engines, loyalty programs, guest apps); real estate (listings, pre-construction showcase) | No hub or industry page sells travel or hospitality work. Checkout and loyalty programs are on industries/ecommerce.json; real estate examples are on published Dallas and Austin pages. | TRUE as capability ("for example"), framed as offers. Note N4. |
| S19 | Counts: 6 hand-off items, 5 moments, 5 stages, "four sectors" (4 items), "five answers" (5 FAQs) | Counted in the file | TRUE |
| S20 | Internal links: /, ux-research-services, ui-ux-web-design, mobile-app-ui-ux-design-services, ux-audit-services, usability-testing-services, /industries/finance/, /industries/ecommerce/, /case-studies/tradezella/, /case-studies/nitro/ | All 9 content files exist; home = content/home.ts | TRUE |
| S21 | TradeZella "for a trading product" | tradezella.md: "a revamped trading journal", industries [finance, saas]; no result tied to Miami | TRUE |
| S22 | `priceRange` "$5,000–$60,000" | Same on all location pages | TRUE |

The page has no external links.

## 3. External facts

| # | Claim | Verdict | Source |
|---|---|---|---|
| E1 | Miami is on Eastern Time, the same zone as Reston, Virginia | TRUE. 49 CFR 71.5(f) runs the Eastern/Central line down the Apalachicola River and the west line of Gulf County, so only the western Panhandle is Central and Miami is Eastern. Virginia lies wholly in the Eastern zone. No hours figure is on the page. | https://www.law.cornell.edu/cfr/text/49/71.5 |
| E2 | Brickell is part of Miami (the City of Miami) | TRUE. The City of Miami runs Brickell business-area walking tours and lists the Brickell Homeowners Association and Downtown/Brickell HOAs in its city directory. Wikipedia: "a neighborhood in Miami … the financial district". | https://www.miami.gov/Notices/Events-Activities/Sunshine-Meeting-Brickell-Business-Area-Walking-Tour ; https://www.miami.gov/My-Home-Neighborhood/Homeowners-Associations-HOA/HOA-Association-Downtown-Brickell ; https://en.wikipedia.org/wiki/Brickell |
| E3 | Coral Gables is in Miami-Dade County, Florida (Doral is not used) | TRUE. The county lists 34 incorporated municipalities, including Miami, Coral Gables (incorporated 1925) and Doral. | https://miamidade.gov/global/management/municipalities.page |
| E4 | Fintech and finance are present in Miami and South Florida | TRUE. Beacon Council: "more than 500 fintech companies operating locally"; finance "employs over 150,000 people"; Miami is "a strategic gateway for investments in Latin America"; "more than 60 international banks operate" in Brickell. The page names no company and states no figure. | https://www.beaconcouncil.com/finance/ |
| E5 | Crypto is present in Miami (current source) | TRUE for presence, but not "well represented". Refresh Miami, 24 July 2025: Miami-based crypto startups raising rounds in 2025 (Rails, Crossmint, Raise, Superlogic, Castle, GoQuant, CAT Labs, Milo). It reports Metaplanet's planned US HQ only second-hand. The only HQ moves found (Blockchain.com, BlockTower) are from 2021–2022, and FTX is not cited. A local news source supports "found across", not a concentration claim, see F6. | https://refreshmiami.com/news/crypto-keeps-building-in-miami-and-investors-are-paying-attention/ |
| E6 | Travel, cruise and hospitality are well represented | TRUE. PortMiami FY2025: 8,564,225 cruise passengers, "the highest annual passenger count in the seaport's history" (up from 8,233,056). Norwegian Cruise Line Holdings' FY2025 10-K puts its principal executive offices in Miami. The page has no "cruise capital" or "busiest port" wording, which is correct: Port Canaveral's FY2025 count (8,602,047 per the brief) is higher. | https://www.cruiseindustrynews.com/cruise-news/2025/12/portmiami-8-56-million-cruise-passengers/ ; https://www.sec.gov/Archives/edgar/data/1513761/000110465926022067/nclh-20251231x10k.htm |
| E7 | Real estate: international buyers, pre-construction sales to international buyers, "local buyers and international investors" | TRUE. MIAMI REALTORS, Nov 2025: "Global buyers purchased 52% of new South Florida construction, pre-construction and condo conversion sales"; Latin Americans are about 86% of those global sales; top buyer countries are Colombia 23%, Mexico 20% and Argentina 11%. The page states no percentage. Brief record: the brief's "Colombia and Argentina lead, then Mexico" is the existing-home ranking. For new construction, Mexico is second. | https://www.miamirealtors.com/2025/11/11/new-international-report-global-buyer-share-increases-for-miami-new-construction-units-buyers-from-73-countries/ |
| E8 | Consumer and e-commerce brands "well represented", selling into US and Latin American markets | **UNVERIFIABLE as a concentration → F6.** The Beacon Council trade page supports the Latin American gateway ("number one trading partner with Latin America"; Miami Customs District about $137B total trade in 2023, "over two-thirds of Florida's two-way trade"), but it "does not mention e-commerce". No regional source shows e-commerce as a concentrated sector. The market wording ("US and Latin American markets") is TRUE as context. | https://www.beaconcouncil.com/trade/ |
| E9 | Products in Miami serve English- and Spanish-speaking users (product requirement, no figure printed) | TRUE. Census Reporter (ACS 2024 1-year), Miami-Dade County: 75.7% ±0.6% of persons 5+ speak a language other than English at home. Data USA PUMA profiles show Spanish as the main non-English home language across Miami-Dade PUMAs (for example 78% of households in South Miami/Westchester). | https://censusreporter.org/profiles/05000US12086-miami-dade-county-fl/ ; https://datausa.io/profile/geo/79500US1208617 |
| E10 | Spanish strings run longer, so buttons and labels need room | TRUE in the page's general wording (no percentage). W3C: text usually grows in translation from English, short strings grow most, and short labels "in a series of tabs or buttons" are the most likely to be squeezed. Avoid "small fixed-width containers". | https://www.w3.org/International/articles/article-text-size |
| E11 | WCAG 2.2 level AA | TRUE. W3C Recommendation, 12 December 2024; defines levels A, AA and AAA. | https://www.w3.org/TR/WCAG22/ |
| E12 | KYC is identity verification in fintech onboarding | TRUE (site fact and regulation: finance.json; 31 CFR 1020.220 Customer Identification Program). The page claims no regulatory work, and FAQ 3 leaves licensing and disclosures to the client's legal team. | content/industries/finance.json |
| E13 | Spanish-speaking share figure | Not used on the page. Nothing to check. | — |

## 4. Notes (not blocking)

- **N1, stage arithmetic, site-wide (repeat of Dallas and Denver N1).** The stages add up to 1–2 + 5–10 + 2–3 + 10–20 + 5–10 = 23–45 working days against 4–8 weeks (20–40). Do not change Miami alone. The owner decides site-wide (suggested: design stage "10–15 days").
- **N2, open owner item.** The owner has still not confirmed the Eastern Time working hours (Dallas F2). "Every review held inside Miami's Eastern Time working day" depends on them.
- **N3, OWNER-Q (Spanish capability).** If the owner confirms that the team can moderate sessions or write UX copy in Spanish and adds it to about.md, F2–F4 can be reversed. Until then they stand.
- **N4, owner note.** Travel/hospitality booking work (hotels, cruises) appears only on this page. It is framed as a capability with "for example", so it is acceptable, but no hub or industry page backs it.
- **N5, stale brief records.** (a) The brief's municipalities URL (`/global/government/municipalities.page`) returns 404. The current page is `/global/management/municipalities.page`. (b) The brief's S7 suggestion said "five sectors", but the draft correctly uses "four" after the crypto merge. (c) census.gov QuickFacts was blocked (Cloudflare) and the Census API needs a key, so E9 uses Census Reporter (ACS 2024 1-year).

## 5. Fixes required (exact replacements)

**F1, "When should a Miami company bring in a UX partner?" item 1 (Portuguese implies a capability the site does not state).**
Replace `Before launching a Spanish or Portuguese version of a product that was designed in English only.`
with: `Before launching a Spanish version of a product that was designed in English only.`

**F2, table row "Research" (implies Spanish-language sessions).**
Remove the whole row `["Research", "Participants screened for each user group, including Spanish-speaking users", "English speakers only"]`. The table keeps 4 rows (Copy, Layouts, Formats, Language switch). Restore it only after the owner answers N3.

**F3, table section `answer` (research claim tied to Spanish-speaking users).**
Replace `layouts, formats and research cover English- and Spanish-speaking users before build`
with: `layouts, formats and the content structure cover English- and Spanish-speaking users before build`
(The sentence keeps "remote-first UX design agency", "South Florida" and "bilingual-ready design".)

**F4, pricing `answer`, second sentence (makes a Spanish-speaking user group, which our "moderated remote sessions … for each user group" then cover).**
Replace `the number of user groups (for example English- and Spanish-speaking users)`
with: `the number of user groups (for example residents, visitors and overseas buyers)`
(The same groups as the user research item. "Number of user groups" is on the ux-research and ux-audit hubs.)

**F5, industries list item 1 (gaming case study framed as a Miami fintech sector example).**
Replace (including the leading comma) `, and play-to-earn products like the one in our <a href=\"/case-studies/nitro/\">Nitro case study</a>.`
with: `; our <a href=\"/case-studies/nitro/\">Nitro case study</a> shows the tokenomics and IDO launch screens we designed for a play-to-earn game.`
The full item then reads: `Fintech, payments, remittances and crypto, for example cross-border transfers, business banking, wallets and exchanges (<a href=\"/industries/finance/\">Finance UI UX design</a>); our <a href=\"/case-studies/nitro/\">Nitro case study</a> shows the tokenomics and IDO launch screens we designed for a play-to-earn game.`
(Source: the nitro.md design-work caption "Tokenomics and IDO launch design", and published gaming.json "tokenomics and IDO … launch screens". No $5M figure.)

**F6, industries section `answer` (e-commerce and crypto have no concentration source).**
Replace `<strong>Our remote-first UX design agency designs for four sectors well represented in Miami and South Florida:</strong>`
with: `<strong>Our remote-first UX design agency designs for four sectors found across Miami and South Florida:</strong>`

**F7, first section `answer`, bold sentence (overgeneralised: not every Miami product serves two languages and several countries).**
Replace `<strong>For Miami products, a remote-first UI/UX design company has to plan for two languages, several countries and a mix of residents, visitors and international buyers in one release.</strong>`
with: `<strong>For Miami products, a remote-first UI/UX design company plans for a release that can serve two languages, several countries and a mix of residents, visitors and international buyers.</strong>`
(The second sentence stays. The body already hedges with "Products that sell into Latin America can need…".)

Everything not listed above is TRUE. The fixes change no SVG text. The `visual.scenes` labels ("English and Spanish", "Local payment methods", "Residents and visitors") describe product requirements and stay. After F1–F7 the literal keyword count is unchanged, and "Spanish-speaking users" still appears in the summary, FAQ 2's question, the table answer and the abstract.

VERDICT: FAIL. Apply F1 to F7, then the page can publish. N1–N3 go to the owner and do not block this page.
