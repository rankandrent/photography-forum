# Fact-check: web-app-design-rfp (2026-10-09, review loop 1)

Checked: `content/blog/web-app-design-rfp.md` and all 7 SVGs in `public/blog/web-app-design-rfp/`.
Site sources: `content/services/web-app-design-services.json` (hub), `content/case-studies/tradezella.md`,
`content/pages/about.md`, `app/contact/page.tsx`.

Method note: WebFetch failed with `ENOTFOUND` for every external host (w3.org, section508.gov, aiga.org,
guides.18f.gov, acquisition.gov). Each URL was verified instead with a WebSearch limited to the source's domain.
That search returned the post's exact URL (same host, including `www.`, and same path) plus supporting text
(learnings 2026-10-05, method).

## Claims

| # | Claim (post location) | Verdict | Source / evidence |
|---|---|---|---|
| 1 | WCAG 2.2 level AA is "the current World Wide Web Consortium (W3C) Recommendation" (acceptance section) | TRUE | https://www.w3.org/TR/WCAG22/ : W3C Recommendation 5 Oct 2023, republished 12 Dec 2024 with errata only. W3C advises using 2.2. WCAG 3 is not a Recommendation. |
| 2 | The Revised 508 Standards "incorporate WCAG 2.0 Level A and AA by reference" (link to section508.gov/develop/applicability-conformance/) | TRUE | https://www.section508.gov/develop/applicability-conformance/ : the standards incorporate WCAG 2.0 Level AA success criteria by reference (Level AA conformance includes Level A). E205.4, E207.2 and 702.10.1 name "Level A and Level AA". |
| 3 | Federal buyers can start from "the contract language on section508.gov", which ties deliverables to the Revised 508 Standards | TRUE | section508.gov Accessibility Requirements Tool (ART) requirement statements for solicitations (https://www.section508.gov/tools/list-of-art-requirements/). This is advice and is phrased loosely enough. |
| 4 | AIGA is "the professional association for design" | TRUE | https://www.aiga.org/ tagline: "AIGA, the professional association for design". |
| 5 | AIGA quote: "precludes the most important element of most design projects—the research, thoughtful consideration of alternatives, and development and testing of prototype designs." | TRUE (wording) | https://www.aiga.org/resources/aiga-position-on-spec-work : an exact-phrase search for the head ("precludes the most important element of most design projects") and for the tail ("thoughtful consideration of alternatives, and development and testing of prototype designs") both return this page first. The em dash between the two parts could not be checked character for character because the page would not load. The AIGA Portland and AIGA Minnesota reposts of the same text use a dash there. No change needed. |
| 6 | "GSA's former 18F team" | TRUE | GSA eliminated 18F on 1 March 2025 (https://www.nextgov.com/people/2025/03/gsa-eliminates-18f/403400/). Past tense is correct. |
| 7 | 18F "recommended a statement of objectives for performance-based services when buying custom software", in place of long requirement lists | TRUE | https://guides.18f.gov/derisking-government-tech/buying-development-services/ : the Agile Contract Format = "a statement of objectives for performance-based services", a time-and-materials contract and a QASP. The QASP centres on "a few objective quality criteria rather than an exhaustive requirements list". The Federal Field Guide prefers a SOO to a SOW because agile work can't be defined up front. |
| 8 | FAR defines performance-based acquisition "as one structured around the results to be achieved rather than the manner in which the work is performed" (link to acquisition.gov/far/2.101) | TRUE | https://www.acquisition.gov/far/2.101 : "Performance-based acquisition (PBA) means an acquisition structured around the results to be achieved as opposed to the manner by which the work is to be performed." The post paraphrases it outside quotation marks, and the meaning is kept. Caveat: under the Revolutionary FAR Overhaul (RFO), agencies now apply the Part 2 model deviation text. I could not confirm the RFO wording of this term. The codified 48 CFR 2.101 text is unchanged, so "Federal rules define" stands. |
| 9 | 18F "advised reviewing each proposal's strengths, weaknesses and risks, then inviting the highest-rated firms to a verbal interview" (budget/weights section) | TRUE alone, MISLEADING in context | 18F Federal Field Guide (https://guides.18f.gov/derisking/federal-field-guide/): "Review the strengths, weaknesses, and risks of contractors' proposals and then invite the most highly rated for a verbal interview." **The same guide says: "Don't use a point system to score proposals."** https://guides.18f.gov/derisking-government-tech/buying-development-services/ says proposals "will not be evaluated by a numeric point or color scoring scheme". In the post, this sentence sits right before a 100-point scorecard with a 70-point gate, so readers will think 18F supports point scoring. See F8. |
| 10 | Hub: "our typical 6-step web app design process" | TRUE | Hub: "runs in 6 steps". |
| 11 | Hub: "interviews 5–8 users per role" | TRUE | Hub deliverable: "Interviews and task analysis with 5–8 users per role". |
| 12 | Hub: "tests the prototype with 5 users per round, scored with the System Usability Scale (SUS)" plus "That is our practice, not a universal rule." | TRUE | Hub: "Each round tests 5 users on the core tasks and scores the prototype with the System Usability Scale (SUS)". The figure is correctly labelled as our practice. |
| 13 | Hub: "$60,000–$180,000 over 8–16 weeks" | TRUE | Hub cost answer: "costs $60,000–$180,000 and takes 8–16 weeks". |
| 14 | Hub: "driven by the same counts your inventory holds" | WRONG (imprecise) | The hub names 4 price factors: workflows, user roles, test rounds **and component library size**. The post's inventory holds no component-library count. See F7. |
| 15 | Hub: "teams that build a new product from zero compare scope with digital product design" (new vs existing app) | TRUE | Hub cost body, word for word: "Teams that build a new product from zero compare scope with digital product design services." It does not repeat the digital-product page's "existing web application" framing (brief conflict 2). |
| 16 | Hub: "the same workflows, roles and test rounds that help set the fee for our web app design services" (intro) | TRUE | Hub: the price depends on 4 factors, 3 of them these. "help set" is accurate. |
| 17 | "Bulk actions, saved filters and keyboard use, because these are among the components a web app UI kit covers" | WRONG | Hub UI kit: "data tables, filters, bulk actions, empty states and permission states". Saved filters and keyboard shortcuts appear only under benefits (task efficiency), and keyboard use is not a component. See F6. |
| 18 | Breakpoints 1280/1440/1920 px, phone layouts for mobile tasks, Storybook mapping, developer review of first builds (acceptance lines + SVG) | TRUE | These are the buyer's acceptance lines, and they match the hub handoff package, the FAQ on responsive layouts and process step 6. |
| 19 | TradeZella: "covered discovery, stakeholder interviews and web and mobile app design for a trading journal, with "40% more user interaction after a dashboard revamp"" | TRUE | `tradezella.md`: result line matches word for word. Scope = "product revamp, discovery, stakeholder interviews, UI/UX design, and web and mobile app design" (the post gives a subset). "trading journal and analytics platform". The lead-in "For a sense of the design work behind a scope like this" does not suggest the work came from an RFP. |
| 20 | "every project begins with a free consultation and a fixed-scope proposal" (closing) | TRUE | `about.md`, word for word, and it appears once. |
| 21 | "adding us to the bidder list takes one email" | TRUE | `/contact/` shows a mailto address and a lead form. |
| 22 | "bring the half-filled grid to a first call with us and we will finish the count together" | WRONG | No site page promises that we will complete a client's workflow inventory. `about.md` offers only "a free consultation and a fixed-scope proposal" (learnings 2026-10-05, 2026-10-06). See F4. |
| 23 | "workflow and role counts are what design agencies price first" (takeaway 1) | UNVERIFIABLE | This is a claim about every agency's pricing order, with no source. The hub supports only "two of the four factors". See F1. |
| 24 | "The order mirrors how an agency builds a quote" | UNVERIFIABLE | Same generalisation, no source. See F2. |
| 25 | "Agencies count both totals first" | UNVERIFIABLE | Same generalisation, no source. See F3. |
| 26 | "Listing states per component makes every agency price the same design" | UNVERIFIABLE (overclaim) | This states a guaranteed outcome for every bidder. See F5. |
| 27 | Production code / development | TRUE (nothing claimed) | The design-and-build FAQ and the "Code and hosting belong to a development RFP" line speak only from the buyer's side. Nothing says whether we write code (brief conflict 1 avoided). |
| 28 | Team size | TRUE (none stated) | "team seniority and continuity" is a criterion, not a headcount (brief conflict 3 avoided). Rubric self-check: we pass it on about.md "The designers who run your research stay through design, testing and handoff." |
| 29 | Suggested weights 30/25/25/20, gate 70, final 70/30 (text + SVG) | TRUE (labelled) | Labelled "Suggested example weights, not a standard" in the text, the SVG banner, the caption and the alt text. The weights sum to 100. The gate tick sits at x = 176 + 0.70 × 560 = 568, which is correct. The final bars are 388 : 164 ≈ 70 : 30. |
| 30 | Timeline durations (Q&A about 1 week, proposals 2–3 weeks, etc.) | TRUE (labelled) | "set the placeholder durations below yourself". |
| 31 | "roughly 6–10 pages" and "Three to five" agencies | TRUE (labelled) | Labelled "We recommend" and "our recommendation". |
| 32 | Example figures ($90,000–$130,000 band, 40/5,000 rows, six users per role, twelve pages, Jan 15) | TRUE (labelled) | Labelled as a made-up B2B portal in the text, the SVG banners ("Illustrative example") and the captions. |
| 33 | SVG text vs post text (all 7 SVGs) | TRUE | Section map = table. Grid: every cell and scope tag matches, and the 7 in-scope rows count correctly. States, acceptance, weak-to-priceable and scoring all match word for word. Cover makes no claims. |
| 34 | "the one / only / most" claims | TRUE | None in the post. "most" appears only inside the AIGA quote. |

## External links

| URL | Loads (search-verified) | Supports its sentence |
|---|---|---|
| https://www.w3.org/TR/WCAG22/ | Yes | Yes |
| https://www.section508.gov/develop/applicability-conformance/ | Yes | Yes |
| https://www.aiga.org/resources/aiga-position-on-spec-work | Yes | Yes |
| https://guides.18f.gov/derisking-government-tech/buying-development-services/ | Yes (18F is closed, but the guides site is still indexed) | Yes |
| https://www.acquisition.gov/far/2.101 | Yes | Yes |

Internal links: `/services/web-app-design-services/`, `#how-much-does-web-app-design-cost` (matches the hub H2), `/services/digital-product-design-services/` (exists), `/case-studies/tradezella/`, `/contact/`. All are valid.

## Fixes (exact old → new)

**F1 (line 17, takeaway 1)**
- Old: `"Build the scope around a role × workflow grid, because workflow and role counts are what design agencies price first."`
- New: `"Build the scope around a role × workflow grid, because workflows and user roles are two of the four factors our web app design price depends on."`

**F2 (line 42)**
- Old: `The order mirrors how an agency builds a quote: who uses the product, what they do, then the evidence and files you expect back.`
- New: `The order runs from who uses the product and what they do to the evidence and files you expect back.`

**F3 (line 70)**
- Old: `Agencies count both totals first, because workflows and user roles are two of the units a web app design price is built on.`
- New: `Both totals feed the quote: workflows and user roles are two of the four factors our web app design price depends on.`

**F4 (line 96, unconfirmed promise)**
- Old: `If yours stalls, bring the half-filled grid to a first call with us and we will finish the count together.`
- New: `If yours stalls, bring the half-filled grid to a first call with us, and list any workflow nobody can confirm as an open question for bidders in the Q&A window.`
- Do not add a second "free consultation and a fixed-scope proposal" here. The closing already uses the about.md offer once.

**F5 (line 102)**
- Old: `Listing states per component makes every agency price the same design, not the happy path alone.`
- New: `Listing states per component lets every agency price the same design, not the happy path alone.`

**F6 (line 122)**
- Old: `- **Bulk actions, saved filters and keyboard use,** because these are among the components a web app UI kit covers and each adds design time.`
- New: `- **Bulk actions, saved filters and keyboard use,** because filters and bulk actions are components of a web app UI kit, and each of the three adds design time.`

**F7 (line 191)**
- Old: `For calibration, our published web app design range is $60,000–$180,000 over 8–16 weeks, driven by the same counts your inventory holds.`
- New: `For calibration, our published web app design range is $60,000–$180,000 over 8–16 weeks, and the price depends on the number of workflows, user roles and test rounds and the size of the component library.`

**F8 (line 193, 18F next to point weights)**
- Old: `GSA's former 18F team advised reviewing each proposal's strengths, weaknesses and risks, then inviting the highest-rated firms to a verbal interview.`
- New: `GSA's former 18F team advised reviewing each proposal's strengths, weaknesses and risks, then inviting the most highly rated firms to a verbal interview. The same team advised against scoring proposals with a point system, so treat the weights below as our suggestion, not 18F's method.`
- No SVG change is needed. The scoring SVG is already labelled "Suggested example weights, not a standard".

No other changes. Items 1–13, 15, 16, 18–21 and 27–34 are TRUE as written.

VERDICT: FAIL
