# On-page SEO checklist (every page: blog, services, industries, locations, case studies)

Based on Semrush's on-page SEO checklist (semrush.com/blog/on-page-seo-checklist/), adapted to this
site's content files. `npm run build && npm run onpage` scores every indexable page against the
automatable items; the `onpage-seo-auditor` agent reviews the rest. Owner: the auditor; followed by
the writer, enforced by QA.

| # | Item | Rule on this site | Where it lives | Auto-checked |
|---|---|---|---|---|
| 1 | Target keyword | One primary keyword per page, matched to intent; no two pages share it | blog `keyword:`, service/industry `anchor`, location `keyword` | partly |
| 2 | Title tag | 30–60 chars, primary keyword near the start, compelling, unique; never "UIUXDesignServices.us" | `metaTitle` | ✅ |
| 3 | H1 | One H1, contains the keyword near the start, says plainly what the page is | blog `title`, `hero.h1` | ✅ |
| 4 | Meta description | 120–158 chars, keyword natural, what the reader gets, what makes us different, a next step | `metaDescription` / `description` | ✅ |
| 5 | URL slug | Keyword, 3–5 words, readable, no dates or stop-word padding | file name | ✅ |
| 6 | Heading structure | H2s for each subtopic (≥ 3), H3s under them; every H2 opens with a direct answer | `sections[].h2`, markdown `##` | ✅ count |
| 7 | Helpful, unique content | Answers the query fully (see Completeness in RULES.md), first-hand agency process, examples, keyword in the first 100 words | body | depth + first-100 |
| 8 | Internal links | ≥ 5 contextual links out on content pages, ≥ 3 pages linking in; descriptive varied anchors; important pages linked most | body, `links` | ✅ |
| 9 | Visuals | Original infographics (image first, text in "Show as text"), descriptive alt text, ≥ 3 per blog post | `public/blog/<slug>/` | ✅ count + alt |
| 10 | Schema markup | BlogPosting / Service / FAQPage / BreadcrumbList / Person as fits the page | templates | ✅ presence |
| 11 | E-E-A-T | Real author + collaborator with role and LinkedIn, case-study proof, sources cited, updated date | frontmatter, author box | manual |
| 12 | Featured snippets / AI answers | Each section answers its question in the first sentence (≤ 30 words), then detail; lists/tables for steps and comparisons | body | manual |
| 13 | External sources | ≥ 2 authoritative sources on blog posts, verified | body | ✅ (blog) |
| 14 | Image weight & speed | SVG/WebP, < 150 KB per image, no layout shift, LCP < 2.5 s | `public/` | manual |
| 15 | Canonical & OG | Canonical and Open Graph image on every page | templates | ✅ |
| 16 | Freshness | `updated:` changes only when content really changed; review facts every 6 months | frontmatter | manual |

Score: `docs/data/onpage/latest.json` (0–100 per page). Pages under 90 are fixed first.
