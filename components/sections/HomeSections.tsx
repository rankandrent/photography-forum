import { TeamSlider } from "@/components/sections/TeamSlider";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { Html } from "@/components/ui/Html";
import { home } from "@/content/home";

export function Challenges() {
  const d = home.challenges;
  return (
    <section className="section section--light" id="challenges" aria-labelledby="challenges-heading">
      <div className="container">
        <h2 id="challenges-heading" className="challenge__headline">{d.heading}</h2>
        <div className="challenge__grid">
          {d.items.filter((c) => c.verified).map((c) => (
            <div key={c.value} className="cstat">
              <div className="cstat__value">{c.value}</div>
              <p className="cstat__claim">{c.claim}</p>
              <div className="cstat__source">
                <a href={c.href} target="_blank" rel="noopener noreferrer">{c.source}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  const d = home.capabilities;
  return (
    <section className="section section--light" id="capabilities" aria-labelledby="cap-heading">
      <div className="container">
        <h2 id="cap-heading" className="cap__headline">{d.heading}</h2>
        <p className="cap__intro">{d.intro}</p>
        <div className="cap__list">
          {d.items.map((c, i) => (
            <details key={c.title} className="cap__item" open={i === 0}>
              <summary>
                <span className="cap__letter">{String(i + 1).padStart(2, "0")}</span>
                <span className="cap__title">{c.title}</span>
                <span className="cap__toggle" aria-hidden="true">+</span>
              </summary>
              <Html className="cap__body" html={c.body} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadMagnet() {
  const d = home.leadMagnet;
  return (
    <section className="section section--pink" aria-labelledby="lm-heading">
      <div className="container">
        <div className="lm__inner">
          <div>
            <h2 id="lm-heading" className="lm__headline">{d.heading}</h2>
            <ul className="lm__bullets">
              {d.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <EmailCapture className="lm__form" source="lead-magnet: readiness checklist" cta="Download now" buttonClassName="btn btn--white" />
          </div>
          <div className="lm__cover" aria-hidden="true">{d.cover}</div>
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  const d = home.compare;
  return (
    <section className="section section--light" id="compare" aria-labelledby="cmp-heading">
      <div className="container">
        <h2 id="cmp-heading" className="cmp__headline">{d.heading}</h2>
        <p className="cmp__intro">{d.intro}</p>
        <div className="cmp__wrap">
          <table className="cmp__table">
            <thead>
              <tr>
                <th scope="col">Criterion</th>
                {d.columns.map((c, i) => (
                  <th key={c} scope="col" className={i === d.columns.length - 1 ? "cmp__highlight" : undefined}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.rows.map(([label, ...cells]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {cells.map((c, i) => (
                    <td key={i} className={i === cells.length - 1 ? "cmp__highlight" : undefined}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const d = home.pricing;
  return (
    <section className="section section--warm" id="pricing" aria-labelledby="prc-heading">
      <div className="container">
        <h2 id="prc-heading" className="prc__headline">{d.heading}</h2>
        <p className="prc__intro">{d.intro}</p>
        <div className="prc__grid">
          {d.items.map((p) => (
            <div key={p.title} className={`prc-card${p.featured ? " prc-card--featured" : ""}`}>
              <span className="prc-card__eyebrow">{p.eyebrow}</span>
              <h3 className="prc-card__title">{p.title}</h3>
              <div className="prc-card__price">{p.price}</div>
              <div className="prc-card__timeline">{p.timeline}</div>
              <p className="prc-card__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const d = home.whyUs;
  return (
    <section className="section section--dark diff" id="why-us" aria-labelledby="diff-heading">
      <div className="container">
        <h2 id="diff-heading" className="diff__headline">{d.heading}</h2>
        <div className="diff__cta">
          <a href="#cta-form" className="btn">{d.cta}</a>
        </div>
        <div className="diff__grid">
          {d.items.map((c) => (
            <div key={c.title} className="diff-card">
              <h3 className="h4-like">{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Team() {
  const d = home.team;
  return (
    <section className="section section--light team2" id="team" aria-labelledby="team-heading">
      <div className="container">
        <div className="team2__head">
          <h2 id="team-heading" className="team2__headline">
            <span>{d.headingMuted}</span>
            {d.heading}
          </h2>
        </div>
        <TeamSlider label="Team members">
          {d.items.map((t) => (
            <article key={t.name} className="tcard">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.photo} alt={`${t.name}${t.role ? `, ${t.role.toLowerCase()}` : ""}`} width={900} height={900} loading="lazy" decoding="async" />
              <div className="tcard__info">
                <div>
                  <h3 className="tcard__name">{t.name}</h3>
                  {t.role && <p className="tcard__role">{t.role}</p>}
                </div>
                <a className="tcard__in" href={t.linkedin} target="_blank" rel="noopener" aria-label={`${t.name} on LinkedIn`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z"/></svg>
                </a>
              </div>
            </article>
          ))}
        </TeamSlider>
      </div>
    </section>
  );
}

export function Tools() {
  const d = home.tools;
  return (
    <section className="section section--warm" id="partners" aria-labelledby="partners-heading">
      <div className="container">
        <h2 id="partners-heading" className="partners__headline">{d.heading}</h2>
        <div className="partners__grid">
          {d.items.map((t) => (
            <div key={t.name} className="partner-card">
              <h3 className="partner-card__name">{t.name}</h3>
              <p className="partner-card__body">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Awards() {
  const d = home.awards;
  return (
    <section className="section section--light awards" aria-labelledby="awards-heading">
      <div className="container">
        <h2 id="awards-heading" className="awards__headline">{d.heading}</h2>
        <div className="awards__grid">
          {d.items.map((a) => (
            <div key={a.label} className="award">
              <div className="award__badge">{a.badge}</div>
              <span className="award__label">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Ratings() {
  return (
    <section className="section section--warm rating" aria-label="Ratings">
      <div className="container">
        <div className="rating__inner">
          {home.ratings.map((r) => (
            <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer" className="rating__item">
              <div className="rating__meta">
                <span className="rating__score">{r.score}</span>
                <span className="rating__label">
                  {r.stars && <span className="rating__stars">★★★★★</span>} {r.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
