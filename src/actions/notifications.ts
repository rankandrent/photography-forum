"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { NOTIFICATION_RETENTION_DAYS } from "@/lib/notify";

/*
 * The unread badge lives in the header, which is part of the root layout and is
 * rendered on every page. Revalidating only "/notifications" left the count
 * stale everywhere else — which is why marking things read appeared to do
 * nothing. Every mutation here invalidates the root layout instead.
 */
function refreshBadge() {
  revalidatePath("/", "layout");
}

/**
 * Called when the member opens their notifications. Clears the badge without
 * marking each item read — the same "seen" vs "read" split every large site
 * uses, so unread items stay highlighted until they are actually opened.
 *
 * Also the moment to prune: old read notifications are never looked at again.
 */
export async function markSeenAction() {
  const user = await requireUser();
  const cutoff = new Date(Date.now() - NOTIFICATION_RETENTION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { notificationsSeenAt: new Date() },
    }),
    prisma.notification.deleteMany({
      where: { userId: user.id, read: true, updatedAt: { lt: cutoff } },
    }),
  ]);

  refreshBadge();
}

export async function markAllReadAction() {
  const user = await requireUser();
  await prisma.notification.updateMany({
    where: { userId: user.id, read: false },
    data: { read: true },
  });
  refreshBadge();
}

export async function markReadAction(id: string) {
  const user = await requireUser();
  await prisma.notification.updateMany({
    where: { id, userId: user.id },
    data: { read: true },
  });
  refreshBadge();
}
