import { notFound } from "next/navigation";
import { Team } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import { getPage, getPages, staticParams } from "@/lib/content";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageLd, pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

/** Simple markdown pages from content/pages/*.md (about, privacy, terms…) */
type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("page", getPages().map((p) => p.slug));

export async function generateMetadata({ params }: Props) {
  const p = getPage((await params).page);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle ?? p.title, description: p.description, path: routes.page(p.slug), noindex: p.noindex });
}

export default async function StaticPage({ params }: Props) {
  const p = getPage((await params).page);
  if (!p) notFound();
  return (
    <>
      <PageHero crumbs={[{ name: p.title, path: routes.page(p.slug) }]} h1={p.title} sub={p.description} />
      <section className="section section--light">
        <div className="container">
          <article className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
        </div>
      </section>
      {p.slug === "about" && <Team />}
      <JsonLd data={pageLd(p.slug === "about" ? "AboutPage" : "WebPage", { name: p.title, description: p.description, path: routes.page(p.slug) })} />
    </>
  );
}
