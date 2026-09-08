import "dotenv/config";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import bcrypt from "bcryptjs";
import sharp from "sharp";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads", "seed");

/**
 * Seed images are generated, not downloaded, so `npm run db:seed` works offline
 * and ships no third-party photographs. Each one is a soft gradient at the same
 * three sizes the real upload pipeline produces.
 */
async function makeImage(id: string, hue: number, portrait = false) {
  const w = portrait ? 1200 : 1600;
  const h = portrait ? 1600 : 1067;
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stop-color="hsl(${hue},55%,62%)"/>
           <stop offset="55%" stop-color="hsl(${(hue + 35) % 360},45%,38%)"/>
           <stop offset="100%" stop-color="hsl(${(hue + 70) % 360},40%,18%)"/>
         </linearGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#g)"/>
       <circle cx="${w * 0.7}" cy="${h * 0.3}" r="${h * 0.18}" fill="hsl(${hue},70%,80%)" opacity="0.35"/>
     </svg>`,
  );

  const base = sharp(svg);
  const keys = {
    originalKey: `seed/${id}-orig.jpg`,
    displayKey: `seed/${id}-1600.webp`,
    thumbKey: `seed/${id}-400.webp`,
  };

  await mkdir(UPLOAD_ROOT, { recursive: true });
  await Promise.all([
    base.clone().jpeg({ quality: 85 }).toBuffer().then((b) => writeFile(path.join(process.cwd(), "public", "uploads", keys.originalKey), b)),
    base.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer().then((b) => writeFile(path.join(process.cwd(), "public", "uploads", keys.displayKey), b)),
    base.clone().resize({ width: 400 }).webp({ quality: 72 }).toBuffer().then((b) => writeFile(path.join(process.cwd(), "public", "uploads", keys.thumbKey), b)),
  ]);

  return { ...keys, width: w, height: h, bytes: 900_000 };
}

const CATEGORIES = [
  {
    slug: "gear-talk",
    name: "Gear talk",
    description: "Cameras, lenses, lighting and the endless question of whether you need the new one.",
    color: "#0ea5e9",
    position: 1,
  },
  {
    slug: "critique",
    name: "Photo critique",
    description: "Post a frame, get structured feedback on composition, lighting and editing.",
    color: "#8b5cf6",
    position: 2,
  },
  {
    slug: "editing",
    name: "Editing & post",
    description: "Lightroom, Capture One, colour grading, retouching and print prep.",
    color: "#f59e0b",
    position: 3,
  },
  {
    slug: "technique",
    name: "Technique & learning",
    description: "Exposure, focus, flash, composition — the craft questions.",
    color: "#10b981",
    position: 4,
  },
  {
    slug: "business",
    name: "The business",
    description: "Pricing, contracts, clients, weddings, and getting paid on time.",
    color: "#ef4444",
    position: 5,
  },
  {
    slug: "showcase",
    name: "Showcase",
    description: "Work you are proud of. No critique unless you ask for it.",
    color: "#ec4899",
    position: 6,
  },
];

const GEAR = [
  { slug: "sony-a7-iv", name: "Sony a7 IV", brand: "Sony", type: "CAMERA", releaseYear: 2021, exifAliases: "ILCE-7M4,a7 IV", description: "33MP full-frame hybrid body; the default all-rounder recommendation on this forum." },
  { slug: "sony-a7c-ii", name: "Sony a7C II", brand: "Sony", type: "CAMERA", releaseYear: 2023, exifAliases: "ILCE-7CM2", description: "Compact full-frame body with the a7 IV sensor." },
  { slug: "canon-eos-r6-mark-ii", name: "Canon EOS R6 Mark II", brand: "Canon", type: "CAMERA", releaseYear: 2022, exifAliases: "Canon EOS R6m2,EOS R6 Mark II", description: "24MP full-frame with class-leading autofocus for events." },
  { slug: "canon-eos-r5", name: "Canon EOS R5", brand: "Canon", type: "CAMERA", releaseYear: 2020, exifAliases: "Canon EOS R5,EOS R5", description: "45MP body popular for weddings and commercial work." },
  { slug: "nikon-z6-ii", name: "Nikon Z 6II", brand: "Nikon", type: "CAMERA", releaseYear: 2020, exifAliases: "NIKON Z 6_2,NIKON Z 6II", description: "Dual-processor 24MP full-frame; excellent low light." },
  { slug: "nikon-z8", name: "Nikon Z 8", brand: "Nikon", type: "CAMERA", releaseYear: 2023, exifAliases: "NIKON Z 8", description: "45MP stacked sensor, effectively a smaller Z 9." },
  { slug: "fujifilm-x-t5", name: "Fujifilm X-T5", brand: "Fujifilm", type: "CAMERA", releaseYear: 2022, exifAliases: "X-T5", description: "40MP APS-C with the film simulations people actually buy Fuji for." },
  { slug: "fujifilm-x100vi", name: "Fujifilm X100VI", brand: "Fujifilm", type: "CAMERA", releaseYear: 2024, exifAliases: "X100VI", description: "Fixed 35mm-equivalent compact; the street photography cult favourite." },
  { slug: "leica-q3", name: "Leica Q3", brand: "Leica", type: "CAMERA", releaseYear: 2023, exifAliases: "LEICA Q3", description: "Fixed 28mm f/1.7 full-frame compact." },
  { slug: "om-system-om-1", name: "OM System OM-1", brand: "OM System", type: "CAMERA", releaseYear: 2022, exifAliases: "OM-1", description: "Micro Four Thirds flagship; the wildlife and hiking pick." },

  { slug: "sony-fe-35mm-f14-gm", name: "Sony FE 35mm f/1.4 GM", brand: "Sony", type: "LENS", releaseYear: 2021, exifAliases: "FE 35mm F1.4 GM", description: "Sharp wide-normal prime for documentary and environmental portraits." },
  { slug: "sony-fe-85mm-f14-gm", name: "Sony FE 85mm f/1.4 GM", brand: "Sony", type: "LENS", releaseYear: 2016, exifAliases: "FE 85mm F1.4 GM", description: "The portrait lens most Sony shooters here end up with." },
  { slug: "sony-fe-24-70mm-f28-gm-ii", name: "Sony FE 24-70mm f/2.8 GM II", brand: "Sony", type: "LENS", releaseYear: 2022, exifAliases: "FE 24-70mm F2.8 GM II", description: "Lighter second-generation workhorse zoom." },
  { slug: "canon-rf-50mm-f12l", name: "Canon RF 50mm f/1.2L USM", brand: "Canon", type: "LENS", releaseYear: 2018, exifAliases: "RF50mm F1.2 L USM", description: "Rendering that sells the RF system, at a weight that reminds you of it." },
  { slug: "canon-rf-24-70mm-f28l", name: "Canon RF 24-70mm f/2.8L IS USM", brand: "Canon", type: "LENS", releaseYear: 2019, exifAliases: "RF24-70mm F2.8 L IS USM", description: "Stabilised standard zoom for events." },
  { slug: "nikon-z-50mm-f18-s", name: "Nikkor Z 50mm f/1.8 S", brand: "Nikon", type: "LENS", releaseYear: 2018, exifAliases: "NIKKOR Z 50mm f/1.8 S", description: "Punches far above its price; the usual first Z prime." },
  { slug: "nikon-z-24-70mm-f28-s", name: "Nikkor Z 24-70mm f/2.8 S", brand: "Nikon", type: "LENS", releaseYear: 2019, exifAliases: "NIKKOR Z 24-70mm f/2.8 S", description: "Reference-grade standard zoom." },
  { slug: "fujinon-xf-23mm-f14-r-lm-wr", name: "Fujinon XF 23mm f/1.4 R LM WR", brand: "Fujifilm", type: "LENS", releaseYear: 2021, exifAliases: "XF23mmF1.4 R LM WR", description: "35mm-equivalent prime, weather sealed and fast focusing." },
  { slug: "sigma-56mm-f14-dc-dn", name: "Sigma 56mm f/1.4 DC DN", brand: "Sigma", type: "LENS", releaseYear: 2018, exifAliases: "56mm F1.4 DC DN | C", description: "The budget APS-C portrait prime everyone recommends." },
  { slug: "tamron-28-75mm-f28-g2", name: "Tamron 28-75mm f/2.8 Di III VXD G2", brand: "Tamron", type: "LENS", releaseYear: 2021, exifAliases: "28-75mm F/2.8 Di III VXD G2 A063", description: "Half the price of a first-party 24-70 and close enough for most work." },

  { slug: "godox-ad200-pro", name: "Godox AD200 Pro", brand: "Godox", type: "LIGHTING", releaseYear: 2018, exifAliases: "", description: "200Ws battery strobe; the standard portable light on this forum." },
  { slug: "profoto-b10x", name: "Profoto B10X", brand: "Profoto", type: "LIGHTING", releaseYear: 2021, exifAliases: "", description: "Compact 250Ws monolight with excellent modelling light." },
  { slug: "peak-design-travel-tripod", name: "Peak Design Travel Tripod", brand: "Peak Design", type: "ACCESSORY", releaseYear: 2019, exifAliases: "", description: "Packs small enough that you actually bring it." },
  { slug: "nisi-v7-filter-holder", name: "NiSi V7 Filter Holder", brand: "NiSi", type: "ACCESSORY", releaseYear: 2021, exifAliases: "", description: "100mm square filter system for long exposures." },
];

const USERS = [
  { username: "admin", name: "Site Admin", email: "admin@example.com", role: "ADMIN", bio: "Runs the place. Shoots landscapes badly.", location: "Lahore, PK" },
  { username: "hira", name: "Hira Qureshi", email: "hira@example.com", role: "MOD", bio: "Wedding photographer, 9 years. Available light unless the venue makes me.", location: "Karachi, PK", instagram: "hiraq.photo" },
  { username: "danish", name: "Danish Ali", email: "danish@example.com", role: "USER", bio: "Street and documentary. One camera, one lens, mostly.", location: "Islamabad, PK" },
  { username: "maria", name: "Maria Santos", email: "maria@example.com", role: "USER", bio: "Studio portraits and food. Strobes over sunlight.", location: "Lisbon, PT" },
  { username: "tomasz", name: "Tomasz Nowak", email: "tomasz@example.com", role: "USER", bio: "Landscape and long exposure. Will talk about filters for hours.", location: "Kraków, PL" },
  { username: "ayesha", name: "Ayesha Khan", email: "ayesha@example.com", role: "USER", bio: "Two years in, still figuring out flash.", location: "Lahore, PK" },
  { username: "kenji", name: "Kenji Watanabe", email: "kenji@example.com", role: "USER", bio: "Product photography, mostly watches.", location: "Osaka, JP" },
  { username: "rosa", name: "Rosa Iversen", email: "rosa@example.com", role: "USER", bio: "Wildlife. Long lenses, cold mornings.", location: "Bergen, NO" },
];

type ThreadSeed = {
  category: string;
  kind: "DISCUSSION" | "CRITIQUE" | "SHOWCASE";
  author: string;
  title: string;
  body: string;
  tags: string[];
  photo?: { hue: number; portrait?: boolean; camera: string; lens: string; focal: number; aperture: number; shutter: string; iso: number };
  replies: { author: string; body: string; answer?: boolean }[];
};

const THREADS: ThreadSeed[] = [
  {
    category: "technique",
    kind: "DISCUSSION",
    author: "ayesha",
    title: "Why are my indoor portraits soft at f/1.8 even though focus confirms?",
    body: "Shooting indoors at f/1.8, 1/80s, ISO 3200. Eye AF locks on and the green box is on the eye, but at 100% the eyelashes are never crisp. Tripod does not help. Is this a shutter speed problem, a lens problem, or me?",
    tags: ["portrait", "autofocus", "low-light"],
    replies: [
      { author: "hira", body: "1/80s is your problem, not the lens. At 85mm-equivalent with a person who breathes, you want 1/160s minimum — subject motion, not camera shake, is what is killing you. Raise ISO to 6400 before you drop below 1/160. Modern full frame at 6400 is cleaner than a blurry frame at 3200.", answer: true },
      { author: "danish", body: "Also check whether you are focusing and then recomposing. At f/1.8 the focal plane is a few centimetres deep — a small pivot moves the eye out of it." },
      { author: "maria", body: "One more: if you are shooting wide open in a dim room, the AF system is working at its limit. Try adding a little continuous light, even a lamp behind you. Contrast helps the AF as much as it helps you." },
    ],
  },
  {
    category: "gear-talk",
    kind: "DISCUSSION",
    author: "ayesha",
    title: "Sony a7 IV or Canon R6 Mark II for wedding work in 2026?",
    body: "Second shooter moving up to primary next season. Budget covers either body plus a 24-70 f/2.8. Most of my work is dim reception halls. Which system would you commit to, and why?",
    tags: ["wedding", "camera-body"],
    replies: [
      { author: "hira", body: "I shoot both at work. The R6 II autofocus in dark receptions is a step ahead — it locks in situations where my a7 IV hunts. But the a7 IV gives you 33MP, which matters if you crop for albums. If your reception halls are genuinely dark, take the Canon.", answer: true },
      { author: "kenji", body: "Also worth pricing the whole system, not the body. Second-hand Sony glass is deeper and cheaper right now." },
    ],
  },
  {
    category: "critique",
    kind: "CRITIQUE",
    author: "danish",
    title: "Critique wanted: evening street frame, unsure about the crop",
    body: "Shot on a walk home. I like the light on the wall but I keep going back and forth on whether the right third is dead space or breathing room. Honest ratings please — especially composition.",
    tags: ["street", "critique"],
    photo: { hue: 24, camera: "X100VI", lens: "XF23mmF1.4 R LM WR", focal: 23, aperture: 2, shutter: "1/250", iso: 800 },
    replies: [
      { author: "tomasz", body: "The right side is breathing room, keep it — but the horizon is a degree off and it is the first thing my eye caught. Straighten it and the frame settles." },
      { author: "maria", body: "Agreed on the crop. I would lift the shadows on the wall about 15 points; right now the texture you liked is barely readable at web size." },
    ],
  },
  {
    category: "editing",
    kind: "DISCUSSION",
    author: "maria",
    title: "How do you keep skin tones consistent across a 600-image wedding set?",
    body: "I colour-correct the hero images beautifully and then spend six hours dragging the rest towards them. There has to be a workflow here that is not manual.",
    tags: ["lightroom", "colour", "wedding"],
    replies: [
      { author: "hira", body: "Reference frame per lighting scenario. Pick one image per venue/light setup, grade it fully, then sync white balance and the HSL panel only — never exposure — to that scenario's group. Getting from 600 to about 8 reference frames is the whole trick.", answer: true },
      { author: "kenji", body: "A colour checker in one frame per scenario pays for itself the first wedding you use it." },
    ],
  },
  {
    category: "gear-talk",
    kind: "DISCUSSION",
    author: "tomasz",
    title: "Is a 100mm square filter system still worth it, or is bracketing enough?",
    body: "I own a NiSi holder and three ND grads. Half the landscape shooters I know have gone fully digital-blend. Convince me either way.",
    tags: ["landscape", "filters", "long-exposure"],
    replies: [
      { author: "rosa", body: "Big stopper ND still has no digital equivalent — you cannot fake 120 seconds of water. Grads I stopped carrying; bracketing genuinely replaced them." },
      { author: "tomasz", body: "That is roughly where I have landed too. The 10-stop stays, the grads live in a drawer." },
    ],
  },
  {
    category: "business",
    kind: "DISCUSSION",
    author: "hira",
    title: "What do you actually put in a wedding contract to protect yourself?",
    body: "After a client asked for a full refund three weeks post-delivery because a relative did not like their photos, I am rewriting mine from scratch. What clauses have saved you?",
    tags: ["contracts", "wedding", "pricing"],
    replies: [
      { author: "maria", body: "Non-refundable retainer, stated as a booking fee for the date. Delivery window in business days. An explicit clause that creative and editing decisions are yours. And a cap on liability at the amount paid." },
      { author: "kenji", body: "Add a clause on guest interference — I now charge for reshoots caused by uncle-with-a-flash situations." },
    ],
  },
  {
    category: "showcase",
    kind: "SHOWCASE",
    author: "rosa",
    title: "Sea eagle at first light, three cold mornings for one frame",
    body: "Fjord north of Bergen, shot from a boat. Third morning was the only one with usable light. Not asking for critique, just wanted to put it somewhere people would understand what it cost.",
    tags: ["wildlife", "birds"],
    photo: { hue: 200, camera: "NIKON Z 8", lens: "NIKKOR Z 24-70mm f/2.8 S", focal: 70, aperture: 2.8, shutter: "1/2000", iso: 1600 },
    replies: [
      { author: "danish", body: "Worth the cold. The separation from the background is what makes it." },
      { author: "ayesha", body: "Three mornings is the part beginners never hear about. Thanks for saying it." },
    ],
  },
  {
    category: "critique",
    kind: "CRITIQUE",
    author: "ayesha",
    title: "First paid portrait session — where am I losing it?",
    body: "Natural light, north-facing window, reflector camera-left. Client is happy, I am not. Something about it reads amateur to me and I cannot name what.",
    tags: ["portrait", "critique", "natural-light"],
    photo: { hue: 340, portrait: true, camera: "ILCE-7M4", lens: "FE 85mm F1.4 GM", focal: 85, aperture: 1.8, shutter: "1/200", iso: 400 },
    replies: [
      { author: "maria", body: "It is the catchlights. The reflector is too low, so the eyes have a bright band under the pupil instead of a clean highlight at 10 or 11 o'clock. Raise it to just above eye level and the whole frame will read more professional." },
      { author: "hira", body: "Second that. Also crop is at the wrist — cutting at a joint always looks accidental. Crop above or below it." },
    ],
  },
  {
    category: "technique",
    kind: "DISCUSSION",
    author: "kenji",
    title: "Focus stacking watches: how many frames is enough?",
    body: "Shooting at f/8 on a 100mm macro. I have been taking 30 frames per watch out of paranoia. Is there a way to calculate the number I actually need?",
    tags: ["macro", "product", "focus-stacking"],
    replies: [
      { author: "tomasz", body: "Work out the depth of field at your aperture and magnification, then step by about 70% of that. For a watch at f/8 you are usually looking at 12 to 18 frames, not 30." },
    ],
  },
  {
    category: "editing",
    kind: "DISCUSSION",
    author: "danish",
    title: "Capture One vs Lightroom in 2026 — has the gap closed?",
    body: "Been on Lightroom Classic for years. Every time I try Capture One I like the colour but hate the catalogue. Anyone made the switch and stayed?",
    tags: ["lightroom", "capture-one", "workflow"],
    replies: [
      { author: "maria", body: "Switched two years ago, stayed. The layers and the colour editor are genuinely better for skin. The catalogue is still worse — I use sessions per job instead and never touch the catalogue." },
      { author: "hira", body: "I run both: Capture One tethered in studio, Lightroom for volume culling. Not elegant, but each is better at one job." },
    ],
  },
  {
    category: "gear-talk",
    kind: "DISCUSSION",
    author: "ayesha",
    title: "Do I need a 24-70 f/2.8 if I already own three fast primes?",
    body: "35mm, 50mm and 85mm, all f/1.8. Everyone tells me the zoom is essential for events but I do not want to spend the money if the primes cover it.",
    tags: ["lenses", "zoom", "primes"],
    replies: [
      { author: "hira", body: "For events, yes — not for image quality, for the lens changes you will not be making while something happens. At a wedding the zoom is a workflow tool, not an optical upgrade.", answer: true },
      { author: "danish", body: "For street, no. Keep the primes." },
    ],
  },
  {
    category: "showcase",
    kind: "SHOWCASE",
    author: "tomasz",
    title: "Six-minute exposure, Baltic coast before sunrise",
    body: "10-stop ND, tripod buried in the sand, and a lot of waiting. The colour is straight out of the RAW apart from a slight highlight recovery.",
    tags: ["long-exposure", "landscape", "seascape"],
    photo: { hue: 210, camera: "NIKON Z 6_2", lens: "NIKKOR Z 24-70mm f/2.8 S", focal: 24, aperture: 11, shutter: "360s", iso: 64 },
    replies: [{ author: "rosa", body: "The gradient in the sky is beautiful. Six minutes well spent." }],
  },
  {
    category: "business",
    kind: "DISCUSSION",
    author: "maria",
    title: "How do you price a half-day commercial shoot when the client wants 'all the files'?",
    body: "A restaurant wants a menu shoot and asked for unlimited usage of every frame. I have always licensed per image. How do you structure this without losing money or the client?",
    tags: ["pricing", "commercial", "licensing"],
    replies: [
      { author: "kenji", body: "Price the day rate for your time, then a separate buyout for unlimited usage — typically 1.5 to 3x the day rate depending on the term. Show it as two lines on the quote so the client sees what the buyout costs." },
    ],
  },
  {
    category: "technique",
    kind: "DISCUSSION",
    author: "rosa",
    title: "Back-button focus: worth relearning after ten years of half-press?",
    body: "Everyone in wildlife swears by it. I have tried twice and gone back both times. Does it actually help, or is it a habit people defend because they invested in it?",
    tags: ["autofocus", "wildlife"],
    replies: [
      { author: "danish", body: "It helps specifically when you need to hold focus and recompose repeatedly, or switch between tracking and locked focus without menu diving. If neither is your situation, half-press is fine — it is a tool, not a virtue." },
      { author: "hira", body: "Give it a full month, not a weekend. The first two weeks feel worse than half-press for everyone." },
    ],
  },
  {
    category: "critique",
    kind: "CRITIQUE",
    author: "kenji",
    title: "Product shot — is the reflection too strong?",
    body: "Black acrylic base, two strip boxes. I like the reflection but a client said it reads as clutter. Rate the composition and editing honestly.",
    tags: ["product", "critique", "studio"],
    photo: { hue: 270, camera: "Canon EOS R5", lens: "RF50mm F1.2 L USM", focal: 50, aperture: 8, shutter: "1/160", iso: 100 },
    replies: [
      { author: "maria", body: "The client is right, but the fix is not removing it — it is cutting it at about 40%. A full-length mirror reflection doubles the visual weight of the object." },
    ],
  },
];

async function main() {
  console.log("Clearing existing data…");
  await prisma.$transaction([
    prisma.challengeVote.deleteMany(),
    prisma.challengeEntry.deleteMany(),
    prisma.challenge.deleteMany(),
    prisma.critique.deleteMany(),
    prisma.photo.deleteMany(),
    prisma.vote.deleteMany(),
    prisma.report.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.post.deleteMany(),
    prisma.threadTag.deleteMany(),
    prisma.thread.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.userGear.deleteMany(),
    prisma.gear.deleteMany(),
    prisma.category.deleteMany(),
    prisma.account.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("Categories…");
  await prisma.category.createMany({ data: CATEGORIES });
  const categories = Object.fromEntries(
    (await prisma.category.findMany()).map((c) => [c.slug, c.id]),
  );

  console.log("Gear…");
  await prisma.gear.createMany({
    data: GEAR.map((g) => ({ ...g, type: g.type as "CAMERA" | "LENS" | "LIGHTING" | "ACCESSORY" })),
  });
  const gearRows = await prisma.gear.findMany({ select: { id: true, name: true, exifAliases: true, type: true } });
  const gearByAlias = new Map<string, string>();
  for (const g of gearRows) {
    gearByAlias.set(g.name.toLowerCase(), g.id);
    for (const alias of g.exifAliases.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean)) {
      gearByAlias.set(alias, g.id);
    }
  }

  console.log("Users…");
  const passwordHash = await bcrypt.hash("password123", 12);
  await prisma.user.createMany({
    data: USERS.map((u) => ({
      username: u.username,
      name: u.name,
      email: u.email,
      role: u.role as "USER" | "MOD" | "ADMIN",
      bio: u.bio,
      location: u.location,
      instagram: (u as { instagram?: string }).instagram ?? null,
      passwordHash,
    })),
  });
  const users = Object.fromEntries(
    (await prisma.user.findMany({ select: { id: true, username: true } })).map((u) => [u.username, u.id]),
  );

  console.log("Kits…");
  const kits: Record<string, string[]> = {
    hira: ["canon-eos-r6-mark-ii", "canon-rf-24-70mm-f28l", "godox-ad200-pro"],
    danish: ["fujifilm-x100vi", "fujinon-xf-23mm-f14-r-lm-wr"],
    maria: ["canon-eos-r5", "canon-rf-50mm-f12l", "profoto-b10x"],
    tomasz: ["nikon-z6-ii", "nikon-z-24-70mm-f28-s", "nisi-v7-filter-holder", "peak-design-travel-tripod"],
    ayesha: ["sony-a7-iv", "sony-fe-85mm-f14-gm", "tamron-28-75mm-f28-g2"],
    kenji: ["canon-eos-r5", "canon-rf-50mm-f12l"],
    rosa: ["nikon-z8", "om-system-om-1"],
  };
  const allGear = await prisma.gear.findMany({ select: { id: true, slug: true } });
  const gearBySlug = Object.fromEntries(allGear.map((g) => [g.slug, g.id]));
  await prisma.userGear.createMany({
    data: Object.entries(kits).flatMap(([username, slugs]) =>
      slugs.map((slug) => ({ userId: users[username], gearId: gearBySlug[slug] })),
    ),
  });

  console.log("Threads, replies and photos…");
  let dayOffset = THREADS.length * 2;
  for (const [index, seed] of THREADS.entries()) {
    dayOffset -= 2;
    const createdAt = new Date(Date.now() - dayOffset * 86_400_000);

    const thread = await prisma.thread.create({
      data: {
        slug: seed.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70),
        title: seed.title,
        body: seed.body,
        kind: seed.kind,
        authorId: users[seed.author],
        categoryId: categories[seed.category],
        createdAt,
        lastPostAt: createdAt,
        score: 3 + ((index * 7) % 24),
        viewCount: 40 + ((index * 137) % 900),
        pinned: index === 0,
        tags: {
          create: seed.tags.map((name) => ({
            tag: {
              connectOrCreate: {
                where: { slug: name },
                create: { slug: name, name: name.replace(/-/g, " ") },
              },
            },
          })),
        },
      },
    });

    if (seed.photo) {
      const files = await makeImage(thread.slug, seed.photo.hue, seed.photo.portrait);
      await prisma.photo.create({
        data: {
          ...files,
          uploaderId: users[seed.author],
          threadId: thread.id,
          cameraModel: seed.photo.camera,
          cameraMake: seed.photo.camera.split(/[\s-]/)[0],
          lensModel: seed.photo.lens,
          focalLength: seed.photo.focal,
          aperture: seed.photo.aperture,
          shutterSpeed: seed.photo.shutter,
          iso: seed.photo.iso,
          takenAt: createdAt,
          cameraGearId: gearByAlias.get(seed.photo.camera.toLowerCase()) ?? null,
          lensGearId: gearByAlias.get(seed.photo.lens.toLowerCase()) ?? null,
        },
      });
    }

    let replyAt = createdAt;
    for (const [ri, reply] of seed.replies.entries()) {
      replyAt = new Date(replyAt.getTime() + (2 + ri) * 3_600_000);
      await prisma.post.create({
        data: {
          threadId: thread.id,
          authorId: users[reply.author],
          body: reply.body,
          isAnswer: Boolean(reply.answer),
          score: reply.answer ? 8 + (ri % 5) : 1 + (ri % 4),
          createdAt: replyAt,
        },
      });
    }
    await prisma.thread.update({ where: { id: thread.id }, data: { lastPostAt: replyAt } });
  }

  console.log("Critiques…");
  const critiquePhotos = await prisma.photo.findMany({
    where: { thread: { kind: "CRITIQUE" } },
    select: { id: true, uploaderId: true },
  });
  const critics = ["maria", "hira", "tomasz", "danish"];
  for (const photo of critiquePhotos) {
    for (const [i, critic] of critics.entries()) {
      if (users[critic] === photo.uploaderId) continue;
      await prisma.critique.create({
        data: {
          photoId: photo.id,
          authorId: users[critic],
          composition: 3 + ((i + photo.id.length) % 3),
          lighting: 3 + ((i + 1) % 3),
          editing: 2 + ((i + 2) % 4),
          comment:
            i % 2 === 0
              ? "Strong subject placement, but the frame would be tighter without the empty band along the bottom edge. Lighting is the best part — the falloff on the left reads intentional."
              : "The edit is a touch heavy on clarity; skin and texture are both showing halos at 100%. Pull it back about a third and the frame gets quieter in a good way.",
        },
      });
    }
  }

  console.log("Challenges…");
  const now = Date.now();
  const challenges = await Promise.all([
    prisma.challenge.create({
      data: {
        slug: "week-1-negative-space",
        title: "Week 1 — Negative space",
        theme: "One subject, and the room to breathe around it.",
        description: "Fill less of the frame than feels comfortable. The empty area is the subject.",
        status: "CLOSED",
        startsAt: new Date(now - 21 * 86_400_000),
        endsAt: new Date(now - 14 * 86_400_000),
        votingEndsAt: new Date(now - 10 * 86_400_000),
      },
    }),
    prisma.challenge.create({
      data: {
        slug: "week-2-shot-after-dark",
        title: "Week 2 — Shot after dark",
        theme: "No tripod, no flash. Whatever light is already there.",
        description: "High ISO is allowed and encouraged. Show the settings — the EXIF is half the point.",
        status: "VOTING",
        startsAt: new Date(now - 10 * 86_400_000),
        endsAt: new Date(now - 3 * 86_400_000),
        votingEndsAt: new Date(now + 4 * 86_400_000),
      },
    }),
    prisma.challenge.create({
      data: {
        slug: "week-3-hands",
        title: "Week 3 — Hands",
        theme: "A portrait where the hands carry the story.",
        description: "Faces optional. Show us what the hands are doing and why it matters.",
        status: "OPEN",
        startsAt: new Date(now - 2 * 86_400_000),
        endsAt: new Date(now + 5 * 86_400_000),
        votingEndsAt: new Date(now + 12 * 86_400_000),
      },
    }),
  ]);

  const entrants = ["danish", "maria", "tomasz", "rosa", "kenji"];
  for (const [ci, challenge] of challenges.entries()) {
    if (challenge.status === "OPEN") continue;
    for (const [ei, username] of entrants.entries()) {
      const entry = await prisma.challengeEntry.create({
        data: {
          challengeId: challenge.id,
          userId: users[username],
          caption: ["Late bus, wet street.", "Kitchen window, 6am.", "Harbour lights.", "Neighbour's cat, again.", "Studio after hours."][ei],
        },
      });
      const files = await makeImage(`${challenge.slug}-${username}`, (ci * 90 + ei * 47) % 360);
      await prisma.photo.create({
        data: {
          ...files,
          uploaderId: users[username],
          entryId: entry.id,
          cameraModel: ["X100VI", "Canon EOS R5", "NIKON Z 6_2", "NIKON Z 8", "Canon EOS R5"][ei],
          cameraMake: ["Fujifilm", "Canon", "Nikon", "Nikon", "Canon"][ei],
          lensModel: null,
          focalLength: [23, 50, 35, 70, 50][ei],
          aperture: [2, 1.2, 2.8, 4, 8][ei],
          shutterSpeed: ["1/60", "1/125", "1/30", "1/500", "1/160"][ei],
          iso: [3200, 1600, 6400, 2500, 100][ei],
          takenAt: challenge.startsAt,
          cameraGearId: gearByAlias.get(["x100vi", "canon eos r5", "nikon z 6_2", "nikon z 8", "canon eos r5"][ei]) ?? null,
        },
      });

      // Spread some votes so the closed challenge has a believable podium.
      for (const voter of entrants) {
        if (voter === username) continue;
        if ((ei + voter.length + ci) % 3 === 0) {
          await prisma.challengeVote.create({ data: { entryId: entry.id, userId: users[voter] } });
        }
      }
    }
  }

  console.log("Notifications…");
  await prisma.notification.createMany({
    data: [
      {
        userId: users.ayesha,
        type: "reply",
        title: "Hira Qureshi answered your question about soft portraits",
        href: "/t/why-are-my-indoor-portraits-soft-at-f-1-8-even-though-focus-confirms",
      },
      {
        userId: users.ayesha,
        type: "critique",
        title: "Maria Santos critiqued your photo",
        href: "/t/first-paid-portrait-session-where-am-i-losing-it",
      },
    ],
  });

  const counts = {
    users: await prisma.user.count(),
    threads: await prisma.thread.count(),
    posts: await prisma.post.count(),
    photos: await prisma.photo.count(),
    gear: await prisma.gear.count(),
    challenges: await prisma.challenge.count(),
  };
  console.log("Seed complete:", counts);
  console.log("Sign in with admin@example.com / password123 (every seeded user uses that password).");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
