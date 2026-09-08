import { prisma } from "@/lib/prisma";

/** Fire-and-forget in-app notification. Never notify a user about their own action. */
export async function notify(opts: {
  userId: string;
  actorId?: string;
  type: string;
  title: string;
  href: string;
}) {
  if (opts.actorId && opts.actorId === opts.userId) return;
  await prisma.notification.create({
    data: { userId: opts.userId, type: opts.type, title: opts.title, href: opts.href },
  });
}
