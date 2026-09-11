import { prisma } from "@/lib/prisma";
import {
  ensureSimulatedUsers,
  topicDiscoveryAgent,
  researchAgent,
  discussionAgent,
  engagementAgent,
  SIMULATED_PERSONAS,
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
 * Fast Demo Mode: Executes a complete multi-user thread simulation cycle in seconds
 * for university live demonstration.
 */
export async function runFastDemo(customTopic?: string) {
  // 1. Ensure simulated personas exist in DB
  const users = await ensureSimulatedUsers();
  const travelCamGuy = users.find((u) => u.username === "TravelCamGuy") || users[0];
  const cameraNerd24 = users.find((u) => u.username === "CameraNerd24") || users[1];
  const beginnerPhotog = users.find((u) => u.username === "BeginnerPhotog") || users[2];
  const photoMike = users.find((u) => u.username === "PhotoMike") || users[3];
  const sarahShoots = users.find((u) => u.username === "SarahShoots") || users[4];

  await logSimulationStep("PersonaAgent", "Ensure Users", `Verified ${users.length} simulated user accounts.`);

  // 2. Discover Topic & Create Thread
  const topicData = await topicDiscoveryAgent(customTopic);
  await logSimulationStep("TopicDiscoveryAgent", "Topic Discovery", `Found topic: ${topicData.title}`);

  // Fetch or fallback category
  let category = await prisma.category.findUnique({ where: { slug: topicData.categorySlug } });
  if (!category) {
    category = (await prisma.category.findFirst()) || {
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

  const thread = await prisma.thread.create({
    data: {
      title: topicData.title,
      body: topicData.description,
      slug: threadSlug,
      topic: topicData.topic,
      categoryId: category.id,
      authorId: travelCamGuy.id,
      isSimulated: true,
    },
  });

  await logSimulationStep("ThreadAgent", "Thread Created", `Created thread #${thread.id} (${thread.title})`, thread.id);

  // 3. Research Agent
  const researchFacts = await researchAgent(topicData.title);
  await logSimulationStep("ResearchAgent", "Fact Extraction", `Grounded facts gathered for research.`, thread.id);

  const postIds: string[] = [];

  // 4. First Top-Level Reply by CameraNerd24
  const personaNerd = SIMULATED_PERSONAS.find((p) => p.username === "CameraNerd24")!;
  const reply1Body = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    persona: personaNerd,
    storyType: "product_recommendation",
  });

  const post1 = await prisma.post.create({
    data: {
      threadId: thread.id,
      authorId: cameraNerd24.id,
      body: reply1Body,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: "AnswerAgent",
    },
  });
  postIds.push(post1.id);
  await logSimulationStep("AnswerAgent", "First Reply", `@CameraNerd24 replied to thread.`, thread.id);

  // 5. Nested Reply 1.1 by BeginnerPhotog (Replying directly to Reply 1)
  const personaBeginner = SIMULATED_PERSONAS.find((p) => p.username === "BeginnerPhotog")!;
  const reply2Body = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    parentPost: { id: post1.id, authorUsername: cameraNerd24.username, body: post1.body },
    persona: personaBeginner,
  });

  const post2 = await prisma.post.create({
    data: {
      threadId: thread.id,
      parentId: post1.id,
      authorId: beginnerPhotog.id,
      body: reply2Body,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: "DiscussionAgent (Nested)",
    },
  });
  postIds.push(post2.id);
  await logSimulationStep("DiscussionAgent", "Nested Reply", `@BeginnerPhotog replied to @CameraNerd24.`, thread.id);

  // 6. Nested Reply 1.1.1 by PhotoMike with simulated personal experience story
  const personaMike = SIMULATED_PERSONAS.find((p) => p.username === "PhotoMike")!;
  const reply3Body = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    parentPost: { id: post2.id, authorUsername: beginnerPhotog.username, body: post2.body },
    persona: personaMike,
    storyType: "simulated_personal_experience",
  });

  const post3 = await prisma.post.create({
    data: {
      threadId: thread.id,
      parentId: post2.id,
      authorId: photoMike.id,
      body: reply3Body,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: "DiscussionAgent (Personal Story)",
      storyType: "simulated_personal_experience",
    },
  });
  postIds.push(post3.id);
  await logSimulationStep("DiscussionAgent", "Personal Story Reply", `@PhotoMike shared personal experience story.`, thread.id);

  // 7. Top-Level Reply by SarahShoots
  const personaSarah = SIMULATED_PERSONAS.find((p) => p.username === "SarahShoots")!;
  const reply4Body = await discussionAgent({
    threadTitle: thread.title,
    threadBody: thread.body,
    researchData: researchFacts,
    persona: personaSarah,
    storyType: "product_recommendation",
  });

  const post4 = await prisma.post.create({
    data: {
      threadId: thread.id,
      authorId: sarahShoots.id,
      body: reply4Body,
      isSimulated: true,
      generatedByAi: true,
      aiAgent: "AnswerAgent",
    },
  });
  postIds.push(post4.id);

  // Update thread lastPostAt
  await prisma.thread.update({
    where: { id: thread.id },
    data: { lastPostAt: new Date() },
  });

  // 8. Engagement Agent (Simulated Upvotes / Downvotes)
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

/** Reset utility to wipe all simulated simulation records */
export async function resetSimulation() {
  await prisma.vote.deleteMany({ where: { isSimulated: true } });
  await prisma.post.deleteMany({ where: { isSimulated: true } });
  await prisma.thread.deleteMany({ where: { isSimulated: true } });
  await prisma.simulationLog.deleteMany({});
  await prisma.user.deleteMany({ where: { isSimulated: true } });

  return { success: true, message: "All simulated data reset cleanly." };
}
