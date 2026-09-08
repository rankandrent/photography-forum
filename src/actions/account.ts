"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { requireUser } from "@/lib/session";
import { slugify } from "@/lib/slug";
import { fail, type ActionState } from "@/actions/types";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(24, "Username must be 24 characters or fewer.")
    .regex(/^[a-zA-Z0-9_-]+$/, "Use letters, numbers, hyphens and underscores only."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export async function registerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    username: String(formData.get("username") ?? "").trim(),
    email: String(formData.get("email") ?? "").toLowerCase().trim(),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) return fail(parsed.error.issues[0].message);

  const { username, email, password } = parsed.data;

  const clash = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
    select: { email: true },
  });
  if (clash) {
    return fail(
      clash.email === email
        ? "An account with that email already exists."
        : "That username is taken.",
    );
  }

  await prisma.user.create({
    data: {
      username,
      email,
      name: username,
      passwordHash: await bcrypt.hash(password, 12),
    },
  });

  await signIn("credentials", { email, password, redirect: false });
  redirect("/");
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return fail("Enter your email and password.");

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) return fail("Wrong email or password.");
    throw error;
  }
  redirect("/");
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/" });
}

const profileSchema = z.object({
  name: z.string().max(60).optional(),
  bio: z.string().max(400).optional(),
  location: z.string().max(80).optional(),
  website: z.string().max(200).optional(),
  instagram: z.string().max(60).optional(),
});

export async function updateProfileAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsed = profileSchema.safeParse({
    name: String(formData.get("name") ?? "").trim(),
    bio: String(formData.get("bio") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim(),
    instagram: String(formData.get("instagram") ?? "").trim().replace(/^@/, ""),
  });
  if (!parsed.success) return fail(parsed.error.issues[0].message);

  const website = parsed.data.website;
  if (website && !/^https?:\/\//i.test(website)) {
    return fail("Website must start with http:// or https://");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: parsed.data.name || null,
      bio: parsed.data.bio || null,
      location: parsed.data.location || null,
      website: website || null,
      instagram: parsed.data.instagram || null,
    },
  });

  revalidatePath(`/u/${user.username}`);
  return { ok: true, message: "Profile saved." };
}

export async function toggleGearAction(gearId: string) {
  const user = await requireUser();
  const existing = await prisma.userGear.findUnique({
    where: { userId_gearId: { userId: user.id, gearId } },
  });
  if (existing) {
    await prisma.userGear.delete({ where: { userId_gearId: { userId: user.id, gearId } } });
  } else {
    await prisma.userGear.create({ data: { userId: user.id, gearId } });
  }
  revalidatePath(`/u/${user.username}`);
  revalidatePath("/gear");
}

/** Used by the seed-free onboarding hint; keeps slugify imported where used. */
export async function suggestUsernameAction(seed: string): Promise<string> {
  return slugify(seed).slice(0, 20) || "member";
}
