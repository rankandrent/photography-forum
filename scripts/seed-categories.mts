import "dotenv/config";
/**
 * Adds and orders the forum's boards.
 *
 *   npm run seed:categories
 *
 * Additive only: boards are upserted by slug and nothing is ever deleted, so it
 * is safe to run against a live forum. Existing boards keep their name,
 * description and colour; only their position and section are updated so they
 * slot into the new order.
 *
 * The set mirrors how established photography forums are organised: an entry
 * point for beginners and buyers, boards for gear and craft, one per major
 * genre, and a place to share work and get critique.
 */
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

type Board = { slug: string; name: string; description: string; color: string; section: string };

const BOARDS: Board[] = [
  // ---- Start here --------------------------------------------------------
  { section: "Start here", slug: "beginners", name: "Beginner questions", color: "#22c55e",
    description: "No question is too basic. Camera settings, first lenses, and where to start." },
  { section: "Start here", slug: "buying-advice", name: "Buying advice", color: "#0891b2",
    description: "Which camera or lens should I buy? Budgets, comparisons, used versus new." },

  // ---- Gear & craft ------------------------------------------------------
  { section: "Gear & craft", slug: "gear-talk", name: "Gear talk", color: "#0ea5e9",
    description: "Cameras, lenses, lighting and the endless question of whether you need the new one." },
  { section: "Gear & craft", slug: "technique", name: "Technique & learning", color: "#10b981",
    description: "Exposure, focus, flash, composition — the craft questions." },
  { section: "Gear & craft", slug: "lighting", name: "Lighting & flash", color: "#eab308",
    description: "Speedlights, strobes, modifiers, reflectors and working with natural light." },
  { section: "Gear & craft", slug: "editing", name: "Editing & post", color: "#f59e0b",
    description: "Lightroom, Capture One, colour grading, retouching and print prep." },
  { section: "Gear & craft", slug: "video", name: "Video & filmmaking", color: "#6366f1",
    description: "Hybrid shooting, frame rates, codecs, audio, gimbals and colour for video." },
  { section: "Gear & craft", slug: "drones", name: "Drones & aerial", color: "#64748b",
    description: "Aerial photography and video, flight rules, and drone gear." },
  { section: "Gear & craft", slug: "mobile", name: "Smartphone photography", color: "#14b8a6",
    description: "Getting the most out of a phone camera: apps, settings, add-on lenses." },
  { section: "Gear & craft", slug: "film", name: "Film & analog", color: "#a16207",
    description: "Film stocks, developing, scanning and classic cameras." },

  // ---- Genres ------------------------------------------------------------
  { section: "Genres", slug: "portrait", name: "Portrait & people", color: "#f43f5e",
    description: "Posing, headshots, family sessions and working with people in front of the lens." },
  { section: "Genres", slug: "landscape", name: "Landscape & nature", color: "#16a34a",
    description: "Light, filters, long exposure and planning around weather." },
  { section: "Genres", slug: "wildlife", name: "Wildlife & birds", color: "#65a30d",
    description: "Long lenses, fieldcraft, autofocus tracking and ethical shooting." },
  { section: "Genres", slug: "street", name: "Street & documentary", color: "#78716c",
    description: "Candid moments, everyday life, and the ethics of photographing in public." },
  { section: "Genres", slug: "weddings-events", name: "Weddings & events", color: "#db2777",
    description: "Shooting the day, low light, second shooters, and delivering to clients." },
  { section: "Genres", slug: "astro-night", name: "Astro & night", color: "#1e3a8a",
    description: "Milky Way, star trails, city nights and noise management." },
  { section: "Genres", slug: "macro", name: "Macro & close-up", color: "#7c3aed",
    description: "Magnification, focus stacking and small-subject lighting." },

  // ---- Share & get feedback ---------------------------------------------
  { section: "Share & get feedback", slug: "critique", name: "Photo critique", color: "#8b5cf6",
    description: "Post a frame, get structured feedback on composition, lighting and editing." },
  { section: "Share & get feedback", slug: "showcase", name: "Showcase", color: "#ec4899",
    description: "Work you are proud of. No critique unless you ask for it." },

  // ---- Community ---------------------------------------------------------
  { section: "Community", slug: "business", name: "The business", color: "#ef4444",
    description: "Pricing, contracts, clients, weddings, and getting paid on time." },
  { section: "Community", slug: "deals", name: "Deals & price drops", color: "#ea580c",
    description: "Spotted a good price on gear? Share it. Deals only — no private sales." },
  { section: "Community", slug: "site-feedback", name: "Site feedback & help", color: "#475569",
    description: "Suggestions, bugs, and questions about how the forum works." },
];

async function main() {
  const existing = new Set((await prisma.category.findMany({ select: { slug: true } })).map((c) => c.slug));
  let added = 0;

  for (const [index, board] of BOARDS.entries()) {
    const position = index + 1;
    await prisma.category.upsert({
      where: { slug: board.slug },
      // An existing board keeps the wording the community already knows.
      update: { position, section: board.section },
      create: { ...board, position },
    });
    if (!existing.has(board.slug)) added += 1;
  }

  // Anything on the forum that isn't in this list still exists; move it to the
  // end rather than guessing where it belongs.
  const known = new Set(BOARDS.map((b) => b.slug));
  const unlisted = (await prisma.category.findMany({ select: { slug: true } })).filter((c) => !known.has(c.slug));
  for (const [i, c] of unlisted.entries()) {
    await prisma.category.update({ where: { slug: c.slug }, data: { position: BOARDS.length + i + 1 } });
  }

  const total = await prisma.category.count();
  console.log(`Added ${added} boards; ${total} boards total${unlisted.length ? ` (${unlisted.length} unlisted kept at the end)` : ""}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
