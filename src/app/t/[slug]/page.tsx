import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { currentUser, isStaff } from "@/lib/session";
import { PHOTO_SELECT, toPhotoView } from "@/lib/photo-view";
import { toPlainText } from "@/lib/markdown";
import { timeAgo, compact } from "@/lib/format";
import { urlFor } from "@/lib/storage";
import { absoluteUrl, site } from "@/lib/site";
import { absoluteImageUrl, missingPageMetadata } from "@/lib/seo";
import { Avatar } from "@/components/Avatar";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ExifStrip } from "@/components/ExifStrip";
import { CritiquePanel } from "@/components/CritiquePanel";
import { ReplyForm } from "@/components/ReplyForm";
import { ReplyToggle } from "@/components/ReplyToggle";
import { VoteButtons } from "@/components/VoteButtons";
import { ModActions } from "@/components/ModActions";
import { PostActions } from "@/components/PostActions";
import { JsonLd } from "@/components/JsonLd";
import { RelatedThreads } from "@/components/RelatedThreads";
import { ForumSidebar } from "@/components/ForumSidebar";
import { relatedThreads, sidebarData } from "@/lib/discovery";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const thread = await prisma.thread.findUnique({
    where: { slug },
    select: {
      title: true,
      body: true,
      createdAt: true,
      updatedAt: true,
      author: { select: { name: true, username: true } },
      photos: { select: { displayKey: true }, take: 1 },
    },
  });
  if (!thread) return missingPageMetadata("Thread not found");

  const description = toPlainText(thread.body, 155);
  const image = thread.photos[0] ? urlFor(thread.photos[0].displayKey) : `/og?title=${encodeURIComponent(thread.title)}`;

  return {
    title: thread.title,
    description,
    alternates: { canonical: `/t/${slug}` },
    openGraph: {
      type: "article",
      title: thread.title,
      description,
      url: `/t/${slug}`,
      publishedTime: thread.createdAt.toISOString(),
      modifiedTime: thread.updatedAt.toISOString(),
      authors: [thread.author.name ?? thread.author.username],
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title: thread.title, description, images: [image] },
  };
}

export default async function ThreadPage({ params }: Props) {
  const { slug } = await params;
  const user = await currentUser();

  // The select is inline rather than shared: Prisma infers the result type from
  // the literal, and a helper that returns it would widen `true` to `boolean`.
  const thread = await prisma.thread.findUnique({
    where: { slug },
    select: {
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
      updatedAt: true,
      authorId: true,
      categoryId: true,
      topic: true,
      isSimulated: true,
      author: {
        select: { id: true, username: true, name: true, image: true, bio: true, createdAt: true },
      },
      category: { select: { slug: true, name: true, color: true } },
      tags: { select: { tag: { select: { slug: true, name: true } } } },
      photos: {
        where: { postId: null },
        select: {
          ...PHOTO_SELECT,
          uploaderId: true,
          critiques: {
            select: {
              id: true,
              composition: true,
              lighting: true,
              editing: true,
              comment: true,
              author: { select: { username: true, name: true, image: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      votes: user ? { where: { userId: user.id }, select: { value: true } } : false,
      posts: {
        select: {
          id: true,
          body: true,
          score: true,
          isAnswer: true,
          parentId: true,
          createdAt: true,
          editedAt: true,
          authorId: true,
          isSimulated: true,
          aiAgent: true,
          author: { select: { id: true, username: true, name: true, image: true } },
          photos: { select: PHOTO_SELECT },
          votes: user ? { where: { userId: user.id }, select: { value: true } } : false,
        },
        orderBy: [{ isAnswer: "desc" }, { createdAt: "asc" }],
      },
    },
  });
  if (!thread) notFound();

  // View counting is a write, so it must not block the render or be awaited in
  // a way that makes the page dynamic-uncacheable per user.
  void prisma.thread
    .update({ where: { id: thread.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => undefined);

  // Both are independent of the thread body, so they ride along with it rather
  // than adding a second round of waiting.
  const [related, sidebar] = await Promise.all([
    relatedThreads(
      thread.id,
      thread.categoryId,
      thread.tags.map((t) => t.tag.slug),
    ),
    sidebarData(),
  ]);

  const staff = isStaff(user);
  const myThreadVote = Array.isArray(thread.votes) ? (thread.votes[0]?.value ?? 0) : 0;
  const topLevel = thread.posts.filter((p) => !p.parentId);

  // Recursively collect all descendant replies belonging to a parent post branch
  const getAllDescendants = (parentId: string): typeof thread.posts => {
    const direct = thread.posts.filter((p) => p.parentId === parentId);
    let all = [...direct];
    for (const child of direct) {
      all = all.concat(getAllDescendants(child.id));
    }
    return all;
  };

  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: thread.category.name, url: absoluteUrl(`/c/${thread.category.slug}`) },
    { name: thread.title, url: absoluteUrl(`/t/${thread.slug}`) },
  ];

  const threadUrl = absoluteUrl(`/t/${thread.slug}`);
  const personFor = (author: { name: string | null; username: string }) => ({
    "@type": "Person" as const,
    name: author.name ?? author.username,
    url: absoluteUrl(`/u/${author.username}`),
  });

  /**
   * A thread whose author accepted an answer is a solved question, and Google
   * has a dedicated rich result for exactly that — answer count and vote count
   * shown in the SERP. `DiscussionForumPosting` gets none of it, so describe the
   * solved ones as `QAPage` and leave the rest as discussions.
   */
  const accepted = topLevel.find((p) => p.isAnswer);

  /**
   * The same four facts the byline shows a reader — author, when it was posted,
   * views, replies — stated in a form a crawler can read. Views in particular
   * had no representation in the markup at all: they are the one signal here
   * that says how much attention a thread actually gets.
   *
   * Counts mirror the byline exactly (`thread.posts.length`, all replies), so
   * the page and its structured data can never disagree.
   */
  const interactionStatistic = [
    {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ViewAction",
      userInteractionCount: thread.viewCount,
    },
    {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/CommentAction",
      userInteractionCount: thread.posts.length,
    },
    {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/LikeAction",
      userInteractionCount: Math.max(0, thread.score),
    },
  ];

  const answerFor = (post: (typeof topLevel)[number]) => ({
    "@type": "Answer" as const,
    text: toPlainText(post.body, 500),
    url: `${threadUrl}#post-${post.id}`,
    upvoteCount: Math.max(0, post.score),
    datePublished: post.createdAt.toISOString(),
    author: personFor(post.author),
  });

  const threadSchema = accepted
    ? {
        "@context": "https://schema.org",
        "@type": "QAPage",
        mainEntity: {
          "@type": "Question",
          name: thread.title,
          text: toPlainText(thread.body, 1000),
          // `answerCount` stays top-level only — a reply to an answer is a
          // comment on it, not another answer. The byline's total reply count
          // is carried by `interactionStatistic` below instead.
          answerCount: topLevel.length,
          upvoteCount: Math.max(0, thread.score),
          datePublished: thread.createdAt.toISOString(),
          dateModified: thread.updatedAt.toISOString(),
          url: threadUrl,
          author: personFor(thread.author),
          interactionStatistic,
          acceptedAnswer: answerFor(accepted),
          ...(topLevel.length > 1
            ? { suggestedAnswer: topLevel.filter((p) => !p.isAnswer).slice(0, 20).map(answerFor) }
            : {}),
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "DiscussionForumPosting",
        headline: thread.title,
        articleBody: toPlainText(thread.body, 1000),
        url: threadUrl,
        datePublished: thread.createdAt.toISOString(),
        dateModified: thread.updatedAt.toISOString(),
        author: personFor(thread.author),
        publisher: { "@type": "Organization", name: site.name },
        // Photographs are the substance of most threads here; naming them lets
        // the pages surface in image search rather than only in web results.
        ...(thread.photos.length > 0
          ? { image: thread.photos.map((p) => absoluteImageUrl(p.displayKey)) }
          : {}),
        interactionStatistic,
        comment: thread.posts.slice(0, 100).map((p) => ({
          "@type": "Comment",
          text: toPlainText(p.body, 1000),
          datePublished: p.createdAt.toISOString(),
          upvoteCount: Math.max(0, p.score),
          author: personFor(p.author),
        })),
      };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/c/${thread.category.slug}`} className="hover:underline">
              {thread.category.name}
            </Link>
          </li>
        </ol>
      </nav>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex gap-4">
          <VoteButtons
            target="thread"
            targetId={thread.id}
            score={thread.score}
            myVote={myThreadVote}
            signedIn={Boolean(user)}
          />

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100">
              {thread.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
              <Link href={`/u/${thread.author.username}`} className="flex items-center gap-2 hover:underline">
                <Avatar user={thread.author} size={30} />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {thread.author.name ?? thread.author.username}
                </span>
              </Link>
              <time dateTime={thread.createdAt.toISOString()}>{timeAgo(thread.createdAt)}</time>
              {thread.updatedAt.getTime() - thread.createdAt.getTime() > 300000 && (
                <span className="text-slate-400 dark:text-slate-500">(active {timeAgo(thread.updatedAt)})</span>
              )}
              <span>{compact(thread.viewCount)} views</span>
              <span>{thread.posts.length} replies</span>
              {thread.locked && <span className="text-amber-600">🔒 Locked</span>}
            </div>

            {thread.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {thread.tags.map(({ tag }) => (
                  <li key={tag.slug}>
                    <Link
                      href={`/tag/${tag.slug}`}
                      className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    >
                      #{tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <MarkdownContent source={thread.body} className="mt-4" />

            {thread.photos.length > 0 && (
              <div className="mt-5 space-y-5">
                <PhotoGallery photos={thread.photos.map(toPhotoView)} context={thread.title} />
                {thread.photos.map((photo) => {
                  const view = toPhotoView(photo);
                  return (
                    <section key={photo.id} className="rounded-xl border border-slate-200 dark:border-slate-700">
                      <ExifStrip photo={view} />
                      {thread.kind === "CRITIQUE" && (
                        <CritiquePanel
                          photoId={photo.id}
                          critiques={photo.critiques}
                          canCritique={Boolean(user) && user?.id !== photo.uploaderId}
                          signedIn={Boolean(user)}
                        />
                      )}
                    </section>
                  );
                })}
              </div>
            )}

            <div className="mt-5 border-t border-slate-100 pt-3 dark:border-slate-800">
              <ModActions
                threadId={thread.id}
                pinned={thread.pinned}
                locked={thread.locked}
                canDelete={user?.id === thread.authorId || staff}
                isStaff={staff}
              />
            </div>
          </div>
        </div>
      </article>

      <section className="mt-8" aria-labelledby="replies-heading">
        <h2 id="replies-heading" className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {thread.posts.length} {thread.posts.length === 1 ? "reply" : "replies"}
        </h2>

        <ul className="space-y-4">
          {topLevel.map((post) => {
            const myVote = Array.isArray(post.votes) ? (post.votes[0]?.value ?? 0) : 0;
            const children = getAllDescendants(post.id);
            return (
              <li
                key={post.id}
                id={`post-${post.id}`}
                className={`rounded-2xl border bg-white p-4 dark:bg-slate-900 ${
                  post.isAnswer
                    ? "border-emerald-400 dark:border-emerald-600"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                {post.isAnswer && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                    ✓ Accepted answer
                  </p>
                )}
                <div className="flex gap-4">
                  <VoteButtons
                    target="post"
                    targetId={post.id}
                    score={post.score}
                    myVote={myVote}
                    signedIn={Boolean(user)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Link href={`/u/${post.author.username}`} className="flex items-center gap-2 hover:underline">
                        <Avatar user={post.author} size={30} />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {post.author.name ?? post.author.username}
                        </span>
                      </Link>
                      <time dateTime={post.createdAt.toISOString()} className="text-xs text-slate-400">
                        {timeAgo(post.createdAt)}
                      </time>
                      {post.editedAt && <span className="text-xs text-slate-400">(edited)</span>}
                    </div>

                    <MarkdownContent source={post.body} className="mt-2" />

                    {post.photos.length > 0 && (
                      <div className="mt-3">
                        <PhotoGallery photos={post.photos.map(toPhotoView)} context={`Reply to “${thread.title}”`} />
                      </div>
                    )}

                    <PostActions
                      postId={post.id}
                      body={post.body}
                      isAnswer={post.isAnswer}
                      canEdit={user?.id === post.authorId || staff}
                      canAcceptAnswer={user?.id === thread.authorId || staff}
                      signedIn={Boolean(user)}
                    />

                    <div className="mt-2">
                      <ReplyToggle
                        threadId={thread.id}
                        parentId={post.id}
                        signedIn={Boolean(user)}
                        locked={thread.locked}
                      />
                    </div>

                    {children.length > 0 && (
                      <ul className="mt-4 space-y-3 border-l-2 border-slate-100 pl-4 dark:border-slate-800">
                        {children.map((child) => (
                          <li key={child.id} id={`post-${child.id}`}>
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <Link href={`/u/${child.author.username}`} className="flex items-center gap-2 hover:underline">
                                <Avatar user={child.author} size={26} />
                                <span className="font-medium text-slate-800 dark:text-slate-200">
                                  {child.author.name ?? child.author.username}
                                </span>
                              </Link>
                              <time dateTime={child.createdAt.toISOString()} className="text-xs text-slate-400">
                                {timeAgo(child.createdAt)}
                              </time>
                            </div>
                            <MarkdownContent source={child.body} className="mt-1" />
                            {child.photos.length > 0 && (
                              <div className="mt-2">
                                <PhotoGallery photos={child.photos.map(toPhotoView)} context={`Reply to “${thread.title}”`} />
                              </div>
                            )}
                            <PostActions
                              postId={child.id}
                              body={child.body}
                              isAnswer={child.isAnswer}
                              canEdit={user?.id === child.authorId || staff}
                              canAcceptAnswer={false}
                              signedIn={Boolean(user)}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Your reply</h3>
          <ReplyForm threadId={thread.id} signedIn={Boolean(user)} locked={thread.locked} />
        </div>
      </section>

      <RelatedThreads threads={related} />
      </div>

      <ForumSidebar data={sidebar} />

      <JsonLd data={threadSchema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            item: b.url,
          })),
        }}
      />
    </div>
  );
}
