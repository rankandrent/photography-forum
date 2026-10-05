---
name: content-pipeline
description: Runs the full blog content team for one post — keyword research, semantic writing, infographic visuals, internal/external linking, QA gate, then publish. Use when asked to create, write or publish a blog post / new content for a service.
---

# Content pipeline (one post per run)

Arguments: a service hub slug (`/content-pipeline ux-research-services`) or a topic. With no argument,
pick the hub with the fewest published posts (count `services[0]` across `content/blog/*.md`).

Read `docs/content-system/RULES.md`. Then run these agents **in order**, each with the Agent tool,
passing the slug and the files the previous step produced. Wait for each to finish and read its
report before starting the next.

1. `seo-keyword-researcher` → `content/briefs/<slug>.json`. Stop and report if no keyword passes the
   cannibalisation check.
2. `semantic-content-writer` → `content/blog/<slug>.md` (draft).
3. `content-visual-designer` → `public/blog/<slug>/*.svg` placed in the post.
4. `content-link-builder` → internal + external links, backlink suggestions in the brief.
5. `content-qa` → `content/briefs/<slug>.qa.md` and `qa: pass|fail`.
   - On `fail`: send the FAIL list back to the agent that owns each problem (writer, designer or
     link builder), then run QA again. At most 2 repair rounds; after that stop, leave the post as a
     draft and report the remaining problems to the user.

## Publish (only when `qa: pass`)

1. In the post set `draft: false`, `date` and `updated` to today (UTC).
2. Apply the brief's `backlinkSuggestions` (one sentence + link on 1–3 existing pages).
3. `npm run build && npm run seo:check && npm run lint` — all must pass (0 errors).
4. Commit `content/blog/<slug>.md`, `public/blog/<slug>/`, `content/briefs/<slug>*` and the
   backlink edits with message `Publish post: <title>`, then push the way this repo deploys
   (see the repo instructions / CLAUDE.md for the deploy remote and branch).
5. Report to the user: URL `/blog/<slug>/`, keyword, word count, images, links, QA summary.
