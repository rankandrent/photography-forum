/** Single source of truth for branding and canonical URLs (used by SEO tags). */
export const site = {
  name: "ApertureTalk",
  tagline: "A forum for photographers who want real feedback",
  description:
    "Ask, critique and learn. ApertureTalk is a community forum for photographers: gear talk, editing help, structured photo critique, a searchable gear database and a weekly photo challenge.",
  locale: "en",
  twitter: "@aperturetalk",
};

/**
 * Absolute site origin. Vercel sets VERCEL_PROJECT_PRODUCTION_URL for you;
 * set NEXT_PUBLIC_SITE_URL once you have a custom domain so canonical URLs,
 * sitemap entries and OG tags all point at the real host.
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
