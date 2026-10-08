import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogNav, EmptyBlog, PostGrid } from "@/components/blog/BlogParts";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogRoutes, categories, getCategory, postsInCategory } from "@/lib/blog";
import { anchorOf, getService, staticParams } from "@/lib/content";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { cap, routes } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", categories.map((c) => c.slug));

const describe = (name: string, services: string[]) =>
  `${name} guides from our design team on ${services.map(getService).filter((s) => !!s).map((s) => anchorOf(s!)).slice(0, 4).join(", ")} and more.`;

export async function generateMetadata({ params }: Props) {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.name} guides | UI UX Design Blog`, description: describe(c.name, c.services).slice(0, 158), path: blogRoutes.category(c.slug), noindex: postsInCategory(c.slug).length === 0 });
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const posts = postsInCategory(c.slug);
  const path = blogRoutes.category(c.slug);
  // group by silo: each service (pillar) with the guides that support it
  const silos = c.services.map(getService).filter((s) => !!s).map((s) => ({ s, posts: posts.filter((p) => p.services[0] === s.slug) }));
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: routes.blog }, { name: "Categories", path: blogRoutes.categories }, { name: c.name, path }]} eyebrow="Blog category" h1={`${c.name} guides`} sub={describe(c.name, c.services)} />
      <section className="section section--light">
        <div className="container">
          <BlogNav active={c.slug} />
          {posts.length ? (
            silos.filter((x) => x.posts.length).map(({ s, posts: list }) => (
              <div key={s.slug} className="silo">
                <div className="silo__head">
                  <h2><Link href={routes.service(s.slug)}>{cap(anchorOf(s))}</Link></h2>
                  <span className="silo__count">{list.length} {list.length === 1 ? "guide" : "guides"}</span>
                </div>
                <PostGrid posts={list} />
              </div>
            ))
          ) : (
            <EmptyBlog text={`The first ${c.name.toLowerCase()} guides are on their way.`} />
          )}
          <div className="silo__services">
            <p>Services in this category</p>
            <div className="chips">{silos.map(({ s }) => <Link key={s.slug} href={routes.service(s.slug)} className="chip">{cap(anchorOf(s))}</Link>)}</div>
          </div>
        </div>
      </section>
      <JsonLd data={collectionLd({ name: `${c.name} guides`, description: describe(c.name, c.services), path, items: posts.map((p) => ({ name: p.title, path: routes.post(p.slug) })) })} />
    </>
  );
}
