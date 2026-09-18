import { urlFor } from "@/lib/storage";
import { absoluteUrl } from "@/lib/site";

/**
 * Canonical URLs for the paginated, sortable listings (home, category, tag,
 * profile). Two different problems that need two different answers:
 *
 * `?sort=` reorders the same threads, so every sort variant is a true duplicate
 * and canonicalises to the default order.
 *
 * `?page=` is the opposite: page 2 holds *different* threads. A fixed canonical
 * pointing every page at page 1 tells Google the deeper pages duplicate the
 * first, and threads that appear only there stop being indexed — which on a
 * forum is most of the archive. Deep pages therefore canonicalise to themselves.
 */
export function listingCanonical(path: string, page?: string | number): string {
  const n = Number(page ?? 1) || 1;
  return n > 1 ? `${path}?page=${n}` : path;
}

/**
 * Absolute URL for an image key, for structured data — which, unlike the
 * `metadata` export, has no `metadataBase` to resolve relative paths against.
 *
 * `urlFor` returns a site-relative path under the local driver but a full CDN
 * URL once `NEXT_PUBLIC_UPLOAD_BASE_URL` points at a bucket, so prefixing
 * unconditionally would corrupt the S3 case.
 */
/**
 * Metadata for a page whose subject does not exist (deleted thread, bad slug).
 *
 * These *should* answer 404, but the root `loading.tsx` means Next flushes the
 * streaming shell — headers and all — before the component runs `notFound()`,
 * so the status is already committed as 200. Left alone they are soft 404s: a
 * forum accumulates them as threads are deleted, and each one inherits the root
 * layout's canonical and reads to a crawler as another copy of the homepage.
 * `noindex` keeps them out of the index whatever the status line says.
 */
export function missingPageMetadata(title: string) {
  return {
    title,
    robots: { index: false, follow: true },
    alternates: { canonical: null },
  };
}

export function absoluteImageUrl(key: string): string {
  const url = urlFor(key);
  return /^https?:\/\//i.test(url) ? url : absoluteUrl(url);
}
