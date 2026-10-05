# Fact-check: choose-ux-research-agency

- Post: `content/blog/choose-ux-research-agency.md` (draft, not edited)
- Brief: `content/briefs/choose-ux-research-agency.json`
- Visuals checked: all text in `public/blog/choose-ux-research-agency/*.svg` (cover, research-brief-checklist, agency-scorecard, red-flag-map, proposal-normalization, first-two-weeks-timeline)
- Date: 2026-10-05
- Method: WebFetch is blocked by the egress proxy (confirmed again for insightsassociation.org). External claims were checked with WebSearch limited to the source's own domain. The search had to return the exact URL, and the snippets had to support the sentence. Company claims were checked against `content/home.ts`, `lib/site.ts`, `lib/blog.ts`, `content/pages/about.md`, `content/services/ux-research-services.json` and `content/case-studies/{toolsgroup-supply-chain-ux,tradezella}.md`.

## External sources and standards

| # | Claim (post line) | Verdict | Source / method | Replacement |
|---|---|---|---|---|
| 1 | GOV.UK user research team wrote in 2015 about getting the best out of research agencies on large survey projects; the agency runs fieldwork, the client writes the brief, agrees objectives and keeps stakeholders bought in (L57) | TRUE | https://userresearch.blog.gov.uk/2015/02/18/how-to-get-the-best-out-of-research-agencies/ (WebSearch, site-restricted. The URL is dated 2015-02-18. Snippets: agencies are for nationally representative samples of >1000 respondents, a clear research brief with objectives, scope that "everyone buying into it") | none |
| 2 | NN/g: testing with 5 users finds most usability problems (L102) | TRUE | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ (WebSearch, nngroup.com) | none |
| 3 | NN/g: "with 4–5 per group when user types differ sharply" (L102) | WRONG | Same NN/g article: "3–4 users from each category if testing two groups of users; 3 users from each category if testing three or more groups" | "For qualitative usability rounds, Nielsen Norman Group's guidance is that [testing with 5 users finds most usability problems](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/), with 3–4 users per group when you test two distinct user groups and at least 3 per group for three or more." |
| 4 | Insights Association Code of Standards sets consent, transparency and protection of personal data as baseline duties toward research participants (L178) | TRUE (content) | https://www.insightsassociation.org/About-Us/Code-of-Standards (WebSearch, insightsassociation.org. Snippets: duty of care to participants and protection of their data; "be transparent about the collection of personal data and only collect personal data with consent") | none for the sentence |
| 4a | Link host `https://insightsassociation.org/About-Us/Code-of-Standards` (no www) loads (L178) | UNVERIFIABLE | Search returns only the `www.` host. WebFetch of the bare host is EGRESS_BLOCKED, so I could not confirm the redirect | Change the link URL to `https://www.insightsassociation.org/About-Us/Code-of-Standards` (anchor text unchanged) |
| 5 | HHS sample BAA provisions include returning or destroying PHI when the contract ends (L179) | TRUE | https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html (WebSearch, hhs.gov. The page title is "Business Associate Contracts". Snippet: "at termination of the contract, if feasible, return or destroy all protected health information…") | none |
| 6 | HIPAA expansion "Health Insurance Portability and Accountability Act"; HHS = U.S. Department of Health and Human Services (L179) | TRUE | hhs.gov (same search) | none |
| 7 | When sessions can expose PHI "the agency signs a HIPAA business associate agreement (BAA)" (L179) | WRONG (overbroad) | https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html (WebSearch, hhs.gov). A BAA is required only when the vendor creates, receives, maintains or transmits PHI on behalf of a covered entity or another business associate. A health-product company that is neither has no HIPAA BAA duty | "- **Health products.** When sessions on [healthcare products](/industries/healthcare/) can expose protected health information (PHI), for example a clinician sharing a screen with patient records, and your company is a HIPAA covered entity or business associate, the agency signs a Health Insurance Portability and Accountability Act (HIPAA) business associate agreement (BAA)." |
| 8 | ISO 9241-210 human-centered design framework, link /standard/77520 (L195) | TRUE | https://www.iso.org/standard/77520.html (WebSearch, iso.org). ISO 9241-210:2019, edition 2, stage 90.93, confirmed in 2025, so it is still current | none |
| 9 | Dovetail as a tool for a tagged research repository (L114) | TRUE | https://dovetail.com/research/what-is-a-research-repository/ (WebSearch, dovetail.com). The hub also names Dovetail | none |
| 10 | Generative research = interviews and contextual inquiry; evaluative = usability testing, tree tests, concept tests (L35–36) | TRUE | Hub `ux-research-services.json` (FAQ and process step 4); NN/g usage | none |

## Company facts and honesty

| # | Claim (post line) | Verdict | Source / method | Replacement |
|---|---|---|---|---|
| 11 | Our UX research services combine generative first and evaluative second (L38) | TRUE | Hub abstract and process steps 3–4 | none |
| 12 | Our standard is 10–15 interviews per user group (L102) | TRUE | Hub FAQ "How many participants…" | none |
| 13 | Our standard 3–6 days of recruitment (L94, L219); 2–4 days of research framing (L219); first sessions in week two (L219) | TRUE | Hub process: framing 2–4 days, recruitment 3–6 days (5–10 working days total) | none |
| 14 | ToolsGroup: 30+ stakeholder interviews, 75% of sales losses traced to the UI rather than feature gaps, insight reframed the product strategy; supply chain product (L116) | TRUE | `content/case-studies/toolsgroup-supply-chain-ux.md` (title, results, description) | none |
| 15 | TradeZella: discovery and stakeholder interviews; trading product (L82) | TRUE | `content/case-studies/tradezella.md`: "Scope of work: product revamp, discovery, stakeholder interviews…"; it is a trading journal and analytics platform | none |
| 16 | Our UX research program runs 4–8 weeks and $25,000–$60,000 (L171) | TRUE | Hub `priceRange` and abstract; `home.ts` pricing | none |
| 17 | "…priced on the same units" (the 5 units: user groups, participants, methods, recruitment difficulty, readout) (L171) | WRONG | Hub cost section lists 4 price factors: user groups, participants, methods, recruitment difficulty. Readout is not a price driver on the site | "Our own UX research program runs 4–8 weeks and $25,000–$60,000, priced on four of these units (user groups, participants, methods and recruitment difficulty); the price drivers are broken down on [our UX research program and pricing page](/services/ux-research-services/)." |
| 18 | Our process follows ISO 9241-210 (L195) | TRUE | Hub section "What is UX research?" | none |
| 19 | "We answer these 12 on a first call, with the researcher who would run your study on the line." (L137) | UNVERIFIABLE (agency capability) | The site offers "a free consultation and a fixed-scope proposal" (`content/pages/about.md`; form cards). Nowhere does it say who joins the consultation. The named team (`home.ts`) has no researcher title, and the home page says "The designers who run your research stay through engineering" | "Ask us these 12 on a free consultation call, before you receive our fixed-scope proposal." |
| 20 | "we return a scoped research plan with a fixed price, plus a 30-minute call with the lead researcher" (L197) | UNVERIFIABLE (agency capability) | The site has no "30-minute call" and no "lead researcher" role. The supported offer is a free consultation plus a fixed-scope proposal (about.md) or fixed price (location pages) | "[Send us your research brief](/contact/) for a free consultation and a fixed-scope proposal, so you can score us on the same rubric as every other agency." |
| 21 | "If the answer is 'our design team,' research is a phase, not a practice." (L78) | WRONG (contradicts the site's own positioning) | `home.ts`: "The designers who run your research stay through engineering and launch"; every named team member has a design or UX title. By the post's own rubric this sentence marks our agency as "research is a phase", and it implies a separate research staff that the site does not show | "If no one can name who moderates the sessions and who synthesizes them, research is a phase, not a practice." |
| 22 | Strong answer: "a reviewer outside the design team" (L131, table) | WRONG (same conflict as #21) | `home.ts` says designers run research. The post goes on to offer us as a firm that passes this rubric | Table cell: "Evidence shown before solutions; a second reviewer checks each finding against the session clips" |
| 23 | Author sahar-asif writes as someone who scopes research engagements | TRUE | `home.ts`: Sahar Asif, "Senior Manager UX \| KAM" (key account manager) | none |
| 24 | Industries `saas`, `healthcare` exist | TRUE | `content/industries/saas.json`, `healthcare.json` | none |
| 25 | No invented clients, testimonials, awards, certifications, offices or statistics | TRUE | Only ToolsGroup and TradeZella are named, both from case-study files. The proposal table and SVG are labelled "Hypothetical example… not market data". The shortlist-three FAQ is labelled "our working rule, not an industry statistic". No location or office claims | none |

## SVG text

| File | Verdict | Notes |
|---|---|---|
| cover.svg | TRUE | Title text only |
| research-brief-checklist.svg | TRUE | 6 fields match the post; "brief plus a 45-minute call" is generic advice, not a company claim |
| agency-scorecard.svg | TRUE | Weights add to 100% (15+20+15+15+10+10+15); labelled as our suggestion |
| red-flag-map.svg | TRUE | Mirrors post list; no company claims |
| proposal-normalization.svg | TRUE | Labelled hypothetical, no fee figures |
| first-two-weeks-timeline.svg | TRUE | Day ranges match post and fit hub framing (2–4 d) + recruitment (3–6 d) |

## Fixes required (summary)

1. L102: NN/g per-group count (row 3).
2. L178: switch the link to the `www.` host (row 4a).
3. L179: make the HIPAA BAA condition explicit (row 7).
4. L171: price-driver units (row 17).
5. L137 and L197: drop "researcher on the line", "30-minute call" and "lead researcher" and use the site's free consultation plus fixed-scope proposal (rows 19, 20).
6. L78 and the L131 table cell: remove wording that contradicts the site's designers-run-research positioning (rows 21, 22).

VERDICT: FAIL
