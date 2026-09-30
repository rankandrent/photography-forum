/**
 * Home page copy. Everything here is page-specific; services, industries,
 * case studies and blog posts come from their own content folders.
 *
 * NOTE: client names, testimonials, team members, awards and ratings below are
 * carried over from the design draft — replace them with your real ones before launch.
 */
export const home = {
  meta: {
    title: "UI UX Design Services | UIUXDesignServices.us",
    description:
      "UI UX design services for growing businesses: user research, UX and UI design, prototyping, design systems, and usability testing tied to measurable outcomes.",
  },
  hero: {
    eyebrow: "UI UX design services",
    h1Before: "UI UX design services that turn interfaces into ",
    h1Em: "measurable outcomes",
    sub: "User research, UX design, UI design, prototyping, and usability testing delivered as one engagement. What gets designed actually ships, and every design decision ties back to a metric.",
    stats: [
      { value: "200+", label: "UX design projects delivered" },
      { value: "16 yrs", label: "Average design team experience" },
      { value: "4.9 / 5", label: "Average client rating across platforms" },
    ],
  },
  clients: {
    label: "Trusted by teams building complex products",
    names: ["ToolsGroup", "Fortna", "Apex HCM", "NeverAlone", "CommuniCare", "Sandata", "Fusionetics"],
  },
  stats: {
    heading: "Design work backed by research, not opinion",
    items: [
      { value: "200+", label: "Products designed and shipped" },
      { value: "40+", label: "Hours of user shadowing per deep engagement" },
      { value: "16 yrs", label: "Average design team experience" },
      { value: "4.9 / 5", label: "Average client rating across platforms" },
    ],
  },
  challenges: {
    heading: "Why do most digital products underperform?",
    // Only figures with a specific, checkable source. Set `verified: false` to hide one.
    items: [
      {
        value: "32 pts",
        claim: "faster revenue growth for companies in the top quartile of McKinsey's Design Index compared with industry peers.",
        source: "McKinsey, The Business Value of Design",
        href: "https://www.mckinsey.com/capabilities/mckinsey-design/our-insights/the-business-value-of-design",
        verified: true,
      },
      {
        value: "~70%",
        claim: "of online shopping carts are abandoned before checkout, according to Baymard's aggregated studies.",
        source: "Baymard Institute, Cart Abandonment Rate",
        href: "https://baymard.com/lists/cart-abandonment-rate",
        verified: true,
      },
      {
        value: "$260B",
        claim: "in lost orders is recoverable across the US and EU through better checkout flow and design alone.",
        source: "Baymard Institute, Checkout Usability",
        href: "https://baymard.com/research/checkout-usability",
        verified: true,
      },
    ],
  },
  servicesHeading: "UI UX design services we offer",
  ctaBand: {
    heading: "Not sure where your design problems actually start?",
    body: "Book a 45-minute UX audit session. We review your product and identify the top three friction points.",
    cta: "Book a UX audit",
  },
  process: {
    heading: "Our UI UX design process",
    steps: [
      {
        title: "Discovery and research",
        body: 'We interview users, observe real workflows, and analyze competitors before any design decision. See our <a href="/services/ux-research-services/">UX research services</a> for the scope.',
        deliverables: "Personas, journey maps, research report",
        timeline: "1–4 weeks",
      },
      {
        title: "UX design and prototyping",
        body: 'Information architecture, wireframes, and interactive prototypes tested with real users. See our <a href="/services/digital-product-design-services/">digital product design services</a> for how prototypes reduce rework.',
        deliverables: "Wireframes, interactive prototypes",
        timeline: "3–6 weeks",
      },
      {
        title: "UI design and design system",
        body: 'Screen design, motion, and a reusable design system so new features ship consistently. See <a href="/services/design-system-services/">design system services</a>.',
        deliverables: "High-fidelity screens, component library",
        timeline: "3–6 weeks",
      },
      {
        title: "Usability testing and validation",
        body: 'Real users, real tasks, real feedback. We test before development and before launch. See <a href="/services/usability-testing-services/">usability testing services</a>.',
        deliverables: "Test reports, iteration log",
        timeline: "1–3 weeks",
      },
      {
        title: "Design implementation support",
        body: 'We stay alongside engineering through build to ensure nothing is lost in translation. See our <a href="/services/digital-product-design-services/">digital product design services</a>.',
        deliverables: "Dev-ready specs, QA sessions",
        timeline: "Ongoing through launch",
      },
    ],
  },
  benefits: {
    heading: "Why professional UI UX design matters",
    ctaTitle: "Ready to see your design opportunities?",
    items: [
      { title: "Increase user engagement", body: "Clear navigation and intuitive layouts keep users moving through the product instead of leaving for a competitor." },
      { title: "Drive revenue growth", body: "Design decisions tied to conversion rate, checkout completion, and retention produce measurable revenue impact." },
      { title: "Build brand trust", body: "Consistent, professional UI signals quality. Users associate polished design with reliable, well-run companies." },
      { title: "Save money on rework", body: "Testing prototypes before engineering starts catches usability problems while they still cost design hours, not dev sprints." },
      { title: "Increase conversions", body: "Streamlined checkout flows, clear CTAs, and reduced friction turn more visitors into paying users." },
    ],
  },
  capabilities: {
    heading: "What our designers actually do",
    intro: "The work that decides whether a product succeeds happens before anyone opens Figma. There are 6 core design capabilities we deliver on every engagement.",
    items: [
      {
        title: "User research & Jobs-to-be-Done",
        body: 'We do not design based on what stakeholders think users want. We observe, interview, and map what users actually do. For one healthcare client, that meant 40+ hours shadowing MDS nurses in skilled nursing facilities. For a supply chain platform, 30+ interviews revealed competitors were winning on UX, not functionality. See <a href="/services/ux-research-services/">UX research services</a>.',
      },
      {
        title: "Service design",
        body: 'The screen is one touchpoint. The people, processes, and systems behind it are where most products fail. We map frontstage (what users see) and backstage (what makes it work). For a telehealth platform, the patient-facing app was frontstage. Coordination across 130+ facilities was backstage. Both had to be designed. See <a href="/services/ux-consulting-services/">UX consulting services</a>.',
      },
      {
        title: "UX design & prototyping",
        body: 'Information architecture, workflows, wireframes, and interactive prototypes tested with real users before engineering starts. For a warehouse client, we reduced a 9-step error resolution workflow to 4 steps. See <a href="/services/digital-product-design-services/">digital product design services</a>.',
      },
      {
        title: "UI design & design systems",
        body: 'Development-ready component libraries that scale across products and teams. We build design systems so engineering ships consistent UI without waiting on designers. We reached WCAG/AAA for a healthcare platform. See <a href="/services/design-system-services/">design system services</a>.',
      },
      {
        title: "Usability testing & validation",
        body: 'Concept validation, usability studies, and A/B testing throughout the design process. For a telehealth platform serving elderly patients, we tested on tablet at the bedside, not desktop in an office. See <a href="/services/usability-testing-services/">usability testing services</a>.',
      },
      {
        title: "AI experience design",
        body: 'AI changes the interface fundamentally. We design for trust (how do users know the AI is right?), transparency (what is the system doing?), and actionability (what should the user do next?). We have designed AI-powered clinical documentation tools, recommendation engines, and conversational interfaces. See <a href="/services/interaction-design-agency/">interaction design services</a>.',
      },
    ],
  },
  industriesHeading: "UI UX design services for different industries",
  leadMagnet: {
    heading: "Download the UI UX design readiness checklist",
    bullets: [
      "A 30-point assessment covering user research gaps, design system maturity, and accessibility status",
      "A design investment calculator for estimating the ROI of UI UX work on your product",
      "A pre-contract diligence checklist with the 10 questions to ask every design agency",
    ],
    cover: "UI UX Design Readiness Checklist",
  },
  compare: {
    heading: "Freelancer, in-house hire, or design agency — the honest comparison",
    intro: "Three paths to hiring UI UX design services. Each fits a different situation, and one fails in a way the other two do not.",
    columns: ["Freelancer", "In-house designer", "uiuxdesignservices.us"],
    rows: [
      ["Time to first design", "1–2 weeks", "6–10 weeks (hiring + ramp)", "1–2 weeks"],
      ["Research depth", "Rarely included", "Depends on hire", "Standard on every engagement"],
      ["Design system capability", "Limited", "One person's output", "Component libraries, tokens, motion"],
      ["Usability testing", "Optional, rarely done", "Depends on tools and budget", "Built into the process"],
      ["Handoff to engineering", "Varies by person", "Direct", "Dev-ready specs and QA sessions"],
      ["Accessibility coverage", "Rarely audited", "Depends on hire", "WCAG/AAA-level work where required"],
      ["Fails when", "Your project needs multiple design disciplines", "You cannot hire senior designers fast enough", "You need US-only teams or $500K+ retainers"],
    ],
  },
  pricing: {
    heading: "Flexible pricing and ROI-focused engagements",
    intro: "Published ranges so you can plan before the first call. Full design and build engagements are scoped after discovery.",
    items: [
      { eyebrow: "Engagement 01", title: "UX audit", price: "$5,000–$15,000", timeline: "2–3 weeks · 1–2 designers", body: "Heuristic review, usability findings, and a prioritized list of improvements with effort estimates." },
      { eyebrow: "Engagement 02 · Recommended", title: "Research & UX design sprint", price: "$25,000–$60,000", timeline: "4–8 weeks · 2–4 designers", body: "User research, information architecture, wireframes, and interactive prototypes tested with real users.", featured: true },
      { eyebrow: "Engagement 03", title: "Full design & design system", price: "$60,000–$180,000", timeline: "8–16 weeks · 3–6 designers", body: "End-to-end design with a reusable design system, motion, accessibility, and engineering handoff." },
      { eyebrow: "Engagement 04", title: "Embedded design team", price: "$15,000–$40,000/mo", timeline: "Ongoing · 2–5 designers", body: "Dedicated designers embedded with your product and engineering teams, shipping features every sprint." },
    ],
  },
  whyUs: {
    heading: "Why teams choose us over other UI UX design services",
    cta: "Discuss your design project",
    items: [
      { title: "Design embedded in engineering", body: "The designers who run your research stay through engineering and launch. No handoff, no shelf-ware, no translation loss." },
      { title: "Research before design", body: "We observe and interview real users before opening Figma. Assumptions are tested, not shipped." },
      { title: "Design systems that scale", body: "Reusable component libraries that let engineering ship consistent UI without waiting on designers for every screen." },
      { title: "AI accelerates, does not replace", body: "We use AI to accelerate production. The judgment about what to design comes from research and pattern recognition across 200+ products." },
    ],
  },
  team: {
    heading: "Meet your design leads",
    intro: "Named people, not a company-wide team-size figure. These are the leads who run research and design on every engagement.",
    items: [
      { name: "Aisha Rahman", role: "Lead UX Researcher", bio: "12 years running research for healthcare and enterprise SaaS products. Runs user shadowing and Jobs-to-be-Done analysis." },
      { name: "Diego Ferreira", role: "Head of Product Design", bio: "Led design for 60+ products across supply chain, fintech, and B2B SaaS. Owns design decisions from research through engineering handoff." },
      { name: "Nadia Petrova", role: "Lead UI & Design Systems", bio: "Built component libraries and design systems that ship across multi-product organizations. Specializes in accessibility and motion design." },
      { name: "Marcus Chen", role: "AI Experience Design Lead", bio: "Designs trust, transparency, and actionability into AI-powered interfaces. Has shipped conversational UIs and recommendation engines." },
    ],
  },
  tools: {
    heading: "Tools and platforms we work with",
    items: [
      { name: "Figma", body: "Primary design tool for component libraries, prototyping, and developer handoff." },
      { name: "Maze", body: "Rapid usability testing and prototype validation with real users, integrated into our design process." },
      { name: "Hotjar", body: "Behavior analytics, session recording, and heatmaps used to inform design decisions post-launch." },
      { name: "Storybook", body: "Design system documentation and component testing that bridges design and engineering." },
    ],
  },
  awards: {
    heading: "Recognized for design and delivery",
    items: [
      { badge: "AWWW", label: "Awwwards Honorable Mention" },
      { badge: "CSS", label: "CSS Design Awards" },
      { badge: "INC", label: "Inc. 5000" },
      { badge: "ISO", label: "ISO 27001" },
      { badge: "CMMI", label: "CMMI DEV 3" },
      { badge: "WCAG", label: "WCAG/AAA Achieved" },
    ],
  },
  ratings: [
    { score: "4.8 / 5", label: "on G2", stars: true, href: "https://www.g2.com/" },
    { score: "4.9 / 5", label: "on Clutch", stars: true, href: "https://clutch.co/" },
    { score: "Top B2B", label: "GoodFirms Verified", stars: false, href: "https://www.goodfirms.co/" },
  ],
  testimonial: {
    quote: "The designers who did our research were the same ones who stayed through engineering and launch. That is the only reason the design survived contact with development.",
    cite: "Director of Product, ToolsGroup",
  },
  faqs: [
    { q: "What are UI UX design services?", a: 'UI UX design services cover user research, UX design, UI design, prototyping, usability testing, and design system creation. UI design shapes what users see and touch. UX design determines how they move through the product. Both are delivered together as one engagement. See our <a href="#services">service categories</a> for the full list.' },
    { q: "How much does a UI UX design project cost?", a: 'Project cost depends on scope and depth. A UX audit runs $5,000–$15,000 over 2–3 weeks. A research and UX design sprint runs $25,000–$60,000 over 4–8 weeks. Full design and design system engagements run $60,000–$180,000. Embedded design teams run $15,000–$40,000 per month. See our <a href="#pricing">pricing section</a> for full ranges.' },
    { q: "How long does a typical UI UX design project take?", a: "A UX audit takes 2–3 weeks. Research and UX design sprints run 4–8 weeks. Full design with a design system runs 8–16 weeks. Embedded engagements are ongoing. Timelines depend on user access, product complexity, and how many disciplines the project requires." },
    { q: "What deliverables can I expect from a UI UX design project?", a: "There are 6 core deliverables across a full engagement: user research report with personas and journey maps, information architecture and user flows, wireframes and interactive prototypes, high-fidelity UI screens, a reusable design system with components and tokens, and usability test reports with iteration logs." },
    { q: "Will my design be fully responsive and ready for development?", a: "Yes. Every design we ship is responsive across mobile, tablet, and desktop, with documented breakpoints. Designs come with dev-ready specs, component libraries, and handoff sessions with engineering." },
    { q: "Do you only create design or do development too?", a: 'We deliver design and development. Many clients start with design and continue to engineering with us. Others take the design to their own engineering teams. Either way works. See our <a href="/services/web-app-design-services/">web app design services</a>.' },
    { q: "What should I look for when choosing a UI UX design service?", a: 'Look for 5 things: a documented research process, portfolios with case studies explaining design decisions and outcomes, industry experience relevant to your product, a clear design system methodology, and usability testing built into the process. See our <a href="#compare">comparison table</a> for how we differ from freelancers and in-house hires.' },
    { q: "What are the cost factors for hiring a UI UX designer?", a: "Cost factors include project scope and complexity, depth of user research and testing required, number of platforms covered (web, mobile, tablet, voice), design system maturity required, and the seniority of the design team. Research-heavy projects cost more upfront but reduce downstream rework." },
    { q: "How do you validate designs before development begins?", a: 'We use interactive prototypes and moderated usability testing with real users. Assumptions get tested before engineering starts. Issues related to user behavior surface early, when fixing them costs design hours instead of dev sprints. See <a href="/services/usability-testing-services/">usability testing services</a>.' },
    { q: "How do you ensure the design aligns with our brand?", a: "We incorporate your color palette, typography, visual style, and brand voice into the interface design. Design tokens enforce consistency across every screen and platform. We review the first 50 screens against your brand guide and adjust before scaling." },
    { q: "How do you measure the success of a UI UX design project?", a: "Success is measured against baselined metrics set during discovery. Common metrics include task completion rate, time on task, error rate, conversion rate, engagement, retention, and CSAT. We report against the baseline post-launch, not against assumptions." },
    { q: "Can you work with in-house development teams?", a: "Yes. We regularly provide design documentation and dev-ready assets to in-house engineering teams, and we stay available through implementation to answer questions during the build." },
  ],
};

/** Options shown in every lead form's "service" dropdown */
export const formInterests = [
  "UX audit",
  "UX research",
  "UX consulting",
  "Mobile app design",
  "Web app / SaaS design",
  "Dashboard design",
  "Design system",
  "Embedded design team",
];
