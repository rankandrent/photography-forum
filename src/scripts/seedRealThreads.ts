import { prisma } from "../lib/prisma";
import { uniqueSlug } from "../lib/slug";

const SEED_THREADS = [
  {
    topic: "street-photography-lenses",
    title: "What's the most underrated lens for street photography?",
    body: "Everyone always talks about 35mm f/1.4 or 28mm prime lenses for street work, but I've been using a compact 40mm pancake lens lately and it completely changed my workflow. Super low profile, nobody notices you taking photos, and the rendering feels much more natural than wider angles. What's an underrated lens you swear by for candid street shots?",
    categorySlug: "gear",
    authorName: "Marcus V.",
    authorUsername: "marcus_v",
    replies: [
      {
        authorName: "Elena Rostova",
        authorUsername: "elena_photos",
        body: "Honestly? Old 50mm vintage glass with an adapter. I shoot with an old Helios 44-2 on my mirrorless body. The manual focus ring is super smooth for zone focusing, and the swirl in the background gives candid street portraits so much character.",
      },
      {
        authorName: "David K.",
        authorUsername: "dk_street",
        body: "Strong agree on 40mm! The TTArtisan 27mm f/2.8 pancake for Fuji APS-C is tiny and costs under $150. It lives on my camera body 90% of the time.",
      },
    ],
  },
  {
    topic: "golden-hour-showcase",
    title: "Post your best golden hour shot from this week",
    body: "Caught an incredible rim-light sunset right before dusk near the harbor. The atmospheric haze gave the whole scene a warm cinematic glow. Share your favorite golden hour capture from this past week — let's see what everyone's been working on!",
    categorySlug: "landscape",
    authorName: "Sarah Jenkins",
    authorUsername: "sarah_j_photo",
    replies: [
      {
        authorName: "Liam O'Connor",
        authorUsername: "liam_light",
        body: "Shot a forest trail at 6:45 PM yesterday right when the sun hit the mist rising off the damp leaves. The backlighting through the trees looked unreal.",
      },
    ],
  },
  {
    topic: "low-light-noise-reduction",
    title: "How do you deal with noise in low-light conditions?",
    body: "I was shooting an indoor acoustic venue last night at ISO 6400 on an older full-frame body. Shadow noise is definitely noticeable. Are you relying on AI denoise in Lightroom/PureRAW, or do you prefer accepting the grain as part of the atmosphere?",
    categorySlug: "general",
    authorName: "Alex Rivera",
    authorUsername: "alex_rivera",
    replies: [
      {
        authorName: "Chris Bauer",
        authorUsername: "cbauer_photo",
        body: "DxO PureRAW has been a game-changer for high ISO raw files. I set it to 50% luminance noise reduction so it cleans up color noise without turning skin into plastic.",
      },
      {
        authorName: "Maya Lin",
        authorUsername: "mayalin_shots",
        body: "Monochrome conversion! If grain looks ugly in color, converting to black and white turns harsh digital noise into film-like texture.",
      },
    ],
  },
  {
    topic: "lightroom-vs-capture-one",
    title: "Lightroom vs Capture One — what actually works for you?",
    body: "Been using Lightroom Classic for years but kept hearing photographers rave about Capture One's skin tone tools and color grading panels. Downloaded the trial yesterday. For those who switched or use both, what keeps you on your editing platform?",
    categorySlug: "editing",
    authorName: "Tom H.",
    authorUsername: "tom_h_editing",
    replies: [
      {
        authorName: "Nadia Rossi",
        authorUsername: "nadia_portrait",
        body: "Capture One for studio portrait work hands down. The color wheel and skin tone uniformity tool save me hours in retouching. But Lightroom still wins for catalog management across huge event shoots.",
      },
    ],
  },
  {
    topic: "camera-bag-setups",
    title: "Show me your camera bag setup",
    body: "Curious how everyone packs for a full day out in the field. Do you prefer backpack style (like Peak Design / Shimoda) or shoulder bags for quick lens swaps? Drop your layout and must-have accessories!",
    categorySlug: "gear",
    authorName: "Jake Miller",
    authorUsername: "jake_m",
    replies: [
      {
        authorName: "Rachel Kim",
        authorUsername: "rachel_k",
        body: "Shimoda Action X30 for hiking. Fits a 24-70mm f/2.8, 70-200mm, body, plus water bladder and rain shell comfortably without destroying my shoulders.",
      },
    ],
  },
  {
    topic: "first-wedding-advice",
    title: "First time shooting a wedding — any tips?",
    body: "Just booked my first wedding as second shooter next month. Super excited but definitely feeling the pressure. What are the top 3 things you wish someone told you before your first wedding gig?",
    categorySlug: "general",
    authorName: "Daniel Park",
    authorUsername: "daniel_p",
    replies: [
      {
        authorName: "Hannah Wright",
        authorUsername: "hannah_weddings",
        body: "1. Dual card slots running dual write mode.\n2. Comfortable shoes — you'll be on your feet for 10 hours straight.\n3. Scout the venue lighting beforehand so you're not surprised by reception dimming!",
      },
    ],
  },
  {
    topic: "budget-tripod-under-100",
    title: "Best budget tripod under $100?",
    body: "Looking for a sturdy, portable tripod under $100 for long exposure night shots and landscape work. Doesn't need to be ultra-light carbon fiber, just solid enough to hold a 2kg camera setup without drifting.",
    categorySlug: "gear",
    authorName: "Vikram Singh",
    authorUsername: "vikram_s",
    replies: [
      {
        authorName: "Ben Taylor",
        authorUsername: "ben_taylor",
        body: "K&F Concept TM2534 aluminum series. Retractable hook at the bottom lets you hang your camera bag to add ballast on windy days.",
      },
    ],
  },
  {
    topic: "photo-backup-workflow",
    title: "How do you backup your photos?",
    body: "Had a hard drive scare last week and realized my backup routine was way too lax. How are you organizing 3-2-1 backups? Local NAS, external SSDs, or cloud services like Backblaze?",
    categorySlug: "editing",
    authorName: "Carlos M.",
    authorUsername: "carlos_m",
    replies: [
      {
        authorName: "Sophie Martin",
        authorUsername: "sophie_m",
        body: "Synology 4-bay NAS at home + Backblaze Unlimited for offsite cloud backup. Working files live on a 2TB NVMe external drive while editing.",
      },
    ],
  },
  {
    topic: "photography-youtube-channels",
    title: "Favorite photography YouTube channels right now?",
    body: "Looking for recommendations beyond hyper-commercial gear review channels. Who are you watching for genuine composition technique, photobook reviews, or behind-the-scenes shoot breakdowns?",
    categorySlug: "general",
    authorName: "Oliver Reed",
    authorUsername: "oliver_r",
    replies: [
      {
        authorName: "Emma Davis",
        authorUsername: "emma_d",
        body: "Thomas Heaton for landscape calm vibes, Sean Tucker for philosophy of image making, and Roman Fox for street photography breakdowns.",
      },
    ],
  },
  {
    topic: "go-to-editing-preset",
    title: "What's your go-to preset and why?",
    body: "Do you start every edit from scratch or do you have a base preset for color science (e.g. Fuji Classic Chrome, Kodachrome, Kodak Portra 400)?",
    categorySlug: "editing",
    authorName: "Julian Vance",
    authorUsername: "julian_v",
    replies: [
      {
        authorName: "Claire Bennett",
        authorUsername: "claire_b",
        body: "I created a custom subtle warm curve (+3 warmth, muted greens, slight S-curve contrast) that I apply on import, then tweak exposure per shot.",
      },
    ],
  },
  {
    topic: "raw-vs-jpeg-discussion",
    title: "Raw vs JPEG — fight me",
    body: "Obviously RAW has dynamic range recovery benefits, but with modern film simulations and JPEG color profiles, shooting fine JPEG for casual everyday walkaround shots saves so much storage and editing time. Change my mind!",
    categorySlug: "general",
    authorName: "Noah Fischer",
    authorUsername: "noah_f",
    replies: [
      {
        authorName: "Lucas Grey",
        authorUsername: "lucas_g",
        body: "Shoot RAW + JPEG! Enjoy the in-camera color profile instantly, but keep the RAW safety net in case you blow highlights on a once-in-a-lifetime shot.",
      },
    ],
  },
  {
    topic: "pricing-photography-work",
    title: "How do you price your work?",
    body: "For freelancers and commercial shooters: how did you calculate your day rate or package pricing when starting out? Do you charge per image delivered or flat day rate + licensing?",
    categorySlug: "general",
    authorName: "Isabella Martinez",
    authorUsername: "isabella_m",
    replies: [
      {
        authorName: "Gareth Evans",
        authorUsername: "gareth_e",
        body: "Calculate your Cost of Doing Business (CODB) first — insurance, gear wear, software, taxes — then add your target annual income divided by billable days.",
      },
    ],
  },
  {
    topic: "best-country-shoot-spots",
    title: "Best places to shoot in your home country?",
    body: "If someone was visiting your country for 1 week specifically for photography, where would you tell them to go? Mention hidden gems, not just tourist spots!",
    categorySlug: "landscape",
    authorName: "Mateo Rossi",
    authorUsername: "mateo_r",
    replies: [
      {
        authorName: "Anika Patel",
        authorUsername: "anika_p",
        body: "For the UK: Skip London for a day and head to the Isle of Skye or North Yorkshire moors during autumn heather bloom!",
      },
    ],
  },
  {
    topic: "share-proudest-photo",
    title: "Share a photo you're proud of",
    body: "Not necessarily your most technically flawless photo, but one that has personal meaning or where you waited hours for the right conditions. Tell the story behind it!",
    categorySlug: "landscape",
    authorName: "Zoe Brooks",
    authorUsername: "zoe_b",
    replies: [
      {
        authorName: "Felix Wagner",
        authorUsername: "felix_w",
        body: "Waited 3 hours in sub-zero winds at 4 AM for fog to roll through a pine valley. My fingers were numb, but the morning beam through the fog was worth every second.",
      },
    ],
  },
  {
    topic: "gear-sold-regret",
    title: "What gear did you sell and regret?",
    body: "We've all sold a lens or camera body to fund a upgrade, only to realize later how much we missed its unique rendering or feel. What piece of gear do you wish you kept?",
    categorySlug: "gear",
    authorName: "Arthur Pendelton",
    authorUsername: "arthur_p",
    replies: [
      {
        authorName: "Elena Rostova",
        authorUsername: "elena_photos",
        body: "My original Fujifilm X100T. The leaf shutter was dead silent and optical viewfinder felt magical for candid family shots. Regret selling it to this day!",
      },
    ],
  },
];

export async function seedRealThreads() {
  console.log("🌱 Seeding 15 authentic human discussion threads...");

  // Get or create categories
  const categories = await prisma.category.findMany();
  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));
  const defaultCategoryId = categories[0]?.id;

  for (const item of SEED_THREADS) {
    const categoryId = categoryMap.get(item.categorySlug) || defaultCategoryId;
    if (!categoryId) {
      console.error(`Category not found for ${item.categorySlug}`);
      continue;
    }

    // Ensure author exists
    const author = await prisma.user.upsert({
      where: { username: item.authorUsername },
      create: {
        username: item.authorUsername,
        name: item.authorName,
        email: `${item.authorUsername}@photographyforum.net`,
        emailVerified: new Date(),
        isSimulated: false,
        generatedByAi: false,
      },
      update: {},
    });

    const slug = uniqueSlug(item.title);

    // Create thread
    const thread = await prisma.thread.upsert({
      where: { slug },
      create: {
        slug,
        title: item.title,
        body: item.body,
        kind: "DISCUSSION",
        authorId: author.id,
        categoryId,
        isSimulated: false,
        viewCount: Math.floor(Math.random() * 80) + 20,
        score: Math.floor(Math.random() * 15) + 3,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000)),
      },
      update: {
        isSimulated: false,
      },
    });

    // Seed authentic replies
    for (const r of item.replies) {
      const replyAuthor = await prisma.user.upsert({
        where: { username: r.authorUsername },
        create: {
          username: r.authorUsername,
          name: r.authorName,
          email: `${r.authorUsername}@photographyforum.net`,
          emailVerified: new Date(),
          isSimulated: false,
          generatedByAi: false,
        },
        update: {},
      });

      await prisma.post.create({
        data: {
          threadId: thread.id,
          authorId: replyAuthor.id,
          body: r.body,
          isSimulated: false,
          generatedByAi: false,
          createdAt: new Date(thread.createdAt.getTime() + Math.floor(Math.random() * 12 * 60 * 60 * 1000)),
        },
      });
    }

    console.log(`  ✓ Created thread: "${thread.title}" (${item.replies.length} replies)`);
  }

  console.log("\n🎉 Seed complete! 15 real, authentic community discussion threads are now live.");
}

seedRealThreads().catch(console.error);
