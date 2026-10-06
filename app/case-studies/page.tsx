import { LeadForm } from "@/components/forms/LeadForm";
import { CtaBand, FinalCta } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { WorkCard } from "@/components/sections/WorkCards";
import { WorkFilter } from "@/components/sections/WorkFilter";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { getCaseStudies, getIndustries, getServices } from "@/lib/content";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "UI UX Design Case Studies | Our Work & Results",
  description: "UI UX design case studies with the research, design decisions and measurable outcomes behind products we designed for SaaS, fintech and logistics teams.",
  path: routes.caseStudies,
  keywords: ["UI UX design case studies", "UX case studies", "product design portfolio", "UX design results"],
});

export default function WorkPage() {
  const items = getCaseStudies();
  const used = (key: "industries" | "services") => new Set(items.flatMap((c) => c[key]));
  const industries = getIndustries().filter((i) => used("industries").has(i.slug)).map(({ slug, title }) => ({ slug, title }));
  const services = getServices().filter((s) => used("services").has(s.slug)).map(({ slug, title }) => ({ slug, title }));

  return (
    <>
      <PageHero
        tone="light"
        crumbs={[{ name: "Our work", path: routes.caseStudies }]}
        eyebrow="Our work"
        h1={<>Products we designed, and the <em>results they drove</em></>}
        sub="The research, the design decisions, and the numbers behind each product. Filter by industry or service."
        stats={home.hero.stats}
      />
      <section className="section section--light" style={{ paddingTop: 24 }} aria-label="Case studies">
        <div className="container">
          {items.length ? (
            <WorkFilter industries={industries} services={services} keys={items.map((c) => [...c.industries, ...c.services])}>
              {items.map((c) => <WorkCard key={c.slug} c={c} />)}
            </WorkFilter>
          ) : (
            <p className="empty-note">Case studies are coming soon.</p>
          )}
        </div>
      </section>
      <CtaBand {...home.ctaBand} />
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="work page" submitLabel="Submit" />
      </FinalCta>
      <JsonLd
        data={collectionLd({
          name: "UI UX design case studies",
          description: metadata.description as string,
          path: routes.caseStudies,
          items: items.map((c) => ({ name: c.title, path: routes.caseStudy(c.slug) })),
        })}
      />
    </>
  );
}
