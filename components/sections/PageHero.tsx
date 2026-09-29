import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

/** Dark hero for inner pages. Pass `aside` (usually a LeadForm card) to get the two-column layout. */
export function PageHero({
  crumbs,
  eyebrow,
  h1,
  sub,
  meta,
  actions,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  h1: string;
  sub?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  const body = (
    <div>
      <Breadcrumbs items={crumbs} />
      {eyebrow && <span className="tk-eyebrow phero__eyebrow">{eyebrow}</span>}
      <h1>{h1}</h1>
      {sub && <p className="phero__sub">{sub}</p>}
      {actions && <div className="hero__actions">{actions}</div>}
      {meta && <div className="phero__meta">{meta}</div>}
    </div>
  );
  return (
    <section className={`phero${aside ? " phero--split" : ""}`}>
      <div className="container">
        {aside ? (
          <div className="phero__inner">
            {body}
            {aside}
          </div>
        ) : (
          body
        )}
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
