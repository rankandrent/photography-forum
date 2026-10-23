# Fact-check: customer-journey-map-template

Post: `content/blog/customer-journey-map-template.md` · Brief: `content/briefs/customer-journey-map-template.json`
Download/image text checked: `public/blog/customer-journey-map-template/` (template PDF, example PDF, template SVG, CSV, PNG, cover, downloads, anatomy, vs-maps, evidence-map, example SVG).
Checked 2026-10-23. No file was edited. The role rule says "Do not edit the post", so every fix below is an exact replacement for the orchestrator to apply.

## Claims

| # | Line | Claim | Verdict | Source |
|---|---|---|---|---|
| 1 | 26 | "Every customer journey map template has the same empty cell under Stage 2, Thinking" | WRONG (minor, universal) | The Confluence template uses Stage, User Action, Pain points and questions, Emotions, with no Thinking lane (https://www.atlassian.com/software/confluence/templates/customer-journey-mapping). See F11 |
| 2 | 26, 196, 202, 217 | The intro cell and the worked example are illustrative ("an illustrative example", "made up") | TRUE (honesty) | Post text. The example PDF and SVG both print "Illustrative example" and "Illustrative example, not a client project" |
| 3 | 28 | Journey mapping is a UX research method; UP link to /services/ux-research-services/ | TRUE | content/services/ux-research-services.json (tags "Journey mapping") |
| 4 | 30, 32 | Each file has 6 header fields, 5 stage columns and 8 lanes | TRUE | template SVG, PDF, PNG and CSV checked (6 header boxes, Stage 1–5, 8 lanes) |
| 5 | 34 | PDF, US Letter landscape | TRUE | template PDF renders 11×8.5 landscape (SVG viewBox 1100×850) |
| 6 | 35 + downloads SVG line 170 | SVG "editable in Figma, FigJam, Miro or PowerPoint" | WRONG (Miro, FigJam) | Miro help (help.miro.com/hc/articles/360017731613) lists SVG as uploaded "as a solid image". FigJam's import list (https://help.figma.com/hc/en-us/articles/1500007927941) has PNG, JPG, GIF, TIFF, WEBP, CSV (as tables), PDF and video, and no SVG. PowerPoint: Convert to Shape (Microsoft page). See F3 |
| 7 | 36 | PNG 3300 × 2550 px | TRUE | Read reports the original image as 3300x2550 |
| 8 | 37, 268 | CSV: header fields on top, column A lists the 8 lanes, columns B–F are 5 stages | TRUE | customer-journey-map-template.csv rows 1–17 |
| 9 | 44 | NN/g: a journey map is "a picture of the process a person goes through to accomplish a goal" (paraphrase) | TRUE | https://www.nngroup.com/articles/journey-mapping-101/ ("a visualization of the process that a person goes through in order to accomplish a goal", Sarah Gibbons, 9 Dec 2018, reviewed 15 Jul 2026) |
| 10 | 44, 59 | Feeling lane emotion scale −2 to +2 | TRUE | template files |
| 11 | 67 | Miro and FigJam boards need an account | TRUE | Miro help "Find and use Miroverse templates": "Use template" prompts a free sign-up (help.miro.com/hc/articles/27235125608082). FigJam boards sit in a Figma account |
| 12 | 67 | Confluence offers a wiki page template | TRUE | Atlassian page, typed "Page Template"; "Use template" leads to sign-up |
| 13 | 67 | HubSpot's templates sit behind a download form | TRUE | https://offers.hubspot.com/customer-journey-map-template ("All fields are required", 7 templates) |
| 14 | 67 | Canva offers visual layouts | TRUE | https://www.canva.com/templates/s/customer-journey-map/ (search result. WebFetch gives 403) |
| 15 | 67 | "Ours is a plain file that opens in all of them" | WRONG | HubSpot is a form-gated download, not an editor. Miro and FigJam do not edit SVG (row 6). See F4 |
| 16 | 71 | Definition of customer journey mapping | TRUE | NN/g 101 components: actor, scenario, phases, actions/mindsets/emotions, opportunities |
| 17 | 77, 89–90 | Customer journey map = whole relationship across channels; user journey map = one product task | TRUE (editorial distinction, consistent with sources) | NN/g User Journeys vs User Flows (https://www.nngroup.com/articles/user-journeys-vs-user-flows/): journey "with a company or product … across channels" |
| 18 | 81 | NN/g cheat sheet separates maps by point of view, scope and time order | TRUE | https://www.nngroup.com/articles/ux-mapping-cheat-sheet/ (Gibbons, 5 Nov 2017) |
| 19 | 91 | Experience map: people in general, not tied to a product, chronological | TRUE | Cheat sheet: "generic person", "agnostic of a specific business or product", "chronological order" |
| 20 | 92, 98 | Service blueprint: organization's view, frontstage, backstage and support processes, chronological in layers | TRUE | Cheat sheet: "organization's perspective", "chronological and hierarchical", lanes "customer actions, frontstage actions, backstage actions, and support processes" |
| 21 | 93 | Empathy map: one user type, not chronological, says/thinks/does/feels | TRUE | Cheat sheet: "one empathy map for each persona or user type", "not chronological or sequential" |
| 22 | 94, 108 | User flow: screen-by-screen paths, no emotions or persona | TRUE | NN/g User Journeys vs User Flows: flows "do not contextualize the process with emotions and thoughts" |
| 23 | 98 | "an experience map covers people in general, before any product exists" | WRONG (overreach) | The cheat sheet says experience maps are product-agnostic and are used "Before a customer journey map". It never says "before any product exists". See F5 |
| 24 | 102 | User journey definition | TRUE | NN/g User Journeys vs User Flows ("scenario-based sequence of the steps … to accomplish a high-level goal") |
| 25 | 116 | NN/g advises one point of view per map | TRUE | NN/g 101: "Provide one point of view per map" |
| 26 | 116, 252, 272 | Persona count 2–4, from interviews; 1 journey map per persona | TRUE | hub item "Personas and journey maps"; hub FAQ "2–4 personas built from interview data, with 1 journey map per persona" |
| 27 | 120 | "one common 7-stage set is awareness, consideration, decision, purchase, onboarding, retention and advocacy" | UNVERIFIABLE | No source lists this set. Canity's 7 stages are awareness, consideration, decision, purchase, use, loyalty, advocacy (https://www.canity.com/resources/customer-journey-look-like/). Qualtrics gives 5. "No single standard" is TRUE. See F1 |
| 28 | 122 | SaaS hub step "Lifecycle journey mapping" maps every stage from sign-up to renewal | TRUE wording, misleading framing | content/services/saas-ux-design.json step 2. The sentence ties that step to the awareness-to-advocacy set, but sign-up to renewal leaves out the pre-sign-up stages. See F10 |
| 29 | 128 | Supply chain: researchers shadow picker and dispatcher shifts | TRUE | content/industries/supply-chain.json step "Floor observation": "Researchers shadow pickers and dispatchers across shifts" |
| 30 | 137, 217 + example SVG tag | "its lowest point is the moment of truth, where the user decides to stay or leave" | WRONG (narrows the term) | UXPressia (https://uxpressia.com/blog/moments-of-truth-customer-journey): moments of truth are where "the customer forms an opinion"; "Peak highs and lows are tell-tale signs of a moment of truth". A high point can also be one. See F2 |
| 31 | 147 | NN/g's Kate Kaplan: "a qualitative-research process"; quantitative data alone cannot build the story | TRUE | https://www.nngroup.com/articles/customer-journey-mapping/ (Kaplan, 31 Jul 2016): "This is a qualitative-research process", "quantitative data alone cannot build a story" |
| 32 | 149, 159, 184, 252, 264 | 10–15 one-hour user interviews per user group | TRUE (matches hub FAQ + item) | hub FAQ "10–15 interview participants per user group"; item "10–15 one-hour interviews". OWNER NOTE 3 |
| 33 | 149, 160, 174, 185, 264 | Contextual inquiry 4–6 users, on site | TRUE | hub item "observe 4–6 users in the real work setting"; hub FAQ "contextual inquiry needs on-site visits". Matches contextual-inquiry.md |
| 34 | 149 | Link /blog/contextual-inquiry/ | TRUE | content/blog/contextual-inquiry.md exists, draft: false |
| 35 | 174 | NN/g term "hypothesis map"; it plans a study | TRUE | Cheat sheet: hypothesis maps are "based on an accumulation of existing understanding", used to "create a research plan" |
| 36 | 174 | Our researchers run the 4–6 sessions in generative fieldwork (7–15 days) | TRUE | hub step 3 "Researchers run user interviews and contextual inquiry sessions" |
| 37 | 186 | Tag in Dovetail | TRUE | hub step 5 |
| 38 | 190 | "In our program these steps sit inside a research timeline of 4–8 weeks, run as our 5-step UX research process" | WRONG (scope) | No hub step includes step 2 (draft a hypothesis map) or step 7 (walk 2–3 participants through the map, assign owners). Hub steps: framing, recruitment, fieldwork, evaluative, synthesis and readout. See F7 |
| 39 | 190 | Map comes out of synthesis and readout (4–7 days); 4–8 weeks; 5 steps | TRUE | hub process section |
| 40 | 211–229 | Worked example's numbers and ranking are internally consistent (P09 quote = H 9/12, O 4/5 as in the intro; lowest point −2 at stage 4; ranking 4 > 2 > 3 by emotion) | TRUE | example SVG/PDF vs post table |
| 41 | 231 | Vocable: "stakeholder interviews split the creator's work into four phases … and each screen answered a problem heard in those interviews" | WRONG (credits interviews with the phases) | content/case-studies/vocable.md: "We mapped the full creator journey and designed each screen around a problem we heard in stakeholder interviews: planning, drafting, optimizing and publishing." The team mapped the journey, and the file never says the interviews produced the phase split. "Stakeholder" kept, no 35% (both OK). See F6 |
| 42 | 233 | Hub trigger: teams disagree about priorities with no shared personas or journey maps | TRUE | hub "When should a product team invest" item 5 |
| 43 | 252 | 2–4 personas, 1 map each, Dovetail, 90-minute readout, $25,000–$60,000, 4–8 weeks, cost deep link | TRUE | hub abstract, steps, cost section (`#how-much-does-ux-research-cost` id per brief) |
| 44 | 252 | Link /blog/choose-ux-research-agency/ | TRUE | same silo, published |
| 45 | 254 | "in the consultation we mark which cells need evidence and which method would fill each" | WRONG (offer not on the site) | about.md only promises "a free consultation and a fixed-scope proposal". The marking offer comes from the brief's leadAngle. See F8 |
| 46 | 254 | Every project begins with a free consultation and a fixed-scope proposal | TRUE | content/pages/about.md line 30 |
| 47 | 260 | Insert > Pictures, then Convert to Shape (Microsoft 365) | TRUE | https://support.microsoft.com/en-us/office/edit-svg-images-in-microsoft-office-365-69f29d39-194a-4072-8c35-dbe5e7ea528c ("Insert > Pictures > This Device"; right-click, "Convert to Shape"; "customize individual parts") |
| 48 | 260 | "to edit each box and label" | UNVERIFIABLE (label part) | The Microsoft page covers pieces/shapes only and says nothing about SVG text. See F9 |
| 49 | 276 | AI (e.g. ChatGPT) can draft a hypothesis map | TRUE (general, hedged) | n/a |
| 50 | 280 | Review cadence labelled "our practice, not a published standard" | TRUE (honesty) | n/a |
| 51 | all files | Licence line "Free to use and adapt. uiuxdesignservices.us", no licence name | TRUE (matches brief's interim wording) | CSV row 1, every PDF/SVG/PNG footer. OWNER NOTE 1 |
| 52 | cover.svg | Sahar Asif, Senior Manager UX | TRUE | content/home.ts team (per brief authorWhy); author slug valid |
| 53 | — | No invented clients, stats, testimonials, awards or local offices | TRUE | Only Vocable is named (real case study). No external statistics are used |

## Fixes (exact current → replacement)

**F1 (line 120, H3 bold answer)**
Current: `**No single standard defines a 7-step customer journey; one common 7-stage set is awareness, consideration, decision, purchase, onboarding, retention and advocacy.**`
Replacement: `**No single standard defines a 7-step customer journey; one published 7-stage set is awareness, consideration, decision, purchase, use, loyalty and advocacy.**`
(Source: Canity, "Customer Journey Map: What It Is and the 7 Stages Your Customers Move Through". Optional 5th external link: https://www.canity.com/resources/customer-journey-look-like/. Line 122's "Consideration" example still fits.)

**F2 (line 137, lane list; and line 217)**
Current (137): `- **Emotion curve:** its lowest point is the moment of truth, where the user decides to stay or leave; high points are moments of delight.`
Replacement: `- **Emotion curve:** its sharpest highs and lows flag likely moments of truth, the interactions where the user forms a lasting opinion and decides to stay or leave; check the lowest point first.`
Current (217): `The emotion curve bottoms out at stage 4, so swaps are Dana's moment of truth.`
Replacement: `The emotion curve bottoms out at stage 4, so swaps are Dana's likely moment of truth.`
(The example SVG's "moment of truth" tag can stay because the prose now hedges it.)

**F3 (line 35 and customer-journey-map-template-downloads.svg line 170)**
Current (post): `- [Scalable Vector Graphics (SVG), editable in Figma, FigJam, Miro or PowerPoint](/blog/customer-journey-map-template/customer-journey-map-template.svg)`
Replacement: `- [Scalable Vector Graphics (SVG), editable in Figma or PowerPoint](/blog/customer-journey-map-template/customer-journey-map-template.svg)`
Current (SVG text): `editable in Figma, FigJam, Miro or PowerPoint`
Replacement (SVG text): `editable in Figma or PowerPoint`

**F4 (line 67)**
Current: `Tool templates differ mainly in where they live: Miro and FigJam boards need an account, Confluence offers a wiki page template, HubSpot's templates sit behind a download form and Canva offers visual layouts. Ours is a plain file that opens in all of them, so fill the header before any stage.`
Replacement: `Tool templates differ mainly in where they live: Miro and FigJam boards need an account, Confluence offers a wiki page template, HubSpot's templates sit behind a download form and Canva offers visual layouts. Ours needs no account or form: place the PNG or PDF on a Miro or FigJam board, edit the SVG in Figma or PowerPoint, or open the CSV in a spreadsheet. Whichever you pick, fill the header before any stage.`

**F5 (line 98)**
Current: `An empathy map skips time order, and an experience map covers people in general, before any product exists.`
Replacement: `An empathy map skips time order, and an experience map covers people in general rather than one product, which is why NN/g places it before a customer journey map.`

**F6 (line 231, Vocable)**
Current: `In [how we mapped the Vocable creator journey](/case-studies/vocable/), stakeholder interviews split the creator's work into four phases, planning, drafting, optimizing and publishing, and each screen answered a problem heard in those interviews.`
Replacement: `In [how we mapped the Vocable creator journey](/case-studies/vocable/), we mapped the full creator journey, planning, drafting, optimizing and publishing, and designed each screen around a problem we heard in stakeholder interviews.`

**F7 (line 190)**
Current: `In our program these steps sit inside a research timeline of 4–8 weeks, run as our 5-step UX research process; the map comes out of its synthesis and readout step (4–7 days).`
Replacement: `In our program, the interviews and contextual inquiry of steps 3 and 4 run in the generative fieldwork step of our 5-step UX research process, and the map comes out of its synthesis and readout step (4–7 days), inside a research timeline of 4–8 weeks.`

**F8 (line 254)**
Current: `[Send us the hypothesis map you already have](/contact/), and in the consultation we mark which cells need evidence and which method would fill each. Every project begins with a free consultation and a fixed-scope proposal.`
Replacement: `Before the call, circle every A cell and note which method from the evidence table would fill it. [Send us the hypothesis map you already have](/contact/); every project begins with a free consultation and a fixed-scope proposal.`
(The "every project begins …" clause is copied word for word from about.md.)

**F9 (line 260)**
Current: `Insert our SVG file with Insert > Pictures, then select it and use the Convert to Shape option to edit each box and label.`
Replacement: `Insert our SVG file with Insert > Pictures, then right-click it and use the Convert to Shape option to edit each piece of the grid separately.`

**F10 (line 122)**
Current: `That set suits a lifecycle customer journey map for a whole brand or product lifecycle; the lifecycle journey mapping step of our [SaaS UX design](/services/saas-ux-design/) process maps every stage from sign-up to renewal.`
Replacement: `That set suits a lifecycle customer journey map for a whole brand or product lifecycle; the lifecycle journey mapping step of our [SaaS UX design](/services/saas-ux-design/) process covers the in-product part of a lifecycle, every stage from sign-up to renewal.`

**F11 (line 26, first sentence; keeps the literal keyword)**
Current: `Every customer journey map template has the same empty cell under Stage 2, Thinking, and what you write there decides whether the map is evidence or fiction.`
Replacement: `Our customer journey map template has an empty cell under Stage 2, Thinking, and what you write there decides whether the map is evidence or fiction.`

## Owner notes (no change to this post)

1. OWNER-Q from the brief is still open: the licence line "Free to use and adapt." names no licence. That is acceptable for now. A formal licence (e.g. CC BY 4.0) is the owner's decision.
2. Conflict: home.ts process step "Discovery and research" says `1–4 weeks` for personas and journey maps, while the hub says 4–8 weeks. The post follows the hub, which is correct.
3. Hub internal conflict: the hub FAQ says "10–15 interview participants per user group", but the hub's own examples say "12 user interviews across 2 user groups" (research plan item) and "3 user groups, 20 user interviews" (cost section), which works out to 6–7 per group. The post follows the FAQ. The owner should reconcile the hub.
4. Stale brief record: brief `aiOverview.coverage` says Confluence's template has "4 fields per stage". That is correct (Stage, User Action, Pain points and questions, Emotions), but the post rightly does not print it.

VERDICT: FAIL
