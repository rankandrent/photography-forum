# QA report: /industries/gaming/ (content/industries/gaming.json)

Date: 2026-10-16 · Reviewer: content-qa (+ link checker) · Brief: content/briefs/gaming.json · Build: `SHOW_DRAFTS=1 npm run build` (page is `index, follow`)

## Gates

| Gate | Result |
|---|---|
| `SHOW_DRAFTS=1 npm run build` | PASS (exit 0), before and after the QA edits |
| `node scripts/onpage-audit.mjs /industries/gaming/` | **97**. The only fail is `slug-keyword` (slug "gaming", the same pattern as the other industry slugs, accepted per orchestrator). 2,178 words |
| `npm run seo:check` | PASS, 0 errors. Before the edits there were 2 gaming warnings: n-gram "loot box odds" missing, and MVP never expanded. Both are fixed, and 0 gaming warnings remain. The 6 warnings left are on draft blogs, not this page |
| `npm run lint` | PASS (exit 0). The jsx-ast-utils notices are pre-existing |

## 1. Intent and cannibalisation: PASS
- The keyword "game ui/ux design services" has commercial service intent: 150/mo, Ahrefs, US, 2026-10-16. KD is not given (recorded, not estimated). Page 1 is all vendor service pages.
- No other page in `content/` targets it. LA and Seattle mention gaming only as capability bullets.

## Keyword, meta and entities (RULES "Keywords, meta and entities"): PASS
| Surface | Rendered value | Result |
|---|---|---|
| title / og:title | "Game UI/UX Design Services \| HUD, Menus & In-Game Stores" (56) | keyword first, PASS |
| description / og:description | "Game UI/UX design services for mobile and web3 games: … playtested. Book a free consultation." (152) | keyword present, ends on the reader action, PASS |
| meta keywords (rendered HTML) | first = "game UI/UX design services" | PASS |
| H1 | "Game UI/UX design services for heads-up displays, menus and in-game stores" | PASS. Reads naturally, and no abbreviation in the H1 |
| First 60 words | hero sub "Our game UI/UX design services plan and design the screens players touch…" | PASS. A grammatical carrier, with no noun stacked on the keyword |
| H2 share | full keyword in 4 of 9 page H2s. "game UI/UX design" is in 3 more (Nitro, process, vs). Template H2s pass on "design" | PASS (script ≥ 40%) |
| Salience | keyword 11× after the edits (9× before) vs top rivals Nitro League 10× and HUD 10× | PASS |
| Entity coverage | 22/22 brief entities in visible text, each with a fact | PASS |
| Attribute coverage (by hand; the script skips industries) | 11/11: full/sprint/audit prices with weeks and team sizes, 1–2 weeks to first design, iOS/Android/web, engine handoff, 5 players per round, 6 screen states, WCAG 2.2 AA + Xbox/GAG, loot box odds disclosure, gamers/collectors/investors | PASS |
| OG image | out/og/industries/gaming.png generated | PASS |

## Concept bindings (rule 7 suitability check): PASS after the QA edits
- Synonyms: each one prints at least once: game UI design services 2, video game UX design 1, UI UX design for games 1, game interface design 2. The plurals/variants are all present.
- Parent: "digital product design services" appears in the abstract and is linked in the definition body. "UI UX design services" links to `/`.
- Children: each has its own H3 in "Which game screens…" (HUD, menus and settings, FTUE, inventory and garage screens, in-game store, game website and marketplace).
- Related: playtesting, game economy, Unity engine, Unreal Engine, Figma and Game Accessibility Guidelines are all present.
- H2 first sentences (entity/synonym + players or game studio): 7/9 passed as written. **2 failed and were fixed by QA:**
  - process: "Our game UI/UX design process takes a game studio…" → "Our game UI/UX design **services take** a game studio…"
  - vs table: "Game UI/UX design decides what players need…" → "Game UI/UX design **services decide** what players need…"
- Composite concepts are whole: heads-up display, first-time user experience, in-game store, NFT marketplace, Unity engine, Web Content Accessibility Guidelines. The FAQ question "Unity or Unreal Engine" is the brief's own wording and is accepted.
- Ambiguous words: each hit was checked in context. "Nitro token" is never a bare "token". Every "store" is "in-game store", "App Store" or "Google Play". "level" is always "WCAG 2.2 level AA". "Google Play" and "play-to-earn" are distinct. HUD is expanded in the hero sub. "game economy", "NFT/game marketplace", "3D garage", "playtesting"/"usability testing services" all carry their context word. "console" is absent.
- Query variants: all 5 are answered with ONE answer (definition, "As a game UI design agency", the HUD item, the outsourcing FAQ, the mobile card and FAQ).

## Layout-aware page: PASS
- Section bodies: definition 59, Nitro 68 (after the MVP bracket), cost 70 words. All within 50–70.
- Every page H2 is followed by `p.semv__answer`. The template rail H2 is followed by the StatsRow text. No H2 is followed by an image.
- One figure, with the alt "Nitro League mobile garage screen…" and the caption "Garage and cars collection UI, Nitro League". The caption and alt name the same screen, and the image sits next to the body sentence that names it.
- Table intro: the answer paragraph ends "The table compares both disciplines." PASS.
- No hidden content: the only `<details>` are `faq__item`. The `intro` and `bullets` fields do not render because `sections` exists, so they are not hidden blocks either.
- FAQ: 5 answers, each 2–3 sentences, Yes/No first. Each FAQPage `acceptedAnswer` holds only its own answer.

## Facts vs home.ts and hubs (QA consistency check; fact detail belongs to the fact-checker): PASS
- $5,000–$15,000 / 2–3 wks, $25,000–$60,000 / 4–8 wks / 2–4 designers, and $60,000–$180,000 / 8–16 wks / 3–6 designers all match home.ts L200–202. Time to first design (1–2 weeks) matches home.ts L187. No audit team size is stated (correct, given the open conflict).
- The process steps and day ranges match digital-product-design-services sections[2] exactly. 40–80 working days matches. "Designers do not write code" follows the hub.
- 44×44 pt and 48×48 dp match the mobile hub.

## Honesty and proof: PASS (page). One sitewide advisory
- Nitro League is the only gaming proof. The rendered "Gaming UI UX case studies" rail shows **Nitro only**, because nitro.md has `industries: [gaming]` (commit 9d3e0ed). The StatsRow shows $5M (Nitro) and 200+ products.
- No testimonial is rendered (`home.testimonial` is undefined). No other client is implied in body copy. The Parents Connect option was not used.
- **Advisory (not a page blocker, owner decision):** the hero `HeroTrust` row (components/sections/PageHero.tsx `TRUST_LOGOS`) shows NBCUniversal, 7-Eleven, Groupon, Sterne Kessler and Nitro League logos under "Trusted by teams at". It is sitewide on every industry page and has no gaming label, so it does not claim gaming work. However, content/home.ts L7–8 says these client names are "carried over from the design draft — replace them with your real ones". The owner should confirm that these clients are real.

## 4. Semantic SEO / readability: PASS
- Bold answers are ≤ ~30 words. No banned phrases or hedges (grep found 0 hits). No keyword+noun stacking: every "game UI/UX design services X" hit is followed by a verb or a preposition.
- US English is used, except "conceptualisation" inside the verbatim Nitro scope quote (accepted).
- Abbreviations: UI and UX are expanded in the abstract. HUD is expanded in the hero, FTUE in its H3, P2E in a card, NFTs in the website item, WCAG in step 5, and IDO in the FAQ. MVP is now expanded by bracket (QA edit).

## 5. Internal links (link-checker pass): PASS
Every target exists in `out/`. Plan vs page:
| linkPlan | Page | Status |
|---|---|---|
| up `/services/digital-product-design-services/` "digital product design services" | definition body | applied |
| up `/` "UI UX design services" (optional) | definition body | applied |
| across mobile, ui-ux-web-design, interaction-design-agency, usability-testing-services, ux-audit-services | Input card, website item, HUD item, step 4, cost body | all applied, anchors = target concept |
| sibling `/industries/startups/` | web3 FAQ "startups UI UX design" | applied. QA lower-cased the mid-sentence anchor ("Startups" → "startups"). It sits in the FAQ rather than the cost/Nitro section. Moving it would push those bodies past 70 words, and the FAQ context ("for pre-launch teams") is a real click reason, so it is kept |
| down `/case-studies/nitro/` "Nitro League case study" | Nitro section + web3 FAQ | applied |
| down `/blog/is-discovery-phase-worth-it/` | step 1 | applied |
That makes 10 unique contextual internal links plus 6 primary external sources (Apple ×2, Google Play, Microsoft, GAG, W3C).

**Inbound links: required orchestrator actions before publish (skill §3.1, no orphan page).** `grep -rn industries/gaming content/` (excluding briefs) finds **0** contextual links today. `internal-in` passes only through the nav and listings.
1. content/case-studies/nitro.md: link one Overview sentence to `/industries/gaming/` with "game UI/UX design services". (`industries: [gaming]` is already done.)
2. content/locations/ux-design-agency-los-angeles.json L157: link "Gaming" → `/industries/gaming/` ("game UI/UX design").
3. content/locations/ux-design-agency-seattle.json L168: link "Gaming" → `/industries/gaming/` ("UI UX design for games").
4. Miami: skip (per the brief).

## QA edits applied to gaming.json (JSON validated with node, rebuilt, re-audited 97)
1. sections[4].answer: "Our game UI/UX design process takes" → "Our game UI/UX design services take" (rule 7).
2. sections[5].answer: "Game UI/UX design decides" → "Game UI/UX design services decide" (rule 7).
3. sections[8].faqs[4].a: anchor "Startups UI UX design" → "startups UI UX design".
4. sections[1].items[4].body: "every loot box shows its odds before purchase" → "loot box odds appear before purchase" (n-gram; meaning unchanged, fact-check E4 still holds).
5. sections[3].body quote: "MVP launch plan" → "MVP [minimum viable product] launch plan" (editorial bracket, the quoted words are unchanged).

## Merged fixes: fact-checker collisions (orchestrator, apply these instead of the FC originals)
FC report: docs/content-system/fact-checks/gaming.md (VERDICT: FAIL).
- **F6 merged** (sections[4].answer). The FC text reverts QA edit 1, so use: `<strong>Our game UI/UX design services take a game studio from discovery to engine-ready handoff in 8–16 weeks (40–80 working days) and 5 steps.</strong>`. Note: F6 drops "first designs in 1–2 weeks", so the attribute "time to first design" drops to 10/11, which still passes (≥ 70%).
- **F2 merged** (faqs[4].a). The FC text re-capitalises the anchor, so use the FC text with `<a href="/industries/startups/">startups UI UX design</a>`. Dropping "metaverse" leaves entities at 21/22 (95%), which passes. Also remove "metaverse" from `semantic.entities` and `mentions` so the schema does not list an entity the page no longer prints.
- **F9 n-gram**: F9 changes `semantic.ngrams` "sliced ui assets" → "figma specs", but after F9 no visible text prints "Figma specs" literally (step 5 becomes "annotated Figma files, design tokens and component specs"), so seo:check would warn. Use the n-gram `component specs` instead. "design tokens" in step 5 carries its own context (the brief's ambiguous "token"), so that is OK.
- **F8 wording**: "…, the prototype playtesting our usability testing services also run, …" reads as a garden path. Suggested: `Five players per round complete tasks in a clickable Figma prototype, the same prototype playtests our <a href="/services/usability-testing-services/">usability testing services</a> run, so friction surfaces before engine work starts.`
- F1, F3, F4, F5, F7, F10 and F11 do not touch QA-edited strings, so apply them as written. After F10 ("Six … standards"), the list still has 5 items with Xbox + GAG combined. That is fine because the H2 count is about standards, not bullets.
- After applying them, rebuild and re-run `node scripts/onpage-audit.mjs /industries/gaming/` and `npm run seo:check | grep gaming`. Expect 97 and no gaming warnings.

## Guidance for the writer
None open. The rule-7 openers, the n-gram and the MVP expansion were fixed in place. Lessons were logged to semantic-content-writer.md and content-link-builder.md.

## Lessons written
- docs/content-system/learnings/semantic-content-writer.md: H2 openers must use the exact entity or a synonym; clear page-specific seo:check warnings; bracket-expand inside quotes.
- docs/content-system/learnings/content-link-builder.md: lower-case a target's `anchor` field in running text.
- docs/content-system/learnings/content-qa.md: read seo:check warnings per route; trace every client signal (HeroTrust logos) to its component.

## Blockers
None in the page itself. Publishing is conditional on (a) the fact-checker's fixes applied in the merged form above, and (b) the 3 required inbound links (nitro.md, LA, Seattle).

VERDICT: PASS
