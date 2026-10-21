# Blog infographic style (owner rule, 2026-10-20)

The owner approved `reference-screen-spec-card.svg` (see `reference-desktop.png`, `reference-phone.png`)
as the house style for every new blog image: "realistic, like a designer made it; people scan more
than they read; text must not be oversized; spacing pixel to pixel perfect."
Draw every new infographic to this standard. Older images keep their style unless the owner asks.

## Look
- **Realistic vectors, not boxes.** Show the real thing the image is about: device mockups (iPhone with
  dynamic island and side buttons, Android with punch-hole camera, browser window with traffic lights
  and URL bar), real UI inside them with real short labels ("Visits", "10:00 Initial assessment",
  "Open slots", "Save / Cancel"), never grey placeholder bars only. Charts, boards, cards, forms and
  documents are drawn as the object they are.
- **Designer annotations.** Measurements use Figma-style redlines: dashed pink box, thin arrows with
  open heads, a small pink tag ("44 pt"). Add a legend pill when a symbol needs explaining.
- **Depth, lightly.** Soft card shadow (dy 6, blur 10, 7% opacity), stronger device shadow (dy 12,
  blur 10, 22%), light dotted 24px grid on the canvas, a tinted "stage" panel behind each mockup.
- **Brand:** pink #E2225F for numbers/tags/emphasis, ink #14111F, body #2B2733, muted #5E5868 /
  #8F889A, borders #EEE8F1, soft pink stage gradient #FFF5F8 → #F7F3F9. Success #1F9D62, error #D33A54.

## Type (scan first, read second)
Font: Manrope, **embedded** in the SVG (an `<img>` cannot load the site's web font, so without it
the image falls back to a wide system font). Write the SVG with a `/*FONTS*/` marker inside `<style>`,
then run `python3 docs/content-system/visual-style/embed-fonts.py in.src.svg out.svg` (subsets
Manrope 500/600/700/800 to the glyphs used; ~40 KB total).
Hierarchy at viewBox 1200 wide:
| Role | Size / weight |
|---|---|
| Eyebrow (caps, tracking 2.2) | 13 / 800, pink |
| Image title | 30 / 800, letter-spacing −0.4 |
| Subtitle | 16 / 500, muted |
| Card label (caps, tracking 1.6) | 12.5 / 800, muted |
| Key number | 40 / 800, ink, letter-spacing −1 |
| Unit | 15 / 700, pink |
| Source / meta | 14.5 / 600, muted |
| UI text inside mockups | 7.5–15, decorative realism |
Only the key number is big. This replaces the 2026-10-14 "smallest text ≥ 38px" rule: phones read the
always-visible text panel under the image, so the image is for scanning.

## Spacing (8-point system, measured, not eyeballed)
- Canvas 1200 wide, height as needed (keep ≥ 1.3:1 so the page shows it full width). Outer margin
  48 on all four sides; header block eyebrow → title → subtitle, cards start 28 below the subtitle.
- Card grid: equal widths, 24 gap (4 cards = 258 each). Card radius 22; inner stage inset 12 with
  radius 10 (nested radius = outer − inset). Text left padding 24.
- Mockups centered in their stage (0 px offset, measured on the device body).
- Inside every card the same rhythm: stage → label 24, unit → divider 20, divider → source 24,
  last line → card bottom 24. Last lines of all cards share one baseline.
- Verify with `node docs/content-system/visual-style/measure-cards.cjs out.svg` (prints stage→label
  gap, divider, bottom padding and device centering per card) and screenshot with `screenshot.cjs`
  at 760 px (desktop) and 354 px (phone). Fix any gap that is off by even 1 px before handing back.
- Adapt the measuring script when the layout is not a 4-card row; the rule (equal, measured gaps on an
  8-point scale) stays.

## Content rules that still apply
Every item of the image's "Show as text" panel appears on the image word for word; numbers are real
(compute ratios, never invent); label illustrative examples; no brand logos of other companies; US
English; file < 60 KB; valid XML.

## Feature image (cover), owner style 2026-10-21
Every post's cover is made with `make-cover.py <slug>`: 1200×750 (16:10), soft brand-pink background
with the brand line-art, title top-left (Manrope 700, 54px, ≤ 3 lines), hub pill top-right, author photo,
name, role and "at UI UX Design Services" bottom-left, brand mark bottom-right, 56px padding. Blog cards
show it at 16:10 and the post page shows it whole (`.pcover--img`, max 880px wide).
