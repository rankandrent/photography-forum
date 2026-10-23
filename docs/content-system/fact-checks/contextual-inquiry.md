# Fact-check: contextual-inquiry

Post: `content/blog/contextual-inquiry.md` (read 2026-10-23, 279 lines). Brief: `content/briefs/contextual-inquiry.json`.
SVGs: `public/blog/contextual-inquiry/*.svg` (6 files, text grepped). Site facts: `content/services/ux-research-services.json` (hub),
`content/services/usability-testing-services.json`, `content/home.ts`, `content/pages/about.md`,
`content/case-studies/mass-media-co.md`, `content/industries/supply-chain.json`, `content/industries/healthcare.json`,
`content/blog/customer-journey-map-template.md`.
The post was not edited (QA edits it in parallel). Every fix below is for the orchestrator to apply.

## External claims

| # | Claim (line) | Verdict | Source |
|---|---|---|---|
| E1 | Holtzblatt and Beyer, Contextual Design, "a user-centered design methodology published as a book in 1997, as the Wikipedia entry on the method records" (34) | TRUE | Wikipedia CI: "fully described in Contextual Design in 1997"; CI is "a user-centered design (UCD) research method, part of the contextual design methodology". Wikipedia Contextual design: "a user-centered design process developed by Hugh Beyer and Karen Holtzblatt". Elsevier lists the 1st edition as 1 Sep 1997 (ISBN 978-1-55860-411-7); library catalogs print c1998. NN/g's reference list cites a 1990 item, but the post does not print 1990, and 1997 is the book year. https://en.wikipedia.org/wiki/Contextual_inquiry , https://en.wikipedia.org/wiki/Contextual_design , https://www.elsevier.com/books/contextual-design/beyer/978-1-55860-411-7 |
| E2 | NN/g calls it "a type of ethnographic field study" in which researchers observe and interview users in depth (34) | TRUE | Kim Flaherty, 6 Dec 2020: "a type of ethnographic field study that involves in-depth observation and interviews of a small sample of users". Link loads. https://www.nngroup.com/articles/contextual-inquiry/ |
| E3 | Master-apprentice model: the user is the expert, the researcher learns like an apprentice (36) | TRUE | NN/g Flaherty: researcher = "apprentice", user = "craftsman". |
| E4 | Wikipedia notes the method reveals work knowledge users are not consciously aware of (50) | TRUE | Wikipedia: "knowledge about their own work process that users themselves are not consciously aware of". |
| E5 | Hawthorne effect: people act differently while watched (70) | TRUE | dscout: "the Hawthorne Effect is when participants (or people in general) act differently while being observed." |
| E6 | "Nikki Anderson of dscout counters it with rapport, longer sessions and a reminder that you are evaluating the product, not them" + link (70) | WRONG (affiliation) | The tactics are TRUE (dscout lists building rapport, longer sessions, "Remind participants that you are evaluating the product, not them!"). The byline is Nikki Anderson-Stanier, a People Nerds contributor (founder of User Research Academy), not dscout staff, so "of dscout" states an employer the page does not give. Link loads and supports the tactics. https://dscout.com/people-nerds/behind-scenes-contextual-inquiry . Fix F4. |
| E7 | Social desirability bias as a cause (52) | TRUE | dscout: the Hawthorne effect "also plays on social desirability bias". |
| E8 | Four principles context, partnership, interpretation, focus; Holtzblatt and Beyer set them; NN/g's Kim Flaherty restates them in her 2020 guide (74–76) | TRUE | NN/g Flaherty 2020 lists the four principles and credits Beyer and Holtzblatt. |
| E9 | Four session parts: session primer, transition, contextual interview, wrap-up (18, 144, SVG) | TRUE | NN/g Flaherty: primer, transition, contextual interview, wrapup. |
| E10 | Session "about 2 hours" (18, 144, 240, 262, SVG 120 min) | TRUE | Wikipedia: "approximately two-hour, one-on-one interaction". SVG segment widths checked: 1024 px / 120 min = 8.53 px/min; 10/5/90/15 min = 85.3/42.7/768/128 px, all correct, sum 120. |
| E11 | NN/g's loop "watch and learn, then stop and discuss" (168, SVG) | TRUE | NN/g: "Watch and learn" then "Stop and initiate discussion". Paraphrase, not quoted. |
| E12 | Active vs passive inquiry; passive = only observe and ask at the end, "as dscout describes it" (168) | TRUE | dscout: passive, the researcher only observes; "All clarifying questions are asked at the end of the study." The forklift/safety-critical use is the post's own advice, not attributed to dscout. |
| E13 | Risks: interview mode, observer bias, complaint session (170) | TRUE | NN/g lists participants defaulting to interview mode, a session that becomes an airing of grievances, and researcher bias. |
| E14 | Interpretation team of 3–8 people, "Wikipedia's range for Holtzblatt's method"; researcher retells the session, group writes one insight per note (20, 229) | TRUE | Wikipedia: "3-8 team members gather to hear the researcher re-tell the story of the interview in order … the team add individual insights and facts as notes." |
| E15 | Interpretation session "within 48 hours of each visit (our practice)" (229) | WRONG (honesty) | No site page states a 48-hour practice (grep of content/ for "48 hours" finds nothing in the hub, about.md or home.ts). The 48-hour window appears in university course notes on Contextual Design (e.g. Berkeley i213), not in a primary source I could read. Fix F5. |
| E16 | Affinity diagram; work models "such as flow and sequence models, which show who hands what to whom and in which order" (230–231) | TRUE | Wikipedia CI: notes "may be organized using an affinity diagram". Wikipedia Contextual design lists flow, sequence, cultural, artifact and physical models; flow = coordination, communication, roles; sequence = steps in order. |
| E17 | Resource cost "travel, a few hours with each user and more hours to interpret, as Wikipedia notes" (244) | TRUE | Wikipedia: "It requires travel to the informant's site, a few hours with each user", and goes on to the time needed to interpret the results. |
| E18 | FAQ: Holtzblatt's guidance "runs from 4 users for a single, small task to 30 or more for a large scope" (258) | WRONG (added qualifier) | Wikipedia: "as few as 4 users (for a single, small task) to 30 or more." No "for a large scope" in the source. Fix F6. |
| E19 | NN/g's Mayya Azarova splits the count into users per visit, visits per day and total visits + link (258) | TRUE | Video page, 9 Sep 2022: "users per visit, visits per day, and the total number of visits in a study". Link loads. https://www.nngroup.com/videos/how-many-users-contextual-inquiry/ |
| E20 | FAQ: NN/g range "an hour or two up to several days" (262) | TRUE | NN/g: "They can range from an hour or two to several days of observations and interviews." |
| E21 | Remote FAQ: Kate Kaplan, "semicontextual inquiry, since only the user is in context", share the entire desktop, camera off while observing, session cap 2–3 hours; fits screen-based desk work; misses physical work (266) | TRUE | Kaplan, 13 Nov 2022: "only the user is in-situ, not the researcher"; "share their entire desktop"; camera off during observation; limit each session to "2–3 hours"; suits computer-based desk work on one screen; poor fit for hands-on physical work. Link loads. Correctly attributed to NN/g, not claimed as our practice. https://www.nngroup.com/articles/remote-contextual-inquiry/ |
| E22 | Ethnography comes from anthropology and describes a whole culture (120) | TRUE | Standard definition; no number. |
| E23 | "In clinical psychology, 'contextual interview' names an unrelated technique." (278) | TRUE | Focused Acceptance and Commitment Therapy (fACT) uses a "Contextual Interview" for primary-care assessment (DC Integrated Care webinar listing, https://www.integratedcare.dc.gov/?p=9763 ). |
| E24 | Usability testing sample "5 per round (NN/g)" (108, SVG) | TRUE | Matches hub FAQ and usability hub ("Nielsen Norman Group guidance sets 5 users per round for a qualitative usability test"). |

## Site facts (hub = ux-research-services.json unless named)

| # | Claim (line) | Verdict | Source |
|---|---|---|---|
| S1 | "one of the six deliverables in our UX research services, and we run it on-site" (28) | TRUE | Hub: "include 6 deliverables: … a contextual inquiry …"; hub FAQ: "contextual inquiry needs on-site visits". |
| S2 | "4–6 users per user group" as our program's figure (108 table + SVG lines 76–77, 149, 240, 258) | WRONG (third version of a hub fact) | Hub deliverable: "Researchers observe 4–6 users in the real work setting" with no "per user group". The hub uses "per user group" only for interviews ("10–15 interview participants per user group"). The hub's $60,000 example has 3 user groups, so "per user group" would mean 12–18 observed users, which the hub never states. The sibling post customer-journey-map-template prints "contextual inquiry with 4–6 users" (no per-group). The brief's queryVariantsNote and attributes introduced "per user group". Fix F1. |
| S3 | User interviews: "1 hour (our program)", "10–15 per user group (our program)" (107–108, SVG) | TRUE | Hub: "10–15 one-hour interviews"; FAQ "10–15 interview participants per user group". |
| S4 | Usability testing "Typical session: 1–3 weeks per round (our program)" (107, SVG lines 71–72) | WRONG (wrong unit for the row) | 1–3 weeks is the length of a test round (hub table, usability hub FAQ), not of a session. The row compares session length; the usability hub gives "45–60-minute think-aloud sessions". Fix F2. |
| S5 | Participant recruitment "its own step of 3–6 days" (172) | TRUE | Hub step 2 "Participant recruitment (3–6 days)". |
| S6 | Synthesis and readout "a step of its own (4–7 days)", "tagged in Dovetail and presented in a 90-minute readout" (236) | TRUE | Hub step 5, word for word. |
| S7 | Personas, journey map per persona, JTBD opportunity map that ranks user jobs (232) | TRUE | Hub deliverables (2–4 personas, 1 journey map per persona; jobs "ranked by importance and current satisfaction"). Step 4 is presented as general method, not as a "we" claim. |
| S8 | "fieldwork duration is 7–15 days inside a 4–8 week engagement, and the program price is $25,000–$60,000" (248) | TRUE | Hub step 3 "Generative fieldwork (7–15 days)"; process 4–8 weeks; priceRange $25,000–$60,000. |
| S9 | "On-site contextual inquiry is one of the things that pushes a program toward the top of that range" + deep link #how-much-does-ux-research-cost (248) | TRUE | Hub cost body: the near-$60,000 example includes "on-site contextual inquiry". Section id matches the H2. |
| S10 | "cannot spare people for two weeks of fieldwork" (250) | WRONG (number differs from hub) | Hub fieldwork step is 7–15 working days (up to 3 weeks); "two weeks" is a different figure. Fix F7. |
| S11 | "Every project begins with a free consultation and a fixed-scope proposal." (252) | TRUE | about.md line 30, word for word. |
| S12 | Supply chain link: "our researchers shadow pickers and dispatchers across shifts and record scan sequences and interruptions" (128) | TRUE | supply-chain.json step "Floor observation (3–5 days)": "Researchers shadow pickers and dispatchers across shifts and record scan sequences and interruptions." |
| S13 | Healthcare link: "In our healthcare UI UX design work, researchers shadow nurses and physicians" (129) | TRUE | healthcare.json step "Clinician shadowing and patient interviews": "Researchers shadow nurses and physicians …". |
| S14 | Mass Media Co.: "is an interview-led example: its scope listed user interviews, and a discovery workshop with stakeholders and users covered information architecture and user flows" (114) | WRONG (framing) | Both facts are in mass-media-co.md (Scope of work lists "user interviews"; Our approach: "a discovery workshop with MMC stakeholders and users … covered product definition, strategy, information architecture and user flows"), and the case's `services` include ux-research-services. But "interview-led" is not supported: the only method Our approach describes is the discovery workshop; interviews appear only in the scope list. It is not presented as contextual inquiry (good). Fix F3. |
| S15 | Customer journey map template link: "shows how observed steps fill its Doing and Touchpoints lanes" (234) | TRUE, CONDITIONAL | customer-journey-map-template.md line 144: "contextual inquiry fills Doing and Touchpoints". That post is `draft: true`; remove the link if it does not publish with this one (as the brief's link note says). |
| S16 | Usability testing services link, choose-ux-research-agency link, /contact/ (114, 250, 252) | TRUE | Files exist; the usability hub is the one cross-hub link. |
| S17 | Author Ahmad Ullah, contributor Umar Sarwar (8, 7, cover SVG "Principal UX Designer") | TRUE | home.ts team list. |

## Honesty

| # | Check | Verdict |
|---|---|---|
| H1 | Clerk and warehouse study labelled illustrative (intro line 26, SVG pill, field-note sheet "Illustrative rows", line 215 "Every detail is invented; no client is described") | TRUE |
| H2 | No invented statistics, clients, testimonials, awards. home.ts MDS-nurses line and "40+ hours" not used | TRUE |
| H3 | Remote variant attributed to NN/g; post states our program runs on-site (hub FAQ) | TRUE |
| H4 | "Our practitioner view is that real deadlines limit it further" labelled as opinion, no figure | TRUE |
| H5 | "(our practice)" 48-hour interpretation window | WRONG, see E15 / F5 |
| H6 | "The 'mistake it prevents' column is our framing" labelled | TRUE |

## Fixes (exact current → replacement)

F1. "4–6 users per user group" → "4–6 users" (hub wording), in five places:
- Line 108 (table, Sample row): `| Sample | 4–6 users per user group (our program) |` → `| Sample | 4–6 users (our program) |`
- SVG `method-comparison-table.svg` lines 76–77: `4–6 users per user group` / `(our program)` → `4–6 users` / `(our program)`.
- Line 149: "Recruit 4–6 users per user group, our program's figure (the FAQs give the published range)." → "Recruit 4–6 users, our program's figure (the FAQs give the published range)."
- Line 240: "…plus interpretation time, and 4–6 users per user group in our program." → "…plus interpretation time, and 4–6 users in our program."
- Line 258: "Our program sets a participant count of 4–6 users per user group." → "Our program sets a participant count of 4–6 users."
Also correct the brief (`queryVariantsNote`, `attributes`, `faqs[0].hint`) so later posts do not copy "per user group".

F2. Line 107 and SVG `method-comparison-table.svg` lines 71–72: "1–3 weeks per round (our program)" → "45–60 minutes (our program)" (usability-testing-services.json: "45–60-minute think-aloud sessions").

F3. Line 114: "Our [Mass Media Co. platform revamp](/case-studies/mass-media-co/) is an interview-led example: its scope listed user interviews, and a discovery workshop with stakeholders and users covered information architecture and user flows." → "Our [Mass Media Co. platform revamp](/case-studies/mass-media-co/) listed user interviews in its scope, next to a discovery workshop with stakeholders and users that covered information architecture and user flows."

F4. Line 70: "Nikki Anderson of dscout counters it with [rapport, …]" → "Nikki Anderson, writing for dscout's People Nerds, counters it with [rapport, longer sessions and a reminder that you are evaluating the product, not them](https://dscout.com/people-nerds/behind-scenes-contextual-inquiry)."

F5. Line 229: "1. Hold an interpretation session within 48 hours of each visit (our practice), with an interpretation team of 3–8 people (Wikipedia's range for Holtzblatt's method); …" → "1. Hold an interpretation session soon after each visit, while the observations are fresh, with an interpretation team of 3–8 people (Wikipedia's range for Holtzblatt's method); the researcher retells the session and the group writes one insight per note."

F6. Line 258: "runs from 4 users for a single, small task to 30 or more for a large scope" → "runs from as few as 4 users for a single, small task to 30 or more".

F7. Line 250: "cannot spare people for two weeks of fieldwork" → "cannot spare people for 7–15 days of fieldwork".

Notes for the orchestrator (no change needed in this post):
- Hub conflict already logged by the brief (CONFLICT 1): hub FAQ "contextual inquiry needs on-site visits" vs NN/g's remote "semicontextual" variant. The post handles it correctly.
- Stale brief records: `queryVariantsNote`, `attributes` and `faqs[0].hint` call "4–6 users per user group" a hub figure; it is not (S2).
- Link to /blog/customer-journey-map-template/ is conditional on that draft going live.

VERDICT: FAIL
