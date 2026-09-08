# SEO

Forums live or die on search traffic. Most of a mature forum's visitors arrive on
a thread page from Google, not through the homepage. This document covers what is
already built (on-page) and what only you can do (off-page).

---

## On-page — already implemented

| Element | Where | Notes |
| --- | --- | --- |
| Title templates | `src/app/layout.tsx` | `%s · ApertureTalk` |
| Per-page titles & descriptions | every `generateMetadata` | thread descriptions are the first 155 characters of the post |
| Canonical URLs | every page | built from `NEXT_PUBLIC_SITE_URL` |
| `DiscussionForumPosting` JSON-LD | `/t/[slug]` | includes author, dates, reply count, vote count and the first 20 comments |
| `BreadcrumbList` JSON-LD | thread and category pages | drives the breadcrumb trail in results |
| `Product` JSON-LD | `/gear/[slug]` | brand, description, a real sample image |
| `ProfilePage` / `Person` JSON-LD | `/u/[username]` | |
| `WebSite` + `SearchAction` | layout | enables the sitelinks search box |
| `sitemap.xml` | `src/app/sitemap.ts` | threads, categories, tags, gear, challenges, profiles; revalidates hourly |
| `robots.txt` | `src/app/robots.ts` | blocks `/search`, `/new`, `/login`, `/notifications`, `/moderation`, `/api` |
| RSS feed | `/feed.xml` | 50 newest threads, linked from `<head>` and the footer |
| Open Graph / Twitter cards | layout + thread pages | a thread's own photo, or a generated card from `/og` |
| `max-image-preview:large` | robots meta | large thumbnails in results — significant for a photo site |
| Server-rendered content | all pages | every thread and reply is in the HTML, no client-only rendering |
| Fixed image dimensions | all image components | protects Cumulative Layout Shift |
| Semantic headings | all pages | one `h1` per page; post Markdown starts at `h2` |

### Why some pages are excluded from the index

`/search` generates unbounded near-duplicate URLs, and `/new`, `/login`,
`/notifications` and `/moderation` have nothing to rank for. Letting Google crawl
them wastes crawl budget that should go to threads.

---

## Before you launch — a 30-minute checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the final domain. Everything canonical derives
   from it; getting this wrong is the single most common self-inflicted SEO wound.
2. Change `site.name`, `site.tagline`, `site.description` and `site.twitter` in
   `src/lib/site.ts`.
3. Pick **one** hostname (`https://example.com`, not both `www` and apex) and
   301-redirect the other at the DNS/host level.
4. Verify the domain in Google Search Console and Bing Webmaster Tools; submit
   `/sitemap.xml` in both.
5. Test three thread URLs in the
   [Rich Results Test](https://search.google.com/test/rich-results) — you should
   see `DiscussionForumPosting` recognised.
6. Run PageSpeed Insights on a thread page with photos, not on the homepage.
7. Add a `favicon.ico` and `app/apple-icon.png` (not included — they should carry
   your brand).

---

## Writing threads that rank

The code cannot do this part. What actually moves a forum in search:

- **Titles are queries.** "Why are my indoor portraits soft at f/1.8?" ranks;
  "help pls" does not. Rewrite bad titles as a moderator — it is the highest-value
  moderation action there is.
- **Answer the question in the thread.** Google surfaces threads where the
  accepted answer is substantial. The "accept as answer" feature exists to make
  that reply visible to both readers and crawlers.
- **One topic per thread.** Threads that wander rank for nothing.
- **Gear pages are your long tail.** "Sony a7 IV sample photos", "Nikon Z 6II low
  light" — these have real volume and almost no good pages behind them. Every
  upload with EXIF strengthens one automatically. Add a paragraph of genuine
  editorial to each gear page's `description` and they become your best entry pages.
- **Internal links matter.** Threads already link to categories, tags, gear and
  profiles. Add links from gear descriptions back to the best threads about them.

---

## Off-page — this is marketing, not code

No repository can generate backlinks. What works for a new photography forum,
roughly in order of return:

1. **Be useful somewhere else first.** Answer photography questions on Reddit
   (r/photography, r/AskPhotography), Quora and Facebook groups properly, without
   linking. Link only when a thread on your forum genuinely answers it better.
   Drive-by link dropping gets you banned and does nothing for rankings.
2. **Seed with real expertise.** 25–30 substantial threads before launch, written
   by people who know the subject. This is also what makes the forum survive its
   first month — see `docs/LAUNCH.md`.
3. **Weekly challenge as a link magnet.** Participants share their entries; each
   share is a natural link. Publish a results page every week.
4. **Local and niche directories.** Photography association listings, local
   business directories, university photography club pages.
5. **Gear reviews with your own sample images.** Manufacturers, retailers and
   review aggregators link to original sample galleries. Your gear pages generate
   these for free.
6. **Guest posts and podcast appearances** in the photography space, with the
   forum in the bio.
7. **Do not buy links.** Paid link networks are the fastest route to a manual
   penalty, and a penalised new domain is easier to abandon than to recover.

---

## Measuring

- Search Console: watch *impressions* first, not clicks. A new site gets
  impressions weeks before clicks.
- Track which thread titles earn impressions and write more of that shape.
- Watch Core Web Vitals for the thread template specifically — it is the page
  type that carries the images.
- Expect three to six months before organic traffic is meaningful. Forums compound
  slowly and then quickly.
