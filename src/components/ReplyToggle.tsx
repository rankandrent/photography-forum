"use client";

import { useState } from "react";
import { ReplyForm } from "@/components/ReplyForm";

export function ReplyToggle({
  threadId,
  parentId,
  signedIn,
  locked,
}: {
  threadId: string;
  parentId: string;
  signedIn: boolean;
  locked: boolean;
}) {
  const [open, setOpen] = useState(false);
  if (locked) return null;

  return open ? (
    <div className="mt-3">
      <ReplyForm
        threadId={threadId}
        parentId={parentId}
        signedIn={signedIn}
        locked={locked}
        compact
        onDone={() => setOpen(false)}
      />
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="mt-2 text-xs text-slate-400 hover:underline"
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="text-xs font-medium text-slate-500 hover:text-brand-600 dark:text-slate-400"
    >
      Reply
    </button>
  );
}
