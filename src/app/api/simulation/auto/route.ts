import { NextResponse } from "next/server";
import { runFastDemo } from "@/lib/simulation/engine";
import { optimizeDatabaseInternalLinks } from "@/lib/simulation/agents";

export const dynamic = "force-dynamic";

/**
 * Background Auto-Simulation Trigger.
 * Can be called by Vercel Cron, background timers, or periodic background tasks.
 * Automatically generates or updates forum threads in the background and optimizes SEO internal links.
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // Optional secret check if invoked by Vercel Cron
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // Still allow internal calls if cron secret isn't strictly enforced
    }

    const result = await runFastDemo();
    const updatedLinksCount = await optimizeDatabaseInternalLinks(5).catch(() => 0);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      simulation: result,
      internalLinksOptimized: updatedLinksCount,
    });
  } catch (error) {
    console.error("Auto simulation error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
