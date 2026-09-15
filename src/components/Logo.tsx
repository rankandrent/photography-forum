/**
 * The forum mark: a camera aperture set inside a speech bubble — photography,
 * and people talking about it. Kept in sync with app/icon.svg (the favicon).
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="pf-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* speech bubble */}
      <path
        d="M6 3h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H14l-6 5v-5H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
        fill="url(#pf-logo-bg)"
      />
      {/* aperture */}
      <circle cx="16" cy="14" r="7.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <g stroke="#fff" strokeWidth="1.4" strokeLinecap="round">
        <path d="M16 6.5 19.6 12.2" />
        <path d="M22.5 10.3 19.4 16.2" />
        <path d="M22.5 17.7 16 17.8" />
        <path d="M16 21.5 12.4 15.8" />
        <path d="M9.5 17.7 12.6 11.8" />
        <path d="M9.5 10.3 16 10.2" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark />
      <span className="text-lg font-bold tracking-tight">
        Photography<span className="text-brand-600">Forum</span>
      </span>
    </span>
  );
}
