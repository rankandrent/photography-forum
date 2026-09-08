import Link from "next/link";
import type { PhotoView } from "@/lib/photo-view";

/**
 * The feature that makes this a *photography* forum: every uploaded frame
 * shows the settings it was shot at, and the body/lens link into the gear pages.
 */
export function ExifStrip({ photo }: { photo: PhotoView }) {
  if (!photo.hasExif) {
    return (
      <p className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500">
        No EXIF data — it was stripped before upload.
      </p>
    );
  }

  return (
    <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2 text-xs text-slate-600 dark:text-slate-400">
      {photo.camera && (
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Camera</dt>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <dd className="font-medium">
            {photo.cameraGear ? (
              <Link className="hover:text-brand-600 hover:underline" href={`/gear/${photo.cameraGear.slug}`}>
                {photo.cameraGear.name}
              </Link>
            ) : (
              photo.camera
            )}
          </dd>
        </div>
      )}
      {photo.lens && (
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Lens</dt>
          <dd>
            {photo.lensGear ? (
              <Link className="hover:text-brand-600 hover:underline" href={`/gear/${photo.lensGear.slug}`}>
                {photo.lensGear.name}
              </Link>
            ) : (
              photo.lens
            )}
          </dd>
        </div>
      )}
      {photo.exposure && (
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Exposure</dt>
          <dd className="font-mono tabular-nums">{photo.exposure}</dd>
        </div>
      )}
    </dl>
  );
}
