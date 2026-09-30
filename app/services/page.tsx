import { LeadForm } from "@/components/forms/LeadForm";
import { CtaBand, FinalCta, ServiceGrid } from "@/components/sections/Blocks";
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
  "Research & strategy": "Find out what to build and what to fix before design starts.",
  "Product design": "Design the product itself: flows, interactions, interfaces, and the system behind them.",
  Platforms: "Design for the platform your users are on: iOS, Android, and the web.",
  "Dashboards & data": "Turn dense data into dashboards and visuals people can act on.",
  "Industry-specific": "Design for the business models and users of a specific market.",
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
        actions={
          <>
            {groups.map((g) => (
              <a key={g.category} href={`#${idOf(g.category)}`} className="chip">{g.category}</a>
            ))}
          </>
        }
      />
      {groups.map((g, n) => (
        <ServiceGrid
          key={g.category}
          id={idOf(g.category)}
          eyebrow={`${String(n + 1).padStart(2, "0")} · ${g.services.length} services`}
          intro={INTRO[g.category]}
          heading={g.category}
          services={g.services}
          tone={n % 2 ? "light" : "warm"}
        />
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
