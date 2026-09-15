"use client";

import { useActionState, useState } from "react";
import { createThreadAction } from "@/actions/threads";
import { idle } from "@/actions/types";
import { SubmitButton } from "@/components/SubmitButton";
import { FormError } from "@/components/FormError";
import { ImagePicker } from "@/components/ImagePicker";
import { MarkdownEditor } from "@/components/MarkdownEditor";

const KINDS = [
  { value: "DISCUSSION", label: "Discussion", help: "A question or conversation" },
  { value: "CRITIQUE", label: "Critique request", help: "Ask for structured feedback on a photo" },
  { value: "SHOWCASE", label: "Showcase", help: "Share work you are proud of" },
] as const;

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100";

export function NewThreadForm({
  categories,
  defaultCategoryId,
}: {
  categories: { id: string; name: string; slug: string; section: string }[];
  defaultCategoryId?: string;
}) {
  const [state, formAction] = useActionState(createThreadAction, idle);
  const [kind, setKind] = useState<string>("DISCUSSION");

  return (
    <form action={formAction} className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          What are you posting?
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {KINDS.map((k) => (
            <label
              key={k.value}
              className={`cursor-pointer rounded-xl border p-3 transition ${
                kind === k.value
                  ? "border-brand-600 bg-brand-50 dark:bg-brand-600/10"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
              }`}
            >
              <input
                type="radio"
                name="kind"
                value={k.value}
                checked={kind === k.value}
                onChange={() => setKind(k.value)}
                className="sr-only"
              />
              <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                {k.label}
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{k.help}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="categoryId" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Category
        </label>
        <select id="categoryId" name="categoryId" defaultValue={defaultCategoryId} required className={input}>
          {/* Grouped so twenty-odd boards stay scannable in a native select. */}
          {[...new Set(categories.map((c) => c.section))].map((section) => (
            <optgroup key={section} label={section}>
              {categories
                .filter((c) => c.section === section)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          minLength={8}
          maxLength={140}
          placeholder="Be specific — 'Why are my indoor portraits soft at f/1.8?'"
          className={input}
        />
      </div>

      <div>
        <label htmlFor="body" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Body
        </label>
        <MarkdownEditor
          id="body"
          name="body"
          rows={10}
          required
          minLength={10}
          placeholder="Ask your question, or share what you have found. Use the toolbar above to format."
        />
      </div>

      <div>
        <label htmlFor="tags" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Tags <span className="font-normal text-slate-400">(comma separated, up to 5)</span>
        </label>
        <input id="tags" name="tags" placeholder="portrait, low-light, 50mm" className={input} />
      </div>

      <ImagePicker
        hint={
          kind === "DISCUSSION"
            ? "Optional. JPEG, PNG or WebP up to 15 MB each."
            : "Required for critique and showcase posts. EXIF is read automatically."
        }
      />

      <FormError error={state.error} />
      <SubmitButton pendingLabel="Posting…">Post thread</SubmitButton>
    </form>
  );
}
