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
- Add real logos and images to `public/`, and submit `sitemap.xml` in Google Search Console.

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
5. **Settings → Domains & Routes → Add → Custom domain** → `uiuxdesignservices.us` (and `www.uiuxdesignservices.us`).

`public/_headers` sets long-lived caching for hashed assets and OG images, plus basic security headers. The Worker name in `wrangler.jsonc` must match the Cloudflare project name.
