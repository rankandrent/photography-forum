"use server";

import { revalidatePath } from "next/cache";
import { requireUser, isStaff } from "@/lib/session";
import { runPipeline } from "@/lib/content/pipeline";
import { fail, type ActionState } from "@/actions/types";

/**
 * Manual trigger for the pipeline, for when the owner does not want to wait for
 * tomorrow's cron. Same daily cap applies, so pressing it repeatedly cannot
 * flood the forum.
 */
export async function runPipelineAction(): Promise<ActionState> {
  const user = await requireUser();
  if (!isStaff(user)) return fail("Staff only.");

  try {
    const result = await runPipeline();
    revalidatePath("/admin/content");
    revalidatePath("/");

    if (result.skipped) return { ok: true, message: result.skipped };
    if (result.published.length === 0 && result.failed.length > 0) {
      return fail(`All ${result.failed.length} attempts failed: ${result.failed[0].error}`);
    }
    return {
      ok: true,
      message:
        `Published ${result.published.length} thread${result.published.length === 1 ? "" : "s"}` +
        (result.failed.length > 0 ? `, ${result.failed.length} failed.` : "."),
    };
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Pipeline run failed.");
  }
}
