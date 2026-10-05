import type { MetadataRoute } from "next";
import { getCaseStudies, getIndustries, getLocations, getPages, getPosts, getServices } from "@/lib/content";
import { absoluteUrl, routes } from "@/lib/site";
import { authors, blogRoutes, categories, postsByAuthor, postsInCategory } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority: number, lastModified?: string) => ({ url: absoluteUrl(path), priority, ...(lastModified && { lastModified }) });
  return [
    u("/", 1),
    u(routes.services, 0.9),
    ...getServices().map((s) => u(routes.service(s.slug), 0.9, s.updated)),
    u(routes.industries, 0.8),
    ...getIndustries().map((i) => u(routes.industry(i.slug), 0.8, i.updated)),
    ...(getLocations().length ? [u(routes.locations, 0.7)] : []),
    ...getLocations().filter((l) => !l.draft).map((l) => u(routes.location(l.slug), 0.8, l.updated)),
    u(routes.caseStudies, 0.7),
    ...getCaseStudies().map((c) => u(routes.caseStudy(c.slug), 0.7, c.date)),
    // blog archives are listed only once they have posts (empty ones are noindex)
    ...(getPosts().length ? [u(routes.blog, 0.6), u(blogRoutes.categories, 0.4), u(blogRoutes.authors, 0.3)] : []),
    ...getPosts().map((p) => u(routes.post(p.slug), 0.6, p.date)),
    ...categories.filter((c) => postsInCategory(c.slug).length).map((c) => u(blogRoutes.category(c.slug), 0.5)),
    ...authors.filter((a) => postsByAuthor(a.slug).length).map((a) => u(blogRoutes.author(a.slug), 0.3)),
    u(routes.contact, 0.5),
    ...getPages().filter((p) => !p.noindex).map((p) => u(routes.page(p.slug), 0.3)),
  ];
}
