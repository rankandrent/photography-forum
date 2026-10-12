# Content system rules (read by every content agent)

Site: uiuxdesignservices.us, a remote-first US UI/UX design agency headquartered in
Reston, VA (founded 2017). Next.js static export; content lives in `content/`.

## Topical map (hub and spoke)

```
                 location pages  (content/locations/*.json  → /location/<slug>/)
                        │
   service hub ─────────┼──────── industry pages (content/industries/*.json → /industries/<slug>/)
 (content/services/*.json → /services/<slug>/)
                        │
                 blog posts around the service (content/blog/*.md → /blog/<slug>/)
```

- Every blog post belongs to exactly ONE service hub (its `services[0]`) and answers a
  question that hub's searcher has before, during or after hiring. It links UP to the hub.
- Blog posts never target the hub's head keyword or a location/industry keyword. Those
  pages own them. A post targets a long-tail / informational query in the hub's cluster.
- Before choosing a keyword, check cannibalisation against every existing title, H1,
  `keyword` and `metaTitle` in `content/` (services, industries, locations, blog).

## Silo structure (every post must strengthen its service)

- A silo = one service hub + its guides. `services[0]` of a post is its silo; a post lives in one silo.
- Links inside a post: UP to its hub (required, early and once more near the end), SIDEWAYS to posts
  in the same silo, DOWN to case studies that used that service. At most ONE link to a different
  service hub, and only when the post genuinely needs it. Never link to another silo's posts.
- Structure: Homepage → silo pillar (money page = the service hub) → supporting posts. The homepage
  and main nav link to every pillar; each pillar links down to ALL its posts (cards + list); each
  post links up to its pillar and to the previous/next post in its silo chain (template).
- The hub page lists its silo's guides automatically; the post page shows the hub breadcrumb,
  a mid-article service CTA and a "Part of our … guides" box (built into the template).
- Every silo should grow toward full coverage of its hub's questions before broadening:
  cost, process, deliverables, how to choose a partner, in-house vs agency, tools/methods,
  mistakes, checklists/templates, examples, industry-specific angles.

## Blog archive pages (built automatically)

- `/blog/` listing, `/blog/category/` + `/blog/category/<group>/` (categories = service groups,
  each listing its silos), `/blog/author/` + `/blog/author/<slug>/` (team profiles, ProfilePage schema).
- Empty archives are noindex and left out of the sitemap until they have a post.
- Pick the author whose role matches the topic (research → a UX lead, visual/UI → a UI designer,
  product strategy → a product designer). Never invent an author.

## Funnel mix (TOFU / MOFU / BOFU)

- Target per silo, set in `funnel.json`: 50% TOFU, 30% MOFU, 20% BOFU. The next post in a silo takes
  the stage that is furthest below target; a new silo starts with 1 BOFU + 1 MOFU post.
- TOFU here is never generic trivia: it must be a problem the hub service solves (service-support ≥ 3)
  and link up to the hub. MOFU needs service-support ≥ 4, BOFU 5.
- Every post sets `funnel: tofu | mofu | bofu` in its frontmatter. The template picks the CTA:
  TOFU → free checklist (email capture), MOFU → case study + consultation, BOFU → consultation + price.

## Lead focus (the goal of every post is a qualified lead)

- Pick topics a buyer of the hub service searches (commercial-investigation and problem-aware
  informational queries). Score each candidate's **service-support 1–5** and apply the funnel minimums in `funnel.json`.
  Trivia that never leads to hiring the service scores 1–2: always skip it.
- In the body, show where a senior agency team makes the difference (without sales fluff), and
  end each major section where a reader would naturally want help. The template adds the CTAs;
  the writer adds 1–2 natural, specific invitations (e.g. "we run this as a 2-week audit").
- Offer a useful next step: checklist, template or estimate request that maps to the hub.

## Variety and learning (no repeated patterns across the site)

- Before writing, read `fingerprints.json`. A new post must differ from the last 5 posts of its silo
  and the last 3 site-wide in at least 4 of: type, intro style, H2 frames, section order, visual types,
  CTA angle, list/table style. Rotate intro styles (scenario, data point with source, myth, question,
  definition, mini case), H2 frames (how/what/why/vs/checklist/mistakes/steps), and visual types.
- Vary sentence rhythm, examples and vocabulary; never reuse a paragraph, intro or closing.
- Owner rules at the top of each learnings file (added with `/train-agent`) take priority.
- Every agent reads its `learnings/<agent>.md` before starting and appends lessons after finishing.
  QA and fact-check failures, audit findings and ranking/traffic results become lessons for the
  agent that owns them. Lessons are evidence-based rules, not opinions.

## Internal links from authority we already have (Edward Sturm playbook, E1173)

Google already tells us which of our pages it associates with a keyword. Concentrate that relevance
on the one page that best satisfies the intent instead of starting from zero.

1. Pick one target keyword and the target page that best satisfies its intent.
2. Find the sources: Google `site:uiuxdesignservices.us "<keyword>"` (WebSearch) for what is indexed, and
   `npm run build && npm run links:find -- "<target path>" "<keyword>" "<variant>"` for every built page
   that mentions it but does not link yet (it prints the section #id and the sentence).
3. On each genuinely relevant source, link the existing sentence (or add one natural sentence) to the
   target. Skip weak matches where the words appear but the topic differs.
4. Anchors: natural entity + attribute / use-case phrasing, varied across sources. Never only exact
   match, never "click here", one link per target per source page.
5. If the relevant text sits deep in a long target page, link to its section: `/services/x/#section-id`.
6. Funnel discipline: link heavily from TOFU/MOFU informational posts; keep BOFU posts and conversion
   paths (contact, pricing CTAs) lean so a ready buyer is not pulled away from the CTA.
7. No page satisfies the intent? Answer who is searching / what they want / what they want to achieve,
   then create the page: keyword in title, slug, H1 and first sentence, intent answered above the fold
   — and immediately give it 2–3 links from already-indexed related pages (steps 2–4).
8. Hub banking: pillar (service) pages may mention and link sub-topics before their posts exist, so the
   hub collects relevance and the new post starts with a head start.
9. Fewer, well-placed, clickable links beat many links. A link nobody would click is not worth adding.

## Competitor topics (out-do, never copy)

- The researcher tracks competitor blogs that rank for our silos in `competitors.json` and their
  best-performing posts. We may write on the same topic when it serves a silo, but our post must be
  original and clearly better: more complete, current, first-hand, with better visuals.
- Never copy or paraphrase a competitor's text, outline order, examples, images or data. QA checks
  overlap with the competitor page (`beats` in the brief) and fails anything above 5%.

## Honesty (hard rules, any breach fails QA)

- No invented statistics, clients, testimonials, awards, ratings, certifications, team
  members or case-study results. Numbers need a named, real, linkable source.
- Real clients and results only from `content/case-studies/*.md`.
- Owner, 2026-10-09: the Apex HCM, Fortna and ToolsGroup case studies were not real and were removed (301 → /case-studies/). Never mention, quote or link those clients, their figures or the old ToolsGroup testimonial again.
- Never claim a local office, local team or local clients for any city.
- Facts about regulations, standards, tools and companies must be current and verifiable.
- "200+ products designed" and "in business since 2017" are confirmed company facts.

## Keywords, meta and entities (owner rule, 2026-10-12, applies to every new page: blog, location, industry, service)

1. **Search volume first.** A page's primary keyword must have verified search volume above 0 (Semrush keyword overview, US database). The brief records `volume`, `kd` and `dataSource` with the date. Never estimate volume. If Semrush has no API units, Google Search Console impressions for the exact query are accepted as evidence (record the figure and date range). If neither source gives a number, do not start writing: the orchestrator stops the run and reports "no volume data" to the owner.
2. **Primary keyword in every meta surface:** the meta title, the meta description, the first meta keyword, og:title and og:description (OG copies title and description, so a title and description that carry the keyword are enough). Also the H1 and the first 60 words. The on-page script checks all of these (`meta-keywords-keyword`, `og-keyword`, `title-keyword`, `desc-keyword`).
3. **Valuable content with high entity salience.** The page's central entity (the primary keyword) leads the page: it is in the H1, in the first 60 words, and in at least 40% of the H2s, and it is mentioned more often than any single related entity. Related entities and attributes come from the brief (`entities`, `attributes`) or the page's `semantic.entities`: at least 80% of the entities and 70% of the attributes appear in the visible text, each used with a real fact or explanation, never as a list of names. The on-page script scores this (`entity-coverage`, `entity-salience` ≥ 75, `attribute-coverage`); a page below that fails QA.

## On-page checklist (owner rule)

Every page follows `docs/content-system/ONPAGE-CHECKLIST.md` (Semrush on-page SEO checklist adapted to
this site). `npm run onpage` scores pages; blog posts publish only at ≥ 95. The `onpage-seo-auditor`
runs daily and turns every gap into a lesson for the writer, QA or researcher.

## Completeness (owner rule)

A post is published only when it is semantically complete: every heading fully answered (bold answer
→ detail → example), every brief point, question and entity covered with substance, no unfinished
paragraph or thin FAQ, every section ends with a next step. QA lists each gap as guidance for the
writer and fails the post until the writer closes them.

## Writing (Koray semantic SEO)

- Each H2 is a question or a clear entity statement; the first sentence under it answers it
  directly and is wrapped in `<strong>` / `**bold**` (extractive answer).
- One central entity per post; mention its attributes, related entities and the n-grams from
  the brief naturally. Main keyword density about 1–2%, never stuffed.
- Expand an abbreviation the first time it appears: "user experience (UX)".
- Boolean questions ("Is…", "Does…", "Can…") are answered starting with Yes or No.
- Banned: "Also,", "As mentioned", "According to" (cite instead), "should know",
  "In today's", "It is important to note", "In conclusion", "delve", "leverage",
  "seamless", "cutting-edge", "world-class". Avoid hedges: might, may, could, perhaps.
- Short paragraphs (2–4 sentences), concrete examples, numbered steps where a process exists,
  a comparison table where two options are compared.
- US English. Reader: product manager, founder or design lead at a US/UK/Canada company.

## Blog post file format (`content/blog/<slug>.md`)

```yaml
---
title: "…"                    # the H1, 45–70 chars, contains the keyword naturally
metaTitle: "…"                # ≤ 60 chars, keyword first; never "UIUXDesignServices.us"
description: "…"              # 140–158 chars
date: 2026-10-05              # set by the publisher on the publish day
updated: 2026-10-05
contributors: [umar-sarwar]   # default; shown as "With Umar Sarwar" and as schema contributor
author: design-team           # team slug: sahar-asif, ahmad-ullah, talha-saleem, faizan-khan,
                              # saliha-shahzad, shahmir-farooq, umar-sarwar, or design-team
type: Guide                   # Guide | Article | Checklist | Comparison
services: [ux-research-services]       # services[0] is the hub; slugs must exist
industries: []                          # optional, slugs must exist
tags: [ux research, user interviews]
keyword: "how to run user interviews"
funnel: tofu                  # tofu | mofu | bofu
takeaways:                    # 3–5 one-line key takeaways (shown in a box above the article)
  - "…"
image: /blog/<slug>/cover.svg # optional cover (1600×600); without it a brand cover is generated
draft: true                   # the pipeline flips this only after QA passes
qa: pending                   # pending | pass | fail  (set by content-qa)
---
```

Body: markdown. Start with a 2–3 sentence summary paragraph, then H2 sections, FAQs
as `## FAQs` with `### Question?` + answer. Images use
`![alt text](/blog/<slug>/<file>.svg "Caption")`.

## Visuals: image first, text version always visible (owner rule 2026-10-06, updated 2026-10-12)

- The owner prefers images over text in blog posts. When a table, checklist, list of steps, framework
  or comparison would make a good infographic, SHOW THE IMAGE and put the same content right below it
  in an `astext` block. Keep writing it as before:

  ```
  ![Descriptive alt text](/blog/<slug>/<name>.svg "Caption")

  <details class="astext"><summary>Show as text</summary>

  | the table / list / steps in markdown |

  </details>
  ```
- Since 2026-10-12 the site renders every `astext` block as an **always-visible** compact text panel
  under the image (lib/content.ts), never collapsed. Reason (owner, "no risk"): Google's layout-aware
  document model (patent US12393768B2) reads pages as visible blocks with position, size and type, and
  checks whether an image matches the text next to it. Content behind a click has no visible block.
- Do not repeat the same items a third time in the open prose: image + its text panel is the one place.
  Every key fact still needs one sentence in the open prose (the bold answer or the section text).
- Overview flows, decision trees, timelines, 2×2s and before/after maps are also welcome.
- Aim for 4–6 inline visuals per post.

## Layout-aware pages (owner rule, 2026-10-12, Google patent US12393768B2)

Google can split a page into blocks by HTML tag, note each block's position, type (header, paragraph,
list, table, image, caption) and text style (size, bold), and judge order and image–text fit. So:

1. **Nothing important behind a click.** Only FAQs and navigation may collapse. Section detail text,
   image text versions and definitions are always visible (`no-hidden-content`).
2. **Right block types:** headings are `h2`/`h3`, steps are `ol`, items are `ul`, comparisons and costs
   are tables, every explanatory image is a `figure` with a `figcaption` (`figure-caption`).
3. **Order:** each H2 is followed by its direct answer in text, never by an image (`h2-then-text`).
   Definition and answer first, details next, FAQ last.
4. **Image–text fit:** an image sits directly after the paragraph it explains, and its caption names
   the same thing as its alt text and file name. Use unique, topic-specific images, never stock.
5. **Tables are introduced:** one sentence before every table says what it compares (`table-intro`).
6. **Bold is a signal:** bold only the direct answer and true key terms, not decoration.
7. **Short, dense section text (owner, 2026-10-12):** on service, industry and location pages the detail
   text under each answer is 50–70 words (90 at most, `section-body-short`). Keep the named entities and
   attributes (places, industries, standards, user roles, tools) and the honesty lines (no local office);
   cut restatements of the answer, generic praise and repeated keyword phrases.

## Files each agent writes

| Agent | Writes |
|---|---|
| seo-keyword-researcher | `content/briefs/<slug>.json` |
| semantic-content-writer | `content/blog/<slug>.md` (draft) |
| content-visual-designer | `public/blog/<slug>/*.svg` + `content/briefs/<slug>.visuals.json` |
| content-link-builder | links inside the post + `related` notes in the brief |
| content-qa | `content/briefs/<slug>.qa.md` report (SEO, links, images, build) |
| fact-checker | `content/briefs/<slug>.facts.md` report (facts, sources, honesty) |
| orchestrator (`/content-pipeline`) | applies fixes and visuals, sets `qa:`, publishes, updates `ledger.json` |
| onpage-seo-auditor | `docs/data/onpage/<date>.md` + safe on-page fixes + lessons for writer/QA/researcher |
| site-seo-auditor | `docs/content-system/audits/<date>.md` + small safe edits + learnings for all agents |
| every agent | its own `docs/content-system/learnings/<agent>.md` |

## Checks every change must pass

```
npm run build && npm run seo:check && npm run lint
```
