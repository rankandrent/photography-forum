"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { critiqueAction } from "@/actions/critiques";
import { idle } from "@/actions/types";
import { SubmitButton } from "@/components/SubmitButton";
import { FormError } from "@/components/FormError";
import { Avatar } from "@/components/Avatar";

export type CritiqueItem = {
  id: string;
  composition: number;
  lighting: number;
  editing: number;
  comment: string;
  author: { username: string; name: string | null; image: string | null };
};

const DIMENSIONS = [
  { key: "composition", label: "Composition", help: "Framing, balance, subject placement" },
  { key: "lighting", label: "Lighting", help: "Quality, direction, exposure" },
  { key: "editing", label: "Editing", help: "Colour, contrast, retouching" },
] as const;

function Stars({ value }: { value: number }) {
  return (
    <span className="tabular-nums text-amber-500" aria-label={`${value} out of 5`}>
      {"★".repeat(value)}
      <span className="text-slate-300 dark:text-slate-600">{"★".repeat(5 - value)}</span>
    </span>
  );
}

/**
 * Structured critique instead of "nice shot 🔥". Ratings per dimension force
 * the reviewer to say what actually worked, and the averages give the
 * photographer something to act on.
 */
export function CritiquePanel({
  photoId,
  critiques,
  canCritique,
  signedIn,
}: {
  photoId: string;
  critiques: CritiqueItem[];
  canCritique: boolean;
  signedIn: boolean;
}) {
  const [state, formAction] = useActionState(critiqueAction, idle);
  const [open, setOpen] = useState(false);

  const averages = DIMENSIONS.map((d) => ({
    ...d,
    avg:
      critiques.length === 0
        ? 0
        : critiques.reduce((sum, c) => sum + c[d.key], 0) / critiques.length,
  }));

  return (
    <section className="mt-3 rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Critique {critiques.length > 0 && <span className="text-slate-400">({critiques.length})</span>}
        </h3>
        {critiques.length > 0 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            {averages.map((d) => (
              <li key={d.key}>
                {d.label}{" "}
                <strong className="text-slate-800 tabular-nums dark:text-slate-200">
                  {d.avg.toFixed(1)}
                </strong>
                /5
              </li>
            ))}
          </ul>
        )}
      </header>

      {critiques.length > 0 && (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {critiques.map((c) => (
            <li key={c.id} className="px-4 py-3">
              <div className="mb-1.5 flex items-center gap-2">
                <Avatar user={c.author} size={24} />
                <Link
                  href={`/u/${c.author.username}`}
                  className="text-sm font-medium text-slate-800 hover:underline dark:text-slate-200"
                >
                  {c.author.name ?? c.author.username}
                </Link>
              </div>
              <ul className="mb-2 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                {DIMENSIONS.map((d) => (
                  <li key={d.key}>
                    {d.label} <Stars value={c[d.key]} />
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{c.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
        {!signedIn ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <Link href="/login" className="font-medium text-brand-600 hover:underline">
              Sign in
            </Link>{" "}
            to leave a critique.
          </p>
        ) : !canCritique ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This is your photo — you can&apos;t critique it.
          </p>
        ) : !open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            Write a critique →
          </button>
        ) : (
          <form action={formAction} className="space-y-3">
            <input type="hidden" name="photoId" value={photoId} />
            <div className="grid gap-3 sm:grid-cols-3">
              {DIMENSIONS.map((d) => (
                <fieldset key={d.key}>
                  <legend className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {d.label}
                  </legend>
                  <p className="mb-1 text-[11px] text-slate-400">{d.help}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <label key={n} className="cursor-pointer">
                        <input
                          type="radio"
                          name={d.key}
                          value={n}
                          required
                          className="peer sr-only"
                        />
                        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 text-xs text-slate-600 peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white dark:border-slate-600 dark:text-slate-400">
                          {n}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
            <textarea
              name="comment"
              rows={4}
              required
              minLength={30}
              placeholder="What works, what doesn't, and what you would change. Be specific — 'crop the empty space on the left' beats 'nice shot'."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950"
            />
            <FormError error={state.error} message={state.message} />
            <div className="flex gap-2">
              <SubmitButton pendingLabel="Saving…">Post critique</SubmitButton>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
