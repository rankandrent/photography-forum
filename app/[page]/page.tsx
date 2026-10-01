import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { getPage, getPages, staticParams } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

/** Simple markdown pages from content/pages/*.md (about, privacy, terms…) */
type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("page", getPages().map((p) => p.slug));

export async function generateMetadata({ params }: Props) {
  const p = getPage((await params).page);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.description, path: routes.page(p.slug), noindex: p.noindex });
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
    </>
  );
}
