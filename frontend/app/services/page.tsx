import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | Spanish Language Assurance, Localization & Cultural Intelligence | Xpandia',
  description:
    'Explore Xpandia services for Spanish Language Assurance, Localization & Adaptation, and Applied Cultural Intelligence for AI, SaaS, EdTech, and digital product teams.',
  openGraph: {
    title: 'Xpandia Services | Spanish expertise for AI, SaaS, EdTech, and digital product teams',
    description:
      'Validate, localize, and culturally adapt Spanish experiences for Hispanic and Spanish-speaking audiences.',
  },
}

const decisionCards = [
  {
    title: 'Need to know if your Spanish is ready?',
    choose: 'Choose Language Assurance',
    body: 'For teams that already have Spanish outputs, product flows, support content, AI responses, or localized experiences and need expert validation before launch, scale, or release.',
    bullets: [
      'Evaluate Spanish AI outputs.',
      'Audit a product or customer journey in Spanish.',
      'Identify quality risks before deployment.',
      'Prioritize fixes by severity and business impact.',
      'Create standards for ongoing Spanish quality.',
    ],
    cta: 'Explore Language Assurance',
    href: '/services/language-assurance',
  },
  {
    title: 'Need to create or improve Spanish content?',
    choose: 'Choose Localization & Adaptation',
    body: 'For teams that need websites, product copy, documentation, support content, marketing, or learning materials translated, localized, adapted, repaired, or made more natural in Spanish.',
    bullets: [
      'Localize a website, app, or product interface.',
      'Adapt marketing copy for Spanish-speaking audiences.',
      'Improve existing translated content.',
      'Create Spanish support or help center content.',
      'Adapt terminology, tone, and regional Spanish.',
    ],
    cta: 'Explore Localization & Adaptation',
    href: '/services/localization-adaptation',
  },
  {
    title: 'Need to resonate with your Spanish audience beyond language?',
    choose: 'Choose Applied Cultural Intelligence',
    body: 'For teams that need cultural insight, market fit, messaging guidance, training, and strategic direction to connect with Hispanic and Spanish-speaking audiences.',
    bullets: [
      'Understand cultural expectations and trust signals.',
      'Improve messaging for Hispanic audiences.',
      'Prepare teams for Spanish-speaking markets.',
      'Train teams in Cultural Intelligence.',
      'Identify cultural friction before it affects adoption or conversion.',
      'Make better product, content, and go-to-market decisions.',
    ],
    cta: 'Explore Applied Cultural Intelligence',
    href: '/services/applied-cultural-intelligence',
  },
]

const serviceLines = [
  {
    num: '01',
    name: 'Language Assurance',
    tagline: 'Validate Spanish before your users do.',
    overview:
      'Structured Spanish QA audits, AI output evaluations, launch readiness reviews, and quality leadership for teams that need confidence before shipping Spanish experiences.',
    whenToUse: [
      'AI-generated Spanish that may be inaccurate, unnatural, inconsistent, or risky.',
      'Product flows that are translated but not ready for real users.',
      'Spanish content that lacks measurable quality standards.',
      'Teams that rely on vendors, reviewers, or internal speakers without a clear QA framework.',
      'Releases that need expert linguistic sign-off before deployment.',
    ],
    bestFor:
      'AI, SaaS, EdTech, Product, Localization, CX, Support, and Trust & Safety teams that already have Spanish outputs or experiences and need to validate quality.',
    engagements: [
      'AI Spanish Quality Audit Sprint.',
      'Spanish/LatAm Launch Readiness Audit.',
      'AI Output Benchmark.',
      'Chatbot & Support Bot Spanish Audit.',
      'Language Sign-Off / LSO Review.',
      'Fractional Language Quality Lead.',
      'Terminology & Style QA.',
      'Spanish Quality Governance Kit.',
    ],
    whatYouGet: [
      'Quality scorecard.',
      'Issue taxonomy.',
      'Severity ratings.',
      'Readiness recommendation.',
      'Prioritized remediation backlog.',
      'Executive readout.',
      'QA rubric or governance recommendations when needed.',
    ],
    pricing: [
      'Diagnostics from $500',
      'Launch readiness audits from $3,500',
      'AI QA sprints from $4,500',
      'Fractional advisory from $3,000/month',
    ],
    timeline: 'Most audits and sprints: 7–15 business days. Fractional advisory: monthly engagement.',
    cta: 'Explore Language Assurance',
    href: '/services/language-assurance',
  },
  {
    num: '02',
    name: 'Localization & Adaptation',
    tagline: 'Not just translated. Adapted for Spanish-speaking audiences.',
    overview:
      'Customized Spanish localization, transcreation, UX copy, documentation, and regional adaptation for digital products and content.',
    whenToUse: [
      'English-first products or content that need a professional Spanish version.',
      'Existing translations that sound literal, inconsistent, or disconnected from the audience, and do not convert as they should.',
      'Product UI, help content, or marketing copy that needs to feel natural in Spanish.',
      'Spanish experiences that need regional adaptation for LatAm, US Hispanic, or specific markets.',
      'Content that needs to support conversion, clarity, trust, and user action.',
    ],
    bestFor:
      'SaaS, EdTech, AI, Product, Marketing, CX, Support, and Localization teams launching or improving Spanish content, interfaces, campaigns, documentation, or learning experiences.',
    engagements: [
      'Content Localization.',
      'Product UI Localization.',
      'Marketing Localization & Transcreation.',
      'Help Center / Documentation Localization.',
      'EdTech Content Localization.',
      'Support Macro Adaptation.',
      'Regional Spanish Adaptation.',
      'Localization Review & Repair.',
      'Spanish Copy Adaptation.',
    ],
    whatYouGet: [
      'Localized Spanish copy.',
      'Adapted product or marketing content.',
      'Transcreation options when needed.',
      'Terminology guidance.',
      'Regional fit recommendations.',
      'QA-ready files.',
      'Publication-ready Spanish assets.',
    ],
    pricing: [
      'Review & repair projects from $2,500',
      'Content/product localization from $3,000+',
      'Transcreation/strategic adaptation scoped by campaign or content type',
    ],
    timeline:
      'Focused projects: 5–10 business days. Larger localization engagements: 2–6 weeks, depending on scope.',
    cta: 'Explore Localization & Adaptation',
    href: '/services/localization-adaptation',
  },
  {
    num: '03',
    name: 'Applied Cultural Intelligence',
    tagline: 'Read the invisible rules behind trust, culture, and growth.',
    overview:
      'Cultural intelligence audits, talks, executive briefings, workshops, and advisory for teams that need to understand Hispanic and Spanish-speaking audiences, reduce cultural friction, and make better product, content, marketing, CX, and go-to-market decisions.',
    whenToUse: [
      'Spanish content is accurate, but does not fully connect with the audience.',
      'Messaging misses trust signals, tone, context, or cultural expectations.',
      'Product, marketing, CX, or localization teams need stronger cultural insight before making decisions.',
      'Teams are entering Hispanic, LatAm, US Hispanic, or Spanish-speaking markets without a clear audience framework.',
      'Global teams need to improve cross-cultural communication, collaboration, and business readiness.',
      'Leaders need to understand the invisible protocols, red lines, and expectations that shape how people work, buy, decide, and respond.',
    ],
    bestFor:
      'Product, Marketing, Growth, CX, Localization, EdTech, Leadership, People, Global Operations, and AI teams serving Hispanic, LatAm, US Hispanic, or Spanish-speaking audiences.',
    engagements: [
      'Spanish Market Fit Audit.',
      'Hispanic Audience Messaging Review.',
      'Culturalization Audit.',
      'Regional Fit Strategy.',
      'Cultural Intelligence Talks.',
      'Executive Briefings.',
      'CQ / ACI Workshops.',
      'Go-to-Market Cultural Advisory.',
      'Inclusive & Accessible Spanish Communication Review.',
    ],
    whatYouGet: [
      'Cultural insight report.',
      'Audience-specific recommendations.',
      'Messaging guidance.',
      'Cultural friction map.',
      'Market fit findings.',
      'Talk, briefing, or workshop materials.',
      'Practical CQ framework.',
      'Actionable strategy for product, content, marketing, CX, leadership, or go-to-market teams.',
    ],
    pricing: [
      'Focused ACI audits from $3,500',
      'Cultural Intelligence talks from $1,500',
      'Executive briefings from $2,500',
      'Custom workshops from $4,500',
      'Strategic advisory from $3,000/month',
    ],
    timeline:
      'Talks and briefings: single session. Workshops: single session or half-day. Audits: 7–15 business days. Advisory: monthly engagement.',
    cta: 'Explore Applied Cultural Intelligence',
    href: '/services/applied-cultural-intelligence',
  },
]

const comparisonRows = [
  {
    need: 'Know whether Spanish outputs, product flows, or support content are ready to ship',
    choose: 'Language Assurance',
    outcome: 'Quality validation and readiness',
  },
  {
    need: 'Create, improve, or repair Spanish content, UI, documentation, or marketing',
    choose: 'Localization & Adaptation',
    outcome: 'Spanish content built for real users',
  },
  {
    need: 'Understand Hispanic/LatAm audiences, cultural expectations, trust, and market fit',
    choose: 'Applied Cultural Intelligence',
    outcome: 'Better decisions for Spanish-speaking markets',
  },
]

const startingPoints = [
  {
    name: 'AI Spanish Quality Audit Sprint',
    bestFor: 'Teams with AI outputs, chatbot responses, tutors, copilots, or agents operating in Spanish.',
    outcome:
      'Understand quality risks, scoring, issue patterns, and readiness before users rely on the experience.',
    deliverablesLabel: 'Sprint deliverables',
    deliverables: [
      'Representative output review.',
      'QA rubric.',
      'Scorecard.',
      'Issue taxonomy.',
      'Severity ratings.',
      'Remediation guidance.',
      'Executive readout.',
    ],
    price: ['From $4,500'],
    timeline: '10 business days',
    cta: 'Request an AI QA Sprint',
  },
  {
    name: 'Spanish / LatAm Launch Readiness Audit',
    bestFor:
      'Teams launching or improving a Spanish website, app, onboarding flow, support journey, or customer experience.',
    outcome:
      'Identify what affects clarity, trust, UX, cultural fit, and readiness before launch or relaunch.',
    deliverablesLabel: 'Audit deliverables',
    deliverables: [
      'Journey review.',
      'Screenshots and annotations.',
      'Issue log.',
      'Quick wins.',
      'Prioritized remediation backlog.',
      'Readiness recommendation.',
    ],
    price: ['From $3,500'],
    timeline: '10–12 business days',
    cta: 'Request a Launch Readiness Audit',
  },
  {
    name: 'Localization Review & Repair',
    bestFor:
      'Teams with existing Spanish translations that need improvement, consistency, adaptation, or publication readiness.',
    outcome:
      'Turn translated Spanish into content that feels natural, clear, trustworthy, and aligned with your audience.',
    deliverablesLabel: 'Review deliverables',
    deliverables: [
      'Content review.',
      'Rewrite recommendations.',
      'Terminology notes.',
      'Regional fit guidance.',
      'QA checklist.',
      'Final-ready copy where scope allows.',
    ],
    price: ['From $2,500'],
    timeline: '5–10 business days',
    cta: 'Request Localization Review',
  },
  {
    name: 'Cultural Intelligence Talks',
    tagline: 'Read the invisible rules of global business.',
    overview:
      'Culture is the hidden operating system behind every global interaction. It shapes how people build trust, read timing, respond to hierarchy, give feedback, handle risk, make decisions, and interpret what is said — and what is left unsaid. Xpandia Talks help leaders and teams decode those invisible rules with clarity, so they can communicate more effectively, reduce costly friction, and build stronger relationships across markets, languages, and audiences.',
    bestFor:
      'Leadership, Product, Marketing, CX, Localization, People, and Global Operations teams working across cultures, markets, languages, or international teams.',
    outcome:
      'Your team leaves with a practical understanding of how Cultural Intelligence can improve collaboration, reduce friction, strengthen trust, and support better business decisions across cultures.',
    themesLabel: 'Talk themes',
    themes: [
      'Cultural Intelligence (CQ) for global business.',
      'The invisible protocols behind trust and communication.',
      'Cultural red lines and how to avoid crossing them.',
      'How culture shapes feedback, hierarchy, time, and decision-making.',
      'Culturalization for products, content, and customer experience.',
      'Hispanic and Spanish-speaking audience expectations.',
      'Mindset shifts for more productive global teams.',
    ],
    deliverablesLabel: 'Talk deliverables',
    deliverables: [
      '45–60 minute live talk or executive briefing.',
      'Pre-call to understand audience and business context.',
      'Practical CQ framework.',
      'Real business examples tailored to the audience.',
      'Optional Q&A.',
      'One-page summary or team checklist.',
      'Recommended next steps for workshop, audit, or advisory engagement.',
    ],
    price: ['Virtual talks from $1,500', 'Executive briefings from $2,500', 'Custom workshops from $4,500'],
    timeline:
      'Single session. Custom workshops and advisory engagements are scoped based on audience, format, and level of customization.',
    cta: 'Book a CQ Talk',
  },
]

const engagementSteps = [
  {
    title: 'Scope the need',
    body: 'We define your audience, Spanish variant, product surface, content type, business objective, timeline, and expected outcome.',
  },
  {
    title: 'Review the experience',
    body: 'We evaluate the selected material using expert judgment, structured criteria, and the right mix of linguistic, cultural, UX, and product quality signals.',
  },
  {
    title: 'Deliver the evidence',
    body: 'You receive decision-ready findings your team can use immediately: quality scorecards, annotated examples, issue logs, severity ratings, prioritized recommendations, rewrites, standards, and training materials. Each deliverable connects expert judgment to action: what is working, what needs attention, why it matters, and what your team should do next.',
  },
  {
    title: 'Decide the next move',
    body: 'We recommend the right next step: ship, fix, localize, adapt, train, govern, or scale.',
  },
]

const pricingCards = [
  {
    name: 'Diagnostics',
    price: 'From $500',
    body: 'Get a fast expert read before Spanish issues turn into user friction, launch delays, or avoidable rework. Best when your team needs to understand what is happening, what matters most, and which engagement will create the fastest path forward.',
  },
  {
    name: 'Launch Readiness Audits',
    price: 'From $3,500',
    body: 'Find the issues affecting clarity, trust, UX, conversion, or customer confidence in your Spanish experience. Designed for product, AI, localization, support, CX, and marketing teams that need structured findings, severity ratings, and prioritized recommendations they can act on now.',
  },
  {
    name: 'AI QA Sprints',
    price: 'From $4,500',
    body: 'Validate AI-generated Spanish before users rely on or complain about it. For teams evaluating chatbot responses, copilots, tutors, agents, support flows, or other AI outputs that need to be accurate, natural, safe, consistent, and ready for real Spanish-speaking users.',
  },
  {
    name: 'Localization & Adaptation',
    price: 'From $2,500',
    body: 'Turn English-first or underperforming Spanish content into experiences that feel clear, natural, and built for your audience. For websites, product copy, help content, campaigns, learning materials, and Spanish content that needs to support trust, conversion, comprehension, and action.',
  },
  {
    name: 'Cultural Intelligence Talks & Workshops',
    price: 'Talks from $1,500 · Briefings from $2,500 · Workshops from $4,500',
    body: 'Help global teams read the invisible rules behind trust, communication, decision-making, and market readiness. For leaders and teams that need Cultural Intelligence talks, executive briefings, or custom workshops on cross-cultural communication, culturalization, Spanish-speaking audiences, and global business growth.',
  },
  {
    name: 'Fractional Advisory',
    price: 'From $3,000/month',
    body: 'Bring senior Spanish Localization QA leadership into your team without a full-time hire. For companies that need ongoing governance, vendor ops oversight, QA frameworks, review workflows, terminology standards, quality dashboards, or strategic guidance to scale Spanish quality with confidence.',
  },
]

export default function ServicesPage() {
  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">SERVICES</div>
          <h1 className="hero-display text-[clamp(44px,6vw,92px)] max-w-[18ch]">
            The Spanish expertise your product needs.
          </h1>
          <p className="hero-sub mt-8">
            Xpandia helps teams validate, localize, and culturally adapt Spanish experiences across AI
            outputs, product flows, support content, marketing, and customer journeys.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">
              Book a diagnostic call <span className="btn-arrow"></span>
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              Request an audit
            </Link>
          </div>
          <p className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-12 max-w-[64ch]">
            BUILT FOR AI, SAAS, EDTECH, PRODUCT, LOCALIZATION, CX, AND MARKETING TEAMS SERVING HISPANIC AND
            SPANISH-SPEAKING AUDIENCES.
          </p>
        </div>
      </section>

      {/* 2. Service Decision Section */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">CHOOSE THE RIGHT PATH</div>
              <h2 className="head-title mt-5">What does your team need to solve?</h2>
            </div>
            <p className="head-lede">
              Start with the outcome your team needs. Xpandia structures each engagement around a clear
              business question: is your Spanish ready, does it need to be adapted, or does your team need
              deeper cultural insight?
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-5 mt-12">
            {decisionCards.map(card => (
              <div
                key={card.title}
                className="flex flex-col p-7 bg-white border border-ink-150 rounded-lg"
              >
                <div className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.15] text-ink-900">
                  {card.title}
                </div>
                <div className="text-primary font-medium text-[15px] mt-2">{card.choose}</div>
                <p className="text-ink-600 text-[15px] leading-[1.55] mt-4">{card.body}</p>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-6 mb-3">
                  BEST WHEN YOU NEED TO:
                </div>
                <ul className="space-y-2 text-ink-600 text-[14.5px] leading-[1.5]">
                  {card.bullets.map(b => (
                    <li key={b} className="flex gap-2.5">
                      <span className="text-accent mt-px">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link href={card.href} className="btn btn-secondary btn-small">
                    {card.cta} <span className="btn-arrow"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Service Line Cards */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">SERVICE LINES</div>
              <h2 className="head-title mt-5">One Spanish partner. Three specialized capabilities.</h2>
            </div>
            <p className="head-lede">
              Each service line can work independently or as part of a broader quality roadmap. Start with a
              focused audit, a localization engagement, or an ACI workshop, then scale into governance,
              training, or ongoing advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12">
            {serviceLines.map(line => (
              <div
                key={line.name}
                className="grid grid-cols-1 tablet:grid-cols-[1fr_1.4fr] gap-10 p-8 tablet:p-10 bg-white border border-ink-150 rounded-lg"
              >
                <div>
                  <div className="font-mono text-[12px] tracking-[0.1em] text-ink-500">{line.num} / SERVICE LINE</div>
                  <h3 className="font-display text-[clamp(26px,2.8vw,38px)] font-medium tracking-[-0.02em] leading-[1.08] mt-3 text-ink-900">
                    {line.name}
                  </h3>
                  <p className="text-accent font-medium text-[16px] mt-3">{line.tagline}</p>
                  <p className="text-ink-600 text-[16px] leading-[1.55] mt-5">{line.overview}</p>
                  <div className="mt-8">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">BEST FOR</div>
                    <p className="text-ink-600 text-[15px] leading-[1.55]">{line.bestFor}</p>
                  </div>
                  <div className="mt-8">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3">
                      ENGAGEMENT STARTING POINTS
                    </div>
                    <ul className="space-y-1.5">
                      {line.pricing.map(p => (
                        <li key={p} className="text-ink-900 text-[15px] font-medium">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">TIMELINE</div>
                    <p className="text-ink-600 text-[15px] leading-[1.55]">{line.timeline}</p>
                  </div>
                  <div className="mt-8">
                    <Link href={line.href} className="btn btn-primary">
                      {line.cta} <span className="btn-arrow"></span>
                    </Link>
                  </div>
                </div>

                <div className="border-t border-ink-150 pt-8 tablet:border-t-0 tablet:border-l tablet:border-ink-150 tablet:pt-0 tablet:pl-10">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3">WHEN TO USE IT</div>
                  <ul className="space-y-2 text-ink-600 text-[15px] leading-[1.5]">
                    {line.whenToUse.map(w => (
                      <li key={w} className="flex gap-2.5">
                        <span className="text-accent mt-px">·</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3 mt-8">
                    CORE ENGAGEMENTS
                  </div>
                  <ul className="space-y-2 text-ink-600 text-[15px] leading-[1.5]">
                    {line.engagements.map(e => (
                      <li key={e} className="flex gap-2.5">
                        <span className="text-accent mt-px">·</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3 mt-8">
                    WHAT YOU GET
                  </div>
                  <ul className="checklist">
                    {line.whatYouGet.map(g => (
                      <li key={g}>
                        <span className="chk"></span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Comparison Section */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">HOW TO CHOOSE</div>
              <h2 className="head-title mt-5">The difference is simple: validate, adapt, or understand.</h2>
            </div>
            <p className="head-lede">
              Many teams start with an audit, then move into localization, cultural adaptation, training, or
              ongoing quality leadership. Xpandia can support a focused need or help build a broader Spanish
              quality roadmap.
            </p>
          </div>

          <div className="comparison-wrap mt-12">
            <table className="comparison-table w-full border-collapse bg-white border border-ink-150 rounded-lg overflow-hidden text-left">
              <thead>
                <tr className="bg-ink-900 text-paper">
                  <th className="px-6 py-4 font-mono text-[11px] tracking-[0.1em] font-normal">
                    IF YOUR TEAM NEEDS TO…
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] tracking-[0.1em] font-normal">CHOOSE</th>
                  <th className="px-6 py-4 font-mono text-[11px] tracking-[0.1em] font-normal">
                    PRIMARY OUTCOME
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(row => (
                  <tr key={row.choose} className="border-t border-ink-150 align-top">
                    <td className="px-6 py-5 text-ink-600 text-[15px] leading-[1.5]">{row.need}</td>
                    <td className="px-6 py-5 text-ink-900 text-[15px] font-medium whitespace-nowrap">
                      {row.choose}
                    </td>
                    <td className="px-6 py-5 text-ink-600 text-[15px] leading-[1.5]">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Recommended Starting Points */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">START HERE</div>
              <h2 className="head-title mt-5">Focused engagements designed to create momentum.</h2>
            </div>
            <p className="head-lede">
              Start with a defined scope, clear deliverables, and practical recommendations your team can act
              on quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mt-12">
            {startingPoints.map(sp => (
              <div
                key={sp.name}
                className="flex flex-col p-8 bg-white border border-ink-150 rounded-lg"
              >
                <h3 className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.15] text-ink-900">
                  {sp.name}
                </h3>
                {sp.tagline && <p className="text-accent font-medium text-[15px] mt-2">{sp.tagline}</p>}
                {sp.overview && <p className="text-ink-600 text-[15px] leading-[1.55] mt-4">{sp.overview}</p>}

                <div className="mt-5">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1.5">BEST FOR</div>
                  <p className="text-ink-600 text-[15px] leading-[1.5]">{sp.bestFor}</p>
                </div>

                <div className="mt-5">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1.5">OUTCOME</div>
                  <p className="text-ink-600 text-[15px] leading-[1.5]">{sp.outcome}</p>
                </div>

                {sp.themes && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">
                      {sp.themesLabel?.toUpperCase()}
                    </div>
                    <ul className="space-y-2 text-ink-600 text-[14.5px] leading-[1.5]">
                      {sp.themes.map(t => (
                        <li key={t} className="flex gap-2.5">
                          <span className="text-accent mt-px">·</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-5">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">
                    {(sp.deliverablesLabel ?? 'Deliverables').toUpperCase()}
                  </div>
                  <ul className="checklist">
                    {sp.deliverables.map(d => (
                      <li key={d}>
                        <span className="chk"></span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-ink-150">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">
                    ENGAGEMENT STARTS AT
                  </div>
                  <ul className="space-y-1">
                    {sp.price.map(p => (
                      <li key={p} className="text-ink-900 text-[15px] font-medium">{p}</li>
                    ))}
                  </ul>
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-4 mb-1">TIMELINE</div>
                  <p className="text-ink-600 text-[15px] leading-[1.5]">{sp.timeline}</p>
                </div>

                <div className="mt-auto pt-6">
                  <Link href="/contact" className="btn btn-primary">
                    {sp.cta} <span className="btn-arrow"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Engagement Model */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-16 items-start">
            <div>
              <div className="eyebrow">HOW ENGAGEMENTS WORK</div>
              <h2 style={{ marginTop: 24 }}>Clear scope. Expert review. Actionable output.</h2>
            </div>
            <ol className="num-list">
              {engagementSteps.map(step => (
                <li key={step.title}>
                  <div>
                    <h4>{step.title}</h4>
                    <div className="n-body">{step.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7. Pricing */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">PRICING</div>
              <h2 className="head-title mt-5">Simple starting points for focused work.</h2>
            </div>
            <p className="head-lede">
              Pricing depends on scope, volume, content type, product complexity, and timeline. Most teams
              begin with a focused audit, sprint, workshop, or localization review.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-5 mt-12">
            {pricingCards.map(card => (
              <div key={card.name} className="flex flex-col p-7 bg-white border border-ink-150 rounded-lg">
                <div className="font-display text-[19px] font-medium tracking-[-0.012em] text-ink-900">
                  {card.name}
                </div>
                <div className="font-display text-[clamp(22px,2vw,30px)] font-medium tracking-[-0.02em] text-primary mt-2">
                  {card.price}
                </div>
                <p className="text-ink-600 text-[14.5px] leading-[1.55] mt-4">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-[64ch] text-ink-600 text-[15px] leading-[1.6]">
            <p className="font-medium text-ink-900">
              Final pricing is confirmed after a short diagnostic call and scope review.
            </p>
            <p className="mt-2">
              We will help you identify the fastest, most practical path to improve Spanish quality, reduce
              risk, and move your product, content, or team forward.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow">NEXT STEP</div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(36px,4.5vw,64px)', lineHeight: 1.02 }}>
            Let&apos;s identify the right Spanish quality path for your team.
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            Tell us what your team is building, launching, localizing, or improving. We&apos;ll recommend the
            right engagement based on your product, audience, timeline, and business goal.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">
              Book a diagnostic call <span className="btn-arrow"></span>
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              Request an audit
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
