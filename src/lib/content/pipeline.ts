import { prisma } from "@/lib/prisma";
import { uniqueSlug, slugify } from "@/lib/slug";
import { generateDraft } from "@/lib/content/generate";
import { activeProvider } from "@/lib/content/providers";

/**
 * One run of the pipeline: take the next queued keywords, draft a post for
 * each, publish it under the owner's account.
 *
 * Publishing is immediate rather than gated on approval — the owner reviews at
 * /admin/content afterwards. The daily cap is the safety rail that replaces the
 * approval step: a forum that gains two threads a day is a publication, one
 * that gains two hundred is what Google's scaled-content-abuse policy is for.
 */

/**
 * Two separate limits, for two separate reasons.
 *
 * `DAILY_CAP` is the editorial one: a forum that gains a couple of threads a
 * day is a publication; one that gains two hundred is what Google's
 * scaled-content-abuse policy exists for. It is the rail that replaces the
 * approval step the owner opted out of.
 *
 * `RUN_BATCH` is the mechanical one: a post takes a minute or two because
 * Claude runs live web searches, and a serverless function on Vercel's hobby
 * plan is killed at 300s. One post per invocation stays well inside that.
 */
export const DAILY_CAP = 2;
export const RUN_BATCH = 1;

/** Never throws: a failure row must be writable even when no key is set. */
function activeProviderName(): string {
  try {
    return activeProvider();
  } catch {
    return "unconfigured";
  }
}

export type RunResult = {
  attempted: number;
  published: { keyword: string; slug: string }[];
  failed: { keyword: string; error: string }[];
  skipped: string | null;
};

/** The account every generated thread is attributed to. */
async function authorAccount() {
  const username = process.env.AUTOMATION_AUTHOR_USERNAME;
  if (!username) {
    throw new Error(
      "AUTOMATION_AUTHOR_USERNAME is not set — the pipeline publishes under a real account you control, so it needs to know which one.",
    );
  }
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, username: true },
  });
  if (!user) throw new Error(`No member with username "${username}".`);
  return user;
}

export async function runPipeline(batch = RUN_BATCH): Promise<RunResult> {
  const result: RunResult = { attempted: 0, published: [], failed: [], skipped: null };

  const author = await authorAccount();

  // The cron may fire more than once (a retry, a manual trigger on the same
  // day, a second region) and none of those should push past the daily cap.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const todaysCount = await prisma.contentDraft.count({
    where: { status: "PUBLISHED", publishedAt: { gte: since } },
  });
  const room = Math.min(batch, Math.max(0, DAILY_CAP - todaysCount));
  if (room === 0) {
    result.skipped = `Daily cap reached — ${todaysCount} of ${DAILY_CAP} published in the last 24h.`;
    return result;
  }

  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
    select: { id: true, slug: true, name: true, description: true },
  });
  if (categories.length === 0) throw new Error("No categories exist yet.");

  const targets = await prisma.keywordTarget.findMany({
    where: { status: "QUEUED" },
    orderBy: [{ priority: "desc" }, { volume: "desc" }],
    take: room,
  });
  if (targets.length === 0) {
    result.skipped = "Nothing left in the keyword queue.";
    return result;
  }

  for (const target of targets) {
    result.attempted += 1;

    // Claim it first. If generation throws, the keyword must not be picked up
    // again by the next run and retried forever.
    await prisma.keywordTarget.update({
      where: { id: target.id },
      data: { status: "DRAFTED" },
    });

    try {
      const draft = await generateDraft({
        keyword: target.keyword,
        funnel: target.funnel,
        categories,
      });
      const category = categories.find((c) => c.slug === draft.categorySlug)!;

      const thread = await prisma.thread.create({
        data: {
          slug: uniqueSlug(draft.title),
          title: draft.title,
          body: withSources(draft.body, draft.sources),
          kind: draft.kind,
          authorId: author.id,
          categoryId: category.id,
          tags: {
            create: draft.tags
              .map((t) => slugify(t))
              .filter(Boolean)
              .slice(0, 5)
              .map((slug) => ({
                tag: {
                  connectOrCreate: {
                    where: { slug },
                    create: { slug, name: slug.replace(/-/g, " ") },
                  },
                },
              })),
          },
        },
        select: { id: true, slug: true },
      });

      await prisma.contentDraft.create({
        data: {
          keywordId: target.id,
          title: draft.title,
          body: draft.body,
          tags: draft.tags.join(","),
          kind: draft.kind,
          categoryId: category.id,
          sources: JSON.stringify(draft.sources),
          model: draft.model,
          inputTokens: draft.usage.input,
          outputTokens: draft.usage.output,
          status: "PUBLISHED",
          threadId: thread.id,
          threadSlug: thread.slug,
          publishedAt: new Date(),
        },
      });

      await prisma.keywordTarget.update({
        where: { id: target.id },
        data: { status: "PUBLISHED" },
      });

      result.published.push({ keyword: target.keyword, slug: thread.slug });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await prisma.keywordTarget.update({
        where: { id: target.id },
        data: { status: "FAILED" },
      });
      await prisma.contentDraft.create({
        data: {
          keywordId: target.id,
          title: target.keyword,
          body: "",
          categoryId: categories[0].id,
          model: activeProviderName(),
          status: "FAILED",
          error: message.slice(0, 1000),
        },
      });
      result.failed.push({ keyword: target.keyword, error: message });
    }
  }

  return result;
}

/**
 * Sources go in the post body, not just the draft record: a citation a reader
 * cannot see does no work, for them or for the page.
 */
function withSources(body: string, sources: { title: string; url: string }[]): string {
  if (sources.length === 0) return body;
  const list = sources.map((s) => `- [${s.title}](${s.url})`).join("\n");
  return `${body}\n\n---\n\n**Sources**\n\n${list}`;
}
