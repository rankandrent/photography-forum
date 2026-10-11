# Fact-check: mobile-app-design-agency-vs-freelancer (2026-10-11, review loop 2, final)

Post: `content/blog/mobile-app-design-agency-vs-freelancer.md`. SVGs: `public/blog/mobile-app-design-agency-vs-freelancer/*.svg`. Site sources: `content/services/mobile-app-ui-ux-design-services.json` (hub), `content/pages/about.md`, `components/sections/SemanticSections.tsx` (hub anchor ids).

Method notes: WebFetch worked for developer.apple.com. It failed with ENOTFOUND for support.upwork.com, so Upwork was checked with a WebSearch limited to support.upwork.com. The post's comment URL (`/articles/211063418-How-hourly-and-fixed-price-contracts-are-different-on-Upwork`) was the top hit. Loop-1 rows that are unchanged and still TRUE (rows 1–3, 5–10, 12–20, 24, 26, 28–30, 37) are not repeated here.

## A. Loop-1 fixes F1–F13

| Fix | Line now | Applied? | Verdict | Evidence |
|---|---|---|---|---|
| F1 intro routing | L26 | Rewritten, not pasted | TRUE | Every case run through the tree. Fixed date → agency (Q1). One platform with no testing → freelancer (Q2 No, Q3 No). Two platforms, or flows that need testing, with someone in-house to recruit, moderate and review → freelancer (Q4 Yes, "freelancer + your PM"). Nobody in-house → agency (Q4 No). The tree's caveat that a two-platform freelancer should have shipped both platforms is left out. That omission is acceptable because the sentence does not contradict it. |
| F2 takeaway | L18 | Replaced by a description of the tree | TRUE | Matches the four questions in decision-tree.svg and the text list (L162–165) in order. It no longer makes a freelancer routing claim. |
| F3 FAQ routing | L213 | Rewritten, not pasted | TRUE | "Start with the launch date … agency. If not, a freelancer suits a one-platform app with no flows to test before code; any other app needs either a PM who recruits, moderates and reviews test builds alongside the freelancer, or an agency." This is Q1, then Q2/Q3, then Q4 (Yes → freelancer + PM, No → agency). No input reaches a different leaf. |
| F4 stage line | — | The sentence was removed (grep "Stage changes": no match) | TRUE | The wrong routing is gone. L181 ("If the tree settles … in favor of an agency, your app fits the 4–8 week engagement … ends with a review of your first test builds") matches hub step 5. |
| H2 bold (not a fix; rechecked) | L156 | — | TRUE | It states the Q1 override ("or with a fixed launch date, hire an agency"). Every freelancer condition matches a freelancer leaf. |
| F5 | L114 | Pasted | TRUE | Hub step 2 "wireframe the iOS and Android screens", step 4 "build the UI kit". "Left track": the freelancer column sits at x=40 in twin-timeline.svg. Only the plural "designers" is used, with no count. |
| F6 | SVG c1s1, L121 | Applied | TRUE | Card text reads "Flows and wireframes for / iOS and Android". "Recruiting starts" is gone. |
| F7 | L40 | Pasted | TRUE | No number about freelancers. |
| F8 | L89 | Pasted | TRUE | No superlative. |
| F9 | L69, L77, platform-pairs.svg | Applied | TRUE | The SVG label is "iOS date picker (compact, inline or wheels)". The alt text says "iOS vs Material date picker". Source: Apple UIDatePickerStyle docs (loop 1, row 4). |
| F10 | L138, phone-checklist.svg i2 | Applied | TRUE | SVG i2 has six lines matching L138. The last text baseline is y=1192, inside the card (y 894.5–1213.5). Google translate-designs guide (loop 1, row 3). |
| F11 | L150 | Pasted | TRUE | "the case study reports" matches tradezella.md. |
| F12 | L125 | Pasted | TRUE | Hedged with "without a backup". |
| F13 | L221 | Merged | TRUE | "If the next team is ours and the work is a redesign, it starts with a review of the current app, app store reviews and analytics before any new screens are designed." This is word for word the hub FAQ answer "A mobile app redesign starts with …", and it applies only to a redesign done by us. |

## B. New text

| # | Claim (line) | Verdict | Source / evidence |
|---|---|---|---|
| G1 | "Take the illustrative fitness app again: with no one moderating tests, users meet the new onboarding flow only in the first TestFlight beta build, after developers have coded it, so every fix becomes a code change." (L42) | WRONG (logic and scope) | It is labelled illustrative and has no statistics, which is fine. Two problems remain. (1) "No one moderating" does not lead to "users meet it only in the beta build". The post's own L89 and skill map name unmoderated Maze rounds, which test the flow before code without a moderator. The conclusion needs "no user tests before code". (2) The example app ships "on both stores" (L34), but only TestFlight (iOS) is named, and "only in" reads as "exclusively". TestFlight does put pre-release builds in front of real people: up to 10,000 external testers by email or public link (https://developer.apple.com/testflight/, fetched). The Android equivalent is Play Console testing tracks (https://support.google.com/googleplay/android-developer/answer/9845334, loop 1, row 8). See H1. |
| G1b | "With partial Android fluency, the Android screens become a second purchase, which is line 1 of the quote comparison below." (L42) | TRUE | Line 1 of the quote table is "Platforms … An Android pass bought later" (L195, quote-line-items.svg). |
| G2 | "On Upwork, … hourly contracts bill logged hours weekly, up to any weekly limit you set, while fixed-price contracts pay by milestones you fund before work starts." (L187) | TRUE | https://support.upwork.com/hc/en-us/articles/211063418-How-hourly-and-fixed-price-contracts-are-different-on-Upwork (the exact URL in the post's comment, top hit in a domain-limited search). Upwork describes hourly contracts as billed automatically each week for logged hours, up to the weekly limit, which only the client sets (also https://support.upwork.com/hc/en-us/articles/211068258-Contract-Weekly-Limit). For fixed-price contracts, the client funds each milestone up front, and a milestone must be funded before it is activated (https://support.upwork.com/hc/en-us/articles/360000990268-Add-and-Edit-Milestones). The source is an HTML comment, not a visible link. |
| G3 | "… multiply by the freelancer's own rate, and set that capped total beside the rounds the fixed-scope proposal includes." (L187) | UNVERIFIABLE (claim about our proposal) | In this sentence "the rounds" refers back to "a cap on revision rounds", so it says our fixed-scope proposal states a number of revision rounds. No site page mentions revision rounds (grep "revision" in the hub, about.md, terms.md and home.ts: no match). The hub's price factors cover *test* rounds only. See H2. |
| G4 | "Set both totals against our published $25,000–$60,000 range for 4–8 weeks; flows, platforms, test rounds and UI kit size are [what drives mobile app design pricing](…/#how-much-does-mobile-app-ui-ux-design-cost) inside it." (L205) | TRUE | Hub cost H2: "The price depends on 4 factors: the number of user flows, the number of platforms, the number of test rounds and the size of the UI kit." The post lists exactly those four, all from the price-factors section. The anchor resolves: `sectionId` lower-cases the H2 "How much does mobile app UI UX design cost?", replaces non-alphanumerics with "-" and trims the ends, giving `how-much-does-mobile-app-ui-ux-design-cost`. Nothing here is presented as an offer. |
| G5 | twin-timeline.svg agency pills 3–5 / 5–10 / 5–10 / 5–10 / 2–5 days, header "(4–8 weeks)", L116 alt, L121 text | TRUE | Hub steps 1–5 give the same day ranges. The sum is 20–40 working days, which matches the hub's "4–8 weeks (20–40 working days)". The freelancer column has 7 cards and no lengths, matching the alt text "seven steps". |
| G6 | platform-pairs.svg "System back plus / an up arrow" | TRUE | Google's guide says the up arrow is separate from system back. |

## C. Honesty checks

- About.md offer: "Every project begins with a free consultation and a fixed-scope proposal." appears exactly once (L207), word for word. TRUE.
- Team size: no count. The only "our designers" (L114) is the plural from the hub steps. "Several" and "a few designers" do not appear. TRUE.
- Code: the post never says we write app code. "Developers build in Swift, Kotlin, React Native or Flutter" (L104) and "your app fits the 4–8 week engagement … ends with a review of your first test builds" (L181). TRUE.
- No invented clients, awards or testimonials. Only the TradeZella and Anyday figures from the case-study files are used.

## Fixes (exact old → new)

**H1 (L42, row G1)**
Old: "Take the illustrative fitness app again: with no one moderating tests, users meet the new onboarding flow only in the first TestFlight beta build, after developers have coded it, so every fix becomes a code change."
New: "Take the illustrative fitness app again: with no user tests before code, the first people to try the new onboarding flow are testers of the first TestFlight and Google Play Console builds, after developers have coded it, so every fix becomes a code change."

**H2 (L187, row G3)**
Old: "ask for estimated hours per quote line and a cap on revision rounds, multiply by the freelancer's own rate, and set that capped total beside the rounds the fixed-scope proposal includes."
New: "ask for estimated hours per quote line and a cap on revision rounds, multiply by the freelancer's own rate, and set that capped total beside the fixed-scope proposal."

Both fixes are one-line text edits. No SVG changes are needed.

VERDICT: FAIL
