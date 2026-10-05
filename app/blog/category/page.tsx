import Link from "next/link";
import { BlogNav } from "@/components/blog/BlogParts";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogRoutes, categories, postsInCategory } from "@/lib/blog";
import { anchorOf, getPosts, getService } from "@/lib/content";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { cap, routes } from "@/lib/site";

const description = "Every topic on our UI UX design blog: research and strategy, product design, platforms, dashboards and data, and industry-specific design.";

export const metadata = pageMetadata({ title: "Blog Categories: UI UX Design Topics", description, path: blogRoutes.categories, noindex: getPosts().length === 0 });

export default function CategoriesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: routes.blog }, { name: "Categories", path: blogRoutes.categories }]} eyebrow="Blog categories" h1="Browse UI UX design topics" sub="Each category groups the services it covers. Every guide sits under the service it helps you plan." />
      <section className="section section--light">
        <div className="container">
          <BlogNav />
          <div className="catlist">
            {categories.map((c) => (
              <div key={c.slug} className="catlist__item">
                <div className="catlist__head">
                  <h2><Link href={blogRoutes.category(c.slug)}>{c.name}</Link></h2>
                  <span>{postsInCategory(c.slug).length} guides</span>
                </div>
                <div className="chips">
                  {c.services.map(getService).filter((s) => !!s).map((s) => <Link key={s.slug} href={routes.service(s.slug)} className="chip">{cap(anchorOf(s))}</Link>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={collectionLd({ name: "UI UX design blog categories", description, path: blogRoutes.categories, items: categories.map((c) => ({ name: c.name, path: blogRoutes.category(c.slug) })) })} />
    </>
  );
}
