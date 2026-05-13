import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Xpandia | Spanish Expertise, Localization & Applied Cultural Intelligence',
  description:
    'Meet Xpandia, a boutique Spanish expertise firm helping AI, SaaS, EdTech, Product, Localization, CX, and Marketing teams validate, localize, and culturally adapt Spanish experiences for real users.',
}

const differentiators = [
  {
    title: 'Senior Spanish judgment',
    body: 'Expert review grounded in language quality, meaning, clarity, tone, terminology, naturalness, and audience fit.',
  },
  {
    title: 'Localization and product context',
    body: 'Spanish evaluated or adapted inside real product, UX, content, support, marketing, and learning environments.',
  },
  {
    title: 'Applied Cultural Intelligence',
    body: 'Cultural insight that helps teams understand trust signals, audience expectations, communication style, and market fit.',
  },
  {
    title: 'AI and output evaluation',
    body: 'Structured review of AI-generated Spanish outputs, chatbot responses, tutors, copilots, agents, and support flows.',
  },
  {
    title: 'Decision-ready evidence',
    body: 'Scorecards, issue taxonomies, severity ratings, annotated examples, recommendations, and executive readouts.',
  },
  {
    title: 'Practical business focus',
    body: 'Recommendations designed for Product, AI, Localization, CX, Support, Marketing, EdTech, and leadership teams.',
  },
]

const howWeWork = [
  {
    title: 'Understand the context',
    body: 'We clarify your product, audience, Spanish variant, business goal, timeline, content type, and current challenge.',
  },
  {
    title: 'Evaluate or adapt',
    body: 'We apply the right mix of Spanish expertise, localization judgment, cultural intelligence, QA criteria, and product awareness.',
  },
  {
    title: 'Deliver clear evidence',
    body: 'You receive findings, recommendations, adapted assets, scorecards, issue logs, frameworks, or training materials your team can act on.',
  },
  {
    title: 'Recommend the next move',
    body: 'We help your team decide whether to ship, fix, localize, adapt, train, govern, or scale.',
  },
]

const startingPoints = [
  {
    title: 'Diagnostics',
    price: 'From $500',
    body: 'For teams that need a fast expert read before choosing the right engagement.',
  },
  {
    title: 'Language Assurance Audits',
    price: 'From $3,500',
    body: 'For teams that need structured findings, severity ratings, and readiness recommendations.',
  },
  {
    title: 'AI QA Sprints',
    price: 'From $4,500',
    body: 'For teams validating AI-generated Spanish outputs before users rely on them.',
  },
  {
    title: 'Localization & Adaptation',
    price: 'From $2,500',
    body: 'For websites, product copy, help content, campaigns, learning materials, and Spanish content repair.',
  },
  {
    title: 'Cultural Intelligence Talks',
    price: 'From $1,500',
    body: 'For global teams that need practical Cultural Intelligence, cross-cultural communication, and audience-readiness guidance.',
  },
  {
    title: 'Fractional Advisory',
    price: 'From $3,000/month',
    body: 'For teams that need ongoing senior Spanish quality leadership without a full-time hire.',
  },
]

const proofSignals = [
  {
    label: '20+ YEARS',
    text: 'Global localization and language quality experience.',
  },
  {
    label: 'SPANISH FOCUS',
    text: 'LatAm, US Hispanic, Spain, and regional variants.',
  },
  {
    label: 'BUILT FOR',
    text: 'AI, Product, Localization, CX, Marketing, and EdTech teams.',
  },
  {
    label: 'EXPERTISE',
    text: 'Across language, localization, QA, cultural intelligence, and business communication.',
  },
]

export default function AboutPage() {
  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">ABOUT XPANDIA</div>
          <h1 className="hero-display text-[clamp(40px,5.4vw,82px)] max-w-[22ch]">
            Spanish expertise for companies building across languages, cultures, and markets.
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            Xpandia helps AI, SaaS, EdTech, Product, Localization, CX, and Marketing teams validate, localize, and culturally adapt Spanish experiences for Hispanic and Spanish-speaking audiences.
          </p>
          <p className="text-ink-600 text-[17px] leading-[1.6] mt-5 max-w-[64ch]">
            We combine senior Spanish language expertise, localization judgment, applied cultural intelligence, and product-aware QA to help teams build Spanish experiences users can understand, trust, and act on.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Contact Xpandia</Link>
          </div>
        </div>
      </section>

      {/* 2. Company Positioning */}
      <section className="tight pt-10">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">WHO WE ARE</div>
            <div>
              <p className="display max-w-[24ch]" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 28 }}>
                A boutique firm for Spanish quality, localization, and cultural intelligence.
              </p>
              <p className="text-ink-600 text-[19px] leading-[1.55] max-w-[56ch] mb-6">
                Xpandia was created for companies that need more than translation. We support teams building products, content, AI experiences, support journeys, campaigns, and market strategies for Spanish-speaking users.
              </p>
              <p className="text-ink-600 text-[19px] leading-[1.55] max-w-[56ch] mb-6">
                Our work sits at the intersection of language, culture, product, and business judgment. We help teams understand what works in Spanish, what creates friction, what needs adaptation, and what is ready for real users.
              </p>
              <div className="mt-4 p-7 bg-ink-50 border border-ink-150 rounded-lg">
                <div className="font-display text-[20px] font-medium text-ink-900 tracking-[-0.01em] leading-[1.3]">
                  Xpandia gives teams the expert judgment and structured guidance they need to move from assumptions to confident decisions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What Makes Xpandia Different */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">WHY XPANDIA</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>Spanish quality needs more than a fluent speaker.</h2>
            </div>
            <p className="head-lede">
              Companies often rely on bilingual employees, vendors, internal reviewers, or automated outputs to judge Spanish quality. Those inputs can help, but they do not always provide the structured evaluation, cultural judgment, product context, or executive-ready evidence teams need. Xpandia brings together the capabilities required to evaluate and improve Spanish experiences across real business contexts.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-5 mt-12">
            {differentiators.map(d => (
              <div key={d.title} className="p-7 bg-white border border-ink-150 rounded-lg">
                <h3 className="text-[19px] font-display font-medium text-ink-900 tracking-[-0.01em] mb-3">{d.title}</h3>
                <p className="text-ink-600 text-[14.5px] leading-[1.55]">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Founder / Leadership */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-16 items-start">
            <div>
              <div className="aspect-[4/5] rounded-lg relative overflow-hidden bg-ink-900">
                <Image src="/assets/founder.jpg" alt="Nestor Solano portrait" fill loading="lazy" className="object-cover" sizes="(max-width: 900px) 100vw, 35vw" />
                <div className="absolute bottom-0 right-0 w-[40%] h-[3px] bg-accent"></div>
              </div>
              <div className="mt-5">
                <div className="font-display text-[22px] font-medium text-ink-900 tracking-[-0.01em]">Nestor Solano</div>
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.08em] mt-1">FOUNDER, XPANDIA APPLIED CULTURAL INTELLIGENCE SAS</div>
              </div>
            </div>
            <div>
              <div className="eyebrow">FOUNDER-LED EXPERTISE</div>
              <h2 style={{ marginTop: 24, fontSize: 'clamp(26px,2.8vw,42px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Led by senior expertise in language, localization, culture, and business communication.
              </h2>
              <p className="text-ink-600 text-[19px] leading-[1.55] mt-7 mb-5">
                Xpandia is founder-led and built around a practical belief: Spanish quality is not only a language issue. It is a product, trust, customer experience, and market-readiness issue.
              </p>
              <p className="text-ink-600 text-[19px] leading-[1.55] mb-8">
                Our work combines linguistic precision, localization experience, cultural intelligence, English-Spanish business communication, QA thinking, and the ability to translate findings into clear recommendations for global teams.
              </p>
              <div className="p-7 bg-white border border-ink-150 rounded-lg">
                <p className="text-ink-600 text-[15.5px] leading-[1.6] mb-4">
                  Nestor helps global companies evaluate, localize, and culturally adapt content and experiences for the audiences they serve. His work combines 20+ years of translation expertise, language QA, localization project management, Applied Cultural Intelligence, and business communication across English, Spanish and Portuguese.
                </p>
                <p className="text-ink-600 text-[15.5px] leading-[1.6]">
                  Through Xpandia, he advises teams that need to understand whether their Spanish content, AI outputs, product flows, support journeys, or market messages are clear, natural, trustworthy, culturally appropriate, and ready to ship to Spanish-speaking markets and audiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How We Work */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow">HOW WE WORK</div>
              <h2 style={{ marginTop: 24 }}>Focused, practical, and designed for teams that need decisions.</h2>
            </div>
            <ol className="num-list">
              {howWeWork.map(s => (
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

      {/* 6. Engagement Starting Points */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">STARTING POINTS</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>Start with the engagement your team needs now.</h2>
            </div>
            <p className="head-lede">
              Xpandia engagements are scoped based on your product, audience, volume, complexity, timeline, and level of customization.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-5 mt-12">
            {startingPoints.map(p => (
              <div key={p.title} className="p-7 bg-white border border-ink-150 rounded-lg flex flex-col">
                <h3 className="text-[19px] font-display font-medium text-ink-900 tracking-[-0.01em] mb-1">{p.title}</h3>
                <div className="font-mono text-[12px] text-primary tracking-[0.06em] mb-3">{p.price}</div>
                <p className="text-ink-600 text-[14.5px] leading-[1.55]">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="text-ink-500 text-[14px] mt-8">Final pricing is confirmed after a short diagnostic call and scope review.</p>
        </div>
      </section>

      {/* 7. Proof-of-expertise signals */}
      <section className="tight">
        <div className="container">
          <div className="eyebrow mb-8">WHY TEAMS TRUST XPANDIA</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-4 gap-5 border-t border-ink-150 pt-10">
            {proofSignals.map(s => (
              <div key={s.label}>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-[10px]">{s.label}</div>
                <div className="text-[14.5px] leading-[1.5] text-ink-700">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow">READY TO START?</div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05 }}>
            Let&apos;s find the right Spanish quality path for your team.
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            Whether you need to validate AI outputs, localize a product, improve Spanish content, train a global team, or understand a Hispanic audience, Xpandia can help you choose the right next step.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Contact Xpandia</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
