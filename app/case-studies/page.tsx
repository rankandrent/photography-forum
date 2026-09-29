import { LeadForm } from "@/components/forms/LeadForm";
import { CaseCard, FinalCta } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { formInterests, home } from "@/content/home";
import { getCaseStudies } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "UI UX Design Case Studies | UIUXDesignServices.us",
  description: "UI UX design case studies with the research, decisions, and measurable outcomes behind each product.",
  path: routes.caseStudies,
});

export default function CaseStudiesHub() {
  const items = getCaseStudies();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Case studies", path: routes.caseStudies }]}
        eyebrow="Our work"
        h1="Design that changed the business"
        sub="The research, the decisions, and the numbers behind each product we designed."
      />
      <section className="section section--light">
        <div className="container">
          {items.length ? (
            <div className="cases__grid">{items.map((c) => <CaseCard key={c.slug} c={c} />)}</div>
          ) : (
            <p className="empty-note">Case studies are coming soon.</p>
          )}
        </div>
      </section>
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="case studies hub" submitLabel="Submit" />
      </FinalCta>
    </>
  );
}
