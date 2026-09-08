// The Prisma CLI does not read .env on its own in v7; Next.js does.
import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";
import { migrationDatabaseUrl } from "./src/lib/db-url.js";

// Prisma 7 reads the connection URL from here rather than from schema.prisma.
//
// `env("DATABASE_URL")` is deliberately NOT used: it throws while the config is
// being loaded, which breaks `prisma generate` during a build even though
// generating a client needs no database at all. Only migrate/studio/seed need a
// URL, and those fail with a clear message of their own when it is missing.
const url = migrationDatabaseUrl();

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  ...(url ? { datasource: { url } } : {}),
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
