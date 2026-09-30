"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/lib/site";

export type NavItem = { title: string; href: string; summary?: string };
export type NavGroup = { category: string; items: NavItem[] };

export function Header({ serviceGroups, industries }: { serviceGroups: NavGroup[]; industries: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="hdr__inner">
        <Link href="/" className="hdr__logo" onClick={close}>
          uiuxdesignservices<span>.us</span>
        </Link>
        <nav className="hdr__nav" aria-label="Main">
          <div className="hdr__dd hdr__dd--mega">
            <Link href={routes.services}>Services</Link>
            <div className="hdr__dd-panel mega">
              <div className="mega__cols">
                {serviceGroups.map((g) => (
                  <div key={g.category} className="mega__col">
                    <p className="mega__cat">{g.category}</p>
                    <ul>
                      {g.items.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href}>{s.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mega__foot">
                <span>Not sure where to start? A UX audit shows where users struggle first.</span>
                <span className="mega__foot-links">
                  <Link href="/services/ux-audit-services/">Book a UX audit →</Link>
                  <Link href={routes.services}>All services →</Link>
                </span>
              </div>
            </div>
          </div>
          <div className="hdr__dd hdr__dd--mega">
            <Link href={routes.industries}>Industries</Link>
            <div className="hdr__dd-panel mega mega--ind">
              <p className="mega__cat">Industries we design for</p>
              <ul className="mega__grid">
                {industries.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href}>
                      <strong>{i.title}</strong>
                      {i.summary && <span>{i.summary}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mega__foot">
                <span>Don&apos;t see your industry? We adapt our process to regulated and complex domains.</span>
                <span className="mega__foot-links"><Link href={routes.industries}>All industries →</Link></span>
              </div>
            </div>
          </div>
          <Link href={routes.caseStudies}>Our work</Link>
          <Link href={routes.blog}>Insights</Link>
          <Link href={routes.contact} className="btn hdr__cta">Schedule a call</Link>
        </nav>
        <button
          type="button"
          className="hdr__menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
        </button>
      </div>
      <nav id="mobile-nav" className="hdr__mobile" aria-label="Mobile">
        <details className="hdr__mgroup">
          <summary>Services</summary>
          {serviceGroups.map((g) => (
            <div key={g.category} className="hdr__mcat">
              <p>{g.category}</p>
              {g.items.map((s) => <Link key={s.href} href={s.href} onClick={close}>{s.title}</Link>)}
            </div>
          ))}
          <Link href={routes.services} onClick={close} className="hdr__mall">All services →</Link>
        </details>
        <details className="hdr__mgroup">
          <summary>Industries</summary>
          <div className="hdr__mcat">
            {industries.map((i) => <Link key={i.href} href={i.href} onClick={close}>{i.title}</Link>)}
          </div>
          <Link href={routes.industries} onClick={close} className="hdr__mall">All industries →</Link>
        </details>
        <Link href={routes.caseStudies} onClick={close}>Our work</Link>
        <Link href={routes.blog} onClick={close}>Insights</Link>
        <Link href={routes.contact} className="btn" onClick={close}>Schedule a call</Link>
      </nav>
    </header>
  );
}
