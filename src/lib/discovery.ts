import { prisma } from "@/lib/prisma";

/**
 * Queries behind the related-threads block and the forum sidebar.
 *
 * These exist for two reasons at once. For a reader they answer "what else is
 * there" on a page that otherwise dead-ends. For the site they are internal
 * links: a thread page here carried 23 of them against a competitor's 104, and
 * a thread nothing links to is a thread crawlers reach late and rank poorly.
 */

export type RelatedThread = {
  slug: string;
  title: string;
  lastPostAt: Date;
  _count: { posts: number };
};

/**
 * Threads worth reading next.
 *
 * Tags first: two threads sharing "#autofocus" are related in a way two threads
 * sharing a category often are not. The category pass only fills the remainder,
 * so a well-tagged thread gets genuinely close neighbours and a bare one still
 * gets something.
 */
export async function relatedThreads(
  threadId: string,
  categoryId: string,
  tagSlugs: string[],
  take = 6,
): Promise<RelatedThread[]> {
  const select = {
    slug: true,
    title: true,
    lastPostAt: true,
    _count: { select: { posts: true } },
  };

  const byTag = tagSlugs.length
    ? await prisma.thread.findMany({
        where: {
          id: { not: threadId },
          tags: { some: { tag: { slug: { in: tagSlugs } } } },
        },
        select,
        orderBy: { lastPostAt: "desc" },
        take,
      })
    : [];

  if (byTag.length >= take) return byTag;

  const seen = new Set(byTag.map((t) => t.slug));
  const byCategory = await prisma.thread.findMany({
    where: {
      id: { not: threadId },
      categoryId,
      slug: { notIn: [...seen] },
    },
    select,
    orderBy: { lastPostAt: "desc" },
    take: take - byTag.length,
  });

  return [...byTag, ...byCategory];
}

export type SidebarData = {
  recentThreads: { slug: string; title: string; lastPostAt: Date; _count: { posts: number } }[];
  recentPosts: {
    id: string;
    createdAt: Date;
    author: { username: string; name: string | null; image: string | null };
    thread: { slug: string; title: string };
  }[];
};

/** Recent activity, for the sidebar. One round trip. */
export async function sidebarData(limit = 8): Promise<SidebarData> {
  const [recentThreads, recentPosts] = await Promise.all([
    prisma.thread.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        slug: true,
        title: true,
        lastPostAt: true,
        _count: { select: { posts: true } },
      },
    }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        createdAt: true,
        author: { select: { username: true, name: true, image: true } },
        thread: { select: { slug: true, title: true } },
      },
    }),
  ]);

  return { recentThreads, recentPosts };
}
