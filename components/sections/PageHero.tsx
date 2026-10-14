import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { home } from "@/content/home";
import { SITE } from "@/lib/site";
import type { Stat } from "@/lib/types";

const TRUST_LOGOS = ["NBCUniversal", "7-Eleven", "Groupon", "Sterne Kessler", "Nitro League"];

/** Rating, client logos and guarantees shown under the hero copy */
export function HeroTrust() {
  const logos = home.clients.items.filter((c) => TRUST_LOGOS.includes(c.name));
  return (
    <div className="htrust">
      <div className="htrust__rating">
        <span><strong>200+</strong> products designed · in business since {SITE.founded}</span>
      </div>
      <div className="htrust__logos">
        <span className="htrust__label">Trusted by teams at</span>
        {/* logos scroll right to left in a loop; the second copy only fills the gap and is hidden from screen readers */}
        <div className="htrust__marquee">
          <div className="htrust__track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="htrust__set" aria-label={copy ? undefined : "Clients"} aria-hidden={copy ? true : undefined}>
                {logos.map((l) => (
                  <li key={l.name}>
                    {l.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={l.logo} alt={copy ? "" : l.name} loading="eager" />
                    ) : (
                      <span>{l.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <ul className="htrust__checks">
        <li>Senior designers only</li>
        <li>NDA before the first call</li>
        <li>Reply within 1 business day</li>
      </ul>
    </div>
  );
}

/** Row of headline numbers used in light heroes */
export function StatsRow({ items }: { items?: Stat[] }) {
  if (!items?.length) return null;
  return (
    <div className="stats-row">
      {items.map((s) => (
        <div key={s.label} className="stats-row__item">
          <div className="stats-row__value">{s.value}</div>
          <div className="stats-row__label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * Hero for inner pages. `tone="light"` gives the white Aufait-style hero;
 * pass `aside` (usually a LeadForm card) for the dark two-column layout.
 */
export function PageHero({
  crumbs,
  eyebrow,
  h1,
  sub,
  meta,
  actions,
  aside,
  stats,
  tone = "dark",
  trust,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  h1: ReactNode;
  sub?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  stats?: Stat[];
  tone?: "dark" | "light";
  /** Show track record, client logos and guarantees under the copy */
  trust?: boolean;
  /** Rendered under the hero copy, e.g. a WorkRail */
  children?: ReactNode;
}) {
  const body = (
    <div>
      <Breadcrumbs items={crumbs} />
      {eyebrow && <span className="tk-eyebrow phero__eyebrow">{eyebrow}</span>}
      <h1>{h1}</h1>
      {sub && <p className="phero__sub">{sub}</p>}
      {actions && <div className="hero__actions">{actions}</div>}
      {meta && <div className="phero__meta">{meta}</div>}
      <StatsRow items={stats} />
      {trust && <HeroTrust />}
    </div>
  );
  const cls = ["phero", aside && "phero--split", tone === "light" && "phero--light"].filter(Boolean).join(" ");
  return (
    <section className={cls}>
      <div className="container">
        {aside ? (
          <div className="phero__inner">
            {body}
            {aside}
          </div>
        ) : (
          body
        )}
        {children}
      </div>
    </section>
  );
}

export function FormCard({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <div className="hero__form">
      <p className="hero__form-title">{title}</p>
      {sub && <p className="hero__form-sub">{sub}</p>}
      {children}
    </div>
  );
}
