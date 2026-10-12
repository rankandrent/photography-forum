// Builds the right-hand illustration of each location page's definition section:
// the city's skyline and landmark behind a product screen that shows the three
// scenes from the page's own definition answer (content/locations/*.json → visual).
// Output: public/locations/<slug>.svg. Runs before `next build`.
import fs from "node:fs";
import path from "node:path";

const DIR = "content/locations";
const OUT = "public/locations";
const W = 880, H = 628, BASE = 610; // 7:5, the .semv__visual frame
const PINK = "#E2225F", TINT = "#FFE3EC", INK = "#020101";
const SKY = "#F9D3E0", MARK = "#EC8DAE";

// 24×24 stroke icons
const ICONS = {
  leaf: "M5 19c0-8 5-13 14-14-1 9-6 14-14 14zM5 19l7-7",
  flask: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9",
  cross: "M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3zM12 8v8M8 12h8",
  card: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M7 15h4",
  truck: "M2 6h12v10H2zM14 10h4l3 3v3h-7M6 19a2 2 0 1 0 0-.1M17 19a2 2 0 1 0 0-.1",
  rocket: "M12 3c4 2 6 6 5 11l-2 3H9l-2-3c-1-5 1-9 5-11zM12 9.5a1.5 1.5 0 1 0 0 .1M9 17l-2 4M15 17l2 4",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
  chip: "M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4",
  robot: "M6 9h12v9H6zM12 5v4M9 13h.01M15 13h.01M10 16h4M3 12v3M21 12v3M12 4.5a.5.5 0 1 0 0 .1",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  cart: "M3 4h3l2 11h10l2-8H7M9 20a1 1 0 1 0 0-.1M17 20a1 1 0 1 0 0-.1",
  box: "M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8",
  bank: "M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18",
  phone: "M7 3h10v18H7zM11 18h2",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  wrench: "M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9a4 4 0 0 1-2-2z",
  play: "M4 5h16v14H4zM10 9l5 3-5 3z",
  game: "M6 8h12a4 4 0 0 1 0 8c-2 0-3-2-4-2h-4c-1 0-2 2-4 2a4 4 0 0 1 0-8zM8 11v2M7 12h2M15 11h.01M17 13h.01",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 1 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M16 5a3 3 0 0 1 0 6M18 15c2 .5 3 2 3 5",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v5M16 3v5M8 14h3",
  access: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM12 7.5a1 1 0 1 0 0 .1M8 10h8M12 10v4l-2 4M12 14l2 4",
  spark: "M12 3l2 6 6 3-6 3-2 6-2-6-6-3 6-3z",
  cloud: "M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 9a4.5 4.5 0 0 1 0 9z",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 15v2",
};

// Landmarks, drawn on the baseline; x is the left edge
const LANDMARKS = {
  arch: (x) => `<path d="M${x} ${BASE}C${x + 15} ${BASE - 300} ${x + 205} ${BASE - 300} ${x + 220} ${BASE}h-22C${x + 186} ${BASE - 250} ${x + 34} ${BASE - 250} ${x + 22} ${BASE}z" fill="${MARK}"/>`,
  bridge: (x) => `<path d="M${x} ${BASE - 70}h260v10H${x}z" fill="${MARK}"/>` +
    [x + 50, x + 200].map((t) => `<path d="M${t} ${BASE}V${BASE - 210}h14V${BASE}zM${t - 2} ${BASE - 170}h18v8h-18zM${t - 2} ${BASE - 120}h18v8h-18z" fill="${MARK}"/>`).join("") +
    `<path d="M${x} ${BASE - 80}Q${x + 30} ${BASE - 90} ${x + 57} ${BASE - 205}Q${x + 132} ${BASE - 80} ${x + 207} ${BASE - 205}Q${x + 235} ${BASE - 90} ${x + 260} ${BASE - 80}" fill="none" stroke="${MARK}" stroke-width="4"/>`,
  needle: (x) => `<path d="M${x + 56} ${BASE}l8-150h4l8 150zM${x + 20} ${BASE - 175}h92l-14 22H${x + 34}zM${x + 40} ${BASE - 196}h52l-6 21H${x + 46}zM${x + 64} ${BASE - 240}h4v44h-4z" fill="${MARK}"/>`,
  spire: (x) => `<path d="M${x} ${BASE}V${BASE - 120}h20v-40h16v-40h12v-30h4v-40h4v40h4v30h12v40h16v40h20V${BASE}z" fill="${MARK}"/>`,
  stepped: (x) => `<path d="M${x} ${BASE}V${BASE - 120}h24v-50h24v-40h40v40h24v50h24V${BASE}zM${x + 54} ${BASE - 210}v-30h4v30zM${x + 80} ${BASE - 210}v-30h4v30z" fill="${MARK}"/>`,
  capitol: (x) => `<path d="M${x} ${BASE}V${BASE - 70}h200V${BASE}zM${x + 70} ${BASE - 70}v-40h60v40zM${x + 64} ${BASE - 110}a36 36 0 0 1 72 0zM${x + 97} ${BASE - 146}v-30h6v30z" fill="${MARK}"/>`,
  dome: (x) => `<path d="M${x} ${BASE}V${BASE - 60}h260V${BASE}zM${x + 90} ${BASE - 60}v-30h80v30zM${x + 80} ${BASE - 90}a50 50 0 0 1 100 0zM${x + 125} ${BASE - 140}v-26h10v26z" fill="${MARK}"/>`,
  ball: (x) => `<path d="M${x + 40} ${BASE}l4-150h12l4 150z" fill="${MARK}"/><circle cx="${x + 50}" cy="${BASE - 180}" r="38" fill="${MARK}"/>`,
  bell: (x) => `<path d="M${x} ${BASE}V${BASE - 90}h50v-70h20l10-30 10 30h20v70h50V${BASE}z" fill="${MARK}"/>`,
  palms: (x) => [[x + 40, 200], [x + 110, 160], [x + 170, 230]].map(([p, h]) =>
    `<path d="M${p} ${BASE}q-6 ${-h / 2} 4 ${-h}" fill="none" stroke="${MARK}" stroke-width="8" stroke-linecap="round"/>` +
    `<path d="M${p + 4} ${BASE - h}q-30-10-50 10M${p + 4} ${BASE - h}q30-10 50 10M${p + 4} ${BASE - h}q-20-26-44-24M${p + 4} ${BASE - h}q20-26 44-24" fill="none" stroke="${MARK}" stroke-width="7" stroke-linecap="round"/>`).join(""),
  cactus: (x) => `<path d="M${x + 60} ${BASE}V${BASE - 170}a14 14 0 0 1 28 0V${BASE}zM${x + 60} ${BASE - 80}h-20a12 12 0 0 1-12-12v-40a10 10 0 0 1 20 0v32h12zM${x + 88} ${BASE - 100}h20v-40a10 10 0 0 1 20 0v48a12 12 0 0 1-12 12h-28z" fill="${MARK}"/><path d="M${x + 150} ${BASE}l30-70h90l30 70z" fill="${MARK}" opacity=".7"/>`,
  mountains: (x) => `<path d="M${x} ${BASE}l90-170 50 70 40-60 100 160z" fill="${MARK}"/><path d="M${x + 72} ${BASE - 136}L${x + 90} ${BASE - 170}L${x + 108} ${BASE - 136}L${x + 98} ${BASE - 128}L${x + 90} ${BASE - 138}L${x + 82} ${BASE - 128}z" fill="#FFF"/>`,
  steeple: (x) => `<g fill="${MARK}"><rect x="${x}" y="${BASE - 80}" width="160" height="80"/><rect x="${x + 58}" y="${BASE - 150}" width="44" height="70"/><rect x="${x + 64}" y="${BASE - 182}" width="32" height="32"/><path d="M${x + 66} ${BASE - 182}L${x + 80} ${BASE - 270}L${x + 94} ${BASE - 182}z"/></g>`,
  rocket: (x) => `<path d="M${x + 60} ${BASE - 40}V${BASE - 230}q20-40 40 0V${BASE - 40}zM${x + 60} ${BASE - 90}l-24 50h24zM${x + 100} ${BASE - 90}l24 50h-24zM${x + 70} ${BASE - 40}h20l6 40h-32z" fill="${MARK}"/><path d="M${x + 60} ${BASE - 170}h40M${x + 60} ${BASE - 120}h40" stroke="#FDE3EC" stroke-width="4"/>`,
  towers: (x) => `<path d="M${x} ${BASE}V${BASE - 150}l20-30 20 30V${BASE}zM${x + 50} ${BASE}V${BASE - 200}l24-36 24 36V${BASE}zM${x + 108} ${BASE}V${BASE - 120}h40V${BASE}z" fill="${MARK}"/>`,
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function wrap(label, max = 13) {
  const words = label.split(" ");
  const lines = [""];
  for (const w of words) {
    const cur = lines[lines.length - 1];
    if (cur && (cur + " " + w).length > max) lines.push(w);
    else lines[lines.length - 1] = cur ? cur + " " + w : w;
  }
  if (lines.length > 2) console.warn(`location-visuals: "${label}" needs ${lines.length} lines; shorten it to fit 2`);
  return lines.slice(0, 2);
}

// deterministic skyline from the slug
function skyline(slug) {
  let seed = [...slug].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 2 ** 32);
  let d = "", x = 0;
  while (x < W) {
    const w = 34 + Math.round(rnd() * 46), h = 36 + Math.round(rnd() * 70);
    d += `M${x} ${BASE}V${BASE - h}h${w}V${BASE}z`;
    x += w + 4;
  }
  return `<path d="${d}" fill="${SKY}"/>`;
}

function svg(slug, l) {
  const { landmark = "towers", scenes } = l.visual;
  const place = l.state === "DC" ? l.city : `${l.city}, ${l.state}`;
  const lm = (LANDMARKS[landmark] ?? LANDMARKS.towers)(70);
  const tiles = scenes.slice(0, 3).map((s, i) => {
    const tx = 140 + i * 206, on = i === 0;
    const lines = wrap(s.label);
    return `<g><rect x="${tx}" y="184" width="190" height="150" rx="18" fill="${on ? PINK : "#F6F6F7"}"/>` +
      `<circle cx="${tx + 40}" cy="224" r="24" fill="${on ? "#FFFFFF" : TINT}"/>` +
      `<path d="${ICONS[s.icon] ?? ICONS.spark}" transform="translate(${tx + 25} 209) scale(1.25)" fill="none" stroke="${PINK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
      lines.map((t, k) => `<text x="${tx + 18}" y="${282 + k * 26}" font-size="20" font-weight="700" fill="${on ? "#FFFFFF" : INK}">${esc(t)}</text>`).join("") +
      `</g>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Manrope, system-ui, -apple-system, Segoe UI, sans-serif" role="img" aria-label="${esc(`UX design for ${place}: ${scenes.map((s) => s.label).join(", ")}`)}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF4F7"/><stop offset="1" stop-color="#FDE3EC"/></linearGradient>
<filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#E2225F" flood-opacity=".12"/></filter>
</defs>
<g><rect width="${W}" height="${H}" fill="url(#bg)"/>${skyline(slug)}${lm}<rect y="${BASE}" width="${W}" height="${H - BASE}" fill="${MARK}"/></g>
<g filter="url(#sh)"><rect x="40" y="36" width="${Math.round(place.length * 14.5) + 74}" height="50" rx="25" fill="#FFFFFF"/></g>
<path d="M64 52a8 8 0 0 1 16 0c0 6-8 14-8 14s-8-8-8-14z" fill="${PINK}"/><circle cx="72" cy="52" r="3" fill="#FFFFFF"/>
<text x="90" y="69" font-size="22" font-weight="800" fill="${INK}">${esc(place)}</text>
<g filter="url(#sh)"><rect x="110" y="106" width="660" height="256" rx="24" fill="#FFFFFF"/></g>
<rect x="110" y="106" width="660" height="52" rx="24" fill="#F4F4F5"/><rect x="110" y="136" width="660" height="22" fill="#F4F4F5"/>
<circle cx="140" cy="132" r="7" fill="#FF5F57"/><circle cx="164" cy="132" r="7" fill="#FEBC2E"/><circle cx="188" cy="132" r="7" fill="#28C840"/>
<rect x="220" y="122" width="220" height="20" rx="10" fill="#FFFFFF"/>
${tiles}
<g filter="url(#sh)"><rect x="560" y="330" width="260" height="76" rx="18" fill="#FFFFFF"/></g>
<circle cx="600" cy="368" r="20" fill="${TINT}"/><path d="M591 368l6 6 12-12" fill="none" stroke="${PINK}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<text x="632" y="362" font-size="18" font-weight="800" fill="${INK}">Tested with</text><text x="632" y="386" font-size="18" font-weight="800" fill="${INK}">real users</text>
</svg>
`;
}

fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".json") || f.startsWith("_")) continue;
  const l = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  const slug = f.slice(0, -5);
  if (!l.visual?.scenes?.length) {
    console.warn(`location-visuals: ${slug} has no "visual" — the page falls back to the generic mock`);
    continue;
  }
  fs.writeFileSync(path.join(OUT, `${slug}.svg`), svg(slug, l));
  n++;
}
console.log(`location-visuals: ${n} illustrations written to ${OUT}/`);
