import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  Benefits,
  CardList,
  CtaBand,
  Faq,
  FinalCta,
  LinkChips,
  Resources,
  ServiceGrid,
  Stats,
} from "@/components/sections/Blocks";
import { FormCard, PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { WorkGrid } from "@/components/sections/WorkCards";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import {
  caseStudiesForService,
  getService,
  getServices,
  industriesForService,
  postsForService,
  relatedServices,
  staticParams,
} from "@/lib/content";
import { faqLd, howToLd, pageMetadata, serviceLd } from "@/lib/seo";
import { lower, routes } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", getServices().map((s) => s.slug));

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: routes.service(s.slug), image: `/og/services/${s.slug}.png` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const path = routes.service(s.slug);
  const industries = industriesForService(s);
  const cases = caseStudiesForService(s.slug).slice(0, 3);
  const posts = postsForService(s.slug).slice(0, 3);
  const others = relatedServices(s);
  const h = s.headings ?? {};

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: routes.services }, { name: s.title, path }]}
        eyebrow={s.hero.eyebrow ?? s.title}
        h1={s.hero.h1}
        sub={s.hero.sub}
        aside={
          <FormCard title="Get a free consultation" sub="Free consultation · reply within one business day">
            <LeadForm interests={[s.title, ...formInterests.filter((i) => i !== s.title)]} source={`service: ${s.slug}`} />
          </FormCard>
        }
      />

      {!!s.stats?.length && <Stats heading={h.stats ?? `${s.title} by the numbers`} items={s.stats} />}

      <CardList
        id="challenges"
        eyebrow="The problem"
        heading={h.painPoints ?? `Why ${lower(s.title)} projects go wrong`}
        items={s.painPoints}
      />
      <CardList
        id="what-we-do"
        tone="warm"
        eyebrow="What's included"
        heading={h.subServices ?? `Our ${lower(s.title)} services`}
        items={s.subServices}
      />

      <CtaBand {...home.ctaBand} />

      {!!s.process?.length && <Process heading={h.process ?? `Our ${lower(s.title)} process`} steps={s.process} />}

      <Benefits
        heading={h.benefits ?? `What you get from ${lower(s.title)}`}
        items={s.benefits}
        ctaTitle="Ready to see your design opportunities?"
      />

      <LinkChips
        heading={h.industries ?? `${s.title} for your industry`}
        tone="warm"
        items={industries.map((i) => ({ title: i.title, href: routes.industry(i.slug) }))}
      />

      <WorkGrid heading={h.caseStudies ?? `${s.title} case studies`} items={cases} />

      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={[s.title, ...formInterests]} source={`service final CTA: ${s.slug}`} submitLabel="Submit" />
      </FinalCta>

      <Faq heading={h.faqs ?? `${s.title} FAQs`} items={s.faqs} />

      <Resources heading={h.posts ?? `${s.title} insights`} posts={posts} tone="light" />

      <ServiceGrid id="related-services" eyebrow="Explore more" heading="Related UI UX design services" services={others} allHref={routes.services} />

      <JsonLd data={serviceLd(s.title, s.metaDescription, path, s.subServices?.map((x) => x.title))} />
      {!!s.faqs?.length && <JsonLd data={faqLd(s.faqs)} />}
      {!!s.process?.length && <JsonLd data={howToLd(`${s.title} process`, s.process)} />}
    </>
  );
}
