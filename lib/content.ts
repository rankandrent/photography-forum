import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { SERVICE_CATEGORIES, type CaseStudy, type Industry, type Location, type Page, type Post, type Service } from "./types";

const ROOT = path.join(process.cwd(), "content");

function files(dir: string, ext: string) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(ext) && !f.startsWith("_"))
    .map((f) => ({ slug: f.slice(0, -ext.length), file: path.join(full, f) }));
}

function readJson<T>(dir: string): T[] {
  return files(dir, ".json").map(({ slug, file }) => ({
    ...JSON.parse(fs.readFileSync(file, "utf8")),
    slug,
  }));
}

/** Turn a paragraph holding a single titled image into <figure> + <figcaption>, and lazy-load images */
function figures(html: string) {
  return html
    .replace(/<p>(<img [^>]*?title="([^"]*)"[^>]*>)<\/p>/g, (_, img: string, cap: string) =>
      `<figure>${img.replace(/ title="[^"]*"/, "")}<figcaption>${cap}</figcaption></figure>`,
    )
    .replace(/<img (?![^>]*loading=)/g, '<img loading="lazy" ');
}

function readMarkdown(dir: string) {
  return files(dir, ".md").map(({ slug, file }) => {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    return { slug, data, html: figures(marked.parse(content, { async: false })) };
  });
}

const byOrder = <T extends { order: number; title: string }>(a: T, b: T) =>
  a.order - b.order || a.title.localeCompare(b.title);
const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);
const toDate = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? ""));

let cache: {
  services: Service[];
  industries: Industry[];
  caseStudies: CaseStudy[];
  posts: Post[];
  pages: Page[];
  locations: Location[];
} | null = null;

function load() {
  if (cache) return cache;
  const services = readJson<Service>("services").sort(byOrder);
  const industries = readJson<Industry>("industries").sort(byOrder);
  const locations = readJson<Location>("locations").sort(byOrder);

  const caseStudies: CaseStudy[] = readMarkdown("case-studies")
    .filter(({ data }) => !data.draft)
    .map(({ slug, data, html }) => ({
      slug,
      title: data.title,
      metaTitle: data.metaTitle,
      description: data.description ?? "",
      client: data.client,
      result: data.result ?? data.title,
      services: data.services ?? [],
      industries: data.industries ?? [],
      tags: data.tags ?? [],
      results: data.results ?? [],
      quote: data.quote,
      quoteAuthor: data.quoteAuthor,
      date: toDate(data.date),
      featured: Boolean(data.featured),
      color: data.color ?? "ink",
      logo: data.logo ?? data.client,
      card: (data.card === "quote" ? "quote" : "visual") as CaseStudy["card"],
      image: data.image,
      span: (data.span ?? (data.image ? "wide" : "narrow")) as CaseStudy["span"],
      html,
    }))
    .sort(byDateDesc);

  const posts: Post[] = readMarkdown("blog")
    .filter(({ data }) => !data.draft || process.env.SHOW_DRAFTS === "1")
    .map(({ slug, data, html }) => ({
      slug,
      title: data.title,
      metaTitle: data.metaTitle,
      description: data.description ?? "",
      date: toDate(data.date),
      author: data.author ?? "Design Team",
      type: data.type ?? "Article",
      services: data.services ?? [],
      industries: data.industries ?? [],
      tags: data.tags ?? [],
      html,
    }))
    .sort(byDateDesc);

  const pages: Page[] = readMarkdown("pages").map(({ slug, data, html }) => ({
    slug,
    title: data.title,
    description: data.description ?? "",
    noindex: Boolean(data.noindex),
    html,
  }));

  cache = { services, industries, locations, caseStudies, posts, pages };
  return cache;
}

export const getServices = () => load().services;
export const getIndustries = () => load().industries;
/** Published city pages. Drafts are left out of the build entirely (set SHOW_DRAFTS=1 to preview them locally). */
export const getLocations = () => load().locations.filter((l) => !l.draft || process.env.SHOW_DRAFTS === "1");
export const getLocation = (slug: string) => getLocations().find((l) => l.slug === slug);
/** One menu entry per city: the first page listed for that city */
export const locationCities = () => getLocations().filter((l, i, all) => all.findIndex((x) => x.title === l.title) === i);
export const getCaseStudies = () => load().caseStudies;
export const getPosts = () => load().posts;
export const getPages = () => load().pages;

export const getService = (slug: string) => getServices().find((s) => s.slug === slug);
export const getIndustry = (slug: string) => getIndustries().find((i) => i.slug === slug);
export const getCaseStudy = (slug: string) => getCaseStudies().find((c) => c.slug === slug);
export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);
export const getPage = (slug: string) => getPages().find((p) => p.slug === slug);

/** Resolve slugs to items, silently skipping slugs that don't exist yet */
function pick<T extends { slug: string }>(all: T[], slugs: string[] = []) {
  return slugs.map((s) => all.find((x) => x.slug === s)).filter((x): x is T => Boolean(x));
}

// ---- Relations (this is what wires internal links automatically) ----

export function industriesForService(s: Service) {
  const explicit = pick(getIndustries(), s.relatedIndustries);
  const reverse = getIndustries().filter((i) => i.relatedServices?.includes(s.slug));
  return unique([...explicit, ...reverse]);
}

export function servicesForIndustry(i: Industry) {
  const explicit = pick(getServices(), i.relatedServices);
  const reverse = getServices().filter((s) => s.relatedIndustries?.includes(i.slug));
  return unique([...explicit, ...reverse]).sort(byOrder);
}

/**
 * Contextually related services: explicit picks first, then same category,
 * then services sharing an industry — never just "the first six".
 */
export function relatedServices(s: Service, limit = 6) {
  const explicit = pick(getServices(), s.relatedServices);
  const score = (x: Service) =>
    (x.category === s.category ? 10 : 0) +
    (x.relatedIndustries ?? []).filter((i) => s.relatedIndustries?.includes(i)).length;
  const rest = getServices()
    .filter((x) => x.slug !== s.slug && !explicit.includes(x))
    .map((x) => ({ x, n: score(x) }))
    .filter(({ n }) => n > 0)
    .sort((a, b) => b.n - a.n || a.x.order - b.x.order)
    .map(({ x }) => x);
  return [...explicit, ...rest].slice(0, limit);
}

/** Services grouped by topical category, in category order */
export function servicesByCategory() {
  return SERVICE_CATEGORIES.map((category) => ({
    category,
    services: getServices().filter((s) => s.category === category),
  })).filter((g) => g.services.length);
}

/** Anchor text for links to a service/industry: its main query */
export const anchorOf = (x: { anchor?: string; title: string }) => x.anchor ?? x.title;

export const caseStudiesForService = (slug: string) =>
  getCaseStudies().filter((c) => c.services.includes(slug));
export const caseStudiesForIndustry = (slug: string) =>
  getCaseStudies().filter((c) => c.industries.includes(slug));
export const postsForService = (slug: string) => getPosts().filter((p) => p.services.includes(slug));
export const postsForIndustry = (slug: string) =>
  getPosts().filter((p) => p.industries.includes(slug));

/** Posts sharing a service/industry with the given item, newest first */
export function relatedPosts(item: { slug: string; services: string[]; industries: string[] }, limit = 3) {
  return getPosts()
    .filter((p) => p.slug !== item.slug)
    .map((p) => ({
      p,
      score:
        p.services.filter((s) => item.services.includes(s)).length * 2 +
        p.industries.filter((i) => item.industries.includes(i)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || byDateDesc(a.p, b.p))
    .slice(0, limit)
    .map(({ p }) => p);
}

export function relatedCaseStudies(item: { slug: string; services: string[]; industries: string[] }, limit = 3) {
  return getCaseStudies()
    .filter((c) => c.slug !== item.slug)
    .filter((c) => c.services.some((s) => item.services.includes(s)) || c.industries.some((i) => item.industries.includes(i)))
    .slice(0, limit);
}

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

/**
 * `output: "export"` refuses an empty generateStaticParams(). While a content
 * folder has no published items we emit one placeholder route that 404s.
 */
export const EMPTY_SLUG = "__empty";
export function staticParams<K extends string>(key: K, slugs: string[]) {
  return (slugs.length ? slugs : [EMPTY_SLUG]).map((s) => ({ [key]: s }) as Record<K, string>);
}
