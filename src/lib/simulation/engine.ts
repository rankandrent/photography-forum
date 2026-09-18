import { prisma } from "@/lib/prisma";
import { triggerRealUserReplyNotification } from "@/lib/email";
import {
  ensureSimulatedUsers,
  topicDiscoveryAgent,
  painPointMiningAgent,
  researchAgent,
  discussionAgent,
  engagementAgent,
  internalLinkingAgent,
  optimizeDatabaseInternalLinks,
  masterAuditorAgent,
  SIMULATED_PERSONAS,
  DEFAULT_MODEL_POOL,
  ContentGenerationError,
} from "./agents";
import { findDuplicate, findDuplicateThreadTitle } from "./quality";
import { processAmazonAffiliateLinks } from "@/lib/affiliate";
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
 * High-converting, search-engine-optimized buyer-intent topics strictly matching:
 * 1. "How to..."
 * 2. "What..."
 * 3. "What to know about..." / "All about..."
 * 4. "[Product A] vs [Product B]"
 * 5. "Best [Product] for [Use Case]"
 */
const TOPIC_PROMPTS = [
  // --- 1. "How to..." Topics ---
  "How to photograph the Milky Way for beginners",
  "How to shoot sharp portraits in low light with a prime lens",
  "How to clean a camera sensor safely at home without scratching glass",
  "How to use off-camera flash for outdoor portraits in bright sunlight",
  "How to choose your first tripod for outdoor hiking and landscape photo",
  "How to edit golden hour portraits in Lightroom for warm skin tones",
  "How to photograph fast moving kids without motion blur",
  "How to capture long exposure waterfall shots using ND filters",

  // --- 2. "What..." Topics ---
  "What is the best lens for portrait photography under $500?",
  "What tripod do you recommend for heavy telephoto wildlife lenses?",
  "What ND filter strength is best for waterfall long exposures?",
  "What camera settings should I use for indoor concert photography?",
  "What is the best budget flash for wedding photographers?",
  "What tripod head is best for panoramic landscape photography?",
  "What prime lens length is best for street photography (35mm vs 50mm)?",

  // --- 3. "What to know about..." / "All about..." Topics ---
  "What to know about full frame vs APS-C mirrorless cameras in 2024",
  "All about Fujifilm film simulation recipes for travel photography",
  "What to know about adapting vintage manual focus lenses to mirrorless",
  "What to know about variable ND filters vs fixed ND filters",
  "All about camera sensor sizes and low light noise performance",

  // --- 4. "Vs..." Topics ---
  "Sony a6700 vs Fujifilm X-S20 for travel photography and video",
  "Sigma 18-50mm f/2.8 vs Fuji 18-55mm f/2.8-4 kit lens",
  "Peak Design Travel Tripod aluminum vs carbon fiber version",
  "Canon EOS R50 vs Sony a6100 for beginner content creation",
  "Tamron 28-75mm f/2.8 G2 vs Sony 24-70mm f/2.8 GM II",
  "Godox V860III vs Godox V1 round head speedlight flash",
  "Nikon Z fc vs Fujifilm X-T30 II for everyday street carry",
  "Peak Design Everyday Backpack 20L vs 30L for camera gear",

  // --- 5. "Best [Product] for [Use Case]" Topics ---
  "Best lightweight carbon fiber tripod for hiking under $200",
  "Best budget portrait lens for Sony E mount shooters",
  "Best mirrorless camera for travel photography under $1000",
  "Best landscape lens for Canon EOS R6 Mark II",
  "Best camera backpack for international carry-on travel",
  "Best budget travel tripod for landscape long exposures",
  "Best macro lens for flower and close-up photography under $600",
  "Best prime lens for night street photography in low light",
  "Best waterproof camera shoulder bag for outdoor photography",
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

      let replyBody: string;
      try {
        replyBody = await discussionAgent({
          threadTitle: targetThread.title,
          threadBody: targetThread.body,
          researchData: researchFacts,
          parentPost: lastPost ? { id: lastPost.id, authorUsername: personaUser.username, body: lastPost.body } : undefined,
          persona: personaDef,
          categorySlug: targetThread.category.slug,
          storyType,
          options: { modelName, apiKey },
        });
      } catch (error) {
        if (!(error instanceof ContentGenerationError)) throw error;
        await logSimulationStep("DiscussionAgent", "Skipped", `Generation failed, no reply posted: ${error.message}`);
        continue;
      }

      const duplicate = await findDuplicate(replyBody, { threadId: targetThread.id });
      if (duplicate) {
        await logSimulationStep(
          "QualityGuard",
          "Rejected duplicate",
          `Reply ${(duplicate.score * 100).toFixed(0)}% similar to an existing post: "${duplicate.excerpt}…"`
        );
        continue;
      }

      const postDate = new Date();

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

      // Trigger email notification if replying to a real registered user's thread/comment
      void triggerRealUserReplyNotification({
        threadId: targetThread.id,
        parentPostId: lastPost ? lastPost.id : null,
        replierUserId: personaUser.id,
        replierName: personaUser.name || personaUser.username,
        replyBody,
      }).catch(() => undefined);

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

    // Multi-Tier Audit & Self-Correction Step
    const auditResult = await masterAuditorAgent({ threadId: targetThread.id, postIds });
    await logSimulationStep(
      "MasterAuditorAgent",
      "Quality Audit & Auto-Improvement",
      `Audited ${auditResult.auditedCount} posts. Avg Score: ${auditResult.qualityScoreAverage}/100. Auto-Fixed: ${auditResult.fixedCount}.\nSummary: ${auditResult.logSummary.join(" | ")}`,
      targetThread.id
    );

    return {
      success: true,
      mode: "updated_existing",
      threadId: targetThread.id,
      threadSlug: targetThread.slug,
      threadTitle: targetThread.title,
      postsCount: postIds.length,
      audit: auditResult,
    };
  }

  // Mode A: Create New Thread (60% Real Pain-Point Troubleshooting, 40% Buyer-Intent Comparison)
  const modelOffset = Math.floor(Math.random() * pool.length);
  const threadModel = getModel(modelOffset);

  let topicData;
  const usePainPointMining = !customTopic && Math.random() < 0.60;

  if (usePainPointMining) {
    topicData = await painPointMiningAgent({ modelName: threadModel, apiKey });
    await logSimulationStep("PainPointMiningAgent", "Photography Pain Point Mined", `Mined pain point [${threadModel}]: ${topicData.title}`);
  } else {
    const topicPrompt = customTopic || TOPIC_PROMPTS[Math.floor(Math.random() * TOPIC_PROMPTS.length)];
    topicData = await topicDiscoveryAgent(topicPrompt, { modelName: threadModel, apiKey });
    await logSimulationStep("TopicDiscoveryAgent", "Topic Discovery", `Found buyer intent topic [${threadModel}]: ${topicData.title}`);
  }

  let category = await prisma.category.findUnique({ where: { slug: topicData.categorySlug } });
  if (!category) {
    const allCategories = await prisma.category.findMany();
    category = allCategories[Math.floor(Math.random() * allCategories.length)];
  }

  const baseSlug = slugify(topicData.title);
  const uniqueSuffix = Math.random().toString(36).substring(2, 8);
  const threadSlug = `${baseSlug}-${uniqueSuffix}`;

  const shuffledPersonas = [...SIMULATED_PERSONAS].sort(() => Math.random() - 0.5);
  const threadAuthorPersona = shuffledPersonas[0];
  const threadAuthorUser = users.find((u) => u.username === threadAuthorPersona.username) || users[0];

  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600 * 1000);
  const threadHoursAgo = 24 + Math.floor(Math.random() * 48);
  const threadDate = hoursAgo(threadHoursAgo);

  const titleClash = await findDuplicateThreadTitle(topicData.title);
  if (titleClash) {
    // Publishing it would put two near-identical pages in the index competing
    // for the same query. Abandon the run; the next one picks a fresh topic.
    await logSimulationStep(
      "QualityGuard",
      "Rejected duplicate title",
      `"${topicData.title}" is ${(titleClash.score * 100).toFixed(0)}% similar to "${titleClash.title}"`
    );
    return { success: false as const, mode: "skipped_duplicate_title" as const, duplicateOf: titleClash.title };
  }

  const thread = await prisma.thread.create({
    data: {
      title: topicData.title,
      // Gear named in the opening post earns an affiliate link too; this used
      // to run on replies only.
      body: processAmazonAffiliateLinks(topicData.description),
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

  // Seed SEO tags for interlinking & related threads discovery
  const tagKeywords = ["sony", "fujifilm", "canon", "nikon", "travel", "portrait", "landscape", "tripod", "lens", "astrophotography", "street", "lightroom", "macro", "wildlife", "full-frame", "aps-c"];
  const matchedTags = tagKeywords.filter((w) => topicData.title.toLowerCase().includes(w) || topicData.topic.toLowerCase().includes(w));
  if (matchedTags.length === 0) matchedTags.push("gear-discussion");

  for (const tagName of matchedTags) {
    const tagSlug = slugify(tagName);
    try {
      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        create: { slug: tagSlug, name: tagName.toUpperCase() },
        update: {},
      });
      await prisma.threadTag.create({
        data: { threadId: thread.id, tagId: tag.id },
      });
    } catch {
      // Ignore tag duplicate edge cases
    }
  }

  await logSimulationStep("ThreadAgent", "Thread Created", `@${threadAuthorUser.username} created thread "${thread.title}"`, thread.id);

  const researchModel = getModel(modelOffset + 1);
  const researchFacts = await researchAgent(topicData.title, { modelName: researchModel, apiKey });

  const numReplies = Math.floor(Math.random() * 7) + 3;
  const postIds: string[] = [];
  let lastReplyId: string | undefined = undefined;
  let lastReplyUsername: string | undefined = undefined;
  let lastReplyBody: string | undefined = undefined;

  for (let i = 0; i < numReplies; i++) {
    const replierPersona = shuffledPersonas[(i + 1) % shuffledPersonas.length];
    const replierUser = users.find((u) => u.username === replierPersona.username) || users[(i + 1) % users.length];
    const replyModel = getModel(modelOffset + i + 2);

    const storyType = i === 0 ? "product_recommendation" : (Math.random() < 0.20 ? "simulated_personal_experience" : undefined);

    const parentInfo: { id: string; authorUsername: string; body: string } | undefined =
      lastReplyId && lastReplyUsername && lastReplyBody
        ? { id: lastReplyId, authorUsername: lastReplyUsername, body: lastReplyBody }
        : undefined;

    let replyBody: string;
    try {
      replyBody = await discussionAgent({
        threadTitle: thread.title,
        threadBody: thread.body,
        researchData: researchFacts,
        parentPost: parentInfo,
        persona: replierPersona,
        storyType,
        categorySlug: category.slug,
        options: { modelName: replyModel, apiKey },
      });
    } catch (error) {
      if (!(error instanceof ContentGenerationError)) throw error;
      await logSimulationStep("DiscussionAgent", "Skipped", `Generation failed, no reply posted: ${error.message}`);
      continue;
    }

    // 25% chance of contextual internal link to another thread
    if (Math.random() < 0.25) {
      replyBody = await internalLinkingAgent({
        content: replyBody,
        currentThreadId: thread.id,
        options: { modelName: replyModel, apiKey },
      });
    }

    const duplicateReply = await findDuplicate(replyBody, { threadId: thread.id });
    if (duplicateReply) {
      await logSimulationStep(
        "QualityGuard",
        "Rejected duplicate",
        `Reply ${(duplicateReply.score * 100).toFixed(0)}% similar to an existing post: "${duplicateReply.excerpt}…"`
      );
      continue;
    }

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

  // Multi-Tier Audit & Self-Correction Step
  const auditResult = await masterAuditorAgent({ threadId: thread.id, postIds });
  await logSimulationStep(
    "MasterAuditorAgent",
    "Quality Audit & Auto-Improvement",
    `Audited ${auditResult.auditedCount} posts. Avg Score: ${auditResult.qualityScoreAverage}/100. Auto-Fixed: ${auditResult.fixedCount}.\nSummary: ${auditResult.logSummary.join(" | ")}`,
    thread.id
  );

  // Background SEO Interlinking Optimization Pass
  void optimizeDatabaseInternalLinks(3).catch(() => undefined);

  return {
    success: true,
    mode: "created_new",
    threadId: thread.id,
    threadSlug: thread.slug,
    threadTitle: thread.title,
    postsCount: postIds.length + 1,
    audit: auditResult,
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

  // Trigger email notification if the thread or comment owner is a real registered user
  void triggerRealUserReplyNotification({
    threadId: thread.id,
    parentPostId: parentPostId || null,
    replierUserId: personaUser.id,
    replierName: personaUser.name || personaUser.username,
    replyBody,
  }).catch(() => undefined);

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
