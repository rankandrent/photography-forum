import Link from "next/link";
import type { PhotoView } from "@/lib/photo-view";

/**
 * The feature that makes this a *photography* forum: every uploaded frame
 * shows the settings it was shot at, and the body/lens link into the gear pages.
 *
 * Each EXIF field gets its own labelled icon badge for instant visual scanning.
 * If EXIF was stripped before upload the strip gracefully hides itself.
 */
export function ExifStrip({ photo }: { photo: PhotoView }) {
  if (!photo.hasExif) {
    return (
      <p className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500">
        No EXIF data available for this image.
      </p>
    );
  }

  // Parse exposure into individual fields for separate badge rendering
  const exposureParts = photo.exposure?.split(" · ") ?? [];
  const focalLength = exposureParts.find((p) => p.endsWith("mm")) ?? null;
  const aperture = exposureParts.find((p) => p.startsWith("f/")) ?? null;
  const shutterSpeed = exposureParts.find((p) => p.startsWith("1/") || p.endsWith("s")) ?? null;
  const iso = exposureParts.find((p) => p.startsWith("ISO")) ?? null;

  return (
    <div className="flex flex-wrap items-center gap-2 px-3 py-2.5">
      {/* Camera Body */}
      {photo.camera && (
        <Badge
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          }
          label="Camera"
          value={
            photo.cameraGear ? (
              <Link className="hover:text-sky-500 hover:underline" href={`/gear/${photo.cameraGear.slug}`}>
                {photo.cameraGear.name}
              </Link>
            ) : (
              photo.camera
            )
          }
        />
      )}

      {/* Lens */}
      {photo.lens && (
        <Badge
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          }
          label="Lens"
          value={
            photo.lensGear ? (
              <Link className="hover:text-sky-500 hover:underline" href={`/gear/${photo.lensGear.slug}`}>
                {photo.lensGear.name}
              </Link>
            ) : (
              photo.lens
            )
          }
        />
      )}

      {/* Focal Length */}
      {focalLength && (
        <Badge
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 12H3M21 12l-4-4m4 4l-4 4M3 12l4-4m-4 4l4 4" />
            </svg>
          }
          label="Focal"
          value={focalLength}
        />
      )}

      {/* Aperture */}
      {aperture && (
        <Badge
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
            </svg>
          }
          label="Aperture"
          value={aperture}
        />
      )}

      {/* Shutter Speed */}
      {shutterSpeed && (
        <Badge
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
          label="Shutter"
          value={shutterSpeed}
        />
      )}

      {/* ISO */}
      {iso && (
        <Badge
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.64-6.36l-.7.7M6.34 17.66l-.7.7m0-12.72l.7.7m11.32 11.32l.7.7" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          }
          label="ISO"
          value={iso}
        />
      )}
    </div>
  );
}

/** Reusable individual metadata badge pill */
function Badge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
      <span className="shrink-0 text-slate-400 dark:text-slate-500">{icon}</span>
      <span className="sr-only">{label}:</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}
