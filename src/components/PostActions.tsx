"use client";

import { useActionState, useState, useTransition } from "react";
import { deletePostAction, markAnswerAction, updatePostAction } from "@/actions/posts";
import { reportAction } from "@/actions/moderation";
import { idle } from "@/actions/types";
import { SubmitButton } from "@/components/SubmitButton";
import { FormError } from "@/components/FormError";

const link = "text-xs font-medium text-slate-500 hover:text-brand-600 dark:text-slate-400";

export function PostActions({
  postId,
  body,
  isAnswer,
  canEdit,
  canAcceptAnswer,
  signedIn,
}: {
  postId: string;
  body: string;
  isAnswer: boolean;
  canEdit: boolean;
  canAcceptAnswer: boolean;
  signedIn: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [editState, editAction] = useActionState(updatePostAction, idle);
  const [reportState, reportFormAction] = useActionState(reportAction, idle);

  return (
    <div className="mt-2 space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        {canAcceptAnswer && (
          <button
            type="button"
            disabled={pending}
            className={link}
            onClick={() => startTransition(() => markAnswerAction(postId).then(() => undefined))}
          >
            {isAnswer ? "Unaccept answer" : "Accept as answer"}
          </button>
        )}
        {canEdit && (
          <>
            <button type="button" className={link} onClick={() => setEditing((v) => !v)}>
              {editing ? "Cancel edit" : "Edit"}
            </button>
            <button
              type="button"
              disabled={pending}
              className="text-xs font-medium text-rose-500 hover:text-rose-600"
              onClick={() => {
                if (!confirm("Delete this reply?")) return;
                startTransition(() => deletePostAction(postId).then(() => undefined));
              }}
            >
              Delete
            </button>
          </>
        )}
        {signedIn && !canEdit && (
          <button type="button" className={link} onClick={() => setReporting((v) => !v)}>
            Report
          </button>
        )}
      </div>

      {editing && (
        <form action={editAction} className="space-y-2">
          <input type="hidden" name="postId" value={postId} />
          <textarea
            name="body"
            defaultValue={body}
            rows={5}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950"
          />
          <FormError error={editState.error} message={editState.message} />
          <SubmitButton pendingLabel="Saving…">Save changes</SubmitButton>
        </form>
      )}

      {reporting && (
        <form action={reportFormAction} className="space-y-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <input type="hidden" name="postId" value={postId} />
          <label htmlFor={`report-${postId}`} className="block text-xs font-medium">
            Why are you reporting this?
          </label>
          <input
            id={`report-${postId}`}
            name="reason"
            required
            minLength={5}
            placeholder="Spam, harassment, stolen photo…"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
          />
          <FormError error={reportState.error} message={reportState.message} />
          <SubmitButton pendingLabel="Sending…">Send report</SubmitButton>
        </form>
      )}
    </div>
  );
}
