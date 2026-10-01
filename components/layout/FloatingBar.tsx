"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { routes } from "@/lib/site";

/**
 * Sticky pill with the two main actions. Appears once the visitor scrolls past
 * the hero and hides while the consultation form or the footer is on screen.
 */
export function FloatingBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let formVisible = false;
    let footerVisible = false;
    const update = () => setShow(window.scrollY > window.innerHeight * 0.7 && !formVisible && !footerVisible);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target.id === "cta-form") formVisible = e.isIntersecting;
        else footerVisible = e.isIntersecting;
      }
      update();
    });
    const form = document.getElementById("cta-form");
    const footer = document.querySelector("footer");
    if (form) io.observe(form);
    if (footer) io.observe(footer);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  // Jump to this page's form when it has one; otherwise go to the contact page.
  const toForm = (e: MouseEvent<HTMLAnchorElement>) => {
    const form = document.getElementById("cta-form");
    if (!form) return;
    e.preventDefault();
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`fbar${show ? " is-on" : ""}`} aria-label="Quick actions" aria-hidden={!show} inert={!show}>
      <Link href={routes.services} className="fbar__primary">
        Our services
        <span className="fbar__arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </span>
      </Link>
      <a href={routes.contact} onClick={toForm} className="fbar__secondary">Free consultation</a>
    </nav>
  );
}
