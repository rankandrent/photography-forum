import Link from "next/link";
import { anchorOf, getPosts, getService } from "@/lib/content";
import { authorOf, blogRoutes, categories, categoryOf, postsInCategory, type Author } from "@/lib/blog";
import { cap, routes } from "@/lib/site";
import type { Post } from "@/lib/types";

export const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** Category tabs shown on every blog listing */
export function BlogNav({ active }: { active?: string }) {
  const total = getPosts().length;
  return (
    <nav className="blognav" aria-label="Blog categories">
      <Link href={routes.blog} className={`blognav__tab${!active ? " is-on" : ""}`} aria-current={!active ? "page" : undefined}>All <span>{total}</span></Link>
      {categories.map((c) => (
        <Link key={c.slug} href={blogRoutes.category(c.slug)} className={`blognav__tab${active === c.slug ? " is-on" : ""}`} aria-current={active === c.slug ? "page" : undefined}>
          {c.name} <span>{postsInCategory(c.slug).length}</span>
        </Link>
      ))}
      <Link href={blogRoutes.authors} className={`blognav__tab blognav__tab--muted${active === "authors" ? " is-on" : ""}`}>Authors</Link>
    </nav>
  );
}

export function PostTile({ p, big }: { p: Post; big?: boolean }) {
  const cat = categoryOf(p);
  const hub = p.services[0] ? getService(p.services[0]) : undefined;
  const a = authorOf(p);
  return (
    <article className={`ptile${big ? " ptile--big" : ""}`}>
      <div className="ptile__meta">
        {cat && <Link href={blogRoutes.category(cat.slug)} className="ptile__cat">{cat.name}</Link>}
        <span>{p.type}</span>
      </div>
      <h3 className="ptile__title"><Link href={routes.post(p.slug)}>{p.title}</Link></h3>
      {big && <p className="ptile__desc">{p.description}</p>}
      <div className="ptile__foot">
        <Link href={blogRoutes.author(a.slug)}>{a.name}</Link>
        <span>{fmtDate(p.date)}</span>
        {hub && <Link href={routes.service(hub.slug)} className="ptile__hub">{cap(anchorOf(hub))}</Link>}
      </div>
    </article>
  );
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return <div className="pgrid">{posts.map((p) => <PostTile key={p.slug} p={p} />)}</div>;
}

export function EmptyBlog({ text = "The first guides are being written by our design team. Check back soon." }: { text?: string }) {
  return (
    <div className="blog-empty">
      <p>{text}</p>
      <Link href={routes.services} className="btn btn--dark-outline">Explore our services</Link>
    </div>
  );
}

export function AuthorCard({ a, count, compact }: { a: Author; count?: number; compact?: boolean }) {
  return (
    <div className={`acard${compact ? " acard--compact" : ""}`}>
      {a.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={a.photo} alt={`${a.name}, ${a.role}`} width={96} height={96} loading="lazy" className="acard__img" />
      ) : (
        <span className="acard__img acard__img--logo" aria-hidden="true">U</span>
      )}
      <div className="acard__body">
        <p className="acard__name"><Link href={blogRoutes.author(a.slug)}>{a.name}</Link></p>
        <p className="acard__role">{a.role}</p>
        {!compact && <p className="acard__bio">{a.bio}</p>}
        {!compact && !!a.expertise.length && <p className="acard__tags">{a.expertise.map((e) => <span key={e}>{e}</span>)}</p>}
        <p className="acard__links">
          {typeof count === "number" && <span>{count} {count === 1 ? "article" : "articles"}</span>}
          {a.linkedin && <a href={a.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
        </p>
      </div>
    </div>
  );
}
