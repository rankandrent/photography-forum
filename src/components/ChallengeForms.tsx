"use client";

import { useActionState, useTransition } from "react";
import { enterChallengeAction, voteChallengeEntryAction } from "@/actions/challenges";
import { idle } from "@/actions/types";
import { SubmitButton } from "@/components/SubmitButton";
import { FormError } from "@/components/FormError";
import { ImagePicker } from "@/components/ImagePicker";

export function ChallengeEntryForm({
  challengeId,
  hasEntry,
}: {
  challengeId: string;
  hasEntry: boolean;
}) {
  const [state, formAction] = useActionState(enterChallengeAction, idle);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="challengeId" value={challengeId} />
      <ImagePicker
        multiple={false}
        label={hasEntry ? "Replace your entry" : "Your entry"}
        hint="One photo per photographer. Re-submitting replaces your current entry."
      />
      <div>
        <label htmlFor="caption" className="mb-1 block text-sm font-medium">
          Caption <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="caption"
          name="caption"
          maxLength={200}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950"
        />
      </div>
      <FormError error={state.error} message={state.message} />
      <SubmitButton pendingLabel="Uploading…">{hasEntry ? "Replace entry" : "Submit entry"}</SubmitButton>
    </form>
  );
}

export function EntryVoteButton({
  entryId,
  votes,
  voted,
  disabled,
}: {
  entryId: string;
  votes: number;
  voted: boolean;
  disabled: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending || disabled}
      aria-pressed={voted}
      onClick={() => startTransition(() => voteChallengeEntryAction(entryId).then(() => undefined))}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
        voted
          ? "bg-rose-600 text-white"
          : "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      <span aria-hidden>♥</span>
      <span className="tabular-nums">{votes}</span>
    </button>
  );
}
