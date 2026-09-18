import type { Metadata } from "next";
import { runDiagnostics } from "@/lib/diagnostics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Setup check",
  robots: { index: false, follow: true },
};

/**
 * Human-readable version of /api/health.
 *
 * When a fresh deployment shows "Something went wrong", this page says which
 * piece is missing and the exact command that fixes it — without anyone having
 * to dig a digest out of the host's runtime logs.
 */
export default async function SetupPage() {
  const { ok, checks } = await runDiagnostics();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Setup check</h1>
      <p
        className={`mt-2 rounded-lg px-3 py-2 text-sm font-medium ${
          ok
            ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
            : "bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
        }`}
      >
        {ok
          ? "Everything this deployment needs is configured."
          : "Something is not configured yet. The failing checks below say what and how to fix it."}
      </p>

      <ul className="mt-6 space-y-3">
        {checks.map((check) => (
          <li
            key={check.name}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  check.ok ? "bg-emerald-500" : "bg-rose-500"
                }`}
              >
                {check.ok ? "✓" : "!"}
              </span>
              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                  {check.name}
                  <span className="sr-only">: {check.ok ? "passing" : "failing"}</span>
                </h2>
                <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">{check.detail}</p>
                {check.fix && (
                  <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {check.fix}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-slate-400">
        This page reports configuration status only — never a connection string, a
        key or any other secret. The same information is available as JSON at{" "}
        <code>/api/health</code>.
      </p>
    </div>
  );
}
