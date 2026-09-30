export type Stat = { value: string; label: string };
export type Card = { title: string; body: string };
export type Faq = { q: string; a: string };
export type Step = { title: string; body: string; deliverables?: string; timeline?: string };
export type Hero = { eyebrow?: string; h1: string; sub: string };
/** Optional H2 overrides per section — otherwise a heading is generated from the title */
export type SectionHeadings = Partial<
  Record<"stats" | "painPoints" | "subServices" | "challenges" | "solutions" | "process" | "benefits" | "industries" | "services" | "caseStudies" | "faqs" | "posts", string>
>;

/** content/services/<slug>.json */
export type Service = {
  slug: string;
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
export type Industry = {
  slug: string;
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
  /** Optional screenshot under /public, e.g. /work/fortna.webp */
  image?: string;
  html: string;
};

/** content/blog/<slug>.md front-matter + body */
export type Post = {
  slug: string;
  title: string;
  /** Optional SEO title; defaults to the title */
  metaTitle?: string;
  description: string;
  date: string;
  author: string;
  type: string;
  services: string[];
  industries: string[];
  tags: string[];
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
