"""Blog feature image (cover) in the owner-approved style (2026-10-21).

Usage: python3 docs/content-system/visual-style/make-cover.py <slug> [<slug> ...]
Reads content/blog/<slug>.md (title, author, services[0]) and the team list in content/home.ts,
writes public/blog/<slug>/cover.svg (1200x750, 16:10) with: title (Manrope 700), hub pill,
author photo + name + role, brand mark. Fonts and photo are embedded so the <img> renders the same
everywhere. Needs: pip install fonttools brotli pillow.
"""
import base64, io, os, re, subprocess, sys, json
from fontTools.ttLib import TTFont
from PIL import Image, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
HERE = os.path.dirname(os.path.abspath(__file__))
EMBED = os.path.join(HERE, "embed-fonts.py")
FONT = os.path.join(HERE, "fonts", "manrope-latin-%d-normal.woff2")

HUB_LABEL = {
    "ux-research-services": "UX Research", "ux-audit-services": "UX Audit", "ux-consulting-services": "UX Strategy",
    "usability-testing-services": "Usability Testing", "digital-product-design-services": "Product Design",
    "design-system-services": "Design Systems", "interaction-design-agency": "Interaction Design",
    "ui-ux-web-design": "Web Design", "mobile-app-ui-ux-design-services": "Mobile Apps",
    "ios-app-design-services": "iOS Apps", "web-app-design-services": "Web Apps",
    "dashboard-design-services": "Dashboards", "dashboard-ux-design": "Dashboards",
    "data-visualization-agency": "Data Visualization", "saas-ux-design": "SaaS",
    "ecommerce-ux-design-services": "E-commerce", "ui-ux-design-services-for-startups": "Startups",
}

W, H, PAD = 1200, 750, 56
TITLE_SIZE, TITLE_LH, TITLE_MAX_W = 54, 62, 860


def ttf(weight):
    f = TTFont(FONT % weight); f.flavor = None; b = io.BytesIO(); f.save(b); b.seek(0)
    return b


_fonts = {}
def measure(text, size, weight):
    key = (size, weight)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(ttf(weight), size)
    return _fonts[key].getlength(text)


def wrap(title, size, max_w, letter=-1.2):
    words, lines, cur = title.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if measure(t, size, 700) + letter * len(t) <= max_w:
            cur = t
        else:
            lines.append(cur); cur = w
    lines.append(cur)
    return lines


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def frontmatter(slug):
    src = open(os.path.join(ROOT, "content", "blog", slug + ".md"), encoding="utf8").read()
    fm = src.split("---", 2)[1]
    get = lambda k: (re.search(r"^%s:\s*(.+)$" % k, fm, re.M) or [None, ""])[1].strip().strip('"').strip("'")
    services = re.search(r"^services:\s*\[([^\]]*)\]", fm, re.M)
    hub = services.group(1).split(",")[0].strip() if services else ""
    title = get("coverTitle") or get("title")
    return title, get("author"), hub


def team():
    src = open(os.path.join(ROOT, "content", "home.ts"), encoding="utf8").read()
    out = {}
    for m in re.finditer(r'\{\s*name:\s*"([^"]+)",\s*role:\s*"([^"]+)",\s*photo:\s*"([^"]+)"', src):
        name, role, photo = m.groups()
        slug = os.path.splitext(os.path.basename(photo))[0]
        out[slug] = (name, role.split(" | ")[0].strip(), photo)
    return out


def photo_b64(path):
    im = Image.open(os.path.join(ROOT, "public", path.lstrip("/"))).convert("RGB")
    side = min(im.size); l = (im.width - side) // 2; t = (im.height - side) // 2
    im = im.crop((l, t, l + side, t + side)).resize((240, 240), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, "WEBP", quality=78)
    return base64.b64encode(b.getvalue()).decode()


MARK = ('<rect width="32" height="32" rx="9" fill="#E2225F"/><path d="M10 9.5v6.5a6 6 0 0 0 12 0V9.5" fill="none" '
        'stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><rect x="7.4" y="6.9" width="5.2" height="5.2" rx="1.3" '
        'fill="#E2225F" stroke="#fff" stroke-width="1.8"/><rect x="19.4" y="6.9" width="5.2" height="5.2" rx="1.3" '
        'fill="#E2225F" stroke="#fff" stroke-width="1.8"/><circle cx="16" cy="22" r="1.9" fill="#fff"/>')


def build(slug, people):
    title, author, hub = frontmatter(slug)
    pill = HUB_LABEL.get(hub, "UI UX Design")
    size, lh = TITLE_SIZE, TITLE_LH
    lines = wrap(title, size, TITLE_MAX_W)
    if len(lines) > 3:
        size, lh = 48, 56; lines = wrap(title, size, TITLE_MAX_W, -1.0)
    if len(lines) > 4:
        raise SystemExit(f"{slug}: title too long for the cover ({len(lines)} lines); add coverTitle to the frontmatter")
    first = PAD + round(size * 0.73)  # cap height sits on the 56px padding
    tl = "\n".join(f'  <text x="{PAD}" y="{first + i * lh}" class="t">{esc(l)}</text>' for i, l in enumerate(lines))
    rule_y = first + (len(lines) - 1) * lh + 32
    pill_w = round(measure(pill, 17, 800) + 0.2 * len(pill) + 48)
    name, role, photo = people.get(author, (None, None, None))
    if not name:
        raise SystemExit(f"{slug}: author '{author}' not in the team list in content/home.ts")
    ph = 136; py = H - PAD - ph; tx = PAD + ph + 24
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="Manrope, system-ui, sans-serif" role="img" aria-label="{esc(title)}">
  <style>/*FONTS*/
    .t{{font-size:{size}px;font-weight:700;fill:#14111F;letter-spacing:{-1.2 if size == 54 else -1.0}px}}
    .pill{{font-size:17px;font-weight:800;fill:#FFFFFF;letter-spacing:.2px}}
    .name{{font-size:24px;font-weight:800;fill:#14111F}}
    .role{{font-size:18px;font-weight:600;fill:#4A4453}}
    .co{{font-size:18px;font-weight:500;fill:#6E6878}}
  </style>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FCE1EA"/><stop offset="1" stop-color="#F6CFDD"/></linearGradient>
    <clipPath id="ph"><rect x="{PAD}" y="{py}" width="{ph}" height="{ph}" rx="20"/></clipPath>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#bg)"/>
  <g fill="none" stroke="#E2225F" stroke-opacity=".22" stroke-width="2">
    <path d="M1200 240 H1000 A120 120 0 0 0 880 360 V750"/>
    <path d="M1200 380 H1080 A72 72 0 0 0 1008 452 V750"/>
  </g>
  <circle cx="1000" cy="240" r="7" fill="#E2225F" fill-opacity=".55"/><circle cx="880" cy="360" r="7" fill="#E2225F" fill-opacity=".55"/><rect x="1073" y="373" width="14" height="14" rx="3" fill="#E2225F" fill-opacity=".55"/>
  <g transform="translate({W - PAD - pill_w} {PAD})"><rect width="{pill_w}" height="40" rx="20" fill="#14111F"/><text x="{pill_w / 2}" y="26" class="pill" text-anchor="middle">{esc(pill)}</text></g>
{tl}
  <rect x="{PAD}" y="{rule_y}" width="96" height="4" rx="2" fill="#E2225F"/>
  <rect x="{PAD}" y="{py}" width="{ph}" height="{ph}" rx="20" fill="#FFFFFF"/>
  <image x="{PAD}" y="{py}" width="{ph}" height="{ph}" clip-path="url(#ph)" preserveAspectRatio="xMidYMid slice" href="data:image/webp;base64,{photo_b64(photo)}"/>
  <text x="{tx}" y="{py + 54}" class="name">{esc(name)}</text>
  <text x="{tx}" y="{py + 84}" class="role">{esc(role)}</text>
  <text x="{tx}" y="{py + 110}" class="co">at UI UX Design Services</text>
  <g transform="translate({W - PAD - 56} {H - PAD - 56}) scale(1.75)">{MARK}</g>
</svg>
'''
    out_dir = os.path.join(ROOT, "public", "blog", slug); os.makedirs(out_dir, exist_ok=True)
    src = os.path.join(out_dir, ".cover.src.svg"); open(src, "w", encoding="utf8").write(svg)
    subprocess.run([sys.executable, EMBED, src, os.path.join(out_dir, "cover.svg")], check=True)
    os.remove(src)
    print(f"{slug}: {len(lines)} lines @ {size}px, pill '{pill}', author {name}")


if __name__ == "__main__":
    people = team()
    for s in sys.argv[1:]:
        build(s, people)
