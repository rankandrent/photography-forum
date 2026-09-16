import { prisma } from "../lib/prisma";
import { PRIMARY_AMAZON_AFFILIATE_TAG } from "../lib/affiliate";

async function main() {
  console.log("🧹 Starting forum database cleanup...");

  // 1. Delete Off-Topic Spam Threads (e.g., Nike Air Max)
  const offTopicResult = await prisma.thread.deleteMany({
    where: {
      OR: [
        { title: { contains: "Nike", mode: "insensitive" } },
        { title: { contains: "Air Max", mode: "insensitive" } },
        { body: { contains: "Nike Air Max", mode: "insensitive" } },
      ],
    },
  });
  console.log(`✅ Deleted ${offTopicResult.count} off-topic spam thread(s).`);

  // 2. Remove Gibberish Accounts
  const gibberishUsers = await prisma.user.deleteMany({
    where: {
      username: { in: ["zgqmlkommr", "testuser123"] },
    },
  });
  console.log(`✅ Deleted ${gibberishUsers.count} gibberish spam user account(s).`);

  // 3. Clean & Delete Duplicate Threads
  const allThreads = await prisma.thread.findMany({
    select: { id: true, title: true, slug: true, createdAt: true, _count: { select: { posts: true } } },
    orderBy: { createdAt: "desc" },
  });

  const titleMap = new Map<string, typeof allThreads>();
  for (const t of allThreads) {
    const normTitle = t.title.trim().toLowerCase();
    const list = titleMap.get(normTitle) || [];
    list.push(t);
    titleMap.set(normTitle, list);
  }

  let deletedDuplicatesCount = 0;
  for (const [title, threads] of titleMap.entries()) {
    if (threads.length > 1) {
      console.log(`⚠️ Found ${threads.length} duplicate threads for title: "${title}"`);
      // Keep the thread with the most posts or earliest creation
      threads.sort((a, b) => b._count.posts - a._count.posts || a.createdAt.getTime() - b.createdAt.getTime());
      const keep = threads[0];
      const duplicatesToDelete = threads.slice(1);

      for (const dup of duplicatesToDelete) {
        await prisma.post.deleteMany({ where: { threadId: dup.id } });
        await prisma.threadTag.deleteMany({ where: { threadId: dup.id } });
        await prisma.photo.deleteMany({ where: { threadId: dup.id } });
        await prisma.vote.deleteMany({ where: { threadId: dup.id } });
        await prisma.thread.delete({ where: { id: dup.id } });
        deletedDuplicatesCount++;
      }
    }
  }
  console.log(`✅ Deleted ${deletedDuplicatesCount} duplicate thread(s).`);

  // 4. Delete 1-line repetitive template bot replies
  const posts = await prisma.post.findMany({
    select: { id: true, body: true, threadId: true },
  });

  let deletedRepetitivePosts = 0;
  const legacyTagRegex = /tag=(?:asde3t-20|trsese34-20|klel4i4-20|io34erjwk-20|uiw4urhf-20|47398384-20|93485748-20|8uherfhjkd-20)/g;

  for (const p of posts) {
    // Detect single sentence template replies like "I would recommend [Brand]..."
    const isShortTemplate =
      p.body.length < 120 &&
      (p.body.includes("Check Price on Amazon") ||
        /^I (?:would|really) recommend (?:Fujifilm|Sony|Canon|Nikon|Sigma)/i.test(p.body.trim()));

    if (isShortTemplate) {
      await prisma.post.delete({ where: { id: p.id } });
      deletedRepetitivePosts++;
    } else if (legacyTagRegex.test(p.body)) {
      // Replace old affiliate tags with canonical photographyforum-20
      const updatedBody = p.body.replace(legacyTagRegex, `tag=${PRIMARY_AMAZON_AFFILIATE_TAG}`);
      await prisma.post.update({ where: { id: p.id }, data: { body: updatedBody } });
    }
  }
  console.log(`✅ Cleaned ${deletedRepetitivePosts} repetitive template reply posts and updated affiliate tags.`);

  // 5. Fix Thread/Body Context Mismatches
  const mismatchedThread = await prisma.thread.findFirst({
    where: {
      title: { contains: "a7CR vs Z6 III", mode: "insensitive" },
    },
  });
  if (mismatchedThread) {
    await prisma.thread.update({
      where: { id: mismatchedThread.id },
      data: {
        title: "Sony a7CR vs Nikon Z6 III: Hybrid Travel & Resolution Comparison",
        body: "I am deciding between the Sony a7CR and the Nikon Z6 III for a compact high-resolution travel and hybrid setup. Has anyone used both in real-world street and landscape photography? How do you compare Sony's 61MP resolution and compact body against Nikon's updated EVF and video capabilities?",
      },
    });
    console.log("✅ Fixed thread context mismatch for Sony a7CR vs Nikon Z6 III thread.");
  }

  // 6. Normalize Upvote Counts
  const totalUsers = await prisma.user.count();
  const overvotedThreads = await prisma.thread.findMany({
    where: { score: { gt: totalUsers } },
  });
  for (const t of overvotedThreads) {
    await prisma.thread.update({
      where: { id: t.id },
      data: { score: Math.floor(Math.random() * 8) + 3 },
    });
  }

  const overvotedPosts = await prisma.post.findMany({
    where: { score: { gt: totalUsers } },
  });
  for (const p of overvotedPosts) {
    await prisma.post.update({
      where: { id: p.id },
      data: { score: Math.floor(Math.random() * 6) + 2 },
    });
  }
  console.log(`✅ Normalized upvote scores for ${overvotedThreads.length} threads & ${overvotedPosts.length} posts.`);

  console.log("🎉 Forum database cleanup completed successfully!");
}

main()
  .catch((e) => {
    console.error("Cleanup error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
