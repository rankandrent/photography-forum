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
| content-visual-designer | `public/blog/<slug>/*.svg` + image tags in the post |
| content-link-builder | links inside the post + `related` notes in the brief |
| content-qa | `content/briefs/<slug>.qa.md` report + `qa:` field |
| site-seo-auditor | `docs/content-system/audits/<date>.md` + small safe edits |

## Checks every change must pass

```
npm run build && npm run seo:check && npm run lint
```
