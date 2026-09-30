export const SITE = {
  name: "UIUXDesignServices.us",
  domain: "uiuxdesignservices.us",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://uiuxdesignservices.us").replace(/\/$/, ""),
  /** Public contact email + social/profile URLs (LinkedIn, Clutch, G2 …) for Organization schema */
  email: "",
  sameAs: [] as string[],
  description:
    "UI UX design services for growing businesses. User research, UX design, UI design, prototyping, design systems, and usability testing that turn interfaces into measurable business outcomes.",
};

export const absoluteUrl = (p = "/") => `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`;

export const routes = {
  home: "/",
  services: "/services/",
  service: (slug: string) => `/services/${slug}/`,
  industries: "/industries/",
  industry: (slug: string) => `/industries/${slug}/`,
  caseStudies: "/case-studies/",
  caseStudy: (slug: string) => `/case-studies/${slug}/`,
  blog: "/blog/",
  post: (slug: string) => `/blog/${slug}/`,
  contact: "/contact/",
  page: (slug: string) => `/${slug}/`,
};

/** Lower-case a title for use mid-sentence while keeping acronyms/brands like UX, UI, SaaS, AI intact */
export const lower = (s: string) =>
  s
    .split(" ")
    .map((w) => (/[A-Z].*[A-Z]/.test(w) ? w : w.toLowerCase()))
    .join(" ");

/** Capitalise the first letter (anchors are stored as lower-case queries) */
export const cap = (s: string) =>
  /^[a-z][A-Z]/.test(s) ? s : s.charAt(0).toUpperCase() + s.slice(1); // keeps "iOS …" intact
