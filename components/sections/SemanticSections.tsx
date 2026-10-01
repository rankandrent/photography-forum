import Link from "next/link";
import { ScrollRail } from "@/components/sections/ScrollRail";
import { StepArt, stepKinds } from "@/components/sections/StepArt";
import { UiMock } from "@/components/sections/UiMock";
import { Html } from "@/components/ui/Html";
import { ICONS, Icon } from "@/components/ui/Icon";
import type { Card, Section } from "@/lib/types";

export const sectionId = (s: Section) =>
  s.id ??
  s.h2
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const isCard = (x: string | Card): x is Card => typeof x !== "string";
const cardOf = (x: string | Card): Card => (isCard(x) ? x : { title: x, body: "" });
const plain = (h?: string) => (h ?? "").replace(/<[^>]+>/g, "");

/** "In short" abstractive summary under the hero */
export function Abstract({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <section className="sem-abstract" aria-label="Summary">
      <div className="container">
        <p><span className="tk-eyebrow">In short</span>{text}</p>
      </div>
    </section>
  );
}

type Visual = { src: string; alt: string } | null | undefined;
type Kind = "definition" | "include" | "process" | "benefits" | "compare" | "pricing" | "hire" | "industries" | "standards" | "faq" | "text";

const EYEBROW: Record<Kind, string> = {
  definition: "Definition",
  include: "What's included",
  process: "Process",
  benefits: "Benefits",
  compare: "Comparison",
  pricing: "Pricing",
  hire: "When to hire",
  industries: "Industries",
  standards: "Standards & compliance",
  faq: "FAQ",
  text: "Overview",
};

function kindOf(s: Section, i: number): Kind {
  const h = s.h2.toLowerCase();
  if (s.format === "steps") return "process";
  if (s.format === "cards") return "benefits";
  if (s.format === "table") return "compare";
  if (s.format === "faq") return "faq";
  if (s.format === "list") return s.items?.some(isCard) ? "include" : /industr/.test(h) ? "industries" : /regulation|standard|compliance|rules shape/.test(h) ? "standards" : "hire";
  if (/cost|price|pricing/.test(h)) return "pricing";
  return i === 0 ? "definition" : "text";
}

function Head({ s, kind, center }: { s: Section; kind: Kind; center?: boolean }) {
  const id = sectionId(s);
  return (
    <div className={`semv__head${center ? " semv__head--c" : ""}`}>
      <span className="tk-eyebrow semv__eyebrow">{EYEBROW[kind]}</span>
      <h2 id={`${id}-h`}>{s.h2}</h2>
      {s.answer && <Html as="p" className="semv__answer" html={s.answer} />}
    </div>
  );
}

function More({ html }: { html?: string }) {
  if (!html) return null;
  return (
    <details className="semv__more">
      <summary>Read more</summary>
      <Html className="semv__more-body" html={html} />
    </details>
  );
}

function Links({ s }: { s: Section }) {
  if (!s.links?.length) return null;
  return (
    <p className="sem__links">
      <span>Related:</span>
      {s.links.map((l) => <Link key={l.to} href={l.to} className="chip">{l.anchor}</Link>)}
    </p>
  );
}

/**
 * Renders a page's heading vector as visual blocks. Every H2 opens with its
 * extractive answer; detail text stays in the HTML but is kept secondary.
 */
export function SemanticSections({
  sections,
  visual,
  price,
  category,
  label = "Service illustration",
}: {
  sections?: Section[];
  visual?: Visual;
  price?: string;
  category?: string;
  label?: string;
}) {
  if (!sections?.length) return null;
  const timeline = sections.find((x) => x.format === "steps")?.answer?.match(/\d+[–-]\d+ weeks/)?.[0];
  const include = sections.find((x) => x.format === "list" && x.items?.some(isCard));

  return (
    <>
      {sections.map((s, n) => {
        const id = sectionId(s);
        const kind = kindOf(s, n);
        const items = (s.items ?? []).map(cardOf);
        const dark = kind === "benefits";
        return (
          <section key={id} id={id} className={`section sem semv semv--${kind}${dark ? " section--dark" : ""}`} aria-labelledby={`${id}-h`}>
            <div className="container">
              {kind === "definition" && (
                <>
                  <div className="semv__split">
                    <div>
                      <Head s={s} kind={kind} />
                      <More html={s.body} />
                    </div>
                    <div className="semv__visual">
                      {s.image ?? visual ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={(s.image ?? visual)!.src} alt={(s.image ?? visual)!.alt} loading="lazy" />
                      ) : (
                        <UiMock category={category} label={label} />
                      )}
                    </div>
                  </div>
                  {(timeline || price || include) && (
                    <dl className="semv__glance">
                      {timeline && <div><dt>Timeline</dt><dd>{timeline}</dd></div>}
                      {price && <div><dt>Investment</dt><dd>{price}</dd></div>}
                      {include?.items && <div><dt>Deliverables</dt><dd>{include.items.length} included</dd></div>}
                    </dl>
                  )}
                </>
              )}

              {kind === "text" && (
                <div className="semv__narrow">
                  <Head s={s} kind={kind} />
                  {s.body && <Html className="sem__body" html={s.body} />}
                </div>
              )}

              {kind === "include" && (
                <>
                  <Head s={s} kind={kind} center />
                  <div className="semv__grid">
                    {items.map((c, i) => (
                      <div key={c.title} className="semv__card">
                        <span className="semv__icon"><Icon name={ICONS[i % ICONS.length]} /></span>
                        <h3>{c.title.replace(/\.$/, "")}</h3>
                        {c.body && <Html as="p" html={c.body} />}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {kind === "process" && (
                <>
                  <ScrollRail id={`${id}-rail`} label={s.h2} head={<Head s={s} kind={kind} center />}>
                    {items.map((c, i, all) => {
                      const kinds = stepKinds(all.map((x) => x.title.replace(/\s*\([^)]*\)\s*$/, "")));
                      const m = c.title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
                      const name = m ? m[1] : c.title;
                      return (
                        <article key={c.title} className="semv__step" aria-label={`Step ${i + 1}: ${name}`}>
                          <StepArt kind={kinds[i]} />
                          <div className="semv__step-top">
                            <span className="semv__step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                            {m && <span className="semv__chip">{m[2]}</span>}
                          </div>
                          <h3>{name}</h3>
                          {c.body && <Html as="p" html={c.body} />}
                        </article>
                      );
                    })}
                  </ScrollRail>
                </>
              )}

              {kind === "benefits" && (
                <>
                  <Head s={s} kind={kind} center />
                  <div className="semv__grid semv__grid--4">
                    {items.map((c, i) => (
                      <div key={c.title} className="semv__card semv__card--dark">
                        <span className="semv__icon"><Icon name={ICONS[(i + 4) % ICONS.length]} /></span>
                        <h3>{c.title}</h3>
                        {c.body && <Html as="p" html={c.body} />}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {kind === "compare" && !!s.rows?.length && (
                <>
                  <Head s={s} kind={kind} center />
                  <div className="semv__table">
                    <table>
                      {s.caption && <caption className="visually-hidden">{s.caption}</caption>}
                      {!!s.columns?.length && (
                        <thead>
                          <tr>{s.columns.map((c, j) => <th key={c} scope="col" className={j === 1 ? "is-ours" : undefined}>{c}</th>)}</tr>
                        </thead>
                      )}
                      <tbody>
                        {s.rows.map((r, i) => (
                          <tr key={i}>
                            {r.map((cell, j) =>
                              j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j} className={j === 1 ? "is-ours" : undefined}><Html as="span" html={cell} /></td>,
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {kind === "pricing" && (
                <div className="semv__split semv__split--price">
                  <div>
                    <Head s={s} kind={kind} />
                    <More html={s.body} />
                  </div>
                  <div className="semv__price">
                    <span className="semv__price-label">Typical investment</span>
                    <strong className="semv__price-value">{price ?? plain(s.answer).match(/\$[\d,]+[–-]\$[\d,]+/)?.[0]}</strong>
                    {timeline && <span className="semv__chip semv__chip--light">{timeline}</span>}
                    {!!include?.items?.length && (
                      <ul>
                        {include.items.slice(0, 4).map(cardOf).map((c) => (
                          <li key={c.title}><Icon name="check" size={18} />{c.title.replace(/\.$/, "")}</li>
                        ))}
                      </ul>
                    )}
                    <a href="#cta-form" className="btn">Get a free quote</a>
                  </div>
                </div>
              )}

              {(kind === "hire" || kind === "industries" || kind === "standards") && (
                <>
                  <Head s={s} kind={kind} center />
                  <ul className="semv__checks">
                    {items.map((c) => (
                      <li key={c.title}>
                        <span className="semv__check"><Icon name="check" size={18} /></span>
                        <Html as="span" html={c.title} />
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {kind === "faq" && !!s.faqs?.length && (
                <>
                  <Head s={s} kind={kind} />
                  <div className="faq__list" style={{ marginTop: 32 }}>
                    {s.faqs.map((f) => (
                      <details key={f.q} className="faq__item">
                        <summary className="faq__question">
                          {f.q}
                          <span className="faq__toggle" aria-hidden="true">+</span>
                        </summary>
                        <Html className="faq__answer" html={f.a} />
                      </details>
                    ))}
                  </div>
                </>
              )}

              {s.h3s?.map((h) => (
                <div key={h.h3} className="sem__h3">
                  <h3>{h.h3}</h3>
                  <Html className="sem__body" html={h.body} />
                </div>
              ))}

              <Links s={s} />
            </div>
          </section>
        );
      })}
    </>
  );
}
