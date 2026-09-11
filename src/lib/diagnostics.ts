import { appDatabaseUrl } from "@/lib/db-url";
import { prisma } from "@/lib/prisma";

export type Check = {
  name: string;
  ok: boolean;
  detail: string;
  fix?: string;
};

/**
 * Configuration self-test.
 *
 * Production hides real error messages from the browser, which is right, but it
 * leaves whoever deployed the site with nothing to act on. These checks report
 * only whether each piece is configured and reachable — never a value, never a
 * connection string, never a secret — so it is safe to leave reachable.
 */
export async function runDiagnostics(): Promise<{ ok: boolean; checks: Check[] }> {
  const checks: Check[] = [];

  // --- database url -------------------------------------------------------
  const urlVar = process.env.DATABASE_URL
    ? "DATABASE_URL"
    : process.env.POSTGRES_PRISMA_URL
      ? "POSTGRES_PRISMA_URL"
      : process.env.POSTGRES_URL
        ? "POSTGRES_URL"
        : null;

  const rawUrl = appDatabaseUrl() ?? "";
  // Prisma Postgres / Accelerate hands out a `prisma+postgres://` URL that is an
  // HTTP proxy, not a Postgres endpoint. This app talks to Postgres over the
  // wire through the pg driver adapter, so that URL can never connect — and the
  // failure it produces on its own is unhelpfully generic.
  const isAccelerate = rawUrl.startsWith("prisma+postgres://") || rawUrl.startsWith("prisma://");

  checks.push({
    name: "Database URL",
    ok: Boolean(urlVar) && !isAccelerate,
    detail: !urlVar
      ? "No connection string in the environment"
      : isAccelerate
        ? `${urlVar} holds a Prisma Postgres / Accelerate URL, which this app cannot use`
        : `Found in ${urlVar}`,
    fix: !urlVar
      ? "Vercel: Storage -> Create Database -> Neon, then Connect Project. Or add DATABASE_URL under Settings -> Environment Variables, ticking Production, Preview and Development."
      : isAccelerate
        ? "Connect a plain Postgres database instead (Neon or Supabase). Delete the existing DATABASE_URL first, or the old value keeps winning. A direct postgresql:// string is what this app needs."
        : undefined,
  });

  // --- can we reach it? ---------------------------------------------------
  let connected = false;
  if (urlVar && !isAccelerate) {
    try {
      await prisma.$queryRaw`select 1`;
      connected = true;
      checks.push({ name: "Database connection", ok: true, detail: "Connected" });
    } catch (error) {
      checks.push({
        name: "Database connection",
        ok: false,
        detail: describe(error),
        fix: "Check the host is reachable and the credentials are current. On Neon, use the pooled connection string for the app.",
      });
    }
  } else {
    checks.push({
      name: "Database connection",
      ok: false,
      detail: isAccelerate ? "Skipped — unusable connection string" : "Skipped — no connection string",
    });
  }

  // --- has the schema been created? ---------------------------------------
  if (connected) {
    try {
      const [users, threads, gear] = await Promise.all([
        prisma.user.count(),
        prisma.thread.count(),
        prisma.gear.count(),
      ]);
      const empty = users === 0 && threads === 0;
      checks.push({
        name: "Database schema",
        ok: true,
        detail: `Tables exist — ${users} users, ${threads} threads, ${gear} gear items`,
        fix: empty
          ? 'The schema is there but empty. Run `DATABASE_URL="…" npm run db:seed` to load the starter content.'
          : undefined,
      });
    } catch (error) {
      checks.push({
        name: "Database schema",
        ok: false,
        detail: describe(error),
        fix: 'Tables have not been created yet. Run `DATABASE_URL="…" npx prisma migrate deploy` from your machine — the host does not do this for you.',
      });
    }
  } else {
    checks.push({ name: "Database schema", ok: false, detail: "Skipped — not connected" });
  }

  // --- auth ----------------------------------------------------------------
  checks.push({
    name: "Auth secret",
    ok: Boolean(process.env.AUTH_SECRET),
    detail: process.env.AUTH_SECRET ? "Set" : "AUTH_SECRET is missing",
    fix: process.env.AUTH_SECRET
      ? undefined
      : "Generate one with `openssl rand -base64 32` and add it as AUTH_SECRET.",
  });

  // --- image storage -------------------------------------------------------
  const driver = process.env.STORAGE_DRIVER ?? "local";
  const s3Configured = Boolean(
    process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY,
  );
  const onServerless = Boolean(process.env.VERCEL);
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (driver === "blob") {
    checks.push({
      name: "Image storage",
      ok: blobConfigured,
      detail: blobConfigured
        ? "Vercel Blob store connected"
        : "STORAGE_DRIVER=blob but BLOB_READ_WRITE_TOKEN is missing",
      fix: blobConfigured
        ? undefined
        : "Run `vercel blob create-store <name> --access public` — it links the store and injects the token.",
    });
  } else {
    checks.push({
      name: "Image storage",
      ok: driver === "s3" ? s3Configured : !onServerless,
      detail:
        driver === "s3"
          ? s3Configured
            ? "S3-compatible bucket configured"
            : "STORAGE_DRIVER=s3 but the bucket credentials are incomplete"
          : onServerless
            ? "Writing to the container filesystem, which is discarded on every deploy"
            : "Local disk (fine for development)",
      fix:
        driver === "s3" && s3Configured
          ? undefined
          : onServerless
            ? "Set STORAGE_DRIVER=blob (Vercel Blob, one CLI command) or STORAGE_DRIVER=s3 with the bucket credentials. Uploads are lost on redeploy without one of them."
            : undefined,
    });
  }

  return { ok: checks.every((c) => c.ok), checks };
}

/** Error text without anything that could carry a credential. */
function describe(error: unknown): string {
  if (!(error instanceof Error)) return "Unknown error";
  // Prisma wraps the useful sentence in a multi-line block whose first line is
  // only "Invalid `prisma.user.count()` invocation:". Prefer the line that
  // actually names the problem, and fall back to the first non-empty one.
  const lines = error.message.split("\n").map((l) => l.trim()).filter(Boolean);
  const informative =
    /does not exist|Can't reach|ECONNREFUSED|ENOTFOUND|authentication|password|timeout|SSL/i;
  const line = lines.find((l) => informative.test(l)) ?? lines[0];
  if (!line) return error.name || "Unknown error";
  return line.replace(/postgres(ql)?:\/\/\S+/gi, "[connection string]").slice(0, 200);
}
