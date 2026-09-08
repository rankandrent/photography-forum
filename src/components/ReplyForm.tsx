"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPostAction } from "@/actions/posts";
import { idle } from "@/actions/types";
import { SubmitButton } from "@/components/SubmitButton";
import { FormError } from "@/components/FormError";
import { ImagePicker } from "@/components/ImagePicker";

export function ReplyForm({
  threadId,
  parentId,
  signedIn,
  locked,
  compact,
  onDone,
}: {
  threadId: string;
  parentId?: string;
  signedIn: boolean;
  locked: boolean;
  compact?: boolean;
  onDone?: () => void;
}) {
  const [state, formAction] = useActionState(createPostAction, idle);
  const formRef = useRef<HTMLFormElement>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setShowUpload(false);
      onDone?.();
    }
  }, [state.ok, onDone]);

  if (locked) {
    return (
      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
        This thread is locked. New replies are closed.
      </p>
    );
  }

  if (!signedIn) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        <Link href="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>{" "}
        or{" "}
        <Link href="/register" className="font-medium text-brand-600 hover:underline">
          create an account
        </Link>{" "}
        to join the discussion.
      </p>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <input type="hidden" name="threadId" value={threadId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <label htmlFor={`reply-${parentId ?? threadId}`} className="sr-only">
        Your reply
      </label>
      <textarea
        id={`reply-${parentId ?? threadId}`}
        name="body"
        rows={compact ? 3 : 5}
        required
        placeholder={parentId ? "Write a reply…" : "Share what you know. Markdown supported."}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
      />

      {showUpload ? (
        <ImagePicker label="Attach photos" hint="Up to 4 images, 15 MB each." />
      ) : (
        <button
          type="button"
          onClick={() => setShowUpload(true)}
          className="text-xs font-medium text-slate-500 hover:text-brand-600 dark:text-slate-400"
        >
          + Attach a photo
        </button>
      )}

      <FormError error={state.error} />
      <SubmitButton pendingLabel="Posting…">{parentId ? "Reply" : "Post reply"}</SubmitButton>
    </form>
  );
}
