import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Spanish Language Assurance for AI, Product & CX Teams | Xpandia',
  description:
    'Xpandia helps AI, SaaS, EdTech, Product, Localization, and CX teams validate Spanish quality across AI outputs, product flows, support content, and launch-ready experiences.',
}

const heroProofPoints = [
  { title: 'AI outputs', desc: 'Chatbots, copilots, tutors, agents, and support flows.' },
  { title: 'Product readiness', desc: 'UX copy, onboarding, forms, errors, and launch journeys.' },
  { title: 'Decision-ready evidence', desc: 'Scorecards, severity ratings, issue logs, and executive readouts.' },
]

const coverageCards = [
  {
    title: 'AI-generated outputs',
    desc: 'Chatbot responses, AI tutors, copilots, agents, support replies, generated explanations, summaries, recommendations, and other model outputs in Spanish.',
  },
  {
    title: 'Product experiences',
    desc: 'Onboarding flows, UI copy, forms, empty states, error messages, notifications, tooltips, checkout flows, and release-critical product surfaces.',
  },
  {
    title: 'Support and CX content',
    desc: 'Help center articles, support macros, chatbot flows, escalation language, knowledge base content, and customer-facing communication.',
  },
  {
    title: 'Marketing and conversion content',
    desc: 'Landing pages, campaign copy, email flows, pricing pages, value propositions, trust messaging, and Spanish conversion paths.',
  },
  {
    title: 'Localization quality',
    desc: 'Translated or localized experiences that need expert review, consistency checks, regional fit, terminology alignment, or final sign-off.',
  },
  {
    title: 'Launch readiness',
    desc: 'Spanish product surfaces, AI experiences, or customer journeys that need validation before launch, relaunch, deployment, or scale.',
  },
]

const whenToUse = [
  'Your AI generates Spanish outputs, but your team needs to know if users can trust them.',
  'Your product is translated or localized, but you are unsure if it feels natural, clear, and ready.',
  'Your team is preparing a Spanish launch, relaunch, release, or market expansion.',
  'Your support, help center, or chatbot experience in Spanish needs quality validation.',
  'Your team relies on vendors, reviewers, or internal speakers without a clear QA framework.',
  'Your Spanish content has inconsistencies in tone, terminology, clarity, or regional fit.',
  'Your leadership team needs evidence, not opinions, before deciding what to fix or ship.',
]

const criteriaCards = [
  { n: '01', title: 'Accuracy', desc: 'Does the Spanish preserve the intended meaning, facts, instructions, and product logic?' },
  { n: '02', title: 'Clarity', desc: 'Can users understand what to do, what is happening, and what the product is asking from them?' },
  { n: '03', title: 'Naturality', desc: 'Does the language sound fluent, native, and appropriate for real Spanish-speaking users?' },
  { n: '04', title: 'Tone and register', desc: 'Does the voice match your brand, audience, context, and level of formality?' },
  { n: '05', title: 'Terminology', desc: 'Are product terms, feature names, support language, and key concepts consistent and usable?' },
  { n: '06', title: 'Regional fit', desc: 'Does the Spanish align with the intended audience: LatAm, US Hispanic, Spain, or a specific regional variant?' },
  { n: '07', title: 'Cultural fit', desc: 'Does the experience respect cultural expectations, trust signals, context, and audience perception?' },
  { n: '08', title: 'Instruction-following', desc: 'Does the Spanish output follow the user request, product instructions (KB), task constraints, system guardrails, and expected response format?' },
  { n: '09', title: 'UX friction', desc: 'Does language create confusion, hesitation, errors, abandonment, or unnecessary cognitive load?' },
  { n: '10', title: 'AI behavior', desc: 'For AI outputs, does the system follow instructions, stay consistent, avoid risky language, and respond appropriately in Spanish?' },
  { n: '11', title: 'Readiness', desc: 'Is the experience ready to ship, needs targeted fixes, or requires deeper remediation before release?' },
]

const engagements = [
  {
    name: 'AI Spanish Quality Audit Sprint',
    tagline: null,
    bestFor:
      'Teams with AI outputs, chatbot responses, tutors, copilots, support agents, or generative AI experiences operating in Spanish.',
    outcome:
      'Understand quality risks, scoring, issue patterns, and readiness before users rely on the experience.',
    deliverablesLabel: 'Sprint deliverables',
    deliverables: [
      'Representative output review.',
      'QA rubric.',
      'Quality scorecard.',
      'Issue taxonomy.',
      'Severity ratings.',
      'Remediation guidance.',
      'Executive readout.',
    ],
    extras: [],
    price: 'From $4,500',
    timeline: '10 business days',
    cta: 'Request an AI QA Sprint',
  },
  {
    name: 'Spanish / LatAm Launch Readiness Audit',
    tagline: null,
    bestFor:
      'Teams launching or improving a Spanish website, app, onboarding flow, support journey, AI experience, or customer-facing product surface.',
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
    extras: [],
    price: 'From $3,500',
    timeline: '10–12 business days',
    cta: 'Request a Launch Readiness Audit',
  },
  {
    name: 'Chatbot & AI Output Audit',
    tagline: null,
    bestFor:
      'Teams using AI chatbots, customer support bots, tutors, copilots, assistants, or automated response systems in Spanish.',
    outcome:
      'Evaluate whether AI responses are accurate, natural, useful, consistent, culturally appropriate, and safe for real Spanish-speaking users.',
    deliverablesLabel: 'Audit deliverables',
    deliverables: [
      'Output sample review.',
      'Failure pattern analysis.',
      'Severity ratings.',
      'Prompt or response-level recommendations.',
      'Quality scorecard.',
      'Risk and readiness summary.',
      'Executive readout.',
    ],
    extras: [],
    price: 'From $4,500',
    timeline: '10–15 business days',
    cta: 'Request a Chatbot Audit',
  },
  {
    name: 'Language Sign-Off / LSO Review',
    tagline: null,
    bestFor:
      'Teams that need final expert review before publishing, launching, deploying, or approving a Spanish release.',
    outcome:
      'Receive a clear release recommendation based on Spanish quality, risk, and readiness.',
    deliverablesLabel: 'Review deliverables',
    deliverables: [
      'Final quality pass.',
      'Blocker and non-blocker issue list.',
      'Severity notes.',
      'Release recommendation.',
      'Sign-off memo.',
      'Quick remediation guidance where applicable.',
    ],
    extras: [],
    price: 'From $1,500',
    timeline: '3–5 business days',
    cta: 'Request LSO Review',
  },
  {
    name: 'Fractional Language Quality Lead',
    tagline: 'Senior Spanish quality leadership without a full-time hire.',
    bestFor:
      'Teams that need senior Spanish quality judgment, localization QA leadership, vendor oversight, review workflows, standards, or recurring governance across AI, product, localization, support, and content operations.',
    outcome:
      'Build a practical Spanish quality system your team can use to make better decisions, reduce review friction, align vendors and internal reviewers, and scale Spanish quality with confidence.',
    deliverablesLabel: 'Advisory deliverables',
    deliverables: [
      'Senior Spanish quality judgment for AI, product, localization, support, and content decisions.',
      '2–4 working sessions or reporting touchpoints per month, depending on scope.',
      'Monthly quality dashboard with risks, progress, blockers, and priorities.',
      'QA framework tailored to your product, audience, Spanish variant, and risk level.',
      'Governance charter defining ownership, review stages, escalation paths, and sign-off rules.',
      'Review workflow for internal teams, vendors, reviewers, or AI-generated content.',
      'Terminology and style recommendations to improve consistency across touchpoints.',
      'Vendor or reviewer scorecards to align expectations and improve quality accountability.',
      'Issue taxonomy and severity model for recurring Spanish quality decisions.',
      'Roadmap for continuous improvement across Spanish quality, localization, AI outputs, and product readiness.',
    ],
    extras: [
      {
        label: 'Overview',
        body: 'Xpandia gives your team access to senior language quality leadership on a fractional basis — so you can get expert judgment, standards, governance, and decision support without hiring a full-time language quality leader. This engagement is designed for teams that already have Spanish content, AI outputs, localization workflows, vendors, reviewers, or recurring releases, but need a clearer operating system for quality: what to review, who owns it, how to score it, when to escalate, and how to know if Spanish is ready to ship.',
      },
      {
        label: 'Advisory rhythm',
        items: [
          'Biweekly working sessions.',
          'Monthly executive readout.',
          'Async review and decision support.',
          'Quality dashboard updates.',
          'Vendor/reviewer alignment sessions.',
          'Quarterly roadmap review for ongoing engagements.',
        ],
      },
    ],
    price: 'From $3,000/month',
    timeline: 'Monthly engagement · Recommended minimum: 3 months',
    note: 'One month can be used for diagnosis, but three months allow us to demonstrate real value: framework, workflow, dashboard, vendor alignment and roadmap.',
    cta: 'Explore Fractional Advisory',
  },
]

const methodologySteps = [
  {
    title: 'Scope the surface',
    body: 'We define your audience, Spanish variant, product surface, AI use case, content type, business objective, risk level, and timeline.',
  },
  {
    title: 'Evaluate quality',
    body: 'We review the selected material using expert Spanish judgment and structured criteria: accuracy, clarity, naturalness, tone, terminology, regional fit, cultural fit, UX friction, and readiness.',
  },
  {
    title: 'Score and classify',
    body: 'We organize findings by severity, impact, pattern, and implementation effort so your team can understand what matters most.',
  },
  {
    title: 'Deliver the evidence',
    body: 'You receive decision-ready findings your team can use immediately: scorecards, annotated examples, issue logs, severity ratings, prioritized recommendations, rewrites, standards, and executive readouts. Each deliverable connects expert judgment to action: what is working, what needs attention, why it matters, and what your team should do next.',
  },
  {
    title: 'Decide the next move',
    body: 'We recommend the right path forward: ship, fix, retest, localize, adapt, train, govern, or scale.',
  },
]

const deliverableCards = [
  { title: 'Quality Scorecard', desc: 'A measurable view of Spanish quality across the criteria that matter for your use case.' },
  { title: 'Issue Taxonomy', desc: 'A structured map of issue types, patterns, and recurring quality risks.' },
  {
    title: 'Severity Ratings',
    desc: 'Clear prioritization so your team knows what blocks launch, what should be fixed soon, and what can be improved over time.',
  },
  { title: 'Annotated Examples', desc: 'Specific examples that show where quality breaks down and how it affects the user experience.' },
  {
    title: 'Remediation Guidance',
    desc: 'Practical recommendations, rewrites, terminology notes, and next steps to help your team improve quickly.',
  },
  { title: 'Executive Readout', desc: 'A concise summary for Product, AI, Localization, CX, Support, Marketing, or leadership teams.' },
  {
    title: 'Readiness Recommendation',
    desc: 'A clear assessment of whether the Spanish experience is ready to ship, needs targeted fixes, or requires deeper remediation.',
  },
]

const audienceCards = [
  { title: 'AI & ML Product Teams', desc: 'Validate Spanish outputs from chatbots, copilots, tutors, agents, and generative AI experiences.' },
  { title: 'Product Teams', desc: 'Evaluate onboarding, UI copy, forms, errors, and Spanish product flows before launch or relaunch.' },
  { title: 'Localization Teams', desc: 'Strengthen QA standards, reviewer alignment, vendor oversight, terminology, and sign-off processes.' },
  { title: 'CX & Support Teams', desc: 'Improve Spanish support responses, help content, support macros, chatbot flows, and customer communication.' },
  { title: 'EdTech Teams', desc: 'Validate Spanish learning experiences, explanations, quizzes, tutor responses, and pedagogical clarity.' },
  {
    title: 'Trust & Safety Teams',
    desc: 'Assess Spanish responses, user-facing content, or AI outputs that may carry reputational, safety, or user trust risks.',
  },
]

const pricingCards = [
  {
    title: 'Diagnostic',
    price: 'From $500',
    desc: 'Get a fast expert read on your Spanish surface before choosing the right audit, sprint, or quality roadmap.',
  },
  {
    title: 'Launch Readiness Audit',
    price: 'From $3,500',
    desc: 'Evaluate a Spanish product, website, onboarding flow, support journey, or customer-facing experience before launch or relaunch.',
  },
  {
    title: 'AI QA Sprint',
    price: 'From $4,500',
    desc: 'Validate AI-generated Spanish outputs before users rely on them.',
  },
  {
    title: 'Language Sign-Off / LSO',
    price: 'From $1,500',
    desc: 'Get a final expert review and release recommendation before publishing or deploying a Spanish experience.',
  },
  {
    title: 'Fractional Advisory',
    price: 'From $3,000/month',
    desc: 'Bring senior Spanish quality leadership into your team without a full-time hire.',
  },
]

const faqs = [
  {
    q: 'Is Language Assurance the same as translation?',
    a: 'No. Language Assurance evaluates whether existing Spanish outputs, content, product flows, or localized experiences are accurate, natural, consistent, culturally appropriate, and ready for users.',
  },
  {
    q: 'Can Xpandia review AI-generated Spanish?',
    a: 'Yes. We evaluate AI-generated Spanish from chatbots, copilots, tutors, support agents, assistants, and other generative AI experiences.',
  },
  {
    q: 'Do you only review LatAm Spanish?',
    a: 'No. We can scope the engagement around the Spanish variant your product needs: LatAm, US Hispanic, Spain, neutral Spanish, or a specific regional market.',
  },
  {
    q: 'What do we need to provide?',
    a: 'Usually a representative sample of outputs, product screens, flows, content, prompts, support responses, or localized assets, plus context about audience, product goals, and launch timeline.',
  },
  {
    q: 'Can you help us fix the issues too?',
    a: 'Yes. Depending on scope, we can provide rewrites, remediation guidance, terminology notes, reviewer guidance, or a follow-up localization/adaptation engagement.',
  },
  {
    q: 'Can this become ongoing support?',
    a: 'Yes. Teams can start with an audit or sprint and move into fractional advisory, governance, recurring QA, vendor oversight, or quality roadmap support.',
  },
]

export default function LanguageAssurancePage() {
  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="flex gap-3 mb-7">
            <Link href="/services" className="font-mono text-[11px] tracking-[0.1em] text-ink-500">← ALL SERVICES</Link>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-500">· LANGUAGE ASSURANCE</span>
          </div>
          <div className="eyebrow mb-8">LANGUAGE ASSURANCE</div>
          <h1 className="hero-display text-[clamp(48px,6vw,92px)] max-w-[16ch]">
            Validate Spanish before your <span className="accent-underline">users</span> do.
          </h1>
          <p className="hero-sub mt-8">
            Xpandia helps AI, SaaS, EdTech, Product, Localization, and CX teams evaluate Spanish quality across AI outputs, product experiences, support content, and launch-ready journeys.
          </p>
          <p className="text-ink-600 text-[17px] max-w-[62ch] mt-5">
            We turn expert Spanish judgment into measurable findings your team can act on: scorecards, issue taxonomies, severity ratings, readiness recommendations, and remediation guidance.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">Request a Language Assurance audit <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Book a diagnostic call</Link>
          </div>

          <div data-stagger className="mt-20 pt-6 border-t border-ink-150 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {heroProofPoints.map(p => (
              <div key={p.title}>
                <div className="font-display text-[20px] font-medium tracking-[-0.012em]">{p.title}</div>
                <div className="text-ink-600 text-[14px] leading-[1.5] mt-2">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual band */}
      <section className="tight pt-0 pb-0">
        <div className="container">
          <div className="relative aspect-[16/9] tablet:aspect-[24/7] rounded-lg overflow-hidden bg-ink-900">
            <Image src="/assets/photo-qa.jpg" alt="" fill loading="lazy" className="object-cover grayscale contrast-[1.05]" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,20,25,0.3) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.85) 100%)' }}></div>
            <div className="absolute bottom-8 right-8 font-mono text-[11px] tracking-[0.14em] text-white/85 text-right">
              <div className="mb-[6px]">LANGUAGE ASSURANCE</div>
              <div className="text-accent text-[14px] tracking-[0.08em]">EVIDENCE — READINESS — GOVERNANCE</div>
            </div>
            <div className="absolute bottom-0 left-0 w-[34%] h-[3px] bg-accent"></div>
          </div>
        </div>
      </section>

      {/* 2. Problem / Positioning */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">WHY LANGUAGE ASSURANCE</div>
            <div>
              <p className="display text-[clamp(26px,2.8vw,40px)] leading-[1.08] tracking-[-0.02em] max-w-[28ch] mb-6">
                Spanish quality is too important to leave unmeasured.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-5">
                Spanish-speaking users experience your product through language: the answers your AI gives, the instructions your product provides, the support content they trust, and the messages that guide their decisions.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-5">
                When Spanish quality is inconsistent, unnatural, culturally misaligned, or hard to understand, teams lose clarity, trust, adoption, and confidence before they even know where the issue started.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-7">
                Language Assurance gives your team a structured way to evaluate what is working, what needs attention, how severe each issue is, and whether the experience is ready for real users.
              </p>
              <div className="p-7 bg-ink-50 border-l-2 border-primary rounded-r-md">
                <p className="text-ink-700 text-[17px] leading-[1.5]">
                  The goal is simple: help your team know whether your Spanish is accurate, natural, trustworthy, culturally appropriate, and ready to ship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What it covers */}
      <section className="tight">
        <div className="container">
          <div className="eyebrow mb-3">WHAT WE EVALUATE</div>
          <div className="section-head">
            <h2 className="head-title">Spanish quality across every user-facing surface.</h2>
            <p className="head-lede">Language Assurance can be applied to any Spanish experience your users see, read, hear, follow, or rely on.</p>
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

      {/* 4. When to use */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-12 items-start">
            <div>
              <div className="eyebrow mb-3">WHEN TO USE IT</div>
              <h2 className="head-title">Use Language Assurance when Spanish quality needs a decision.</h2>
            </div>
            <ul className="checklist">
              {whenToUse.map(item => (
                <li key={item}><span className="chk"></span><span className="text-ink-700">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Core evaluation criteria — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="eyebrow no-bar !text-ink-400 mb-3">QUALITY CRITERIA</div>
          <div className="section-head" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="head-title text-paper">The signals behind Spanish your team can trust.</h2>
            <p className="head-lede text-ink-300">Each engagement is scoped around your product, audience, use case, and risk level. Depending on the project, we evaluate the criteria that matter most for your Spanish experience.</p>
          </div>
          <div data-stagger className="grid grid-cols-2 tablet:grid-cols-4 gap-px mt-12 bg-white/[0.08]">
            {criteriaCards.map(c => (
              <div key={c.n} className="bg-ink-900 px-6 py-8">
                <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-3">{c.n}</div>
                <div className="font-display text-[22px] tracking-[-0.012em] mb-2">{c.title}</div>
                <div className="text-[13.5px] text-ink-300 leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Core engagements */}
      <section>
        <div className="container">
          <div className="eyebrow mb-3">CORE ENGAGEMENTS</div>
          <div className="section-head">
            <h2 className="head-title">Focused audits, QA sprints, and quality leadership.</h2>
            <p className="head-lede">Start with a focused engagement, then scale into deeper QA, remediation, governance, or ongoing advisory when needed.</p>
          </div>
          <div className="flex flex-col gap-5 mt-12">
            {engagements.map((e, i) => (
              <div key={e.name} className="p-8 tablet:p-10 bg-white border border-ink-150 rounded-lg">
                <div className="grid grid-cols-1 tablet:grid-cols-[1.4fr_2fr] gap-8 tablet:gap-12">
                  <div>
                    <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-3">{`0${i + 1}`} / ENGAGEMENT</div>
                    <h3 className="font-display text-[clamp(24px,2.4vw,32px)] font-medium tracking-[-0.02em] leading-[1.1] mb-2">{e.name}</h3>
                    {e.tagline && <p className="text-ink-600 text-[16px] italic mb-4">{e.tagline}</p>}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="tag accent">{e.price}</span>
                      <span className="tag">{e.timeline}</span>
                    </div>
                    <div className="mt-6">
                      <Link className="btn btn-secondary btn-small" href="/contact">{e.cta}</Link>
                    </div>
                  </div>
                  <div>
                    <div className="mb-5">
                      <div className="eyebrow no-bar text-[10px] mb-2">BEST FOR</div>
                      <p className="text-ink-600 text-[15px] leading-[1.5]">{e.bestFor}</p>
                    </div>
                    <div className="mb-5">
                      <div className="eyebrow no-bar text-[10px] mb-2">OUTCOME</div>
                      <p className="text-ink-600 text-[15px] leading-[1.5]">{e.outcome}</p>
                    </div>
                    {e.extras.map(ex => (
                      <div key={ex.label} className="mb-5">
                        <div className="eyebrow no-bar text-[10px] mb-2">{ex.label.toUpperCase()}</div>
                        {'body' in ex && ex.body && <p className="text-ink-600 text-[15px] leading-[1.5]">{ex.body}</p>}
                        {'items' in ex && ex.items && (
                          <ul className="mt-1 space-y-1.5">
                            {ex.items.map(it => (
                              <li key={it} className="text-ink-600 text-[15px] leading-[1.5] flex gap-2">
                                <span className="text-primary mt-[2px]">•</span><span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                    <div>
                      <div className="eyebrow no-bar text-[10px] mb-3">{e.deliverablesLabel.toUpperCase()}</div>
                      <ul className="checklist">
                        {e.deliverables.map(d => (
                          <li key={d} className="!py-[10px] !text-[15px]"><span className="chk"></span><span className="text-ink-700">{d}</span></li>
                        ))}
                      </ul>
                    </div>
                    {e.note && (
                      <p className="text-ink-500 text-[13px] leading-[1.5] mt-5">{e.note}</p>
                    )}
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
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow mb-3">METHODOLOGY</div>
              <h2 className="head-title">A structured path from Spanish review to release confidence.</h2>
              <p className="text-ink-600 max-w-[38ch] mt-6">Every Language Assurance engagement follows a clear process designed to move your team from uncertainty to evidence.</p>
            </div>
            <ol className="num-list">
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
        </div>
      </section>

      {/* 8. Deliverables */}
      <section>
        <div className="container">
          <div className="eyebrow mb-3">THE DELIVERABLES</div>
          <div className="section-head">
            <h2 className="head-title">Evidence your team can use across product, AI, localization, and CX.</h2>
            <p className="head-lede">Language Assurance turns subjective feedback into structured findings your team can prioritize, share, and execute.</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {deliverableCards.map(d => (
              <div key={d.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{d.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scorecard preview */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div>
              <div className="eyebrow">A LANGUAGE ASSURANCE DELIVERABLE</div>
              <h2 style={{ marginTop: 24 }}>Evidence, not opinions.</h2>
              <p className="lede" style={{ marginTop: 24 }}>Every engagement ends with a quality scorecard your Product, AI, Localization and CX leaders can read in minutes and act on this quarter.</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Accuracy', 'Clarity', 'Naturality', 'Tone & register', 'Terminology', 'Regional fit', 'Cultural fit', 'Readiness'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="scorecard" aria-hidden="true">
              <div className="scorecard-head">
                <div className="scorecard-title">Quality Scorecard</div>
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.06em]">SAMPLE · N=240 OUTPUTS</div>
              </div>
              {[
                { label: 'Pass rate', width: '78%', val: '78%', accent: true },
                { label: 'Accuracy', width: '86%', val: '4.3 / 5' },
                { label: 'Clarity', width: '72%', val: '3.6 / 5' },
                { label: 'Naturality', width: '64%', val: '3.2 / 5' },
                { label: 'Terminology', width: '58%', val: '2.9 / 5' },
                { label: 'Regional fit', width: '81%', val: '4.1 / 5' },
                { label: 'Critical error rate', width: '12%', val: '3.1%', dim: true },
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
                READINESS: NEEDS TARGETED FIXES · USE CASE: SUPPORT COPILOT · VARIANT: es-MX · REVIEWER: XPANDIA SENIOR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Built for */}
      <section className="tight">
        <div className="container">
          <div className="eyebrow mb-3">BUILT FOR</div>
          <div className="section-head">
            <h2 className="head-title">For teams responsible for Spanish quality.</h2>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {audienceCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pricing */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="eyebrow mb-3">STARTING POINTS</div>
          <div className="section-head">
            <h2 className="head-title">Start with the level of assurance your team needs now.</h2>
            <p className="head-lede">Language Assurance engagements are scoped based on your product surface, audience, Spanish variant, sample size, complexity, risk level, and timeline.</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {pricingCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md flex flex-col">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-1">{c.title}</div>
                <div className="font-mono text-[13px] text-accent tracking-[0.04em] mb-3">{c.price}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-ink-500 tracking-[0.06em] mt-6">
            Final pricing is confirmed after a short diagnostic call and scope review.
          </p>
        </div>
      </section>

      {/* 11. FAQ */}
      <section>
        <div className="container">
          <div className="eyebrow mb-3">FAQ</div>
          <div className="section-head">
            <h2 className="head-title">Common questions about Language Assurance.</h2>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-12 gap-y-0 mt-12">
            {faqs.map(f => (
              <div key={f.q} className="py-7 border-t border-ink-150">
                <h3 className="font-display text-[20px] font-medium tracking-[-0.012em] mb-3">{f.q}</h3>
                <p className="text-ink-600 text-[16px] leading-[1.55]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">NEXT STEP</div>
          <h2 className="mt-5 text-[clamp(36px,4.5vw,64px)] leading-[1.02]">
            Know if your Spanish is ready before users decide for you.
          </h2>
          <p className="lede mt-7">
            Book a diagnostic call to review your Spanish surface, audience, use case, timeline, and business goal. We&apos;ll recommend the right Language Assurance path: diagnostic, audit, AI QA sprint, LSO review, or fractional quality leadership.
          </p>
          <p className="font-mono text-[12px] text-ink-500 tracking-[0.06em] mt-6">
            Language Assurance engagements start from $500.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Request a Language Assurance audit</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
