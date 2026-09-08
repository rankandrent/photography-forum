import Link from "next/link";

export function Pagination({
  page,
  pageCount,
  basePath,
  params = {},
}: {
  page: number;
  pageCount: number;
  basePath: string;
  params?: Record<string, string | undefined>;
}) {
  if (pageCount <= 1) return null;

  const href = (p: number) => {
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) search.set(k, v);
    if (p > 1) search.set("page", String(p));
    const qs = search.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  // Keep the strip short on long boards: first, last, and a window around now.
  const pages = [...Array(pageCount).keys()]
    .map((i) => i + 1)
    .filter((p) => p === 1 || p === pageCount || Math.abs(p - page) <= 2);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1 py-6">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className="rounded-lg px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
          ← Previous
        </Link>
      )}
      {pages.map((p, i) => (
        <span key={p} className="flex items-center">
          {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-slate-400">…</span>}
          <Link
            href={href(p)}
            aria-current={p === page ? "page" : undefined}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              p === page
                ? "bg-brand-600 font-semibold text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {p}
          </Link>
        </span>
      ))}
      {page < pageCount && (
        <Link href={href(page + 1)} rel="next" className="rounded-lg px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
          Next →
        </Link>
      )}
    </nav>
  );
}
