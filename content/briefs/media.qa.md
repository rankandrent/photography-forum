# QA: /industries/media/ (content/industries/media.json)

Date: 2026-10-22. Brief: content/briefs/media.json. Fact-check: docs/content-system/fact-checks/media.md (read and merged; all 7 fixes plus the optional SC 1.4.1 wording are **applied by QA**, the orchestrator must NOT re-apply them).
Also reviewed: content/services/digital-product-design-services.json (backlink), content/case-studies/mass-media-co.md and vocable.md (`industries` tags).

## Gates (after QA edits and rebuild)
| Gate | Result |
|---|---|
| `npm run build` | exit 0 (rebuilt: out/ was stale; the hub JSON was newer than its built page, so the backlink was not live in out/) |
| `node scripts/onpage-audit.mjs /industries/media/` | **100**, failed [] |
| `node scripts/onpage-audit.mjs /services/digital-product-design-services/` | 100, failed [] |
| `npm run seo:check` | 0 errors, 1 warning (pre-existing, `/` → startups hub anchors; not this page). No media-route warning. |
| `npm run lint` | exit 0 |

## Checklist
| # | Item | Result |
|---|---|---|
| 1 | Intent and cannibalisation: commercial service intent ("media ui/ux design services", Ahrefs 40/mo, GSC 5 impr. on /location/). No other title/H1/keyword/metaTitle in content/ targets it. | PASS |
| 4 | Semantic SEO: bold answers 25–30 words (vs answer was 31 → fixed to 29); entities 25/25 printed; exact keyword 12× (≈1.8% of the 2,626 rendered words); abbreviations expanded (UX, UI, AI, PII, CRM, SaaS, MVP, SUS, WCAG, CCPA, FTC); boolean FAQs start Yes/No; no banned words or hedges (grep: 0). Meta title 58 chars, starts with the exact keyword, no colon; H1 no colon; description 153 chars ending "Book a free consultation." | PASS (after fix) |
| 5 | Internal links: 12 contextual body links (2 up: /, digital-product hub; 5 service hubs; 1 sibling /industries/saas/; 2 case studies; 1 blog deep link). All targets exist in out/. Anchors varied. | PASS (after F1 anchor fix) |
| 6 | Image: /work/mass-media-co/cover.webp exists, is the case study's own image with its alt/caption; viewed: alt matches (campaign planning, reach report, audience chart, product table, 250M). Built `<figure>` with `<figcaption>The Mass Media Co. platform</figcaption>`, sits right after the sentence naming Mass Media Co. | PASS |
| 7 | Readability: section bodies 66–74 words (≤ 90); US English; 5-gram overlap: edtech 2.86%, gaming 1.81%, all other industries < 0.5% (shared grams are hub step names/days, prices, handoff package, WCAG strings). | PASS |
| 7b | Silo/leads: parent digital-product-design-services named and linked in the definition; leadAngle delivered (MMC section → cost; audit FAQ; standards list). funnel bofu / support 5. | PASS |
| 7d | Completeness: every H2 has bold answer → detail → example; FAQ answers 2–3 sentences; no trailing text. | PASS |
| 7e | On-page 100; layout: no hidden content, H2 → text, table intro sentence present, figure has figcaption. | PASS |
| Honesty | Only mass-media-co.md, vocable.md, home.ts and hub facts. No Apex HCM / Fortna / ToolsGroup. No production-code claim (FAQ 2 "No. We stop at design"). No "2+", "60+", "35+" or "seemless" carry-over. Three unsupported MMC attributions found and fixed (cards 2–3, FAQ 6). | PASS (after fixes) |
| Keywords rule 4 | No ":" in metaTitle, og:title, H1. | PASS |
| Keywords rule 5 | AI Overview/PAA unavailable (brief: Ahrefs serp-overview empty, Semrush no units). Proxy competitor questions all answered: definition → H2 1; what it includes → H2 2; engagement + monetization → FAQ 6; redesign existing → FAQ 3; how long → FAQ 4; advertising/sponsored content → standards FTC item + vs table; develop / code → FAQ 2. Proxy entity "design system" was missing → added (home.ts "reusable design system" in the full tier). Not covered, no site fact to back them: "start time", "newsletters", "retention", "cross-platform consistency" (proxy terms only; inventing a start time would breach honesty). | PASS (advisory note) |

## Concept bindings suitability check: PASS
- Synonyms: "media UX design" (vs answer), "UI UX design for media companies" (definition, cards answer, hub backlink anchor), "media platform design" (screens answer, steps, FAQ 4), "marketing platform UX design" (Vocable answer). All present.
- Parent: "digital product design services" linked in the definition body and named in the abstract; "UI UX design services" linked to /.
- Children: order management, media sales packages, campaign reporting, audience dashboards, content workflow, task management, each an H3 item.
- Essential concepts in every H2's first sentence: all 10 carry central entity/synonym + "media companies", "media and marketing teams" or "workflow".
- Composite concepts whole: WCAG 2.2 level AA, CAN-SPAM Act, Global Privacy Control, personally identifiable information (PII) never split.
- Ambiguous words: "engagement" only as audience/content engagement (our work = project/sprint); "audit" always "UX audit of (the) live media tools"; "channel" as "media channel"/"email channel"; "publishers" only as "media publishers" with the no-case-study line. One miss fixed: FAQ question "How long does a media design project take?" used "media design", which the vs section defines as the graphic/creative sense → now "How long does media platform design take?".
- Query variants, one answer each: media ui/ux design services → H2 1; media ux design → vs answer; ui ux design for media companies → definition body; media ui ux design agency → FAQ intro; publishing ux design → FAQ 5 (capability + "None of that is published work yet").
- One answer site-wide vs hub: prices/weeks/designers = home.ts; 5 step names and days = digital-product hub; 4 price factors = hub; handoff "designers stay … through launch" = hub. Mismatch fixed: FAQ 5 claimed the mobile hub runs "the same 5-step process" (it has its own 5 steps over 4–8 weeks).

## QA edits applied (content/industries/media.json; facts unchanged)
1. Screens item "Media sales packages": "Sales teams package social media sales, such as Facebook marketing, and other campaign products as clear offers…" → "For social media sales, sales teams package social campaigns, such as Facebook marketing, as clear offers with goals attached, so a buyer knows what each package delivers." (grammar; "other campaign products" not in the case)
2. Card "Internal teams and clients on one platform" (merged with FC F2): "On a media platform, order takers, sales teams and creative teams work inside the tool, while clients read audience engagement reports. Each of these user roles needs its own view and permission states, so clients open their reports, not the order screens."
3. Card "Audience data with personal information" (merged with FC F3): "That platform's audience database holds verified personally identifiable information (PII). Screens for data like this need to show segments and reach instead of raw personal records, plus each segment's opt-out status. …"
4. Card "Content at deadline speed" (FC F4): "Content platforms delivered online as software as a service (SaaS) follow patterns…"
5. Step 1 link (FC F1, brief's own alternative target, keeps "Mass Media Co." at the 8 cap): "Our discovery guide lists <a href="/blog/is-discovery-phase-worth-it/#what-does-a-discovery-phase-hand-to-your-designers">what a discovery phase hands to your designers</a>."
6. Step 5: "Every screen state is finished at the accessibility level of Web Content Accessibility Guidelines (WCAG) 2.2 level AA." → "Every screen state is finished to one accessibility level, Web Content Accessibility Guidelines (WCAG) 2.2 level AA."
7. Vs bold answer (31 → 29 words): "…decides how media and marketing teams run orders, campaigns and audience reports; ad creative design makes the ads audiences see."
8. Cost body: "A full media platform design, with a reusable design system, needs 3–6 designers, while…" (home.ts full tier; covers proxy entity "design system").
9. Standards WCAG item (FC optional precision): "color is never the only visual means of conveying information".
10. FAQ 4 question: "How long does media platform design take?" (ambiguity fix; also clears the "media design" sense the vs table assigns to ad creative).
11. FAQ 5 (FC F5): "…runs through our <a …>mobile app UI UX design services</a>, a 5-step process of 4–8 weeks."
12. FAQ 6 (FC F6): "The platform also brought advanced data analytics, real-time performance tracking and dedicated client support, so we never credit audience engagement or monetization gains to design alone."
13. Hub backlink, content/services/digital-product-design-services.json sections[0].body (FC F7, implied-client fix): "The same process applies to order, campaign and content tools for media and marketing companies, as our <a href="/industries/media/">UI UX design for media companies</a> shows." Body 59 words.

## Backlink suggestions status
- Hub backlink (required): **applied**, live in out/services/digital-product-design-services/index.html, anchor "UI UX design for media companies".
- mass-media-co.md `industries: [media]` and vocable.md `industries: [saas, media]` (required): **applied**; rail shows only Mass Media Co. and Vocable.
- mass-media-co.md Overview sentence (conditional): **not applied**, orchestrator asked for one backlink this run. Recommend adding next run; today the page has 1 contextual inbound link (nav/listings carry the rest).
- New York / Atlanta location bullets, /location/: **skipped** with the brief's reasons.

## Owner notes (not page blockers)
- **HeroTrust (escalated for this page):** components/sections/PageHero.tsx `TRUST_LOGOS` renders NBCUniversal, 7-Eleven, Groupon, Sterne Kessler and Nitro League under "Trusted by teams at". content/home.ts L7–8 calls these draft names. NBCUniversal is a media company, so on this page it reads as media-client proof next to "It is our one published media project". Owner decision needed before publish: confirm NBCUniversal is a real client, or hide the row on /industries/media/ (template change, out of QA scope).
- Vocable is in the "Media UI UX case studies" rail via `industries: [saas, media]` while the page says it is "not a media company". Text is honest; keep or drop the tag per owner preference.
- Known conflict: home.ts FAQ "We deliver design and development" vs hub "designers do not write code". Page follows the hub.

## Guidance for the writer
None open. All gaps were closed by the QA edits above. Lessons written to docs/content-system/learnings/semantic-content-writer.md (client-named sentence followed by generic design claims; cross-hub process wording) and seo-keyword-researcher.md (deep-link anchor must describe the target section).

## FAIL list
None open after QA edits (fact-check F1–F7 applied and merged).

VERDICT: PASS
