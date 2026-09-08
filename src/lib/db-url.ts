/**
 * Where the Postgres connection string comes from.
 *
 * `DATABASE_URL` is the name this project documents, but Vercel's own Postgres
 * integrations inject their own names when you attach a database from the
 * Storage tab. Accepting those too means "create database, connect, redeploy"
 * works without anyone hand-copying a connection string.
 *
 * Pooled connections are correct for the app: serverless functions open many
 * short-lived connections and a pooler is what keeps Postgres from running out.
 */
export function appDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    undefined
  );
}

/**
 * Migrations are the exception: they need a direct connection, because a
 * transaction pooler cannot run the statements `prisma migrate` issues. Hosts
 * that offer a pooler also publish an unpooled URL — prefer it here, and fall
 * back to the ordinary one for a plain Postgres server that has neither.
 */
export function migrationDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL_NON_POOLING ||
    appDatabaseUrl()
  );
}
