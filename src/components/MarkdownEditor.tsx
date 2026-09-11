"use client";

import { useId, useRef, useState } from "react";
import { MarkdownContent } from "@/components/MarkdownContent";

/**
 * The composer used everywhere someone writes a post: a textarea with a
 * formatting toolbar and a preview tab.
 *
 * It stays an ordinary uncontrolled `<textarea name=...>` underneath, so every
 * form that already posts to a server action keeps working untouched — the
 * toolbar only edits the text in place.
 *
 * Edits go through `document.execCommand("insertText")` where the browser still
 * supports it. That API is deprecated, but it is the only way to change a
 * textarea's value and keep the native undo stack: without it, one Ctrl+Z after
 * pressing Bold wipes everything the person typed. The direct-assignment branch
 * below is the fallback for browsers that have dropped it.
 */

type Props = {
  name: string;
  id?: string;
  rows?: number;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  /** Buttons that only make sense in a full post, not a one-line reply. */
  compact?: boolean;
};

type Wrap = { kind: "wrap"; before: string; after: string; placeholder: string };
type Prefix = { kind: "prefix"; prefix: string; placeholder: string };
type Action = Wrap | Prefix;

const BOLD: Wrap = { kind: "wrap", before: "**", after: "**", placeholder: "bold text" };
const ITALIC: Wrap = { kind: "wrap", before: "*", after: "*", placeholder: "italic text" };
const CODE: Wrap = { kind: "wrap", before: "`", after: "`", placeholder: "code" };

export function MarkdownEditor({
  name,
  id,
  rows = 5,
  required,
  minLength,
  placeholder,
  defaultValue,
  className,
  compact,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [preview, setPreview] = useState("");

  function apply(action: Action) {
    const el = ref.current;
    if (!el) return;
    el.focus();

    const { selectionStart: start, selectionEnd: end, value } = el;

    if (action.kind === "prefix") {
      // Line prefixes (quote, list, heading) apply to every line the selection
      // touches, and toggle off when they are already there.
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = end === start ? value.indexOf("\n", start) : value.indexOf("\n", end);
      const stop = lineEnd === -1 ? value.length : lineEnd;
      const block = value.slice(lineStart, stop) || action.placeholder;

      const lines = block.split("\n");
      const allPrefixed = lines.every((l) => l.startsWith(action.prefix));
      const next = lines
        .map((l) => (allPrefixed ? l.slice(action.prefix.length) : action.prefix + l))
        .join("\n");

      select(el, lineStart, stop);
      insert(el, next);
      return;
    }

    const selected = value.slice(start, end);
    const { before, after } = action;

    // Pressing Bold on text that is already bold removes the markers rather
    // than nesting a second pair that renders as literal asterisks.
    const outerStart = start - before.length;
    const wrappedOutside =
      outerStart >= 0 &&
      value.slice(outerStart, start) === before &&
      value.slice(end, end + after.length) === after;

    if (wrappedOutside) {
      select(el, outerStart, end + after.length);
      insert(el, selected);
      select(el, outerStart, outerStart + selected.length);
      return;
    }
    if (selected.startsWith(before) && selected.endsWith(after) && selected.length > before.length + after.length) {
      insert(el, selected.slice(before.length, selected.length - after.length));
      return;
    }

    const body = selected || action.placeholder;
    insert(el, before + body + after);
    // With nothing selected, leave the placeholder highlighted so the next
    // keystroke replaces it.
    if (!selected) select(el, start + before.length, start + before.length + body.length);
  }

  function link() {
    const el = ref.current;
    if (!el) return;
    el.focus();
    const { selectionStart: start, selectionEnd: end, value } = el;
    const selected = value.slice(start, end);
    const looksLikeUrl = /^https?:\/\/\S+$/.test(selected.trim());

    if (looksLikeUrl) {
      // Pasted a URL then pressed Link: keep it as the target and put the
      // cursor where the label goes.
      insert(el, `[label](${selected.trim()})`);
      select(el, start + 1, start + 6);
      return;
    }
    const label = selected || "link text";
    insert(el, `[${label}](https://)`);
    const urlAt = start + label.length + 3;
    select(el, urlAt + 8, urlAt + 8);
  }

  const buttons: { label: string; title: string; run: () => void; text: string }[] = [
    { label: "Bold", title: "Bold (Ctrl/Cmd+B)", run: () => apply(BOLD), text: "B" },
    { label: "Italic", title: "Italic (Ctrl/Cmd+I)", run: () => apply(ITALIC), text: "I" },
    { label: "Link", title: "Link (Ctrl/Cmd+K)", run: link, text: "🔗" },
    { label: "Inline code", title: "Inline code", run: () => apply(CODE), text: "</>" },
    {
      label: "Quote",
      title: "Blockquote",
      run: () => apply({ kind: "prefix", prefix: "> ", placeholder: "quoted text" }),
      text: "❝",
    },
    {
      label: "Bulleted list",
      title: "Bulleted list",
      run: () => apply({ kind: "prefix", prefix: "- ", placeholder: "list item" }),
      text: "•",
    },
  ];
  if (!compact) {
    buttons.push({
      label: "Heading",
      title: "Heading",
      run: () => apply({ kind: "prefix", prefix: "## ", placeholder: "Heading" }),
      text: "H",
    });
  }

  const btnClass =
    "flex h-8 min-w-8 items-center justify-center rounded px-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100";

  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-brand-500 dark:border-slate-600 dark:bg-slate-950">
      <div
        role="toolbar"
        aria-label="Formatting"
        aria-controls={textareaId}
        className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 px-1.5 py-1 dark:border-slate-800 dark:bg-slate-900"
      >
        {buttons.map((b) => (
          <button
            key={b.label}
            type="button"
            title={b.title}
            aria-label={b.label}
            // Keep the caret where it is: a plain click would blur the textarea
            // first and collapse the selection the button is meant to act on.
            onMouseDown={(e) => e.preventDefault()}
            onClick={b.run}
            disabled={tab === "preview"}
            className={`${btnClass} disabled:opacity-40`}
          >
            {b.text}
          </button>
        ))}

        <div className="ml-auto flex gap-0.5">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                if (t === "preview") setPreview(ref.current?.value ?? "");
                setTab(t);
              }}
              aria-pressed={tab === t}
              className={`h-8 rounded px-2.5 text-xs font-semibold capitalize transition ${
                tab === t
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* The textarea stays mounted while previewing — unmounting it would drop
          the draft out of the form on submit and lose the undo history. */}
      <div className={tab === "preview" ? "hidden" : undefined}>
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          rows={rows}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onKeyDown={(e) => {
            if (!(e.metaKey || e.ctrlKey)) return;
            const key = e.key.toLowerCase();
            if (key === "b") { e.preventDefault(); apply(BOLD); }
            else if (key === "i") { e.preventDefault(); apply(ITALIC); }
            else if (key === "k") { e.preventDefault(); link(); }
          }}
          className={
            className ??
            "w-full resize-y border-0 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none dark:text-slate-100"
          }
        />
      </div>

      {tab === "preview" && (
        <div className="px-3 py-2" style={{ minHeight: `${rows * 1.5}rem` }}>
          {preview.trim() ? (
            // The same component the thread page uses, so what you see here is
            // exactly what gets posted — a preview that renders through a
            // second code path is a preview that eventually lies.
            <MarkdownContent source={preview} />
          ) : (
            <p className="text-sm text-slate-400">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

/** Replace the current selection, preserving the browser's undo stack. */
function insert(el: HTMLTextAreaElement, text: string) {
  const ok = typeof document.execCommand === "function" && document.execCommand("insertText", false, text);
  if (!ok) {
    const { selectionStart: s, selectionEnd: e, value } = el;
    el.value = value.slice(0, s) + text + value.slice(e);
    el.setSelectionRange(s + text.length, s + text.length);
  }
  // React does not observe direct value writes; tell any listening form.
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

function select(el: HTMLTextAreaElement, start: number, end: number) {
  el.setSelectionRange(start, end);
}
