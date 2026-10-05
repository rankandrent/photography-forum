import { notFound } from "next/navigation";
import { AuthorCard, BlogNav, EmptyBlog, PostGrid } from "@/components/blog/BlogParts";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { authors, blogRoutes, getAuthor, postsByAuthor, postsContributedBy } from "@/lib/blog";
import { staticParams } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SITE, absoluteUrl, routes } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", authors.map((a) => a.slug));

export async function generateMetadata({ params }: Props) {
  const a = getAuthor((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: `${a.name}, ${a.role} | Author`,
    description: `${a.bio} Read ${a.person ? `${a.name.split(" ")[0]}'s` : "the team's"} guides on UI UX design, research and product design.`.slice(0, 158),
    path: blogRoutes.author(a.slug),
    image: "/og/home.png",
    noindex: postsByAuthor(a.slug).length + postsContributedBy(a.slug).length === 0,
  });
}

export default async function AuthorPage({ params }: Props) {
  const a = getAuthor((await params).slug);
  if (!a) notFound();
  const posts = postsByAuthor(a.slug);
  const helped = postsContributedBy(a.slug);
  const path = blogRoutes.author(a.slug);
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: routes.blog }, { name: "Authors", path: blogRoutes.authors }, { name: a.name, path }]} eyebrow="Author" h1={a.name} sub={a.role} />
      <section className="section section--light">
        <div className="container">
          <BlogNav active="authors" />
          <AuthorCard a={a} count={posts.length} />
          <h2 className="author__posts">Guides by {a.person ? a.name.split(" ")[0] : "our team"}</h2>
          {posts.length ? <PostGrid posts={posts} /> : !helped.length && <EmptyBlog text={`${a.person ? a.name.split(" ")[0] + "'s" : "Our"} first guides are on their way.`} />}
          {!posts.length && !!helped.length && <p className="author__none">No solo guides yet.</p>}
          {!!helped.length && (
            <>
              <h2 className="author__posts">Collaborated on</h2>
              <PostGrid posts={helped} />
            </>
          )}
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: absoluteUrl(path),
          mainEntity: a.person
            ? { "@type": "Person", name: a.name, jobTitle: a.role, ...(a.photo && { image: absoluteUrl(a.photo) }), ...(a.linkedin && { sameAs: [a.linkedin] }), ...(a.expertise.length && { knowsAbout: a.expertise }), worksFor: { "@id": `${SITE.url}/#organization` } }
            : { "@id": `${SITE.url}/#organization` },
        }}
      />
    </>
  );
}
