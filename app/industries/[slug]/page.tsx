import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { Benefits, CardList, CaseGrid, CtaBand, Faq, FinalCta, Resources, ServiceGrid, Stats } from "@/components/sections/Blocks";
import { FormCard, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { caseStudiesForIndustry, getIndustries, getIndustry, postsForIndustry, servicesForIndustry, staticParams } from "@/lib/content";
import { faqLd, pageMetadata, serviceLd } from "@/lib/seo";
import { lower, routes } from "@/lib/site";

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
  const cases = caseStudiesForIndustry(i.slug).slice(0, 3);
  const posts = postsForIndustry(i.slug).slice(0, 3);
  const h = i.headings ?? {};

  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: routes.industries }, { name: i.title, path }]}
        eyebrow={i.hero.eyebrow ?? `${i.title} UI UX design`}
        h1={i.hero.h1}
        sub={i.hero.sub}
        aside={
          <FormCard title={`Discuss your ${lower(i.title)} product`} sub="Free consultation · reply within one business day">
            <LeadForm interests={formInterests} source={`industry: ${i.slug}`} />
          </FormCard>
        }
      />

      {!!i.stats?.length && <Stats heading={h.stats ?? `${i.title} design by the numbers`} items={i.stats} />}

      {i.bullets?.length ? (
        <section className="section section--light" aria-labelledby="focus-heading">
          <div className="container">
            <div className="shead">
              <h2 id="focus-heading">How we design for {lower(i.title)}</h2>
              {i.intro && <p>{i.intro}</p>}
            </div>
            <ul className="ind__bullets" style={{ maxWidth: 820 }}>
              {i.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </section>
      ) : null}

      <CardList id="challenges" tone="warm" eyebrow="The problem" heading={h.challenges ?? `${i.title} UX challenges we solve`} items={i.challenges} />
      <CardList id="solutions" eyebrow="What we do" heading={h.solutions ?? `${i.title} design solutions`} items={i.solutions} />

      <CtaBand {...home.ctaBand} />

      <ServiceGrid
        id="industry-services"
        eyebrow="Services"
        heading={h.services ?? `UI UX design services for ${lower(i.title)}`}
        services={services}
        allHref={routes.services}
      />

      <Benefits heading={h.benefits ?? `Why ${lower(i.title)} teams work with us`} items={i.benefits} ctaTitle="Ready to see your design opportunities?" />

      <CaseGrid heading={h.caseStudies ?? `${i.title} case studies`} items={cases} />

      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source={`industry final CTA: ${i.slug}`} submitLabel="Submit" />
      </FinalCta>

      <Faq heading={h.faqs ?? `${i.title} UI UX design FAQs`} items={i.faqs} />
      <Resources heading={h.posts ?? `${i.title} design insights`} posts={posts} />

      <JsonLd data={serviceLd(`${i.title} UI UX Design Services`, i.metaDescription, path, services.map((s) => s.title))} />
      {!!i.faqs?.length && <JsonLd data={faqLd(i.faqs)} />}
    </>
  );
}
