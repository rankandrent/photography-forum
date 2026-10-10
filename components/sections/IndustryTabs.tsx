"use client";

import Link from "next/link";
import { useState } from "react";
import { lower } from "@/lib/site";

export type IndustryTab = { slug: string; title: string; intro: string; bullets: string[]; href: string; image?: string; imageAlt?: string };

export function IndustryTabs({ heading, items }: { heading: string; items: IndustryTab[] }) {
  const [active, setActive] = useState(0);
  if (!items.length) return null;
  return (
    <section className="section section--warm" id="industries" aria-labelledby="ind-heading">
      <div className="container">
        <h2 id="ind-heading" className="ind__headline">{heading}</h2>
        <div className="ind__rail" role="tablist" aria-label="Industries">
          {items.map((it, i) => (
            <button
              key={it.slug}
              type="button"
              className="ind__tab"
              role="tab"
              id={`tab-${it.slug}`}
              aria-selected={i === active}
              aria-controls={`panel-${it.slug}`}
              onClick={() => setActive(i)}
            >
              {it.title}
            </button>
          ))}
        </div>
        {items.map((it, i) => (
          <div
            key={it.slug}
            className="ind__panel"
            role="tabpanel"
            id={`panel-${it.slug}`}
            aria-labelledby={`tab-${it.slug}`}
            hidden={i !== active}
          >
            <div>
              <p className="ind__intro">{it.intro}</p>
              <ul className="ind__bullets">
                {it.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <Link href={it.href} className="btn btn--dark-outline">Explore {lower(it.title)} design</Link>
            </div>
            {it.image ? (
              <div className="ind__image ind__image--photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt={it.imageAlt ?? `${it.title} UI UX design example`} width={1200} height={900} loading="lazy" decoding="async" />
              </div>
            ) : (
              <div className="ind__image" aria-hidden="true">[ {lower(it.title)} design ]</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
