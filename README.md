# uiuxdesignservices.us

A Next.js (App Router) site exported as static HTML (`out/`). Every page type is one template. Content lives in `content/`, and internal links, the sitemap, schema and breadcrumbs are generated from it.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site → out/
npm run seo:check    # audit out/ (h1, titles, descriptions, canonical, og:image, JSON-LD, broken links)
npm run lint && npm run typecheck
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORM_ENDPOINT`. Every lead form (the hero, the final CTA, `/contact`, the lead magnet and the newsletter) posts JSON to that URL. Formspree, Web3Forms, HubSpot and a Zapier webhook all work.

## Adding pages

| Page type | Add a file | URL |
|---|---|---|
| Service | `content/services/<slug>.json` (copy `_template.json`) | `/services/<slug>/` |
| Industry | `content/industries/<slug>.json` (copy `_template.json`) | `/industries/<slug>/` |
| Case study | `content/case-studies/<slug>.md` (copy `_template.md`) | `/case-studies/<slug>/` |
| Blog post | `content/blog/<slug>.md` (copy `_template.md`) | `/blog/<slug>/` |
| Static page | `content/pages/<slug>.md` | `/<slug>/` |

- The file name is the slug. Files that start with `_` are ignored, and `draft: true` keeps a post or case study unpublished.
- **Linking is automatic.** A case study or post with `services: [ux-design]` shows up on the UX design service page, links back to it, and appears under "related" on sibling pages. A service's `relatedIndustries` and an industry's `relatedServices` link both ways.
- Sections without data are not rendered. A service with no `faqs` has no FAQ block and no FAQPage schema.
- `headings` in a service or industry JSON overrides any generated H2, so you can use your own keyword headings.
- Home page copy lives in `content/home.ts`.

## Writing a page from a Koray-style content brief

Service and industry JSON files accept a full semantic content brief. See `content/services/_template.json`, and `content/services/ux-audit-services.json` for a worked sample.

| Brief item | JSON field | Where it shows |
|---|---|---|
| Central entity | `centralEntity` | WebPage schema `about` |
| Source context | `sourceContext` | writer note only, not rendered |
| Main query / anchor | `anchor` | anchor text of every link to the page (menus, cards, chips) |
| H1 | `hero.h1` (title tag: `metaTitle`) | hero |
| Abstractive summary | `abstract` | "In short" block under the hero |
| Heading vector (H2 order) | `sections[]` | rendered top to bottom in this order |
| Extractive answer per H2 | `sections[].answer` | first sentence under the H2 |
| Content format | `sections[].format`: `paragraph`, `list`, `steps`, `table`, `cards` or `faq` | layout of the section |
| H3s | `sections[].h3s` | under the H2 |
| EAV values | inside `items`, `rows`, `answer` | lists, tables, answers |
| Visual semantics | `sections[].image {src, alt, caption}`, table `caption` and `columns` | `<figure>`, `<figcaption>`, semantic `<table>` |
| Internal links | inline `<a>` in `body`, plus `sections[].links` | contextual links and chips |
| Contextual border | leave it out of the page and link to the page that owns it | |
| FAQs | `faqs` and/or `format: "faq"` sections | FAQ block + FAQPage schema |
| Freshness | `updated` | sitemap `lastmod` + `dateModified` |
| Boilerplate control | `blocks` (turn shared blocks off), `cta` (page-specific CTA copy) | |

Once a page has `sections`, the generic templated sections are no longer generated. `npm run seo:check` warns about thin main content (under 600 words), templated H2s repeated across pages, one page linked with several different anchors, and pages without images.

Services are grouped by `category` (Research & strategy, Product design, Platforms, Dashboards & data, Industry-specific). The mega menu, the footer, the services catalog and the "related services" block all use this grouping.

## SEO built in

- Per-page `<title>`, meta description, canonical URL (with trailing slash), Open Graph and Twitter tags.
- A generated 1200×630 share image for every page, written to `/og/**.png`.
- JSON-LD: Organization + WebSite (site-wide), Service, FAQPage and HowTo (service pages), Article (blog posts and case studies), and BreadcrumbList (every inner page).
- `sitemap.xml` and `robots.txt` are generated from content. Drafts, placeholder pages and `noindex` pages are left out.
- One H1 per page, semantic landmarks, a skip link, self-hosted fonts (`next/font`, no layout shift) and static HTML.
- `npm run seo:check` fails the build if any page is missing an H1, title, description, canonical or og:image, has invalid JSON-LD, or has a broken internal link. It warns on title/description length and on duplicates.

## Before launch

- Replace the placeholder client names, testimonials, team members, awards and ratings in `content/home.ts` and the seed case studies. They came with the design draft.
- Fill in `content/pages/about|privacy|terms.md` and remove `noindex: true`.
- Set `SITE.email` and `SITE.sameAs` (LinkedIn, Clutch, G2 …) in `lib/site.ts`.
- Add client logos to `public/logos/` as SVG, or as PNG about 72px tall on a transparent background. Use the file names in `content/home.ts` (`clients.items`). Until a file exists the client name shows as text in the logo loop.
- Add real images to `public/`, and submit `sitemap.xml` in Google Search Console.

## Deploy on Cloudflare (Workers + static assets)

`wrangler.jsonc` tells Cloudflare to upload the static `out/` folder. No server adapter (OpenNext) is used or needed.

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → `rankandrent/uiuxdesignservices.us`.
2. Build settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: `/`
3. **Settings → Build → Variables and secrets** (read at build time):
   - `NEXT_PUBLIC_SITE_URL` = `https://uiuxdesignservices.us`
   - `NEXT_PUBLIC_FORM_ENDPOINT` = your form endpoint URL
4. Every push to `main` rebuilds and redeploys.
5. Custom domains are declared in `wrangler.jsonc` (`routes`), so every deploy attaches `uiuxdesignservices.us` and `www.uiuxdesignservices.us`, with DNS and SSL. If a deploy fails because a DNS record already exists, delete the old `@` or `www` record under **DNS → Records** and retry.
6. Add a **Rules → Redirect Rules** "Redirect from WWW to root" rule (301), and turn on **SSL/TLS → Edge Certificates → Always Use HTTPS**.

`public/_headers` sets long-lived caching for hashed assets and OG images, plus basic security headers. The Worker name in `wrangler.jsonc` must match the Cloudflare project name.
