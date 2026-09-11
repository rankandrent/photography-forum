"use client";

import { useState, useTransition } from "react";
import { runPipelineAction } from "@/actions/content";
import type { ActionState } from "@/actions/types";

export function RunNowButton() {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={pending}
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        onClick={() =>
          startTransition(async () => {
            setState(null);
            setState(await runPipelineAction());
          })
        }
      >
        {/* A run does several minutes of web search per post, so say so —
            otherwise the button looks broken. */}
        {pending ? "Researching and writing…" : "Run pipeline now"}
      </button>
      {state && (
        <p
          className={`text-sm ${
            state.ok ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
          }`}
          role="status"
        >
          {state.message ?? state.error}
        </p>
      )}
    </div>
  );
}
