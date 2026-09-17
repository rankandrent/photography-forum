"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser, isStaff } from "@/lib/session";
import { uniqueSlug, slugify } from "@/lib/slug";
import { filesFrom, processUpload, UploadError } from "@/lib/photos";
import { notify } from "@/lib/notify";
import { fail, type ActionState } from "@/actions/types";

const threadSchema = z.object({
  title: z.string().min(8, "Title must be at least 8 characters.").max(140),
  body: z.string().min(10, "Write at least a couple of sentences.").max(20000),
  categoryId: z.string().min(1, "Pick a category."),
  kind: z.enum(["DISCUSSION", "CRITIQUE", "SHOWCASE"]),
});

import { checkRateLimit } from "@/lib/rate-limit";

export async function createThreadAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const rateCheck = await checkRateLimit(user.id, "thread");
  if (!rateCheck.allowed) return fail(rateCheck.message ?? "Rate limit exceeded.");

  const parsed = threadSchema.safeParse({
    title: String(formData.get("title") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    categoryId: String(formData.get("categoryId") ?? ""),
    kind: String(formData.get("kind") ?? "DISCUSSION"),
  });
  if (!parsed.success) return fail(parsed.error.issues[0].message);

  const category = await prisma.category.findUnique({
    where: { id: parsed.data.categoryId },
    select: { id: true, slug: true },
  });
  if (!category) return fail("That category no longer exists.");

  const files = filesFrom(formData);
  if (parsed.data.kind !== "DISCUSSION" && files.length === 0) {
    return fail("Critique and showcase posts need at least one photo.");
  }

  // Process images BEFORE writing the thread: a failed upload should not leave
  // an empty thread behind.
  let processed;
  try {
    processed = await Promise.all(files.slice(0, 8).map(processUpload));
  } catch (error) {
    if (error instanceof UploadError) return fail(error.message);
    throw error;
  }

  const rawTags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => slugify(t))
    .filter(Boolean)
    .slice(0, 5);

  const thread = await prisma.thread.create({
    data: {
      slug: uniqueSlug(parsed.data.title),
      title: parsed.data.title,
      body: parsed.data.body,
      kind: parsed.data.kind,
      authorId: user.id,
      categoryId: category.id,
      photos: { create: processed.map((p) => ({ ...p, uploaderId: user.id })) },
      tags: {
        create: rawTags.map((slug) => ({
          tag: {
            connectOrCreate: {
              where: { slug },
              create: { slug, name: slug.replace(/-/g, " ") },
            },
          },
        })),
      },
    },
    select: { slug: true },
  });

  revalidatePath("/");
  revalidatePath(`/c/${category.slug}`);
  redirect(`/t/${thread.slug}`);
}

export async function updateThreadAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const id = String(formData.get("threadId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  const thread = await prisma.thread.findUnique({
    where: { id },
    select: { authorId: true, slug: true, locked: true },
  });
  if (!thread) return fail("Thread not found.");
  if (thread.authorId !== user.id && !isStaff(user)) return fail("That is not your thread.");
  if (thread.locked && !isStaff(user)) return fail("This thread is locked.");
  if (title.length < 8) return fail("Title must be at least 8 characters.");
  if (body.length < 10) return fail("Body is too short.");

  await prisma.thread.update({ where: { id }, data: { title, body } });
  revalidatePath(`/t/${thread.slug}`);
  return { ok: true, message: "Thread updated." };
}

export async function deleteThreadAction(threadId: string) {
  const user = await requireUser();
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    select: { authorId: true, category: { select: { slug: true } } },
  });
  if (!thread) return;
  if (thread.authorId !== user.id && !isStaff(user)) throw new Error("Not allowed.");

  await prisma.thread.delete({ where: { id: threadId } });
  revalidatePath("/");
  revalidatePath(`/c/${thread.category.slug}`);
  redirect("/");
}

/** Moderator toggles. */
export async function setThreadFlagAction(
  threadId: string,
  flag: "pinned" | "locked",
  value: boolean,
) {
  const user = await requireUser();
  if (!isStaff(user)) throw new Error("Moderators only.");

  const thread = await prisma.thread.update({
    where: { id: threadId },
    data: { [flag]: value },
    select: { slug: true, title: true, authorId: true },
  });

  await notify({
    userId: thread.authorId,
    actorId: user.id,
    type: "moderation",
    title: `Your thread "${thread.title}" was ${value ? flag : `un${flag}`}.`,
    href: `/t/${thread.slug}`,
  });

  revalidatePath(`/t/${thread.slug}`);
  revalidatePath("/");
}

export async function recordViewAction(threadId: string) {
  await prisma.thread.update({
    where: { id: threadId },
    data: { viewCount: { increment: 1 } },
  });
}
