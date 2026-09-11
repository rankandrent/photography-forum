import { NextResponse } from "next/server";
import { runPipeline, RUN_BATCH } from "@/lib/content/pipeline";

/**
 * Daily content run, triggered by the Vercel cron entry in vercel.json.
 *
 * Generation takes a minute or two per post (the model runs web searches), so this
 * needs a raised ceiling — the default would kill it mid-draft. 300s is the
 * maximum a Vercel hobby-plan function is allowed, and one post fits inside it.
 */
export const maxDuration = 300;
export const dynamic = "force-dynamic";

function authorised(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // Without a secret configured, refuse rather than run: this endpoint spends
  // money at the model provider and publishes to a live forum.
  if (!secret) return false;
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorised(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const url = new URL(request.url);
  const batch = Number(url.searchParams.get("limit")) || RUN_BATCH;

  try {
    const result = await runPipeline(Math.min(batch, 2));
    return NextResponse.json({ ok: result.failed.length === 0, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
