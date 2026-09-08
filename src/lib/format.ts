export function timeAgo(date: Date | string): string {
  const then = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - then.getTime()) / 1000);
  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [3600, "minute"],
    [86400, "hour"],
    [604800, "day"],
    [2629800, "week"],
    [31557600, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];
  const divisors = [1, 60, 3600, 86400, 604800, 2629800, 31557600];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (let i = 0; i < units.length; i++) {
    if (Math.abs(seconds) < units[i][0]) {
      return rtf.format(-Math.round(seconds / divisors[i]), units[i][1]);
    }
  }
  return then.toDateString();
}

export function compact(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

export function exposureLine(photo: {
  focalLength: number | null;
  aperture: number | null;
  shutterSpeed: string | null;
  iso: number | null;
}): string | null {
  const parts = [
    photo.focalLength ? `${Math.round(photo.focalLength)}mm` : null,
    photo.aperture ? `f/${photo.aperture}` : null,
    photo.shutterSpeed,
    photo.iso ? `ISO ${photo.iso}` : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : null;
}
