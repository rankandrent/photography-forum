type Props = {
  user: { username: string; name: string | null; image: string | null };
  size?: number;
};

export function Avatar({ user, size = 32 }: Props) {
  // An uploaded photo always wins; the generated one is the fallback, and it
  // comes back the moment someone removes their photo.
  const src = user.image ?? `/api/avatar/${encodeURIComponent(user.username)}?size=${size * 2}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      // Requested at 2x so the SVG's own viewBox is generous on retina; the
      // element is still laid out at `size`, so nothing shifts.
      className="shrink-0 rounded-full bg-slate-100 object-cover dark:bg-slate-800"
      style={{ width: size, height: size }}
    />
  );
}
