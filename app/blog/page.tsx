import { PostCard } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPosts } from "@/lib/content";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "UI UX Design Insights & Blog",
  description: "Articles on user research, UX design, UI design, design systems, usability testing and AI experience design.",
  path: routes.blog,
  keywords: ["UI UX design blog", "UX design insights", "user research articles", "design systems"],
});

export default function BlogHub() {
  const posts = getPosts();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: routes.blog }]}
        eyebrow="Insights"
        h1="Latest insights on UI UX design"
        sub="Practical writing from the designers and researchers who do the work."
      />
      <section className="section section--light">
        <div className="container">
          {posts.length ? (
            <div className="res__grid">{posts.map((p) => <PostCard key={p.slug} p={p} />)}</div>
          ) : (
            <p className="empty-note">Articles are coming soon.</p>
          )}
        </div>
      </section>
      <JsonLd
        data={collectionLd({
          name: "UI UX design insights",
          description: metadata.description as string,
          path: routes.blog,
          items: posts.map((p) => ({ name: p.title, path: routes.post(p.slug) })),
        })}
      />
    </>
  );
}
