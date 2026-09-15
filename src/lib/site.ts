/** Single source of truth for branding and canonical URLs (used by SEO tags). */
export const site = {
  name: "PhotographyForum.net",
  tagline: "A forum for photographers who want real feedback",
  description:
    "Photography forum for real feedback: ask gear and editing questions, get structured photo critique, browse real EXIF sample photos and join weekly challenges.",
  locale: "en",
  /**
   * The X/Twitter handle for `twitter:site`. Left empty on purpose: pointing the
   * tag at an account the forum does not own attributes shares to a stranger.
   * Fill it in once the account exists.
   */
  twitter: "",
};

/**
 * Absolute site origin. Vercel sets VERCEL_PROJECT_PRODUCTION_URL for you;
 * set NEXT_PUBLIC_SITE_URL once you have a custom domain so canonical URLs,
 * sitemap entries and OG tags all point at the real host.
 *
 * Only switch it to https://photographyforum.net after that domain is
 * registered AND serving this deployment. A canonical tag that points at a host
 * which doesn't answer tells Google the real page lives nowhere.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
