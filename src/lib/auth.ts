import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

const providers: NextAuthConfig["providers"] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = String(credentials?.email ?? "").toLowerCase().trim();
      const password = String(credentials?.password ?? "");
      if (!email || !password) return null;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user?.passwordHash) return null;
      if (!(await bcrypt.compare(password, user.passwordHash))) return null;

      return { id: user.id, name: user.name, email: user.email, image: user.image };
    },
  }),
];

// Only offer Google when it is actually configured, so a fresh clone with no
// OAuth credentials still boots instead of throwing at request time.
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

export const googleEnabled = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  // Credentials providers require JWT sessions even when an adapter is present.
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      if (!token.sub) return token;

      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: { username: true, role: true, image: true, name: true },
      });
      if (dbUser) {
        token.username = dbUser.username;
        token.role = dbUser.role;
        token.picture = dbUser.image;
        token.name = dbUser.name;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      session.user.username = (token.username as string) ?? "";
      session.user.role = (token.role as string) ?? "USER";
      return session;
    },
  },
  events: {
    // OAuth sign-ups arrive without a username; derive one from their profile.
    async createUser({ user }) {
      if (!user.id) return;
      const seed = user.name || user.email?.split("@")[0] || "member";
      await prisma.user.update({
        where: { id: user.id },
        data: { username: `${slugify(seed) || "member"}-${user.id.slice(-4)}` },
      });
    },
  },
});
