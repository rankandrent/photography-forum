import { AuthorCard, BlogNav } from "@/components/blog/BlogParts";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { authors, blogRoutes, postsByAuthor } from "@/lib/blog";
import { getPosts } from "@/lib/content";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

const description = "Meet the UX researchers, product designers and design leads who write our UI UX design blog, with their roles, LinkedIn profiles and the guides they wrote.";

export const metadata = pageMetadata({ title: "Blog Authors: Our UX and Product Designers", description, path: blogRoutes.authors, noindex: getPosts().length === 0 });

export default function AuthorsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: routes.blog }, { name: "Authors", path: blogRoutes.authors }]} eyebrow="Authors" h1="The designers behind our guides" sub="Every guide is written or reviewed by a practising member of our design team." />
      <section className="section section--light">
        <div className="container">
          <BlogNav active="authors" />
          <div className="agrid agrid--full">{authors.map((a) => <AuthorCard key={a.slug} a={a} count={postsByAuthor(a.slug).length} />)}</div>
        </div>
      </section>
      <JsonLd data={collectionLd({ name: "UI UX design blog authors", description, path: blogRoutes.authors, items: authors.map((a) => ({ name: a.name, path: blogRoutes.author(a.slug) })) })} />
    </>
  );
}
