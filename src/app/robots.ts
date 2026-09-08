import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // These produce endless near-duplicate URLs — crawl budget, not content.
        disallow: ["/api/", "/search", "/notifications", "/moderation", "/new", "/login", "/setup"],
      },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
    host: siteUrl(),
  };
}
