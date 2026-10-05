export type Stat = { value: string; label: string };
export type Card = { title: string; body: string };
export type Faq = { q: string; a: string };
export type Step = { title: string; body: string; deliverables?: string; timeline?: string };
export type Hero = { eyebrow?: string; h1: string; sub: string };
/** Optional H2 overrides per section — otherwise a heading is generated from the title */
export type SectionHeadings = Partial<
  Record<"stats" | "painPoints" | "subServices" | "challenges" | "solutions" | "process" | "benefits" | "industries" | "services" | "caseStudies" | "faqs" | "posts", string>
>;

export type Link = { anchor: string; to: string };
export type Figure = { src: string; alt: string; caption?: string };

/**
 * One H2 block of a page's heading vector (Koray-style content brief).
 * `answer` is the extractive first sentence (30–50 words) printed directly under the H2.
 */
export type Section = {
  h2: string;
  /** Anchor id; defaults to a slug of the h2 */
  id?: string;
  format: "paragraph" | "list" | "steps" | "table" | "cards" | "faq";
  answer?: string;
  /** Markdown-free HTML paragraph(s); inline <a> links allowed */
  body?: string;
  /** list / steps items (strings), cards (title + body) */
  items?: (string | Card)[];
  /** table */
  caption?: string;
  columns?: string[];
  rows?: string[][];
  /** Supporting H3s under this H2 */
  h3s?: { h3: string; body: string }[];
  /** faq format */
  faqs?: Faq[];
  image?: Figure;
  /** Contextual links shown at the end of the section */
  links?: Link[];
};

/** Page-level on/off switches for shared (boilerplate) blocks */
export type Blocks = Partial<Record<"ctaBand" | "testimonial" | "related" | "caseStudies" | "posts" | "industries" | "clients", boolean>>;
export const DEFAULT_BLOCKS: Required<Blocks> = {
  ctaBand: true,
  testimonial: true,
  related: true,
  caseStudies: true,
  posts: true,
  industries: true,
  clients: true,
};

/** Fields shared by service and industry briefs */
type Brief = {
  /** Main query used as the anchor text for every link to this page */
  anchor?: string;
  centralEntity?: string;
  /** Why the site/page exists for the buyer (documentation for writers; not rendered) */
  sourceContext?: string;
  /** Abstractive summary: 2–3 line gist shown under the hero */
  abstract?: string;
  /** Per-page heading vector. When present it replaces the templated fallback sections. */
  sections?: Section[];
  /** Entities the page mentions (Schema.org WebPage.mentions); defaults to section H2s */
  mentions?: string[];
  /** Meta keywords: focus keyword first, then close variants */
  keywords?: string[];
  /** Semantic brief (not rendered): entities, n-grams, skip-grams, NLP keywords */
  semantic?: { entities?: string[]; ngrams?: string[]; skipgrams?: string[]; nlpKeywords?: string[] };
  /** Last content update, YYYY-MM-DD (sitemap lastmod + dateModified) */
  updated?: string;
  blocks?: Blocks;
  cta?: { heading: string; body: string; cta: string };
};

/** content/services/<slug>.json */
export const SERVICE_CATEGORIES = [
  "Research & strategy",
  "Product design",
  "Platforms",
  "Dashboards & data",
  "Industry-specific",
] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export type Service = Brief & {
  slug: string;
  /** Topical cluster used to group menus, the hub and related services */
  category: ServiceCategory;
  /** e.g. "$5,000–$15,000" (Service schema offers) */
  priceRange?: string;
  /** Short name for cards, menus and breadcrumbs */
  title: string;
  /** Sort order in menus and grids (lower first) */
  order: number;
  metaTitle: string;
  metaDescription: string;
  hero: Hero;
  /** One or two sentences for service cards */
  summary: string;
  tags?: string[];
  stats?: Stat[];
  painPoints?: Card[];
  subServices?: Card[];
  process?: Step[];
  benefits?: Card[];
  faqs?: Faq[];
  relatedIndustries?: string[];
  relatedServices?: string[];
  headings?: SectionHeadings;
};

/** content/industries/<slug>.json */
/** City landing page: one per target keyword (content/locations/*.json) */
export type Location = Brief & {
  slug: string;
  /** Short city label for menus and chips, e.g. "New York" */
  title: string;
  /** City as written in copy and schema, e.g. "New York City" */
  city: string;
  state: string;
  /** Focus keyword, lower case */
  keyword: string;
  /** Main engagement price shown in the at-a-glance strip */
  priceRange?: string;
  order: number;
  metaTitle: string;
  metaDescription: string;
  hero: Hero;
  summary: string;
  faqs?: Faq[];
  /** Draft pages render but are noindex and stay out of the sitemap */
  draft?: boolean;
};

export type Industry = Brief & {
  slug: string;
  priceRange?: string;
  /** Reuse the home "why us" + process content when the industry has none of its own */
  useDefaults?: boolean;
  title: string;
  order: number;
  metaTitle: string;
  metaDescription: string;
  hero: Hero;
  summary: string;
  /** Home page industry tab: intro line + bullets */
  intro?: string;
  bullets?: string[];
  stats?: Stat[];
  challenges?: Card[];
  solutions?: Card[];
  benefits?: Card[];
  process?: Step[];
  faqs?: Faq[];
  relatedServices?: string[];
  headings?: SectionHeadings;
};

/** content/case-studies/<slug>.md front-matter + body */
export type CaseStudy = {
  slug: string;
  title: string;
  /** Optional SEO title; defaults to "<title> | Case Study" */
  metaTitle?: string;
  description: string;
  client?: string;
  /** Headline result shown on cards, e.g. "9 → 4 steps in error resolution" */
  result: string;
  services: string[];
  industries: string[];
  tags: string[];
  results: Stat[];
  quote?: string;
  quoteAuthor?: string;
  date: string;
  featured?: boolean;
  /** Card background: hex (#0B3D2E) or preset: pink | ink | blue | green | orange | purple */
  color: string;
  /** Wordmark shown top-left on the card (defaults to client) */
  logo?: string;
  /** Card layout: "visual" (UI mock / image) or "quote" (testimonial) */
  card: "visual" | "quote";
  /** Optional screenshot under /public, e.g. /work/fortna.webp — fills the card as its background */
  image?: string;
  /** Card width in the slider: "wide" (default when there is an image) or "narrow" */
  span: "wide" | "narrow";
  html: string;
};

/** content/blog/<slug>.md front-matter + body */
export type Post = {
  slug: string;
  /** Funnel stage; picks the in-article CTA (tofu → checklist, mofu → case study, bofu → consultation) */
  funnel: "tofu" | "mofu" | "bofu";
  title: string;
  /** Optional SEO title; defaults to the title */
  metaTitle?: string;
  description: string;
  date: string;
  /** Last real content update, YYYY-MM-DD (defaults to date) */
  updated: string;
  author: string;
  /** Collaborator slugs shown next to the author (default: the SEO manager) */
  contributors: string[];
  type: string;
  services: string[];
  industries: string[];
  tags: string[];
  /** Optional cover image path; posts without one get a generated brand cover */
  image?: string;
  /** Optional 3–5 one-line key takeaways shown above the article */
  takeaways: string[];
  readMinutes: number;
  html: string;
};

/** content/pages/<slug>.md — about, privacy, terms … */
export type Page = {
  slug: string;
  title: string;
  description: string;
  noindex: boolean;
  html: string;
};
