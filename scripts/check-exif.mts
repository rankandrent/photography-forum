/**
 * Smoke test for the upload pipeline — the feature the whole forum hangs on.
 *
 *   npm run check:exif
 *
 * Builds a JPEG carrying real EXIF, runs it through processUpload(), and prints
 * what the forum would store: settings, derivative keys and the matched gear.
 */
import "dotenv/config";
import sharp from "sharp";
import { processUpload } from "../src/lib/photos.js";
import { readExif } from "../src/lib/exif.js";

async function main() {
  const jpeg = await sharp({
    create: { width: 3000, height: 2000, channels: 3, background: { r: 40, g: 90, b: 140 } },
  })
    .withExif({
      IFD0: { Make: "SONY", Model: "ILCE-7M4" },
      IFD2: {
        LensModel: "FE 85mm F1.4 GM",
        FocalLength: "85",
        FNumber: "1.8",
        ExposureTime: "0.005",
        ISOSpeedRatings: "800",
        DateTimeOriginal: "2026:03:14 18:22:07",
      },
    })
    .jpeg()
    .toBuffer();

  console.log("EXIF read from raw bytes:", await readExif(jpeg));

  const file = new File([new Uint8Array(jpeg)], "check.jpg", { type: "image/jpeg" });
  const result = await processUpload(file);

  console.log("\nStored photo record:");
  console.log({
    camera: `${result.cameraMake} ${result.cameraModel}`,
    lens: result.lensModel,
    exposure: `${result.focalLength}mm f/${result.aperture} ${result.shutterSpeed} ISO ${result.iso}`,
    takenAt: result.takenAt,
    dimensions: `${result.width}x${result.height}`,
    matchedCameraGear: result.cameraGearId ?? "(no match)",
    matchedLensGear: result.lensGearId ?? "(no match)",
    derivatives: [result.thumbKey, result.displayKey, result.originalKey],
  });

  if (!result.cameraGearId || !result.lensGearId) {
    console.error("\nGear matching failed — check Gear.exifAliases in the seed.");
    process.exitCode = 1;
  }
}

main().then(
  () => process.exit(process.exitCode ?? 0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
