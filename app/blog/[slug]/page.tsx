import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { CtaBand, FinalCta, Resources } from "@/components/sections/Blocks";
import { WorkGrid } from "@/components/sections/WorkCards";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { anchorOf, getPost, getPosts, staticParams, getService, relatedCaseStudies, relatedPosts } from "@/lib/content";
import { articleLd, pageMetadata } from "@/lib/seo";
import { cap, routes } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", getPosts().map((p) => p.slug));

export async function generateMetadata({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle ?? p.title, description: p.description, path: routes.post(p.slug), type: "article", image: `/og/blog/${p.slug}.png`, published: p.date, keywords: p.tags });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = routes.post(p.slug);
  const services = p.services.map(getService).filter((x) => !!x);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: routes.blog }, { name: p.title, path }]}
        eyebrow={p.type}
        h1={p.title}
        sub={p.description}
        meta={<><span>{p.author}</span><span>{fmt(p.date)}</span></>}
      />
      <section className="section section--light">
        <div className="container">
          <article className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
          {!!services.length && (
            <div className="prose" style={{ marginTop: 48 }}>
              <p><strong>Related services:</strong></p>
              <div className="chips">
                {services.map((s) => <Link key={s.slug} href={routes.service(s.slug)} className="chip">{cap(anchorOf(s))}</Link>)}
              </div>
            </div>
          )}
        </div>
      </section>
      <CtaBand {...home.ctaBand} />
      <Resources heading="Keep reading" posts={relatedPosts(p)} />
      <WorkGrid heading="Related case studies" items={relatedCaseStudies(p)} />
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source={`blog: ${p.slug}`} submitLabel="Submit" />
      </FinalCta>
      <JsonLd data={articleLd({ image: `/og/blog/${p.slug}.png`, title: p.title, description: p.description, path, date: p.date, author: p.author, type: "BlogPosting", keywords: p.tags })} />
    </>
  );
}
