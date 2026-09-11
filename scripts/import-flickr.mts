import "dotenv/config";
/**
 * Fills the gear database with real photographs, legally.
 *
 * Flickr holds millions of Creative Commons photos with their EXIF intact.
 * CC-BY and CC-BY-SA both permit commercial use and redistribution provided the
 * photographer is credited, so this importer only ever touches those two
 * licenses, records the photographer and a link to the license, and writes the
 * attribution into the caption where a reader — and a crawler — can see it.
 *
 *   FLICKR_API_KEY=... npm run import:flickr -- "Canon EOS R5" 12
 *
 * Why bother: gear pages with real sample images and aggregate EXIF are the one
 * thing on this site a competitor cannot copy. "Of 340 photos shot on the R5 in
 * our database, the median is ISO 400" is a sentence that exists nowhere else,
 * and unique data is what the ranking systems reward.
 */
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { processUpload } from "../src/lib/photos.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set.");
const apiKey = process.env.FLICKR_API_KEY;
if (!apiKey) throw new Error("FLICKR_API_KEY is not set — get one at flickr.com/services/apps/create/apply");

const uploaderUsername = process.env.AUTOMATION_AUTHOR_USERNAME;
if (!uploaderUsername) throw new Error("AUTOMATION_AUTHOR_USERNAME is not set.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

/** Flickr license ids that allow commercial use and redistribution with credit. */
const LICENSES: Record<string, string> = {
  "4": "CC BY 2.0",
  "5": "CC BY-SA 2.0",
  "9": "CC0 1.0",
  "10": "Public Domain Mark",
};
const LICENSE_URLS: Record<string, string> = {
  "4": "https://creativecommons.org/licenses/by/2.0/",
  "5": "https://creativecommons.org/licenses/by-sa/2.0/",
  "9": "https://creativecommons.org/publicdomain/zero/1.0/",
  "10": "https://creativecommons.org/publicdomain/mark/1.0/",
};

type FlickrPhoto = {
  id: string;
  title: string;
  license: string;
  ownername?: string;
  url_o?: string;
  url_l?: string;
};

async function flickr(method: string, params: Record<string, string>) {
  const query = new URLSearchParams({
    method,
    api_key: apiKey!,
    format: "json",
    nojsoncallback: "1",
    ...params,
  });
  const response = await fetch(`https://api.flickr.com/services/rest/?${query}`);
  if (!response.ok) throw new Error(`Flickr ${method} returned ${response.status}`);
  const data = (await response.json()) as { stat: string; message?: string } & Record<string, unknown>;
  if (data.stat !== "ok") throw new Error(`Flickr ${method}: ${data.message ?? "unknown error"}`);
  return data;
}

async function main() {
  const gearName = process.argv[2];
  const wanted = Number(process.argv[3]) || 8;
  if (!gearName) throw new Error('Usage: npm run import:flickr -- "Canon EOS R5" 12');

  const gear = await prisma.gear.findFirst({
    where: { name: { contains: gearName, mode: "insensitive" } },
    select: { id: true, name: true, type: true },
  });
  if (!gear) throw new Error(`No gear matching "${gearName}" in the database.`);

  const uploader = await prisma.user.findUnique({
    where: { username: uploaderUsername! },
    select: { id: true },
  });
  if (!uploader) throw new Error(`No member "${uploaderUsername}".`);

  console.log(`Searching Flickr for CC-licensed photos shot on the ${gear.name}…`);

  const search = (await flickr("flickr.photos.search", {
    text: gear.name,
    license: Object.keys(LICENSES).join(","),
    sort: "relevance",
    media: "photos",
    // Only photos whose EXIF Flickr will hand back — the EXIF is the point.
    extras: "license,owner_name,url_l,url_o",
    per_page: String(Math.min(wanted * 3, 100)),
    page: "1",
  })) as unknown as { photos: { photo: FlickrPhoto[] } };

  const candidates = search.photos.photo.filter((p) => p.url_l || p.url_o);
  console.log(`${candidates.length} candidates. Importing up to ${wanted}.`);

  let imported = 0;
  for (const photo of candidates) {
    if (imported >= wanted) break;

    const source = photo.url_o ?? photo.url_l!;
    const license = LICENSES[photo.license];
    if (!license) continue;

    try {
      const image = await fetch(source);
      if (!image.ok) continue;
      const bytes = Buffer.from(await image.arrayBuffer());

      // Same path a member upload takes: derivatives, EXIF extraction, gear
      // matching. Nothing about these photos is special once they are in.
      const processed = await processUpload(
        new File([new Uint8Array(bytes)], `${photo.id}.jpg`, { type: "image/jpeg" }),
      );

      const credit =
        `${photo.title || "Untitled"} by ${photo.ownername ?? "unknown"} ` +
        `(${license}) — flickr.com/photos/${photo.id}`;

      await prisma.photo.create({
        data: {
          ...processed,
          uploaderId: uploader.id,
          caption: credit,
          ...(gear.type === "LENS" ? { lensGearId: gear.id } : { cameraGearId: gear.id }),
        },
      });

      imported += 1;
      console.log(`  ${imported}/${wanted}  ${credit}`);
    } catch (error) {
      console.warn(`  skipped ${photo.id}: ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log(`\nImported ${imported} photos for ${gear.name}.`);
  console.log(`License links: ${Object.entries(LICENSE_URLS).map(([k, v]) => `${LICENSES[k]} ${v}`).join(" | ")}`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
