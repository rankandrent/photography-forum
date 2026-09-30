import Link from "next/link";
import { Html } from "@/components/ui/Html";
import type { Card, Section } from "@/lib/types";

export const sectionId = (s: Section) =>
  s.id ??
  s.h2
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const isCard = (x: string | Card): x is Card => typeof x !== "string";

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

/**
 * Renders a page's heading vector in order. Each H2 opens with its extractive
 * answer, then the format-specific body, H3s, figure and contextual links.
 */
export function SemanticSections({ sections }: { sections?: Section[] }) {
  if (!sections?.length) return null;
  return (
    <>
      {sections.map((s, n) => {
        const id = sectionId(s);
        return (
          <section key={id} id={id} className={`section section--${n % 2 ? "warm" : "light"} sem`} aria-labelledby={`${id}-h`}>
            <div className="container">
              <div className={`sem__wrap${s.image ? " sem__wrap--fig" : ""}`}>
                <div className="sem__main">
                  <h2 id={`${id}-h`}>{s.h2}</h2>
                  {s.answer && <Html as="p" className="sem__answer" html={s.answer} />}
                  {s.body && <Html className="sem__body" html={s.body} />}

                  {s.format === "list" && !!s.items?.length && (
                    <ul className="sem__list">
                      {s.items.map((it, i) => (
                        <li key={i}>{isCard(it) ? <><strong>{it.title}</strong> <Html as="span" html={it.body} /></> : <Html as="span" html={it} />}</li>
                      ))}
                    </ul>
                  )}

                  {s.format === "steps" && !!s.items?.length && (
                    <ol className="sem__steps">
                      {s.items.map((it, i) => (
                        <li key={i}>
                          <span className="sem__step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                          <div>{isCard(it) ? <><h3>{it.title}</h3><Html as="p" html={it.body} /></> : <Html as="p" html={it} />}</div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {s.h3s?.map((h) => (
                    <div key={h.h3} className="sem__h3">
                      <h3>{h.h3}</h3>
                      <Html className="sem__body" html={h.body} />
                    </div>
                  ))}
                </div>

                {s.image && (
                  <figure className="sem__fig">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image.src} alt={s.image.alt} loading="lazy" />
                    {s.image.caption && <figcaption>{s.image.caption}</figcaption>}
                  </figure>
                )}
              </div>

              {s.format === "cards" && !!s.items?.length && (
                <div className="plist" style={{ marginTop: 40 }}>
                  {s.items.filter(isCard).map((c, i) => (
                    <div key={c.title} className="plist__item">
                      <span className="plist__num">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{c.title}</h3>
                      <Html as="p" html={c.body} />
                    </div>
                  ))}
                </div>
              )}

              {s.format === "table" && !!s.rows?.length && (
                <div className="cmp__wrap" style={{ marginTop: 40 }}>
                  <table className="cmp__table">
                    {s.caption && <caption className="visually-hidden">{s.caption}</caption>}
                    {!!s.columns?.length && (
                      <thead>
                        <tr>{s.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
                      </thead>
                    )}
                    <tbody>
                      {s.rows.map((r, i) => (
                        <tr key={i}>
                          {r.map((cell, j) => (j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}><Html as="span" html={cell} /></td>))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {s.format === "faq" && !!s.faqs?.length && (
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
              )}

              {!!s.links?.length && (
                <p className="sem__links">
                  <span>Related:</span>
                  {s.links.map((l) => <Link key={l.to} href={l.to} className="chip">{l.anchor}</Link>)}
                </p>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
