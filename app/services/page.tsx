import { LeadForm } from "@/components/forms/LeadForm";
import { CtaBand, FinalCta } from "@/components/sections/Blocks";
import { CategoryTabs } from "@/components/sections/CategoryTabs";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { anchorOf, servicesByCategory } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, cap, routes } from "@/lib/site";
import type { ServiceCategory } from "@/lib/types";

export const metadata = pageMetadata({
  title: "UI UX Design Service Catalog | UIUXDesignServices.us",
  description: "Browse every design service we offer, grouped by research and strategy, product design, platforms, dashboards and data, and industry-specific work.",
  path: routes.services,
});

const INTRO: Record<ServiceCategory, string> = {
  "Research & strategy":
    "A design is only as good as the evidence behind it. These services show what users need, where the product loses them, and what to fix first, before a single screen is redesigned.",
  "Product design":
    "Design the product itself: the flows, interactions, interfaces and the design system behind them. Every screen is built to hold up under real, daily use.",
  Platforms:
    "Users meet your product on a specific platform. We design native-feeling iOS and Android apps and complex web applications around each platform's conventions.",
  "Dashboards & data":
    "Dense data only helps when people can read it. These services turn metrics, reports and live data into dashboards and visuals people can act on.",
  "Industry-specific":
    "Some markets need their own playbook. These services are shaped around the business models, users and growth stage of SaaS, e-commerce and startup products.",
};

const idOf = (c: string) => c.toLowerCase().replace(/[^a-z]+/g, "-");

export default function ServicesHub() {
  const groups = servicesByCategory();
  return (
    <>
      <PageHero
        tone="light"
        crumbs={[{ name: "Services", path: routes.services }]}
        eyebrow="Service catalog"
        h1={<>Our design service catalog, <em>grouped by what you need</em></>}
        sub="Pick a single service or combine several into one engagement. Each group below covers one stage or type of product work."
      />
      <CategoryTabs items={groups.map((g) => ({ id: idOf(g.category), label: g.category }))} />
      {groups.map((g) => (
        <ServiceAccordion key={g.category} id={idOf(g.category)} heading={g.category} intro={INTRO[g.category]} services={g.services} />
      ))}
      <CtaBand {...home.ctaBand} />
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="services hub" submitLabel="Submit" />
      </FinalCta>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "UI UX design service catalog",
          itemListElement: groups.flatMap((g) => g.services).map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: cap(anchorOf(s)),
            url: absoluteUrl(routes.service(s.slug)),
          })),
        }}
      />
    </>
  );
}
