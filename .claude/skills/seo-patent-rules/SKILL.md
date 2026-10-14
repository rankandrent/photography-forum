---
name: seo-patent-rules
description: Owner's SEO content rules distilled from search patents (US8126832B2 concept bindings, US12393768B2 layout-aware pages, US6285999 PageRank links). Apply to EVERY new web page, blog post, landing, service, industry or location page in ANY project - keyword research, briefs, writing, internal links, QA and on-page audits. Use whenever creating, briefing, writing, reviewing or auditing website content for search.
---

# SEO patent rules (owner rules, all projects)

The owner wants these rules applied to every new page in every project. They come from three patents
the owner shared. A patent shows how a system *can* work, not proof that Google ranks this way, so
treat them as good writing and structure rules, never as tricks. Honesty rules always win: no invented
stats, clients, reviews, awards, offices or claims.

Existing live pages are not rewritten for these rules unless the owner asks. New pages must meet all of them.

## 0. Keyword and meta basics (owner)
- The primary keyword has verified search volume above 0 (Ahrefs, Semrush or Search Console; record
  volume, KD, source and date). Never estimate. No data → stop and tell the owner.
- The primary keyword is in the meta title, the meta description, the FIRST meta keyword, og:title,
  og:description, the H1 and the first 60 words.
- Entity coverage ≥ 80% of the brief's entities, attribute coverage ≥ 70%, and the central entity
  leads the page (H1, first 60 words, ≥ 40% of H2s, mentioned more than any other entity).

## 1. Concept bindings (US8126832B2, "Artificial intelligence system", Cognitive Code)
The system turns words into concepts: root forms (walked → walk), synonyms (canine → dog), composite
concepts (Central + Park → Central Park), weighted "essential" concepts, context to choose between
meanings ("bear" the animal vs to tolerate), and many phrasings of one intent mapped to one answer.
1. **Binding table in the brief** for the central entity: synonyms (2–4), plural/variants, parent
   (1–2, broader concept, usually the hub/service page), children (3–6 sub-types or parts), related
   (3–6 co-occurring concepts). All are literal phrases the page will print. Use each synonym at least
   once; name the parent in the intro; give each child its own H3, list item or table row.
2. **Composite concepts stay whole.** Terms of art ("e-commerce UX audit", "Core Web Vitals") are
   never split or reordered and are defined in one sentence when first used.
3. **Essential concepts first.** Mark 2–3 essential concepts (central entity + key attribute +
   qualifier such as city or industry). The first sentence under every H2 names the central entity (or
   a synonym) plus at least one other essential concept.
4. **Disambiguate.** Every ambiguous word ("audit", "design", "testing", a city sharing its name) has a
   context word in the same sentence that fixes the meaning.
5. **One intent, one answer, site-wide.** List 3–5 query variants of the main question; the H2s/FAQ cover
   them with ONE answer. Prices, timelines, team sizes and deliverables match the hub page and every
   other page; on a conflict follow the hub and report it, never publish a third version.
6. **Suitability check (QA fails the page)** if a synonym, the parent or an essential concept is missing,
   an H2 opener lacks entity + essential concept, a composite concept is split, an ambiguous word lacks
   context, a query variant is unanswered, or a fact contradicts the hub page.

## 2. Layout-aware pages (US12393768B2, LAMPreT layout model)
The model reads a page as blocks with position, size, type (heading, paragraph, list, table, image,
caption) and style, and checks order and image–text fit.
1. Nothing important behind a click: only FAQs and navigation may collapse.
2. Right block types: h2/h3 headings, ol for steps, ul for items, tables for comparisons/costs, every
   explanatory image is a `figure` with a `figcaption`.
3. Each H2 is followed by its direct answer in text, never by an image. Definition/answer first,
   details next, FAQ last.
4. An image sits right after the paragraph it explains; caption, alt text and file name name the same
   thing. Unique topic images only, no stock.
5. One sentence introduces every table.
6. Bold only the direct answer and true key terms.
7. Section detail text 50–70 words (90 max) on service/industry/location pages.
8. Infographics are landscape (1200 wide, ≤ 800 tall), smallest text ≥ 38px, so they are short and
   readable on desktop and phones.

## 3. Links (US6285999, PageRank)
A page's importance flows from the pages that link to it, split across each page's outgoing links.
1. No orphan pages: every new page gets at least one contextual link from an existing, relevant,
   well-linked page (its hub/parent) in the same publish.
2. Links follow the bindings: up to the parent, across to siblings, down to children that have pages.
   Anchors name the target's concept or a synonym, never "click here".
3. Keep links purposeful: a few relevant contextual links beat long link lists; don't dilute strong
   pages with unrelated links.
4. External citations only to primary, trustworthy sources that back a stated fact.

## How to apply in a project
- If the project has its own content rules or agents (e.g. `docs/content-system/RULES.md`,
  `.claude/agents/`), follow those AND this skill; where they conflict, the stricter rule wins and the
  honesty rules beat everything.
- Report in the owner's language (Roman Urdu when the owner writes in it).
