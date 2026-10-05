import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/blog/BlogParts";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { authorOf, blogRoutes, categoryOf, postsByAuthor } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { CtaBand, FinalCta, Resources } from "@/components/sections/Blocks";
import { WorkGrid } from "@/components/sections/WorkCards";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { formInterests, home } from "@/content/home";
import { anchorOf, getPost, getPosts, staticParams, getService, postsForService, relatedCaseStudies, relatedPosts } from "@/lib/content";
import { articleLd, pageMetadata } from "@/lib/seo";
import { cap, routes } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("slug", getPosts().map((p) => p.slug));

export async function generateMetadata({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle ?? p.title, description: p.description, path: routes.post(p.slug), type: "article", image: `/og/blog/${p.slug}.png`, published: p.date, keywords: p.tags });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

/** Splits the article after its 3rd H2 so the service CTA sits mid-article */
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
  const services = p.services.map(getService).filter((x) => !!x);
  // silo: the first service is the hub this post supports
  const hub = services[0];
  const hubName = hub ? cap(anchorOf(hub)) : undefined;
  // silo chain: the hub's own posts oldest → newest, so each post links to the previous and next one
  const chain = hub ? postsForService(hub.slug).filter((x) => x.services[0] === hub.slug).sort((a, b) => a.date.localeCompare(b.date)) : [];
  const at = chain.findIndex((x) => x.slug === p.slug);
  const prev = at > 0 ? chain[at - 1] : undefined;
  const next = at >= 0 && at < chain.length - 1 ? chain[at + 1] : undefined;
  const siblings = chain.filter((x) => x.slug !== p.slug && x !== prev && x !== next).slice(-4);
  const [first, rest] = splitAt3rdH2(p.html);
  const author = authorOf(p);
  const cat = categoryOf(p);
  const crumbs = hub
    ? [{ name: hubName!, path: routes.service(hub.slug) }, { name: p.title, path }]
    : [{ name: "Blog", path: routes.blog }, { name: p.title, path }];

  const cases = relatedCaseStudies(p);
  const hubCta = hub && (p.funnel === "tofu" ? (
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
          : <Link href={routes.service(hub.slug)} className="post-cta__link">{cap(anchorOf(hub))} →</Link>}
      </div>
    </aside>
  ));


  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={p.type}
        h1={p.title}
        sub={p.description}
        meta={<><Link href={blogRoutes.author(author.slug)}>{author.name}</Link><span>{fmt(p.date)}</span>{cat && <Link href={blogRoutes.category(cat.slug)}>{cat.name}</Link>}</>}
      />
      <section className="section section--light">
        <div className="container">
          <article className="prose">
            <div dangerouslySetInnerHTML={{ __html: first }} />
            {rest && hubCta}
            {rest && <div dangerouslySetInnerHTML={{ __html: rest }} />}
          </article>
          {!rest && <div className="prose">{hubCta}</div>}
          <div className="prose post-author">
            <p className="post-author__label">Written by</p>
            <AuthorCard a={author} count={postsByAuthor(author.slug).length} />
          </div>
          {hub && (
            <nav className="prose post-silo" aria-label={`More on ${hubName}`}>
              <p className="post-silo__title">Part of our <Link href={routes.service(hub.slug)}>{hubName}</Link> guides</p>
              {(prev || next) && (
                <div className="post-silo__nav">
                  {prev && <Link href={routes.post(prev.slug)} rel="prev"><span>← Previous guide</span>{prev.title}</Link>}
                  {next && <Link href={routes.post(next.slug)} rel="next"><span>Next guide →</span>{next.title}</Link>}
                </div>
              )}
              {!!siblings.length && (
                <ul>
                  {siblings.map((x) => <li key={x.slug}><Link href={routes.post(x.slug)}>{x.title}</Link></li>)}
                </ul>
              )}
              {services.length > 1 && (
                <div className="chips">
                  {services.slice(1).map((x) => <Link key={x.slug} href={routes.service(x.slug)} className="chip">{cap(anchorOf(x))}</Link>)}
                </div>
              )}
            </nav>
          )}
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
      <JsonLd data={articleLd({ image: `/og/blog/${p.slug}.png`, title: p.title, description: p.description, path, date: p.date, author: author.name, authorUrl: blogRoutes.author(author.slug), authorIsPerson: author.person, type: "BlogPosting", keywords: p.tags })} />
    </>
  );
}
