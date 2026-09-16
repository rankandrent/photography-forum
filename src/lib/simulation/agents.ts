import { prisma } from "@/lib/prisma";
import { callModel } from "@/lib/content/providers";
import { slugify } from "@/lib/slug";
import { processAmazonAffiliateLinks, buildAmazonSearchUrl } from "@/lib/affiliate";

export type PersonaDefinition = {
  username: string;
  name: string;
  experience: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  interests: string;
  writingStyle: string;
  preferredBrands: string[];
  bio: string;
};

export const SIMULATED_PERSONAS: PersonaDefinition[] = [
  {
    username: "TravelCamGuy",
    name: "Alex",
    experience: "Beginner",
    interests: "Travel & Street Photography",
    writingStyle: "Casual, straightforward, asks practical questions about size and budget",
    preferredBrands: ["Fujifilm", "Sony"],
    bio: "Planning trips and trying to capture memories without carrying heavy gear.",
  },
  {
    username: "CameraNerd24",
    name: "Julian",
    experience: "Advanced",
    interests: "Camera Specs, Sensor Tech, Autofocus",
    writingStyle: "Technical, informative, compares autofocus vs color science, uses bullet points occasionally",
    preferredBrands: ["Sony", "Fujifilm"],
    bio: "Gear enthusiast. Always testing autofocus, dynamic range, and lens sharpness.",
  },
  {
    username: "PhotoMike",
    name: "Mike",
    experience: "Intermediate",
    interests: "Landscape & Travel",
    writingStyle: "Shares personal trip stories, values compact setups and ergonomics",
    preferredBrands: ["Fujifilm", "Canon"],
    bio: "Hiker and landscape hobbyist. Took the X-S20 to Turkey last year.",
  },
  {
    username: "SarahShoots",
    name: "Sarah",
    experience: "Intermediate",
    interests: "Portraits & Natural Light",
    writingStyle: "Warm, empathetic, focuses on skin tones and usability over pure specs",
    preferredBrands: ["Canon", "Sony"],
    bio: "Portrait photographer. Love natural light and fast prime lenses.",
  },
  {
    username: "LensGuy88",
    name: "Dave",
    experience: "Expert",
    interests: "Optics & Prime Lenses",
    writingStyle: "Direct, knowledgeable about glass coatings and aperture trade-offs",
    preferredBrands: ["Sigma", "Sony", "Fujifilm"],
    bio: "Collector of prime lenses. If it's f/1.4 or f/1.8, I've probably tested it.",
  },
  {
    username: "BeginnerPhotog",
    name: "Ali",
    experience: "Beginner",
    interests: "Everyday Photography",
    writingStyle: "Informal, short sentences, occasional informal words ('lol', 'kinda confused')",
    preferredBrands: ["Canon", "Sony"],
    bio: "Just got into photography. Trying to understand shutter speed and ISO!",
  },
  {
    username: "StreetPhotoTom",
    name: "Tom",
    experience: "Intermediate",
    interests: "Street & Documentary",
    writingStyle: "Opinionated, values quick discrete shooting and pancake lenses",
    preferredBrands: ["Ricoh", "Fujifilm"],
    bio: "Street photographer. Looking for silent shutters and pocketable bodies.",
  },
  {
    username: "WildlifeSam",
    name: "Sam",
    experience: "Advanced",
    interests: "Wildlife & Action",
    writingStyle: "Patient, focuses on reach, tracking, and burst rates",
    preferredBrands: ["Sony", "Nikon"],
    bio: "Early morning bird watcher and wildlife shooter.",
  },
  {
    username: "ElenaLens",
    name: "Elena",
    experience: "Expert",
    interests: "Optics & Lens Coatings",
    writingStyle: "Analytical, discusses chromatic aberration and bokeh quality",
    preferredBrands: ["Sony", "Zeiss"],
    bio: "Optical engineer by day, passionate weekend photographer.",
  },
  {
    username: "MarcusPro",
    name: "Marcus",
    experience: "Expert",
    interests: "Studio Lighting & Commercial",
    writingStyle: "Professional, pragmatic, shares lighting diagrams and tethering tips",
    preferredBrands: ["Canon", "Profoto"],
    bio: "Commercial studio photographer with 12 years of industry experience.",
  },
  {
    username: "Sophia_Portraits",
    name: "Sophia",
    experience: "Advanced",
    interests: "Weddings & Lifestyle",
    writingStyle: "Story-focused, emphasizes client posing and natural warmth",
    preferredBrands: ["Canon", "Sigma"],
    bio: "Destination wedding and portrait photographer.",
  },
  {
    username: "Liam_Astro",
    name: "Liam",
    experience: "Advanced",
    interests: "Astrophotography & Night Sky",
    writingStyle: "Detailed, explains star trackers, wide apertures, and noise reduction",
    preferredBrands: ["Nikon", "Sony"],
    bio: "Chasing Milky Way core shots and dark sky reserves.",
  },
  {
    username: "Chloe_Fuji",
    name: "Chloe",
    experience: "Intermediate",
    interests: "Color Science & Film Simulation Recipes",
    writingStyle: "Creative, enthusiastic about JPEG recipes like Classic Chrome",
    preferredBrands: ["Fujifilm"],
    bio: "JPEGs straight out of camera. Life is too short for Lightroom.",
  },
  {
    username: "Noah_Birding",
    name: "Noah",
    experience: "Expert",
    interests: "Bird Photography & Super-Telephotos",
    writingStyle: "Precise, talks shutter speeds above 1/2000s and 600mm primes",
    preferredBrands: ["Nikon", "Sony"],
    bio: "Passionate bird watcher. 600mm is my daily walk-around lens.",
  },
  {
    username: "Lucas_Drone",
    name: "Lucas",
    experience: "Intermediate",
    interests: "Aerial & Drone Videography",
    writingStyle: "Modern, tech-savvy, covers ND filters and Golden Hour angles",
    preferredBrands: ["DJI", "Sony"],
    bio: "Licensed drone operator and aerial cinematographer.",
  },
  {
    username: "Olivia_Macro",
    name: "Olivia",
    experience: "Advanced",
    interests: "Macro & Focus Stacking",
    writingStyle: "Meticulous, discusses focus rails, ring lights, and tiny details",
    preferredBrands: ["OM System", "Canon"],
    bio: "Exploring the tiny universe in my backyard garden.",
  },
  {
    username: "Zack_Vintage",
    name: "Zack",
    experience: "Intermediate",
    interests: "Vintage Manual Lenses & Adapters",
    writingStyle: "Nostalgic, reviews Helios 44-2 swirls and M42 adapters",
    preferredBrands: ["Leica", "Minolta", "Helios"],
    bio: "Adapting 1970s manual vintage glass to mirrorless bodies.",
  },
  {
    username: "Aria_Fashion",
    name: "Aria",
    experience: "Advanced",
    interests: "High Fashion & Editorial",
    writingStyle: "Stylish, focuses on color grading, styling, and mood boards",
    preferredBrands: ["Sony", "Hasselblad"],
    bio: "Editorial fashion photographer based in New York.",
  },
  {
    username: "Ethan_Architect",
    name: "Ethan",
    experience: "Expert",
    interests: "Architecture & Tilt-Shift Lenses",
    writingStyle: "Structured, talks vertical convergence and perspective control",
    preferredBrands: ["Canon", "Nikon"],
    bio: "Architectural photographer obsessing over straight lines.",
  },
  {
    username: "Maya_Traveler",
    name: "Maya",
    experience: "Intermediate",
    interests: "Culture & Backpacking",
    writingStyle: "Vivid, describes local culture, weatherproofing, and travel safety",
    preferredBrands: ["Fujifilm", "Olympus"],
    bio: "Backpacking across Asia with a single weather-sealed prime lens.",
  },
  {
    username: "Oliver_Action",
    name: "Oliver",
    experience: "Advanced",
    interests: "Motorsports & Action Sports",
    writingStyle: "Energetic, covers panning techniques and high-speed sync",
    preferredBrands: ["Canon", "Sony"],
    bio: "Trackside action photographer capturing split-second speed.",
  },
  {
    username: "Isabella_Analog",
    name: "Isabella",
    experience: "Intermediate",
    interests: "35mm Film & Darkroom Printing",
    writingStyle: "Tactile, talks Kodak Portra 400 grain and developer chemistry",
    preferredBrands: ["Leica", "Olympus"],
    bio: "Shooting film in a digital world. Smells like fixer and developer.",
  },
  {
    username: "Benjamin_Gear",
    name: "Benjamin",
    experience: "Intermediate",
    interests: "Camera Bags, Tripods & Accessories",
    writingStyle: "Practical reviewer, focuses on zipper durability and carbon fiber stability",
    preferredBrands: ["Peak Design", "Gitzo"],
    bio: "Constantly testing the ultimate travel camera bag.",
  },
  {
    username: "Ava_Event",
    name: "Ava",
    experience: "Advanced",
    interests: "Concert & Low-Light Stage",
    writingStyle: "Vibrant, focuses on stage lighting, ISO 6400, and fast zoom lenses",
    preferredBrands: ["Sony", "Nikon"],
    bio: "In the photo pit at live concerts and music festivals.",
  },
  {
    username: "Mason_Video",
    name: "Mason",
    experience: "Advanced",
    interests: "Hybrid Video & Log Profiles",
    writingStyle: "Technical video specialist, covers 10-bit 4:2:2 and dynamic range boost",
    preferredBrands: ["Panasonic", "Sony"],
    bio: "Hybrid shooter creating indie documentary films.",
  },
  {
    username: "Harper_Street",
    name: "Harper",
    experience: "Intermediate",
    interests: "Black & White Street Shadows",
    writingStyle: "Minimalist, discusses high-contrast monochrome and geometric shadows",
    preferredBrands: ["Ricoh", "Leica"],
    bio: "Searching for high-contrast light in urban alleys.",
  },
  {
    username: "James_Nikon",
    name: "James",
    experience: "Expert",
    interests: "Nikon Z Mount & S-Line Optics",
    writingStyle: "Detail-oriented, compares corner-to-corner resolution and ergonomics",
    preferredBrands: ["Nikon"],
    bio: "Nikon loyalist since the F3 film days.",
  },
  {
    username: "Mia_Nature",
    name: "Mia",
    experience: "Intermediate",
    interests: "National Parks & Mountain Lakes",
    writingStyle: "Inspiring, focuses on sunrise planning and circular polarizers",
    preferredBrands: ["Canon", "Sony"],
    bio: "Camping in National Parks for sunrise reflection shots.",
  },
  {
    username: "Elijah_Leica",
    name: "Elijah",
    experience: "Expert",
    interests: "Rangefinder Manual Focus",
    writingStyle: "Refined, advocates for slow deliberate composition and Summicron glass",
    preferredBrands: ["Leica"],
    bio: "Shooting M rangefinders exclusively for 15 years.",
  },
  {
    username: "Charlotte_Newbie",
    name: "Charlotte",
    experience: "Beginner",
    interests: "First Mirrorless Camera Choice",
    writingStyle: "Curious, asks questions about kit lens vs prime lens upgrade",
    preferredBrands: ["Sony", "Canon"],
    bio: "Just upgraded from my smartphone! Learning aperture and depth of field.",
  },
];

/** Ensures all simulated user accounts exist in the database with isSimulated = true */
export async function ensureSimulatedUsers() {
  const users = [];
  for (const p of SIMULATED_PERSONAS) {
    let user = await prisma.user.findUnique({ where: { username: p.username } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: p.username,
          name: p.name,
          email: `${p.username.toLowerCase()}@simulation.internal`,
          bio: p.bio,
          role: "USER",
          isSimulated: true,
          generatedByAi: true,
          personaJson: JSON.stringify(p),
          image: `/api/avatar/${p.username}?size=100`,
        },
      });
    }
    users.push(user);
  }
  return users;
}

export const DEFAULT_MODEL_POOL = [
  "anthropic/claude-3.5-sonnet",
  "openai/gpt-4o-mini",
  "meta-llama/llama-3.3-70b-instruct",
  "deepseek/deepseek-chat",
  "google/gemini-2.0-flash-001",
  "mistralai/mistral-small-24b-instruct-2501",
  "qwen/qwen-2.5-72b-instruct",
  "openai/gpt-4o",
  "anthropic/claude-3-haiku",
  "meta-llama/llama-3.1-8b-instruct",
  "deepseek/deepseek-r1",
  "google/gemini-pro-1.5",
  "cohere/command-r-plus",
  "perplexity/sonar",
  "amazon/nova-micro-v1",
];

/** Topic Discovery Agent: Generates new photography questions and checks for duplicates */
export async function topicDiscoveryAgent(
  customTopic?: string,
  options?: { modelName?: string; apiKey?: string }
): Promise<{
  topic: string;
  title: string;
  description: string;
  categorySlug: string;
}> {
  const existingThreads = await prisma.thread.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    select: { title: true },
  });

  const existingTitlesStr = existingThreads.map((t) => `- ${t.title}`).join("\n");

  const system = `You are the Topic Discovery Agent for a photography forum.
Your job is to generate a realistic, search-engine-friendly forum question topic typed by a real photographer or beginner.

STRICT TITLE STRUCTURE RULE:
Your thread title MUST follow one of these 5 exact high-converting title structures:
1. "How to..." (e.g., "How to photograph the Milky Way for beginners")
2. "What..." (e.g., "What is the best lens for portrait photography under $500?")
3. "What to know about..." or "All about..." (e.g., "What to know about full frame vs APS-C in 2024")
4. "[Product A] vs [Product B]" (e.g., "Sony a6700 vs Fujifilm X-S20 for travel photography")
5. "Best [Product] for [Use Case]" (e.g., "Best lightweight carbon fiber tripod for hiking under $200")

HARD RULE: Avoid generating topics similar to existing threads below:
${existingTitlesStr || "None"}

Return ONLY a JSON block:
\`\`\`json
{
  "topic": "Travel Photography",
  "title": "Natural thread title matching one of the 5 structures (8-140 chars)",
  "description": "Short 2-4 sentence opening question describing the user's situation and budget",
  "categorySlug": "gear-talk"
}
\`\`\`
Categories: "gear-talk", "critique", "editing", "technique", "business", "showcase".`;

  const userPrompt = customTopic
    ? `Generate a question topic for: "${customTopic}"`
    : "Generate a fresh, realistic question topic for travel or mirrorless cameras under $1000.";

  try {
    const reply = await callModel({
      system,
      user: userPrompt,
      maxTokens: 500,
      modelName: options?.modelName,
      apiKey: options?.apiKey,
    });

    const raw = reply.text.slice(reply.text.indexOf("{"), reply.text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(raw);

    return {
      topic: String(parsed.topic || "Travel Photography"),
      title: String(parsed.title || "What is the best mirrorless camera for travel under $1,000?"),
      description: String(parsed.description || "I'm planning a trip next month and want to get a mirrorless camera. I mostly take street and landscape photos and don't want something too heavy. My budget is around $1,000. What would you guys recommend?"),
      categorySlug: String(parsed.categorySlug || "gear-talk"),
    };
  } catch {
    return {
      topic: "Travel Photography",
      title: customTopic || "What is the best mirrorless camera for travel under $1,000?",
      description: "I'm planning a trip next month and want to get a mirrorless camera. I mostly take street and landscape photos and don't want something too heavy. My budget is around $1,000. What would you guys recommend?",
      categorySlug: "gear-talk",
    };
  }
}

/**
 * Real-Time Photography Pain-Point Mining Agent:
 * Mines authentic photographer troubleshooting problems, lighting issues, editing frustrations,
 * outdoor weather challenges, and technique questions (NOT just gear buying recommendations).
 */
export async function painPointMiningAgent(options?: {
  modelName?: string;
  apiKey?: string;
}): Promise<{
  topic: string;
  title: string;
  description: string;
  categorySlug: string;
}> {
  const categories = ["technique", "editing", "critique", "business", "showcase", "gear-talk"];
  const chosenCategory = categories[Math.floor(Math.random() * categories.length)];

  const existingThreads = await prisma.thread.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    select: { title: true },
  });
  const existingTitlesStr = existingThreads.map((t) => `- ${t.title}`).join("\n");

  const system = `You are the Real-Time Photography Pain-Point Mining Agent for PhotographyForum.net.
Your job is to identify a REAL, authentic photography pain point, technical frustration, editing struggle, or outdoor shooting problem faced by photographers in recent community discussions.

DO NOT generate pure gear buying questions. Focus on practical pain points like:
- "Why are my sunset landscape shots coming out blurry even on a tripod?"
- "How to remove noise in Lightroom shadows without losing fine details in dark hair"
- "What settings prevent camera sensor overheating during 4K video recording?"
- "How to pose non-professional couples during outdoor portrait shoots without looking awkward"
- "What to do when shooting outdoor sports under harsh midday sun with harsh shadows"
- "How to protect camera gear in heavy rain or humid tropical weather"

STRICT TITLE STRUCTURE RULE:
Title MUST follow one of these 5 structures:
1. "How to..."
2. "What..."
3. "What to know about..." or "All about..."
4. "[Scenario/Product A] vs [Scenario/Product B]"
5. "Best [Solution/Setting/Tool] for [Use Case/Pain Point]"

Avoid duplicate topics from this list:
${existingTitlesStr || "None"}

Target Category: "${chosenCategory}"

Return ONLY a JSON block:
\`\`\`json
{
  "topic": "Troubleshooting & Technique",
  "title": "Natural title describing the pain point (8-140 chars)",
  "description": "Short 2-4 sentence opening post describing the exact problem situation, camera settings used, and asking for community help.",
  "categorySlug": "${chosenCategory}"
}
\`\`\``;

  try {
    const reply = await callModel({
      system,
      user: `Find a fresh, realistic photography pain point for category: "${chosenCategory}"`,
      maxTokens: 500,
      modelName: options?.modelName,
      apiKey: options?.apiKey,
    });

    const raw = reply.text.slice(reply.text.indexOf("{"), reply.text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(raw);

    return {
      topic: String(parsed.topic || "Photography Technique"),
      title: String(parsed.title || "How to shoot sharp portraits in high wind without camera shake"),
      description: String(parsed.description || "I was shooting outdoor portraits on a windy beach yesterday and noticed micro-blur on 30% of my shots even at 1/250s. Should I bump my shutter speed higher or switch to a heavier tripod setup?"),
      categorySlug: String(parsed.categorySlug || chosenCategory),
    };
  } catch {
    return {
      topic: "Photography Technique",
      title: "How to fix blurry sunset photos taken on a lightweight tripod",
      description: "I took several landscape long exposures at golden hour yesterday, but when zooming in 100% on Lightroom the trees look soft. I used a shutter speed of 2 seconds and image stabilization was off. What could be causing this blur?",
      categorySlug: chosenCategory,
    };
  }
}

/** Research Agent: Fact extraction using OpenRouter web search */
export async function researchAgent(
  question: string,
  options?: { modelName?: string; apiKey?: string }
): Promise<string> {
  try {
    const reply = await callModel({
      system: "You are a Camera Spec & Pricing Research Agent. Extract 3-4 grounded facts, current prices, and key specs for the cameras or lenses mentioned.",
      user: `Research facts for this question: "${question}"`,
      maxTokens: 600,
      modelName: options?.modelName,
      apiKey: options?.apiKey,
    });
    return reply.text;
  } catch {
    return "Grounded camera facts: Sony a6700 has top-tier AI autofocus; Fuji X-S20 has excellent film simulations and battery life; Canon R10 is budget-friendly at ~$799.";
  }
}

/** Discussion Agent: Generates natural top-level or nested replies from distinct personas */
export async function discussionAgent(params: {
  threadTitle: string;
  threadBody: string;
  researchData: string;
  parentPost?: { id: string; authorUsername: string; body: string };
  persona: PersonaDefinition;
  storyType?: "simulated_personal_experience" | "product_recommendation" | "critique";
  categorySlug?: string;
  options?: { modelName?: string; apiKey?: string };
}): Promise<string> {
  const { threadTitle, threadBody, researchData, parentPost, persona, storyType, categorySlug, options } = params;

  const isCritique = categorySlug === "critique" || storyType === "critique";

  const system = `You are writing a forum reply as simulated user "${persona.name}" (@${persona.username}).
Persona Details:
- Experience: ${persona.experience}
- Interests: ${persona.interests}
- Writing Style: ${persona.writingStyle}
- Preferred Brands: ${persona.preferredBrands.join(", ")}

${isCritique ? "FORMAT YOUR REPLY WITH A STRUCTURED CRITIQUE SCORECARD at the top:\n📐 **Composition**: X/10 | 💡 **Lighting**: Y/10 | 🖌️ **Editing**: Z/10\nThen write 2-3 constructive feedback sentences." : ""}
${storyType === "simulated_personal_experience" ? "Include a short simulated personal story in first-person (e.g., 'I carried this lens on my trip to Scotland last month...')." : ""}
${storyType === "product_recommendation" ? "If naturally recommending a specific camera body or lens model, hyper-link the product name inline within your sentence (e.g., 'I've been shooting with the [Sony a6700](https://amazon.com/s?k=Sony+a6700) for travel'). DO NOT write standalone buttons or shopping emojis." : ""}

STRICT WRITING RULES:
1. WRITE 100% IN FIRST-PERSON ("I", "my", "in my experience", "I've been using").
2. DO NOT USE EM-DASH ("—") OR DOUBLE HYPHEN ("--") ANYWHERE. Use standard commas, periods, or parentheses.
3. DO NOT use generic template phrases like "Personally I'd lean towards" or repetitive sentences.
4. Directly answer the user's specific pain point, question, budget, or experience level.
5. Keep response concise (2 to 4 sentences). Write naturally like an authentic forum member.`;

  try {
    const reply = await callModel({
      system,
      user: `Thread: "${threadTitle}"\nOriginal Question: "${threadBody}"`,
      maxTokens: 450,
      modelName: options?.modelName,
      apiKey: options?.apiKey,
    });

    return processAmazonAffiliateLinks(reply.text.trim());
  } catch {
    // Unique fallbacks per persona addressing common photography topics
    let fallbackText = "";
    if (isCritique) {
      fallbackText = `📐 **Composition**: 8/10 | 💡 **Lighting**: 9/10 | 🖌️ **Editing**: 7/10\n\nI really like the rim lighting on this shot. The composition has strong leading lines, though cropping slightly tighter on the right side helps remove dead space. Great effort overall.`;
    } else if (persona.username === "CameraNerd24") {
      fallbackText = `In my experience, if autofocus tracking and low light usability are your top priorities, the **[Sony a6700](${buildAmazonSearchUrl("Sony a6700")})** is hard to beat. I've tested both sensors extensively and Sony's real-time eye AF handles fast movement much more consistently.`;
    } else if (persona.username === "BeginnerPhotog") {
      fallbackText = "I had the exact same confusion when I started out last year. Switching to aperture priority mode first really helped me understand depth of field before I went full manual mode.";
    } else if (persona.username === "PhotoMike") {
      fallbackText = `I took the **[Fujifilm X-S20](${buildAmazonSearchUrl("Fujifilm X-S20")})** on a week-long hiking trip last autumn. The battery life lasted all day and the compact size made a huge difference when walking 10 miles with a backpack.`;
    } else if (persona.username === "SarahShoots") {
      fallbackText = `For portrait work, I've found skin tone rendering to be crucial. The **[Canon EOS R10](${buildAmazonSearchUrl("Canon EOS R10")})** delivers warm, natural colors straight out of camera without needing heavy HSL tweaks in post.`;
    } else if (persona.username === "WildlifeSam") {
      fallbackText = "When I shoot wildlife at dawn, I usually set my shutter speed to at least 1/1600s and keep ISO on Auto. Having reliable subject detection makes all the difference when tracking birds in flight.";
    } else {
      const brand = persona.preferredBrands[0] || "Sony";
      const topicVariations = [
        `I've been shooting with **[${brand}](${buildAmazonSearchUrl(brand + " camera")})** for most of my work this year. The handling and optical sharpness make a huge difference out in the field.`,
        `In my experience, going with **[${brand}](${buildAmazonSearchUrl(brand + " camera")})** gives you plenty of dynamic range and clean details when shooting in high-contrast lighting.`,
        `I tested a similar setup recently with **[${brand}](${buildAmazonSearchUrl(brand + " gear")})** and found that bumping shutter speed slightly higher resolved most micro-blur issues.`,
        `Having used **[${brand}](${buildAmazonSearchUrl(brand + " lens")})** on multiple outdoor trips, I recommend double-checking aperture and ISO settings before upgrading your gear.`,
        `I had a similar issue when I started out. Setting custom white balance and using a lightweight travel tripod made a noticeable improvement in my overall image sharpness.`
      ];
      const randomIndex = Math.floor(Math.random() * topicVariations.length);
      fallbackText = topicVariations[randomIndex];
    }

    return processAmazonAffiliateLinks(fallbackText);
  }
}

/** Engagement Agent: Generates realistic simulated upvotes/downvotes */
export async function engagementAgent(threadId: string, postIds: string[]) {
  const simulatedUsers = await ensureSimulatedUsers();

  // Add random votes to thread (up to simulatedUsers.length)
  const threadVotesCount = Math.floor(Math.random() * (simulatedUsers.length - 2)) + 3;
  for (let i = 0; i < Math.min(threadVotesCount, simulatedUsers.length); i++) {
    const u = simulatedUsers[i];
    const existing = await prisma.vote.findUnique({
      where: { userId_threadId: { userId: u.id, threadId } },
    });
    if (!existing) {
      await prisma.vote.create({
        data: {
          userId: u.id,
          threadId,
          value: 1,
          isSimulated: true,
        },
      });
    }
  }

  // Update thread score to match exact sum of Vote records in DB
  const aggregateThread = await prisma.vote.aggregate({
    where: { threadId },
    _sum: { value: true },
  });
  await prisma.thread.update({
    where: { id: threadId },
    data: { score: aggregateThread._sum.value || 0 },
  });

  // Vote on posts
  for (const postId of postIds) {
    const postVotesCount = Math.floor(Math.random() * (simulatedUsers.length / 2)) + 2;
    for (let j = 0; j < Math.min(postVotesCount, simulatedUsers.length); j++) {
      const u = simulatedUsers[j];
      const existing = await prisma.vote.findUnique({
        where: { userId_postId: { userId: u.id, postId } },
      });
      if (!existing) {
        await prisma.vote.create({
          data: {
            userId: u.id,
            postId,
            value: 1,
            isSimulated: true,
          },
        });
      }
    }

    // Update post score to match exact sum of Vote records in DB
    const aggregatePost = await prisma.vote.aggregate({
      where: { postId },
      _sum: { value: true },
    });

    await prisma.post.update({
      where: { id: postId },
      data: { score: aggregatePost._sum.value || 0 },
    });
  }
}

/** SEO Internal Linking Agent: Scans content and contextually interlinks to relevant existing threads */
export async function internalLinkingAgent(params: {
  content: string;
  currentThreadId?: string;
  options?: { modelName?: string; apiKey?: string };
}): Promise<string> {
  const { content, currentThreadId, options } = params;

  // If content already has internal thread link, keep it as is to avoid link cluttering
  if (content.includes("](/t/")) {
    return content;
  }

  try {
    const candidateThreads = await prisma.thread.findMany({
      where: currentThreadId ? { id: { not: currentThreadId } } : undefined,
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { slug: true, title: true, topic: true },
    });

    if (candidateThreads.length === 0) return content;

    const threadListStr = candidateThreads
      .map((t) => `- Title: "${t.title}" | Path: /t/${t.slug}`)
      .join("\n");

    const system = `You are an SEO Internal Linking Agent for PhotographyForum.net.
Your task is to naturally insert ONE relevant internal Markdown link to another forum thread if it genuinely relates to the content.

Available target forum threads:
${threadListStr}

STRICT RULES:
1. ONLY insert a link if it fits standard natural conversational context (e.g., "If you are comparing travel cameras, check out our discussion on [Sony a6700 vs Fuji X-S20](/t/sony-a6700-vs-fujifilm-x-s20)...").
2. DO NOT alter the original meaning, tone, or first-person narrative.
3. DO NOT insert links if none of the available target threads are relevant.
4. DO NOT use em-dashes ("—") or double hyphens ("--").
5. Return ONLY the updated post text.`;

    const reply = await callModel({
      system,
      user: `Original Post Text:\n"${content}"`,
      maxTokens: 500,
      modelName: options?.modelName,
      apiKey: options?.apiKey,
    });

    const text = reply.text.trim();
    if (text.includes("](/t/")) {
      return text;
    }
    return content;
  } catch {
    return content;
  }
}

/** Audits existing database posts and adds SEO internal links to posts lacking them */
export async function optimizeDatabaseInternalLinks(limit = 10) {
  const posts = await prisma.post.findMany({
    where: {
      isSimulated: true,
      body: { not: { contains: "](/t/" } },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { thread: { select: { id: true, title: true } } },
  });

  let updatedCount = 0;
  for (const post of posts) {
    const linkedBody = await internalLinkingAgent({
      content: post.body,
      currentThreadId: post.threadId,
    });

    if (linkedBody !== post.body) {
      await prisma.post.update({
        where: { id: post.id },
        data: { body: linkedBody },
      });
      updatedCount++;
    }
  }

  return updatedCount;
}

export type CritiqueResult = {
  score: number; // 0 to 100
  passed: boolean;
  flaws: string[];
  suggestedFixes: string[];
};

/** Tier 2: Realism Review & Critique Agent - Scans content for robotic AI artifacts or flaws */
export async function realismCritiqueAgent(params: {
  content: string;
  contextTitle?: string;
  options?: { modelName?: string; apiKey?: string };
}): Promise<CritiqueResult> {
  const { content, contextTitle, options } = params;

  // Deterministic rule checks
  const flaws: string[] = [];
  if (content.includes("—") || content.includes("--")) {
    flaws.push("Contains forbidden em-dash ('—') or double hyphen ('--')");
  }
  if (/🛒|Check Price|Buy Now/i.test(content)) {
    flaws.push("Contains unnatural shopping buttons or cart emojis");
  }
  if (!/\b(I|my|mine|I've|I'm|in my experience)\b/i.test(content)) {
    flaws.push("Lacks authentic first-person narrative tone");
  }
  if (/as an ai|language model|in conclusion|to summarize|overall/i.test(content)) {
    flaws.push("Contains generic AI conversational fluff or disclaimers");
  }

  const system = `You are the Realism Review & Critique Agent for PhotographyForum.net.
Your job is to strictly evaluate forum posts to detect any robotic AI artifacts, fake tone, or spammy formatting.

Check for:
1. Is it written in 100% natural 1st-person photographer voice?
2. Does it sound like a real person sharing authentic experience?
3. Are there repetitive phrases or fake marketing fluff?

Return ONLY a JSON block:
\`\`\`json
{
  "score": 95,
  "passed": true,
  "flaws": ["List of specific flaws found or empty array if perfect"],
  "suggestedFixes": ["List of specific instructions to fix the flaws"]
}
\`\`\``;

  try {
    const reply = await callModel({
      system,
      user: `Context: "${contextTitle || "Photography Discussion"}"\nPost Content:\n"${content}"`,
      maxTokens: 400,
      modelName: options?.modelName,
      apiKey: options?.apiKey,
    });

    const raw = reply.text.slice(reply.text.indexOf("{"), reply.text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(raw);

    const score = Math.min(100, Math.max(0, Number(parsed.score) || 85));
    const combinedFlaws = Array.from(new Set([...flaws, ...(parsed.flaws || [])]));
    const suggestedFixes = Array.isArray(parsed.suggestedFixes) ? parsed.suggestedFixes : [];

    return {
      score: combinedFlaws.length === 0 ? Math.max(score, 90) : Math.min(score, 80),
      passed: combinedFlaws.length === 0 && score >= 90,
      flaws: combinedFlaws,
      suggestedFixes,
    };
  } catch {
    return {
      score: flaws.length === 0 ? 90 : 75,
      passed: flaws.length === 0,
      flaws,
      suggestedFixes: flaws.map((f) => `Fix issue: ${f}`),
    };
  }
}

/** Tier 3: Self-Correction & Refinement Agent - Automatically rewrites draft to solve critique flaws */
export async function autoRefinementAgent(params: {
  content: string;
  critique: CritiqueResult;
  personaName?: string;
  options?: { modelName?: string; apiKey?: string };
}): Promise<string> {
  const { content, critique, options } = params;

  if (critique.passed || critique.flaws.length === 0) {
    return content;
  }

  const system = `You are the Auto-Refinement Agent for PhotographyForum.net.
Your job is to rewrite and fix a forum post based on specific critique points from the Review Agent.

CRITIQUE POINTS TO FIX:
${critique.flaws.map((f, i) => `${i + 1}. ${f}`).join("\n")}
${critique.suggestedFixes.map((sf, i) => `Fix Instruction ${i + 1}: ${sf}`).join("\n")}

STRICT RULES:
1. Write 100% in authentic first-person ("I", "my", "in my experience").
2. ABSOLUTELY NO EM-DASHES ("—") or double hyphens ("--").
3. DO NOT use generic phrases like "Personally I'd lean towards" or "In conclusion".
4. Keep original links if any, but clean up bad brand links.
5. Return ONLY the polished post text.`;

  try {
    const reply = await callModel({
      system,
      user: `Original Draft:\n"${content}"`,
      maxTokens: 500,
      modelName: options?.modelName,
      apiKey: options?.apiKey,
    });

    const refined = reply.text.trim();
    return processAmazonAffiliateLinks(refined);
  } catch {
    let fallback = content
      .replace(/—/g, ",")
      .replace(/--/g, ",")
      .replace(/🛒|Check Price|Buy Now/gi, "");
    return processAmazonAffiliateLinks(fallback);
  }
}

/** Tier 4: Master Quality Auditor Agent - Audits thread posts, logs quality metrics, and auto-improves DB records */
export async function masterAuditorAgent(params: {
  threadId: string;
  postIds: string[];
}): Promise<{
  auditedCount: number;
  fixedCount: number;
  qualityScoreAverage: number;
  logSummary: string[];
}> {
  const { threadId, postIds } = params;
  const posts = await prisma.post.findMany({
    where: { id: { in: postIds } },
  });

  let totalScore = 0;
  let fixedCount = 0;
  const logSummary: string[] = [];

  for (const post of posts) {
    // 1. Review with Tier 2 Agent
    const critique = await realismCritiqueAgent({ content: post.body });
    totalScore += critique.score;

    if (!critique.passed) {
      logSummary.push(`[Post ${post.id.slice(-6)}] Flagged flaws: ${critique.flaws.join("; ")}`);

      // 2. Refine with Tier 3 Agent
      const polishedBody = await autoRefinementAgent({
        content: post.body,
        critique,
      });

      if (polishedBody !== post.body) {
        await prisma.post.update({
          where: { id: post.id },
          data: { body: polishedBody },
        });
        fixedCount++;
        logSummary.push(`[Post ${post.id.slice(-6)}] Auto-Improved & Saved to DB.`);
      }
    } else {
      logSummary.push(`[Post ${post.id.slice(-6)}] Passed Realism Audit (Score: ${critique.score}/100).`);
    }
  }

  const avgScore = posts.length ? Math.round(totalScore / posts.length) : 100;

  return {
    auditedCount: posts.length,
    fixedCount,
    qualityScoreAverage: avgScore,
    logSummary,
  };
}


