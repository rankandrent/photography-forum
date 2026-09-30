import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { Benefits, Clients, CtaBand, Faq, FinalCta, Resources, ServiceGrid } from "@/components/sections/Blocks";
import {
  Awards,
  Capabilities,
  Challenges,
  Compare,
  LeadMagnet,
  Pricing,
  Ratings,
  Team,
  Tools,
  WhyUs,
} from "@/components/sections/HomeSections";
import { IndustryTabs } from "@/components/sections/IndustryTabs";
import { StatsRow } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { WorkGrid, WorkRail } from "@/components/sections/WorkCards";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { getCaseStudies, getIndustries, getPosts, getServices } from "@/lib/content";
import { faqLd, howToLd, pageMetadata, serviceLd } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({ title: home.meta.title, description: home.meta.description, path: "/" });

export default function HomePage() {
  const services = getServices();
  const industries = getIndustries()
    .filter((i) => i.intro && i.bullets?.length)
    .slice(0, 6)
    .map((i) => ({ slug: i.slug, title: i.title, intro: i.intro!, bullets: i.bullets!, href: routes.industry(i.slug) }));
  const all = getCaseStudies();
  const cases = [...all.filter((c) => c.featured), ...all.filter((c) => !c.featured)].slice(0, 8);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <section className="hero hero--light" aria-labelledby="hero-heading">
        <div className="container hero__stack">
          <span className="tk-eyebrow hero__eyebrow">{home.hero.eyebrow}</span>
          <h1 id="hero-heading" className="hero__headline">
            {home.hero.h1Before}
            <em>{home.hero.h1Em}</em>
          </h1>
          <p className="hero__subhead">{home.hero.sub}</p>
          <div className="hero__actions">
            <a href="#cta-form" className="btn">Schedule a call</a>
            <Link href={routes.caseStudies} className="btn btn--dark-outline">See our work</Link>
          </div>
          <StatsRow items={home.hero.stats} />
          <WorkRail items={cases} id="home-rail" />
        </div>
      </section>

      <Clients {...home.clients} />
      <Challenges />
      <ServiceGrid
        heading={home.servicesHeading}
        services={services.slice(0, 6)}
        allHref={services.length > 6 ? routes.services : undefined}
      />
      <CtaBand {...home.ctaBand} />
      <Process heading={home.process.heading} steps={home.process.steps} />
      <Benefits heading={home.benefits.heading} items={home.benefits.items} ctaTitle={home.benefits.ctaTitle} />
      <Capabilities />
      <IndustryTabs heading={home.industriesHeading} items={industries} />
      <LeadMagnet />
      <Compare />
      <Pricing />
      <WorkGrid eyebrow="Featured work" items={cases.slice(0, 4)} cols={2} />
      <WhyUs />
      <Team />
      <Tools />
      <Awards />
      <Ratings />
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="home final CTA" submitLabel="Submit" />
      </FinalCta>
      <Faq items={home.faqs} />
      <Resources posts={posts} />

      <JsonLd
        data={serviceLd(
          "UI UX Design Services",
          home.meta.description,
          "/",
          services.map((s) => s.title),
        )}
      />
      <JsonLd data={faqLd(home.faqs)} />
      <JsonLd data={howToLd("UI UX Design Process", home.process.steps)} />
    </>
  );
}
