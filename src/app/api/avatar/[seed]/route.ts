import { Style, Avatar } from "@dicebear/core";
import openPeeps from "@dicebear/styles/open-peeps.json" with { type: "json" };

/**
 * Generated avatars, served as cacheable SVG rather than inlined into the page.
 *
 * DiceBear can hand back a data URI, and dropping that straight into `<img
 * src>` is the shortest path — but each one is a few KB of markup, and a busy
 * thread renders twenty of them. That turns into tens of KB of HTML on every
 * request, uncacheable, for images that never change. A URL costs ~40 bytes in
 * the document and the browser caches the SVG itself.
 *
 * The style is DiceBear's "Open Peeps", which is CC0 — no attribution required.
 */

// One Style instance for the process; parsing the definition per request is
// pure waste on a route this hot.
const style = new Style(openPeeps as never);

const YEAR = 60 * 60 * 24 * 365;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ seed: string }> },
) {
  const { seed } = await params;

  const requested = Number(new URL(request.url).searchParams.get("size"));
  // Clamp rather than trust: an unbounded size is a cheap way to make the
  // server render enormous images on demand.
  const size = Number.isFinite(requested) ? Math.min(Math.max(requested, 16), 256) : 96;

  // Seed and size only. `radius` and array-valued `backgroundColor` were part
  // of DiceBear 9's option set and are rejected by 10's schema; the rounding
  // and the tint behind the figure both come from CSS on the <img> instead.
  const svg = new Avatar(style, {
    seed: decodeURIComponent(seed).slice(0, 64),
    size,
  }).toString();

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      // The avatar for a username is a pure function of that username, so it
      // can be cached indefinitely.
      "Cache-Control": `public, max-age=${YEAR}, s-maxage=${YEAR}, immutable`,
    },
  });
}
