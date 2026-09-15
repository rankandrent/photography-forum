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
 * Diverse photography topic prompts for creating new threads.
 */
const TOPIC_PROMPTS = [
  "Best mirrorless camera for travel photography under $1500",
  "How to photograph the Milky Way for beginners",
  "Is the Fujifilm X100VI worth the hype in 2024?",
  "Best lenses for Canon EOS R6 Mark III",
  "Street photography tips for shy people",
  "How do you edit golden hour portraits in Lightroom?",
  "Sony a7CR vs Nikon Z6 III for landscape photography",
  "What tripod do you recommend for hiking?",
  "Film simulation recipes for Fujifilm - share your favorites",
  "Why are my indoor photos always blurry? (beginner help)",
  "Best budget flash for wedding photography",
  "Sigma 35mm f/1.4 Art vs Sony 35mm f/1.4 GM comparison",
  "How to get clients as a new portrait photographer",
  "Macro photography gear essentials for flower close-ups",
  "Is full frame really worth it over APS-C in 2024?",
  "Best camera bag for international travel with 2 bodies",
  "How to shoot in manual mode - a step by step guide",
  "Drone photography tips for real estate - DJI Mini 4 Pro",
  "What's your favorite photo you've ever taken and why?",
  "Help me choose: Canon R7 vs Sony a6700 for wildlife",
  "How to create moody dark portrait edits in Capture One",
  "Best vintage lenses to adapt to Sony E-mount",
  "Concert photography settings and tips for beginners",
  "What ND filter do you use for waterfall long exposures?",
  "How to photograph your kids without them looking awkward",
];

/**
 * Executes a simulation cycle:
 * 50% chance: Creates a new thread with varied reply depth (3 to 9 replies) and re-uses persona accounts.
 * 50% chance: Updates an existing thread (student thread or older thread) with fresh, realistic responses.
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
    // Mode B: Update Existing Thread
    const targetThread = existingThreads[Math.floor(Math.random() * existingThreads.length)];
    const replyCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 replies
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

      const post = await prisma.post.create({
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

      postIds.push(post.id);
      lastPost = post;
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

  // Mode A: Create New Thread with dynamic length (3 to 9 replies)
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

  // Staggered timestamps spanning up to 3 days
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

  // Update thread lastPostAt
  await prisma.thread.update({
    where: { id: thread.id },
    data: { lastPostAt: new Date() },
  });

  // Apply randomized engagement (upvotes up to 1-150 range)
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
