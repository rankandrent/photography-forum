import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

/**
 * The only file that knows where image bytes live.
 *
 * Two drivers:
 *   STORAGE_DRIVER=local  → public/uploads. Development only. Serverless hosts
 *                           (Vercel, Netlify) give every deploy a fresh, empty,
 *                           read-only-ish filesystem, so uploads vanish.
 *   STORAGE_DRIVER=s3     → any S3-compatible bucket. Cloudflare R2 is the
 *                           cheapest option because it charges no egress.
 *
 * The database stores keys, never URLs, so moving between drivers (or changing
 * CDN domain) never requires a migration.
 */

const LOCAL_ROOT = path.join(process.cwd(), "public", "uploads");

let s3: S3Client | null = null;

function client(): S3Client {
  if (s3) return s3;
  const endpoint = process.env.S3_ENDPOINT;
  const region = process.env.S3_REGION ?? "auto";
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey || !process.env.S3_BUCKET) {
    throw new Error(
      "STORAGE_DRIVER=s3 needs S3_BUCKET, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY.",
    );
  }

  s3 = new S3Client({
    region,
    // R2 and MinIO need an explicit endpoint; plain AWS S3 does not.
    ...(endpoint ? { endpoint, forcePathStyle: true } : {}),
    credentials: { accessKeyId, secretAccessKey },
  });
  return s3;
}

export async function put(key: string, body: Buffer, contentType: string): Promise<void> {
  const driver = process.env.STORAGE_DRIVER ?? "local";

  if (driver === "local") {
    const dest = path.join(LOCAL_ROOT, key);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, body);
    return;
  }

  if (driver === "s3") {
    await client().send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
        // Derivatives are immutable — the key contains a UUID — so cache hard.
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
    return;
  }

  throw new Error(`Unknown STORAGE_DRIVER "${driver}". Use "local" or "s3".`);
}

export function urlFor(key: string): string {
  const base = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL ?? "/uploads";
  return `${base.replace(/\/$/, "")}/${key}`;
}
