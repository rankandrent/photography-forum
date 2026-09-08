import { urlFor } from "@/lib/storage";
import { displayCamera } from "@/lib/exif";
import { exposureLine } from "@/lib/format";

export type PhotoRow = {
  id: string;
  displayKey: string;
  thumbKey: string;
  originalKey: string;
  width: number;
  height: number;
  caption: string | null;
  cameraMake: string | null;
  cameraModel: string | null;
  lensModel: string | null;
  focalLength: number | null;
  aperture: number | null;
  shutterSpeed: string | null;
  iso: number | null;
  takenAt: Date | null;
  cameraGear?: { slug: string; name: string } | null;
  lensGear?: { slug: string; name: string } | null;
};

export type PhotoView = {
  id: string;
  src: string;
  thumb: string;
  original: string;
  width: number;
  height: number;
  caption: string | null;
  camera: string | null;
  lens: string | null;
  exposure: string | null;
  takenAt: string | null;
  cameraGear: { slug: string; name: string } | null;
  lensGear: { slug: string; name: string } | null;
  hasExif: boolean;
};

/** Server rows -> plain objects safe to hand to a client component. */
export function toPhotoView(photo: PhotoRow): PhotoView {
  const camera = displayCamera(photo.cameraMake, photo.cameraModel);
  const exposure = exposureLine(photo);
  return {
    id: photo.id,
    src: urlFor(photo.displayKey),
    thumb: urlFor(photo.thumbKey),
    original: urlFor(photo.originalKey),
    width: photo.width,
    height: photo.height,
    caption: photo.caption,
    camera,
    lens: photo.lensModel,
    exposure,
    takenAt: photo.takenAt ? photo.takenAt.toISOString() : null,
    cameraGear: photo.cameraGear ?? null,
    lensGear: photo.lensGear ?? null,
    hasExif: Boolean(camera || photo.lensModel || exposure),
  };
}

export const PHOTO_SELECT = {
  id: true,
  displayKey: true,
  thumbKey: true,
  originalKey: true,
  width: true,
  height: true,
  caption: true,
  cameraMake: true,
  cameraModel: true,
  lensModel: true,
  focalLength: true,
  aperture: true,
  shutterSpeed: true,
  iso: true,
  takenAt: true,
  cameraGear: { select: { slug: true, name: true } },
  lensGear: { select: { slug: true, name: true } },
} as const;
