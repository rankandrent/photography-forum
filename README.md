# ApertureTalk — a photography forum

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frankandrent%2Fphotography-forum&env=DATABASE_URL%2CAUTH_SECRET%2CAUTH_URL%2CNEXT_PUBLIC_SITE_URL%2CSTORAGE_DRIVER%2CNEXT_PUBLIC_UPLOAD_BASE_URL%2CS3_BUCKET%2CS3_ENDPOINT%2CS3_REGION%2CS3_ACCESS_KEY_ID%2CS3_SECRET_ACCESS_KEY&envDescription=Database%2C%20auth%20secret%20and%20S3-compatible%20image%20storage&envLink=https%3A%2F%2Fgithub.com%2Frankandrent%2Fphotography-forum%2Fblob%2Fmain%2Fdocs%2FDEPLOY.md&project-name=photography-forum&repository-name=photography-forum)

Clicking that imports this repository into Vercel and prompts for every
environment variable the app needs. It cannot finish on its own: create the
Postgres database and the image bucket first, and run `prisma migrate deploy`
after the build — [`docs/DEPLOY.md`](docs/DEPLOY.md) walks through all of it.

A complete, working discussion forum built for photographers: threads and
replies, structured photo critique, EXIF read automatically off every upload, a
gear database that fills itself from that EXIF, and a weekly photo challenge.

Next.js 16 (App Router) · TypeScript · PostgreSQL + Prisma 7 · Auth.js v5 ·
Tailwind CSS v4 · sharp + exifr.

---

## Quick start

```bash
npm install
cp .env.example .env          # then edit DATABASE_URL and AUTH_SECRET
npx prisma migrate dev        # create the schema
npm run db:seed               # 8 members, 15 threads, 24 gear items, 3 challenges
npm run dev                   # http://localhost:3000
```

Sign in with any seeded account — `admin@example.com` / `password123`
(`admin` is an ADMIN, `hira` is a MOD, the rest are regular members).

Need a database? The fastest local option:

```bash
docker run -d --name photoforum-db -p 5432:5432 \
  -e POSTGRES_USER=forum -e POSTGRES_PASSWORD=forum -e POSTGRES_DB=photoforum \
  postgres:16
```

### Generate `AUTH_SECRET`

```bash
openssl rand -base64 32
```

---

## What is built

**Forum core**
- Email/password accounts plus optional Google sign-in (hidden until configured)
- Six categories, threads, threaded replies one level deep
- Up/down voting on threads and replies, with optimistic UI
- "Accept as answer" — the thread author marks the reply that solved it
- Tags, tag pages, pagination, four sort orders (latest / newest / top / unanswered)
- Full-text-ish search across thread titles, bodies, replies and tags
- In-app notifications for replies, critiques, accepted answers and upvotes
- Reporting, a moderator queue, pin/lock/delete, and admin role management
- Markdown posts rendered through an escape-first renderer (no HTML injection path)
- Member directory and public profiles with kit, stats and recent photos

**Photography-specific**
- **EXIF on every upload** — camera, lens, focal length, aperture, shutter, ISO
  and capture date are read from the original bytes and shown under the photo
- **Critique mode** — ratings for composition, lighting and editing plus a
  minimum-length written note, with per-photo averages
- **Gear database** — 24 seeded bodies, lenses, lights and accessories; uploads
  are matched to gear by EXIF model string, so each gear page fills with real
  member samples automatically. Members can mark what is in their kit.
- **Weekly challenges** — themed rounds with submissions, a voting phase and a
  podium when they close

**Image pipeline**
- Validates type and size, honours EXIF orientation, then writes three
  derivatives: original, 1600px WebP for display, 400px WebP for thumbnails
- GPS coordinates are deliberately not stored
- Pluggable storage: local disk in development, any S3-compatible bucket in
  production (`src/lib/storage.ts` is the only file that changes)

**SEO** — see [`docs/SEO.md`](docs/SEO.md) for the full picture
- Per-page titles, descriptions and canonical URLs
- `DiscussionForumPosting`, `BreadcrumbList`, `Person`, `Product` and `WebSite`
  JSON-LD
- Dynamic `sitemap.xml` covering every thread, category, tag, gear page and
  profile; `robots.txt`; RSS feed at `/feed.xml`
- Open Graph and Twitter cards, with a generated OG image for threads with no photo
- Thin pages (`/search`, `/new`, `/login`, moderation) excluded from the index

**Accessibility and UX**
- Light/dark themes with no flash of the wrong one on first paint
- Skip link, visible focus rings, labelled controls, `aria-live` on vote counts
- Fixed aspect ratios on every image so the layout never jumps while loading

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | `prisma generate` + production build |
| `npm start` | Run the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:migrate` | Create and apply a migration |
| `npm run db:seed` | Wipe and reseed with demo content |
| `npm run db:studio` | Prisma Studio |
| `npm run check:exif` | Smoke-test the upload pipeline (EXIF + gear matching) |
| `npm run check:e2e` | Browser end-to-end pass over the main flows |

`check:e2e` needs the app running (`npm run build && npm start`) and Playwright's
Chromium. On an image that ships one, point at it:
`CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run check:e2e`.

---

## Deploying

Step-by-step instructions for Vercel + Neon + Cloudflare R2 are in
[`docs/DEPLOY.md`](docs/DEPLOY.md). The short version:

1. Create a Postgres database (Neon) and copy its connection string.
2. Create an S3-compatible bucket (Cloudflare R2) and an API token.
3. Import this repository into Vercel, set the environment variables from
   `.env.example`, and deploy.
4. Run `npx prisma migrate deploy` against the production database.

**Production must set `STORAGE_DRIVER=s3`.** With `local`, uploads are written to
the container filesystem and disappear on the next deploy.

---

## Project layout

```
prisma/
  schema.prisma        Data model
  seed.ts              Demo content — generates its own images, works offline
src/
  actions/             Server actions (all mutations live here)
  app/                 Routes; sitemap.ts, robots.ts, feed.xml, og image route
  components/          UI; client components are marked "use client"
  lib/
    auth.ts            Auth.js configuration
    exif.ts            EXIF reading and formatting
    gear.ts            EXIF model string -> gear row matching
    markdown.ts        Escape-first Markdown renderer
    photos.ts          Upload validation, resizing, derivative generation
    storage.ts         Local disk / S3 driver — the only storage-aware file
    prisma.ts          Prisma client with the pg driver adapter
scripts/               Smoke tests
docs/                  Deploy, SEO and launch playbooks
```

---

## Things to know before you launch

- **Legal pages are templates.** `/terms`, `/privacy` and `/copyright` are
  written for a photography forum but must be reviewed for your jurisdiction,
  and you need to add a real takedown contact address.
- **Search will need upgrading.** `contains` with `mode: "insensitive"` is an
  `ILIKE` scan. It is fine to a few thousand threads; past that, add a
  `tsvector` column with a GIN index, or use Meilisearch/Typesense.
- **Seed before you invite anyone.** An empty forum reads as dead. `docs/LAUNCH.md`
  covers what to post before opening the doors.
