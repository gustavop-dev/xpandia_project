import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Spanish Localization & Adaptation for Digital Products | Xpandia',
  description:
    'Xpandia helps SaaS, AI, EdTech, Product, Marketing, CX, and Localization teams translate, localize, transcreate, and adapt Spanish content, product copy, documentation, and campaigns for real Spanish-speaking audiences.',
}

const heroProofPoints = [
  {
    title: 'Product-ready Spanish',
    desc: 'UI copy, onboarding, forms, errors, flows, and user-facing product content.',
  },
  {
    title: 'Content that connects',
    desc: 'Websites, campaigns, help centers, learning materials, and customer communication.',
  },
  {
    title: 'Audience-aware adaptation',
    desc: 'LatAm, US Hispanic, Spain, neutral Spanish, or specific regional markets.',
  },
]

const coverageCards = [
  {
    title: 'Websites and landing pages',
    desc: 'Homepage, service pages, pricing pages, product pages, landing pages, FAQs, lead-generation flows, and conversion copy.',
  },
  {
    title: 'Product UI and UX copy',
    desc: 'Buttons, menus, settings, empty states, onboarding, tooltips, notifications, error messages, forms, and product flows.',
  },
  {
    title: 'Marketing and campaigns',
    desc: 'Email campaigns, ads, launch messaging, sales decks, lead magnets, newsletters, social content, and campaign concepts.',
  },
  {
    title: 'Help center and documentation',
    desc: 'Knowledge base articles, FAQs, how-to guides, support content, release notes, product documentation, and user education.',
  },
  {
    title: 'EdTech and learning content',
    desc: 'Lessons, scripts, quizzes, instructions, assessments, learner feedback, tutoring content, and educational explanations.',
  },
  {
    title: 'Support and CX communication',
    desc: 'Macros, support replies, chatbot scripts, escalation language, customer emails, and service recovery messages.',
  },
]

const whenToUse = [
  'Your English-first product, website, content, or campaign needs a professional Spanish version.',
  'Your existing Spanish translation sounds literal, generic, inconsistent, or disconnected from the audience.',
  'Your product UI, help content, or marketing copy needs to feel natural and trustworthy in Spanish.',
  'Your Spanish experience needs regional adaptation for LatAm, US Hispanic, Spain, or a specific market.',
  'Your content needs to support conversion, clarity, trust, learning, or user action.',
  'Your team needs Spanish copy that works in context, not isolated strings or word-by-word translation.',
  'Your audience understands the words, but the experience still does not feel made for them.',
]

const adaptationCriteria = [
  {
    n: '01',
    title: 'Meaning',
    desc: 'Does the Spanish preserve the intent, message, and product logic of the original content?',
  },
  {
    n: '02',
    title: 'Clarity',
    desc: 'Can users understand what the content means, what action to take, and why it matters?',
  },
  {
    n: '03',
    title: 'Naturality',
    desc: 'Does the Spanish sound fluent, native, and appropriate for real Spanish-speaking users?',
  },
  {
    n: '04',
    title: 'Tone and voice',
    desc: 'Does the Spanish match your brand, audience, product context, and level of formality?',
  },
  {
    n: '05',
    title: 'Terminology',
    desc: 'Are product terms, feature names, support language, and key concepts consistent and usable?',
  },
  {
    n: '06',
    title: 'Regional fit',
    desc: 'Does the Spanish align with the intended audience: LatAm, US Hispanic, Spain, neutral Spanish, or a specific regional market?',
  },
  {
    n: '07',
    title: 'Cultural fit',
    desc: 'Do examples, references, assumptions, tone, trust signals, and communication choices fit the audience?',
  },
  {
    n: '08',
    title: 'UX fit',
    desc: 'Does the copy work inside the interface, layout, flow, character limits, buttons, forms, and decision points?',
  },
  {
    n: '09',
    title: 'Conversion fit',
    desc: 'Does the content help users understand, trust, decide, continue, buy, sign up, complete, or take the next step?',
  },
  {
    n: '10',
    title: 'Publication readiness',
    desc: 'Is the content ready for review, QA, stakeholder approval, or publication?',
  },
]

const engagements = [
  {
    n: '01',
    title: 'Website & Landing Page Localization',
    tagline: 'Turn your English-first website into Spanish that feels built for the audience.',
    bestFor:
      'Teams launching or improving Spanish websites, landing pages, service pages, pricing pages, lead-generation pages, or product marketing pages.',
    outcome:
      'Create a Spanish web experience that supports clarity, trust, conversion, brand consistency, and audience fit.',
    deliverablesLabel: 'Localization deliverables',
    deliverables: [
      'Localized website or landing page copy.',
      'Adapted headlines, body copy, CTAs, FAQs, and conversion sections.',
      'Terminology and style notes.',
      'Regional fit recommendations.',
      'Copy review in context where access is available.',
      'QA-ready or publication-ready Spanish copy.',
    ],
    price: 'From $2,500',
    timeline: '5–10 business days, depending on scope.',
    cta: 'Request website localization',
  },
  {
    n: '02',
    title: 'Product UI & UX Copy Localization',
    tagline: 'Make product copy feel clear, usable, and natural in Spanish.',
    bestFor:
      'Product, SaaS, AI, EdTech, and Localization teams localizing or improving Spanish interfaces, onboarding, forms, errors, tooltips, notifications, and user flows.',
    outcome:
      'Improve Spanish usability, clarity, consistency, and product readiness across user-facing product surfaces.',
    deliverablesLabel: 'Localization deliverables',
    deliverables: [
      'Localized UI strings or product copy.',
      'UX copy adaptation for flows, states, and microcopy.',
      'Terminology guidance.',
      'Character-limit and context notes where applicable.',
      'Annotated recommendations for UX friction.',
      'QA-ready Spanish copy.',
    ],
    price: 'From $3,000',
    timeline: '7–15 business days, depending on volume and product complexity.',
    cta: 'Request product localization',
  },
  {
    n: '03',
    title: 'Marketing Localization & Transcreation',
    tagline: 'Adapt the message, not just the words.',
    bestFor:
      'Marketing, Growth, Product Marketing, and Localization teams adapting campaigns, landing pages, emails, ads, sales content, or launch messaging for Spanish-speaking audiences.',
    outcome:
      'Create Spanish marketing content that preserves strategic intent while adapting tone, emotion, persuasion, cultural context, and audience expectations.',
    deliverablesLabel: 'Adaptation deliverables',
    deliverables: [
      'Localized or transcreated campaign copy.',
      'Alternative headlines, claims, CTAs, or message directions.',
      'Audience-specific messaging notes.',
      'Cultural adaptation rationale.',
      'Terminology and tone guidance.',
      'Publication-ready Spanish copy.',
    ],
    price: 'From $2,500',
    timeline: '5–10 business days, depending on scope.',
    cta: 'Request marketing adaptation',
  },
  {
    n: '04',
    title: 'Help Center & Documentation Localization',
    tagline: 'Turn support content into Spanish users can actually use.',
    bestFor:
      'Support, CX, Product, EdTech, SaaS, and Localization teams localizing help centers, FAQs, product documentation, how-to guides, support articles, or user education content.',
    outcome:
      'Create Spanish support and documentation content that is clear, consistent, useful, and aligned with how users ask for help.',
    deliverablesLabel: 'Localization deliverables',
    deliverables: [
      'Localized help center articles or documentation.',
      'Terminology and style recommendations.',
      'Clarity and usefulness improvements.',
      'Structure or readability notes where applicable.',
      'Support tone guidance.',
      'QA-ready or publication-ready content.',
    ],
    price: 'From $3,000',
    timeline: '1–3 weeks, depending on volume and complexity.',
    cta: 'Request documentation localization',
  },
  {
    n: '05',
    title: 'EdTech & Learning Content Localization',
    tagline: 'Make learning content clear, natural, and pedagogically effective in Spanish.',
    bestFor:
      'EdTech, learning, training, assessment, and content teams adapting lessons, quizzes, scripts, instructions, tutoring content, learner feedback, or educational materials.',
    outcome:
      'Create Spanish learning content that supports comprehension, engagement, cultural relevance, and pedagogical clarity.',
    deliverablesLabel: 'Localization deliverables',
    deliverables: [
      'Localized learning content.',
      'Adapted examples, instructions, feedback, and assessments.',
      'Tone and learner-level recommendations.',
      'Cultural and regional fit notes.',
      'Pedagogical clarity review.',
      'QA-ready or learner-ready Spanish content.',
    ],
    price: 'From $4,000',
    timeline: '2–4 weeks, depending on content type and volume.',
    cta: 'Request learning content localization',
  },
  {
    n: '06',
    title: 'Localization Review & Repair',
    tagline: 'Turn translated Spanish into Spanish that works.',
    bestFor:
      'Teams with existing Spanish translations that need improvement, consistency, adaptation, regional fit, or publication readiness.',
    outcome:
      'Improve translated Spanish so it feels natural, clear, trustworthy, and aligned with your audience.',
    deliverablesLabel: 'Review deliverables',
    deliverables: [
      'Content review.',
      'Rewrite recommendations.',
      'Terminology notes.',
      'Regional fit guidance.',
      'QA checklist.',
      'Final-ready copy where scope allows.',
    ],
    price: 'From $2,500',
    timeline: '5–10 business days.',
    cta: 'Request localization review',
  },
]

const methodologySteps = [
  {
    title: 'Understand the context',
    body: 'We clarify your audience, Spanish variant, product surface, content type, business goal, tone, terminology, and publication needs.',
  },
  {
    title: 'Adapt the experience',
    body: 'We localize or transcreate the selected content with attention to meaning, clarity, tone, terminology, regional fit, cultural fit, UX context, and user action.',
  },
  {
    title: 'Review in context',
    body: 'Where access is available, we review Spanish inside the product, website, document, flow, or layout so the copy works in the real experience.',
  },
  {
    title: 'Deliver usable Spanish assets',
    body: 'You receive localized, adapted, QA-ready, or publication-ready Spanish copy, along with notes your team can use: terminology guidance, cultural rationale, regional fit recommendations, and implementation comments.',
  },
  {
    title: 'Prepare for launch or QA',
    body: 'We recommend the right next step: publish, QA, sign off, repair, expand, test, or move into Language Assurance for readiness validation.',
  },
]

const deliverableCards = [
  {
    title: 'Localized Copy',
    desc: 'Spanish content adapted for your product, brand, audience, and business goal.',
  },
  {
    title: 'Transcreation Options',
    desc: 'Alternative messaging directions when direct translation does not carry the same impact.',
  },
  {
    title: 'UX Copy Adaptation',
    desc: 'Spanish microcopy that works inside buttons, forms, flows, onboarding, errors, and product states.',
  },
  {
    title: 'Terminology Guidance',
    desc: 'Preferred terms, consistency notes, product language, and naming recommendations.',
  },
  {
    title: 'Regional Fit Notes',
    desc: 'Guidance for LatAm, US Hispanic, Spain, neutral Spanish, or specific regional markets.',
  },
  {
    title: 'Cultural Adaptation Rationale',
    desc: 'Explanation of why certain words, references, tones, or examples should be adapted.',
  },
  {
    title: 'QA-Ready Assets',
    desc: 'Spanish copy prepared for internal review, implementation, or Language Assurance validation.',
  },
  {
    title: 'Publication-Ready Content',
    desc: 'Final-ready copy where scope includes review, revision, and final polish.',
  },
]

const builtForCards = [
  {
    title: 'Product Teams',
    desc: 'Localize UI copy, onboarding, forms, errors, notifications, and product flows.',
  },
  {
    title: 'Marketing & Growth Teams',
    desc: 'Adapt landing pages, campaigns, email flows, CTAs, and conversion copy.',
  },
  {
    title: 'Localization Teams',
    desc: 'Improve Spanish quality, consistency, terminology, regional fit, and review workflows.',
  },
  {
    title: 'CX & Support Teams',
    desc: 'Localize help centers, macros, support replies, chatbot scripts, and customer communication.',
  },
  {
    title: 'EdTech Teams',
    desc: 'Adapt lessons, quizzes, scripts, explanations, assessments, and learning experiences.',
  },
  {
    title: 'AI Teams',
    desc: 'Prepare Spanish content, prompts, examples, help materials, or user-facing copy that supports AI product experiences.',
  },
]

const pricingCards = [
  {
    title: 'Website & Landing Page Localization',
    price: 'From $2,500',
    desc: 'Create or improve Spanish web pages, landing pages, service pages, FAQs, and conversion copy.',
  },
  {
    title: 'Product UI & UX Copy Localization',
    price: 'From $3,000',
    desc: 'Adapt product interfaces, onboarding, microcopy, forms, errors, and flows for Spanish-speaking users.',
  },
  {
    title: 'Marketing Localization & Transcreation',
    price: 'From $2,500',
    desc: 'Adapt campaigns, email flows, ads, launch messaging, sales content, and product marketing copy.',
  },
  {
    title: 'Help Center & Documentation Localization',
    price: 'From $3,000',
    desc: 'Localize support articles, FAQs, product documentation, how-to guides, and user education content.',
  },
  {
    title: 'EdTech & Learning Content Localization',
    price: 'From $4,000',
    desc: 'Adapt lessons, quizzes, scripts, learner feedback, assessments, and educational content.',
  },
  {
    title: 'Localization Review & Repair',
    price: 'From $2,500',
    desc: 'Improve existing Spanish translations for clarity, naturalness, consistency, regional fit, and publication readiness.',
  },
]

const faqs = [
  {
    q: 'Is this translation or localization?',
    a: 'It can include translation, but the goal is broader: to create Spanish content that works for the product, audience, context, and business goal.',
  },
  {
    q: 'Do you charge per word?',
    a: 'Most Xpandia engagements are scoped by project, not by word. Word count matters, but so do product context, UX complexity, adaptation level, audience, timeline, and QA needs.',
  },
  {
    q: 'Can you adapt existing translations?',
    a: 'Yes. Localization Review & Repair is designed for teams that already have Spanish translations but need them to feel more natural, consistent, audience-aware, or ready to publish.',
  },
  {
    q: 'Can you localize product UI strings?',
    a: 'Yes. We can localize and adapt UI strings, microcopy, onboarding, forms, error messages, tooltips, notifications, and product flows.',
  },
  {
    q: 'Can you support LatAm, US Hispanic, or Spain Spanish?',
    a: 'Yes. Engagements can be scoped for LatAm, US Hispanic, Spain, neutral Spanish, or specific regional markets.',
  },
  {
    q: 'Can you also validate the localized content before launch?',
    a: 'Yes. Localization & Adaptation can be followed by Language Assurance to validate readiness, consistency, UX friction, regional fit, and launch risk.',
  },
]

export default function LocalizationAdaptationPage() {
  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="flex gap-3 mb-7">
            <Link href="/services" className="font-mono text-[11px] tracking-[0.1em] text-ink-500">
              ← ALL SERVICES
            </Link>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-500">· 02 / ADAPT</span>
          </div>
          <div className="eyebrow mb-8">LOCALIZATION &amp; ADAPTATION</div>
          <h1 className="hero-display text-[clamp(44px,5.6vw,84px)] max-w-[18ch]">
            More than translated. Built for <span className="accent-underline">Spanish-speaking</span> audiences.
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            Xpandia helps SaaS, AI, EdTech, Product, Marketing, CX, and Localization teams create, improve, and adapt
            Spanish content, product experiences, documentation, and campaigns so they feel clear, natural, trustworthy,
            and ready for real users.
          </p>
          <p className="text-ink-600 text-[17px] mt-5 max-w-[64ch]">
            We combine senior Spanish expertise, localization judgment, UX awareness, and cultural adaptation to help
            your content work across the moments that matter: product use, onboarding, support, learning, marketing, and
            conversion.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">
              Request a localization review <span className="btn-arrow"></span>
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              Book a diagnostic call
            </Link>
          </div>

          <div
            data-stagger
            className="mt-20 pt-6 border-t border-ink-150 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {heroProofPoints.map(p => (
              <div key={p.title}>
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-2">{p.title}</div>
                <div className="text-ink-600 text-[14.5px] leading-[1.5]">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual band */}
      <section className="tight pt-0 pb-0">
        <div className="container">
          <div className="relative aspect-[16/9] tablet:aspect-[24/7] rounded-lg overflow-hidden bg-ink-900">
            <Image
              src="/assets/img-services.jpg"
              alt=""
              fill
              loading="lazy"
              className="object-cover grayscale contrast-[1.05]"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(15,20,25,0.3) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.8) 100%)',
              }}
            ></div>
            <div className="absolute bottom-8 right-8 font-mono text-[11px] tracking-[0.14em] text-white/85 text-right">
              <div className="mb-[6px]">02 / ADAPT</div>
              <div className="text-accent text-[14px] tracking-[0.08em]">SOURCE → ADAPTED SPANISH</div>
            </div>
            <div className="absolute bottom-0 left-0 w-[34%] h-[3px] bg-accent"></div>
          </div>
        </div>
      </section>

      {/* 2. Positioning */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">WHY LOCALIZATION &amp; ADAPTATION</div>
            <div>
              <p className="display text-[clamp(26px,2.8vw,40px)] leading-[1.08] tracking-[-0.02em] max-w-[34ch] mb-6">
                Translation helps users read. Localization helps users trust, understand, and act.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-5">
                A Spanish version can be technically correct and still feel foreign, literal, inconsistent, or
                disconnected from the audience. That gap affects clarity, trust, UX, conversion, support, learning, and
                product adoption.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-5">
                Localization &amp; Adaptation closes that gap. We help teams create or improve Spanish experiences that
                respect the product context, the user journey, the audience, the market, and the business goal.
              </p>
              <p className="text-ink-500 text-[16px] max-w-[62ch]">
                The goal is not just Spanish content. The goal is Spanish that feels intentional, usable, and aligned
                with how your audience thinks, decides, learns, and acts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Localize & Adapt */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">WHAT WE ADAPT</div>
            <h2 className="head-title">Spanish content across the full user journey.</h2>
            <p className="head-lede">
              Localization &amp; Adaptation can support any Spanish touchpoint your audience reads, follows, clicks,
              learns from, or uses to make a decision.
            </p>
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

      {/* 4. When to Use */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div>
              <div className="eyebrow mb-4">WHEN TO USE IT</div>
              <p className="display text-[clamp(24px,2.6vw,36px)] leading-[1.1] tracking-[-0.02em] max-w-[24ch]">
                Use it when Spanish needs to feel native, clear, and useful.
              </p>
            </div>
            <ul className="checklist">
              {whenToUse.map(item => (
                <li key={item}>
                  <span className="chk"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Core Adaptation Criteria — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="section-head" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
            <div className="eyebrow mb-4" style={{ color: 'var(--accent)' }}>
              ADAPTATION CRITERIA
            </div>
            <h2 className="head-title text-paper">The signals behind Spanish that feels made for the user.</h2>
            <p className="head-lede text-ink-300">
              Each localization engagement is scoped around your audience, market, product context, content type, and
              business goal. Depending on the project, we adapt for the criteria that matter most.
            </p>
          </div>
          <div data-stagger className="grid grid-cols-2 tablet:grid-cols-5 gap-px mt-12 bg-white/[0.08]">
            {adaptationCriteria.map(c => (
              <div key={c.n} className="bg-ink-900 px-6 py-8">
                <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-3">{c.n}</div>
                <div className="font-display text-[20px] tracking-[-0.012em] mb-2">{c.title}</div>
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
            <div className="eyebrow mb-4">CORE ENGAGEMENTS</div>
            <h2 className="head-title">Create, improve, or repair your Spanish experience.</h2>
            <p className="head-lede">
              Start with a focused localization or adaptation engagement, then move into review, repair, QA, or ongoing
              Spanish quality leadership when needed.
            </p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mt-12">
            {engagements.map(e => (
              <div key={e.n} className="flex flex-col p-8 bg-white border border-ink-150 rounded-lg">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="font-mono text-[12px] text-ink-400 tracking-[0.08em]">{e.n}</div>
                  <div className="tag accent">{e.price}</div>
                </div>
                <h3 className="font-display text-[24px] font-medium tracking-[-0.015em] leading-[1.1] mb-3">
                  {e.title}
                </h3>
                <p className="text-ink-600 text-[16px] leading-[1.45] mb-5">{e.tagline}</p>
                <div className="mb-4">
                  <div className="eyebrow no-bar mb-2">BEST FOR</div>
                  <p className="text-ink-600 text-[14.5px] leading-[1.5]">{e.bestFor}</p>
                </div>
                <div className="mb-5">
                  <div className="eyebrow no-bar mb-2">OUTCOME</div>
                  <p className="text-ink-600 text-[14.5px] leading-[1.5]">{e.outcome}</p>
                </div>
                <div className="mb-5">
                  <div className="eyebrow no-bar mb-3">{e.deliverablesLabel.toUpperCase()}</div>
                  <ul className="checklist">
                    {e.deliverables.map(d => (
                      <li key={d} className="!py-[10px] !text-[14.5px]">
                        <span className="chk"></span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-5 border-t border-ink-150 flex flex-col gap-4">
                  <div className="font-mono text-[12px] text-ink-500 tracking-[0.02em]">
                    Timeline: {e.timeline}
                  </div>
                  <Link className="btn btn-secondary btn-small self-start" href="/contact">
                    {e.cta} <span className="btn-arrow"></span>
                  </Link>
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
            <div className="eyebrow mb-4">METHODOLOGY</div>
            <h2 className="head-title">A practical path from English-first to audience-ready Spanish.</h2>
            <p className="head-lede">
              Every Localization &amp; Adaptation engagement follows a structured process designed to preserve meaning,
              adapt context, and make Spanish work for the audience.
            </p>
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
            <div className="eyebrow mb-4">THE DELIVERABLES</div>
            <h2 className="head-title">Spanish assets your team can use, publish, and scale.</h2>
            <p className="head-lede">
              Localization &amp; Adaptation turns source content into Spanish experiences that are clear, natural,
              consistent, audience-aware, and ready for the next step in your workflow.
            </p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-4 gap-4 mt-12">
            {deliverableCards.map(d => (
              <div key={d.title} className="p-6 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[18px] font-medium tracking-[-0.012em] mb-[10px]">{d.title}</div>
                <div className="text-ink-600 text-[14px] leading-[1.5]">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Built For */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">BUILT FOR</div>
            <h2 className="head-title">For teams creating Spanish experiences that users can trust.</h2>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {builtForCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pricing */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">STARTING POINTS</div>
            <h2 className="head-title">Start with the Spanish experience your team needs now.</h2>
            <p className="head-lede">
              Localization &amp; Adaptation engagements are scoped based on content type, volume, product context,
              audience, Spanish variant, level of adaptation, complexity, and timeline.
            </p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {pricingCards.map(c => (
              <div key={c.title} className="flex flex-col p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[19px] font-medium tracking-[-0.012em] leading-[1.15] mb-3">
                  {c.title}
                </div>
                <div className="tag accent self-start mb-4">{c.price}</div>
                <div className="text-ink-600 text-[14.5px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-ink-500 text-[15px] max-w-[72ch] mt-8">
            Final pricing is confirmed after a short diagnostic call and scope review. Pricing depends on volume,
            complexity, timeline, file format, level of adaptation, and whether in-context review or final QA is
            included.
          </p>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">FAQ</div>
            <h2 className="head-title">Common questions about Localization &amp; Adaptation.</h2>
          </div>
          <div className="mt-12 max-w-[860px]">
            {faqs.map(f => (
              <div key={f.q} className="py-7 border-t border-ink-150">
                <h4 className="font-display text-[20px] font-medium tracking-[-0.012em] mb-3">{f.q}</h4>
                <p className="text-ink-600 text-[16.5px] leading-[1.55]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">NEXT STEP</div>
          <h2 className="mt-5 text-[clamp(36px,4.6vw,64px)] leading-[1.05]">
            Build Spanish your audience can understand, trust, and act on.
          </h2>
          <p className="lede mt-7">
            Book a diagnostic call to review your content, product surface, audience, Spanish variant, timeline, and
            business goal. We&rsquo;ll recommend the right Localization &amp; Adaptation path: website localization,
            product UI localization, marketing adaptation, documentation localization, learning content localization, or
            localization review and repair.
          </p>
          <p className="font-mono text-[13px] text-ink-500 tracking-[0.02em] mt-6">
            Localization &amp; Adaptation engagements start from $2,500.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">
              Book a diagnostic call <span className="btn-arrow"></span>
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              Request localization review
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
