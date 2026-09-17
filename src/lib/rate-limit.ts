import { prisma } from "@/lib/prisma";

export interface RateLimitResult {
  allowed: boolean;
  message?: string;
}

/**
 * Enforces anti-spam & rate-limiting rules for threads and replies:
 * 1. Max 3 threads per user per 24 hours.
 * 2. Max 20 replies per user per 24 hours.
 * 3. Prevents loop posting within 5 seconds of previous submission.
 */
export async function checkRateLimit(
  userId: string,
  type: "thread" | "reply"
): Promise<RateLimitResult> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const fiveSecondsAgo = new Date(Date.now() - 5 * 1000);

  if (type === "thread") {
    // Check 5-second rapid burst loop
    const recentThread = await prisma.thread.findFirst({
      where: {
        authorId: userId,
        createdAt: { gte: fiveSecondsAgo },
      },
      select: { id: true },
    });
    if (recentThread) {
      return { allowed: false, message: "Please wait a few seconds before creating another thread." };
    }

    // Check 24-hour max 3 threads
    const threadsTodayCount = await prisma.thread.count({
      where: {
        authorId: userId,
        createdAt: { gte: oneDayAgo },
      },
    });

    if (threadsTodayCount >= 3) {
      return {
        allowed: false,
        message: "Posting limit reached: max 3 threads allowed per 24 hours to prevent spam.",
      };
    }
  }

  if (type === "reply") {
    // Check 5-second rapid burst loop
    const recentPost = await prisma.post.findFirst({
      where: {
        authorId: userId,
        createdAt: { gte: fiveSecondsAgo },
      },
      select: { id: true },
    });
    if (recentPost) {
      return { allowed: false, message: "Please wait a few seconds before posting another reply." };
    }

    // Check 24-hour max 20 replies
    const postsTodayCount = await prisma.post.count({
      where: {
        authorId: userId,
        createdAt: { gte: oneDayAgo },
      },
    });

    if (postsTodayCount >= 20) {
      return {
        allowed: false,
        message: "Posting limit reached: max 20 replies allowed per 24 hours.",
      };
    }
  }

  return { allowed: true };
}
