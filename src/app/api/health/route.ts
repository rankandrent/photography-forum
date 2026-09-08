import { runDiagnostics } from "@/lib/diagnostics";

// Always fresh: the point of this route is to reflect the environment right now.
export const dynamic = "force-dynamic";

export async function GET() {
  const result = await runDiagnostics();
  return Response.json(result, {
    status: result.ok ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
