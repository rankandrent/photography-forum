"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { notify } from "@/lib/notify";
import { fail, type ActionState } from "@/actions/types";

const rating = z.coerce.number().int().min(1, "Rate every category.").max(5);

const critiqueSchema = z.object({
  composition: rating,
  lighting: rating,
  editing: rating,
  comment: z
    .string()
    .min(30, "A useful critique needs at least 30 characters — say what and why.")
    .max(4000),
});

export async function critiqueAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const photoId = String(formData.get("photoId") ?? "");

  const parsed = critiqueSchema.safeParse({
    composition: formData.get("composition"),
    lighting: formData.get("lighting"),
    editing: formData.get("editing"),
    comment: String(formData.get("comment") ?? "").trim(),
  });
  if (!parsed.success) return fail(parsed.error.issues[0].message);

  const photo = await prisma.photo.findUnique({
    where: { id: photoId },
    select: { uploaderId: true, thread: { select: { slug: true, title: true } } },
  });
  if (!photo) return fail("Photo not found.");
  if (photo.uploaderId === user.id) return fail("You cannot critique your own photo.");

  const alreadyCritiqued = await prisma.critique.findUnique({
    where: { photoId_authorId: { photoId, authorId: user.id } },
    select: { id: true },
  });

  await prisma.critique.upsert({
    where: { photoId_authorId: { photoId, authorId: user.id } },
    create: { photoId, authorId: user.id, ...parsed.data },
    update: parsed.data,
  });

  // Saving is an upsert, so tweaking a score re-runs this. Only the first
  // critique is news to the photographer; revisions aren't.
  if (photo.thread && !alreadyCritiqued) {
    await notify({
      userId: photo.uploaderId,
      actorId: user.id,
      type: "critique",
      title: `${user.name ?? user.username} critiqued your photo on "${photo.thread.title}"`,
      href: `/t/${photo.thread.slug}`,
    });
  }
  if (photo.thread) revalidatePath(`/t/${photo.thread.slug}`);

  return { ok: true, message: "Critique saved." };
}

export async function deleteCritiqueAction(critiqueId: string) {
  const user = await requireUser();
  const critique = await prisma.critique.findUnique({
    where: { id: critiqueId },
    select: { authorId: true, photo: { select: { thread: { select: { slug: true } } } } },
  });
  if (!critique) return;
  if (critique.authorId !== user.id && user.role === "USER") throw new Error("Not allowed.");

  await prisma.critique.delete({ where: { id: critiqueId } });
  if (critique.photo.thread) revalidatePath(`/t/${critique.photo.thread.slug}`);
}
