import { prisma } from "../lib/prisma";

async function cleanupDuplicateReplies() {
  console.log("🧹 Scanning database for duplicate & template replies...");

  const allPosts = await prisma.post.findMany({
    select: {
      id: true,
      threadId: true,
      body: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const seenByThread = new Map<string, Set<string>>();
  const toDeleteIds: string[] = [];

  for (const post of allPosts) {
    const textKey = post.body.trim().toLowerCase();

    // Check for exact duplicate template text: "I ran into something very similar when shooting high-contrast scenes..."
    const isProblematicTemplate = textKey.includes("i ran into something very similar when shooting high-contrast scenes");

    if (!seenByThread.has(post.threadId)) {
      seenByThread.set(post.threadId, new Set());
    }

    const threadSeen = seenByThread.get(post.threadId)!;

    if (threadSeen.has(textKey) || (isProblematicTemplate && threadSeen.size > 0)) {
      toDeleteIds.push(post.id);
    } else {
      threadSeen.add(textKey);
    }
  }

  if (toDeleteIds.length > 0) {
    console.log(`Deleting ${toDeleteIds.length} duplicate/templated reply post(s)...`);
    const res = await prisma.post.deleteMany({
      where: { id: { in: toDeleteIds } },
    });
    console.log(`✅ Deleted ${res.count} duplicate reply post(s).`);
  } else {
    console.log("✅ No duplicate replies found.");
  }
}

cleanupDuplicateReplies().catch(console.error);
