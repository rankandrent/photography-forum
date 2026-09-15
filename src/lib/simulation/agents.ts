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
Your job is to generate a realistic forum question topic typed by a real photographer or beginner.
Topics should be specific, engaging, and cover topics like mirrorless cameras, travel photography, portrait lenses, street setups, or editing.

HARD RULE: Avoid generating topics similar to existing threads below:
${existingTitlesStr || "None"}

Return ONLY a JSON block:
\`\`\`json
{
  "topic": "Travel Photography",
  "title": "Natural human forum thread title (8-140 chars)",
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
      fallbackText = `I've been using **[${brand}](${buildAmazonSearchUrl(brand + " camera")})** gear for most of my landscape work over the past three years. The dynamic range gives me plenty of shadow recovery in high-contrast sunrise shots.`;
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
