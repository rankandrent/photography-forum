import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type SessionUser = {
  id: string;
  username: string;
  name: string | null;
  image: string | null;
  role: string;
};

export async function currentUser(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, username: true, name: true, image: true, role: true },
  });
  return user ?? null;
}

export async function requireUser(): Promise<SessionUser> {
  const user = await currentUser();
  if (!user) throw new Error("You must be signed in to do that.");
  return user;
}

export function isStaff(user: { role: string } | null): boolean {
  return user?.role === "MOD" || user?.role === "ADMIN";
}
