import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { CtaBand, Faq, FinalCta, LinkChips, ServiceGrid } from "@/components/sections/Blocks";
import { FormCard, PageHero } from "@/components/sections/PageHero";
import { Abstract, SemanticSections } from "@/components/sections/SemanticSections";
import { WorkGrid } from "@/components/sections/WorkCards";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { anchorOf, getCaseStudies, getLocation, getLocations, getServices, staticParams } from "@/lib/content";
import { faqLd, pageMetadata, serviceLd, webPageLd } from "@/lib/seo";
import { cap, routes } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", getLocations().map((l) => l.slug));

export async function generateMetadata({ params }: Props) {
  const l = getLocation((await params).slug);
  if (!l) return {};
  return pageMetadata({
    title: l.metaTitle,
    description: l.metaDescription,
    path: routes.location(l.slug),
    noindex: l.draft,
    keywords: l.keywords ?? l.semantic?.ngrams ?? [l.keyword],
  });
}

export default async function LocationPage({ params }: Props) {
  const l = getLocation((await params).slug);
  if (!l) notFound();

  const path = routes.location(l.slug);
  const all = getCaseStudies();
  const cases = [...all.filter((c) => c.featured), ...all.filter((c) => !c.featured)].slice(0, 4);
  const services = getServices().slice(0, 6);
  const faqSection = l.sections?.find((x) => x.format === "faq");
  const bodySections = l.sections?.filter((x) => x !== faqSection);
  const faqs = [...(faqSection?.faqs ?? []), ...(l.faqs ?? [])];
  // same-city pages first (e.g. the 3 New York pages), then one page per other city
  const others = getLocations().filter((x) => x.slug !== l.slug);
  const nearby = [
    ...others.filter((x) => x.title === l.title),
    ...others.filter((x) => x.title !== l.title && others.findIndex((y) => y.title === x.title) === others.indexOf(x)),
  ];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", path: routes.locations }, { name: cap(anchorOf(l)), path }]}
        eyebrow={l.hero.eyebrow ?? l.keyword}
        h1={l.hero.h1}
        sub={l.hero.sub}
        trust
        aside={
          <FormCard title="Get a free consultation" sub={`Free consultation for ${l.city} teams · reply within one business day`}>
            <LeadForm interests={formInterests} source={`location: ${l.slug}`} />
          </FormCard>
        }
      />

      <Abstract text={l.abstract} />

      {!!bodySections?.length && <SemanticSections sections={bodySections} price={l.priceRange} label={`${cap(anchorOf(l))} illustration`} />}

      <ServiceGrid
        id="location-services"
        eyebrow="Services"
        heading={`UI UX design services for ${l.city} teams`}
        services={services}
        allHref={routes.services}
      />

      <CtaBand {...(l.cta ?? home.ctaBand)} />

      <WorkGrid heading="Products we designed" items={cases} />

      <Faq heading={faqSection?.h2 ?? `${cap(anchorOf(l))} FAQs`} intro={faqSection?.answer} items={faqs} />

      <LinkChips
        heading="We also work with teams in"
        tone="warm"
        items={nearby.map((x) => ({ title: cap(anchorOf(x)), href: routes.location(x.slug) }))}
      />

      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source={`location final CTA: ${l.slug}`} submitLabel="Submit" />
      </FinalCta>

      <JsonLd
        data={webPageLd({
          name: l.metaTitle,
          description: l.metaDescription,
          path,
          about: l.centralEntity ?? l.keyword,
          mentions: l.mentions,
          updated: l.updated,
        })}
      />
      <JsonLd
        data={serviceLd(cap(anchorOf(l)), l.metaDescription, path, services.map((s) => cap(anchorOf(s))), undefined, {
          "@type": "City",
          name: l.city,
          containedInPlace: { "@type": "State", name: l.state },
        })}
      />
      {!!faqs.length && <JsonLd data={faqLd(faqs)} />}
    </>
  );
}
