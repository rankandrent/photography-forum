import { NextResponse, type NextRequest } from "next/server";

/**
 * URL normalization middleware:
 * 1. Redirects uppercase paths to lowercase (prevents duplicate URL crawl)
 * 2. Strips trailing slashes (canonical consistency)
 * 3. Strips junk query params (?sort, ?order, ?direction, ?ref, ?utm_*)
 *    from crawler-visible responses via 301 permanent redirect.
 * 4. Adds X-Robots-Tag header to API and admin routes.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add X-Robots-Tag header to API and admin endpoints
  if (pathname.startsWith("/api/") || pathname.startsWith("/admin/")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // Skip static files, _next internals, and image optimization
  if (
    pathname.startsWith("/_next") ||
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
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|apple-icon\\.png).*)",
  ],
};
