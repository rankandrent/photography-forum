import { LeadForm } from "@/components/forms/LeadForm";
import { Faq, FinalCta } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { pageLd, pageMetadata } from "@/lib/seo";
import { addressLine, routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us | Free UI UX Design Consultation",
  description: "Tell us about your product. A design lead reviews every request and replies within one business day.",
  path: routes.contact,
  keywords: ["contact UI UX design agency", "free UI UX design consultation", "hire UX designers"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: routes.contact }]}
        eyebrow="Contact"
        h1="Let's talk about your product"
        sub="A design lead reviews every request and replies within one business day."
        meta={<address className="phero__address">{addressLine}</address>}
      />
      <FinalCta heading="Send us your project" testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="contact page" submitLabel="Submit" />
      </FinalCta>
      <Faq items={home.faqs.slice(0, 6)} />
      <JsonLd data={pageLd("ContactPage", { name: "Contact Us",  description: metadata.description as string, path: routes.contact })} />
    </>
  );
}
