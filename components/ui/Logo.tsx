/** Brand mark (a "U" drawn as a pen-tool path with anchor points) plus the "uiux design" wordmark. */
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

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo__word" aria-hidden="true"><b>uiux</b> design</span>
      <span className="visually-hidden">UI UX Design Services</span>
    </span>
  );
}
