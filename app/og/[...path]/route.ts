import { home } from "@/content/home";
import { getCaseStudies, getIndustries, getPosts, getServices } from "@/lib/content";
import { ogImage } from "@/lib/og";

/**
 * Social share images as real .png files: /og/home.png, /og/services/<slug>.png, …
 * (A route handler is used instead of opengraph-image.tsx so static hosts get a
 * file extension and serve the correct content type.)
 */
export const dynamic = "force-static";
export const dynamicParams = false;

function cards() {
  return [
    { path: ["home.png"], title: home.hero.h1Before + home.hero.h1Em, eyebrow: "UI UX design services" },
    ...getServices().map((s) => ({ path: ["services", `${s.slug}.png`], title: s.hero.h1, eyebrow: s.title })),
    ...getIndustries().map((i) => ({ path: ["industries", `${i.slug}.png`], title: i.hero.h1, eyebrow: "Industries" })),
    ...getCaseStudies().map((c) => ({ path: ["case-studies", `${c.slug}.png`], title: c.title, eyebrow: "Case study" })),
    ...getPosts().map((p) => ({ path: ["blog", `${p.slug}.png`], title: p.title, eyebrow: p.type })),
  ];
}

export const generateStaticParams = () => cards().map(({ path }) => ({ path }));

export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const key = (await params).path.join("/");
  const card = cards().find((c) => c.path.join("/") === key) ?? cards()[0];
  return ogImage(card.title, card.eyebrow);
}
