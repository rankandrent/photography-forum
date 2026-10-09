import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { Benefits, Clients, CtaBand, Faq, FinalCta, Resources, ServiceGrid } from "@/components/sections/Blocks";
import {
  Capabilities,
  Challenges,
  Compare,
  LeadMagnet,
  Pricing,
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
import { faqLd, howToLd, pageMetadata, serviceLd, webPageLd } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: home.meta.title,
  description: home.meta.description,
  path: "/",
  keywords: ["UI UX design services", "UI UX design agency", "UX design services", "UI design services", "user research", "product design agency"],
});

/** Industry tab artwork: public/images/industries/<slug>.webp (optional per industry) */
const INDUSTRY_IMG = (slug: string) => `/images/industries/${slug}.webp`;

export default function HomePage() {
  const services = getServices();
  const industries = getIndustries()
    .filter((i) => i.intro && i.bullets?.length)
    .slice(0, 6)
    .map((i) => ({
      slug: i.slug,
      title: i.title,
      intro: i.intro!,
      bullets: i.bullets!,
      href: routes.industry(i.slug),
      image: existsSync(join(process.cwd(), "public", INDUSTRY_IMG(i.slug))) ? INDUSTRY_IMG(i.slug) : undefined,
    }));
  const all = getCaseStudies();
  const cases = [...all.filter((c) => c.featured), ...all.filter((c) => !c.featured)].slice(0, 8);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <section className="hero hero--light" aria-labelledby="hero-heading">
        <div className="container hero__stack">
          <div className="hero__split">
            <div>
              <span className="tk-eyebrow hero__eyebrow">{home.hero.eyebrow}</span>
              <h1 id="hero-heading" className="hero__headline">
                {home.hero.h1Before}
                <em>{home.hero.h1Em}</em>
              </h1>
              <p className="hero__subhead">{home.hero.sub}</p>
              <div className="hero__actions">
                <Link href={routes.caseStudies} className="btn btn--dark-outline">See our work</Link>
              </div>
              <StatsRow items={home.hero.stats} />
            </div>
            <aside className="hportrait" aria-label={`Talk to ${home.hero.contact.name}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={home.hero.contact.photo} alt={`${home.hero.contact.name}, ${home.hero.contact.role}`} width={400} height={400} loading="eager" fetchPriority="high" decoding="async" />
              <span className="hportrait__badge"><span className="hportrait__dot" aria-hidden="true" />Available for a call</span>
              <div className="hportrait__info">
                <p className="hportrait__name">{home.hero.contact.name}</p>
                <p className="hportrait__role">{home.hero.contact.role} · {home.hero.contact.note}</p>
                <a href="#cta-form" className="btn hportrait__btn">{home.hero.contact.cta}</a>
              </div>
            </aside>
          </div>
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
      <JsonLd data={webPageLd({ name: home.meta.title, description: home.meta.description, path: "/", about: "UI UX design services" })} />
      <JsonLd data={faqLd(home.faqs)} />
      <JsonLd data={howToLd("UI UX Design Process", home.process.steps)} />
    </>
  );
}
