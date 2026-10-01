import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { anchorOf, getIndustries, servicesByCategory } from "@/lib/content";
import { SITE, addressLine, cap, routes } from "@/lib/site";

export function Footer() {
  // Two lead services per topical category keeps the footer short but covers every cluster
  const services = servicesByCategory().flatMap((g) => g.services.slice(0, 2));
  const industries = getIndustries().slice(0, 6);
  const cols = [
    {
      title: "Services",
      links: [...services.map((s) => ({ label: cap(anchorOf(s)), href: routes.service(s.slug) })), { label: "All services", href: routes.services }],
    },
    {
      title: "Industries",
      links: [...industries.map((i) => ({ label: anchorOf(i), href: routes.industry(i.slug) })), { label: "All industries", href: routes.industries }],
    },
    {
      title: "Company",
      links: [
        { label: "Our work", href: routes.caseStudies },
        { label: "Locations", href: routes.locations },
        { label: "About", href: "/about/" },
        { label: "Contact", href: routes.contact },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Insights", href: routes.blog },
        { label: "Case studies", href: routes.caseStudies },
        { label: "Privacy policy", href: "/privacy/" },
        { label: "Terms of service", href: "/terms/" },
      ],
    },
  ];
  return (
    <footer className="ftr">
      <div className="container ftr__top">
        <div className="ftr__brand">
          <Link href="/" className="ftr__logo" aria-label="UI UX design home">
            <Logo size={36} />
          </Link>
          <p className="ftr__about">Research-led UI UX design for products that need to perform. Designing digital products since {SITE.founded}.</p>
          <address className="ftr__address">{addressLine}</address>
          <Link href={routes.contact} className="ftr__cta">Book a free consultation <span aria-hidden="true">→</span></Link>
          <p className="ftr__copy">© {new Date().getFullYear()} {SITE.domain}. All rights reserved.</p>
          {!!SITE.sameAs.length && (
            <ul className="ftr__social">
              {SITE.sameAs.map((u) => <li key={u}><a href={u} rel="noopener" target="_blank">{new URL(u).hostname.replace("www.", "")}</a></li>)}
            </ul>
          )}
        </div>
        <nav className="ftr__cols" aria-label="Footer">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="ftr__title">{c.title}</h2>
              <ul className="ftr__list">
                {c.links.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="ftr__mega" aria-hidden="true">
        <svg viewBox="0 0 1000 170" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="ftr-mega-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.11" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.015" />
            </linearGradient>
          </defs>
          <text x="500" y="160" textAnchor="middle" textLength="990" lengthAdjust="spacingAndGlyphs" fill="url(#ftr-mega-g)">uiux design</text>
        </svg>
      </div>
    </footer>
  );
}
