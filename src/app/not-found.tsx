import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
        This page is out of frame
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        The thread may have been deleted, or the link is wrong.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          Back to the forum
        </Link>
        <Link href="/search" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-600">
          Search
        </Link>
      </div>
    </div>
  );
}
