# Google patents SEO playbook (owner training, all projects)

**Mukhtasar (Roman Urdu):** Yeh file un saare Google patents aur owner rules ka ek jagah majmua hai jo
owner ne share kiye aur jin par saare content agents train kiye gaye. Har naye page (blog, service,
industry, location) par yeh rules lagte hain, har project mein. Patent sirf yeh dikhata hai ke system
*kaise kaam kar sakta hai*; yeh guarantee nahi ke Google aaj yahi karta hai. Is liye hum inhein achhi
likhai aur structure ke rules ki tarah follow karte hain, tricks ki tarah nahi. Imaandari ke rules
(koi gharha hua client, stat, review, award ya office nahi) hamesha sab se upar hain.

Last updated: 2026-10-24. Source of truth in the repos: `.claude/skills/seo-patent-rules/SKILL.md`
(cross-project skill) and `docs/content-system/RULES.md` (per site). This file collects both.

---

## 1. The four patents the owner shared

| # | Patent | Title / owner | What it describes | Our rule set |
|---|---|---|---|---|
| 1 | **US8126832B2** | "Artificial intelligence system", Cognitive Code | Turning words into concepts: root forms, synonyms, composite concepts, weighted "essential" concepts, context that picks a meaning, many phrasings mapped to one answer | Concept bindings (section 3) |
| 2 | **US12393768B2** | Google, LAMPreT layout model | Reading a page as blocks with position, size, type (heading, paragraph, list, table, image, caption) and style; judging order and image–text fit | Layout-aware pages (section 4) |
| 3 | **US6285999** | "Method for node ranking in a linked database" (PageRank; Lawrence Page, Stanford) | A page's importance flows from pages that link to it, split across each page's outgoing links | Links (section 5) |
| 4 | **US9558233B1** | Google, "Determining a quality measure for a resource" (click-validated) | Links count by whether people actually click them and stay (long clicks); linking pages whose links get few clicks are "unqualified" and their links are subtracted; anchor text inherits the source's quality | Click-validated link quality (section 6) |

Owner reference for #4: https://alejandromeyerhans.com/research/US9558233B1-click-validated-quality-patent/

### Related patents found later (in the Edmonton site plan, not shared by the owner)
Used only where they agree with Google's public guidelines:

| Patent | Idea | How it is used |
|---|---|---|
| US7536408B2, "Phrase-based indexing in an information retrieval system" | Phrases that predict related phrases in a document | N-gram lists and skip-gram pairs in briefs |
| WO2014089776A1, "Ranking search results based on entity metrics" | Ranking with entities | `about` / `mentions` entities with Wikidata `sameAs` in schema |
| US11354342B2, "Contextual estimation of link information gain" | Scoring documents by new information beyond what the user has seen | Every page needs a unique angle (information gain) |
| US9031929B1, "Site quality score" | A site-level quality score | Consistent quality across the whole site; hub-and-spoke clusters |

---

## 2. Owner keyword and meta rules (apply with every patent rule)

1. **Verified volume first.** The primary keyword has search volume above 0 from Ahrefs, Semrush or
   Search Console impressions. Record volume, KD, source and date. Never estimate. No data → stop and
   tell the owner.
2. **Keyword everywhere it counts.** Meta title, meta description, FIRST meta keyword, og:title,
   og:description, H1 and the first 60 words.
3. **Entity salience.** ≥ 80% of the brief's entities and ≥ 70% of its attributes appear in the
   visible text, each with a real fact. The central entity is in the H1, the first 60 words and ≥ 40%
   of H2s, and is mentioned more than any related entity.
4. **Titles: exact keyword first, never a colon** (final). No ":" in meta title, og:title, H1 or cover
   title. Meta title = exact keyword + " | " + short benefit
   (e.g. "UX Consulting Services | Senior UX Strategy & Roadmaps"). The H1 carries the exact keyword,
   joined with plain words or a comma.
5. **Follow Google's AI Overview and People Also Ask.** Get the SERP (Ahrefs `serp-overview`: rows
   typed `ai_overview_sitelink` = AI Overview sources, `question` = PAA). Read every cited source,
   record their entities, attributes, terms and questions in the brief. The page covers all of them
   with real facts and answers every PAA question in an H2/H3 or FAQ, first sentence = direct answer.
   Missing any one fails QA. Never copy wording; answer better.
6. **Protect live rankings** (final). Never change a live page's slug/URL. Change a live page's meta
   title only with the owner's explicit approval for that page. H1, body, sections, FAQs and internal
   links may be improved. Enforced by `docs/content-system/locked-pages.json` in `npm run seo:check`.

---

## 3. Concept bindings (US8126832B2)

1. **Binding table in the brief** for the central entity: synonyms (2–4), plural/variants, parent
   (1–2, usually the hub service), children (3–6 sub-types or parts), related (3–6 co-occurring
   concepts). Every entry is a literal phrase the page prints. Use each synonym at least once, name the
   parent in the intro, give each child its own H3, list item or table row.
2. **Composite concepts stay whole.** Terms of art ("e-commerce UX audit", "Core Web Vitals") are never
   split or reordered, and are defined in one sentence on first use.
3. **Essential concepts first.** Mark 2–3 essential concepts (central entity + key attribute +
   qualifier such as city or industry). The first sentence under every H2 names the central entity (or
   a synonym) plus at least one other essential concept.
4. **Disambiguate.** Every ambiguous word ("audit", "design", "testing", a city sharing its name,
   "card sorting" vs card games) has a context word in the same sentence.
5. **One intent, one answer, site-wide.** List 3–5 query variants; H2s and FAQ answer them with ONE
   answer. Prices, timelines, team sizes and deliverables match the hub page; on a conflict follow the
   hub and report it, never publish a third version. Every count keeps its unit and qualifier exactly
   as the hub states it.
6. **Suitability check (QA fails the page)** if a synonym, the parent or an essential concept is
   missing, an H2 opener lacks entity + essential concept, a composite concept is split, an ambiguous
   word lacks context, a query variant is unanswered, or a fact contradicts the hub.

## 4. Layout-aware pages (US12393768B2)

1. Nothing important behind a click: only FAQs and navigation may collapse. Content must be visible
   without JavaScript.
2. Right block types: h2/h3 headings, `ol` for steps, `ul` for items, tables for comparisons and costs,
   every explanatory image is a `figure` with a `figcaption`.
3. Each H2 is followed by its direct text answer, never by an image. Definition/answer first, details
   next, FAQ last.
4. An image sits right after the paragraph it explains; caption, alt text and file name name the same
   thing. Unique topic images, no stock.
5. One sentence introduces every table.
6. Bold only the direct answer and true key terms.
7. Section detail text 50–70 words (90 max) on service, industry and location pages.
8. Infographics: landscape (1200 wide, ≥ 1.3:1), designer-made (realistic vector mockups, embedded
   brand font, only the key number large, spacing on an 8-point grid measured to the pixel), with an
   always-visible text version underneath carrying the full wording for phones.

## 5. Links (US6285999, PageRank)

1. No orphan pages: every new page gets at least one contextual link from an existing, relevant,
   well-linked page (its hub/parent) in the same publish.
2. Links follow the bindings: up to the parent, across to siblings, down to children that have pages.
   Anchors name the target's concept or a synonym, never "click here" or "learn more".
3. Few, purposeful links: a handful of relevant contextual links beat long lists. Cap links to the
   same target (hub: 1–2 per post including deep links).
4. External citations only to primary, trustworthy sources that back a stated fact.
5. Sitewide template links matter: a button or nav link that sends the head keyword's anchor to the
   wrong page can cause cannibalization across dozens of pages.

## 6. Click-validated link quality (US9558233B1)

1. **Links people will click:** inside body text, top-to-middle, in the sentence where the reader needs
   the next step, with an anchor that says what they will get. Footer/sidebar dumps add little.
2. **Borrow from pages with real clicks:** choose internal source pages by Search Console clicks and
   impressions.
3. **Be a good source:** each page links out to a few highly relevant pages so its links keep a high
   click rate.
4. **Earn the long click:** the linked page answers the anchor's promise in its first lines.
5. **Backlinks only from topical pages** whose readers would click through. No paid/spam guest posts,
   link farms or exact-match money anchors; extra strict in finance, health and legal.
6. **Linkable assets** (templates, calculators, checklists, original data) earn clicked links, e.g. the
   free customer journey map template (PDF/SVG/PNG/CSV). Never fake data.

---

## 7. Search Console method (owner training, 2026-10-21/22)

1. Pull the last 28 days by query, page and query+page; save a baseline before editing.
2. Bucket by position: 1–3 protect, 4–10 CTR work, 11–20 quick wins, 21–50 content + links, 50+ new or
   better page.
3. Diagnose first: cannibalization (2+ of our pages on one query → pick one intent-winner), page-2
   gaps, missing pages (route the query to the right page type: service, industry, location, blog),
   high impressions with zero clicks.
4. For every target query read the SERP (AI Overview sources + PAA) and close the entity/question gaps.
5. Change a few pages per run; QA + fact-check; compare with the baseline after 3–4 weeks.

## 8. Where it is enforced

| Stage | Agent / script | What it checks |
|---|---|---|
| Brief | seo-keyword-researcher | Volume, bindings, essential concepts, query variants, AI Overview + PAA extraction, entities/attributes |
| Writing | semantic-content-writer | Title/H1/meta rules, H2 openers, coverage, layout |
| Links | content-link-builder | Hub/sibling/child links, anchors, caps, backlink proposals |
| Visuals | content-visual-designer | House style, figure/caption/alt fit |
| Review | content-qa ∥ fact-checker | Suitability check, PAA/AIO coverage, honesty, every claim against primary sources |
| Build | `npm run seo:check` | No colon in title/H1, locked live slugs and titles, broken links, one H1 |
| Score | `npm run onpage` | Keyword placement, entity/attribute coverage, salience (≥ 95 to publish) |

## 9. Honesty (beats every rule above)

No invented clients, stats, testimonials, reviews, awards, certifications, credentials, offices or
results. Examples are labelled illustrative. Claims must be true as built (no "real team" while the
team list is empty). Regulator and standards facts are checked on the regulator's own site.
