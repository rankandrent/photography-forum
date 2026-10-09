/** Brand mark (a "U" drawn as a pen-tool path with anchor points) plus the wordmark.
 * The wordmark is an image (vector paths, no text) so search engines read the brand as
 * "UI UX Design Services" (its alt) instead of the stylised "uiux design" letters. */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg className="logo__mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="#E2225F" />
      <path d="M10 9.5v6.5a6 6 0 0 0 12 0V9.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="7.4" y="6.9" width="5.2" height="5.2" rx="1.3" fill="#E2225F" stroke="#fff" strokeWidth="1.8" />
      <rect x="19.4" y="6.9" width="5.2" height="5.2" rx="1.3" fill="#E2225F" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16" cy="22" r="1.9" fill="#fff" />
    </svg>
  );
}

export function Logo({ size = 32, tone = "dark" }: { size?: number; tone?: "dark" | "light" }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo__img" src={`/brand/logo/wordmark-${tone}.svg`} alt="UI UX Design Services" width={516} height={114} />
    </span>
  );
}
