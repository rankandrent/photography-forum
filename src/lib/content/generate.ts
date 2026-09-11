import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { callModel } from "@/lib/content/providers";

/**
 * Drafts the opening post for one keyword.
 *
 * Claude researches the topic with the server-side web search tool rather than
 * writing from memory, so the post carries sources a reader can check and the
 * gear names in it are the ones on sale now, not the ones in a training set.
 *
 * The prompt below is the part that matters. Two constraints in it are not
 * style preferences — they are what keeps the output publishable at all:
 *
 *   - It must never claim experience the account owner has not had. A forum
 *     post reads as a person speaking; "I shot 400 weddings on this body" is a
 *     factual claim about a real human being, and a false one is the thing
 *     Google's spam policy and the FTC's endorsement rule both target.
 *   - Every factual claim carries a source. That is what makes the thread worth
 *     more than the AI Overview sitting above it in the results.
 */

export type DraftResult = {
  title: string;
  body: string;
  tags: string[];
  kind: "DISCUSSION" | "CRITIQUE" | "SHOWCASE";
  categorySlug: string;
  sources: { title: string; url: string }[];
  usage: { input: number; output: number };
  model: string;
};

/** Aggregate EXIF facts nobody else has — the reason these posts can rank. */
async function houseData(keyword: string): Promise<string> {
  const words = keyword.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  const gear = await prisma.gear.findMany({
    where: { OR: words.map((w) => ({ name: { contains: w, mode: "insensitive" as const } })) },
    take: 5,
    select: {
      name: true,
      brand: true,
      type: true,
      _count: { select: { owners: true, cameraPhotos: true, lensPhotos: true } },
    },
  });
  if (gear.length === 0) return "";

  const lines = gear.map(
    (g) =>
      `- ${g.name} (${g.brand}): ${g._count.owners} members own it, ` +
      `${g._count.cameraPhotos + g._count.lensPhotos} photos in our database shot with it.`,
  );
  return `Facts from this forum's own gear database — use them, they are unique to us and no competitor can quote them:\n${lines.join("\n")}`;
}

const SYSTEM = `You start threads on ${site.name}, a photography forum. ${site.tagline}.

Write the way a real person posts on a forum — not the way a blog or an AI
writes. That means SHORT. A good opening post is usually 3 to 6 sentences. You
are asking a question or floating an opinion to get people talking, not
publishing an article.

VOICE:
- Plain, casual, first person. Contractions. "I keep seeing…", "Trying to figure
  out…", "Not sure if…".
- No headings. No bold labels. No bullet lists unless you're genuinely listing
  two or three options a person would list out loud.
- Say the essential thing in as few words as possible, then stop. Cut every
  sentence that isn't pulling weight.
- No marketing voice, no "in today's world", no summarising-an-article feel.

HARD RULES — breaking any makes the post unusable:
1. Never claim personal experience you can't have. You draft for an owner who
   may not own the gear. "From what I've read…", "the spec says…", not "I shot
   a whole season on this". No invented trips, clients, or anecdotes.
2. Any specific fact — a price, a number, a common complaint — comes from web
   search. Keep facts to the few that matter; a short post needs 1–3 sources,
   not eight.
3. Thin research is fine to admit: "here's the little I found, who's actually
   tried it?" beats padding.
4. No affiliate links, no invented quotes or review counts.

Always end on a real question that invites a reply — specific, not "thoughts?".

Return ONLY a JSON object in a \`\`\`json fenced block:
  title        — how a member would actually type the question, 8-140 chars
  body         — the post, markdown, short
  tags         — 2-4 lowercase topic tags, no # prefix
  kind         — always "DISCUSSION"
  categorySlug — one of the category slugs given in the user message
  sources      — array of { "title": ..., "url": ... } you actually cited`;

/** How the post is framed shifts with where the reader is in the funnel. */
const FUNNEL_FRAMING: Record<string, string> = {
  TOFU:
    "Funnel stage: TOFU (awareness). The asker is new to this. Give the core " +
    "idea in two or three plain sentences, skip the jargon, and ask what part " +
    "trips beginners up.",
  MOFU:
    "Funnel stage: MOFU (consideration). They're weighing options or a method. " +
    "State the real trade-off in a sentence or two and ask which way people " +
    "went and why.",
  BOFU:
    "Funnel stage: BOFU (decision). They're close to buying. Say what the " +
    "research points to, flag the one catch worth knowing, and ask owners " +
    "whether it held up in real use. Never sound like an ad.",
};

export async function generateDraft(input: {
  keyword: string;
  funnel?: string;
  categories: { slug: string; name: string; description: string }[];
}): Promise<DraftResult> {
  const facts = await houseData(input.keyword);
  const framing = FUNNEL_FRAMING[input.funnel ?? "TOFU"] ?? FUNNEL_FRAMING.TOFU;

  const categoryList = input.categories
    .map((c) => `- ${c.slug}: ${c.name} — ${c.description}`)
    .join("\n");

  const reply = await callModel({
    // A shorter cap keeps the model honest about length — the prompt asks for a
    // few sentences, and this stops it wandering into an essay if it's inclined.
    maxTokens: 2000,
    system: SYSTEM,
    user: [
      `Search query people are typing: "${input.keyword}"`,
      "",
      framing,
      "",
      "Research it with web search, then write the short opening post.",
      "",
      "Categories available:",
      categoryList,
      facts ? `\n${facts}` : "",
    ].join("\n"),
  });

  const text = reply.text;

  const parsed = parseDraft(text);
  const slugs = new Set(input.categories.map((c) => c.slug));

  return {
    ...parsed,
    // A hallucinated slug would fail the foreign key at insert time; fall back
    // to the first category rather than losing the whole draft over it.
    categorySlug: slugs.has(parsed.categorySlug) ? parsed.categorySlug : input.categories[0].slug,
    usage: reply.usage,
    model: reply.model,
  };
}

/**
 * Strips the citation markup the web-search tool wraps quoted spans in.
 *
 * Anthropic's search marks cited passages as `<cite index="3-12">…</cite>`, and
 * through OpenRouter that annotation arrives inside the message text instead of
 * as structured metadata. Our markdown renderer escapes HTML before anything
 * else, so left alone these render as literal `<cite index="3-12">` in the
 * middle of sentences. The quoted words stay; only the wrapper goes, and the
 * real attribution is the source list appended to the body.
 */
function stripCitations(text: string): string {
  return text
    .replace(/<\/?cite\b[^>]*>/gi, "")
    .replace(/[ \t]+([.,;:])/g, "$1")
    .replace(/[ \t]{2,}/g, " ");
}

function parseDraft(text: string): Omit<DraftResult, "usage" | "model"> {
  const fenced = text.match(/```json\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw.trim()) as Record<string, unknown>;
  } catch {
    throw new Error(`Model did not return parseable JSON. First 200 chars: ${text.slice(0, 200)}`);
  }

  const title = stripCitations(String(data.title ?? "")).trim();
  const body = stripCitations(String(data.body ?? "")).trim();
  // These two mirror the limits in createThreadAction's zod schema. Failing
  // here costs one draft; failing at insert time costs a confusing 500.
  if (title.length < 8 || title.length > 140) throw new Error(`Bad title length: ${title.length}`);
  if (body.length < 10) throw new Error("Body too short");

  const sources = Array.isArray(data.sources)
    ? (data.sources as { title?: unknown; url?: unknown }[])
        .filter((s) => typeof s?.url === "string")
        .map((s) => ({ title: String(s.title ?? s.url), url: String(s.url) }))
    : [];

  return {
    title,
    body,
    tags: Array.isArray(data.tags) ? data.tags.map(String).slice(0, 4) : [],
    kind: "DISCUSSION",
    categorySlug: String(data.categorySlug ?? ""),
    sources,
  };
}
