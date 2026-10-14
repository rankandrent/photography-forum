---
title: "E-commerce UX Audit Checklist: What to Check, Score and Fix"
metaTitle: "E-commerce UX Audit: Checklist and Severity Scoring"
description: "E-commerce UX audit checklist from search to checkout: what to check, how to score each issue and what to send us. Then request a fixed-scope proposal."
date: 2026-10-14
updated: 2026-10-14
contributors: [umar-sarwar]
author: talha-saleem
type: Checklist
services: [ecommerce-ux-design-services]
industries: [ecommerce]
tags: [e-commerce ux audit, e-commerce ux audit checklist, checkout ux audit, product page ux audit, shopify ux audit]
keyword: "ecommerce ux audit"
funnel: bofu
takeaways:
  - "An e-commerce UX audit scores the whole shopping path, from site search to order confirmation, not only the checkout."
  - "Pull four data sets first: a Google Analytics 4 (GA4) funnel exploration split by device, the site search log, return and ticket reasons, and Core Web Vitals field data."
  - "Rank each finding by its severity rating (1 to 4) times the share of affected sessions, divided by the effort estimate in development days."
  - "Check every audited template against Web Content Accessibility Guidelines (WCAG) 2.2 level AA, including Redundant Entry for billing addresses and Target Size for swatches."
  - "On this site, an audit takes 2–3 weeks and costs $5,000–$15,000, the range published on the e-commerce hub."
draft: true
qa: pending
---

An e-commerce UX audit (a user experience audit of an online store) starts with a test you can run on your own phone in 60 seconds. On mobile data, search for a product with one letter wrong, add a product with sizes or colors to the cart, and reach the payment step as a guest. Each stall points to an area below, because a full audit scores every step from the search box to the order confirmation and ranks each issue by severity, reach and effort.

This e-commerce UX audit checklist covers the data to pull, the checks for each funnel step, scoring and what to send for a quote. Our [e-commerce UX design services](/services/ecommerce-ux-design-services/) start with this audit when a store has no funnel evidence yet.

## What does an e-commerce UX audit add to a general audit?

**An e-commerce UX audit adds store-specific rules, following a shopper from site search to guest checkout and checking each step against e-commerce usability research.**

The method is a heuristic evaluation against Jakob Nielsen's 10 usability heuristics, published by the Nielsen Norman Group, plus store rules those heuristics never name, such as showing the total cost before payment. Most come from Baymard Institute research, whose [cart abandonment page](https://baymard.com/lists/cart-abandonment-rate) puts the average documented rate at 70.22% across 50 studies, browsers included; the audit hunts for the share the store causes. The map shows each step and its data.

<!-- visual: store funnel audit map. 6 steps left to right (search and navigation, product listing page, product detail page, cart, checkout, order confirmation), each with its checks and flagging data; mobile and accessibility as two bands under all steps. Alt: "E-commerce UX audit map of six store steps with checks and data sources, plus mobile and accessibility bands". Caption: "E-commerce UX audit map: six store steps and the data that flags each" -->

<details class="astext"><summary>Show as text</summary>

| Store step | Audit checks | Data that flags it |
|---|---|---|
| Search and navigation | Query types, menu labels | Search log, zero-result queries |
| Product listing page | Filters, product cards | Google Analytics 4 (GA4): view_item_list to view_item |
| Product detail page | Variants, delivery, returns | Return reasons, GA4: view_item to add_to_cart |
| Cart | Total cost, edits | GA4: add_to_cart to begin_checkout |
| Checkout | Guest path, forms, payment | GA4: begin_checkout to purchase |
| Order confirmation | Order summary | Support tickets |
| Every step | Mobile pass, Web Content Accessibility Guidelines (WCAG) 2.2 check | Device split, Core Web Vitals |

</details>

The general method sits in [what a UX audit includes on any product](/services/ux-audit-services/#what-does-a-ux-audit-include); read your worst step's section first.

## Which store data should you pull before the audit starts?

**Pull four data sets before anyone opens the store: a funnel exploration split by device, the site search log, return and ticket reasons, and Core Web Vitals field data.**

These numbers set the audit scope: audit first the template with the steepest funnel drop-off on mobile, then the checkout, which every buyer passes.

In GA4, build the funnel exploration from the recommended e-commerce events: view_item_list, view_item, add_to_cart, begin_checkout, add_shipping_info, add_payment_info and purchase. Make it an open funnel, which Google's Analytics Help page on funnel exploration defines as one users can enter at any step, so shoppers who return straight to checkout count. Then break it down by device category.

<!-- visual: pre-audit data pull card. 4 rows (data set / where to get it / what it tells the audit): GA4 funnel exploration by device; site search log; return reasons and support tickets; Core Web Vitals field data. Alt: "Pre-audit data pull card with four store data sets for an e-commerce UX audit". Caption: "Pre-audit data pull: four store data sets" -->

<details class="astext"><summary>Show as text</summary>

1. **GA4 funnel exploration by device:** the steepest drop per device.
2. **Site search log:** top and zero-result queries, from the platform or search vendor.
3. **Return reasons and support tickets:** "wrong size" and "not as pictured" point at the product detail page.
4. **Core Web Vitals field data:** PageSpeed Insights for product, cart and checkout URLs.

</details>

Hotjar or Microsoft Clarity, which is free, then shows why: filter recordings to the worst step and watch for rage clicks, dead clicks and stalled form fields. On our audits, analytics access arrives at kick-off, in the first 1–2 days and well before scoring, which leaves time to confirm the tags: a purchase event that fires twice on reload makes a healthy step look broken.

## How does the audit test site search and navigation?

**The audit runs the same five query types on every store, and each one passes only when the first results, or a helpful zero-result page, answer it.**

Start from the zero-result queries in the search log, because they show shoppers' words the catalogue misses. The sheet uses made-up apparel queries; swap in your own.

<!-- visual: search query test sheet. 5 rows (misspelling, synonym, product attribute, SKU or model number, non-product query) with the made-up apparel examples below, the pass condition and empty pass/fail boxes. Alt: "Site search test sheet with five query types, example apparel queries and the pass condition for each". Caption: "Site search test sheet: five query types per store" -->

<details class="astext"><summary>Show as text</summary>

| Query type | Example | Passes when |
|---|---|---|
| Misspelling | sneekers | Sneakers appear, or a "did you mean" link |
| Synonym | trainers | The same results as the catalogue term |
| Product attribute | waterproof jacket | Only waterproof jackets, filters still usable |
| Stock keeping unit (SKU) or model number | AB-1042 | The exact product comes first |
| Non-product question | returns | The returns policy, not an empty grid |

</details>

Autocomplete should suggest products within a few letters, a zero-result page should offer a spelling fix or popular categories, and results need the same filters as category pages. For navigation, check labels in shoppers' words, a clickable parent category, breadcrumbs, and a search field visible on mobile without opening the menu. Screenshot every failure; that log is your first page of findings.

## Which listing and product page checks find the leaks?

**On listing pages, check filters and product cards against what shoppers compare; on product pages, check the variant selector, delivery cost and date, size guide and returns line.**

On the product listing page (PLP):

- **Filters** match the attributes each category is bought on, such as size, color and price, because generic filters hide the one that matters.
- **Applied filters** stay visible and removable one by one, so undoing one does not reset the rest.
- **Product cards** show price, rating and swatches, so shoppers compare without opening each product.
- **The back button** keeps the scroll position, so shoppers do not restart a long list.

A product page UX audit reads the product detail page (PDP) next to your return reasons, since a sizing question left open can come back as a "wrong size" return:

- **The variant selector** marks out-of-stock sizes and flags a missing size, so add to cart never fails silently.
- **Delivery cost and date** sit next to the add-to-cart button, so cost is settled before the cart.
- **The size guide and return policy** sit one tap away, because they answer the questions behind your return tags.
- **Images** zoom to fabric and labels, because the photo stands in for handling the product.

The Federal Trade Commission (FTC) Rule on the Use of Consumer Reviews and Testimonials (16 CFR Part 465) bans fake reviews and review suppression, one of the [payment, accessibility and review rules for online stores](/industries/ecommerce/#which-payment-accessibility-and-review-rules-shape-e-commerce-ux). Start both lists with your three best-sellers.

## Which 12 checkout checks belong in an e-commerce UX audit?

**The 12 checks fall into four groups, cost, account, form and trust, and the first asks whether shoppers see the total cost before the payment step.**

Baymard's US survey of abandonment reasons sets aside the 42% who were only browsing. Among the rest, extra costs such as shipping, tax and fees led at 40%, then distrust with card details at 19%, a required account at 18% and a long or complicated checkout at 17%. Each group in the card answers one of those reasons.

<!-- visual: checkout pass/fail card. Exactly the 12 checks below, grouped under cost, account, form and trust, each with an empty pass/fail box. Alt: "Checkout pass/fail card with 12 cart and checkout checks grouped by cost, account, form and trust". Caption: "Checkout UX audit card: 12 pass/fail checks" -->

<details class="astext"><summary>Show as text</summary>

**Cost:**

1. Shipping and taxes shown in the cart.
2. Cart editable in place: quantity, remove, variant.
3. A promo code field that does not send shoppers hunting for codes.

**Account:**

4. Guest checkout by default; account offered after the order.

**Form:**

5. Form fields counted per step.
6. Address autocomplete.
7. Billing address defaults to shipping address.
8. Numeric keyboards for card and phone fields.
9. Inline errors that say how to fix the field.
10. Entered data kept after an error.

**Trust:**

11. Order summary at every step.
12. Payment methods, wallets included, shown before the payment step.

</details>

Check 5 is a count: the same Baymard page puts the average US checkout at 14.88 form fields by default, against 7–8 in an ideal flow. Mark each check on a phone first, where mobile checkout typing hurts most. A checkout UX audit alone misses everyone who never reaches the cart, so these checks come fifth, not first.

## How does an e-commerce UX audit cover mobile and WCAG 2.2?

**Mobile gets its own pass with its own GA4 numbers, speed is judged on Core Web Vitals field data, and every audited template is checked against WCAG 2.2 level AA.**

Start from the device split: when the mobile conversion rate trails desktop, the mobile pass gets more hours for thumb reach, sticky bars over the size selector and field keyboards.

[Google's web.dev guidance](https://web.dev/articles/vitals) sets the Core Web Vitals thresholds for a good experience at a Largest Contentful Paint (LCP) of 2.5 seconds or less, an Interaction to Next Paint (INP) of 200 milliseconds or less and a Cumulative Layout Shift (CLS) of 0.1 or less, at the 75th percentile of page loads. In a store, INP is the lag after tapping a filter, a swatch or add to cart, so use PageSpeed Insights field data, not one lab run.

WCAG 2.2 level AA is the conformance level the audit uses. Of the [criteria new in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/), Redundant Entry fails a billing form that asks again for the shipping address, and Accessible Authentication (Minimum) fails a login that depends on memorizing or retyping a code. The table maps five criteria to a store.

<!-- visual: WCAG 2.2 checkout criteria table. 5 rows (3.3.7 Redundant Entry, 3.3.8 Accessible Authentication (Minimum), 2.4.11 Focus Not Obscured (Minimum), 2.5.8 Target Size (Minimum), 1.4.3 Contrast (Minimum)); columns level / where it bites / how to test. Alt: "WCAG 2.2 checkout criteria table with level, where each criterion bites in an online store and how to test it". Caption: "WCAG 2.2 criteria that hit store checkouts" -->

<details class="astext"><summary>Show as text</summary>

| Criterion | Level | Where it bites | How to test |
|---|---|---|---|
| 3.3.7 Redundant Entry | A | Billing address typed again | No detail asked twice |
| 3.3.8 Accessible Authentication (Minimum) | AA | Login and one-time codes | Paste and password managers work |
| 2.4.11 Focus Not Obscured (Minimum) | AA | Sticky bars, cookie banners, chat widgets | Tab through checkout |
| 2.5.8 Target Size (Minimum) | AA | Swatches, quantity steppers | 24 × 24 Cascading Style Sheets (CSS) pixels, or enough spacing |
| 1.4.3 Contrast (Minimum) | AA | Prices, sale labels, buttons | 4.5:1 for body text |

</details>

For the Americans with Disabilities Act (ADA), the Department of Justice says ADA Title III covers what businesses open to the public offer online, but it has [no regulation setting detailed web standards](https://www.ada.gov/resources/web-guidance/), so WCAG 2.2 AA is the working benchmark. The European Accessibility Act has applied to e-commerce services for European Union (EU) consumers since 28 June 2025 under Directive (EU) 2019/882.

The audit checks templates, not every page, and fixes go into templates, never an overlay widget; a full-site accessibility audit is quoted separately. Tab through your checkout with a keyboard before the audit starts.

## How do you score and rank e-commerce UX audit findings?

**Multiply each finding's severity rating (1 to 4) by the share of affected sessions, divide by the effort estimate in development days, and fix the highest scores first.**

Each issue gets a screenshot, a severity rating, a recommended fix and an effort estimate in design and development days. On our audits, two senior UX designers review independently, then merge findings. Affected sessions come from the funnel exploration: the share of all sessions that reach the page with the issue.

Illustrative, with invented inputs: a severity 3 shipping-cost surprise on a cart page reached by 12% of sessions scores 3 × 12 = 36, or 18 at 2 development days. A severity 4 gift-wrap bug met in 0.5% of sessions scores 4 × 0.5 = 2, or 2 at 1 day, so it waits. The 2×2 below turns scores into actions.

<!-- visual: priority 2x2. Axes: impact (severity × share of affected sessions) vs effort (development days). Quadrants: fix this sprint, plan the project, batch with the next release, park. 4–6 illustrative dots, including the shipping-cost surprise and the gift-wrap bug; labelled illustrative. Alt: "Illustrative priority 2x2 of e-commerce UX audit findings by impact and effort". Caption: "Illustrative priority 2x2: impact against effort" -->

<details class="astext"><summary>Show as text</summary>

Illustrative:

- **Fix this sprint:** high impact, low effort (the shipping-cost surprise).
- **Plan the project:** high impact, high effort, often a template redesign.
- **Batch with the next release:** low impact, low effort (the gift-wrap bug).
- **Park:** low impact, high effort; revisit if traffic to the page grows.

</details>

Each "fix this sprint" item becomes an A/B testing hypothesis. That ranked fix roadmap, with reach and effort in days, is what an expert audit hands over, and what a team scoring its own store struggles to calibrate. No reach column in your backlog yet? Add one before the next sprint.

## What does a self-audit of your own store miss?

**You can run this checklist yourselves, but a self-audit misses what your team stopped noticing: menu names, saved addresses, fast connections and catalogue search terms.**

- **Category names:** staff know where everything lives, so "Essentials" reads as clear to them and vague to shoppers.
- **Logged-in sessions:** saved addresses and cards hide the guest checkout path and its errors.
- **Fast devices:** a laptop on office Wi-Fi hides the INP and LCP delays of a mid-range phone on mobile data.
- **Catalogue vocabulary:** staff search with product names and SKUs, so synonyms and misspellings never fail for them.
- **No shared scale:** two colleagues rate one issue 2 and 4, and the louder voice wins.

Independent evaluators close those gaps, because they bring neither your vocabulary nor your habits. Bring them in when findings will decide a redesign budget, or when a store shows signs it needs more than an audit, such as cart abandonment rising while traffic and prices hold. Without funnel evidence, audit first, then redesign only the weakest templates.

## What should you send to get an e-commerce UX audit quote?

**Send your store URL with six scope inputs, from the store platform to any accessibility deadline, and an e-commerce UX audit can be priced at a fixed scope.**

These six inputs set the audit scope:

- **Store platform** (Shopify, BigCommerce, Adobe Commerce or custom), because on a Shopify UX audit each finding names the theme section, app or checkout setting to change.
- **Templates in scope** (home, listing, product, cart, checkout, account), so the quote counts templates, not pages.
- **Devices, markets and languages**, because each adds a pass.
- **GA4 access or a funnel export**, so reach is scored from week one.
- **Top 50 search queries and the zero-result list**, so the search test uses your shoppers' words.
- **Any accessibility deadline**, such as EU sales under the European Accessibility Act, because it sets the depth of the WCAG check.

Our e-commerce UX audit has an audit price of $5,000–$15,000 and an audit duration of 2–3 weeks, per the hub's [comparison of an audit with a full e-commerce redesign](/services/ecommerce-ux-design-services/#e-commerce-ux-design-vs-ux-audit). That redesign of the weakest templates runs $25,000–$60,000 over 4–8 weeks.

Every project begins with a free consultation and a fixed-scope proposal. For a smaller first look, a 45-minute UX audit session reviews your store and identifies the top three friction points. Either way, [send us your store URL and platform](/contact/) with your funnel exploration, so the scope starts from your own drop-off numbers.

Your 60-second phone test finds the stalls; the checklist ranks them, and our e-commerce UX design work starts with the templates that score worst.

## FAQs

### How often should an online store run a UX audit?

Tie it to events, not a calendar. Run one before a replatforming project, after a theme or checkout change, when the funnel exploration shows a new drop, and before the peak-season build freeze.

### Does an e-commerce UX audit include accessibility?

Yes. Each audited template is checked against WCAG 2.2 level AA, including the checkout criteria above. A full-site accessibility audit of every page is quoted separately.

### Is an e-commerce UX audit the same as a CRO audit?

No. The UX audit finds and ranks usability issues with evidence, while conversion rate optimization (CRO) proves one change at a time with A/B testing. The audit's ranked list feeds the CRO test queue.

### Can a Shopify UX audit recommend changes to the checkout?

Yes, within your plan's limits. [Shopify's developer documentation](https://shopify.dev/docs/apps/build/checkout/technologies) lists checkout UI extensions as a Shopify Plus feature, while Thank you and Order status extensions run on all plans except Shopify Starter. Each finding names a theme change, an app change or a checkout setting.

### Should you audit the old store before replatforming?

Yes. An audit before the move lists the issues to fix in the new templates, so they are not rebuilt on the new platform. The hub names a move from a custom store to Shopify as a trigger for outside design help.
