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

## Lead focus (the goal of every post is a qualified lead)

- Pick topics a buyer of the hub service searches (commercial-investigation and problem-aware
  informational queries). Score each candidate's **service-support 1–5**; publish only 4–5.
  Pure top-of-funnel trivia that never leads to hiring the service scores 1–2: skip it.
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

## Honesty (hard rules, any breach fails QA)

- No invented statistics, clients, testimonials, awards, ratings, certifications, team
  members or case-study results. Numbers need a named, real, linkable source.
- Real clients and results only from `content/case-studies/*.md`.
- Never claim a local office, local team or local clients for any city.
- Facts about regulations, standards, tools and companies must be current and verifiable.
- "200+ products designed" and "in business since 2017" are confirmed company facts.

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
author: "Design Team"
type: Guide                   # Guide | Article | Checklist | Comparison
services: [ux-research-services]       # services[0] is the hub; slugs must exist
industries: []                          # optional, slugs must exist
tags: [ux research, user interviews]
keyword: "how to run user interviews"
draft: true                   # the pipeline flips this only after QA passes
qa: pending                   # pending | pass | fail  (set by content-qa)
---
```

Body: markdown. Start with a 2–3 sentence summary paragraph, then H2 sections, FAQs
as `## FAQs` with `### Question?` + answer. Images use
`![alt text](/blog/<slug>/<file>.svg "Caption")`.

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
| site-seo-auditor | `docs/content-system/audits/<date>.md` + small safe edits + learnings for all agents |
| every agent | its own `docs/content-system/learnings/<agent>.md` |

## Checks every change must pass

```
npm run build && npm run seo:check && npm run lint
```
