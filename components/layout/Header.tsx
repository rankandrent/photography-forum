"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useEffect, useState } from "react";
import { routes } from "@/lib/site";

export type NavItem = { title: string; href: string; summary?: string };
export type NavGroup = { category: string; items: NavItem[] };

export function Header({ serviceGroups, industries, locations }: { serviceGroups: NavGroup[]; industries: NavItem[]; locations: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  // "Industry-specific" services render as the bottom "Specialization" row
  const specialGroup = serviceGroups.find((g) => g.category === "Industry-specific");
  const mainGroups = serviceGroups.filter((g) => g !== specialGroup);

  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="hdr__inner">
        <Link href="/" className="hdr__logo" aria-label="UI UX design home" onClick={close}>
          <Logo />
        </Link>
        <nav className="hdr__nav" aria-label="Main">
          <div className="hdr__dd hdr__dd--mega">
            <Link href={routes.services}>Services</Link>
            <div className="hdr__dd-panel mega">
              <div className="mega__cols">
                {mainGroups.map((g) => (
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
              {specialGroup && (
                <div className="mega__special">
                  <p className="mega__cat">Specialization</p>
                  <ul className="mega__grid">
                    {specialGroup.items.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href}>{s.title}</Link>
                      </li>
                    ))}
                    <li>
                      <Link href={routes.services} className="mega__all">All services →</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="hdr__dd hdr__dd--mega">
            <Link href={routes.industries}>Industries</Link>
            <div className="hdr__dd-panel mega mega--ind">
              <p className="mega__cat">Industries</p>
              <ul className="mega__grid">
                {industries.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href}>{i.title}</Link>
                  </li>
                ))}
              </ul>
              <div className="mega__special">
                <Link href={routes.industries} className="mega__all">All industries →</Link>
              </div>
            </div>
          </div>
          {!!locations.length && <div className="hdr__dd hdr__dd--mega">
            <Link href={routes.locations}>Locations</Link>
            <div className="hdr__dd-panel mega mega--ind mega--loc">
              <p className="mega__cat">UX design agency near you</p>
              <ul className="mega__grid">
                {locations.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href}>{i.title}</Link>
                  </li>
                ))}
              </ul>
              <div className="mega__special">
                <Link href={routes.locations} className="mega__all">All locations →</Link>
              </div>
            </div>
          </div>}
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
        {!!locations.length && <details className="hdr__mgroup">
          <summary>Locations</summary>
          <div className="hdr__mcat">
            {locations.map((i) => <Link key={i.href} href={i.href} onClick={close}>{i.title}</Link>)}
          </div>
          <Link href={routes.locations} onClick={close} className="hdr__mall">All locations →</Link>
        </details>}
        <Link href={routes.caseStudies} onClick={close}>Our work</Link>
        <Link href={routes.blog} onClick={close}>Insights</Link>
        <Link href={routes.contact} className="btn" onClick={close}>Schedule a call</Link>
      </nav>
    </header>
  );
}
