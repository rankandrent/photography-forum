"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { detectScaledContent, type FlaggedThread } from "@/scripts/detectScaledContent";

export async function getAuditReportAction(): Promise<{ success: boolean; data?: FlaggedThread[]; error?: string }> {
  try {
    const flagged = await detectScaledContent();
    return { success: true, data: flagged };
  } catch (err) {
    console.error("getAuditReportAction error:", err);
    return { success: false, error: String(err) };
  }
}

export async function executeAuditAction(
  threadIds: string[],
  action: "delete" | "soft_delete" | "keep"
): Promise<{ success: boolean; count: number; error?: string }> {
  if (!threadIds || threadIds.length === 0) {
    return { success: false, count: 0, error: "No threads selected" };
  }

  try {
    if (action === "delete") {
      const res = await prisma.thread.deleteMany({
        where: { id: { in: threadIds } },
      });
      revalidatePath("/admin/content-audit");
      revalidatePath("/admin/simulation");
      revalidatePath("/");
      return { success: true, count: res.count };
    }

    if (action === "soft_delete") {
      const res = await prisma.thread.updateMany({
        where: { id: { in: threadIds } },
        data: { locked: true, isSimulated: true },
      });
      revalidatePath("/admin/content-audit");
      revalidatePath("/");
      return { success: true, count: res.count };
    }

    if (action === "keep") {
      const res = await prisma.thread.updateMany({
        where: { id: { in: threadIds } },
        data: { isSimulated: false },
      });
      revalidatePath("/admin/content-audit");
      revalidatePath("/");
      return { success: true, count: res.count };
    }

    return { success: false, count: 0, error: "Invalid action" };
  } catch (err) {
    console.error("executeAuditAction error:", err);
    return { success: false, count: 0, error: String(err) };
  }
}
