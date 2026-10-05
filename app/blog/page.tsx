import Link from "next/link";
import { AuthorCard, BlogNav, EmptyBlog, PostGrid, PostTile } from "@/components/blog/BlogParts";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { authors, blogRoutes, categories, postsByAuthor, postsInCategory } from "@/lib/blog";
import { getPosts } from "@/lib/content";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

const description = "Guides on user research, UX and UI design, design systems, usability testing and product design, written by the designers who do the work.";

export const metadata = pageMetadata({
  title: "UI UX Design Blog: Guides From Our Design Team",
  description,
  path: routes.blog,
  keywords: ["UI UX design blog", "UX design guides", "user research articles", "product design insights"],
  // an empty listing is thin content: keep it out of the index until the first post ships
  noindex: getPosts().length === 0,
});

export default function BlogHub() {
  const posts = getPosts();
  const [lead, ...rest] = posts;
  const writers = authors.filter((a) => postsByAuthor(a.slug).length);
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: routes.blog }]} eyebrow="Blog" h1="UI UX design guides from our team" sub="Practical guides on research, UX, UI and product design, organised by the service they help you plan." />
      <section className="section section--light blog-list">
        <div className="container">
          <BlogNav />
          {lead ? (
            <>
              <PostTile p={lead} big />
              {!!rest.length && <PostGrid posts={rest} />}
            </>
          ) : (
            <EmptyBlog />
          )}
        </div>
      </section>
      <section className="section section--warm" aria-labelledby="blog-cats">
        <div className="container">
          <div className="res__head">
            <h2 id="blog-cats">Browse by category</h2>
            <Link href={blogRoutes.categories} className="btn--ghost">All categories</Link>
          </div>
          <div className="catgrid">
            {categories.map((c) => (
              <Link key={c.slug} href={blogRoutes.category(c.slug)} className="catcard">
                <span className="catcard__name">{c.name}</span>
                <span className="catcard__count">{postsInCategory(c.slug).length} guides</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {!!writers.length && (
        <section className="section section--light" aria-labelledby="blog-authors">
          <div className="container">
            <div className="res__head">
              <h2 id="blog-authors">Written by</h2>
              <Link href={blogRoutes.authors} className="btn--ghost">All authors</Link>
            </div>
            <div className="agrid">{writers.map((a) => <AuthorCard key={a.slug} a={a} count={postsByAuthor(a.slug).length} compact />)}</div>
          </div>
        </section>
      )}
      <JsonLd data={collectionLd({ name: "UI UX design blog", description, path: routes.blog, items: posts.map((p) => ({ name: p.title, path: routes.post(p.slug) })) })} />
    </>
  );
}
