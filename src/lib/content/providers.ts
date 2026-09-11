import Anthropic from "@anthropic-ai/sdk";

/**
 * The one place that knows which model service the pipeline talks to.
 *
 * Two providers, picked by which key is present. OpenRouter comes first because
 * it is the one this forum is configured for; Anthropic direct stays available
 * so moving to a first-party key later is a key swap, not a rewrite.
 *
 * Both take the same prompt and both are asked to research with live web search
 * before writing — a post about which camera to buy under $500 is worthless if
 * the model answers from memory.
 */

export type ModelReply = {
  text: string;
  usage: { input: number; output: number };
  model: string;
};

export type ModelRequest = {
  system: string;
  user: string;
  maxTokens: number;
};

export function activeProvider(): "openrouter" | "anthropic" {
  if (process.env.OPENROUTER_API_KEY) return "openrouter";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  throw new Error(
    "No model API key set — the pipeline needs OPENROUTER_API_KEY (or ANTHROPIC_API_KEY).",
  );
}

export async function callModel(request: ModelRequest): Promise<ModelReply> {
  return activeProvider() === "openrouter" ? viaOpenRouter(request) : viaAnthropic(request);
}

/* ------------------------------------------------------------- OpenRouter -- */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * OpenRouter speaks the OpenAI chat shape, not Anthropic's Messages API, so
 * this is a plain fetch rather than an SDK call — there is no official client
 * to reach for.
 *
 * Web search comes from OpenRouter's `web` plugin. On an Anthropic model it
 * routes to Anthropic's own search rather than a third-party index, so the
 * research the post is built on is the same as it would be calling Anthropic
 * directly.
 */
async function viaOpenRouter({ system, user, maxTokens }: ModelRequest): Promise<ModelReply> {
  const model = process.env.OPENROUTER_MODEL ?? "anthropic/claude-opus-5";

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      // OpenRouter attributes traffic with these; they show the forum in the
      // account's usage breakdown instead of an anonymous lump.
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost",
      "X-Title": "ApertureTalk content pipeline",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      plugins: [{ id: "web", max_results: 6 }],
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenRouter ${response.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string }; finish_reason?: string }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
    error?: { message?: string };
  };

  // OpenRouter can answer 200 with an error body when an upstream provider
  // fails, so the status code alone is not proof of success.
  if (data.error) throw new Error(`OpenRouter: ${data.error.message ?? "unknown error"}`);

  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenRouter returned no content.");

  return {
    text,
    model,
    usage: {
      input: data.usage?.prompt_tokens ?? 0,
      output: data.usage?.completion_tokens ?? 0,
    },
  };
}

/* -------------------------------------------------------------- Anthropic -- */

async function viaAnthropic({ system, user, maxTokens }: ModelRequest): Promise<ModelReply> {
  const model = "claude-opus-5";
  const client = new Anthropic();

  const stream = client.messages.stream({
    model,
    max_tokens: maxTokens,
    system,
    thinking: { type: "adaptive" },
    tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 6 }],
    messages: [{ role: "user", content: user }],
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === "refusal") {
    throw new Error(`Model declined: ${message.stop_details?.explanation ?? "no explanation"}`);
  }

  return {
    model,
    text: message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n"),
    usage: { input: message.usage.input_tokens, output: message.usage.output_tokens },
  };
}
