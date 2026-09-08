import { prisma } from "@/lib/prisma";

/**
 * EXIF model strings are messy: "NIKON Z 6_2", "Canon EOS R6m2", "iPhone 15 Pro".
 * Each Gear row carries a comma-separated `exifAliases` list of lowercased
 * strings; we match on those first and fall back to the display name.
 */
function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export type GearMatch = { id: string; slug: string; name: string };

export async function matchGear(
  cameraModel: string | null,
  lensModel: string | null,
): Promise<{ cameraGearId: string | null; lensGearId: string | null }> {
  if (!cameraModel && !lensModel) return { cameraGearId: null, lensGearId: null };

  // The gear table is small (hundreds of rows); one read beats N queries.
  const gear = await prisma.gear.findMany({
    select: { id: true, name: true, type: true, exifAliases: true },
  });

  const find = (raw: string | null, wantLens: boolean) => {
    if (!raw) return null;
    const needle = normalise(raw);
    if (!needle) return null;

    const candidates = gear.filter((g) =>
      wantLens ? g.type === "LENS" : g.type === "CAMERA",
    );

    for (const g of candidates) {
      const aliases = g.exifAliases
        .split(",")
        .map((a) => normalise(a))
        .filter(Boolean);
      if (aliases.includes(needle)) return g.id;
    }
    for (const g of candidates) {
      if (normalise(g.name) === needle) return g.id;
    }
    // Last resort: the EXIF string contains the product name ("Canon EOS R6"
    // inside "Canon EOS R6 Mark II" would over-match, so require the longer
    // side to be the EXIF value and the name to be at least 6 characters).
    for (const g of candidates) {
      const name = normalise(g.name);
      if (name.length >= 6 && needle.includes(name)) return g.id;
    }
    return null;
  };

  return {
    cameraGearId: find(cameraModel, false),
    lensGearId: find(lensModel, true),
  };
}
