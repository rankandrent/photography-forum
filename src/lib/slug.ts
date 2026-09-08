export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/** Slugs must be unique; a short random suffix is cheaper than a retry loop. */
export function uniqueSlug(input: string): string {
  const base = slugify(input) || "thread";
  return `${base}-${Math.random().toString(36).slice(2, 8)}`;
}
