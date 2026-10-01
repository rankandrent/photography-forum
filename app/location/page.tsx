import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { FinalCta } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { anchorOf, getLocations } from "@/lib/content";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { cap, routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "UX Design Agency Locations | US Cities We Serve",
  description: "UI UX design for product teams across the US: New York, San Francisco, Los Angeles, Chicago, Austin, Boston, Seattle and more. Remote-first, senior-led.",
  path: routes.locations,
  keywords: ["UX design agency locations", "UI UX design agency USA", "UX design agency near me"],
});

export default function LocationsHub() {
  const locations = getLocations();
  const cities = locations.filter((l, i) => locations.findIndex((x) => x.title === l.title) === i);
  return (
    <>
      <PageHero
        tone="light"
        crumbs={[{ name: "Locations", path: routes.locations }]}
        eyebrow="Locations"
        h1={<>UI UX design for product teams <em>across the US</em></>}
        sub="Senior researchers and designers working with teams in every major US tech market, remote-first with on-site workshops when the work needs it."
        stats={home.hero.stats}
      />
      <section className="section section--light" aria-labelledby="loc-h">
        <div className="container">
          <h2 id="loc-h" className="visually-hidden">Cities we serve</h2>
          <div className="loc-grid">
            {cities.map((c) => {
              const pages = locations.filter((l) => l.title === c.title);
              return (
                <div key={c.title} className="loc-card">
                  <p className="loc-card__state">{c.state}</p>
                  <h3 className="loc-card__city">{c.title}</h3>
                  <ul>
                    {pages.map((p) => (
                      <li key={p.slug}><Link href={routes.location(p.slug)}>{cap(anchorOf(p))} <span aria-hidden="true">→</span></Link></li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source="locations hub" submitLabel="Submit" />
      </FinalCta>
      <JsonLd
        data={collectionLd({
          name: "UX design agency locations",
          description: metadata.description as string,
          path: routes.locations,
          items: locations.map((l) => ({ name: cap(anchorOf(l)), path: routes.location(l.slug) })),
        })}
      />
    </>
  );
}
