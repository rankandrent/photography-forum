import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { FinalCta } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { formInterests, home } from "@/content/home";
import { JsonLd } from "@/components/ui/JsonLd";
import { anchorOf, getIndustries } from "@/lib/content";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "UI UX Design by Industry | Healthcare, Fintech & SaaS",
  description: "UI UX design by industry: healthcare, fintech, SaaS, e-commerce, supply chain and startup products, backed by real case studies and measurable results.",
  path: routes.industries,
  keywords: ["UI UX design by industry", "healthcare UI UX design", "fintech UI UX design", "SaaS UI UX design", "e-commerce UI UX design", "supply chain UI UX design"],
});

export default function IndustriesHub() {
  const industries = getIndustries();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: routes.industries }]}
        eyebrow="Industries"
        h1="UI UX design services for your industry"
        sub="Every industry has users, constraints and regulations of its own. We design for the environment your product actually runs in."
      />
      <section className="section section--warm" aria-labelledby="ind-list-heading">
        <div className="container">
          <h2 id="ind-list-heading" className="cat__headline">Industries we serve</h2>
          <div className="cat__grid">
            {industries.map((i, n) => (
              <Link key={i.slug} href={routes.industry(i.slug)} className="cat-card">
                <span className="cat-card__num">{String(n + 1).padStart(2, "0")}</span>
                <h3 className="cat-card__title">{i.title}</h3>
                <p className="cat-card__body">{i.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="industries hub" submitLabel="Submit" />
      </FinalCta>
      <JsonLd
        data={collectionLd({
          name: "UI UX design by industry",
          description: metadata.description as string,
          path: routes.industries,
          items: industries.map((i) => ({ name: anchorOf(i), path: routes.industry(i.slug) })),
        })}
      />
    </>
  );
}
