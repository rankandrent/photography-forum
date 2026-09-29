import { LeadForm } from "@/components/forms/LeadForm";
import { Faq, FinalCta } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { formInterests, home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us | UIUXDesignServices.us",
  description: "Tell us about your product. A design lead reviews every request and replies within one business day.",
  path: routes.contact,
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: routes.contact }]}
        eyebrow="Contact"
        h1="Let's talk about your product"
        sub="A design lead reviews every request and replies within one business day."
      />
      <FinalCta heading="Send us your project" testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="contact page" submitLabel="Submit" />
      </FinalCta>
      <Faq items={home.faqs.slice(0, 6)} />
    </>
  );
}
