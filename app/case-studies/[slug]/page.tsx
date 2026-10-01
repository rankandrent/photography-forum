import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { FinalCta, Resources } from "@/components/sections/Blocks";
import { WorkGrid } from "@/components/sections/WorkCards";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { anchorOf, getCaseStudies, getCaseStudy, getIndustry, staticParams, getService, relatedCaseStudies, relatedPosts } from "@/lib/content";
import { articleLd, pageMetadata } from "@/lib/seo";
import { cap, routes } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", getCaseStudies().map((c) => c.slug));

export async function generateMetadata({ params }: Props) {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle ?? (c.title.length <= 48 ? `${c.title} | Case Study` : c.title), description: c.description, path: routes.caseStudy(c.slug), type: "article", image: `/og/case-studies/${c.slug}.png`, published: c.date, keywords: [`${c.client ?? c.title} case study`, ...c.tags, "UI UX design case study"] });
}

export default async function CaseStudyPage({ params }: Props) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const path = routes.caseStudy(c.slug);
  const services = c.services.map(getService).filter((x) => !!x);
  const industries = c.industries.map(getIndustry).filter((x) => !!x);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Case studies", path: routes.caseStudies }, { name: c.client ?? c.title, path }]}
        eyebrow={c.client ? `Case study · ${c.client}` : "Case study"}
        h1={c.title}
        sub={c.description}
        meta={
          <>
            {services.map((s) => <Link key={s.slug} href={routes.service(s.slug)} className="chip" style={{ color: "#fff", borderColor: "var(--border-d)" }}>{cap(anchorOf(s))}</Link>)}
            {industries.map((i) => <Link key={i.slug} href={routes.industry(i.slug)} className="chip" style={{ color: "#fff", borderColor: "var(--border-d)" }}>{anchorOf(i)}</Link>)}
          </>
        }
      />

      {c.image && (
        <section className="cs-cover" aria-label="Project cover">
          <div className="container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt={`${c.client ?? c.title} project cover`} fetchPriority="high" />
          </div>
        </section>
      )}

      {!!c.results.length && (
        <section className="section section--light" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="results">
              {c.results.map((r) => (
                <div key={r.label} className="results__item">
                  <div className="results__value">{r.value}</div>
                  <div className="results__label">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--light">
        <div className="container">
          <article className="prose" dangerouslySetInnerHTML={{ __html: c.html }} />
          {c.quote && (
            <div className="prose">
              <blockquote>
                &ldquo;{c.quote}&rdquo;{c.quoteAuthor && <><br />— {c.quoteAuthor}</>}
              </blockquote>
            </div>
          )}
        </div>
      </section>

      <WorkGrid heading="More case studies" items={relatedCaseStudies(c)} tone="warm" />
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source={`case study: ${c.slug}`} submitLabel="Submit" />
      </FinalCta>
      <Resources heading="Related insights" posts={relatedPosts(c)} />

      <JsonLd data={articleLd({ image: `/og/case-studies/${c.slug}.png`, title: c.title, description: c.description, path, date: c.date, author: "Design Team", keywords: c.tags })} />
    </>
  );
}
