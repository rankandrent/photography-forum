# Fact-check: design-system-roi (2026-10-08, review loop 1)

Checked `content/blog/design-system-roi.md` and the text in all 7 SVGs in `public/blog/design-system-roi/`.
Site facts were compared with `content/services/design-system-services.json`, `content/services/ux-consulting-services.json`, `content/pages/about.md`, `content/pages/terms.md` and `content/home.ts`.

**Method note:** WebFetch failed with DNS errors (ENOTFOUND) for bls.gov, sparkbox.com, smashingmagazine.com and help.figma.com. Each source was verified instead with a WebSearch limited to its own domain. In every case the search returned the exact URL that the post links to, plus supporting text (see lesson 2026-10-05, method).

## A. External sources and statistics

| # | Claim (line) | Verdict | Source / note |
|---|---|---|---|
| A1 | BLS OOH, "May 2025 median pay": $134,040 for software developers, quality assurance analysts and testers (L59) | TRUE | https://www.bls.gov/ooh/computer-and-information-technology/ shows a 2025 median of $134,040 for that combined occupation. The link loads (search result returns this exact URL). |
| A2 | $99,520 for web developers and digital designers (L59) | TRUE | Same page: 2025 median of $99,520. |
| A3 | ECEC June 2026: wages and salaries are 70.0% of private-industry employer costs and benefits are 30.0% (L59) | TRUE | https://www.bls.gov/news.release/ecec.nr0.htm ("Employer Costs for Employee Compensation Summary - 2026 Q02 Results", released 2026-09-09): "Wages and salaries averaged $32.82 and accounted for 70.0 percent of employer costs, while benefit costs averaged $14.07 and accounted for the remaining 30.0 percent." Caveat, no fix needed: the share for full-time private workers is 68.5%, so ÷0.70 slightly understates the cost of full-time staff. |
| A4 | "÷ 0.70 … roughly $92 an hour per engineer and $68 per designer" (L59) | TRUE | 134,040 ÷ 2,080 = $64.44, and ÷ 0.70 = $92.06. 99,520 ÷ 2,080 = $47.85, and ÷ 0.70 = $68.35. |
| A5 | "The one public timing test with a stated method comes from Sparkbox" (L61) | WRONG | Figma published a timed design-system experiment in 2019 with its method stated: designers were 34% faster with a design system (https://www.figma.com/blog/measuring-the-value-of-design-systems/). "The one" is false. **Old:** "The one public timing test with a stated method comes from [Sparkbox](…):" → **New:** "One public timing test with a stated method comes from [Sparkbox](…):" (keep the same link). |
| A6 | Sparkbox: 8 of its developers, form page from scratch (median 4.2 h) and then with IBM Carbon (median 2 h), learning time included, everyone built from scratch first (L61) | TRUE | https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system: 8 Sparkbox developers coded the form from scratch, then coded it again with Carbon. Medians were 4.2 h and about 2 h, about 47% faster, and the Carbon time included learning. "Small sample, one form" matches the study's own scope. "Upper bound" is the post's own interpretation and is labelled as advice. |
| A7 | Takeaway: "Sparkbox's one test of IBM Carbon (8 developers, one form)" (L19) | TRUE | "One test" refers to Sparkbox's single test, not to the whole field. |
| A8 | Worksheet SVG and table: "kept well under Sparkbox's half-time result" (L73, roi-input-worksheet.svg) | TRUE | 2 h ÷ 4.2 h = 48% of the time, so "half-time" is a fair rounding. The high scenario (30%) is well under it. |
| A9 | Smashing Magazine (2022), Speicher and Baena Wehrmann: the model runs over 5 years, starts with a productivity dip while the team builds, and saves only after a break-even point (L34) | TRUE | https://www.smashingmagazine.com/2022/09/formula-roi-design-system/ ("One Formula To Rule Them All: The ROI Of A Design System", 2022-09-09) assumes a design system is useful for about 5 years before a major revamp. Its "Design System Efficiency Curve" dips at first and rises above the baseline after break-even. The 3-year option is the post's own advice, and the post presents it as advice. No constants or worked example are copied. |
| A10 | "The Smashing Magazine model starts with a productivity dip before break-even" (L144) | TRUE | Same source. |
| A11 | Figma library analytics is on the Organization and Enterprise plans and shows inserts and detaches across the organization, with up to a year of history (L202) | TRUE | https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics: available on Organization and Enterprise plans. It tracks insertions and detaches, keeps "up to one year of historical data" and has an org-wide view under All teams → Libraries. |
| A12 | Metrics table: "Figma inserts and detaches per team" (L206) | UNVERIFIABLE (half) | The help page confirms **inserts** per team ("Top teams … total number of insertions for each team"). It shows **detaches** per component ("Detaches column", last 30 days), not per team. **Old:** "Figma inserts and detaches per team" → **New:** "Figma library analytics: inserts per team, detaches per component" |
| A13 | Tooling: "Figma Organization or Enterprise seats for library analytics" (L147) | TRUE | Same Figma help page. |
| A14 | "Chromatic visual tests catch coded components drifting from the Figma library." (L211) | WRONG | Chromatic visual tests compare each new snapshot with the last **approved baseline snapshot** of that test (https://www.chromatic.com/docs/visual/). They do not compare with Figma. The Figma plugin links stories to components for design review only. **Old:** "Chromatic visual tests catch coded components drifting from the Figma library." → **New:** "Chromatic visual tests compare each Storybook story with its last approved snapshot and flag any visual change for review." |
| A15 | WCAG 2.2 has contrast and focus rules (L50, L241) | TRUE | https://www.w3.org/TR/WCAG22/ (W3C Recommendation, 5 Oct 2023): 1.4.3 Contrast (Minimum), 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum). |
| A16 | Tools named: Jira, Linear, Storybook, Zeroheight, Chromatic (L89, L147, L207) | TRUE | All are current products. No features beyond what is checked above are claimed. No prices are given. |
| A17 | Competitor or industry headline stats | TRUE (none present) | No unsourced multiples (671%, 5–10x, etc.) appear. L181 tells readers to drop them. |

## B. Worked example (recomputed in full)

Model as stated: 1,000 UI h/month; rate r; build = $120,000 + 300·r spread over months 1–3; upkeep = 60·r + $900 per month from month 4; savings ramp k/9 of full rate in month 3+k (k = 1…9), full from month 12. The chart geometry confirms this ramp (high line month 4 = $2,833, month 12 cumulative = $127,500 at y = 528.6).

With r = $85: build $145,500, upkeep $6,000. Cumulative cost C(m) = 127,500 + 6,000m (m ≥ 3). Cumulative savings S(m) = R·(m − 7) for m ≥ 12.

| Scenario | R | Break-even | 60-month S | 60-month C | ROI |
|---|---|---|---|---|---|
| Low 10% | $8,500 | 2,500m ≥ 187,000 → m = 74.8 → **not within 60** ✓ | $450,500 | $487,500 | **−7.6% → −8%** ✓ |
| Expected 20% | $17,000 | 11,000m ≥ 246,500 → m = 22.4 → **month 23** ✓ | $901,000 | $487,500 | **84.8% → 85%** ✓ |
| High 30% | $25,500 | 19,500m ≥ 306,000 → m = 15.7 → **month 16** ✓ | $1,351,500 | $487,500 | **177.2% → 177%** ✓ |

- Low scenario nets $8,500 − $6,000 = **$2,500/month** ✓. It never recovers the **$145,500** build inside 5 years ✓ (net −$37,000 at month 60).
- Halved owner hours: upkeep = 30·85 + 900 = $3,450. 5,050m ≥ 194,650 → m = 38.5 → **month 39** ✓.
- "300 internal pairing hours ($25,500)" ✓, "60 owner hours ($5,100) + $900 tooling" = $6,000 ✓, "$120,000 … picked from inside the published range", "12-week build" ✓ (hub: $60,000–$180,000, 8–16 weeks).
- break-even-chart.svg geometry ✓: x 12.78 px/month (0→140, 36→600); y 112 px per $200k ($0 → 600). Month-36 endpoints: high $739,500 → y 185.9, expected $493,000 → 323.9, low $246,500 → 462.0, cost $343,500 → 407.6. All match. The month-16 marker sits at y 471.5 (S = $229,500) and the month-23 marker at y 447.7 (S = $272,000). Both are correct. The build band covers months 0–3. The Results rows in the SVG match the post table.

### B1. "$85 blended (3 engineers to 1 designer, BLS medians ÷ 0.70)" (L109, break-even-chart.svg group a3): WRONG

(3 × $92.06 + $68.35) ÷ 4 = **$86.13**. Using the post's rounded rates, (3 × 92 + 68) ÷ 4 = **$86**. The label says the $85 is derived from BLS, and it is not.

**Fix (recommended, Option A: relabel as an assumption; no model result changes):**

- Post L109. **Old:** `| Loaded hourly cost | $85 blended (3 engineers to 1 designer, BLS medians ÷ 0.70) |` → **New:** `| Loaded hourly cost | $85 blended, an assumption rounded down from the BLS-based blend of about $86 (3 engineers at $92 to 1 designer at $68) |`
- break-even-chart.svg, group `a3`: replace the two text lines with the same wording. Text only: no chart, Results row or other number changes. The new wording needs 3 lines at 26 px (for example "$85 blended, an assumption rounded down from" / "the BLS-based blend of about $86 (3 engineers" / "at $92 to 1 designer at $68)"). The designer must make the `a3` box about 32 px taller, shift `a4`–`a6` down to match and enlarge the viewBox/height (2080 → about 2112).

**Option B (recompute at $86; not recommended). This changes the model results, so the designer must redraw the chart, the Results rows and the a4/a5 assumption rows:**
build $145,800 (pairing $25,800); upkeep $6,060/month (owner $5,160 + $900); monthly saving $8,600 / $17,200 / $25,800; payback unchanged (month 16 high, 23 expected, not within 60 low); 5-year ROI **178% / 86% / −7%**; low nets **$2,540/month**; halved owner hours still month 39. Post L95 bold and L124 text ($2,500, $145,500) would also change. All curve points shift by about 1%.

## C. Claims about our own service and honesty

| # | Claim (line) | Verdict | Source / note |
|---|---|---|---|
| C1 | "$60,000 purchase order", "published fee for our design system services" (L26) | TRUE | Hub `priceRange` "$60,000–$180,000". |
| C2 | "design system price range of $60,000–$180,000 over 8–16 weeks" (L217), "build alone takes 8–16 weeks" (L229) | TRUE | Hub abstract and cost H2. The anchor `#how-much-does-a-design-system-cost` matches the H2 "How much does a design system cost?". |
| C3 | "Our process closes with 2 rollout workshops" (L146) | TRUE | Hub step 5 "Governance and rollout": "train product teams in 2 workshops". |
| C4 | "embedded design team … our hub prices at $15,000–$40,000 per month" (L148) | TRUE | Hub cost section, ux-consulting-services.json and home.ts all give $15,000–$40,000/month. |
| C5 | "a full design system fits when 2 or more teams build on the same product", "1 product with 1–2 designers needs a UI kit and tokens first" (L21, L156, L225) | TRUE | Hub FAQ "Should a startup build a design system?" word for word. Flag for orchestrator (not a post error): `content/industries/startups.json` says "3 or more squads" (brief SITE-FACT CONFLICT 1). |
| C6 | "system replaces duplicate patterns screen by screen, without a full redesign" (L145) | TRUE | Hub FAQ "Can a design system work with an existing product?". |
| C7 | "The duplicate count is the UI inventory that opens a design system engagement with us, so a team that buys the build gets its baseline as a by-product." (L91) | WRONG (overclaim) | Hub step 1 delivers only the UI inventory ("collect every screen, list duplicate patterns"). The post defines the baseline as 3 signals: time sampling, duplicates and bug tickets. The engagement does not deliver the other two. **Old:** "…so a team that buys the build gets its baseline as a by-product." → **New:** "…so a team that buys the build gets its duplicate count as a by-product." |
| C8 | "These facts place a quote inside our [design system price range …]. Swap that firm figure into the build row, re-run the three scenarios, and your design system ROI carries a real cost line instead of a placeholder." (L217) | WRONG | `terms.md`: price ranges are "not an offer"; the written proposal governs. The hub's 4 price factors are components, platforms, brands/themes and depth of code alignment, not baseline hours. "Place a quote inside" and "firm figure" promise more than the site does (lesson 2026-10-06 round 2). **New (wording from the hub cost H2 and about.md):** "Our published [design system price range of $60,000–$180,000 over 8–16 weeks](/services/design-system-services/#how-much-does-a-design-system-cost) depends on scope, including platforms and the number of brands or themes. When the fixed-scope proposal arrives, put its price in the build row, re-run the three scenarios, and your design system ROI carries a real cost line instead of a placeholder." |
| C9 | "[Book a free consultation](/contact/) with your baseline sheet in hand and we scope the build against your own hours; every project begins with a free consultation and a fixed-scope proposal." (L219) | WRONG (partly) | The second clause is word for word from about.md L30 and is TRUE. "We scope the build against your own hours" is not on any site page; it comes from the brief's leadAngle. Following lesson 2026-10-06, it is rewritten as advice to the reader. **New:** "[Book a free consultation](/contact/) and bring your baseline sheet; every project begins with a free consultation and a fixed-scope proposal." |
| C10 | "A design system never pays back when 1 small team builds 1 stable product, because the upkeep outruns the hours saved." (L154) | UNVERIFIABLE | No source. The hub only says such a team "needs a UI kit and design tokens first". **New:** "**A design system does not pay back when 1 small team builds 1 stable product and the upkeep outruns the hours saved.**" (The H2 stays as it is.) |
| C11 | FAQ: "…a full design system fits when 2 or more teams build on the same product, because only then do savings outrun upkeep." (L225) | UNVERIFIABLE | The "because only then" clause is not sourced. **New:** "No, not for 1 product with 1–2 designers. Start with a UI kit and design tokens; a full design system fits when 2 or more teams build on the same product." |
| C12 | Worked example labelled "invented … a model, not a client result" (L97, chart badge, captions) | TRUE | No case study covers design systems (brief note). No client names, results, testimonials, awards or certifications appear anywhere in the post or SVGs. |
| C13 | Team size or headcount | TRUE (none) | No team size appears in the post or SVGs. |
| C14 | Author `talha-saleem` | TRUE | home.ts L225, "Senior UI/UX Designer". |
| C15 | Decision tree SVG leaves vs prose (fit-decision-tree.svg) | TRUE | All 4 branches match the post's text version and the L156–160 conditions. The "UI kit + design tokens" leaf matches the hub. "Wait 2 quarters" appears only as advice in the text version, which is consistent. |
| C16 | Other SVGs (formula anatomy, cost stack, one-pager, cover) | TRUE | Text matches the post. They contain no new factual claims. |

## Summary of required replacements (old → new)

1. L61: "The one public timing test with a stated method comes from" → "One public timing test with a stated method comes from"
2. L91: "gets its baseline as a by-product." → "gets its duplicate count as a by-product."
3. L109 and break-even-chart.svg `a3`: "$85 blended (3 engineers to 1 designer, BLS medians ÷ 0.70)" → "$85 blended, an assumption rounded down from the BLS-based blend of about $86 (3 engineers at $92 to 1 designer at $68)". This is a text-only redraw of row a3 with a taller box. **No model result changes.** (If Option B is chosen instead, every result listed in B1 changes and the chart must be redrawn.)
4. L154 bold: see C10.
5. L206 table cell: "Figma inserts and detaches per team" → "Figma library analytics: inserts per team, detaches per component"
6. L211: Chromatic sentence → "Chromatic visual tests compare each Storybook story with its last approved snapshot and flag any visual change for review."
7. L217: see C8.
8. L219: see C9.
9. L225: see C11.

Orchestrator flag (not blocking): the team threshold conflicts between the hub ("2 or more teams") and `content/industries/startups.json` ("3 or more squads").

VERDICT: FAIL
