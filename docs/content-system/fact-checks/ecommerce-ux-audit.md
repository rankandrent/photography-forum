# Fact-check: ecommerce-ux-audit (round 1, 2026-10-14)

Post: `content/blog/ecommerce-ux-audit.md` · SVGs: `public/blog/ecommerce-ux-audit/*.svg`
Site sources: `content/services/ecommerce-ux-design-services.json` (hub), `content/services/ux-audit-services.json`,
`content/industries/ecommerce.json`, `content/home.ts`, `content/pages/about.md`.

**Edits:** none applied. My role rule is "Do not edit the post". My lesson from 2026-10-12 says not to
rewrite a whole file without an in-place Edit tool, and this session has only whole-file Write. Each fix below is an exact
replacement for the orchestrator to paste. No fix changes SVG text, so the SVGs stay identical to their panels.

## Claims

| # | Claim (line) | Verdict | Source / evidence |
|---|---|---|---|
| C1 | Baymard 70.22% average documented cart abandonment rate across 50 studies (L34) | TRUE | https://baymard.com/lists/cart-abandonment-rate: "average cart abandonment rate of 70.22%", "calculated based on 50 different studies". Updated September 22, 2025 |
| C2 | "…70.22% across 50 studies, **browsers included**" (L34) | UNVERIFIABLE | The page does not say the average includes browsers. It says separately that "a large portion of cart abandonments are simply a natural consequence of how users browse ecommerce sites". See F1 |
| C3 | 42% just browsing, set aside; extra costs 40%, card distrust 19%, account 18%, long/complicated 17% (L121) | TRUE (figures) | Same Baymard page, US online shoppers, excluding "just browsing" |
| C4 | "extra costs … led at 40%, **then** distrust with card details at 19%" (L121) | WRONG (rank) | Baymard ranks "Delivery was too slow" 20% second. Card distrust (19%) is third, so "then" skips an item. See F2 |
| C5 | Average US checkout has 14.88 form fields by default vs 7–8 in an ideal flow (L153) | TRUE | Baymard: "23.48 form elements … (14.88 if counting only form fields)"; ideal "12-14 form elements (7-8 … form fields)" |
| C6 | Core Web Vitals "good": LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, 75th percentile of page loads (L161) | TRUE | https://web.dev/articles/vitals (it adds "segmented across mobile and desktop devices") |
| C7 | WCAG 2.2 new criteria: 3.3.7 Redundant Entry A; 3.3.8 Accessible Authentication (Minimum) AA; 2.4.11 Focus Not Obscured (Minimum) AA; 2.5.8 Target Size (Minimum) AA, 24 × 24 CSS px "or enough spacing" (L163, table, SVG) | TRUE | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/: levels as stated; "at least 24 by 24 CSS pixels" with a spacing exception (plus other exceptions) |
| C8 | Redundant Entry fails a billing form that asks again for the shipping address; 3.3.8 fails a login that depends on memorizing or retyping a code; test "Paste and password managers work" (L163, table) | TRUE | Same W3C page: earlier entries must be "auto-populated or available for selection"; a cognitive function test means "remember, manipulate, or transcribe"; password managers and copy-paste are named as qualifying mechanisms |
| C9 | 1.4.3 Contrast (Minimum) AA, 4.5:1 for body text (table, SVG) | TRUE | WCAG 2.2 SC 1.4.3 (4.5:1 normal text, 3:1 large text). The table does not call it new, and the hub uses the same wording |
| C10 | DOJ: ADA Title III covers what businesses open to the public offer online; "no regulation setting detailed web standards" (L179, link) | TRUE | https://www.ada.gov/resources/web-guidance/ (loads, dated March 18, 2022): "Title III prohibits discrimination … by businesses open to the public"; the ADA applies to goods and services "including those offered on the web"; "The Department of Justice does not have a regulation setting out detailed standards." |
| C11 | EAA applies to e-commerce services for EU consumers since 28 June 2025 under Directive (EU) 2019/882 (L179) | TRUE | EUR-Lex CELEX 32019L0882 (the europa.eu-restricted search returned this exact URL; the WebFetch body came back empty). Art. 2 covers e-commerce services; application from 28 June 2025. Caveat, not needed in the post: microenterprises providing services are exempt, and there are transitional periods |
| C12 | FTC Rule on the Use of Consumer Reviews and Testimonials (16 CFR Part 465) bans fake reviews and review suppression (L115) | TRUE | https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials: "16 CFR Part 465: Trade Regulation Rule on the Use of Consumer Reviews and Testimonials"; bans creating or selling fake reviews and suppression by threats or misrepresentation. eCFR redirected to a captcha |
| C13 | GA4 recommended e-commerce events view_item_list … purchase (L60, map) | TRUE | https://developers.google.com/analytics/devguides/collection/ga4/reference/events ("Recommended events"): all 7 present |
| C14 | GA4 open funnel = users can enter at any step; breakdown by device category (L60) | TRUE | https://support.google.com/analytics/answer/9327974: "In an open funnel, users can enter the funnel in any step"; device category breakdown supported |
| C15 | Microsoft Clarity is free; recordings can be filtered for rage and dead clicks (L73) | TRUE | https://clarity.microsoft.com/ "Free forever"; https://learn.microsoft.com/en-us/clarity/filters/clarity-filters, User actions > Insights: "Rage clicks", "Dead clicks". "Stalled form fields" is phrased as something to watch for, not as a filter |
| C16 | "a purchase event that fires twice on reload makes a healthy step look broken" (L73) | WRONG (logic) | GA4 funnel exploration counts users at each step, so a second purchase event from the same user does not lower any step. Duplicate purchases inflate transactions and revenue; they make checkout look better, not broken. A missing step event is what makes a healthy step look broken. See F3 |
| C17 | Shopify: checkout UI extensions are Shopify Plus; Thank you and Order status extensions on all plans except Shopify Starter (L253) | TRUE | https://shopify.dev/docs/apps/build/checkout/technologies: "Shopify Plus. Thank you and Order status extensions are available to all plans except Shopify Starter." |
| C18 | "on a Shopify UX audit each finding names the theme section, app or checkout setting" (L224); "Each finding names a theme change, an app change or a checkout setting." (L253) | UNVERIFIABLE (our claim) / overbroad | No site page says this about the audit. The hub maps *design* deliverables to "Shopify theme sections and templates". "Each" is also too broad: the post's own PDP image check (zoomable product photos) is a content fix, not a theme, app or setting change. See F4 |
| C19 | "so the quote counts templates, not pages" (L225) | UNVERIFIABLE (our claim) | The audit's price factors on the ux-audit hub are "number of user flows, … platforms, … user groups and the depth of the accessibility check". "Templates" is a price factor only for the $25,000–$60,000 design engagement. See F5 |
| C20 | "Devices, markets and languages, because each adds a pass" (L226) | UNVERIFIABLE (our claim) | Markets and languages appear in no price factor or process step on either hub. See F6 |
| C21 | Jakob Nielsen's 10 usability heuristics, published by the Nielsen Norman Group (L34) | TRUE | https://www.nngroup.com/articles/ten-usability-heuristics/ |
| C22 | Audit $5,000–$15,000 over 2–3 weeks (takeaway, L231) | TRUE | E-commerce hub vs table "$5,000–$15,000", "2–3 weeks"; ux-audit hub cost H2 |
| C23 | Redesign $25,000–$60,000 over 4–8 weeks (L231) | TRUE | E-commerce hub priceRange and vs table; "Stores without funnel evidence start with the UX audit, then redesign the weakest templates" (L119), which also supports L28 and L216 |
| C24 | "two senior UX designers review independently, then merge findings" (L187) | TRUE (hub) | Both hub vs tables say "2 senior UX designers"; ux-audit step "2 designers run … independently"; "Findings are merged". Orchestrator note: `home.ts` L200 still says "1–2 designers" (known conflict; the brief and the orchestrator chose the hubs) |
| C25 | Analytics access at kick-off, first 1–2 days, before scoring (L73) | TRUE | ux-audit hub step 1 "Kick-off and goals (1–2 days) … receive analytics access"; step 3 "Synthesis and scoring" |
| C26 | Screenshot, severity 1 to 4, recommended fix, effort estimate in design and development days (L185, L187, takeaway) | TRUE | ux-audit hub L59, L63, FAQ L198 |
| C27 | Templates checked against WCAG 2.2 AA; full-site accessibility audit quoted separately; never an overlay widget (L181, L245) | TRUE | ux-audit hub FAQ L190 ("audited screens"); industry page L183 ("templates instead of an overlay widget") |
| C28 | "Every project begins with a free consultation and a fixed-scope proposal." (L233) | TRUE | about.md L30, word for word |
| C29 | "a 45-minute UX audit session reviews your store and identifies the top three friction points" (L233) | TRUE | home.ts L93: "Book a 45-minute UX audit session. We review your product and identify the top three friction points." Not called free |
| C30 | Hub names a custom-to-Shopify move as a trigger (L257); cart abandonment rising at steady traffic and prices (L216) | TRUE | E-commerce hub L175, L178 |
| C31 | Illustrative scoring maths: 3 × 12 = 36 → 18 at 2 days; 4 × 0.5 = 2 → 2 at 1 day (L189); 2×2 quadrant placement | TRUE | Arithmetic checks. In the SVG, impact runs up and effort runs right, so the shipping cost lands in "Fix this sprint" (top-left) and gift wrap in "Batch" (bottom-left). Labelled "Illustrative" in the image and the panel |
| C32 | Honesty: no clients, results, testimonials, awards, certifications, local offices; no Apex HCM / Fortna / ToolsGroup | TRUE | grep: no matches; no case study cited; team count only from the hubs |
| C33 | External links load and support their sentences (baymard, web.dev, w3.org, ada.gov, shopify.dev); internal anchors exist | TRUE | All 5 fetched. h2s exist for #what-does-a-ux-audit-include, #which-payment-accessibility-and-review-rules-shape-e-commerce-ux and #e-commerce-ux-design-vs-ux-audit |
| C34 | SVG text = text panels (6 SVGs + cover) | TRUE | Compared every text node to its astext panel; no differences |

## Fixes (exact replacements)

**F1 (L34, C2).** Replace the sentence "Most come from Baymard Institute research, whose … the audit hunts for the share the store causes." with:
> Most come from Baymard Institute research, whose [cart abandonment page](https://baymard.com/lists/cart-abandonment-rate) puts the average documented rate at 70.22% across 50 studies and notes that a large portion of abandonment comes from how people browse; the audit hunts for the share the store causes.

**F2 (L121, C4).** Replace the sentence "Among the rest, extra costs such as shipping, tax and fees led at 40%, then distrust with card details at 19%, a required account at 18% and a long or complicated checkout at 17%." with:
> Among the rest, extra costs such as shipping, tax and fees led at 40%; distrust with card details reached 19%, a required account 18% and a long or complicated checkout 17%.

**F3 (L73, C16).** Replace "…which leaves time to confirm the tags: a purchase event that fires twice on reload makes a healthy step look broken." with:
> …which leaves time to confirm the tags: an add_to_cart event that never fires from a quick-add button makes a healthy step look broken.

**F4 (L224 and L253, C18).**
L224 bullet becomes:
> - **Store platform** (Shopify, BigCommerce, Adobe Commerce or custom), because on a Shopify UX audit a recommended fix can then name the theme section, app or checkout setting it touches.

L253, last sentence becomes:
> Where a fix touches the platform, the finding can name the theme change, app change or checkout setting it needs.

**F5 (L225, C19).** Bullet becomes:
> - **Templates in scope** (home, listing, product, cart, checkout, account), so the audit reviews templates, not every page.

**F6 (L226, C20).** Bullet becomes:
> - **Devices, markets and languages**, so the scope names which versions of the store get reviewed.

The SVGs need no changes: none of F1–F6 touches text that appears in an image or text panel.

## Notes for the orchestrator

- The team-size conflict is still open: `content/home.ts` L200 says "UX audit … 1–2 designers", while both hubs say "2 senior UX designers". The post follows the hubs, as instructed. Fix home.ts or the hubs at site level.
- The brief's `related.externalSources` notes were accurate for every figure. The one exception is Baymard's ranking: the "verified" note listed 40/19/18/17 without the 20% "Delivery was too slow" item, which led to C4.
- On the industry page, "US courts apply the ADA to online stores" (L183) is broader than the ada.gov wording the post uses. The post does not repeat it. Flag it for the site auditor.

VERDICT: FAIL
