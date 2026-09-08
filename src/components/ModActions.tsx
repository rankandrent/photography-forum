"use client";

import { useTransition } from "react";
import { setThreadFlagAction, deleteThreadAction } from "@/actions/threads";

export function ModActions({
  threadId,
  pinned,
  locked,
  canDelete,
  isStaff,
}: {
  threadId: string;
  pinned: boolean;
  locked: boolean;
  canDelete: boolean;
  isStaff: boolean;
}) {
  const [pending, startTransition] = useTransition();
  if (!canDelete && !isStaff) return null;

  const button =
    "rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800";

  return (
    <div className="flex flex-wrap gap-2">
      {isStaff && (
        <>
          <button
            type="button"
            disabled={pending}
            className={button}
            onClick={() => startTransition(() => setThreadFlagAction(threadId, "pinned", !pinned).then(() => undefined))}
          >
            {pinned ? "Unpin" : "Pin"}
          </button>
          <button
            type="button"
            disabled={pending}
            className={button}
            onClick={() => startTransition(() => setThreadFlagAction(threadId, "locked", !locked).then(() => undefined))}
          >
            {locked ? "Unlock" : "Lock"}
          </button>
        </>
      )}
      {canDelete && (
        <button
          type="button"
          disabled={pending}
          className={`${button} text-rose-600 dark:text-rose-400`}
          onClick={() => {
            if (!confirm("Delete this thread and every reply? This cannot be undone.")) return;
            startTransition(() => deleteThreadAction(threadId).then(() => undefined));
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
