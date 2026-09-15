import { prisma } from "@/lib/prisma";

export type NotificationType = "reply" | "vote" | "critique" | "answer" | "moderation";

/**
 * Creates an in-app notification.
 *
 * Three rules every caller gets for free:
 *
 *  - Nobody is notified about their own action.
 *  - A notification can never break the thing that caused it. Posting a reply
 *    must succeed even if writing the notification about it fails, so errors
 *    are logged here and swallowed rather than thrown into the action.
 *  - Repeat events about the same thing collapse. Pass a `groupKey` and, while
 *    the member still has an unread row for that key, it is updated in place
 *    ("5 people upvoted…") instead of stacking up a new row per event.
 */
export async function notify(opts: {
  userId: string;
  actorId?: string;
  type: NotificationType;
  title: string;
  href: string;
  /** Collapse into one unread row per key, e.g. `vote:thread:<id>`. */
  groupKey?: string;
  /**
   * For grouped notifications: the current total the title describes. The row
   * only re-surfaces when this goes up — someone toggling their own upvote off
   * and on again does not ping the author twice.
   */
  count?: number;
}): Promise<void> {
  if (opts.actorId && opts.actorId === opts.userId) return;

  try {
    if (opts.groupKey) {
      const existing = await prisma.notification.findFirst({
        where: { userId: opts.userId, groupKey: opts.groupKey, read: false },
        orderBy: { updatedAt: "desc" },
        select: { id: true, actorCount: true },
      });

      if (existing) {
        const next = opts.count ?? existing.actorCount + 1;
        if (next <= existing.actorCount) return;
        await prisma.notification.update({
          where: { id: existing.id },
          data: { title: opts.title, href: opts.href, actorCount: next },
        });
        return;
      }
    }

    await prisma.notification.create({
      data: {
        userId: opts.userId,
        type: opts.type,
        title: opts.title,
        href: opts.href,
        groupKey: opts.groupKey ?? null,
        actorCount: opts.count ?? 1,
      },
    });
  } catch (error) {
    console.error("notify: failed to record notification", { type: opts.type, error });
  }
}

/**
 * Sends one notification per distinct recipient.
 *
 * A reply to your own comment in your own thread is one event, not two — the
 * most specific message (the first one given for that member) wins.
 */
export async function notifyEach(
  items: Parameters<typeof notify>[0][],
): Promise<void> {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.userId)) continue;
    seen.add(item.userId);
    await notify(item);
  }
}

/** Number of unread notifications that arrived after the member last looked. */
export async function unseenCount(userId: string, seenAt: Date | null): Promise<number> {
  return prisma.notification.count({
    where: {
      userId,
      read: false,
      ...(seenAt ? { updatedAt: { gt: seenAt } } : {}),
    },
  });
}

/** Read notifications older than this are pruned when the member opens the list. */
export const NOTIFICATION_RETENTION_DAYS = 90;
