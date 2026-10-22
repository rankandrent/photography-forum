# Fact-check: content/industries/media.json (+ hub backlink in digital-product-design-services.json)

Date: 2026-10-22. Brief: content/briefs/media.json. Sources read: content/case-studies/mass-media-co.md, content/case-studies/vocable.md, content/home.ts, content/services/{digital-product-design-services, web-app-design-services, dashboard-ux-design, ux-audit-services, ux-research-services, mobile-app-ui-ux-design-services}.json, content/blog/ux-strategy-roadmap.md, content/industries/edtech.json. External sources fetched with WebFetch (all loaded).

The page was not edited because QA is editing it in parallel and my role says not to edit. The orchestrator applies every fix below.

## Honesty checks

| Check | Result |
|---|---|
| Apex HCM / Fortna / ToolsGroup mentioned | None (PASS) |
| Invented clients, testimonials, awards, offices, team members | None. One media client (Mass Media Co.) plus Vocable as related work (PASS) |
| Vocable presented as a media company | No. "This client is a content platform, not a media company." (PASS). Note: vocable.md frontmatter now has `industries: [saas, media]`, so the template rail "Media UI UX case studies" lists Vocable. The page text frames it correctly, so no page fix. |
| Claim of writing production code | No. FAQ 2 "No. We stop at design…" follows the hub FAQ "Do digital product designers write code? No." Open owner conflict remains: home.ts FAQ "We deliver design and development." (known, not a page fix) |
| MMC "2+" error-rate line, Vocable "60+"/"35+" lines, "seamless" | Not used (PASS) |
| Implied-client sentences | One in the hub backlink (F7) |

## Claims table

| # | Claim (page location) | Verdict | Source |
|---|---|---|---|
| 1 | Stats: 30% increase in order processing efficiency (MMC) | TRUE | mass-media-co.md results |
| 2 | Stats: 35% increase in overall workflow efficiency (Vocable) | TRUE | vocable.md results |
| 3 | Stats: 200+ products designed since 2017 | TRUE | RULES.md confirmed facts |
| 4 | Abstract / cost / FAQ 4: full project 8–16 weeks, $60,000–$180,000; sprint 4–8 weeks, $25,000–$60,000; audit 2–3 weeks, $5,000–$15,000 | TRUE | home.ts L200–202, L258–259; digital-product hub |
| 5 | Cost: 3–6 designers (full), 2–4 (sprint); no audit team size | TRUE | home.ts L201–202 |
| 6 | Cost: 4 price factors (platforms, user groups, core user flows, validation rounds) | TRUE | digital-product hub cost section |
| 7 | Steps: 5 steps, names and day ranges; sum 40–80 working days = 8–16 weeks | TRUE | hub steps (5–10 + 5–15 + 5–10 + 10–20 + 15–25 = 40–80) |
| 8 | Step 2: 5–8 users per user group | TRUE | hub step 2 |
| 9 | Step 4 / table: 5 users per round on Maze, SUS score each round | TRUE | hub step 4 |
| 10 | Step 5 / FAQ 2: WCAG 2.2 AA; annotated Figma files, design tokens, component specs; designers stay through launch | TRUE | hub step 5, handoff deliverable |
| 11 | Step 1 link anchor "what the discovery workshop decides" → /blog/ux-strategy-roadmap/#who-owns-the-roadmap-and-what-does-the-workshop-decide | WRONG (anchor misdescribes target) | ux-strategy-roadmap.md L171–189: the section is about a 2-hour *roadmap* workshop and says the MMC discovery workshop "was a product revamp, not a roadmap engagement". F1 |
| 12 | Screen states: empty, loading, error, default, completed | TRUE (site pattern) | edtech.json L59 publishes the same set |
| 13 | Order management item (data products, digital channels, data processing services, estimated cost) | TRUE | mass-media-co.md Solution |
| 14 | Web app hub covers data tables, filters, permission states | TRUE | web-app-design-services.json L59, L198 |
| 15 | Media sales packages (Facebook marketing, goals attached) | TRUE | mass-media-co.md "Social media sales" |
| 16 | Campaign reporting (revenue, cost, total, order count; reach by device, age group, channel) | TRUE | mass-media-co.md |
| 17 | Audience dashboards: 5–7 metrics per view, drill-down path, role-based views | TRUE | dashboard-ux-design.json L29, L35 |
| 18 | Content workflow (templates, AI writing help, content score, readability, Vocable) | TRUE | vocable.md approach/solution |
| 19 | Task management (owner, due date, progress; dashboard with sales operations, open tasks, task flow by client) | TRUE | mass-media-co.md |
| 20 | Card "Disconnected systems" (order takers moved between separate systems; would not scale) | TRUE | mass-media-co.md challenge |
| 21 | Card "Internal teams and clients": on that platform each role "gets its own view and permission states, so a client never lands in the order screens" | UNVERIFIABLE as an MMC fact | mass-media-co.md names no role-based views or permissions. F2 |
| 22 | Card "Audience data": MMC database holds verified PII | TRUE | mass-media-co.md Overview |
| 23 | Same card: "so screens show segments and reach instead of raw personal records, plus each segment's opt-out status" (as MMC fact) | UNVERIFIABLE | mass-media-co.md mentions audience segmentation, never opt-out status or hiding raw records. F3 |
| 24 | Card "Content at deadline speed": trend research took hours; measuring performance across tools | TRUE | vocable.md challenge |
| 25 | Same card: "Content platforms billed by subscription, known as software as a service (SaaS)" | WRONG (definition) | SaaS is software delivered and hosted by the vendor over the internet; subscription billing is the usual pricing model, not what the term names. F4 |
| 26 | MMC section: scope quote, discovery workshop with stakeholders and users, five experiences, omnichannel platform, 53% increase in audience engagement | TRUE | mass-media-co.md (scope line verbatim; approach; results table) |
| 27 | Vocable section: idea to MVP, scope quote, creator journey from stakeholder interviews, OpenAI/Google/Anthropic/Meta, 20% content quality | TRUE | vocable.md (description, scope verbatim, approach, results) |
| 28 | Vs table rows (outputs, validation, "we do not produce ad campaigns") | TRUE | home.ts sprint body (wireframes, prototypes); no ad-creative service on the site |
| 29 | WCAG 2.2 AA: 4.5:1 for normal-size text | TRUE | https://www.w3.org/TR/WCAG22/ SC 1.4.3 (AA) |
| 30 | WCAG 2.2: keyboard operation with visible focus indicator | TRUE | SC 2.1.1 (A), SC 2.4.7 Focus Visible (AA) |
| 31 | WCAG SC 1.4.1: colour never the only way to convey information | TRUE (minor paraphrase) | SC 1.4.1 "Color is not used as the only visual means of conveying information…". The page drops "visual", which makes the rule stricter, not looser. Optional precision edit, not required. |
| 32 | CCPA: consumers can ask businesses to stop selling or sharing PI; user-enabled GPC that covered businesses must honor | TRUE | https://oag.ca.gov/privacy/ccpa (updated Aug 28, 2026): "one acceptable method … is via a user-enabled global privacy control … must be honored by covered businesses as a valid consumer request to stop the sale or sharing" |
| 33 | Global Privacy Control link | TRUE (loads; browser/extension signal) | https://globalprivacycontrol.org/ |
| 34 | FTC native advertising: ad must be identifiable as an ad; disclosure as close as possible | TRUE | https://www.ftc.gov/business-guidance/resources/native-advertising-guide-businesses ("Native Advertising: A Guide for Businesses"): "native ads are identifiable as advertising"; "as close as possible to the native ads to which they relate"; "clear and prominent on all devices and platforms" |
| 35 | CAN-SPAM: clear opt-out, valid physical postal address, opt-outs honored within 10 business days | TRUE | https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business ("You must honor a recipient's opt-out request within 10 business days.") |
| 36 | Standards answer: "Four … standards" | TRUE | 4 list items, GPC inside CCPA item |
| 37 | FAQ 1: MMC a data-driven digital marketing services company; one omnichannel platform; "our one published media project" | TRUE | mass-media-co.md (see Vocable rail note above) |
| 38 | FAQ 3: audit = heuristic evaluation, analytics review, WCAG 2.2 AA check, prioritized fix roadmap; phased redesign from highest-traffic workflow, one workflow per release | TRUE | ux-audit-services.json L39, L190; web-app-design-services.json L206 |
| 39 | FAQ 5: reader apps etc. "runs on the same 5-step process in our mobile app UI UX design services" | WRONG | mobile-app hub L70–91 has a different 5-step process (4–8 weeks: Discovery and research 3–5 days, User flows and wireframes, Prototype and testing, Visual UI design, Developer handoff 2–5 days). It is not the page's 8–16 week process. F5 |
| 40 | FAQ 5: MMC scope covered web and mobile app design; no reader app, paywall or newsroom project | TRUE | mass-media-co.md scope; grep of content/case-studies finds none |
| 41 | FAQ 6: 53% and 30% figures | TRUE | mass-media-co.md |
| 42 | FAQ 6: "Data, campaigns and client support shaped those results too" | UNVERIFIABLE (causal claim not in the case) | mass-media-co.md lists data analytics and real-time tracking with client support as platform features, but attributes no result to them. F6 |
| 43 | Hub backlink: "Media and marketing companies use the same process for order, campaign and content tools…" | WRONG (implied-client, plural present tense) | One media client only (mass-media-co.md); Vocable is not a media company. F7 |

## Fixes

**F1** (media.json, sections "Which steps…", item 1 body, the link sentence)
- Current: `Our roadmap guide explains <a href=\"/blog/ux-strategy-roadmap/#who-owns-the-roadmap-and-what-does-the-workshop-decide\">what the discovery workshop decides</a>.`
- Replace: `Our roadmap guide shows <a href=\"/blog/ux-strategy-roadmap/#who-owns-the-roadmap-and-what-does-the-workshop-decide\">how the Mass Media Co. discovery workshop put goals before screens</a>.`
- Why: the target section describes a roadmap workshop and states that the MMC workshop was "a product revamp, not a roadmap engagement … goals first, screens later". Check the Mass Media Co. count stays within the brief's cap of 8.

**F2** (media.json, card "Internal teams and clients on one platform", body)
- Current: `Order takers, sales teams and creative teams work inside the platform, while clients read audience engagement reports. Each of these user roles gets its own view and permission states, so a client never lands in the order screens.`
- Replace: `On a media platform, order takers, sales teams and creative teams work inside the tool, while clients read audience engagement reports. Each of these user roles needs its own view and permission states, so a client never lands in the order screens.`
- Why: after the previous card names the MMC platform, "the platform … gets its own view and permission states" reads as an MMC fact that the case study does not state. Turned into design guidance.

**F3** (media.json, card "Audience data with personal information", body, first sentence)
- Current: `That platform's audience database holds verified personally identifiable information (PII), so screens show segments and reach instead of raw personal records, plus each segment's opt-out status.`
- Replace: `That platform's audience database holds verified personally identifiable information (PII). Screens for data like this should show segments and reach instead of raw personal records, plus each segment's opt-out status.`
- Why: the PII fact is in the case. Hiding raw records and showing opt-out status are not.

**F4** (media.json, card "Content at deadline speed", last sentence)
- Current: `Content platforms billed by subscription, known as software as a service (SaaS), follow patterns from our <a href=\"/industries/saas/\">SaaS UI UX design</a> work.`
- Replace: `Content platforms delivered online as software as a service (SaaS) follow patterns from our <a href=\"/industries/saas/\">SaaS UI UX design</a> work.`

**F5** (media.json, FAQ "Do you design reader or subscriber apps for media publishers?", first two sentences)
- Current: `Yes. Publishing UX design for reader apps, subscription flows and video or audio players runs on the same 5-step process in our <a href=\"/services/mobile-app-ui-ux-design-services/\">mobile app UI UX design services</a>.`
- Replace: `Yes. Publishing UX design for reader apps, subscription flows and video or audio players runs through our <a href=\"/services/mobile-app-ui-ux-design-services/\">mobile app UI UX design services</a>, a 5-step process of 4–8 weeks.`
- Why: the mobile hub's 5 steps and 4–8 weeks differ from this page's 5 steps and 8–16 weeks.

**F6** (media.json, FAQ "Can better UX design increase audience engagement…", last sentence)
- Current: `Data, campaigns and client support shaped those results too, so we never credit audience engagement or monetization gains to design alone.`
- Replace: `The platform also brought advanced data analytics, real-time performance tracking and dedicated client support, so we never credit audience engagement or monetization gains to design alone.`
- Why: the case lists these as platform features (The solution) but never says they shaped the results. The replacement uses the case's own words.

**F7** (content/services/digital-product-design-services.json, sections[0].body, last sentence)
- Current: `Media and marketing companies use the same process for order, campaign and content tools, as our <a href=\"/industries/media/\">UI UX design for media companies</a> shows.`
- Replace: `The same process applies to order, campaign and content tools for media and marketing companies, as our <a href=\"/industries/media/\">UI UX design for media companies</a> shows.`
- Why: "Media and marketing companies use" is a present-tense implied-client claim with a plural subject. The site has one media client.

## Owner notes (no page change)

- Open conflict, again: home.ts FAQ "We deliver design and development" vs the hub FAQ "designers do not write code". The page follows the hub.
- Vocable's `industries: [saas, media]` puts it under the "Media UI UX case studies" rail, while the page calls it "not a media company". The page is honest. Consider whether the tag should stay.
- Optional precision (claim 31): "color is never the only visual means of conveying information" matches SC 1.4.1 word for word.

VERDICT: FAIL
