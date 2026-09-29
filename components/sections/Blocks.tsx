import Link from "next/link";
import type { ReactNode } from "react";
import { Html } from "@/components/ui/Html";
import { routes } from "@/lib/site";
import type { Card, CaseStudy, Faq as FaqItem, Post, Service, Stat } from "@/lib/types";

/* ---------- Clients strip ---------- */
export function Clients({ label, names }: { label: string; names: string[] }) {
  return (
    <section className="clients" aria-label="Clients">
      <div className="container">
        <span className="clients__label">{label}</span>
        <div className="clients__row">
          {names.map((n) => <span key={n} className="clients__word">{n}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pink stats band ---------- */
export function Stats({ eyebrow = "By the numbers", heading, items }: { eyebrow?: string; heading: string; items: Stat[] }) {
  if (!items.length) return null;
  return (
    <section className="section stats" aria-labelledby="stats-heading">
      <div className="container">
        <div className="stats__head">
          <span className="tk-eyebrow" style={{ display: "block", marginBottom: 20 }}>{eyebrow}</span>
          <h2 id="stats-heading">{heading}</h2>
        </div>
        <div className="stats__grid">
          {items.map((s) => (
            <div key={s.label} className="stats__item">
              <div className="stats__value">{s.value}</div>
              <div className="stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Service category cards ---------- */
export function ServiceGrid({
  id = "services",
  eyebrow = "What we do",
  heading,
  services,
  tone = "warm",
  allHref,
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  services: Pick<Service, "slug" | "title" | "summary" | "tags">[];
  tone?: "warm" | "light";
  allHref?: string;
}) {
  if (!services.length) return null;
  return (
    <section className={`section section--${tone}`} id={id} aria-labelledby={`${id}-heading`}>
      <div className="container">
        <span className="tk-eyebrow" style={{ display: "block", marginBottom: 20 }}>{eyebrow}</span>
        <h2 id={`${id}-heading`} className="cat__headline">{heading}</h2>
        <div className="cat__grid">
          {services.map((s, i) => (
            <Link key={s.slug} href={routes.service(s.slug)} className="cat-card">
              <span className="cat-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="cat-card__title">{s.title}</h3>
              <p className="cat-card__body">{s.summary}</p>
              {!!s.tags?.length && (
                <div className="cat-card__tags">
                  {s.tags.map((t) => <span key={t} className="cat-card__tag">{t}</span>)}
                </div>
              )}
            </Link>
          ))}
        </div>
        {allHref && (
          <div style={{ marginTop: 40 }}>
            <Link href={allHref} className="btn btn--dark-outline">View all UI UX design services</Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Generic numbered card list (pain points, sub-services, challenges) ---------- */
export function CardList({
  id,
  eyebrow,
  heading,
  intro,
  items,
  tone = "light",
}: {
  id: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  items?: Card[];
  tone?: "light" | "warm";
}) {
  if (!items?.length) return null;
  return (
    <section className={`section section--${tone}`} id={id} aria-labelledby={`${id}-heading`}>
      <div className="container">
        <div className="shead">
          {eyebrow && <span className="tk-eyebrow" style={{ display: "block", marginBottom: 20 }}>{eyebrow}</span>}
          <h2 id={`${id}-heading`}>{heading}</h2>
          {intro && <p>{intro}</p>}
        </div>
        <div className="plist">
          {items.map((c, i) => (
            <div key={c.title} className="plist__item">
              <span className="plist__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <Html as="p" html={c.body} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Inline dark CTA band ---------- */
export function CtaBand({ heading, body, cta, href = "#cta-form" }: { heading: string; body: string; cta: string; href?: string }) {
  return (
    <section className="ctaband" aria-labelledby="inline-cta-heading">
      <div className="container">
        <div className="ctaband__inner">
          <h2 id="inline-cta-heading" className="ctaband__headline">{heading}</h2>
          <div className="ctaband__right">
            <p className="ctaband__body">{body}</p>
            <a href={href} className="btn btn--white">{cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dark benefits grid ---------- */
export function Benefits({ heading, items, ctaTitle, cta = "Book a discovery call" }: { heading: string; items?: Card[]; ctaTitle?: string; cta?: string }) {
  if (!items?.length) return null;
  return (
    <section className="section section--dark" id="benefits" aria-labelledby="benefits-heading">
      <div className="container">
        <h2 id="benefits-heading" className="benefits__headline">{heading}</h2>
        <div className="benefits__grid">
          {items.map((b) => (
            <div key={b.title} className="benefit">
              <span className="benefit__check" aria-hidden="true">✓</span>
              <h3 className="benefit__title">{b.title}</h3>
              <Html as="p" className="benefit__body" html={b.body} />
            </div>
          ))}
          {ctaTitle && (
            <div className="benefit benefit--cta">
              <h3 className="benefit__title">{ctaTitle}</h3>
              <a href="#cta-form" className="btn btn--white">{cta}</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Case study cards ---------- */
export function CaseGrid({
  heading = "Design that changed the business",
  items,
  allHref = routes.caseStudies,
  tone = "light",
}: {
  heading?: string;
  items: CaseStudy[];
  allHref?: string | null;
  tone?: "light" | "warm";
}) {
  if (!items.length) return null;
  return (
    <section className={`section section--${tone}`} id="cases" aria-labelledby="cases-heading">
      <div className="container">
        <div className="cases__head">
          <h2 id="cases-heading">{heading}</h2>
          {allHref && <Link href={allHref} className="btn--ghost">All case studies</Link>}
        </div>
        <div className="cases__grid">
          {items.map((c) => <CaseCard key={c.slug} c={c} />)}
        </div>
      </div>
    </section>
  );
}

export function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <Link href={routes.caseStudy(c.slug)} className="case">
      {!!c.tags.length && (
        <div className="case__tags">
          {c.tags.map((t) => <span key={t} className="case__tag">{t}</span>)}
        </div>
      )}
      <h3 className="case__result">{c.result}</h3>
      <p className="case__body">{c.description}</p>
      {c.quote && (
        <blockquote className="case__quote">
          &ldquo;{c.quote}&rdquo;
          {c.quoteAuthor && <cite className="case__attrib">— {c.quoteAuthor}</cite>}
        </blockquote>
      )}
      <span className="case__link">Read case study</span>
    </Link>
  );
}

/* ---------- Final CTA with form (form is passed in) ---------- */
export function FinalCta({
  heading = "Ready to launch faster and convert more users?",
  sub = "Send us your project. A design lead reviews it and schedules a call within one business day. We sign an NDA before the first technical discussion if you prefer.",
  testimonial,
  children,
}: {
  heading?: string;
  sub?: string;
  testimonial?: { quote: string; cite: string };
  children: ReactNode;
}) {
  return (
    <section className="section final" id="cta-form" aria-labelledby="final-heading">
      <div className="container">
        <div className="final__inner">
          <div>
            <h2 id="final-heading" className="final__headline">{heading}</h2>
            <p className="final__sub">{sub}</p>
            {testimonial && (
              <div className="final__testimonial">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
                <cite>— {testimonial.cite}</cite>
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq({ heading = "Frequently asked questions", items }: { heading?: string; items?: FaqItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="section section--light" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <h2 id="faq-heading" className="faq__headline">{heading}</h2>
        <div className="faq__list">
          {items.map((f, i) => (
            <details key={f.q} className="faq__item" open={i === 0}>
              <summary className="faq__question">
                {f.q}
                <span className="faq__toggle" aria-hidden="true">+</span>
              </summary>
              <Html className="faq__answer" html={f.a} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog / resources cards ---------- */
export function Resources({ heading = "Latest insights on UI UX design", posts, tone = "warm" }: { heading?: string; posts: Post[]; tone?: "warm" | "light" }) {
  if (!posts.length) return null;
  return (
    <section className={`section section--${tone}`} aria-labelledby="res-heading">
      <div className="container">
        <div className="res__head">
          <h2 id="res-heading">{heading}</h2>
          <Link href={routes.blog} className="btn--ghost">All insights</Link>
        </div>
        <div className="res__grid">
          {posts.map((p) => <PostCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}

export function PostCard({ p }: { p: Post }) {
  return (
    <Link href={routes.post(p.slug)} className="res-card">
      <div className="res-card__thumb" aria-hidden="true" />
      <span className="res-card__type">{p.type}</span>
      <span className="res-card__title">{p.title}</span>
    </Link>
  );
}

/* ---------- Link chips ---------- */
export function LinkChips({ heading, items, tone = "light" }: { heading: string; items: { title: string; href: string }[]; tone?: "light" | "warm" }) {
  if (!items.length) return null;
  return (
    <section className={`section section--${tone}`} style={{ paddingTop: 72, paddingBottom: 72 }}>
      <div className="container">
        <h2 style={{ fontSize: 32, marginBottom: 28 }}>{heading}</h2>
        <div className="chips">
          {items.map((i) => <Link key={i.href} href={i.href} className="chip">{i.title}</Link>)}
        </div>
      </div>
    </section>
  );
}
