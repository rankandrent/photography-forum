import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { Benefits, CardList, Clients, CtaBand, Faq, FinalCta, Resources, ServiceGrid } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { WorkRail } from "@/components/sections/WorkCards";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { caseStudiesForIndustry, getCaseStudies, getIndustries, getIndustry, getServices, postsForIndustry, servicesForIndustry, staticParams } from "@/lib/content";
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
  const own = caseStudiesForIndustry(i.slug);
  const all = getCaseStudies();
  const cases = own.length ? own : [...all.filter((c) => c.featured), ...all.filter((c) => !c.featured)];
  const posts = postsForIndustry(i.slug).slice(0, 3);
  const h = i.headings ?? {};

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

      <Clients {...home.clients} />

      {i.bullets?.length ? (
        <section className="section section--light" aria-labelledby="focus-heading">
          <div className="container">
            <div className="shead">
              <span className="tk-eyebrow" style={{ display: "block", marginBottom: 20 }}>Our approach</span>
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

      <ServiceGrid
        id="industry-services"
        eyebrow="Services"
        heading={h.services ?? `UI UX design services for ${lower(i.title)}`}
        services={services.length ? services : getServices().slice(0, 6)}
        allHref={routes.services}
        tone="light"
      />

      <CardList id="solutions" tone="warm" eyebrow="What we do" heading={h.solutions ?? `${i.title} design solutions`} items={i.solutions} />

      <CtaBand {...home.ctaBand} />

      <Benefits heading={h.benefits ?? `Why ${lower(i.title)} teams work with us`} items={i.benefits ?? home.whyUs.items} ctaTitle="Ready to see your design opportunities?" />

      <Process heading={h.process ?? `Our ${lower(i.title)} design process`} steps={i.process ?? home.process.steps} />

      <Faq heading={h.faqs ?? `${i.title} UI UX design FAQs`} items={i.faqs} />

      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source={`industry final CTA: ${i.slug}`} submitLabel="Submit" />
      </FinalCta>

      <Resources heading={h.posts ?? `${i.title} design insights`} posts={posts} />

      <JsonLd data={serviceLd(`${i.title} UI UX Design Services`, i.metaDescription, path, services.map((s) => s.title))} />
      {!!i.faqs?.length && <JsonLd data={faqLd(i.faqs)} />}
    </>
  );
}
