# Fact-check: design-system-roi (2026-10-08, review loop 2, final)

Checked `content/blog/design-system-roi.md` and all 7 SVGs in `public/blog/design-system-roi/`. Site facts were compared with `content/services/design-system-services.json` (hub), `content/pages/about.md` and the loop-1 report.

**Method note:** WebFetch failed with DNS errors (ENOTFOUND) for storybook.js.org and zeroheight.com. Both were checked with a WebSearch limited to the vendor's own domain. Loop-1 sources (BLS, Sparkbox, Smashing, Figma, Chromatic, W3C) did not change and were not re-fetched.

## A. Loop-1 replacements: were they applied?

| # | Loop-1 fix | Status | Note |
|---|---|---|---|
| 1 | L61 "The one public timing test" → "One public timing test" | APPLIED | Word for word. |
| 2 | L91 "gets its baseline as a by-product" → "gets its duplicate count as a by-product" | APPLIED | Word for word. |
| 3 | L109 `$85 blended` relabelled as an assumption | APPLIED | Word for word. |
| 3b | break-even-chart.svg group `a3` | APPLIED | 3 lines: "$85 blended, an assumption rounded down from the" / "BLS-based blend of about $86 (3 engineers at $92" / "to 1 designer at $68)". The box height grew 128 → 160 (y 1498–1658). a4–a6 shifted down (a4 at 1668, a6 ends at 2072), and the viewBox/height is 2112. Plot geometry, markers and Results rows are unchanged and still match the post ($8,500/$17,000/$25,500; not within 60 / 23 / 16; −8% / 85% / 177%). |
| 4 | L156 bold (C10) | APPLIED | Word for word. H2 unchanged as agreed. |
| 5 | L208 metrics cell (A12) | APPLIED | Prose at L204 also narrowed to "inserts per team and detaches per component". This matches the Figma help page. |
| 6 | L213 Chromatic sentence (A14) | APPLIED | Word for word. |
| 7 | L221 price-range paragraph (C8) | APPLIED | Word for word. |
| 8 | L223 CTA (C9) | REWRITTEN (not pasted) | Checked as new text in B6 below. |
| 9 | L229 FAQ answer (C11) | APPLIED | Word for word. |

## B. New text in loop 2

| # | Claim (line) | Verdict | Source / note |
|---|---|---|---|
| B1 | Governance paragraph, first sentence: "Our engagement hands over a governance model (who proposes, reviews and releases changes), 2 training workshops for product teams and version 1.0." (L215) | TRUE | Hub deliverable "Governance model": "A contribution process defines who proposes, reviews and releases changes". Hub step 5 "Governance and rollout": "We set up design system governance, train product teams in 2 workshops and release version 1.0". Hub process answer: "…to governance handover". No new deliverable. |
| B2 | Governance paragraph, second sentence: "From then on, the two named owners from your business case present the quarterly report, a monthly contribution review accepts or rejects new components, and a component with a high detach rate gets fixed or deprecated in the next release." (L215) | TRUE | "From then on" and "the two named owners from your business case" (L183) place these actions with the client after handover. They are not an agency promise. They are consistent with the hub's "contributing components through one review process" and "for example a monthly release". "Detach rate" per component matches Figma analytics (detaches per component). Optional, non-blocking: rewriting it in the imperative ("have the two named owners … present …") would remove any reading that this is part of our engagement. |
| B3 | "Storybook is the catalogue of coded components, so the share of library components with a story is the coded-coverage figure to report." (L213) | TRUE | Storybook docs (https://storybook.js.org/docs, https://storybook.js.org/docs/get-started/browse-stories): Storybook "organizes every component and its use cases" in a browsable sidebar, and "a story captures the rendered state of a UI component". The coverage metric is the post's own definition and is presented as advice. The hub says components are "documented in Storybook". |
| B4 | "Zeroheight is the documentation site where teams look up usage rules." (L213) | TRUE | zeroheight (https://zeroheight.com/design-system-documentation/, https://help.zeroheight.com/hc/en-us/articles/35887014373787-Rules-block) is a design system documentation product. Its Rules block holds do's, don'ts and cautions on how components should be used. Style note, non-blocking: the vendor writes its name in lowercase ("zeroheight"). The hub uses "Zeroheight", so the post is consistent with the site. |
| B5 | "Drop any headline figure of the '5–10x return' or 'pays back in a few months' kind that arrives without a published method, sample size and team size, because finance will ask for all three." (L183) | TRUE | Generic example only: no firm, report or URL is attributed, and the figure is not presented as a finding. "All three" matches the three items listed. |
| B6 | Closing (L223): "Your sprints, payroll and tickets fill most of the sheet, but the build fee is the one row your own data cannot fill. When you are ready for it, [bring your baseline sheet to us](/contact/): every project begins with a free consultation and a fixed-scope proposal." | WRONG (first sentence only) | The offer clause is about.md L30 word for word ("every project begins with a free consultation and a fixed-scope proposal") and adds no promise. "Bring your baseline sheet to us" is an imperative to the reader, so that is TRUE. However, "the build fee is the one row your own data cannot fill" contradicts the post itself: the tooling line also comes from outside data ("license quotes", L75; "take current quotes from vendor pricing pages", L147). **Old:** "Your sprints, payroll and tickets fill most of the sheet, but the build fee is the one row your own data cannot fill." → **New:** "Your sprints, payroll and tickets fill most of the sheet, and vendor pricing pages fill the tooling line, but the agency fee in the build row has to come from a proposal." (The second sentence stays as written. Its "it" still refers to the proposal.) |
| B7 | Bold answer L95: "…pays back its $145,500 build plus upkeep in month 23 (expected) or month 16 (high), and not within 5 years (low)." | TRUE | $120,000 fee + 300 h × $85 = $25,500 → $145,500. Payback months were recomputed in loop 1 (section C below). The bold answer matches the Results table, the chart markers and L124. |
| B8 | Sensitivity 1 (L124): "a ramp that reaches full rate in month 24 instead of month 12 moves expected payback from month 23 to month 32" | TRUE | Recomputed in section C. |
| B9 | Sensitivity 2 (L150): "Add 400 engineering hours of migration ($34,000) across months 4–9 and … the expected case pays back in month 26 instead of 23." | TRUE | 400 × $85 = $34,000. Recomputed in section C. |
| B10 | L150: "The worked example above folds adoption support into its 60 owner hours and has no migration row." | TRUE | This defines an invented model. The assumptions table has an upkeep row of 60 owner hours + tooling and no migration row, so it is consistent. |
| B11 | FAQ "How long does a design system take to pay back?" (L233): "The build alone takes 8–16 weeks before savings start" | TRUE | Hub: 8–16 weeks. The model has zero savings during the build. |
| B12 | New honesty items | TRUE (none) | No clients, results, testimonials, awards, certifications, team sizes or offices added. No SVG text changed except `a3`. |

## C. Recomputation of the worked example and sensitivities

Model: r = $85; build $145,500 over months 1–3; upkeep $6,000/month from month 4, so cumulative cost C(m) = 127,500 + 6,000m for m ≥ 3. Expected full-rate saving R = $17,000. The savings ramp is linear from month 4 to the full-rate month F, so the cumulative savings after F are S(m) = R·(m − F + n/2 + 1/2), where n = F − 3.

- **Base (F = 12, n = 9):** S = R(m − 7). 11,000m ≥ 246,500 → m = 22.4 → **month 23** ✓.
- **Sensitivity 1 (F = 24, n = 21):** the ramp sums to 11R, so S = R(m − 13). 17,000(m − 13) ≥ 127,500 + 6,000m → 11,000m ≥ 348,500 → m = 31.7 → **month 32** ✓. Check: month 31 gives S $306,000 < C $313,500, and month 32 gives S $323,000 ≥ C $319,500. There is no crossing before month 24 (month 24: S $187,000 vs C $271,500).
- **Sensitivity 2 (migration $34,000 spread over months 4–9, base ramp):** C(m) = 161,500 + 6,000m for m ≥ 9. 17,000(m − 7) ≥ 161,500 + 6,000m → 11,000m ≥ 280,500 → m = 25.5 → **month 26** ✓. Check: month 25 gives S $306,000 < C $311,500, and month 26 gives S $323,000 ≥ C $317,500.

## Required replacements (old → new)

1. L223: "Your sprints, payroll and tickets fill most of the sheet, but the build fee is the one row your own data cannot fill." → "Your sprints, payroll and tickets fill most of the sheet, and vendor pricing pages fill the tooling line, but the agency fee in the build row has to come from a proposal."

Optional, non-blocking: put L215's second sentence in the imperative (B2).

Orchestrator flag carried over (not blocking): the team threshold conflicts between the hub ("2 or more teams") and `content/industries/startups.json` ("3 or more squads").

VERDICT: FAIL
