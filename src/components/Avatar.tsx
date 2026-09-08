type Props = {
  user: { username: string; name: string | null; image: string | null };
  size?: number;
};

const PALETTE = ["bg-rose-500", "bg-amber-500", "bg-emerald-500", "bg-sky-500", "bg-violet-500", "bg-fuchsia-500"];

export function Avatar({ user, size = 32 }: Props) {
  const label = user.name ?? user.username;
  if (user.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  // Deterministic colour per user so avatars stay stable between renders.
  const hash = [...user.username].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${PALETTE[hash % PALETTE.length]}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {label.slice(0, 1).toUpperCase()}
    </span>
  );
}
