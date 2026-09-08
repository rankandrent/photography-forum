"use client";

import { useRef, useState } from "react";

const MAX_MB = 15;

/**
 * File input with client-side previews and size checks. The server validates
 * again in lib/photos.ts — this only saves the user a failed round trip.
 */
export function ImagePicker({
  name = "photos",
  multiple = true,
  label = "Add photos",
  hint = "JPEG, PNG or WebP up to 15 MB. EXIF is read automatically.",
}: {
  name?: string;
  multiple?: boolean;
  label?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const tooBig = files.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" is larger than ${MAX_MB} MB.`);
      event.target.value = "";
      setPreviews([]);
      return;
    }
    setError(null);
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews(files.map((f) => ({ url: URL.createObjectURL(f), name: f.name })));
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        name={name}
        multiple={multiple}
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={onChange}
        className="block w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-white p-3 text-sm text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-700 hover:border-brand-500 dark:border-slate-600 dark:bg-slate-900 dark:file:bg-slate-800 dark:file:text-brand-100"
      />
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{hint}</p>
      {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}

      {previews.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {previews.map((p) => (
            <li key={p.url} className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.name} className="h-20 w-20 object-cover" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
