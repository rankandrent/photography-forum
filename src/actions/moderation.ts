"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, isStaff } from "@/lib/session";
import { fail, type ActionState } from "@/actions/types";

export async function reportAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const reason = String(formData.get("reason") ?? "").trim();
  const threadId = String(formData.get("threadId") ?? "") || null;
  const postId = String(formData.get("postId") ?? "") || null;

  if (reason.length < 5) return fail("Tell the moderators what is wrong.");
  if (!threadId && !postId) return fail("Nothing to report.");

  await prisma.report.create({
    data: { reporterId: user.id, reason: reason.slice(0, 500), threadId, postId },
  });
  return { ok: true, message: "Reported. A moderator will take a look." };
}

export async function resolveReportAction(reportId: string, status: "RESOLVED" | "DISMISSED") {
  const user = await requireUser();
  if (!isStaff(user)) throw new Error("Moderators only.");
  await prisma.report.update({ where: { id: reportId }, data: { status } });
  revalidatePath("/moderation");
}

export async function setUserRoleAction(userId: string, role: "USER" | "MOD" | "ADMIN") {
  const user = await requireUser();
  if (user.role !== "ADMIN") throw new Error("Admins only.");
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/moderation");
}
