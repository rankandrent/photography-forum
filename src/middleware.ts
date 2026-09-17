import { NextResponse, type NextRequest } from "next/server";

/**
 * URL normalization middleware:
 * 1. Redirects uppercase paths to lowercase (prevents duplicate URL crawl)
 * 2. Strips trailing slashes (canonical consistency)
 * 3. Strips junk query params (?sort, ?order, ?direction, ?ref, ?utm_*)
 *    from crawler-visible responses via 301 permanent redirect.
 *
 * Static assets, API routes, and Next.js internals are excluded.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip static files, API, _next internals, and image optimization
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/admin/") ||
    pathname.match(/\.\w{2,4}$/) // .css, .js, .png, .ico, .svg, .xml, etc.
  ) {
    return NextResponse.next();
  }

  let needsRedirect = false;
  const url = request.nextUrl.clone();

  // 1. Lowercase normalization (only the path, not query values)
  const lowered = pathname.toLowerCase();
  if (pathname !== lowered) {
    url.pathname = lowered;
    needsRedirect = true;
  }

  // 2. Strip trailing slash (except root "/")
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
    needsRedirect = true;
  }

  // 3. Strip SEO-toxic query params that create duplicate URLs
  const toxicParams = ["sort", "order", "direction", "ref", "fbclid"];
  const utmPrefixes = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const params = url.searchParams;
  const allToxic = [...toxicParams, ...utmPrefixes];

  for (const key of allToxic) {
    if (params.has(key)) {
      params.delete(key);
      needsRedirect = true;
    }
  }

  if (needsRedirect) {
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icon.svg, apple-icon.png
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|apple-icon\\.png).*)",
  ],
};
