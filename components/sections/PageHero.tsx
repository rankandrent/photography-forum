import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { home } from "@/content/home";
import type { Stat } from "@/lib/types";

const TRUST_LOGOS = ["NBCUniversal", "7-Eleven", "Groupon", "Sterne Kessler", "Nitro League"];

/** Rating, client logos and guarantees shown under the hero copy */
export function HeroTrust() {
  const rating = home.hero.stats.find((x) => x.value.includes("/ 5"));
  const logos = home.clients.items.filter((c) => TRUST_LOGOS.includes(c.name));
  return (
    <div className="htrust">
      <div className="htrust__rating">
        <span className="htrust__stars" aria-hidden="true">★★★★★</span>
        <span><strong>{rating?.value ?? "4.9 / 5"}</strong> average client rating · 200+ products designed</span>
      </div>
      <div className="htrust__logos" aria-label="Clients">
        <span className="htrust__label">Trusted by teams at</span>
        {logos.map((l) =>
          l.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={l.name} src={l.logo} alt={l.name} loading="eager" />
          ) : (
            <span key={l.name}>{l.name}</span>
          ),
        )}
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
  /** Show rating, client logos and guarantees under the copy */
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
