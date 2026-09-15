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

  // Notify on the resulting state, not the score delta. Removing your own
  // downvote raises the score by one but is not an upvote, and used to send
  // "Someone upvoted" anyway.
  const nowUpvoted = value === 1 && existing?.value !== 1;

  if (target === "thread") {
    const thread = await prisma.thread.update({
      where: { id: targetId },
      data: { score: { increment: delta } },
      select: { id: true, slug: true, authorId: true, title: true },
    });
    if (nowUpvoted) {
      const upvotes = await prisma.vote.count({ where: { threadId: thread.id, value: 1 } });
      await notify({
        userId: thread.authorId,
        actorId: user.id,
        type: "vote",
        title: upvoteTitle(upvotes, `"${thread.title}"`),
        href: `/t/${thread.slug}`,
        groupKey: `vote:thread:${thread.id}`,
        count: upvotes,
      });
    }
    revalidatePath(`/t/${thread.slug}`);
  } else {
    const post = await prisma.post.update({
      where: { id: targetId },
      data: { score: { increment: delta } },
      select: { id: true, authorId: true, thread: { select: { slug: true, title: true } } },
    });
    if (nowUpvoted) {
      const upvotes = await prisma.vote.count({ where: { postId: post.id, value: 1 } });
      await notify({
        userId: post.authorId,
        actorId: user.id,
        type: "vote",
        title: upvoteTitle(upvotes, `your reply on "${post.thread.title}"`),
        href: `/t/${post.thread.slug}#post-${post.id}`,
        groupKey: `vote:post:${post.id}`,
        count: upvotes,
      });
    }
    revalidatePath(`/t/${post.thread.slug}`);
  }
  revalidatePath("/");
}

/** Anonymous by design: who voted is not something the forum reveals. */
function upvoteTitle(count: number, what: string): string {
  return count <= 1 ? `Someone upvoted ${what}` : `${count} people upvoted ${what}`;
}
