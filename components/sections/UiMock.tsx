/** Decorative app-window illustration used when a service has no case-study image. */
const TINTS: Record<string, [string, string]> = {
  "Research & strategy": ["#E2225F", "#FFE3EC"],
  "Product design": ["#6C3BFF", "#ECE5FF"],
  Platforms: ["#0A84FF", "#E1EFFF"],
  "Dashboards & data": ["#0F9D76", "#DDF5EC"],
  "Industry-specific": ["#F2711C", "#FFEBDD"],
};

export function UiMock({ category, label }: { category?: string; label: string }) {
  const [c, soft] = TINTS[category ?? ""] ?? TINTS["Research & strategy"];
  const bars = [52, 78, 40, 96, 64, 118, 86];
  return (
    <svg viewBox="0 0 560 400" role="img" aria-label={label} className="uimock">
      <defs>
        <linearGradient id="uimock-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={soft} />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="560" height="400" rx="24" fill="url(#uimock-bg)" />
      <g transform="translate(40 40)">
        <rect width="480" height="320" rx="16" fill="#fff" stroke="#E8E8EB" />
        <rect width="480" height="36" rx="16" fill="#F7F7F8" />
        <circle cx="20" cy="18" r="5" fill="#FF5F57" />
        <circle cx="38" cy="18" r="5" fill="#FEBC2E" />
        <circle cx="56" cy="18" r="5" fill="#28C840" />
        <rect x="16" y="52" width="96" height="252" rx="10" fill="#F7F7F8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="28" y={70 + i * 30} width={i === 1 ? 72 : 60} height="10" rx="5" fill={i === 1 ? c : "#E2E2E6"} />
        ))}
        <rect x="128" y="52" width="104" height="64" rx="10" fill={c} />
        <rect x="140" y="66" width="44" height="8" rx="4" fill="#fff" opacity=".7" />
        <rect x="140" y="84" width="64" height="16" rx="5" fill="#fff" />
        <rect x="244" y="52" width="104" height="64" rx="10" fill="#F7F7F8" />
        <rect x="256" y="66" width="44" height="8" rx="4" fill="#D4D4DA" />
        <rect x="256" y="84" width="56" height="16" rx="5" fill="#9A9AA3" />
        <rect x="360" y="52" width="104" height="64" rx="10" fill="#F7F7F8" />
        <rect x="372" y="66" width="44" height="8" rx="4" fill="#D4D4DA" />
        <rect x="372" y="84" width="60" height="16" rx="5" fill="#9A9AA3" />
        <rect x="128" y="128" width="336" height="176" rx="10" fill="#fff" stroke="#EFEFF2" />
        {bars.map((h, i) => (
          <rect key={i} x={152 + i * 44} y={284 - h} width="24" height={h} rx="6" fill={i === 5 ? c : soft} />
        ))}
        <path d="M152 210 C 200 170, 240 200, 290 160 S 380 150, 440 140" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(372 300)">
        <rect width="160" height="72" rx="14" fill="#fff" stroke="#E8E8EB" />
        <circle cx="30" cy="36" r="14" fill={soft} />
        <path d="m24 36 4 4 8-8" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="54" y="26" width="84" height="8" rx="4" fill="#1A1A1F" />
        <rect x="54" y="42" width="60" height="7" rx="3.5" fill="#C9C9D0" />
      </g>
    </svg>
  );
}
