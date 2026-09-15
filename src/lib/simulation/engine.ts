import { prisma } from "@/lib/prisma";
import {
  ensureSimulatedUsers,
  topicDiscoveryAgent,
  researchAgent,
  discussionAgent,
  engagementAgent,
  SIMULATED_PERSONAS,
  DEFAULT_MODEL_POOL,
} from "./agents";
import { slugify } from "@/lib/slug";

export async function logSimulationStep(
  agent: string,
  action: string,
  details: string,
  threadId?: string
) {
  try {
    await prisma.simulationLog.create({
      data: {
        agent,
        action,
        details,
        threadId,
      },
    });
  } catch (err) {
    console.error("Failed to log simulation step:", err);
  }
}

/**
 * High Search Volume (HSV) & Low Keyword Difficulty (KD) photography buyer-intent topics
 * categorized across Tripods, Cameras, Lenses, Lighting, Bags, and Accessories.
 */
const TOPIC_PROMPTS = [
  // --- Tripods & Supports (High Volume / Low KD) ---
  "Best lightweight carbon fiber tripod for hiking under $200",
  "Peak Design travel tripod vs Peak Design aluminum - is carbon fiber worth it?",
  "Best budget travel tripod for landscape long exposures",
  "Heavy duty tripod for 100-400mm telephoto wildlife lenses",
  "Best tabletop tripod for macro and product photography",
  "What's the best tripod head for panoramic landscape photography?",
  "Manfrotto Befree Advanced vs Peak Design Travel Tripod comparison",

  // --- Cameras & Bodies ---
  "Best mirrorless camera for travel photography under $1000",
  "Sony a6700 vs Fujifilm X-S20 for hybrid video and travel photo",
  "Best camera for beginner portrait photography 2024",
  "Is Canon EOS R50 good for low light street photography?",
  "Nikon Z fc vs Fujifilm X-T30 II for everyday carry",
  "Is full frame really worth it over APS-C in 2024?",
  "Sony a7CR vs Nikon Z6 III for high resolution landscape photography",

  // --- Lenses & Optics ---
  "Best budget portrait lens for Sony E mount (85mm f/1.8 vs 50mm f/1.8)",
  "Sigma 18-50mm f/2.8 DC DN vs Fuji 18-55mm kit lens comparison",
  "Best landscape lens for Canon EOS R6 Mark II",
  "Tamron 28-75mm f/2.8 G2 vs Sony 24-70mm f/2.8 GM II",
  "Best prime lens for night street photography",
  "Sigma 35mm f/1.4 Art vs Sony 35mm f/1.4 GM comparison",
  "Best macro lens for flower and insect photography under $600",
  "Best vintage manual lenses to adapt to mirrorless cameras",

  // --- Lighting & Flashes ---
  "Best budget speedlight flash for wedding photographers (Godox V860III vs V1)",
  "Softbox vs Octabox for indoor portrait lighting setup",
  "Best continuous LED light panel for portrait photography",
  "How to use off-camera flash for outdoor portraits in bright sunlight",

  // --- Camera Bags & Travel Gear ---
  "Best camera backpack for international travel with 2 camera bodies",
  "Peak Design Everyday Backpack 20L vs 30L size comparison",
  "Best waterproof camera shoulder bag for outdoor landscape shooters",
  "How to pack camera gear safely for airline carry-on",

  // --- Filters & Accessories ---
  "Best ND filter set for waterfall long exposures (NiSi vs Breakthrough)",
  "Variable ND vs fixed ND filter - which is better for portrait bokeh in sunlight?",
  "Best fast SD card for 4K video recording and high speed raw bursts",
  "How to clean camera sensor safely at home",
];

/**
 * Executes a simulation cycle:
 * 50% chance: Creates a new thread with varied reply depth (3 to 9 replies) and re-uses persona accounts.
 * 50% chance: Updates an existing thread (student thread or older thread) with fresh, research-backed responses.
 */
export async function runFastDemo(customTopic?: string) {
  // 0. Load Simulation Settings & Model Rotation Pool
  const settings = await prisma.simulationSettings.findUnique({ where: { id: "default" } });
  const apiKey = settings?.openRouterApiKey || process.env.OPENROUTER_API_KEY || undefined;

  const rawPool = settings?.modelPool || DEFAULT_MODEL_POOL.join(",");
  const pool = rawPool.split(",").map((m: string) => m.trim()).filter(Boolean);

  const getModel = (index: number) => pool[index % pool.length] || DEFAULT_MODEL_POOL[0];

  // 1. Ensure simulated persona accounts exist in DB
  const users = await ensureSimulatedUsers();
  await logSimulationStep("PersonaAgent", "Ensure Users", `Verified ${users.length} simulated user accounts.`);

  // Decide mode: if no custom topic, check if we should update an existing thread
  const existingThreads = await prisma.thread.findMany({
    orderBy: { lastPostAt: "asc" },
    take: 10,
    include: { category: true, posts: true },
  });

  const shouldUpdateExisting = !customTopic && existingThreads.length > 3 && Math.random() < 0.45;

  if (shouldUpdateExisting) {
    // Mode B: Update Existing Thread with research-backed answers
    const targetThread = existingThreads[Math.floor(Math.random() * existingThreads.length)];
    const replyCount = Math.floor(Math.random() * 3) + 1;
    const postIds: string[] = [];

    const modelOffset = Math.floor(Math.random() * pool.length);
    const researchModel = getModel(modelOffset);
    const researchFacts = await researchAgent(targetThread.title, { modelName: researchModel, apiKey });

    let lastPost = targetThread.posts[targetThread.posts.length - 1];

    for (let i = 0; i < replyCount; i++) {
      const modelName = getModel(modelOffset + i + 1);
      const personaDef = SIMULATED_PERSONAS[Math.floor(Math.random() * SIMULATED_PERSONAS.length)];
      const personaUser = users.find((u) => u.username === personaDef.username) || users[i % users.length];

      // 15% chance of gear recommendation link
      const storyType = Math.random() < 0.15 ? "product_recommendation" : "simulated_personal_experience";

      const replyBody = await discussionAgent({
        threadTitle: targetThread.title,
        threadBody: targetThread.body,
        researchData: researchFacts,
        parentPost: lastPost ? { id: lastPost.id, authorUsername: personaUser.username, body: lastPost.body } : undefined,
        persona: personaDef,
        categorySlug: targetThread.category.slug,
        storyType,
        options: { modelName, apiKey },
      });

      const postDate = new Date(Date.now() - (replyCount - i) * 15 * 60 * 1000);

      const postItem: { id: string; body: string } = await prisma.post.create({
        data: {
          threadId: targetThread.id,
          parentId: lastPost ? lastPost.id : null,
          authorId: personaUser.id,
          body: replyBody,
          isSimulated: true,
          generatedByAi: true,
          aiAgent: `DiscussionAgent [${modelName}]`,
          createdAt: postDate,
        },
      });

      postIds.push(postItem.id);
      lastPost = { id: postItem.id, authorUsername: personaUser.username, body: postItem.body } as any;
      await logSimulationStep("DiscussionAgent", "Thread Updated", `@${personaUser.username} replied to existing thread "${targetThread.title}"`, targetThread.id);
    }

    await prisma.thread.update({
      where: { id: targetThread.id },
      data: {
        lastPostAt: new Date(),
        viewCount: { increment: Math.floor(Math.random() * 25) + 10 },
      },
    });

    await engagementAgent(targetThread.id, postIds);

    return {
      success: true,
      mode: "updated_existing",
      threadId: targetThread.id,
      threadSlug: targetThread.slug,
      threadTitle: targetThread.title,
      postsCount: postIds.length,
    };
  }

  // Mode A: Create New Thread with dynamic length (3 to 9 replies) using HSV/Low-KD topics
  const topicPrompt = customTopic || TOPIC_PROMPTS[Math.floor(Math.random() * TOPIC_PROMPTS.length)];
  const modelOffset = Math.floor(Math.random() * pool.length);
  const threadModel = getModel(modelOffset);

  const topicData = await topicDiscoveryAgent(topicPrompt, { modelName: threadModel, apiKey });
  await logSimulationStep("TopicDiscoveryAgent", "Topic Discovery", `Found topic using [${threadModel}]: ${topicData.title}`);

  let category = await prisma.category.findUnique({ where: { slug: topicData.categorySlug } });
  if (!category) {
    const allCategories = await prisma.category.findMany();
    category = allCategories[Math.floor(Math.random() * allCategories.length)];
  }

  const baseSlug = slugify(topicData.title);
  const uniqueSuffix = Math.random().toString(36).substring(2, 8);
  const threadSlug = `${baseSlug}-${uniqueSuffix}`;

  // Re-use personas dynamically so accounts accumulate posts over time
  const shuffledPersonas = [...SIMULATED_PERSONAS].sort(() => Math.random() - 0.5);
  const threadAuthorPersona = shuffledPersonas[0];
  const threadAuthorUser = users.find((u) => u.username === threadAuthorPersona.username) || users[0];

  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600 * 1000);
  const threadHoursAgo = 24 + Math.floor(Math.random() * 48);
  const threadDate = hoursAgo(threadHoursAgo);

  const thread = await prisma.thread.create({
    data: {
      title: topicData.title,
      body: topicData.description,
      slug: threadSlug,
      topic: topicData.topic,
      categoryId: category.id,
      authorId: threadAuthorUser.id,
      isSimulated: true,
      viewCount: Math.floor(Math.random() * 120) + 25,
      createdAt: threadDate,
      lastPostAt: threadDate,
    },
  });

  await logSimulationStep("ThreadAgent", "Thread Created", `@${threadAuthorUser.username} created thread "${thread.title}"`, thread.id);

  const researchModel = getModel(modelOffset + 1);
  const researchFacts = await researchAgent(topicData.title, { modelName: researchModel, apiKey });

  // Dynamic reply count: between 3 and 9 replies per thread
  const numReplies = Math.floor(Math.random() * 7) + 3;
  const postIds: string[] = [];
  let lastReplyId: string | undefined = undefined;
  let lastReplyUsername: string | undefined = undefined;
  let lastReplyBody: string | undefined = undefined;

  for (let i = 0; i < numReplies; i++) {
    const replierPersona = shuffledPersonas[(i + 1) % shuffledPersonas.length];
    const replierUser = users.find((u) => u.username === replierPersona.username) || users[(i + 1) % users.length];
    const replyModel = getModel(modelOffset + i + 2);

    // Only 15-20% chance of gear product recommendation link
    const storyType = i === 0 ? "product_recommendation" : (Math.random() < 0.20 ? "simulated_personal_experience" : undefined);

    const parentInfo: { id: string; authorUsername: string; body: string } | undefined =
      lastReplyId && lastReplyUsername && lastReplyBody
        ? { id: lastReplyId, authorUsername: lastReplyUsername, body: lastReplyBody }
        : undefined;

    const replyBody = await discussionAgent({
      threadTitle: thread.title,
      threadBody: thread.body,
      researchData: researchFacts,
      parentPost: parentInfo,
      persona: replierPersona,
      storyType,
      categorySlug: category.slug,
      options: { modelName: replyModel, apiKey },
    });

    const replyHours = Math.max(0.2, threadHoursAgo - (i + 1) * (threadHoursAgo / (numReplies + 1)));
    const postDate = hoursAgo(replyHours);

    const postItem: { id: string; body: string } = await prisma.post.create({
      data: {
        threadId: thread.id,
        parentId: parentInfo ? parentInfo.id : null,
        authorId: replierUser.id,
        body: replyBody,
        isSimulated: true,
        generatedByAi: true,
        aiAgent: `AnswerAgent [${replyModel}]`,
        createdAt: postDate,
      },
    });

    postIds.push(postItem.id);

    // 50% chance next reply nests under this reply
    if (Math.random() < 0.5) {
      lastReplyId = postItem.id;
      lastReplyUsername = replierUser.username;
      lastReplyBody = postItem.body;
    } else {
      lastReplyId = undefined;
      lastReplyUsername = undefined;
      lastReplyBody = undefined;
    }
  }

  await prisma.thread.update({
    where: { id: thread.id },
    data: { lastPostAt: new Date() },
  });

  await engagementAgent(thread.id, postIds);
  await logSimulationStep("EngagementAgent", "Simulated Voting", `Generated realistic upvotes and view counts.`, thread.id);

  return {
    success: true,
    mode: "created_new",
    threadId: thread.id,
    threadSlug: thread.slug,
    threadTitle: thread.title,
    postsCount: postIds.length + 1,
  };
}

/** Allows AI personas to reply to a real student thread */
export async function replyToThreadAsAi(threadId: string, parentPostId?: string) {
  const settings = await prisma.simulationSettings.findUnique({ where: { id: "default" } });
  const apiKey = settings?.openRouterApiKey || process.env.OPENROUTER_API_KEY || undefined;
  const rawPool = settings?.modelPool || DEFAULT_MODEL_POOL.join(",");
  const pool = rawPool.split(",").map((m: string) => m.trim()).filter(Boolean);

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: { category: true, author: true },
  });
  if (!thread) throw new Error("Thread not found");

  const users = await ensureSimulatedUsers();
  const personaDef = SIMULATED_PERSONAS[Math.floor(Math.random() * SIMULATED_PERSONAS.length)];
  const personaUser = users.find((u) => u.username === personaDef.username) || users[0];
  const modelName = pool[Math.floor(Math.random() * pool.length)];

  const researchFacts = await researchAgent(thread.title, { modelName, apiKey });
  const replyBody = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    persona: personaDef,
    categorySlug: thread.category.slug,
    storyType: Math.random() < 0.20 ? "product_recommendation" : "simulated_personal_experience",
    options: { modelName, apiKey },
  });

  const post = await prisma.post.create({
    data: {
      threadId: thread.id,
      parentId: parentPostId || null,
      authorId: personaUser.id,
      body: replyBody,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: `DiscussionAgent [${modelName}]`,
    },
  });

  await prisma.thread.update({
    where: { id: thread.id },
    data: { lastPostAt: new Date() },
  });

  await logSimulationStep("DiscussionAgent", "AI Auto-Reply to Thread", `@${personaUser.username} replied to thread "${thread.title}"`, thread.id);

  return { success: true, postId: post.id };
}

/** Reset utility to wipe all simulated simulation records */
export async function resetSimulation() {
  await prisma.vote.deleteMany({ where: { isSimulated: true } });
  await prisma.post.deleteMany({ where: { isSimulated: true } });
  await prisma.thread.deleteMany({ where: { isSimulated: true } });
  await prisma.simulationLog.deleteMany({});
  await prisma.user.deleteMany({ where: { isSimulated: true } });

  return { success: true, message: "All simulated data reset cleanly." };
}
