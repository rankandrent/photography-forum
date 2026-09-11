"use client";

import { useCallback, useEffect, useState } from "react";
import type { PhotoView } from "@/lib/photo-view";

/**
 * Thumbnail grid + lightbox. Images are lazy and sized from the stored
 * dimensions so the layout never jumps while they load (CLS is a ranking
 * signal, and a photo forum is nothing but images).
 */
export function PhotoGallery({ photos, context }: { photos: PhotoView[]; context?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /**
   * Most uploads have no caption, and `alt=""` marks an image as decorative —
   * wrong here, where the photograph *is* the post. Fall back to the thread or
   * gear name plus the camera the shot came from, which is both a truthful
   * description for a screen reader and the text image search indexes on.
   */
  const describe = (photo: PhotoView, index: number) => {
    if (photo.caption) return photo.caption;
    const subject = context ?? "Member photo";
    const nth = photos.length > 1 ? ` (${index + 1} of ${photos.length})` : "";
    // The gear pages already name the camera in their context string; repeating
    // it would read as "…Canon EOS R5 — shot on Canon EOS R5".
    const camera = photo.camera && !subject.includes(photo.camera) ? photo.camera : null;
    return camera ? `${subject} — shot on ${camera}${nth}` : `${subject}${nth}`;
  };

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? null : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  if (photos.length === 0) return null;
  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <div
        className={
          photos.length === 1
            ? "grid grid-cols-1 gap-3"
            : "grid grid-cols-2 gap-3 sm:grid-cols-3"
        }
      >
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800"
            aria-label={`Open photo: ${describe(photo, index)}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos.length === 1 ? photo.src : photo.thumb}
              alt={describe(photo, index)}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              style={{ aspectRatio: photos.length === 1 ? `${photo.width}/${photo.height}` : "4/3" }}
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4"
          onClick={close}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden">
            {photos.length > 1 && (
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={describe(active, openIndex ?? 0)}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full object-contain"
            />
            {photos.length > 1 && (
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          <div className="mx-auto max-w-3xl pt-3 text-center text-sm text-white/70">
            {active.caption && <p className="mb-1 text-white">{active.caption}</p>}
            {active.hasExif && (
              <p className="font-mono text-xs">
                {[active.camera, active.lens, active.exposure].filter(Boolean).join("  ·  ")}
              </p>
            )}
            <a
              href={active.original}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-block text-xs underline hover:text-white"
            >
              View full resolution
            </a>
          </div>
        </div>
      )}
    </>
  );
}
