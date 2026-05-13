import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Applied Cultural Intelligence for Global Teams & Hispanic Audiences | Xpandia',
  description: 'Xpandia helps Product, Marketing, CX, Localization, Leadership, and Global Operations teams understand Hispanic and Spanish-speaking audiences, reduce cultural friction, and make better business decisions across markets.',
}

const coverageCards = [
  { title: 'Trust signals', desc: 'What makes your product, message, support experience, or brand feel credible, respectful, and safe for the audience.' },
  { title: 'Communication style', desc: 'How directness, formality, tone, context, emotion, and relationship-building shape the way people interpret messages.' },
  { title: 'Decision-making', desc: 'How users, customers, partners, and teams evaluate risk, authority, timing, certainty, and next steps.' },
  { title: 'Cultural red lines', desc: 'The words, assumptions, visuals, examples, messages, or behaviors that may create friction, mistrust, confusion, or rejection.' },
  { title: 'Market and audience fit', desc: 'How well your product, message, content, or experience fits Hispanic, LatAm, US Hispanic, Spanish-speaking, or multicultural audiences.' },
  { title: 'Cross-cultural teamwork', desc: 'How global teams communicate, collaborate, give feedback, escalate issues, and align decisions across cultures.' },
]

const whenToUse = [
  'Your Spanish content is accurate, but does not fully connect with the audience.',
  'Your messaging misses trust signals, tone, context, or cultural expectations.',
  'Your team is entering Hispanic, LatAm, US Hispanic, or Spanish-speaking markets.',
  'Your product, marketing, CX, or localization decisions need stronger cultural context.',
  'Your global team needs to improve communication, collaboration, feedback, and decision-making across cultures.',
  'Your company needs a talk, briefing, or workshop to build Cultural Intelligence before scaling into new markets.',
  'Your team wants to identify cultural friction before it affects adoption, conversion, trust, or customer relationships.',
]

const criteriaCards = [
  { n: '01', title: 'Audience expectations', desc: 'Does your product, message, or experience reflect what the audience values, expects, and needs to trust?' },
  { n: '02', title: 'Trust and credibility', desc: 'Does the communication build confidence, authority, warmth, clarity, and legitimacy with the intended audience?' },
  { n: '03', title: 'Tone and relationship', desc: 'Does the tone respect the audience’s expectations around formality, closeness, authority, empathy, and professionalism?' },
  { n: '04', title: 'Cultural context', desc: 'Does the content account for social, regional, historical, behavioral, and market-specific context?' },
  { n: '05', title: 'Communication style', desc: 'Does the message align with how the audience gives, receives, interprets, and responds to information?' },
  { n: '06', title: 'Decision behavior', desc: 'Does the experience support how the audience evaluates risk, urgency, value, certainty, and next steps?' },
  { n: '07', title: 'Cultural friction', desc: 'Where could the experience create misunderstanding, hesitation, mistrust, discomfort, or unnecessary resistance?' },
  { n: '08', title: 'Market readiness', desc: 'Is the team culturally prepared to launch, communicate, support, sell, or operate in the target market?' },
  { n: '09', title: 'Team mindset', desc: 'Does the team have the awareness, language, and practical tools to work better across cultural contexts?' },
  { n: '10', title: 'Growth alignment', desc: 'Does the cultural strategy support product adoption, customer trust, team productivity, and market expansion?' },
]

const engagements = [
  {
    n: '01',
    title: 'Cultural Intelligence Talks',
    tagline: 'Read the invisible rules of global business.',
    bestFor: 'Leadership, Product, Marketing, CX, Localization, People, and Global Operations teams working across cultures, markets, languages, or international teams.',
    outcome: 'Help your team understand how Cultural Intelligence can improve collaboration, reduce friction, strengthen trust, and support better business decisions across cultures.',
    overview: 'Culture is the hidden operating system behind global business. It shapes how people build trust, read timing, respond to hierarchy, give feedback, handle risk, make decisions, and interpret what is said — and what is left unsaid. Xpandia Talks help leaders and teams decode those invisible rules, so they can communicate more effectively, reduce costly friction, and build stronger relationships across markets, languages, and audiences.',
    themes: [
      'Cultural Intelligence (CQ) for global business.',
      'The invisible protocols behind trust and communication.',
      'Cultural red lines and how to avoid crossing them.',
      'How culture shapes feedback, hierarchy, time, and decision-making.',
      'Culturalization for products, content, and customer experience.',
      'Hispanic and Spanish-speaking audience expectations.',
      'Mindset shifts for more productive global teams.',
    ],
    deliverables: [
      '45–60 minute live talk or executive briefing.',
      'Pre-call to understand audience and business context.',
      'Practical CQ framework.',
      'Real business examples tailored to the audience.',
      'Optional Q&A.',
      'One-page summary or team checklist.',
      'Recommended next steps for workshop, audit, or advisory engagement.',
    ],
    deliverablesLabel: 'Talk deliverables',
    price: 'Talks from $1,500 · Executive briefings from $2,500',
    timeline: 'Single session',
    cta: 'Book a CQ Talk',
  },
  {
    n: '02',
    title: 'Hispanic Audience Messaging Review',
    tagline: 'Make your message land with the audience you need to reach.',
    bestFor: 'Marketing, Growth, Product Marketing, CX, Localization, and leadership teams adapting messages for Hispanic, LatAm, US Hispanic, or Spanish-speaking audiences.',
    outcome: 'Identify where messaging can become clearer, more credible, more culturally aligned, and more persuasive for the intended audience.',
    deliverables: [
      'Messaging review.',
      'Audience fit findings.',
      'Trust signal analysis.',
      'Tone and context recommendations.',
      'Cultural friction notes.',
      'Suggested rewrites or message directions.',
      'Executive summary.',
    ],
    deliverablesLabel: 'Review deliverables',
    price: 'From $3,500',
    timeline: '7–10 business days',
    cta: 'Request Messaging Review',
  },
  {
    n: '03',
    title: 'Spanish Market Fit Audit',
    tagline: 'Understand how ready your product or message is for Spanish-speaking markets.',
    bestFor: 'Teams entering, expanding, or improving their presence in Hispanic, LatAm, US Hispanic, Spain, or Spanish-speaking markets.',
    outcome: 'Evaluate audience fit, cultural friction, communication risks, trust signals, and market readiness before launch, relaunch, or expansion.',
    deliverables: [
      'Market and audience fit findings.',
      'Cultural friction map.',
      'Trust and messaging analysis.',
      'Regional fit recommendations.',
      'Product/content/CX observations.',
      'Prioritized recommendations.',
      'Readiness summary.',
    ],
    deliverablesLabel: 'Audit deliverables',
    price: 'From $4,500',
    timeline: '10–15 business days',
    cta: 'Request Market Fit Audit',
  },
  {
    n: '04',
    title: 'Culturalization Audit',
    tagline: 'Adapt the experience, not just the language.',
    bestFor: 'Product, Content, Marketing, EdTech, CX, and Localization teams that need to evaluate whether their Spanish or Hispanic-facing experience is culturally aligned.',
    outcome: 'Identify where content, product flows, examples, visuals, tone, assumptions, messages, or support experiences need cultural adaptation.',
    deliverables: [
      'Culturalization review.',
      'Audience expectation analysis.',
      'Cultural fit findings.',
      'Red line and friction notes.',
      'Adaptation recommendations.',
      'Examples of what to adjust and why.',
      'Executive readout.',
    ],
    deliverablesLabel: 'Audit deliverables',
    price: 'From $3,500',
    timeline: '7–15 business days',
    cta: 'Request Culturalization Audit',
  },
  {
    n: '05',
    title: 'CQ / ACI Workshops',
    tagline: 'Build the cultural intelligence your team needs to work and grow across markets.',
    bestFor: 'Leadership, Product, Marketing, CX, Localization, People, and Operations teams that need practical training in cross-cultural communication, Hispanic audience readiness, or culturalization.',
    outcome: 'Give your team a shared framework, vocabulary, and practical tools to understand cultural signals, reduce friction, and make better decisions across markets.',
    deliverables: [
      'Custom 90-minute, half-day, or multi-session workshop.',
      'Pre-call to understand team context and business goal.',
      'Practical CQ / ACI framework.',
      'Real examples tailored to your audience or market.',
      'Team exercises or discussion prompts.',
      'One-page checklist or working guide.',
      'Recommended next steps.',
    ],
    deliverablesLabel: 'Workshop deliverables',
    price: 'From $4,500',
    timeline: 'Single session or half-day · Multi-session workshops scoped separately',
    cta: 'Book an ACI Workshop',
  },
  {
    n: '06',
    title: 'Go-to-Market Cultural Advisory',
    tagline: 'Make cultural context part of your growth strategy.',
    bestFor: 'Leadership, Product, Marketing, Growth, CX, and Localization teams planning Spanish-speaking market entry, Hispanic audience strategy, or multicultural expansion.',
    outcome: 'Support better market decisions by integrating cultural insight into messaging, product positioning, customer experience, communication, and rollout strategy.',
    deliverables: [
      'Strategic advisory sessions.',
      'Audience and market context.',
      'Cultural risk and opportunity analysis.',
      'Messaging and positioning guidance.',
      'Product/CX recommendations.',
      'Prioritized action plan.',
      'Follow-up guidance.',
    ],
    deliverablesLabel: 'Advisory deliverables',
    price: 'From $3,000/month',
    timeline: 'Monthly engagement · Recommended minimum: 3 months',
    cta: 'Explore ACI Advisory',
  },
]

const methodologySteps = [
  { title: 'Define the audience', body: 'We clarify your audience, market, team context, product surface, communication challenge, business goal, and cultural complexity.' },
  { title: 'Decode the signals', body: 'We examine the cultural expectations, trust drivers, communication patterns, decision behaviors, and possible friction points shaping the situation.' },
  { title: 'Translate insight into action', body: 'We turn cultural analysis into practical recommendations your team can use across product, content, marketing, CX, leadership, or go-to-market decisions.' },
  { title: 'Build team readiness', body: 'Through talks, briefings, workshops, or advisory, we help teams develop the language, mindset, and tools to work more effectively across cultures.' },
  { title: 'Recommend the next move', body: 'We identify the right path forward: adapt messaging, run a culturalization audit, train the team, refine go-to-market strategy, or move into ongoing advisory.' },
]

const deliverableCards = [
  { title: 'Cultural Insight Report', desc: 'A focused summary of the cultural patterns, expectations, and signals that matter for your audience or team.' },
  { title: 'Audience-Specific Recommendations', desc: 'Practical guidance tailored to Hispanic, LatAm, US Hispanic, Spanish-speaking, or multicultural audiences.' },
  { title: 'Cultural Friction Map', desc: 'A structured view of where misunderstandings, hesitation, mistrust, or resistance may appear.' },
  { title: 'Messaging Guidance', desc: 'Recommendations to improve tone, trust signals, clarity, context, and audience connection.' },
  { title: 'Market Fit Findings', desc: 'Insights on whether your product, content, message, or experience is aligned with the expectations of the target market.' },
  { title: 'CQ Framework', desc: 'A practical model your team can use to understand cultural difference, communication styles, and audience behavior.' },
  { title: 'Workshop Materials', desc: 'Slides, exercises, checklists, examples, or working guides tailored to the team or audience.' },
  { title: 'Action Roadmap', desc: 'A prioritized plan for product, marketing, CX, localization, leadership, or go-to-market next steps.' },
]

const builtForCards = [
  { title: 'Leadership Teams', desc: 'Build cultural intelligence for better communication, decision-making, and global team alignment.' },
  { title: 'Product Teams', desc: 'Understand how cultural context affects product experience, usability, trust, adoption, and user behavior.' },
  { title: 'Marketing & Growth Teams', desc: 'Adapt messaging, campaigns, positioning, and conversion paths for Hispanic and Spanish-speaking audiences.' },
  { title: 'CX & Support Teams', desc: 'Improve customer communication, escalation language, empathy, trust, and support experiences across cultures.' },
  { title: 'Localization Teams', desc: 'Move beyond language accuracy into cultural fit, regional relevance, and audience readiness.' },
  { title: 'People & Global Operations Teams', desc: 'Train distributed teams to communicate, collaborate, give feedback, and work across cultural contexts.' },
  { title: 'EdTech Teams', desc: 'Adapt learning experiences, examples, feedback, and educational content for culturally diverse learners.' },
  { title: 'AI Teams', desc: 'Understand cultural context behind AI outputs, user expectations, trust, tone, and risk in Spanish-speaking experiences.' },
]

const pricingCards = [
  { title: 'Cultural Intelligence Talks', price: 'From $1,500', desc: 'Introduce leaders and teams to the invisible rules behind trust, communication, decision-making, and global business growth.' },
  { title: 'Executive Briefings', price: 'From $2,500', desc: 'A strategic session for leadership or cross-functional teams that need cultural insight tied to a specific audience, market, or business challenge.' },
  { title: 'ACI Audits', price: 'From $3,500', desc: 'Evaluate messaging, audience fit, culturalization, friction points, and readiness for Hispanic or Spanish-speaking audiences.' },
  { title: 'Spanish Market Fit Audit', price: 'From $4,500', desc: 'Assess market readiness, trust signals, cultural fit, communication risks, and audience alignment before launch or expansion.' },
  { title: 'Custom Workshops', price: 'From $4,500', desc: 'Train teams with practical Cultural Intelligence frameworks, examples, exercises, and recommendations tailored to their work.' },
  { title: 'Strategic Advisory', price: 'From $3,000/month', desc: 'Ongoing cultural guidance for teams entering, growing, or operating across Hispanic, Spanish-speaking, or multicultural markets.' },
]

const faqs = [
  { q: 'Is ACI the same as cultural training?', a: 'It can include training, but Applied Cultural Intelligence is broader. It helps teams apply cultural insight to product, messaging, CX, localization, leadership, communication, and go-to-market decisions.' },
  { q: 'Is this only for Spanish-speaking audiences?', a: 'No. Xpandia’s strongest focus is Hispanic and Spanish-speaking audiences, but the ACI framework also supports global teams working across cultures, markets, and languages.' },
  { q: 'Do we need this if our Spanish is already correct?', a: 'Yes. Correct Spanish can still miss cultural expectations, trust signals, tone, context, or audience fit. ACI helps determine whether the experience connects, not only whether it is linguistically accurate.' },
  { q: 'Can this help leadership teams?', a: 'Yes. ACI talks and executive briefings are designed to help leaders understand how culture shapes trust, communication, decision-making, feedback, hierarchy, risk, and global collaboration.' },
  { q: 'Can this support product or marketing decisions?', a: 'Yes. ACI can inform messaging, product flows, CX, onboarding, campaigns, go-to-market strategy, audience fit, and market readiness.' },
  { q: 'Can this be combined with Localization or Language Assurance?', a: 'Yes. ACI can guide localization before content is created, support cultural adaptation during localization, or complement Language Assurance when a Spanish experience needs cultural readiness evaluation.' },
]

export default function AppliedCulturalIntelligencePage() {
  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="flex gap-3 mb-7">
            <Link href="/services" className="font-mono text-[11px] tracking-[0.1em] text-ink-500">← ALL SERVICES</Link>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-500">· 03 / UNDERSTAND</span>
          </div>
          <div className="eyebrow mb-8">APPLIED CULTURAL INTELLIGENCE</div>
          <h1 className="hero-display text-[clamp(44px,5.6vw,84px)] max-w-[18ch]">
            Read the invisible rules behind <span className="accent-underline">trust, culture, and growth</span>.
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            Xpandia helps global teams understand Hispanic and Spanish-speaking audiences, decode cultural signals, improve cross-cultural communication, and make better product, content, marketing, CX, and go-to-market decisions.
          </p>
          <p className="mt-5 text-ink-600 text-[17px] max-w-[64ch]">
            Culture shapes how people build trust, read timing, respond to hierarchy, give feedback, handle risk, make decisions, and interpret what is said — and what is left unsaid. Applied Cultural Intelligence turns those invisible signals into practical business insight your team can use.
          </p>
          <div className="hero-ctas mt-9">
            <Link className="btn btn-primary" href="/contact">Book a CQ talk <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Request an ACI audit</Link>
          </div>

          <div data-stagger className="mt-20 pt-6 border-t border-ink-150 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: 'FOR GLOBAL TEAMS', body: 'Leadership, Product, Marketing, CX, Localization, People, and Operations.' },
              { label: 'FOR HISPANIC AUDIENCES', body: 'US Hispanic, LatAm, Spanish-speaking markets, and multicultural contexts.' },
              { label: 'FOR BETTER DECISIONS', body: 'Messaging, product experience, CX, communication, training, and market readiness.' },
            ].map(p => (
              <div key={p.label}>
                <div className="eyebrow no-bar">{p.label}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5] mt-2">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Positioning */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">WHY APPLIED CULTURAL INTELLIGENCE</div>
            <div>
              <p className="display text-[clamp(26px,2.8vw,40px)] leading-[1.08] tracking-[-0.02em] max-w-[34ch] mb-6">
                Culture is the hidden operating system behind global business.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[64ch] mb-5">
                Every market, team, and audience has invisible expectations: what builds trust, what feels respectful, what creates friction, what sounds credible, what feels too direct, what feels too vague, and what makes people act. Applied Cultural Intelligence helps teams recognize those signals before they affect adoption, collaboration, conversion, customer experience, or market growth.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[64ch] mb-5">
                For Xpandia, ACI is not an abstract theory. It is a practical lens for improving how companies communicate, localize, build, support, sell, train, and expand across Spanish-speaking and multicultural markets.
              </p>
              <p className="text-ink-900 text-[19px] max-w-[64ch] font-medium">
                The goal is simple: help your team make decisions with cultural context, not assumptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What ACI Covers */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow mb-5">WHAT WE HELP YOU UNDERSTAND</div>
              <h2 className="head-title">The cultural signals that shape trust, behavior, and business outcomes.</h2>
            </div>
            <p className="head-lede">Applied Cultural Intelligence helps teams understand the audience behind the language and the cultural context behind the decision.</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {coverageCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual band */}
      <section className="tight pt-0 pb-0">
        <div className="container">
          <div className="relative aspect-[16/9] tablet:aspect-[24/7] rounded-lg overflow-hidden bg-ink-900">
            <Image src="/assets/img-markets.jpg" alt="" fill loading="lazy" className="object-cover grayscale contrast-[1.05]" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,20,25,0.3) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.8) 100%)' }}></div>
            <div className="absolute bottom-8 right-8 font-mono text-[11px] tracking-[0.14em] text-white/85 text-right">
              <div className="mb-[6px]">03 / UNDERSTAND</div>
              <div className="text-accent text-[14px] tracking-[0.08em]">DECODE → ALIGN → ACT</div>
            </div>
            <div className="absolute bottom-0 left-0 w-[34%] h-[3px] bg-accent"></div>
          </div>
        </div>
      </section>

      {/* 4. When to Use */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div>
              <div className="eyebrow mb-5">WHEN TO USE IT</div>
              <p className="display text-[clamp(24px,2.6vw,36px)] leading-[1.1] tracking-[-0.02em] max-w-[26ch]">
                Use ACI when language is correct, but the connection is not guaranteed.
              </p>
            </div>
            <ul className="checklist">
              {whenToUse.map(item => (
                <li key={item}><span className="chk"></span><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Core ACI Criteria — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="section-head" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
            <div>
              <div className="eyebrow mb-5">ACI CRITERIA</div>
              <h2 className="head-title text-paper">The signals behind communication your audience can trust.</h2>
            </div>
            <p className="head-lede text-ink-300">Each ACI engagement is scoped around your audience, market, business goal, team context, and level of cultural complexity. Depending on the project, we evaluate or train around the criteria that matter most.</p>
          </div>
          <div data-stagger className="grid grid-cols-2 tablet:grid-cols-5 gap-px mt-12 bg-white/[0.08]">
            {criteriaCards.map(c => (
              <div key={c.n} className="bg-ink-900 px-6 py-8">
                <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-3">{c.n}</div>
                <div className="font-display text-[19px] tracking-[-0.012em] mb-2">{c.title}</div>
                <div className="text-[13.5px] text-ink-300 leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Core Engagements */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow mb-5">CORE ENGAGEMENTS</div>
              <h2 className="head-title">Talks, audits, workshops, and advisory for teams working across cultures.</h2>
            </div>
            <p className="head-lede">Start with a focused ACI talk, audit, or briefing, then scale into workshops, go-to-market advisory, audience strategy, or ongoing cultural guidance.</p>
          </div>
          <div className="mt-12 flex flex-col gap-4">
            {engagements.map(e => (
              <div key={e.n} className="p-8 tablet:p-10 bg-white border border-ink-150 rounded-lg">
                <div className="grid grid-cols-1 tablet:grid-cols-[1.1fr_1.4fr] gap-8 tablet:gap-12">
                  <div>
                    <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-3">{e.n} / ENGAGEMENT</div>
                    <h3 className="h3 mb-2">{e.title}</h3>
                    <p className="text-accent text-[15px] font-medium mb-6">{e.tagline}</p>
                    <div className="eyebrow no-bar mb-2">BEST FOR</div>
                    <p className="text-ink-600 text-[15px] leading-[1.55] mb-5">{e.bestFor}</p>
                    <div className="eyebrow no-bar mb-2">OUTCOME</div>
                    <p className="text-ink-600 text-[15px] leading-[1.55]">{e.outcome}</p>
                    {e.overview && (
                      <>
                        <div className="eyebrow no-bar mt-5 mb-2">OVERVIEW</div>
                        <p className="text-ink-600 text-[15px] leading-[1.55]">{e.overview}</p>
                      </>
                    )}
                    {e.themes && (
                      <>
                        <div className="eyebrow no-bar mt-5 mb-3">TALK THEMES</div>
                        <ul className="space-y-[6px]">
                          {e.themes.map(t => (
                            <li key={t} className="text-ink-600 text-[14px] leading-[1.5] pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-ink-400">{t}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  <div>
                    <div className="eyebrow no-bar mb-3">{e.deliverablesLabel.toUpperCase()}</div>
                    <ul className="checklist mb-7">
                      {e.deliverables.map(d => (
                        <li key={d} className="!py-[10px] !text-[14.5px]"><span className="chk"></span><span>{d}</span></li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-ink-150">
                      <div>
                        <div className="eyebrow no-bar mb-1">STARTS AT</div>
                        <div className="font-display text-[18px] tracking-[-0.012em]">{e.price}</div>
                      </div>
                      <div>
                        <div className="eyebrow no-bar mb-1">TIMELINE</div>
                        <div className="text-ink-600 text-[14.5px]">{e.timeline}</div>
                      </div>
                    </div>
                    <Link className="btn btn-secondary btn-small mt-6" href="/contact">{e.cta} <span className="btn-arrow"></span></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Methodology */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow mb-5">METHODOLOGY</div>
              <h2 className="head-title">A practical path from cultural uncertainty to better decisions.</h2>
            </div>
            <p className="head-lede">Every Applied Cultural Intelligence engagement follows a structured process designed to turn cultural insight into action.</p>
          </div>
          <ol className="num-list mt-12">
            {methodologySteps.map(s => (
              <li key={s.title}>
                <div>
                  <h4>{s.title}</h4>
                  <div className="n-body">{s.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Deliverables */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow mb-5">THE DELIVERABLES</div>
              <h2 className="head-title">Cultural insight that your team can turn into better decisions.</h2>
            </div>
            <p className="head-lede">Applied Cultural Intelligence turns cultural complexity into clear findings, practical guidance, and business-ready recommendations.</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-4 gap-4 mt-12">
            {deliverableCards.map(c => (
              <div key={c.title} className="p-6 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[18px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[14px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Built For */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow mb-5">BUILT FOR</div>
              <h2 className="head-title">For teams making decisions across cultures.</h2>
            </div>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-4 gap-4 mt-12">
            {builtForCards.map(c => (
              <div key={c.title} className="p-6 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[18px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[14px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pricing */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow mb-5">STARTING POINTS</div>
              <h2 className="head-title">Start with the cultural insight your team needs now.</h2>
            </div>
            <p className="head-lede">Applied Cultural Intelligence engagements are scoped based on audience, market, team size, format, level of customization, cultural complexity, and business goal.</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {pricingCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md flex flex-col">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-1">{c.title}</div>
                <div className="font-mono text-[13px] text-primary tracking-[0.04em] mb-3">{c.price}</div>
                <div className="text-ink-600 text-[14.5px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-ink-500 text-[14px] max-w-[64ch] mt-8">
            Final pricing is confirmed after a short diagnostic call and scope review. Pricing depends on format, audience size, customization, business context, preparation, and deliverables.
          </p>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow mb-5">FAQ</div>
              <h2 className="head-title">Common questions about Applied Cultural Intelligence.</h2>
            </div>
          </div>
          <div className="mt-12 max-w-[860px]">
            {faqs.map(f => (
              <details key={f.q} className="border-b border-ink-150 py-5 group">
                <summary className="font-display text-[19px] tracking-[-0.012em] cursor-pointer list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-primary text-[20px] leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-ink-600 text-[16px] leading-[1.6] mt-3 max-w-[64ch]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">NEXT STEP</div>
          <h2 className="mt-5 text-[clamp(40px,5vw,72px)] leading-none">
            See the cultural signals your team may be missing.
          </h2>
          <p className="lede mt-7">
            Book a diagnostic call to discuss your audience, market, product, team context, and business goal. We&rsquo;ll recommend the right Applied Cultural Intelligence path: a CQ talk, executive briefing, ACI audit, culturalization review, workshop, or strategic advisory engagement.
          </p>
          <p className="font-mono text-[13px] text-primary tracking-[0.04em] mt-6">
            Applied Cultural Intelligence engagements start from $1,500.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Book a CQ talk</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
