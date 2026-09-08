import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { readExif } from "@/lib/exif";
import { matchGear } from "@/lib/gear";
import { put } from "@/lib/storage";

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15 MB
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/** Widths we serve. Never hand the original to a browser — it is the bandwidth bill. */
const DISPLAY_WIDTH = 1600;
const THUMB_WIDTH = 400;

export type ProcessedPhoto = {
  originalKey: string;
  displayKey: string;
  thumbKey: string;
  width: number;
  height: number;
  bytes: number;
  cameraMake: string | null;
  cameraModel: string | null;
  lensModel: string | null;
  focalLength: number | null;
  aperture: number | null;
  shutterSpeed: string | null;
  iso: number | null;
  takenAt: Date | null;
  cameraGearId: string | null;
  lensGearId: string | null;
};

export class UploadError extends Error {}

/**
 * Validate, read EXIF, generate the two derivatives, store all three.
 *
 * EXIF is read from the ORIGINAL bytes: sharp drops metadata by default, so
 * reading after the resize would silently return nothing.
 */
export async function processUpload(file: File): Promise<ProcessedPhoto> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new UploadError(`Unsupported image type "${file.type || "unknown"}".`);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError(
      `Image is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is ${MAX_UPLOAD_BYTES / 1024 / 1024} MB.`,
    );
  }

  const original = Buffer.from(await file.arrayBuffer());
  const exif = await readExif(original);

  const image = sharp(original, { failOn: "error" });
  const meta = await image.metadata();
  if (!meta.width || !meta.height) throw new UploadError("That file is not a readable image.");

  const id = randomUUID();
  const folder = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const originalKey = `${folder}/${id}-orig.${meta.format ?? "jpg"}`;
  const displayKey = `${folder}/${id}-1600.webp`;
  const thumbKey = `${folder}/${id}-400.webp`;

  const [display, thumb] = await Promise.all([
    sharp(original)
      .rotate() // honour the EXIF orientation flag before stripping metadata
      .resize({ width: DISPLAY_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer(),
    sharp(original)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toBuffer(),
  ]);

  await Promise.all([
    put(originalKey, original, file.type),
    put(displayKey, display, "image/webp"),
    put(thumbKey, thumb, "image/webp"),
  ]);

  const { cameraGearId, lensGearId } = await matchGear(exif.cameraModel, exif.lensModel);

  // A portrait photo carries orientation 5-8; width/height are then swapped
  // relative to what the viewer sees.
  const rotated = (meta.orientation ?? 1) >= 5;

  return {
    originalKey,
    displayKey,
    thumbKey,
    width: rotated ? meta.height : meta.width,
    height: rotated ? meta.width : meta.height,
    bytes: file.size,
    ...exif,
    cameraGearId,
    lensGearId,
  };
}

/** Pull the image files out of a submitted form, ignoring empty file inputs. */
export function filesFrom(formData: FormData, field = "photos"): File[] {
  return formData
    .getAll(field)
    .filter((v): v is File => v instanceof File && v.size > 0);
}
