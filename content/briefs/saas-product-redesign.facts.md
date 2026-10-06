# Fact-check: saas-product-redesign

Checked 2026-10-06 against `content/blog/saas-product-redesign.md`, the brief, the 5 SVGs in
`public/blog/saas-product-redesign/`, and the site sources: `content/home.ts`, `lib/site.ts`,
`content/pages/about.md`, `content/services/saas-ux-design.json`, `content/industries/saas.json`
and `content/case-studies/*.md`.

**Method.** WebFetch is blocked by the egress proxy, so every external claim was checked with a
WebSearch limited to the source's domain. A claim counts as verified only when the search returned
the exact URL and a snippet that supports the sentence. Site and case-study claims were checked by
reading the files above ("site file" in the table).

## Claims

| # | Claim (post line) | Verdict | Source / method |
|---|---|---|---|
| 1 | Google HEART framework, Rodden, Hutchinson and Fu, 2010; goals-signals-metrics process (L54); link `research.google.com/pubs/archive/36299.pdf` | TRUE | https://research.google.com/pubs/archive/36299.pdf (exact URL returned by a WebSearch limited to research.google.com: CHI '10 paper by Rodden, Hutchinson and Fu; HEART plus goals-signals-metrics). |
| 2 | ToolsGroup: 30+ stakeholder interviews; 75% of sales losses traced to the UI, not to missing features (L56); link `/case-studies/toolsgroup-supply-chain-ux/` | TRUE | Site file `content/case-studies/toolsgroup-supply-chain-ux.md` (results "75% of sales losses traced to UI, not features" and "30+ stakeholder interviews"). The file is a stub, and the post adds nothing beyond it. |
| 3 | "Sales often blames missing features when the interface is the cause" (L56) | Opinion, not a fact claim | Not a statistic. It frames the ToolsGroup finding. No change needed. |
| 4 | Decision tree SVG and its alt text (L66): the "No" branch from "Do several lifecycle stages leak?" ends at "Not a redesign: price, positioning or a missing integration" | WRONG (contradicts the post) | The post (L58, L64) says a redesign is ruled out when churn interviews name price, positioning or a missing integration, not when fewer than several stages leak. In the tree, a cause that spans more than one journey but only one stage (or a structural failure inside one stage) ends at "Not a redesign". The post text never says that. The tree order also differs from the prose (flow fix, then lifecycle, then platform): it puts "not a redesign" and "platform rebuild" before "lifecycle redesign". See fix F1. |
| 5 | Scope table durations: flow fix 4–8 wks, lifecycle redesign 4–8 wks, platform rebuild 8–16 wks (L72–74); FAQ L166, L178 | TRUE | Site file `saas-ux-design.json`: "takes 4–8 weeks"; "component library moves to … $60,000–$180,000 over 8–16 weeks". |
| 6 | Prices: one-role onboarding redesign near $25,000; full lifecycle near $60,000; component library $60,000–$180,000 (L76) | TRUE | Site file `saas-ux-design.json`, section "How much does SaaS UX design cost?" (word-for-word match). |
| 7 | "Every tier ends with a WCAG 2.2 level AA checklist for each screen" (L76) | TRUE | `saas-ux-design.json` handover: "WCAG 2.2 level AA checklist for every screen". Platform tier: `web-app-design-services.json` ("check every screen against WCAG 2.2 level AA") and `industries/saas.json` ("WCAG 2.2 AA check"). The standard itself: https://www.w3.org/TR/WCAG22/ (W3C Recommendation, 5 Oct 2023; WebSearch limited to w3.org). |
| 8 | "We run this scoping as the discovery step of a 4–8 week SaaS UX design sprint: bring your funnel export … to a free consultation, and leave with a scope tier and a fixed-scope proposal." (L78) | WRONG (mixes free and paid steps) | about.md: "every project begins with a free consultation and a fixed-scope proposal". The hub's discovery step (3–5 days, inside the paid engagement) reviews funnels, interviews 5–8 customers and sets one target metric per stage. The sentence makes the paid discovery step and the free consultation the same thing. See fix F2. |
| 9 | Jobs to be Done interviews with 5–8 customers (L95) | TRUE | `saas-ux-design.json`, process step 1. |
| 10 | "In week 1 we ask for read access to Amplitude, Mixpanel or Pendo, a recent support ticket export, the raw churn-survey text and a list of top accounts by seat count" (L97) | UNVERIFIABLE (first-person process claim not on the site) | The site only says discovery reviews "product funnels in Amplitude or Mixpanel" and that "Amplitude, Mixpanel or Pendo access adds funnel and feature-usage data". The ticket export, churn-survey text and seat-count list come from the brief's "first-hand angle". The site does not state them. See fix F3. |
| 11 | Amplitude/Mixpanel funnel steps; Pendo feature-usage data (L49–50) | TRUE | https://amplitude.com/docs/analytics/charts/funnel-analysis/funnel-analysis-interpret (WebSearch limited to amplitude.com: "identify … where users tend to drop off"). https://www.pendo.io/product/features/feature-adoption-analytics/ (WebSearch limited to pendo.io). |
| 12 | Risk matrix SVG placements and alt text (L103) | TRUE (consistent) | SVG: x-axis rarely→often, y-axis small→big. Protect (often + big) = power users and workspace admins, which matches L101 and the brief. Move fast (rarely + big) = new trials, which matches L113 (onboarding in the new version only). Communicate only (rarely + small) = occasional billing users. Test hardest (often + small) = "Weekly tasks: speed and errors", which matches L113/L115. The alt text matches the SVG. Note: the "Weekly tasks" label is a task, not a segment, though the subtitle says "Plot each segment". Accounts near renewal (L101) are not plotted. Neither point is a factual error. |
| 13 | GV Library, Aaron Sedley: change aversion is a "negative short-term reaction" to changes in a product; Google limits it with usability studies, internal dogfooding and partial launches (L105); link | TRUE | https://library.gv.com/change-aversion-why-users-hate-what-you-launched-and-what-to-do-about-it-2fb94ce65766 (WebSearch limited to library.gv.com returned this path; the only difference is a Medium `?gi=` tracking parameter. Snippets: "the negative short-term reaction to changes in a product or service"; "usability studies, 'dogfooding' with internal users, and partial launches"). Recovery over weeks: "you should see at least a recovery to the pre-launch satisfaction level". |
| 14 | Link `/industries/saas/` "admin and permission design for B2B SaaS … goes deeper on roles" (L107) | TRUE | `industries/saas.json` covers role and permission managers, admin consoles and permission matrices. |
| 15 | 5 participants per round, Figma prototype in Maze (L117) | TRUE | `saas-ux-design.json` ("tested with 5 users per round in Maze"). Maze tests Figma prototypes: https://maze.co/integrations/figma/ (WebSearch limited to maze.co). |
| 16 | NN/g: 5 users find most usability problems in a qualitative round; 3–4 per group when one study covers two distinct groups (L117); link | TRUE | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ (exact URL returned by a WebSearch limited to nngroup.com: "testing with 5 people uncovers 85% of the usability issues"; "typically you can get away with 3–4 users per group" when there are two groups). I checked each number separately. |
| 17 | SUS is John Brooke's 10-item questionnaire; each round scored with SUS (L119) | TRUE | `saas-ux-design.json` ("each round ends with a System Usability Scale (SUS) score"). https://measuringu.com/sus/ (WebSearch limited to measuringu.com: created by John Brooke; a ten-item questionnaire). |
| 18 | "A mean SUS score of 68 is the widely used benchmark for average usability" (L119); link `mhealth.jmir.org/2022/8/e37290` | TRUE | https://mhealth.jmir.org/2022/8/e37290 (Hyzy et al. 2022; WebSearch limited to mhealth.jmir.org: "the widely used SUS distribution for benchmarking (mean 68, SD 12.5)"). |
| 19 | Link `/services/usability-testing-services/` (L121) | TRUE | Service exists (linked from about.md). |
| 20 | LaunchDarkly: feature flags release to a target segment and widen the audience step by step; soft launches with percentage rollouts (L129); link | TRUE | https://launchdarkly.com/blog/soft-launches-using-feature-flags/ (exact URL returned by a WebSearch limited to launchdarkly.com: "incrementally roll out a feature to your users", "target small segments"). The 10/25/50% ramp is labelled as an example. |
| 21 | Rollback through the flag "with no new deploy" (L133; rollout SVG legend) | TRUE | https://launchdarkly.com/docs/home/releases/percentage-rollouts ("without having to redeploy"; percentage "can be increased or decreased"). |
| 22 | Rollout SVG: steps internal → beta → 10% → 25% → 50% → 100%; toggle bar from beta to sunset; sunset marker; alt text (L137) | TRUE | Matches steps 1–5 (L127–131) and the alt text. The toggle bar spans x=236 (beta) to x=690 (sunset), which covers step 4 "100% with the toggle still available". |
| 23 | Rollout image caption "with a rollback loop at every gate" (L137) | WRONG (minor, SVG mismatch) | The SVG has 5 gate icons but only 4 rollback arrows (10%→beta, 25→10, 50→25, 100→50). The gates at internal→beta and beta→10% have no arrow back. See fix F4. |
| 24 | Before/after SVG: before has two dead ends and a support-ticket exit with no first value; after has sign-up plus two screens to the first value moment; labelled illustrative (L154) | TRUE | Matches the SVG (after: 4 boxes = sign-up + 2 screens + first value). No client data appears on the graphic. |
| 25 | Apex HCM: legacy payroll platform, 200+ screens to 6 steps; VP Product quote "The new flow cut onboarding time by more than half." (L158) | TRUE | Site file `apex-hcm-payroll-ux.md` (result, quote and quoteAuthor are word-for-word). |
| 26 | TradeZella: cluttered interface, steep learning curve, no onboarding guide; dashboard and user-flow rebuild; +40% interaction, +25% retention, +30% new customers (L158); link `/case-studies/tradezella/` | TRUE | Site file `tradezella.md` (challenge list; "rebuilt the user flows"; "dashboard revamp"; results table). |
| 27 | "The free consultation returns a scope tier, a baseline-and-rollout plan and a fixed-scope proposal, run as the discovery step of our SaaS UX design sprint." (L160) | WRONG (offer not on the site) | about.md promises only "a free consultation and a fixed-scope proposal". No site page offers a rollout plan. The free consultation is not the paid discovery step. See fix F5. |
| 28 | "We have designed 200+ products since 2017." (L160) | TRUE | RULES.md confirmed facts; `home.ts` ("200+ Products designed and shipped", "since 2017"); `lib/site.ts` founded: 2017. |
| 29 | Author faizan-khan (Sr. Product Designer) | TRUE | `home.ts` team: Faizan Khan, Sr. Product Designer. |
| 30 | Cover SVG text ("SaaS UX design guide", "SaaS product redesign without a churn spike") | TRUE | No factual claims. |

No invented clients, testimonials, awards, certifications, team members or local offices were
found. The brief's banned uplift numbers (40% activation, 20–30% lift, etc.) do not appear.

## Fixes (exact replacements)

**F1 — decision tree (`public/blog/saas-product-redesign/scope-decision-tree.svg` + alt text on L66).**
Rebuild the tree in the same order as the post:
"Which metric stalled?" → "Do churn interviews point to the UX?" (No → "Not a redesign: price,
positioning or a missing integration") → Yes → "Is the cause confined to 1 journey?" (Yes → "Flow fix")
→ No → "Can navigation, roles and components still hold the product?" (No → "Platform rebuild";
Yes → "Lifecycle redesign").
Replace the alt text on L66 with:
`Decision tree that starts at "Which metric stalled?": if churn interviews do not point to the UX, the cause is price, positioning or a missing integration rather than a redesign; if the cause is confined to 1 journey, flow fix; if navigation, roles and components can no longer hold the product, platform rebuild; otherwise lifecycle redesign`

**F2 — L78, second sentence.** Replace
"We run this scoping as the discovery step of a 4–8 week SaaS UX design sprint: bring your funnel export or the three flows you suspect to a free consultation, and leave with a scope tier and a fixed-scope proposal."
with
"Bring your funnel export or the three flows you suspect to a free consultation and leave with a fixed-scope proposal; the discovery step of our 4–8 week SaaS UX design engagement then sets one target metric per lifecycle stage."

**F3 — L97.** Replace
"In week 1 we ask for read access to Amplitude, Mixpanel or Pendo, a recent support ticket export, the raw churn-survey text and a list of top accounts by seat count, so the riskiest customers are known before a screen changes."
with
"In week 1, gather read access to Amplitude, Mixpanel or Pendo, a recent support ticket export, the raw churn-survey text and a list of top accounts by seat count, so the riskiest customers are known before a screen changes."

**F4 — L137 image caption.** Replace `"Exposure over time, with a rollback loop at every gate"` with
`"Exposure over time, with a rollback loop at every percentage step"`.

**F5 — L160, second sentence.** Replace
"The free consultation returns a scope tier, a baseline-and-rollout plan and a fixed-scope proposal, run as the discovery step of [our SaaS UX design sprint](/services/saas-ux-design/)."
with
"The free consultation ends with a fixed-scope proposal, and the discovery step of [our SaaS UX design sprint](/services/saas-ux-design/) sets the baseline and one target metric per lifecycle stage."

VERDICT: FAIL

## Round 2

Re-checked 2026-10-06 against the repaired `content/blog/saas-product-redesign.md` (line numbers
below refer to the current file) and the redrawn `scope-decision-tree.svg`. External sources were
again checked with domain-limited WebSearch, because WebFetch is blocked.

### Round-1 items

| Fix | Round-2 status | Evidence |
|---|---|---|
| F1 decision tree + alt text (L66) | TRUE | The SVG now reads: "Which metric stalled?" → "Can users show the cause is UX?" (No → "Not a redesign: price, positioning or a missing integration") → Yes → "Is the cause confined to 1 journey?" (Yes → Flow fix) → No → "Can navigation, roles and components still hold the product?" (No → Platform rebuild; Yes → Lifecycle redesign). I walked every leaf. Each one matches the post's conditions: L43 ("users can show you why"), L58 (price, positioning, integration), L64 (one journey → flow fix; structure fails → platform rebuild). The first question wording differs from my F1 ("churn interviews"), but it matches the L43 answer and the "Evidence the cause is UX" column, so it is accurate. The alt text on L66 describes the SVG branch for branch. |
| F2 (L78) | TRUE | Pasted word for word. about.md: "every project begins with a free consultation and a fixed-scope proposal". `saas-ux-design.json` L28/L70/L74: the engagement takes 4–8 weeks, and the "Discovery and metrics" step sets "1 target metric per lifecycle stage". The free and paid steps are now separate. |
| F3 (L97) | TRUE | Now advice to the reader ("In week 1, gather…"), not a first-person process claim. |
| F4 (rollout caption) | No longer applies | The rollout image and its caption were removed from the post. The orphan file `public/blog/saas-product-redesign/rollout-exposure-curve.svg` is still in the folder, but nothing references it. Claims 20–21 (L129, L133 "no new deploy") are unchanged and still TRUE. |
| F5 (old L160, now L157) | WRONG (see R2-1) | The writer did not paste F5. They rewrote the sentence, and the rewrite adds a new claim. |

### New or rewritten sentences

| # | Claim (current line) | Verdict | Source / method |
|---|---|---|---|
| R2-1 | "A free consultation ends in a fixed price inside our published ranges, and discovery in [our SaaS UX design sprint](/services/saas-ux-design/) starts by recording your baseline." (L157) | WRONG | (a) "a fixed price inside our published ranges": about.md promises "a free consultation and a fixed-scope proposal", not a fixed price. No site page guarantees that the price falls inside the published ranges. `content/pages/terms.md` says the price ranges "are provided for general guidance. It is not an offer". `home.ts` L199 says "Full design and build engagements are scoped after discovery." (b) "starts by recording your baseline": the hub's discovery step (`saas-ux-design.json` L74) reviews funnels in Amplitude or Mixpanel, runs 5–8 JTBD interviews and sets 1 target metric per lifecycle stage. It does not say that discovery starts by recording a baseline. Replacement below. |
| R2-2 | HEART "covers happiness, engagement, adoption, retention and task success" (L54) | TRUE | https://research.google.com/pubs/archive/36299.pdf (exact URL returned by a WebSearch limited to research.google.com: HEART = Happiness, Engagement, Adoption, Retention and Task success; Rodden, Hutchinson and Fu, CHI 2010). |
| R2-3 | L78 rewrite | TRUE | See F2 above. "The three flows you suspect" is advice, not a site claim. |
| R2-4 | L97 rewrite | TRUE | See F3 above. |
| R2-5 | "We have designed 200+ products since 2017." (L157) | TRUE | Unchanged; `home.ts`, `lib/site.ts`. |

Honesty check: no new clients, results, testimonials, awards, certifications, team members or
offices were added. Non-factual note for the editor: L135 has no blank line before the
"## Which redesign mistakes turn into churn?" heading (L136), so the heading may not render.

### Fix (exact replacement)

**R2-1 — L157, second sentence.** Replace
"A free consultation ends in a fixed price inside our published ranges, and discovery in [our SaaS UX design sprint](/services/saas-ux-design/) starts by recording your baseline."
with
"A free consultation ends with a fixed-scope proposal, and discovery in [our SaaS UX design sprint](/services/saas-ux-design/) reviews your product funnels and sets one target metric per lifecycle stage."

(Each part of this wording comes from about.md L29 and `saas-ux-design.json` L74 word for word. It
leaves out "fixed price", "published ranges" and "baseline".)

VERDICT: FAIL
