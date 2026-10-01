/** Small illustration for a process step, picked from the step title. */
export type Kind = "research" | "tree" | "wireframe" | "test" | "ui" | "handoff" | "report";

const ORDER: Kind[] = ["research", "tree", "wireframe", "test", "ui", "handoff", "report"];

const RULES: [RegExp, Kind][] = [
  [/handoff|hand-off|launch|deliver|build|develop|implementation|qa/i, "handoff"],
  [/test|usability|validat|feedback|review|iterat/i, "test"],
  [/information architecture|\bia\b|kpi|mapping|structure|sitemap|navigation/i, "tree"],
  [/wireframe|prototype|\bflows?\b|sketch|concept/i, "wireframe"],
  [/visual|\bui\b|component|design system|token|brand|style|motion|interaction/i, "ui"],
  [/synthes|report|roadmap|readout|scor|prioriti|recommend|plan/i, "report"],
  [/discover|research|kick|framing|interview|audit|goal|recruit|fieldwork|study|studies/i, "research"],
];

export const stepKind = (title: string, i: number): Kind => RULES.find(([re]) => re.test(title))?.[1] ?? ORDER[i % ORDER.length];

/** One illustration per step, without repeats: a duplicate takes the next unused kind */
export function stepKinds(titles: string[]): Kind[] {
  const used = new Set<Kind>();
  return titles.map((t, i) => {
    let k = stepKind(t, i);
    if (used.has(k)) k = ORDER.find((o) => !used.has(o)) ?? k;
    used.add(k);
    return k;
  });
}

export function StepArt({ kind }: { kind: Kind }) {
  const c = "#E2225F";
  const soft = "#FFE3EC";
  const g = "#E8E8EB";
  return (
    <svg viewBox="0 0 320 170" className="stepart" aria-hidden="true">
      <rect width="320" height="170" rx="16" fill="#F7F6F9" />
      {kind === "research" && (
        <g>
          <rect x="40" y="34" width="150" height="38" rx="12" fill="#fff" stroke={g} />
          <circle cx="62" cy="53" r="10" fill={soft} />
          <rect x="80" y="46" width="90" height="6" rx="3" fill="#C9C9D0" />
          <rect x="80" y="57" width="60" height="6" rx="3" fill={g} />
          <rect x="120" y="86" width="150" height="38" rx="12" fill={c} />
          <rect x="136" y="98" width="96" height="6" rx="3" fill="#fff" opacity=".85" />
          <rect x="136" y="109" width="64" height="6" rx="3" fill="#fff" opacity=".55" />
          <circle cx="248" cy="52" r="20" fill="none" stroke="#1A1A1F" strokeWidth="5" />
          <path d="m262 66 14 14" stroke="#1A1A1F" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {kind === "tree" && (
        <g stroke="#C9C9D0" strokeWidth="2" fill="none">
          <path d="M160 52v18M90 70h140M90 70v16M160 70v16M230 70v16M90 112v12M60 124h60M60 124v8M120 124v8" />
          <rect x="128" y="24" width="64" height="28" rx="8" fill={c} stroke="none" />
          {[90, 160, 230].map((x) => <rect key={x} x={x - 30} y="86" width="60" height="26" rx="8" fill="#fff" stroke={g} />)}
          {[60, 120].map((x) => <rect key={x} x={x - 22} y="132" width="44" height="20" rx="6" fill={soft} stroke="none" />)}
        </g>
      )}
      {kind === "wireframe" && (
        <g>
          <rect x="40" y="24" width="150" height="122" rx="10" fill="#fff" stroke={g} />
          <rect x="52" y="36" width="126" height="40" rx="6" fill={g} />
          <path d="m52 36 126 40M178 36 52 76" stroke="#D4D4DA" />
          <rect x="52" y="86" width="80" height="7" rx="3.5" fill="#C9C9D0" />
          <rect x="52" y="99" width="110" height="7" rx="3.5" fill={g} />
          <rect x="52" y="120" width="56" height="16" rx="8" fill={c} />
          <rect x="206" y="40" width="74" height="106" rx="12" fill="#fff" stroke={g} />
          <rect x="216" y="52" width="54" height="28" rx="5" fill={soft} />
          <rect x="216" y="88" width="40" height="6" rx="3" fill="#C9C9D0" />
          <rect x="216" y="100" width="54" height="6" rx="3" fill={g} />
          <path d="M190 84h16" stroke={c} strokeWidth="2.5" strokeDasharray="4 4" />
        </g>
      )}
      {kind === "test" && (
        <g>
          <rect x="40" y="28" width="150" height="116" rx="12" fill="#fff" stroke={g} />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(54 ${44 + i * 32})`}>
              <circle cx="10" cy="10" r="10" fill={i < 2 ? c : g} />
              {i < 2 && <path d="m5 10 3.5 3.5L15 7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
              <rect x="30" y="6" width={i === 1 ? 70 : 90} height="8" rx="4" fill={i < 2 ? "#C9C9D0" : g} />
            </g>
          ))}
          {[222, 252, 282].map((x, i) => (
            <g key={x}>
              <circle cx={x - 6} cy="70" r="16" fill={i === 1 ? soft : "#fff"} stroke={g} />
              <circle cx={x - 6} cy="65" r="5" fill="#9A9AA3" />
              <path d={`M${x - 15} 79a9 7 0 0 1 18 0`} fill="#9A9AA3" />
            </g>
          ))}
          <rect x="206" y="100" width="84" height="26" rx="13" fill="#1A1A1F" />
          <rect x="220" y="110" width="56" height="6" rx="3" fill="#fff" opacity=".8" />
        </g>
      )}
      {kind === "ui" && (
        <g>
          {[c, "#1A1A1F", "#0A84FF", "#F2B705"].map((f, i) => <circle key={f} cx={60 + i * 34} cy="48" r="14" fill={f} />)}
          <rect x="40" y="80" width="130" height="64" rx="12" fill="#fff" stroke={g} />
          <rect x="54" y="94" width="60" height="8" rx="4" fill="#1A1A1F" />
          <rect x="54" y="108" width="90" height="6" rx="3" fill={g} />
          <rect x="54" y="122" width="46" height="14" rx="7" fill={c} />
          <rect x="190" y="30" width="90" height="34" rx="17" fill={c} />
          <rect x="210" y="44" width="50" height="6" rx="3" fill="#fff" />
          <rect x="190" y="76" width="90" height="34" rx="17" fill="#fff" stroke={g} />
          <rect x="210" y="90" width="50" height="6" rx="3" fill="#9A9AA3" />
          <rect x="190" y="122" width="40" height="22" rx="11" fill={soft} />
          <rect x="238" y="122" width="42" height="22" rx="6" fill="#fff" stroke={g} />
        </g>
      )}
      {kind === "handoff" && (
        <g>
          <rect x="40" y="26" width="120" height="118" rx="12" fill="#fff" stroke={g} />
          <rect x="54" y="40" width="92" height="50" rx="8" fill={soft} />
          <rect x="54" y="100" width="70" height="7" rx="3.5" fill="#C9C9D0" />
          <rect x="54" y="113" width="50" height="7" rx="3.5" fill={g} />
          <path d="M172 85h28" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <path d="m192 77 8 8-8 8" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="210" y="40" width="80" height="90" rx="12" fill="#1A1A1F" />
          <path d="m232 70-10 12 10 12M268 70l10 12-10 12" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m254 66-8 32" stroke={c} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {kind === "report" && (
        <g>
          <rect x="40" y="26" width="240" height="118" rx="12" fill="#fff" stroke={g} />
          {[46, 70, 34, 88, 60].map((h, i) => <rect key={i} x={62 + i * 28} y={124 - h} width="16" height={h} rx="4" fill={i === 3 ? c : soft} />)}
          <rect x="214" y="44" width="50" height="8" rx="4" fill="#1A1A1F" />
          <rect x="214" y="60" width="40" height="6" rx="3" fill="#C9C9D0" />
          <rect x="214" y="84" width="50" height="22" rx="11" fill={c} />
          <path d="M62 54 100 44l28 10 40-18" stroke="#1A1A1F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
