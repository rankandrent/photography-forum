import type { Post } from "@/lib/types";

/** Post image for cards: the post's cover, or a brand cover with the post type when it has none */
export function PostThumb({ p, className = "pthumb" }: { p: Pick<Post, "image" | "title" | "type">; className?: string }) {
  if (p.image) {
    return (
      <span className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt="" loading="lazy" />
      </span>
    );
  }
  return (
    <span className={`${className} ${className}--art`} aria-hidden="true">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <path d="M400 30 H230 A90 90 0 0 0 140 120 V250" />
        <path d="M400 110 H300 A50 50 0 0 0 250 160 V250" />
        <circle cx="230" cy="30" r="5" /><circle cx="140" cy="120" r="5" /><rect x="295" y="105" width="10" height="10" rx="2" />
      </svg>
      <span>{p.type}</span>
    </span>
  );
}
