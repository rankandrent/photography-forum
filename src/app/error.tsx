"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Something went wrong</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        The page failed to load. Try again — if it keeps happening, let a moderator know.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Try again
      </button>

      {/*
        Production hides the real message from the browser, on purpose. The digest
        is the key that finds the full stack trace in the host's runtime logs
        (on Vercel: Deployment -> Logs, search this value), so showing it turns an
        unactionable "something went wrong" into something a maintainer can look up.
      */}
      {error.digest && (
        <p className="mt-8 font-mono text-xs text-slate-400">
          Error reference: {error.digest}
        </p>
      )}
    </div>
  );
}
