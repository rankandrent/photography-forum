import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { Benefits, CardList, Clients, CtaBand, Faq, FinalCta, Resources, ServiceGrid } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Abstract, SemanticSections } from "@/components/sections/SemanticSections";
import { WorkRail } from "@/components/sections/WorkCards";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { anchorOf, caseStudiesForIndustry, getCaseStudies, getIndustries, getIndustry, getServices, postsForIndustry, servicesForIndustry, staticParams } from "@/lib/content";
import { faqLd, pageMetadata, serviceLd, webPageLd } from "@/lib/seo";
import { lower, routes } from "@/lib/site";
import { DEFAULT_BLOCKS } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", getIndustries().map((i) => i.slug));

export async function generateMetadata({ params }: Props) {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return pageMetadata({ title: i.metaTitle, description: i.metaDescription, path: routes.industry(i.slug), image: `/og/industries/${i.slug}.png` });
}

export default async function IndustryPage({ params }: Props) {
  const i = getIndustry((await params).slug);
  if (!i) notFound();

  const path = routes.industry(i.slug);
  const services = servicesForIndustry(i);
  const own = caseStudiesForIndustry(i.slug);
  const all = getCaseStudies();
  const cases = own.length ? own : [...all.filter((c) => c.featured), ...all.filter((c) => !c.featured)];
  const posts = postsForIndustry(i.slug).slice(0, 3);
  const h = i.headings ?? {};
  const b = { ...DEFAULT_BLOCKS, ...i.blocks };

  return (
    <>
      <PageHero
        tone="light"
        crumbs={[{ name: "Industries", path: routes.industries }, { name: i.title, path }]}
        eyebrow={i.hero.eyebrow ?? `${i.title} UI UX design`}
        h1={i.hero.h1}
        sub={i.hero.sub}
        stats={i.stats}
        actions={
          <>
            <a href="#cta-form" className="btn">Schedule a call</a>
            <a href="#industry-services" className="btn btn--dark-outline">Our {lower(i.title)} services</a>
          </>
        }
      >
        <WorkRail items={cases.slice(0, 8)} id="industry-rail" label={`${i.title} case studies`} />
      </PageHero>

      {b.clients && <Clients {...home.clients} />}

      <Abstract text={i.abstract} />

      {i.sections?.length ? (
        <SemanticSections sections={i.sections} />
      ) : (
        <>
          {i.bullets?.length ? (
            <section className="section section--light" aria-labelledby="focus-heading">
              <div className="container">
                <div className="shead">
                  <span className="tk-eyebrow" style={{ display: "block", marginBottom: 20 }}>Our approach</span>
                  <h2 id="focus-heading">How we design for {lower(i.title)}</h2>
                  {i.intro && <p>{i.intro}</p>}
                </div>
                <ul className="ind__bullets" style={{ maxWidth: 820 }}>
                  {i.bullets.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </section>
          ) : null}
          <CardList id="challenges" tone="warm" eyebrow="The problem" heading={h.challenges ?? `${i.title} UX challenges we solve`} items={i.challenges} />
        </>
      )}

      <ServiceGrid
        id="industry-services"
        eyebrow="Services"
        heading={h.services ?? `UI UX design services for ${lower(i.title)}`}
        services={services.length ? services : getServices().slice(0, 6)}
        allHref={routes.services}
        tone="light"
      />

      {!i.sections?.length && (
        <CardList id="solutions" tone="warm" eyebrow="What we do" heading={h.solutions ?? `${i.title} design solutions`} items={i.solutions} />
      )}

      {b.ctaBand && <CtaBand {...(i.cta ?? home.ctaBand)} />}

      <Benefits
        heading={h.benefits ?? `Why ${lower(i.title)} teams work with us`}
        items={i.benefits ?? (i.useDefaults ? home.whyUs.items : undefined)}
        ctaTitle="Ready to see your design opportunities?"
      />

      {(i.process ?? (i.useDefaults ? home.process.steps : undefined)) && (
        <Process heading={h.process ?? `Our ${lower(i.title)} design process`} steps={(i.process ?? home.process.steps)} />
      )}

      <Faq heading={h.faqs ?? `${i.title} UI UX design FAQs`} items={i.faqs} />

      <FinalCta testimonial={b.testimonial ? home.testimonial : undefined}>
        <LeadForm variant="full" interests={formInterests} source={`industry final CTA: ${i.slug}`} submitLabel="Submit" />
      </FinalCta>

      {b.posts && <Resources heading={h.posts ?? `${i.title} design insights`} posts={posts} />}

      <JsonLd
        data={webPageLd({
          name: i.metaTitle,
          description: i.metaDescription,
          path,
          about: i.centralEntity ?? anchorOf(i),
          mentions: i.mentions ?? i.sections?.map((x) => x.h2),
          updated: i.updated,
        })}
      />
      <JsonLd data={serviceLd(`${i.title} UI UX Design Services`, i.metaDescription, path, services.map((s) => anchorOf(s)))} />
      {!!i.faqs?.length && <JsonLd data={faqLd(i.faqs)} />}
    </>
  );
}
