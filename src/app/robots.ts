import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Enterprise-level robots.txt for PhotographyForum.net.
 *
 * Strategy:
 * - Allow crawlers full access to public threads, categories, gear, images.
 * - Block zero-value pages that waste crawl budget (search, auth, admin,
 *   dynamic sorting/filtering query params, user sessions).
 * - Explicitly point to the dynamic sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/t/",
          "/c/",
          "/gear/",
          "/tag/",
          "/challenges/",
          "/about",
          "/guidelines",
          "/terms",
          "/privacy",
          "/copyright",
          "/members",
          "/feed.xml",
        ],
        disallow: [
          // Authentication & session pages (zero SEO value)
          "/login",
          "/register",
          "/setup",

          // Internal admin & API endpoints
          "/admin/",
          "/api/",

          // User-facing pages that generate duplicate/thin content
          "/search",
          "/notifications",
          "/new",
          "/moderation",

          // Dynamic sorting/filtering query params that create duplicate URLs
          "/*?sort=",
          "/*?order=",
          "/*?direction=",
          "/*?ref=",
          "/*?utm_",
          "/*?page=0",
        ],
      },

      // Googlebot-specific: same rules but explicitly named for clarity
      {
        userAgent: "Googlebot",
        allow: ["/t/", "/c/", "/gear/", "/tag/", "/challenges/", "/about"],
        disallow: [
          "/login",
          "/register",
          "/setup",
          "/admin/",
          "/api/",
          "/search",
          "/notifications",
          "/new",
          "/moderation",
          "/*?sort=",
          "/*?order=",
          "/*?direction=",
        ],
      },

      // Block AI training crawlers from scraping forum content
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "anthropic-ai",
        disallow: ["/"],
      },
      {
        userAgent: "Google-Extended",
        disallow: ["/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
