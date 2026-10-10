# Fact-check: is-discovery-phase-worth-it

Run: 2026-10-10, review loop 1. Checked `content/blog/is-discovery-phase-worth-it.md` and every SVG in
`public/blog/is-discovery-phase-worth-it/` (cover, output-stack, assumption-ledger, skip-test-flow,
escalation-ladder, readout-checklist).

Method: WebFetch failed with `ENOTFOUND` for svpg.com, gov.uk and nngroup.com. I verified with WebSearch
instead, limited to each source's domain plus exact-phrase searches (learnings 18 and 37). For all three
external links, the search returned the same host and path as the post (`www.` included).

Honesty scan: no Apex HCM, Fortna or ToolsGroup (grep: 0 hits). No team size. No production-code claim.
Nothing on whether discovery is sold separately, and no discovery-only price. The About offer appears once
in the body, word for word. The description's "request a fixed-scope proposal" is a CTA, not a second copy
of the offer. No invented clients, awards or testimonials.

## Claims

| # | Claim (post wording, short) | Verdict | Source |
|---|---|---|---|
| 1 | SVPG / Marty Cagan "four big risks": value (will customers buy or use it), usability (can users figure it out), feasibility (can engineers build it), business viability (does it work for the business) | TRUE | https://www.svpg.com/four-big-risks/ (search summary: value = whether customers will buy or users choose to use it; usability = whether users can figure out how to use it; feasibility = whether engineers can build it; viability = whether the solution works for the various parts of the business) |
| 2 | "feasibility is an engineering call, so whoever will build the product joins in" | TRUE | Same page plus https://www.svpg.com/build-to-learn-vs-build-to-earn/ (feasibility is tested with engineers). The post stays silent on who builds, as required. |
| 3 | Ledger row "Clinics will pay a monthly fee per location" typed as Viability | TRUE (borderline) | SVPG lists monetization under business viability. The row is a per-location pricing model, so Viability is defensible. No change required. |
| 4 | GOV.UK Service Manual: reframe any predefined solution as a problem to be solved | TRUE | https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works ("interrogate that solution and reframe it as a problem to be solved") |
| 5 | GOV.UK: do not start building the service during discovery | TRUE | Same page ("You should not start building your service in discovery.") |
| 6 | GOV.UK treats what a team learns in discovery as the basis for deciding whether to move on to the next phase at all (body and FAQ) | TRUE | Same page (discovery ends with the decision whether to move to alpha, based on whether a viable service could be built and whether pursuing the problem is cost-effective) |
| 7 | "It is a public-sector standard, not startup data" | TRUE | Same page (UK government Service Manual) |
| 8 | NN/g: Maria Rosala, Director of Research at Nielsen Norman Group (NN/g) | TRUE | https://www.nngroup.com/people/maria-rosala/ (Director of Research). The article's author is Maria Rosala: https://www.nngroup.com/articles/author/maria-rosala/ lists it. |
| 9 | Rosala "surveyed UX practitioners and found that many discoveries run short, lack user research and leave out the right people" | TRUE | https://www.nngroup.com/articles/discoveries-in-industry-revealed/ ("How Well Discovery Phases Are Performed in UX Projects", May 17, 2020; 436 UX practitioners surveyed in October 2019): "many are on the short side, lack user research and don't involve the right people". The paraphrase keeps the meaning and is not in quotation marks. Optional: write "don't involve the right people" to match the source exactly. |
| 10 | Double Diamond: discovery is the first diamond (explore widely, then narrow to one problem) | TRUE | Design Council Double Diamond (Discover → Define). Matches the hub's "Double Diamond model". The post does not link it. |
| 11 | Google HEART framework = Happiness, Engagement, Adoption, Retention and Task success | TRUE | https://research.google/pubs/pub36299/ (Rodden, Hutchinson and Fu, CHI 2010) |
| 12 | Many online lists of discovery deliverables come from software development shops and center on a tech stack and an estimate | TRUE | Examples: https://andersenlab.com/blueprint/discovery-phase-deliverables (architecture vision, budget plan), https://Deepinspire.com/discovery-phase (tech stack, time and budget estimates). Matches the brief's SERP gap. |
| 13 | "Vendor pages often put a percentage on the overspend from skipping discovery; none we found shows its method" | TRUE | https://acquaintsoft.com/blog/software-discovery-phase-cost-why-skipping-fails (40–60%, backed only by the firm's "1,300+ projects" experience, with no stated method) and https://www.easy.bi/blog/software-discovery-phase-guide/. The post gives no figure, so no statistic needs a source. |
| 14 | No cost multipliers or failure rates anywhere (body, takeaways, ladder SVG) | TRUE | The ladder is qualitative only. The CB Insights option was not used. |
| 15 | Hub: "usability issues found in a clickable prototype cost hours to fix, while the same issues found after launch cost development sprints" | TRUE | `content/services/digital-product-design-services.json` benefits card "Reduces rework cost" (word for word) |
| 16 | Discovery and product strategy take 5–10 days, user research takes 5–15 days, the first two of five steps | TRUE | Hub process steps 1–2 |
| 17 | Full engagement 8–16 weeks (40–80 working days). After discovery and research come IA, prototype validation and UI design. | TRUE | Hub process answer and steps 3–5 |
| 18 | Discovery days: stakeholder workshops, Jobs to be Done mapping, HEART metrics. Research days: 5–8 users per user group. | TRUE | Hub steps 1–2 |
| 19 | Researchers synthesize the interviews in Dovetail. A later step tests the prototype with 5 users per round in Maze, scored with SUS. | TRUE | Hub steps 2 and 4 |
| 20 | Output stack (brief: users and JTBD; report: 5–8 interviews per group, unmet needs, workarounds, switching triggers; sitemap and flows; metrics such as weekly active users and task completion time) | TRUE | Hub deliverables list. "scope" on the brief card is generic advice, not a hub claim. |
| 21 | Price follows four factors (platforms, user groups, core user flows, validation rounds). The range sits under the cost link. | TRUE | Hub "How much does digital product design cost?". No $ figure is stated in the post. The fragment `#how-much-does-digital-product-design-cost` matches `sectionId(h2)` in `components/sections/SemanticSections.tsx`. |
| 22 | "User groups weigh most on research, because each group gets its own 5–8 interviews" | UNVERIFIABLE | The hub supports "5–8 users per user group" but does not rank any input as weighing "most". See F4. |
| 23 | "The designers who run your research stay through design, testing and handoff" (and takeaway 5, "run by the designers who later design the screens") | TRUE | `content/pages/about.md`, How we work (word for word). The takeaway paraphrases it. |
| 24 | "Every project begins with a free consultation and a fixed-scope proposal." | TRUE | about.md, word for word, once in the body |
| 25 | "200+ products since 2017" | TRUE | RULES.md confirmed facts. about.md says "more than 200 digital products" since 2017. |
| 26 | "runs discovery as the first step of every digital product design engagement" | TRUE | Hub: 5 steps "from discovery to developer handoff" |
| 27 | "The light version is a 5-day design sprint for startups, which aligns founders on 1 target user and 1 core problem **before you commit to the full design**" | UNVERIFIABLE | `content/services/ui-ux-design-services-for-startups.json`: "A 5-day GV Design Sprint aligns founders on 1 target user and 1 core problem". The added clause presents the sprint as a gate you buy before committing to a larger design engagement. That is not on the startup hub, where the sprint is step 1 of its own 4–8 week engagement, and it edges toward how discovery is sold. See F2. |
| 28 | FAQ: "A design sprint picks one direction and tests it quickly" | TRUE | Startup hub step 1: "decide on 1 direction, prototype it and test it with 5 users" |
| 29 | FAQ: "A sprint fits when those [target users, jobs, success metrics] are known and one bet needs testing." | WRONG (contradicts site and post) | The startup hub says the sprint *aligns founders on 1 target user*, so the sprint is where the target user gets set, not a precondition. The post's own skip test also sends 3–4 yes answers (some of these still unknown) to the sprint. See F3. |
| 30 | Intro: Nitro League, one racing game for gamers, NFT collectors and investors. Started with product discovery and stakeholder interviews, before branding. $5M in funding within 3 months, a whole-project outcome. | TRUE | `content/case-studies/nitro.md` (Overview, The solution, Results) |
| 31 | Nitro: investors doubted whether crypto products were authentic. Discovery and interviews produced the user flows and a detailed whitepaper. Branding workshops, 3D garage, website. Professional gamers validated. | TRUE | nitro.md (The challenge, Our approach, The solution) |
| 32 | Case H2 bold: "early research settled **who the product serves** and how its core logic works" | WRONG | nitro.md Overview: Nitro "set out to serve three audiences" from the start, and Vocable's audience (content marketers) is given in its challenge. Research did not settle who these products serve. See F1. |
| 33 | Vocable: creator journey mapped; each screen designed around a problem heard in stakeholder interviews (planning, drafting, optimizing, publishing); one editor across several AI models, templates, research tool | TRUE | `content/case-studies/vocable.md`, Our approach |
| 34 | Vocable: 35% increase in overall workflow efficiency, 20% improvement in content quality and consistency. Anchor "idea to MVP". | TRUE | vocable.md frontmatter `results` and description ("from idea to MVP") |
| 35 | Digno: score understood by managers and employees; requirements gathered from different stakeholders and users to define the calculation; competitors studied; five core experiences; 5x increase in overall revenue | TRUE | `content/case-studies/digno.md` (challenge, approach, results) |
| 36 | "Each case study reports results from the whole project, not from discovery alone" (and intro framing) | TRUE | Framing rule from the brief is met. No result is credited to discovery. |
| 37 | All three are "idea-to-product projects" | TRUE | Scope of work in nitro.md, vocable.md and digno.md: "idea to product" |
| 38 | Skip-test cut-offs labeled "our rule of thumb … not research data". The SVG carries a "Rule of thumb" tag. | TRUE | Labeled as opinion. The SVG questions and exits match the text list. |
| 39 | SVGs: output-stack, assumption-ledger (labeled illustrative), escalation-ladder (qualitative), readout-checklist (8 lines = text list), cover | TRUE | Each SVG's text matches its "Show as text" block. No numbers that are not in the post. |

## Fixes (exact old → new)

**F1 (claim 32, case H2 bold answer)**
- Old: `**In all three idea-to-product projects, early research settled who the product serves and how its core logic works, and the design was built on that.**`
- New: `**In all three idea-to-product projects, early research came before the screens: it gave Nitro League its user flows, Vocable the problems each screen was designed around, and Digno its score calculation, and the design was built on that.**`
- Basis: nitro.md "From these we mapped the user flows". vocable.md "designed each screen around a problem we heard in stakeholder interviews". digno.md "gathered the requirements … to define how the score is calculated".

**F2 (claim 27, skip-test section)**
- Old: `The light version is [a 5-day design sprint for startups](/services/ui-ux-design-services-for-startups/), which aligns founders on 1 target user and 1 core problem before you commit to the full design.`
- New: `The light version is [a 5-day design sprint for startups](/services/ui-ux-design-services-for-startups/), which aligns founders on 1 target user and 1 core problem.`
- Basis: startup hub deliverable "Design sprint." (word for word apart from the article).

**F3 (claim 29, FAQ "Is a design sprint the same as a discovery phase?")**
- Old: `A sprint fits when those are known and one bet needs testing.`
- New: `A sprint fits when one bet needs testing quickly; a full discovery phase fits when several user groups, jobs or success metrics are still open.`
- Basis: matches the startup hub (the sprint decides 1 direction and tests it) and the post's own skip test (3–4 yes → sprint, 0–2 → full discovery).

**F4 (claim 22, scoping section)**
- Old: `User groups weigh most on research, because each group gets its own 5–8 interviews.`
- New: `Each user group adds its own 5–8 interviews to the research step.`
- Basis: hub step 2, "Researchers interview 5–8 users per user group".

No SVG changes are required. None of F1–F4 changes text that also appears in an SVG or alt text.

VERDICT: FAIL
