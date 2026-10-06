import { home } from "@/content/home";
import extra from "@/content/authors.json";
import { getPosts, getService, getServices } from "@/lib/content";
import type { Post } from "@/lib/types";

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ---------- authors: the real team (content/home.ts) plus the team byline ---------- */
export type Author = { slug: string; name: string; role: string; photo?: string; /** face-cropped 256px square for small round avatars (public/team/face/) */ avatar?: string; linkedin?: string; bio: string; hasBio: boolean; expertise: string[]; person: boolean };

type Extra = { bio?: string; expertise?: string[]; yearsExperience?: number | null };
const EXTRA = extra.authors as Record<string, Extra>;

const TEAM_BYLINE: Author = {
  slug: "design-team",
  name: "Design Team",
  role: "UI UX Design Services editorial team",
  bio: "Posts written and reviewed together by our UX researchers, product designers and design leads.",
  hasBio: false,
  expertise: [],
  person: false,
};

export const authors: Author[] = [
  ...home.team.items.map((t) => {
    const slug = slugify(t.name);
    const x = EXTRA[slug] ?? {};
    return {
      slug,
      name: t.name,
      role: t.role,
      photo: t.photo,
      avatar: t.photo?.replace("/team/", "/team/face/"),
      linkedin: t.linkedin,
      // real bio from content/authors.json when filled in, else a plain role line (never invented)
      bio: x.bio?.trim() || `${t.name} is ${/^[AEIOU]/i.test(t.role) ? "an" : "a"} ${t.role.split("|")[0].trim()} at UI UX Design Services.`,
      hasBio: !!x.bio?.trim(),
      expertise: x.expertise ?? [],
      person: true,
    };
  }),
  TEAM_BYLINE,
];

/** Frontmatter `author:` may be a slug ("sahar-asif") or a name ("Sahar Asif") */
export const authorOf = (p: Pick<Post, "author">) =>
  authors.find((a) => a.slug === p.author || a.name.toLowerCase() === p.author.toLowerCase()) ?? TEAM_BYLINE;
export const getAuthor = (slug: string) => authors.find((a) => a.slug === slug);
/** Collaborators of a post, minus its own author */
export const contributorsOf = (p: Pick<Post, "author" | "contributors">) => {
  const main = authorOf(p).slug;
  return p.contributors.map(getAuthor).filter((a): a is Author => !!a && a.slug !== main);
};
export const postsContributedBy = (slug: string) => getPosts().filter((p) => contributorsOf(p).some((a) => a.slug === slug));
export const postsByAuthor = (slug: string) => getPosts().filter((p) => authorOf(p).slug === slug);

/* ---------- categories: the service groups; each holds the silos (services) inside it ---------- */
export type Category = { slug: string; name: string; services: string[] };

export const categories: Category[] = (() => {
  const map = new Map<string, Category>();
  for (const s of getServices()) {
    const name = s.category ?? "UI UX design";
    const c = map.get(name) ?? { slug: slugify(name), name, services: [] };
    c.services.push(s.slug);
    map.set(name, c);
  }
  return [...map.values()];
})();

/** A post's category is the group of its hub service (services[0]) */
export const categoryOf = (p: Pick<Post, "services">) => {
  const hub = p.services[0] && getService(p.services[0]);
  return hub ? categories.find((c) => c.services.includes(hub.slug)) : undefined;
};
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const postsInCategory = (slug: string) => getPosts().filter((p) => categoryOf(p)?.slug === slug);

export const blogRoutes = {
  categories: "/blog/category/",
  category: (slug: string) => `/blog/category/${slug}/`,
  authors: "/blog/author/",
  author: (slug: string) => `/blog/author/${slug}/`,
};
