import { prisma } from "@/lib/prisma";
import { callModel } from "@/lib/content/providers";
import { slugify } from "@/lib/slug";

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
${storyType === "simulated_personal_experience" ? "Include a short simulated personal story (e.g. 'I took the X-S20 to Turkey last year and the size was great...')." : ""}
${storyType === "product_recommendation" ? "Include a recommended camera/lens and append an Amazon affiliate check button: `[🛒 Check Price on Amazon](https://amazon.com/dp/B0CB69P88H?tag=photoforum-20)`" : ""}

WRITING INSTRUCTIONS:
- Write naturally like a real forum member. Use casual wording, short or long sentences, contractions.
- ${parentPost ? `You are replying directly to @${parentPost.authorUsername}'s comment: "${parentPost.body}"` : "You are responding to the main thread question."}
- Ground technical recommendations in these research facts: ${researchData}
- Keep response concise (2 to 5 sentences).
- Do NOT sound like corporate AI or a blog post.`;

  try {
    const reply = await callModel({
      system,
      user: `Thread: "${threadTitle}"\nOriginal Question: "${threadBody}"`,
      maxTokens: 450,
      modelName: options?.modelName,
      apiKey: options?.apiKey,
    });

    return reply.text.trim();
  } catch {
    // Rich fallback tailored to persona & storyType
    if (isCritique) {
      return `📐 **Composition**: 8/10 | 💡 **Lighting**: 9/10 | 🖌️ **Editing**: 7/10\n\nI really like the rim lighting on this frame! The composition has strong leading lines, though cropping slightly tighter on the right might remove some dead space. Great effort overall.`;
    }
    if (persona.username === "CameraNerd24") {
      return "If you're mainly doing travel and street photography, I'd probably look at the **Sony a6700** or **Fujifilm X-S20**. Both are pretty compact with great autofocus.\n\n[🛒 Check Price on Amazon](https://amazon.com/dp/B0CB69P88H?tag=photoforum-20)\n\nI think the Fuji is a little more fun for photography because of the controls and film simulations, but Sony is probably the safer choice if autofocus is your top priority.";
    }
    if (persona.username === "BeginnerPhotog") {
      return "Is the Fuji hard to use? I'm still pretty new to cameras and all the manual dial settings kinda confuse me lol.";
    }
    if (persona.username === "PhotoMike") {
      return "I actually took the **Fujifilm X-S20** with me to Turkey last year and the size was one of the best things about it. I was walking around all day and didn't really feel like I was carrying a big camera. Paired it with the 18-55mm kit lens and it handled everything from sunset landscapes to street shots.\n\n[🛒 Check Price on Amazon](https://amazon.com/dp/B0CB69P88H?tag=photoforum-20)";
    }
    if (persona.username === "SarahShoots") {
      return "The **Canon EOS R10** is also worth considering if your budget is tight! The skin tones straight out of camera are fantastic for portraits, though lens options are a bit more limited than Sony or Fuji right now.\n\n[🛒 Check Price on Amazon](https://amazon.com/dp/B0CB69P88H?tag=photoforum-20)";
    }
    return `Personally I'd lean towards ${persona.preferredBrands[0] || "Sony"}. I've had great experiences with their compact bodies on travel trips.\n\n[🛒 Check Price on Amazon](https://amazon.com/dp/B0CB69P88H?tag=photoforum-20)`;
  }
}

/** Engagement Agent: Generates simulated upvotes/downvotes */
export async function engagementAgent(threadId: string, postIds: string[]) {
  const simulatedUsers = await ensureSimulatedUsers();

  // Add random votes to thread
  const threadVotesCount = Math.floor(Math.random() * 8) + 5;
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

  // Update thread score
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
    const postVotesCount = Math.floor(Math.random() * 4) + 2;
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
