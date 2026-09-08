"use client";

import { useOptimistic, useTransition } from "react";
import { voteAction } from "@/actions/votes";

type Props = {
  target: "thread" | "post";
  targetId: string;
  score: number;
  myVote: number; // 1, -1 or 0
  signedIn: boolean;
  compactLayout?: boolean;
};

export function VoteButtons({ target, targetId, score, myVote, signedIn, compactLayout }: Props) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useOptimistic(
    { score, myVote },
    (prev, next: 1 | -1) => {
      // Same arrow twice clears the vote; the other arrow flips it (delta of 2).
      if (prev.myVote === next) return { score: prev.score - next, myVote: 0 };
      const delta = prev.myVote === 0 ? next : next * 2;
      return { score: prev.score + delta, myVote: next };
    },
  );

  function cast(value: 1 | -1) {
    if (!signedIn) {
      window.location.href = "/login";
      return;
    }
    startTransition(async () => {
      setState(value);
      await voteAction(target, targetId, value);
    });
  }

  const base =
    "rounded-md p-1 transition disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700";

  return (
    <div
      className={
        compactLayout
          ? "flex items-center gap-1 text-slate-500 dark:text-slate-400"
          : "flex w-10 flex-col items-center gap-0.5 text-slate-500 dark:text-slate-400"
      }
    >
      <button
        type="button"
        onClick={() => cast(1)}
        disabled={pending}
        aria-pressed={state.myVote === 1}
        aria-label="Upvote"
        className={`${base} ${state.myVote === 1 ? "text-emerald-600 dark:text-emerald-400" : ""}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
      <span
        className="min-w-[1.5rem] text-center text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-300"
        aria-live="polite"
      >
        {state.score}
      </span>
      <button
        type="button"
        onClick={() => cast(-1)}
        disabled={pending}
        aria-pressed={state.myVote === -1}
        aria-label="Downvote"
        className={`${base} ${state.myVote === -1 ? "text-rose-600 dark:text-rose-400" : ""}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
