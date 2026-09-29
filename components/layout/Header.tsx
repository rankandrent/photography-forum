"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/lib/site";

type NavItem = { title: string; href: string };

export function Header({ services, industries }: { services: NavItem[]; industries: NavItem[] }) {
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
          <div className="hdr__dd">
            <Link href={routes.services}>Services</Link>
            <div className="hdr__dd-panel">
              {services.map((s) => (
                <Link key={s.href} href={s.href}>{s.title}</Link>
              ))}
              <Link href={routes.services} className="hdr__dd-all">All services →</Link>
            </div>
          </div>
          <div className="hdr__dd">
            <Link href={routes.industries}>Industries</Link>
            <div className="hdr__dd-panel">
              {industries.map((s) => (
                <Link key={s.href} href={s.href}>{s.title}</Link>
              ))}
              <Link href={routes.industries} className="hdr__dd-all">All industries →</Link>
            </div>
          </div>
          <Link href={routes.caseStudies}>Work</Link>
          <Link href={routes.blog}>Insights</Link>
          <Link href={routes.contact} className="btn hdr__cta">Get in touch</Link>
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
        <Link href={routes.services} onClick={close}>Services</Link>
        <Link href={routes.industries} onClick={close}>Industries</Link>
        <Link href={routes.caseStudies} onClick={close}>Work</Link>
        <Link href={routes.blog} onClick={close}>Insights</Link>
        <Link href={routes.contact} className="btn" onClick={close}>Get in touch</Link>
      </nav>
    </header>
  );
}
