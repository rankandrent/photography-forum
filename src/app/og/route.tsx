import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
const SIZE = { width: 1200, height: 630 };

/**
 * Social preview card for threads that have no photo of their own.
 * /og?title=Why%20are%20my%20portraits%20soft
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? site.tagline).slice(0, 120);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
          padding: 64,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, opacity: 0.8 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 26, opacity: 0.7 }}>{site.tagline}</div>
      </div>
    ),
    SIZE,
  );
}
