import Link from "next/link";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { anchorOf, getIndustries, servicesByCategory } from "@/lib/content";
import { SITE, cap, routes } from "@/lib/site";

export function Footer() {
  // Two lead services per topical category keeps the footer short but covers every cluster
  const services = servicesByCategory().flatMap((g) => g.services.slice(0, 2));
  const industries = getIndustries().slice(0, 8);
  return (
    <footer className="ftr">
      <div className="container ftr__grid">
        <div>
          <Link href="/" className="ftr__logo">uiuxdesignservices<span>.us</span></Link>
          <p className="ftr__about">{SITE.description}</p>
        </div>
        <div>
          <h2 className="ftr__title h4-footer">Services</h2>
          <ul className="ftr__list">
            {services.map((s) => <li key={s.slug}><Link href={routes.service(s.slug)}>{cap(anchorOf(s))}</Link></li>)}
            <li><Link href={routes.services}>All services →</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="ftr__title h4-footer">Industries</h2>
          <ul className="ftr__list">
            {industries.map((s) => <li key={s.slug}><Link href={routes.industry(s.slug)}>{anchorOf(s)}</Link></li>)}
            <li><Link href={routes.industries}>All industries →</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="ftr__title h4-footer">Company</h2>
          <ul className="ftr__list">
            <li><Link href="/about/">About</Link></li>
            <li><Link href={routes.caseStudies}>Case studies</Link></li>
            <li><Link href={routes.blog}>Insights</Link></li>
            <li><Link href={routes.contact}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="ftr__title h4-footer">Newsletter</h2>
          <EmailCapture
            className="ftr__news"
            source="footer newsletter"
            cta="Subscribe"
            buttonClassName="btn ftr__news-btn"
          />
        </div>
      </div>
      <div className="container ftr__bottom">
        <span>© {new Date().getFullYear()} uiuxdesignservices.us. All rights reserved.</span>
        <span><Link href="/privacy/">Privacy</Link> · <Link href="/terms/">Terms</Link></span>
      </div>
    </footer>
  );
}
