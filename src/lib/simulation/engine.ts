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
 * Diverse photography topic prompts so each run produces a unique thread.
 * The engine picks a random one (or uses the user's custom topic).
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
  "Film simulation recipes for Fujifilm — share your favorites",
  "Why are my indoor photos always blurry? (beginner help)",
  "Best budget flash for wedding photography",
  "Sigma 35mm f/1.4 Art vs Sony 35mm f/1.4 GM comparison",
  "How to get clients as a new portrait photographer",
  "Macro photography gear essentials for flower close-ups",
  "Is full frame really worth it over APS-C in 2024?",
  "Best camera bag for international travel with 2 bodies",
  "How to shoot in manual mode — a step by step guide",
  "Drone photography tips for real estate — DJI Mini 4 Pro",
  "What's your favorite photo you've ever taken and why?",
  "Help me choose: Canon R7 vs Sony a6700 for wildlife",
  "How to create moody dark portrait edits in Capture One",
  "Best vintage lenses to adapt to Sony E-mount",
  "Concert photography settings and tips for beginners",
  "What ND filter do you use for waterfall long exposures?",
  "How to photograph your kids without them looking awkward",
];

/**
 * Fast Demo Mode: Executes a complete multi-user thread simulation cycle
 * with RANDOMIZED authors, diverse topics, and naturally staggered timestamps.
 */
export async function runFastDemo(customTopic?: string) {
  // 0. Load Simulation Settings & Model Rotation Pool
  const settings = await prisma.simulationSettings.findUnique({ where: { id: "default" } });
  const apiKey = settings?.openRouterApiKey || process.env.OPENROUTER_API_KEY || undefined;

  const rawPool = settings?.modelPool || DEFAULT_MODEL_POOL.join(",");
  const pool = rawPool.split(",").map((m: string) => m.trim()).filter(Boolean);

  // Helper: pick model for step i (strict rotation)
  const getModel = (index: number) => pool[index % pool.length] || DEFAULT_MODEL_POOL[0];

  // 1. Ensure all 30 simulated personas exist in DB
  const users = await ensureSimulatedUsers();
  await logSimulationStep("PersonaAgent", "Ensure Users", `Verified ${users.length} simulated user accounts.`);

  // 2. Pick a RANDOM topic from pool (avoid repeating the same thread)
  const topicPrompt = customTopic || TOPIC_PROMPTS[Math.floor(Math.random() * TOPIC_PROMPTS.length)];

  // Randomly pick a MODEL offset so each run starts from a different model
  const modelOffset = Math.floor(Math.random() * pool.length);
  const threadModel = getModel(modelOffset);

  const topicData = await topicDiscoveryAgent(topicPrompt, { modelName: threadModel, apiKey });
  await logSimulationStep("TopicDiscoveryAgent", "Topic Discovery", `Found topic using [${threadModel}]: ${topicData.title}`);

  // 3. Fetch or fallback category
  let category = await prisma.category.findUnique({ where: { slug: topicData.categorySlug } });
  if (!category) {
    // Try to pick a random existing category for variety
    const allCategories = await prisma.category.findMany();
    category = allCategories[Math.floor(Math.random() * allCategories.length)] || {
      id: "cmtty57ck000004jop8h91n1e",
      slug: "gear-talk",
      name: "Gear talk",
      description: "Gear discussions",
      color: "#0ea5e9",
      position: 0,
    };
  }

  const baseSlug = slugify(topicData.title);
  const uniqueSuffix = Math.random().toString(36).substring(2, 8);
  const threadSlug = `${baseSlug}-${uniqueSuffix}`;

  // 4. Pick 5 UNIQUE RANDOM personas for this thread (author + 4 repliers)
  const shuffled = [...SIMULATED_PERSONAS].sort(() => Math.random() - 0.5);
  const threadAuthorPersona = shuffled[0];
  const replier1Persona = shuffled[1];
  const replier2Persona = shuffled[2];
  const replier3Persona = shuffled[3];
  const replier4Persona = shuffled[4];

  const threadAuthorUser = users.find((u) => u.username === threadAuthorPersona.username) || users[0];
  const replier1User = users.find((u) => u.username === replier1Persona.username) || users[1];
  const replier2User = users.find((u) => u.username === replier2Persona.username) || users[2];
  const replier3User = users.find((u) => u.username === replier3Persona.username) || users[3];
  const replier4User = users.find((u) => u.username === replier4Persona.username) || users[4];

  // 5. STAGGERED TIMESTAMPS — wide spread across 3 days for realism
  //    Random jitter so every run gets different relative times
  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600 * 1000);
  const minsAgo = (m: number) => new Date(now.getTime() - m * 60 * 1000);

  // Thread: 2–3 days ago (random between 48–72 hours)
  const threadHoursAgo = 48 + Math.floor(Math.random() * 24);
  const threadDate = hoursAgo(threadHoursAgo);

  // Reply 1: 1–2 days ago (random 24–48 hours)
  const reply1HoursAgo = 24 + Math.floor(Math.random() * 24);
  const post1Date = hoursAgo(reply1HoursAgo);

  // Reply 2 (nested): 8–18 hours ago
  const reply2HoursAgo = 8 + Math.floor(Math.random() * 10);
  const post2Date = hoursAgo(reply2HoursAgo);

  // Reply 3 (nested personal story): 2–6 hours ago
  const reply3HoursAgo = 2 + Math.floor(Math.random() * 4);
  const post3Date = hoursAgo(reply3HoursAgo);

  // Reply 4 (top-level): 12–55 minutes ago
  const reply4MinsAgo = 12 + Math.floor(Math.random() * 43);
  const post4Date = minsAgo(reply4MinsAgo);

  // 6. Create Thread by RANDOM author
  const thread = await prisma.thread.create({
    data: {
      title: topicData.title,
      body: topicData.description,
      slug: threadSlug,
      topic: topicData.topic,
      categoryId: category.id,
      authorId: threadAuthorUser.id,
      isSimulated: true,
      createdAt: threadDate,
      lastPostAt: post4Date,
    },
  });

  await logSimulationStep("ThreadAgent", "Thread Created", `@${threadAuthorUser.username} posted thread using [${threadModel}]`, thread.id);

  // 7. Research Agent (different model)
  const researchModel = getModel(modelOffset + 1);
  const researchFacts = await researchAgent(topicData.title, { modelName: researchModel, apiKey });
  await logSimulationStep("ResearchAgent", "Fact Extraction", `Grounded facts gathered using [${researchModel}].`, thread.id);

  const postIds: string[] = [];

  // 8. First Top-Level Reply (Random replier 1, different model)
  const model2 = getModel(modelOffset + 2);
  const reply1Body = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    persona: replier1Persona,
    storyType: "product_recommendation",
    categorySlug: category.slug,
    options: { modelName: model2, apiKey },
  });

  const post1 = await prisma.post.create({
    data: {
      threadId: thread.id,
      authorId: replier1User.id,
      body: reply1Body,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: `AnswerAgent [${model2}]`,
      createdAt: post1Date,
    },
  });
  postIds.push(post1.id);
  await logSimulationStep("AnswerAgent", "First Reply", `@${replier1User.username} replied using [${model2}].`, thread.id);

  // 9. Nested Reply (replier 2 to replier 1)
  const model3 = getModel(modelOffset + 3);
  const reply2Body = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    parentPost: { id: post1.id, authorUsername: replier1User.username, body: post1.body },
    persona: replier2Persona,
    categorySlug: category.slug,
    options: { modelName: model3, apiKey },
  });

  const post2 = await prisma.post.create({
    data: {
      threadId: thread.id,
      parentId: post1.id,
      authorId: replier2User.id,
      body: reply2Body,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: `DiscussionAgent (Nested) [${model3}]`,
      createdAt: post2Date,
    },
  });
  postIds.push(post2.id);
  await logSimulationStep("DiscussionAgent", "Nested Reply", `@${replier2User.username} replied to @${replier1User.username} using [${model3}].`, thread.id);

  // 10. Deep Nested Reply with personal story (replier 3)
  const model4 = getModel(modelOffset + 4);
  const reply3Body = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    parentPost: { id: post2.id, authorUsername: replier2User.username, body: post2.body },
    persona: replier3Persona,
    storyType: "simulated_personal_experience",
    categorySlug: category.slug,
    options: { modelName: model4, apiKey },
  });

  const post3 = await prisma.post.create({
    data: {
      threadId: thread.id,
      parentId: post2.id,
      authorId: replier3User.id,
      body: reply3Body,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: `DiscussionAgent (Personal Story) [${model4}]`,
      storyType: "simulated_personal_experience",
      createdAt: post3Date,
    },
  });
  postIds.push(post3.id);
  await logSimulationStep("DiscussionAgent", "Personal Story Reply", `@${replier3User.username} shared personal story using [${model4}].`, thread.id);

  // 11. Top-Level Reply (replier 4)
  const model5 = getModel(modelOffset + 5);
  const reply4Body = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    persona: replier4Persona,
    storyType: category.slug === "critique" ? "critique" : "product_recommendation",
    categorySlug: category.slug,
    options: { modelName: model5, apiKey },
  });

  const post4 = await prisma.post.create({
    data: {
      threadId: thread.id,
      authorId: replier4User.id,
      body: reply4Body,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: `AnswerAgent [${model5}]`,
      createdAt: post4Date,
    },
  });
  postIds.push(post4.id);

  // Update thread lastPostAt
  await prisma.thread.update({
    where: { id: thread.id },
    data: { lastPostAt: post4Date },
  });

  // 12. Engagement Agent (Simulated Upvotes / Downvotes)
  await engagementAgent(thread.id, postIds);
  await logSimulationStep("EngagementAgent", "Simulated Voting", `Generated simulated upvotes for thread and posts.`, thread.id);

  return {
    success: true,
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
  // Pick random persona and model
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
    storyType: thread.category.slug === "critique" ? "critique" : "product_recommendation",
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

  await logSimulationStep("DiscussionAgent", "AI Auto-Reply to Thread", `@${personaUser.username} replied to thread "${thread.title}" using [${modelName}]`, thread.id);

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
