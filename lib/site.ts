export const SITE = {
  name: "UIUXDesignServices.us",
  domain: "uiuxdesignservices.us",
  /** Year the company started */
  founded: 2017,
  address: {
    street: "11921 Freedom Drive, Two Fountain Square, Center Ste 550",
    city: "Reston",
    region: "VA",
    postalCode: "20190",
    country: "US",
    countryName: "United States",
  },
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://uiuxdesignservices.us").replace(/\/$/, ""),
  /** Public contact email + social/profile URLs (LinkedIn, Clutch, G2 …) for Organization schema */
  email: "hello@uiuxdesignservices.us",
  /** E.164 for links and schema; display form is formatted in the UI */
  phone: "+12029783410",
  phoneDisplay: "(202) 978-3410",
  social: [
    { name: "Behance", icon: "behance", url: "https://www.behance.net/uiuxdesignservices" },
    { name: "Dribbble", icon: "dribbble", url: "https://dribbble.com/uiuxdesignservices_us" },
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/uiuxdesignservices.us/" },
    { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/uiuxdesignservices.us/" },
    { name: "X", icon: "x", url: "https://x.com/uiuxdesignus" },
    { name: "Bluesky", icon: "bluesky", url: "https://bsky.app/profile/uiuxdesignservices.bsky.social" },
    { name: "Linktree", icon: "linktree", url: "https://linktr.ee/uiuxdesignservices" },
  ],
  get sameAs(): string[] {
    return this.social.map((s) => s.url);
  },
  description:
    "UI UX design services for growing businesses. User research, UX design, UI design, prototyping, design systems, and usability testing that turn interfaces into measurable business outcomes.",
};

/** One-line postal address for display */
export const addressLine = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}, ${SITE.address.countryName}`;

/** Whole years since SITE.founded, recomputed on every build */
export const yearsInBusiness = new Date().getFullYear() - SITE.founded;

export const absoluteUrl = (p = "/") => `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`;

export const routes = {
  home: "/",
  services: "/services/",
  service: (slug: string) => `/services/${slug}/`,
  industries: "/industries/",
  industry: (slug: string) => `/industries/${slug}/`,
  locations: "/location/",
  location: (slug: string) => `/location/${slug}/`,
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
