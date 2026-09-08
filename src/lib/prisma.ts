import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// One pool per process: Next.js dev reloads the module on every edit, so cache
// the client on globalThis or you exhaust the database's connection limit
// within a few saves.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set — copy .env.example to .env first.");
  }
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

/**
 * Connected lazily, on first use rather than on import.
 *
 * `next build` loads every route module to collect its config, including routes
 * that only touch the database at request time. Constructing the client at
 * module scope made an unset DATABASE_URL fail the whole build with an error
 * pointing at this file rather than at the missing variable. Now only an actual
 * query fails, and it fails with the message above.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = (globalForPrisma.prisma ??= createClient());
    const value = Reflect.get(client, property) as unknown;
    // Model accessors are getters; methods must stay bound to the real client.
    return typeof value === "function" ? value.bind(client) : value;
  },
});
