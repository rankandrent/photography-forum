---
name: content-pipeline
description: Agentic content team. You are the orchestrator - turn a goal ("2 posts for UX research", "fill gaps in SaaS cluster") into shipped blog posts by coordinating research, build and review agents in parallel with a repair loop. Use when asked to create, write or publish blog posts / new content.
---

# Agentic content pipeline — you are the orchestrator

```
goal ─▶ orchestrator (you) ─┬─ RESEARCH  keyword researcher × N posts (parallel)
                            ├─ BUILD     writer ─▶ visual designer ∥ link builder (parallel)
                            ├─ REVIEW    content-qa ∥ fact-checker (parallel)
                            │            └─ FAIL → route fixes to the owning agent → review again (≤ 2 loops)
                            └─ SHIP      publish, backlinks, build checks, deploy, ledger
```

Read `docs/content-system/RULES.md`, `ledger.json` and `fingerprints.json` first. Every agent
reads its own `learnings/<agent>.md`; remind each one in its prompt.

## Daily cadence (owner instruction, 2026-10-06)
Publish **1 post per day** until every service hub in `content/services/` has **10 published posts**
(`services[0]`). A daily run = goal "1 post for the hub with the fewest published posts" (ties: the
hub with the highest lead value; skip hubs whose last post was published in the last 3 days only if
another hub is equally low). Never publish two posts on the same day. Stop the daily runs once every
hub has 10.

## 1. Plan the goal
- Arguments: a goal in plain words, a hub slug, or nothing. With nothing, the goal is
  "1 post for the hub with the fewest published posts" (count `services[0]` in `content/blog/*.md`).
- Turn the goal into N post jobs (default 1, max 3 per run), each with a hub and an angle.
  Two jobs never share a hub in the same run (prevents overlapping keywords). Prefer the silo with
  the biggest coverage gap and the highest lead value.
- Record the plan in the ledger under `runs` (date, goal, jobs).

Goals can name competitor mode: "competitor topics for SaaS UX" → researchers run competitor-gap
mode first and brief the strongest competitor topic for each silo.

## 2. RESEARCH — parallel
Launch one `seo-keyword-researcher` per job in a single message (parallel Agent calls). Each writes
`content/briefs/<slug>.json`. Then compare the briefs with each other: if two keywords overlap in
intent, drop or re-brief one. Drop any job whose researcher found no safe keyword.

## 3. BUILD — writer, then designer ∥ link builder
Per job (jobs run in parallel with each other):
1. `semantic-content-writer` → `content/blog/<slug>.md` (draft, with visual/link/source markers).
2. In one message, launch `content-visual-designer` and `content-link-builder` in parallel.
   The designer writes SVGs + `content/briefs/<slug>.visuals.json`; the link builder edits links.
3. When both finish, swap every visual marker in the post for its markdown from `visuals.json`.

## 4. REVIEW — parallel, with a repair loop
1. In one message, launch `content-qa` and `fact-checker` for the post.
2. Apply every exact FIX/replacement they list.
3. If either says `VERDICT: FAIL`, route each problem to its owner — wording/structure → writer,
   images → designer, links/sources → link builder, false claims → writer with the fact-checker's
   replacement, and QA's "Guidance for the writer" (completeness gaps) → writer, item by item — then run both reviewers again. Max 2 loops; then leave the post as a draft with
   `qa: fail` and report what is left.
4. Both PASS → set `qa: pass` in the frontmatter.

## 5. SHIP (only `qa: pass` posts)
1. `draft: false`, `date` and `updated` = today (UTC).
2. Apply the brief's `backlinkSuggestions` (2–3 contextual links from already-indexed relevant pages,
   varied anchors, section jump links where deep). Verify with
   `npm run links:find -- "/blog/<slug>/" "<keyword>"` after the build and skip weak matches.
3. `npm run build && npm run seo:check && npm run lint` — all must pass with 0 errors.
4. Commit post, `public/blog/<slug>/`, `content/briefs/<slug>*`, backlink edits and the ledger as
   `Publish post: <title>`, then deploy: the live site builds from `main` of
   github.com/rankandrent/uiuxdesignservices.us (Cloudflare Workers Builds). In a checkout where that
   repo is the remote `site`: `git fetch site main && git merge --ff-only site/main` before committing,
   then `git push site HEAD:main` (and push the session's working branch too if it has one).
5. Update `ledger.json` → `posts[]`: slug, hub, keyword, date, words, images, links, qa loops;
   and append the post's fingerprint to `fingerprints.json` (fields listed there).
6. If any review loop was needed, make sure the owning agents wrote their lessons.
7. Report: shipped URLs, keywords, QA/fact verdicts, loops used, anything left as a draft.
