import Link from "next/link";
import { ScrollRail } from "@/components/sections/ScrollRail";
import { routes } from "@/lib/site";
import type { CaseStudy } from "@/lib/types";

const PRESETS: Record<string, string> = {
  pink: "linear-gradient(160deg, #8E0F3C 0%, #E2225F 55%, #FF6A8F 100%)",
  ink: "linear-gradient(160deg, #0A0A0C 0%, #1C1016 60%, #3A1426 100%)",
  blue: "linear-gradient(160deg, #0A1B45 0%, #0B3FA8 55%, #0866FF 100%)",
  green: "linear-gradient(160deg, #06291F 0%, #0B5E43 55%, #13906A 100%)",
  orange: "linear-gradient(160deg, #6E1804 0%, #D6461F 55%, #F59E3B 100%)",
  purple: "linear-gradient(160deg, #1E0839 0%, #4C1D95 55%, #7C3AED 100%)",
};

const background = (color: string) =>
  PRESETS[color] ?? `linear-gradient(160deg, ${color} 0%, color-mix(in srgb, ${color} 70%, #ffffff) 100%)`;

/** Deterministic bar heights so each card's mock chart differs but never changes between builds */
function bars(seed: string, n = 7) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return Array.from({ length: n }, (_, i) => 30 + ((h >> (i * 3)) % 60));
}

function Mock({ c }: { c: CaseStudy }) {
  return (
    <div className="wcard__mock" aria-hidden="true">
      <div className="wcard__mock-bar" />
      <div className="wcard__mock-stats">
        {(c.results.length ? c.results : [{ value: "", label: "" }]).slice(0, 2).map((r, i) => (
          <div key={i} className="wcard__mock-stat">
            <strong>{r.value}</strong>
            <span>{r.label}</span>
          </div>
        ))}
      </div>
      <div className="wcard__mock-chart">
        {bars(c.slug).map((v, i) => <span key={i} style={{ height: `${v}%` }} />)}
      </div>
    </div>
  );
}

export function WorkCard({ c, size = "grid" }: { c: CaseStudy; size?: "rail" | "grid" | "big" }) {
  const hasImage = !!c.image;
  const cls = ["wcard", `wcard--${size}`, `wcard--${c.card}`, `wcard--${c.span}`, hasImage && "wcard--image"].filter(Boolean).join(" ");
  return (
    <Link href={routes.caseStudy(c.slug)} className={cls} style={{ background: background(c.color) }}>
      {hasImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="wcard__bg" src={c.image} alt="" loading="lazy" />
      )}
      {c.logo && <span className="wcard__logo">{c.logo}</span>}
      <h3 className="wcard__title">{c.result}</h3>
      {c.card === "quote" && c.quote ? (
        <blockquote className="wcard__quote">
          <p>{c.quote}</p>
          {c.quoteAuthor && <cite>{c.quoteAuthor}</cite>}
        </blockquote>
      ) : (
        !hasImage && <Mock c={c} />
      )}
      {!!c.tags.length && (
        <div className="wcard__tags">
          {c.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      )}
    </Link>
  );
}

/** Row of cards that slides horizontally as the page scrolls (swipeable on mobile) */
export function WorkRail({ items, id = "work-rail", label = "Featured case studies" }: { items: CaseStudy[]; id?: string; label?: string }) {
  if (!items.length) return null;
  return (
    <ScrollRail id={id} label={label}>
      {items.map((c) => <WorkCard key={c.slug} c={c} size="rail" />)}
    </ScrollRail>
  );
}

/** Section with a heading and a grid of work cards */
export function WorkGrid({
  heading = "Design that changed the business",
  eyebrow,
  items,
  allHref = routes.caseStudies,
  tone = "light",
  cols = 3,
}: {
  heading?: string;
  eyebrow?: string;
  items: CaseStudy[];
  allHref?: string | null;
  tone?: "light" | "warm";
  cols?: 2 | 3;
}) {
  if (!items.length) return null;
  return (
    <section className={`section section--${tone}`} id="cases" aria-labelledby="cases-heading">
      <div className="container">
        <div className="cases__head">
          <div>
            {eyebrow && <span className="tk-eyebrow" style={{ display: "block", marginBottom: 20 }}>{eyebrow}</span>}
            <h2 id="cases-heading">{heading}</h2>
          </div>
          {allHref && <Link href={allHref} className="btn btn--dark-outline">View all work</Link>}
        </div>
        <div className={`wgrid wgrid--${cols}`}>
          {items.map((c) => <WorkCard key={c.slug} c={c} size={cols === 2 ? "big" : "grid"} />)}
        </div>
      </div>
    </section>
  );
}
