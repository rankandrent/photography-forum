"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { getAuditReportAction, executeAuditAction } from "@/actions/audit";
import type { FlaggedThread } from "@/scripts/detectScaledContent";

export default function ContentAuditPage() {
  const [threads, setThreads] = useState<FlaggedThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchReport = async () => {
    setLoading(true);
    const res = await getAuditReportAction();
    if (res.success && res.data) {
      setThreads(res.data);
    } else {
      setStatusMessage(`Error loading audit report: ${res.error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const toggleSelectAll = () => {
    if (selectedIds.size === threads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(threads.map((t) => t.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleAction = (action: "delete" | "soft_delete" | "keep") => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (action === "delete" && !confirm(`Are you sure you want to PERMANENTLY DELETE ${ids.length} thread(s)?`)) {
      return;
    }

    startTransition(async () => {
      const res = await executeAuditAction(ids, action);
      if (res.success) {
        setStatusMessage(`Successfully processed ${res.count} thread(s) with action "${action}".`);
        setSelectedIds(new Set());
        fetchReport();
      } else {
        setStatusMessage(`Failed to execute action: ${res.error}`);
      }
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Navigation Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            🛡️ Content Quality & Scaled Content Audit
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Scan and remediate auto-generated, thin, duplicate, or loop-posted forum threads.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/simulation"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            ← Back to Simulation Control
          </Link>
          <button
            onClick={fetchReport}
            disabled={loading || isPending}
            className="rounded-lg bg-sky-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-sky-500 disabled:opacity-50"
          >
            {loading ? "Scanning..." : "🔄 Re-Scan Forum"}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="mb-4 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm font-medium text-sky-800 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200">
          {statusMessage}
        </div>
      )}

      {/* Bulk Action Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={threads.length > 0 && selectedIds.size === threads.length}
            onChange={toggleSelectAll}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Selected {selectedIds.size} of {threads.length} flagged thread(s)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleAction("soft_delete")}
            disabled={selectedIds.size === 0 || isPending}
            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-amber-500 disabled:opacity-40"
          >
            ⚠️ Soft-Delete / Noindex ({selectedIds.size})
          </button>
          <button
            onClick={() => handleAction("delete")}
            disabled={selectedIds.size === 0 || isPending}
            className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-rose-500 disabled:opacity-40"
          >
            🗑️ Delete Permanently ({selectedIds.size})
          </button>
          <button
            onClick={() => handleAction("keep")}
            disabled={selectedIds.size === 0 || isPending}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-500 disabled:opacity-40"
          >
            ✓ Mark as Clean / Keep ({selectedIds.size})
          </button>
        </div>
      </div>

      {/* Audit Table */}
      {loading ? (
        <div className="rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Running content audit scan...
        </div>
      ) : threads.length === 0 ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
          🎉 No flagged threads found! The forum content is 100% clean and authentic.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-100 text-xs font-semibold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th className="p-3.5 w-10"></th>
                <th className="p-3.5">Thread Title</th>
                <th className="p-3.5">Author</th>
                <th className="p-3.5">Flagged Reason(s)</th>
                <th className="p-3.5 w-24">Similarity</th>
                <th className="p-3.5 w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {threads.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-850">
                  <td className="p-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(t.id)}
                      onChange={() => toggleSelectOne(t.id)}
                      className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                  </td>
                  <td className="p-3.5">
                    <div>
                      <Link
                        href={`/t/${t.slug}`}
                        target="_blank"
                        className="font-semibold text-slate-900 hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-400"
                      >
                        {t.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {t.wordCount} words · {t.photoCount} photo(s) · {new Date(t.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {t.author}
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {t.reasons.map((r, i) => (
                        <span
                          key={i}
                          className="rounded bg-rose-100 px-2 py-0.5 text-[11px] font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-300">
                    {t.similarityScore}%
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                      className="text-xs font-medium text-sky-600 hover:underline dark:text-sky-400"
                    >
                      {expandedId === t.id ? "Hide preview" : "Preview"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
