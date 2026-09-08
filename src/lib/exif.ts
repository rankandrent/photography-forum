import exifr from "exifr";

export type ExifData = {
  cameraMake: string | null;
  cameraModel: string | null;
  lensModel: string | null;
  focalLength: number | null;
  aperture: number | null;
  shutterSpeed: string | null;
  iso: number | null;
  takenAt: Date | null;
};

const EMPTY: ExifData = {
  cameraMake: null,
  cameraModel: null,
  lensModel: null,
  focalLength: null,
  aperture: null,
  shutterSpeed: null,
  iso: null,
  takenAt: null,
};

/** 0.005 -> "1/200", 2 -> "2s". Photographers read shutter speed as a fraction. */
export function formatShutterSpeed(seconds: unknown): string | null {
  const s = typeof seconds === "number" ? seconds : Number(seconds);
  if (!Number.isFinite(s) || s <= 0) return null;
  if (s >= 1) return `${Number(s.toFixed(1))}s`;
  return `1/${Math.round(1 / s)}`;
}

function str(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function num(value: unknown): number | null {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Read EXIF from image bytes. Never throws: a photo without EXIF (screenshots,
 * anything exported through Instagram) is normal, not an error.
 */
export async function readExif(buffer: Buffer): Promise<ExifData> {
  try {
    const raw = await exifr.parse(buffer, {
      tiff: true,
      exif: true,
      pick: [
        "Make",
        "Model",
        "LensModel",
        "FocalLength",
        "FNumber",
        "ExposureTime",
        "ISO",
        "ISOSpeedRatings",
        "PhotographicSensitivity",
        "DateTimeOriginal",
      ],
    });
    if (!raw) return EMPTY;

    const taken = raw.DateTimeOriginal;
    return {
      cameraMake: str(raw.Make),
      cameraModel: str(raw.Model),
      lensModel: str(raw.LensModel),
      focalLength: num(raw.FocalLength),
      aperture: num(raw.FNumber),
      shutterSpeed: formatShutterSpeed(raw.ExposureTime),
      iso: num(raw.ISO ?? raw.ISOSpeedRatings ?? raw.PhotographicSensitivity),
      takenAt: taken instanceof Date && !Number.isNaN(taken.getTime()) ? taken : null,
    };
  } catch {
    return EMPTY;
  }
}

/** "NIKON CORPORATION" + "NIKON Z 6II" -> "Nikon Z 6II" */
export function displayCamera(make: string | null, model: string | null): string | null {
  if (!model) return make;
  if (!make) return model;
  const firstWord = make.split(/\s+/)[0];
  if (model.toLowerCase().startsWith(firstWord.toLowerCase())) return model;
  return `${firstWord} ${model}`;
}
