# Deploying

You need three things: a Postgres database, an S3-compatible bucket for the
photos, and a host for the app. This guide uses Neon + Cloudflare R2 + Vercel
because all three have a free tier that comfortably runs a new forum.

Total time: about 20 minutes.

---

## 1. Database — Neon

1. Sign up at <https://neon.tech> and create a project (pick the region closest
   to your audience).
2. Copy the **pooled** connection string. It looks like:
   `postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require`
3. Keep it — it becomes `DATABASE_URL`.

Supabase, Railway or a plain Postgres box work identically; only the string changes.

---

## 2. Image storage — Cloudflare R2

R2 charges nothing for egress, which matters when every page is photographs.

1. Cloudflare dashboard → **R2** → *Create bucket* (e.g. `photoforum`).
2. **Settings → Public access** → enable a public r2.dev URL, or connect a custom
   domain like `cdn.your-domain.com` (better: it is cacheable and brandable).
3. **Manage R2 API tokens** → *Create API token* → Object Read & Write, scoped to
   that bucket. Copy the access key ID and secret — the secret is shown once.
4. Note your account ID; the endpoint is
   `https://<account-id>.r2.cloudflarestorage.com`.

Plain AWS S3 also works: leave `S3_ENDPOINT` blank and set `S3_REGION` to the
bucket's real region.

---

## 3. Google sign-in (optional)

Skip this and the button simply does not appear.

1. <https://console.cloud.google.com/apis/credentials> → *Create credentials* →
   OAuth client ID → Web application.
2. Authorised redirect URI: `https://your-domain.com/api/auth/callback/google`
   (add `http://localhost:3000/api/auth/callback/google` too for local work).
3. Copy the client ID and secret.

---

## 4. Deploy to Vercel

1. Push this repository to GitHub.
2. <https://vercel.com/new> → import the repository. Vercel detects Next.js;
   leave the build settings alone.
3. Add these environment variables (Project → Settings → Environment Variables),
   for **Production, Preview and Development**:

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | Neon pooled connection string |
   | `AUTH_SECRET` | `openssl rand -base64 32` |
   | `AUTH_URL` | `https://your-domain.com` |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |
   | `STORAGE_DRIVER` | `s3` |
   | `S3_BUCKET` | `photoforum` |
   | `S3_ENDPOINT` | `https://<account-id>.r2.cloudflarestorage.com` |
   | `S3_REGION` | `auto` |
   | `S3_ACCESS_KEY_ID` | from the R2 token |
   | `S3_SECRET_ACCESS_KEY` | from the R2 token |
   | `NEXT_PUBLIC_UPLOAD_BASE_URL` | `https://cdn.your-domain.com` (your public bucket URL) |
   | `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | optional |

4. Deploy.

`AUTH_URL` and `NEXT_PUBLIC_SITE_URL` must be the final domain. If they point at
a preview URL, sign-in callbacks and every canonical tag point there too.

---

## 5. Create the schema

From your machine, with `DATABASE_URL` set to the production database:

```bash
DATABASE_URL="postgresql://…neon…" npx prisma migrate deploy
```

Optionally seed the gear database and categories (this **wipes** existing data,
so only ever do it on a fresh database):

```bash
DATABASE_URL="postgresql://…neon…" npm run db:seed
```

For a real launch, seed once, then delete the demo threads and members through
the moderation tools and post your own — see `docs/LAUNCH.md`.

---

## 6. Domain and post-deploy checks

1. Vercel → Settings → Domains → add your domain, follow the DNS instructions.
2. Update `AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to the real domain, redeploy.
3. Verify:
   - `https://your-domain.com/robots.txt` names the right sitemap host
   - `https://your-domain.com/sitemap.xml` lists your threads
   - Sign up with a fresh account and upload a photo — the EXIF strip should
     appear under it, and the file should be served from your CDN domain
   - `https://your-domain.com/feed.xml` returns RSS
4. Submit the sitemap in [Google Search Console](https://search.google.com/search-console)
   and [Bing Webmaster Tools](https://www.bing.com/webmasters).

---

## Alternative: any Node host (Railway, Render, Fly, a VPS)

```bash
npm ci
npx prisma migrate deploy
npm run build
npm start           # listens on $PORT, default 3000
```

Set the same environment variables. On a VPS with persistent disk you *can* keep
`STORAGE_DRIVER=local`, but put a CDN in front of `/uploads` and make sure that
directory is on a volume that survives redeploys.

---

## Ongoing operations

- **Migrations**: commit the generated files under `prisma/migrations/` and run
  `prisma migrate deploy` as part of your release step.
- **Backups**: Neon keeps point-in-time restore on paid tiers; on the free tier
  schedule your own `pg_dump`.
- **Cost shape**: the database and the image bandwidth are what grow. Because
  the browser is served 400px and 1600px WebP derivatives rather than originals,
  a typical thread view costs a few hundred kilobytes, not tens of megabytes.
