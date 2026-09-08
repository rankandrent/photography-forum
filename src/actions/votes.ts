"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { notify } from "@/lib/notify";

/**
 * One vote per user per target. Clicking the same arrow twice removes the vote,
 * clicking the other arrow flips it. `score` is denormalised onto the row so
 * listings do not have to aggregate on every read.
 */
export async function voteAction(
  target: "thread" | "post",
  targetId: string,
  value: 1 | -1,
) {
  const user = await requireUser();
  const where =
    target === "thread"
      ? { userId_threadId: { userId: user.id, threadId: targetId } }
      : { userId_postId: { userId: user.id, postId: targetId } };

  const existing = await prisma.vote.findUnique({ where: where as never });

  let delta = 0;
  if (!existing) {
    await prisma.vote.create({
      data: {
        userId: user.id,
        value,
        ...(target === "thread" ? { threadId: targetId } : { postId: targetId }),
      },
    });
    delta = value;
  } else if (existing.value === value) {
    await prisma.vote.delete({ where: { id: existing.id } });
    delta = -value;
  } else {
    await prisma.vote.update({ where: { id: existing.id }, data: { value } });
    delta = value * 2;
  }

  if (target === "thread") {
    const thread = await prisma.thread.update({
      where: { id: targetId },
      data: { score: { increment: delta } },
      select: { slug: true, authorId: true, title: true },
    });
    if (delta > 0) {
      await notify({
        userId: thread.authorId,
        actorId: user.id,
        type: "vote",
        title: `Someone upvoted "${thread.title}"`,
        href: `/t/${thread.slug}`,
      });
    }
    revalidatePath(`/t/${thread.slug}`);
  } else {
    const post = await prisma.post.update({
      where: { id: targetId },
      data: { score: { increment: delta } },
      select: { thread: { select: { slug: true } } },
    });
    revalidatePath(`/t/${post.thread.slug}`);
  }
  revalidatePath("/");
}
