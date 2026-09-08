"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { filesFrom, processUpload, UploadError } from "@/lib/photos";
import { fail, type ActionState } from "@/actions/types";

export async function enterChallengeAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const challengeId = String(formData.get("challengeId") ?? "");
  const caption = String(formData.get("caption") ?? "").trim().slice(0, 200);

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    select: { id: true, slug: true, status: true, endsAt: true },
  });
  if (!challenge) return fail("Challenge not found.");
  if (challenge.status !== "OPEN" || challenge.endsAt < new Date()) {
    return fail("Submissions for this challenge are closed.");
  }

  const files = filesFrom(formData);
  if (files.length === 0) return fail("Attach the photo you are entering.");

  let processed;
  try {
    processed = await processUpload(files[0]);
  } catch (error) {
    if (error instanceof UploadError) return fail(error.message);
    throw error;
  }

  // One entry per photographer per challenge — resubmitting replaces the photo.
  const existing = await prisma.challengeEntry.findUnique({
    where: { challengeId_userId: { challengeId, userId: user.id } },
    select: { id: true },
  });

  if (existing) {
    await prisma.photo.deleteMany({ where: { entryId: existing.id } });
    await prisma.challengeEntry.update({
      where: { id: existing.id },
      data: { caption, photos: { create: { ...processed, uploaderId: user.id } } },
    });
  } else {
    await prisma.challengeEntry.create({
      data: {
        challengeId,
        userId: user.id,
        caption,
        photos: { create: { ...processed, uploaderId: user.id } },
      },
    });
  }

  revalidatePath(`/challenges/${challenge.slug}`);
  return { ok: true, message: "Entry submitted. Good luck!" };
}

export async function voteChallengeEntryAction(entryId: string) {
  const user = await requireUser();
  const entry = await prisma.challengeEntry.findUnique({
    where: { id: entryId },
    select: { userId: true, challenge: { select: { slug: true, status: true } } },
  });
  if (!entry) throw new Error("Entry not found.");
  if (entry.challenge.status !== "VOTING") throw new Error("Voting is not open.");
  if (entry.userId === user.id) throw new Error("You cannot vote for your own entry.");

  const existing = await prisma.challengeVote.findUnique({
    where: { entryId_userId: { entryId, userId: user.id } },
  });
  if (existing) {
    await prisma.challengeVote.delete({ where: { id: existing.id } });
  } else {
    await prisma.challengeVote.create({ data: { entryId, userId: user.id } });
  }

  revalidatePath(`/challenges/${entry.challenge.slug}`);
}
