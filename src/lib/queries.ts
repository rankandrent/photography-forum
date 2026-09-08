import { prisma } from "@/lib/prisma";
import { PHOTO_SELECT } from "@/lib/photo-view";

export const PAGE_SIZE = 20;

export const THREAD_LIST_SELECT = {
  id: true,
  slug: true,
  title: true,
  body: true,
  kind: true,
  pinned: true,
  locked: true,
  score: true,
  viewCount: true,
  createdAt: true,
  lastPostAt: true,
  author: { select: { username: true, name: true, image: true } },
  category: { select: { slug: true, name: true, color: true } },
  tags: { select: { tag: { select: { slug: true, name: true } } } },
  photos: { select: { thumbKey: true }, take: 1 },
  _count: { select: { posts: true } },
} as const;

export type ThreadListItem = Awaited<
  ReturnType<typeof prisma.thread.findMany<{ select: typeof THREAD_LIST_SELECT }>>
>[number];

export type Sort = "latest" | "top" | "new" | "unanswered";

export function orderFor(sort: Sort) {
  switch (sort) {
    case "top":
      return [{ pinned: "desc" }, { score: "desc" }, { lastPostAt: "desc" }] as const;
    case "new":
      return [{ pinned: "desc" }, { createdAt: "desc" }] as const;
    default:
      return [{ pinned: "desc" }, { lastPostAt: "desc" }] as const;
  }
}

export async function listThreads(opts: {
  categoryId?: string;
  authorId?: string;
  tagSlug?: string;
  sort?: Sort;
  page?: number;
}) {
  const page = Math.max(1, opts.page ?? 1);
  const sort = opts.sort ?? "latest";

  const where = {
    ...(opts.categoryId ? { categoryId: opts.categoryId } : {}),
    ...(opts.authorId ? { authorId: opts.authorId } : {}),
    ...(opts.tagSlug ? { tags: { some: { tag: { slug: opts.tagSlug } } } } : {}),
    ...(sort === "unanswered" ? { posts: { none: {} } } : {}),
  };

  const [threads, total] = await Promise.all([
    prisma.thread.findMany({
      where,
      select: THREAD_LIST_SELECT,
      orderBy: [...orderFor(sort)],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.thread.count({ where }),
  ]);

  return { threads, total, page, pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}
