import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink, ReadingProgress, TocSpy } from "@/components/blog/PostClient";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand, FinalCta, Resources } from "@/components/sections/Blocks";
import { WorkGrid } from "@/components/sections/WorkCards";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { authorOf, blogRoutes, categoryOf, contributorsOf, slugify } from "@/lib/blog";
import { anchorOf, getPost, getPosts, getService, postsForService, relatedCaseStudies, relatedPosts, staticParams } from "@/lib/content";
import { articleLd, faqLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, cap, routes } from "@/lib/site";
import type { Faq } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", getPosts().map((p) => p.slug));

export async function generateMetadata({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle ?? p.title, description: p.description, path: routes.post(p.slug), type: "article", image: `/og/blog/${p.slug}.png`, published: p.date, modified: p.updated, keywords: p.tags });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
const text = (h: string) => h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').trim();

/** Adds ids to H2s (for the table of contents), wraps tables for mobile scroll, and pulls the FAQ section */
function prepare(html: string) {
  const toc: { id: string; title: string }[] = [];
  const seen = new Set<string>();
  let out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    let id = slugify(text(inner)) || "section";
    while (seen.has(id)) id += "-x";
    seen.add(id);
    toc.push({ id, title: text(inner) });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  out = out.replace(/<table>/g, '<div class="ptable"><table>').replace(/<\/table>/g, "</table></div>");

  // "## FAQs" / "## Frequently asked questions" followed by ### question + answer paragraphs
  const faqs: Faq[] = [];
  const m = out.match(/<h2 id="[^"]*">(?:FAQs?|Frequently asked questions)[^<]*<\/h2>([\s\S]*?)(?=<h2|$)/i);
  if (m) {
    const block = m[1];
    for (const q of block.matchAll(/<h3>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3>|$)/g)) faqs.push({ q: text(q[1]), a: q[2].trim() });
    if (faqs.length) {
      const items = faqs.map((f) => `<details class="pfaq__item"><summary>${f.q}<span aria-hidden="true">+</span></summary><div>${f.a}</div></details>`).join("");
      out = out.replace(block, `<div class="pfaq">${items}</div>`);
    }
  }
  return { html: out, toc, faqs };
}

/** Splits the article before its 3rd H2 so the service CTA sits mid-article */
function splitAt3rdH2(html: string): [string, string] {
  let idx = -1;
  for (let n = 0; n < 3; n++) {
    idx = html.indexOf("<h2", idx + 1);
    if (idx < 0) return [html, ""];
  }
  return [html.slice(0, idx), html.slice(idx)];
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = routes.post(p.slug);
  const url = absoluteUrl(path);
  const services = p.services.map(getService).filter((x) => !!x);
  // silo: the first service is the hub (pillar) this post supports
  const hub = services[0];
  const hubName = hub ? cap(anchorOf(hub)) : undefined;
  const chain = hub ? postsForService(hub.slug).filter((x) => x.services[0] === hub.slug).sort((a, b) => a.date.localeCompare(b.date)) : [];
  const at = chain.findIndex((x) => x.slug === p.slug);
  const prev = at > 0 ? chain[at - 1] : undefined;
  const next = at >= 0 && at < chain.length - 1 ? chain[at + 1] : undefined;
  const siblings = chain.filter((x) => x.slug !== p.slug && x !== prev && x !== next).slice(-4);
  const author = authorOf(p);
  const team = contributorsOf(p);
  const cat = categoryOf(p);
  const cases = relatedCaseStudies(p);
  const { html, toc, faqs } = prepare(p.html);
  const [first, rest] = splitAt3rdH2(html);
  const crumbs = hub ? [{ name: hubName!, path: routes.service(hub.slug) }, { name: p.title, path }] : [{ name: "Blog", path: routes.blog }, { name: p.title, path }];

  const inlineCta = hub && (p.funnel === "tofu" ? (
    <aside className="post-cta" aria-label="Free checklist">
      <p className="post-cta__eyebrow">Free resource</p>
      <p className="post-cta__title">Get the UI/UX design readiness checklist</p>
      <p className="post-cta__body">The questions our design leads ask before any {anchorOf(hub)} project. Our team emails it to you within one business day.</p>
      <EmailCapture className="post-cta__form" source={`blog checklist: ${p.slug} (hub: ${hub.slug})`} cta="Send me the checklist" />
    </aside>
  ) : (
    <aside className="post-cta" aria-label={`${hubName} consultation`}>
      <p className="post-cta__eyebrow">{hubName}</p>
      {p.funnel === "mofu" && cases[0] ? (
        <>
          <p className="post-cta__title">See how we did this for {cases[0].client}</p>
          <p className="post-cta__body">{cases[0].result}. Want the same approach for your product?</p>
        </>
      ) : (
        <>
          <p className="post-cta__title">Want senior designers to handle this for you?</p>
          <p className="post-cta__body">{hub.summary}{hub.priceRange ? ` Typical investment: ${hub.priceRange}.` : ""}</p>
        </>
      )}
      <div className="post-cta__actions">
        <a href="#cta-form" className="btn">Get a free consultation</a>
        {p.funnel === "mofu" && cases[0]
          ? <Link href={routes.caseStudy(cases[0].slug)} className="post-cta__link">Read the case study →</Link>
          : <Link href={routes.service(hub.slug)} className="post-cta__link">{hubName} →</Link>}
      </div>
    </aside>
  ));

  const share = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "X", href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(p.title)}` },
  ];

  return (
    <>
      <ReadingProgress />
      <TocSpy />
      <header className="phead">
        <div className="container phead__inner">
          <Breadcrumbs items={crumbs} />
          <div className="phead__tags">
            {cat && <Link href={blogRoutes.category(cat.slug)} className="phead__cat">{cat.name}</Link>}
            <span>{p.type}</span>
            <span>{p.readMinutes} min read</span>
          </div>
          <h1 className="phead__title">{p.title}</h1>
          <p className="phead__desc">{p.description}</p>
          <div className="phead__by">
            {author.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={author.photo} alt="" width={48} height={48} className="phead__avatar" />
            ) : (
              <span className="phead__avatar phead__avatar--logo" aria-hidden="true">U</span>
            )}
            <div>
              <Link href={blogRoutes.author(author.slug)} className="phead__author">{author.name}</Link>
              <span className="phead__role">{author.role}</span>
            </div>
            {team.map((c) => (
              <div key={c.slug} className="phead__with">
                {c.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.photo} alt="" width={36} height={36} className="phead__avatar phead__avatar--sm" />
                )}
                <div>
                  <span className="phead__role">With</span>
                  <Link href={blogRoutes.author(c.slug)} className="phead__author">{c.name}</Link>
                </div>
              </div>
            ))}
            <div className="phead__dates">
              <span>Published <time dateTime={p.date}>{fmt(p.date)}</time></span>
              {p.updated !== p.date && <span>Updated <time dateTime={p.updated}>{fmt(p.updated)}</time></span>}
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className={`pcover${p.image ? " pcover--img" : ""}`}>
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.title} />
          ) : (
            <div className="pcover__art" aria-hidden="true">
              <span className="pcover__label">{hubName ?? cat?.name ?? "UI UX design"}</span>
              <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
                <path d="M600 40 H330 A130 130 0 0 0 200 170 V300" />
                <path d="M600 150 H440 A70 70 0 0 0 370 220 V300" />
                <circle cx="330" cy="40" r="7" /><circle cx="200" cy="170" r="7" /><rect x="433" y="143" width="14" height="14" rx="3" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <section className="pwrap">
        <div className="container pgrid3">
          <aside className="ptoc" aria-label="On this page">
            {!!toc.length && (
              <details open className="ptoc__box">
                <summary>On this page</summary>
                <ol>{toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.title}</a></li>)}</ol>
              </details>
            )}
            <div className="pshare">
              <p>Share</p>
              {share.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener" className="pshare__btn">{s.label}</a>)}
              <CopyLink />
            </div>
          </aside>

          <article className="prose post-article">
            {!!p.takeaways.length && (
              <div className="ptake">
                <p className="ptake__title">Key takeaways</p>
                <ul>{p.takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            )}
            <div className="pbody pbody--first" dangerouslySetInnerHTML={{ __html: first }} />
            {rest && inlineCta}
            {rest && <div className="pbody" dangerouslySetInnerHTML={{ __html: rest }} />}
            {!rest && inlineCta}

            {!!p.tags.length && <p className="ptags">{p.tags.map((t) => <span key={t}>{t}</span>)}</p>}

            <section className="pauthors" aria-label="About the authors">
              <p className="pauthors__label">About the authors</p>
              <div className="pauthors__grid">
                {[{ a: author, role: "Author" }, ...team.map((c) => ({ a: c, role: "Collaborator" }))].map(({ a, role }) => (
                  <div key={a.slug} className="pauthors__person">
                    {a.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.photo} alt={`${a.name}, ${a.role}`} width={64} height={64} loading="lazy" className="pauthors__img" />
                    ) : (
                      <span className="pauthors__img pauthors__img--logo" aria-hidden="true">U</span>
                    )}
                    <div className="pauthors__body">
                      <span className="pauthors__tag">{role}</span>
                      <Link href={blogRoutes.author(a.slug)} className="pauthors__name">{a.name}</Link>
                      <span className="pauthors__role">{a.role}</span>
                      {a.linkedin && <a href={a.linkedin} target="_blank" rel="noopener" className="pauthors__in">LinkedIn</a>}
                    </div>
                  </div>
                ))}
              </div>
              {author.hasBio && <p className="pauthors__bio">{author.bio}</p>}
            </section>

            {hub && (
              <nav className="post-silo" aria-label={`More on ${hubName}`}>
                <p className="post-silo__title">Part of our <Link href={routes.service(hub.slug)}>{hubName}</Link> guides</p>
                {(prev || next) && (
                  <div className="post-silo__nav">
                    {prev && <Link href={routes.post(prev.slug)} rel="prev"><span>← Previous guide</span>{prev.title}</Link>}
                    {next && <Link href={routes.post(next.slug)} rel="next"><span>Next guide →</span>{next.title}</Link>}
                  </div>
                )}
                {!!siblings.length && <ul>{siblings.map((x) => <li key={x.slug}><Link href={routes.post(x.slug)}>{x.title}</Link></li>)}</ul>}
                {services.length > 1 && (
                  <div className="chips">
                    {services.slice(1).map((x) => <Link key={x.slug} href={routes.service(x.slug)} className="chip">{cap(anchorOf(x))}</Link>)}
                  </div>
                )}
              </nav>
            )}
          </article>

          <aside className="prail" aria-label="Talk to us">
            <div className="prail__card">
              <p className="prail__eyebrow">{hubName ?? "UI UX design"}</p>
              <p className="prail__title">Planning this for your product?</p>
              <p className="prail__body">A senior designer replies within one business day with next steps{hub?.priceRange ? ` and an estimate (typically ${hub.priceRange})` : ""}.</p>
              <a href="#cta-form" className="btn">Get a free consultation</a>
              {hub && <Link href={routes.service(hub.slug)} className="prail__link">{hubName} →</Link>}
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        heading={hub ? `Talk to a ${anchorOf(hub)} lead` : home.ctaBand.heading}
        body={hub ? "Tell us about your product. A senior designer replies within one business day with next steps and a scoped estimate." : home.ctaBand.body}
        cta="Book a free consultation"
      />
      <Resources heading="Keep reading" posts={relatedPosts(p)} />
      <WorkGrid heading="Related case studies" items={cases} />
      <FinalCta testimonial={home.testimonial}>
        <LeadForm variant="full" interests={formInterests} source={`blog: ${p.slug}${hub ? ` (hub: ${hub.slug})` : ""}`} submitLabel="Submit" />
      </FinalCta>
      <JsonLd data={articleLd({ image: `/og/blog/${p.slug}.png`, title: p.title, description: p.description, path, date: p.date, modified: p.updated, author: author.name, authorUrl: blogRoutes.author(author.slug), authorIsPerson: author.person, authorJob: author.person ? author.role : undefined, authorImage: author.photo, authorSameAs: author.linkedin ? [author.linkedin] : undefined, contributors: team.map((c) => ({ name: c.name, url: blogRoutes.author(c.slug), jobTitle: c.role, image: c.photo, sameAs: c.linkedin ? [c.linkedin] : undefined })), type: "BlogPosting", keywords: p.tags })} />
      {!!faqs.length && <JsonLd data={faqLd(faqs)} />}
    </>
  );
}
