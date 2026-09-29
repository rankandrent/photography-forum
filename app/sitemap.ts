import type { MetadataRoute } from "next";
import { getCaseStudies, getIndustries, getPages, getPosts, getServices } from "@/lib/content";
import { absoluteUrl, routes } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority: number, lastModified?: string) => ({ url: absoluteUrl(path), priority, ...(lastModified && { lastModified }) });
  return [
    u("/", 1),
    u(routes.services, 0.9),
    ...getServices().map((s) => u(routes.service(s.slug), 0.9)),
    u(routes.industries, 0.8),
    ...getIndustries().map((i) => u(routes.industry(i.slug), 0.8)),
    u(routes.caseStudies, 0.7),
    ...getCaseStudies().map((c) => u(routes.caseStudy(c.slug), 0.7, c.date)),
    u(routes.blog, 0.6),
    ...getPosts().map((p) => u(routes.post(p.slug), 0.6, p.date)),
    u(routes.contact, 0.5),
    ...getPages().filter((p) => !p.noindex).map((p) => u(routes.page(p.slug), 0.3)),
  ];
}
