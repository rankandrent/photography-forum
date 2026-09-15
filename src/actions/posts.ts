"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, isStaff } from "@/lib/session";
import { filesFrom, processUpload, UploadError } from "@/lib/photos";
import { notify, notifyEach } from "@/lib/notify";
import { toPlainText } from "@/lib/markdown";
import { fail, type ActionState } from "@/actions/types";

export async function createPostAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const threadId = String(formData.get("threadId") ?? "");
  const parentId = String(formData.get("parentId") ?? "") || null;
  const body = String(formData.get("body") ?? "").trim();

  if (body.length < 2) return fail("Write something first.");
  if (body.length > 20000) return fail("That reply is too long.");

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    select: { id: true, slug: true, title: true, authorId: true, locked: true },
  });
  if (!thread) return fail("Thread not found.");
  if (thread.locked && !isStaff(user)) return fail("This thread is locked.");

  let processed;
  try {
    processed = await Promise.all(filesFrom(formData).slice(0, 4).map(processUpload));
  } catch (error) {
    if (error instanceof UploadError) return fail(error.message);
    throw error;
  }

  const post = await prisma.post.create({
    data: {
      threadId: thread.id,
      authorId: user.id,
      parentId,
      body,
      photos: { create: processed.map((p) => ({ ...p, uploaderId: user.id, threadId: thread.id })) },
    },
    select: { id: true },
  });

  await prisma.thread.update({
    where: { id: thread.id },
    data: { lastPostAt: new Date() },
  });

  // The parent commenter goes first: when they also own the thread they get the
  // more specific "replied to your comment", once, instead of two notifications
  // for the same reply.
  const actor = user.name ?? user.username;
  const href = `/t/${thread.slug}#post-${post.id}`;
  const recipients: Parameters<typeof notifyEach>[0] = [];
  if (parentId) {
    const parent = await prisma.post.findUnique({
      where: { id: parentId },
      select: { authorId: true, body: true },
    });
    if (parent) {
      recipients.push({
        userId: parent.authorId,
        actorId: user.id,
        type: "reply",
        title: `${actor} replied to your comment: "${toPlainText(parent.body, 40)}"`,
        href,
      });
    }
  }
  recipients.push({
    userId: thread.authorId,
    actorId: user.id,
    type: "reply",
    title: `${actor} replied to "${thread.title}"`,
    href,
  });
  await notifyEach(recipients);

  revalidatePath(`/t/${thread.slug}`);
  return { ok: true, message: "Reply posted." };
}

export async function updatePostAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const postId = String(formData.get("postId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (body.length < 2) return fail("Write something first.");

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true, thread: { select: { slug: true } } },
  });
  if (!post) return fail("Reply not found.");
  if (post.authorId !== user.id && !isStaff(user)) return fail("That is not your reply.");

  await prisma.post.update({ where: { id: postId }, data: { body, editedAt: new Date() } });
  revalidatePath(`/t/${post.thread.slug}`);
  return { ok: true, message: "Reply updated." };
}

export async function deletePostAction(postId: string) {
  const user = await requireUser();
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true, thread: { select: { slug: true } } },
  });
  if (!post) return;
  if (post.authorId !== user.id && !isStaff(user)) throw new Error("Not allowed.");

  await prisma.post.delete({ where: { id: postId } });
  revalidatePath(`/t/${post.thread.slug}`);
}

/** Only the thread author (or staff) can mark the reply that solved it. */
export async function markAnswerAction(postId: string) {
  const user = await requireUser();
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      isAnswer: true,
      authorId: true,
      threadId: true,
      thread: { select: { slug: true, authorId: true, title: true } },
    },
  });
  if (!post) throw new Error("Reply not found.");
  if (post.thread.authorId !== user.id && !isStaff(user)) {
    throw new Error("Only the thread author can accept an answer.");
  }

  await prisma.$transaction([
    prisma.post.updateMany({
      where: { threadId: post.threadId, isAnswer: true },
      data: { isAnswer: false },
    }),
    prisma.post.update({ where: { id: post.id }, data: { isAnswer: !post.isAnswer } }),
  ]);

  if (!post.isAnswer) {
    await notify({
      userId: post.authorId,
      actorId: user.id,
      type: "answer",
      title: `Your reply was accepted as the answer on "${post.thread.title}"`,
      href: `/t/${post.thread.slug}#post-${post.id}`,
      // Accept, un-accept, accept again is one event to the person answering.
      groupKey: `answer:post:${post.id}`,
      count: 1,
    });
  }

  revalidatePath(`/t/${post.thread.slug}`);
}
