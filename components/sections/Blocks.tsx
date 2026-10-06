import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import { PostThumb } from "@/components/blog/PostThumb";
import { Html } from "@/components/ui/Html";
import { cap, routes } from "@/lib/site";
import type { Card, Faq as FaqItem, Post, Service, Stat } from "@/lib/types";

/* ---------- Clients strip: infinite right-to-left logo marquee ---------- */
type ClientLogo = { name: string; logo?: string };
const hasFile = (src?: string) => !!src && fs.existsSync(path.join(process.cwd(), "public", src));

function LogoRow({ items, hidden }: { items: ClientLogo[]; hidden?: boolean }) {
  return (
    <ul className="logo-marquee__row" aria-hidden={hidden || undefined}>
      {items.map((c) => (
        <li key={c.name} className="logo-marquee__item">
          {hasFile(c.logo) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.logo} alt={hidden ? "" : c.name} className="clients__logo" loading="lazy" />
          ) : (
            <span className="clients__word">{c.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Clients({ label, items }: { label: string; items: ClientLogo[] }) {
  return (
    <section className="clients" aria-label="Clients">
      <div className="container">
        <span className="clients__label">{label}</span>
      </div>
      <div className="logo-marquee">
        <div className="logo-marquee__track">
          <LogoRow items={items} />
          <LogoRow items={items} hidden />
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
  intro,
}: {
  id?: string;
  intro?: string;
  eyebrow?: string;
  heading: string;
  services: Pick<Service, "slug" | "title" | "summary" | "tags" | "anchor">[];
  tone?: "warm" | "light";
  allHref?: string;
}) {
  if (!services.length) return null;
  return (
    <section className={`section section--${tone}`} id={id} aria-labelledby={`${id}-heading`}>
      <div className="container">
        <span className="tk-eyebrow" style={{ display: "block", marginBottom: 20 }}>{eyebrow}</span>
        <h2 id={`${id}-heading`} className="cat__headline" style={intro ? { marginBottom: 20 } : undefined}>{heading}</h2>
        {intro && <p className="cap__intro">{intro}</p>}
        <div className="cat__grid">
          {services.map((s, i) => (
            <Link key={s.slug} href={routes.service(s.slug)} className="cat-card">
              <span className="cat-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="cat-card__title">{cap(s.anchor ?? s.title)}</h3>
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

/* ---------- CTA card (black rounded card) ---------- */
export function CtaBand({ heading, body, cta, href = "#cta-form" }: { heading: string; body: string; cta: string; href?: string }) {
  return (
    <section className="section ctawrap" aria-labelledby="inline-cta-heading">
      <div className="container">
        <div className="ctacard">
          <div className="ctacard__copy">
            <h2 id="inline-cta-heading" className="ctacard__title">{heading}</h2>
            <p className="ctacard__body">{body}</p>
            <a href={href} className="btn">{cta}</a>
          </div>
          <svg className="ctacard__art" viewBox="0 0 420 420" aria-hidden="true" focusable="false">
            <path d="M420 40 H200 A120 120 0 0 0 80 160 V420" />
            <path d="M420 180 H300 A60 60 0 0 0 240 240 V420" />
            <circle cx="300" cy="120" r="6" />
          </svg>
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
          <div className="hero__form">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (two columns: intro + contact card left, questions right) ---------- */
export function Faq({
  heading = "Frequently asked questions",
  intro = "Straight answers about scope, timelines, pricing and how we work with your team.",
  items,
}: {
  heading?: string;
  intro?: string;
  items?: FaqItem[];
}) {
  if (!items?.length) return null;
  return (
    <section className="section section--light" id="faq" aria-labelledby="faq-heading">
      <div className="container faq2">
        <div className="faq2__left">
          <span className="tk-eyebrow">FAQ</span>
          <h2 id="faq-heading" className="faq__headline">{heading}</h2>
          <Html as="p" className="faq2__intro" html={intro} />
          <div className="faq2__card">
            <p className="faq2__card-title">Still have a question?</p>
            <p>A design lead answers every message within one business day.</p>
            <a href="#cta-form" className="btn">Talk to a design lead</a>
          </div>
        </div>
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
export function Resources({ heading = "Latest from our blog", posts, more = [], tone = "warm" }: { heading?: string; posts: Post[]; more?: Post[]; tone?: "warm" | "light" }) {
  if (!posts.length) return null;
  return (
    <section className={`section section--${tone}`} aria-labelledby="res-heading">
      <div className="container">
        <div className="res__head">
          <h2 id="res-heading">{heading}</h2>
          <Link href={routes.blog} className="btn--ghost">All blog posts</Link>
        </div>
        <div className="res__grid">
          {posts.map((p) => <PostCard key={p.slug} p={p} />)}
        </div>
        {!!more.length && (
          <ul className="res__more">
            {more.map((p) => <li key={p.slug}><Link href={routes.post(p.slug)}>{p.title}</Link></li>)}
          </ul>
        )}
      </div>
    </section>
  );
}

export function PostCard({ p }: { p: Post }) {
  return (
    <Link href={routes.post(p.slug)} className="res-card">
      <PostThumb p={p} className="res-card__thumb" />
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
