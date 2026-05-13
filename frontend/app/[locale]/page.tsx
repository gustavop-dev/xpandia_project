import Link from 'next/link'

const services = [
  {
    href: '/services/language-assurance',
    num: '01 / ASSURANCE',
    title: 'Language Assurance',
    tagline: 'Validate Spanish before your users do.',
    desc: 'Structured audits and QA sprints for AI outputs, product flows, support content, launch readiness, and ongoing language quality governance.',
    bestFor: 'AI products, chatbots, copilots, SaaS platforms, EdTech products, and support experiences already operating in Spanish or preparing to launch.',
    youGet: 'Quality scorecards, issue taxonomy, severity ratings, readiness recommendations, prioritized fixes, and executive-ready findings.',
    cta: 'Explore Language Assurance',
  },
  {
    href: '/services/localization-adaptation',
    num: '02 / LOCALIZATION',
    title: 'Localization & Adaptation',
    tagline: 'More than translated. Spanish that feels native, clear and trusted.',
    desc: 'Customized Spanish localization, transcreation, UX copy, documentation, and regional adaptation for digital products and content.',
    bestFor: 'Teams launching websites, product interfaces, help centers, marketing campaigns, learning content, or customer communications in Spanish.',
    youGet: 'Localized copy, adapted messaging, terminology guidance, regional fit recommendations, QA-ready content, and publication-ready Spanish assets.',
    cta: 'Explore Localization & Adaptation',
  },
  {
    href: '/services/applied-cultural-intelligence',
    num: '03 / CULTURE',
    title: 'Applied Cultural Intelligence',
    tagline: 'Make Spanish resonate.',
    desc: 'Advisory, workshops, audits, and training that help teams understand Hispanic and Spanish-speaking audiences, cultural expectations, trust signals, tone, and market fit.',
    bestFor: 'Product, marketing, CX, localization, and leadership teams that need to connect with Spanish-speaking users across the US, Canada, Europe, and LatAm.',
    youGet: 'Cultural insight, audience-specific recommendations, messaging guidance, training sessions, market fit findings, and actionable strategy.',
    cta: 'Explore Applied Cultural Intelligence',
  },
]

const methodology = [
  { title: 'Define', body: 'We clarify your use case, audience, Spanish variant, product surface, business goal, and what "good" needs to mean for your team.' },
  { title: 'Evaluate', body: 'We review language, meaning, tone, terminology, clarity, cultural fit, UX friction, and quality risks using structured criteria.' },
  { title: 'Prioritize', body: 'We separate critical issues from quick wins and organize findings by severity, business impact, and implementation effort.' },
  { title: 'Improve', body: 'We deliver recommendations, rewrites, standards, scorecards, and next steps your product, localization, AI, or CX team can execute.' },
]

const deliverables = [
  { title: 'Quality Scorecard', body: 'Measurable scoring across the criteria that matter for your use case: accuracy, clarity, naturalness, tone, terminology, regional fit, cultural fit, UX friction, and risk.' },
  { title: 'Issue Taxonomy', body: 'A structured list of what is breaking quality, where it happens, how severe it is, and what your team should fix first.' },
  { title: 'Executive Readout', body: 'A concise summary for product, AI, localization, CX, or leadership teams with risks, opportunities, and recommended next steps.' },
  { title: 'Remediation Guidance', body: 'Practical recommendations, rewrites, examples, and standards to help your team improve Spanish quality without slowing down delivery.' },
]

const scorecardCriteria = [
  'Accuracy', 'Clarity', 'Naturalness', 'Tone & register', 'Terminology',
  'Regional fit', 'Cultural fit', 'UX friction', 'Instruction-following', 'Risk severity',
]

const audiences = [
  { title: 'AI & ML Product Teams', body: 'Validate Spanish outputs from chatbots, tutors, copilots, agents, and generative AI experiences before users rely on them.' },
  { title: 'SaaS & Product Teams', body: 'Improve Spanish product flows, onboarding, UI copy, forms, errors, and launch readiness.' },
  { title: 'EdTech Teams', body: 'Make Spanish learning experiences clear, natural, culturally relevant, and pedagogically effective.' },
  { title: 'Localization Teams', body: 'Strengthen Spanish quality, vendor oversight, review workflows, terminology, and sign-off processes.' },
  { title: 'CX & Support Teams', body: 'Improve Spanish help content, support macros, chatbot responses, and customer-facing communication.' },
  { title: 'Marketing & Growth Teams', body: 'Adapt Spanish messaging, landing pages, campaigns, and conversion copy for real Hispanic and Spanish-speaking audiences.' },
]

const buyers = [
  'Head of Product',
  'VP Product',
  'AI / ML Product Lead',
  'Director of Localization',
  'Head of Globalization',
  'VP Customer Experience',
  'Customer Support Leader',
  'EdTech Content Leader',
  'Marketing / Growth Lead',
  'Trust & Safety Lead',
]

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-9">SPANISH EXPERTISE · AI · SAAS · EDTECH · DIGITAL PRODUCTS</div>
          <h1 className="hero-display">
            Spanish that works for{' '}
            <span className="whitespace-nowrap"><span className="accent-underline">real users</span>.</span>
          </h1>
          <p className="hero-sub">
            Xpandia helps AI, SaaS, EdTech, and digital product teams validate, localize, and culturally adapt Spanish experiences for Hispanic and Spanish-speaking audiences.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Request an audit</Link>
          </div>
          <div className="mt-24 pt-7 border-t border-ink-150 grid grid-cols-2 tablet:grid-cols-4 gap-8">
            {[
              { label: '20+ YEARS', text: 'Global localization and language quality experience' },
              { label: 'SPANISH FOCUS', text: 'LatAm, US Hispanic, and regional variants' },
              { label: 'BUILT FOR', text: 'AI, Product, Localization, CX, and EdTech teams' },
              { label: 'MARKETS', text: 'US · Canada · Europe' },
            ].map(({ label, text }) => (
              <div key={label}>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-[10px]">{label}</div>
                <div className="text-[14px] leading-[1.45] text-ink-700">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning — Why Xpandia */}
      <section className="tight pt-10">
        <div className="container">
          <div data-reveal className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">WHY XPANDIA</div>
            <div>
              <p className="display max-w-[24ch]" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 28 }}>
                Spanish quality is product quality.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[56ch] mb-6">
                Your users experience your product through language: the answers your AI gives, the onboarding copy they follow, the support content they trust, and the messages that help them decide.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[56ch] mb-6">
                Xpandia gives teams the expert Spanish judgment, structured review, cultural insight, and measurable quality signals they need to launch, improve, and scale with confidence.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[56ch]">
                We combine senior linguistic expertise, applied cultural intelligence, and practical product judgment to help Spanish experiences perform in the real world.
              </p>
              <div className="mt-10 p-7 bg-ink-50 border border-ink-150 rounded-lg">
                <div className="font-display text-[22px] font-medium text-ink-900 tracking-[-0.01em] leading-[1.2]">Language. Culture. Product judgment.</div>
                <div className="text-ink-600 text-[15px] mt-2">The three layers behind Spanish that works.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">SERVICES</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>The Spanish expertise your product needs.</h2>
            </div>
            <p className="head-lede">Choose the right path based on what your team needs: validate what exists, create or improve Spanish content, or understand the audience behind the language.</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-5 mt-12">
            {services.map(s => (
              <div key={s.href} className="service-card">
                <div className="xbar"></div>
                <div className="service-num">{s.num}</div>
                <div className="service-title">{s.title}</div>
                <div className="text-ink-900 font-medium text-[15px] mb-3">{s.tagline}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="text-[13px] leading-[1.5] text-ink-600 mb-4">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-ink-500 block mb-1">BEST FOR</span>
                  {s.bestFor}
                </div>
                <div className="text-[13px] leading-[1.5] text-ink-600 mb-6">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-ink-500 block mb-1">WHAT YOU GET</span>
                  {s.youGet}
                </div>
                <div className="service-meta">
                  <Link href={s.href} className="text-primary font-medium font-sans normal-case tracking-normal text-[13.5px] hover:underline">{s.cta} →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow !text-ink-400">METHODOLOGY</div>
              <h2 style={{ marginTop: 24 }}>The method behind Spanish that works.</h2>
              <p className="text-ink-300 max-w-[40ch]" style={{ marginTop: 24 }}>Every engagement follows a clear process: define the audience, evaluate the experience, identify risks, and deliver recommendations your team can act on.</p>
            </div>
            <ol className="num-list">
              {methodology.map(s => (
                <li key={s.title} style={{ borderTopColor: 'rgba(255,255,255,0.1)' }}>
                  <div>
                    <h4>{s.title}</h4>
                    <div className="n-body !text-ink-300">{s.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">THE DELIVERABLES</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>Evidence your team can act on.</h2>
            </div>
            <p className="head-lede">Every Xpandia engagement turns expert judgment into practical evidence: scorecards, findings, examples, recommendations, and decision-ready guidance.</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-[1.1fr_1fr] gap-16 items-start mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {deliverables.map(d => (
                <div key={d.title} className="p-6 bg-white border border-ink-150 rounded-lg">
                  <h3 className="text-[19px] font-display font-medium text-ink-900 tracking-[-0.01em] mb-3">{d.title}</h3>
                  <p className="text-ink-600 text-[14.5px] leading-[1.55]">{d.body}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="scorecard" aria-hidden="true">
                <div className="scorecard-head">
                  <div className="scorecard-title">Quality Scorecard</div>
                  <div className="font-mono text-[11px] text-ink-500 tracking-[0.06em]">SAMPLE · N=240 OUTPUTS</div>
                </div>
                {[
                  { label: 'Pass rate', width: '78%', val: '78%', accent: true },
                  { label: 'Accuracy', width: '86%', val: '4.3 / 5' },
                  { label: 'Clarity', width: '72%', val: '3.6 / 5' },
                  { label: 'Naturalness', width: '64%', val: '3.2 / 5' },
                  { label: 'Tone & register', width: '70%', val: '3.5 / 5' },
                  { label: 'Terminology', width: '58%', val: '2.9 / 5' },
                  { label: 'Regional fit', width: '81%', val: '4.1 / 5' },
                  { label: 'Cultural fit', width: '76%', val: '3.8 / 5' },
                  { label: 'UX friction', width: '67%', val: '3.3 / 5' },
                  { label: 'Risk severity', width: '12%', val: '3.1%', dim: true },
                ].map(r => (
                  <div key={r.label} className="scorecard-row">
                    <div className="scorecard-label">{r.label}</div>
                    <div className={`scorecard-bar${r.accent ? ' accent' : ''}`}>
                      <span style={{ width: r.width, ...(r.dim ? { background: '#4A5259' } : {}) }}></span>
                    </div>
                    <div className="scorecard-value">{r.val}</div>
                  </div>
                ))}
                <div className="mt-[18px] pt-4 border-t border-ink-150 text-[11px] text-ink-500 leading-[1.5]">
                  OUTPUT SAMPLE · USE CASE: SUPPORT COPILOT · VARIANT: es-MX · REVIEWER: XPANDIA SENIOR
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {scorecardCriteria.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built For */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head" style={{ gridTemplateColumns: '1fr' }}>
            <div>
              <div className="eyebrow">BUILT FOR</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>For teams building products and experiences in Spanish.</h2>
            </div>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-5 mt-12">
            {audiences.map(a => (
              <div key={a.title} className="p-7 bg-white border border-ink-150 rounded-lg">
                <h3 className="text-[18px] font-display font-medium text-ink-900 tracking-[-0.01em] mb-3">{a.title}</h3>
                <p className="text-ink-600 text-[14.5px] leading-[1.55]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer — Who we help */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div>
              <div className="eyebrow">WHO WE HELP</div>
              <h2 style={{ marginTop: 24, fontSize: 'clamp(26px,2.6vw,40px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Built for the leaders responsible for Spanish quality.</h2>
            </div>
            <ul className="checklist">
              {buyers.map(b => (
                <li key={b}><span className="chk"></span><span>{b}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow">NEXT STEP</div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05 }}>
            Know where your Spanish stands — and what to do{' '}
            <span className="relative inline-block">
              next<span className="absolute left-0 right-0 bottom-[0.08em] h-[2px] bg-accent"></span>
            </span>
            .
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            In a focused diagnostic call, we review your Spanish surface, understand your audience, product context, timeline, and business goal, and recommend the right path forward: an audit, an AI QA sprint, a localization engagement, a CQ talk, or a quality roadmap.
          </p>
          <p className="text-ink-900 font-medium text-[17px]" style={{ marginTop: 20 }}>Engagements start from $500.</p>
          <p className="text-ink-600 text-[15px] max-w-[60ch]" style={{ marginTop: 8 }}>
            Diagnostics, audits, AI QA sprints, localization engagements, CQ talks, and fractional advisory are scoped based on your product, audience, complexity, timeline and business priority.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Request an audit</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
