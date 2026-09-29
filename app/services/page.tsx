import { CtaBand, FinalCta, ServiceGrid } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { formInterests, home } from "@/content/home";
import { getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "All UI UX Design Services We Offer | UIUXDesignServices.us",
  description: "Every UI UX design service we offer — user research, UX design, UI design, design systems, usability testing, and more.",
  path: routes.services,
});

export default function ServicesHub() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: routes.services }]}
        eyebrow="Services"
        h1="UI UX design services for every stage of your product"
        sub="From first user interview to engineering handoff. Pick a single service or combine them into one engagement."
        actions={<a href="#cta-form" className="btn">Book a design discovery call</a>}
      />
      <ServiceGrid heading="All UI UX design services" services={getServices()} />
      <CtaBand {...home.ctaBand} />
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="services hub" submitLabel="Submit" />
      </FinalCta>
    </>
  );
}
