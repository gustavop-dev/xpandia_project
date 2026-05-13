'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { submitContactForm } from '@/lib/services/contact'

type RadioGroup = 'service' | 'size' | 'variant' | 'urgency'

const nextSteps = [
  {
    title: 'Share your context',
    body: 'Tell us what your team is building, improving, validating, or launching in Spanish.',
  },
  {
    title: 'Get a recommendation',
    body: 'We identify the right starting point based on your product, audience, timeline, and business goal.',
  },
  {
    title: 'Scope the engagement',
    body: 'We define deliverables, timing, pricing, inputs needed, and success criteria.',
  },
  {
    title: 'Move forward with clarity',
    body: 'Your team gets the expert judgment, assets, evidence, or guidance needed to act with confidence.',
  },
]

export default function ContactPage() {
  const [selections, setSelections] = useState<Record<RadioGroup, string>>({
    service: '',
    size: '',
    variant: '',
    urgency: '',
  })
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function select(group: RadioGroup, value: string) {
    setSelections(prev => ({ ...prev, [group]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await submitContactForm({
        name,
        email,
        role,
        company,
        message,
        service: selections.service,
        size: selections.size,
        variant: selections.variant,
        urgency: selections.urgency,
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please email us directly at hello@xpandia.global')
    } finally {
      setLoading(false)
    }
  }

  function RadioTile({ group, value, label }: { group: RadioGroup; value: string; label: string }) {
    const active = selections[group] === value
    return (
      <div
        role="button"
        tabIndex={0}
        className={cn('radio-tile', active && 'on')}
        onClick={() => select(group, value)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && select(group, value)}
      >
        {label}
      </div>
    )
  }

  return (
    <main>
      {/* Hero / header */}
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow mb-8">CONTACT</div>
          <h1 className="hero-display text-[clamp(40px,5vw,80px)] max-w-[22ch]">
            Tell us what your team is building, launching, or improving in Spanish.
          </h1>
          <p className="hero-sub mt-7 max-w-[64ch]">
            Use the form below or email us directly. We&apos;ll review your request and recommend the best next step: a diagnostic call, audit, localization engagement, CQ talk, workshop, or advisory path.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="mailto:hello@xpandia.global" className="text-primary font-medium text-[16px] hover:underline">hello@xpandia.global</a>
          </div>
          <div className="hero-ctas mt-8">
            <a className="btn btn-primary" href="#contact-form">Book a diagnostic call <span className="btn-arrow"></span></a>
            <a className="btn btn-secondary" href="#contact-form">Request an audit</a>
          </div>
        </div>
      </section>

      {/* Form + aside */}
      <section className="tight pt-6 pb-[120px]">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1.3fr_1fr] gap-20 items-start">

            {/* Form */}
            <form
              id="contact-form"
              data-reveal
              className="bg-white border border-ink-150 rounded-lg p-10"
              onSubmit={handleSubmit}
            >
              <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-[6px]">START A CONVERSATION</div>
              <h3 className="mb-3">Start a conversation</h3>
              <p className="text-ink-600 text-[15px] leading-[1.55] mb-8">
                Share a few details about your product, audience, Spanish surface, and timeline. We&apos;ll use this context to recommend the right next step.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" type="text" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Work email</label>
                  <input id="contact-email" type="email" placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field">
                  <label htmlFor="contact-company">Company</label>
                  <input id="contact-company" type="text" placeholder="Company Inc." value={company} onChange={e => setCompany(e.target.value)} required />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-role">Role / Team</label>
                  <input id="contact-role" type="text" placeholder="VP Product · Localization" value={role} onChange={e => setRole(e.target.value)} required />
                </div>
              </div>

              <div className="form-field">
                <label>What do you need help with?</label>
                <div className="radio-grid">
                  <RadioTile group="service" value="language-assurance" label="Language Assurance" />
                  <RadioTile group="service" value="localization" label="Localization & Adaptation" />
                  <RadioTile group="service" value="cultural-intelligence" label="Applied Cultural Intelligence" />
                  <RadioTile group="service" value="ai-spanish-qa" label="AI Spanish QA" />
                  <RadioTile group="service" value="fractional" label="Fractional Advisory" />
                  <RadioTile group="service" value="unsure" label="Not sure yet" />
                </div>
              </div>

              <div className="form-field">
                <label>Target audience / market</label>
                <div className="radio-grid">
                  <RadioTile group="size" value="latam" label="LatAm" />
                  <RadioTile group="size" value="us-hispanic" label="US Hispanic" />
                  <RadioTile group="size" value="spain" label="Spain" />
                  <RadioTile group="size" value="neutral" label="Neutral Spanish" />
                  <RadioTile group="size" value="specific-region" label="Specific country or region" />
                  <RadioTile group="size" value="unsure" label="Not sure yet" />
                </div>
              </div>

              <div className="form-field">
                <label>Timeline</label>
                <div className="radio-row">
                  <RadioTile group="variant" value="urgent" label="Urgent / this month" />
                  <RadioTile group="variant" value="1-2-months" label="1–2 months" />
                  <RadioTile group="variant" value="3-plus-months" label="3+ months" />
                  <RadioTile group="variant" value="exploring" label="Exploring options" />
                </div>
              </div>

              <div className="form-field">
                <label>Estimated scope</label>
                <div className="radio-grid">
                  <RadioTile group="urgency" value="small-sample" label="Small sample or diagnostic" />
                  <RadioTile group="urgency" value="product-review" label="Product / website / content review" />
                  <RadioTile group="urgency" value="ai-outputs" label="AI outputs or chatbot responses" />
                  <RadioTile group="urgency" value="full-localization" label="Full localization or adaptation project" />
                  <RadioTile group="urgency" value="workshop-advisory" label="Workshop / talk / advisory" />
                  <RadioTile group="urgency" value="unsure" label="Not sure yet" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">What are you working on?</label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us about your product, audience, Spanish surface, website or product URL, and what you'd like us to look at. e.g., We launched our AI tutor in Spanish last quarter. Support tickets mention confusion. We need a read on quality before expanding to Mexico — site: example.com"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[14px]">
                  {error}
                </div>
              )}

              {submitted ? (
                <div className="w-full p-[18px] rounded-full bg-accent text-paper text-center font-body text-[15px] font-medium">
                  ✓ Request received — we&apos;ll reply within 24 hours
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={cn('btn btn-primary w-full justify-center', loading && 'opacity-60 cursor-not-allowed')}
                  style={{ padding: 18 }}
                >
                  {loading ? 'Sending…' : <>Send request <span className="btn-arrow"></span></>}
                </button>
              )}
              <div className="text-ink-500 text-[13px] mt-4 text-center">
                We&apos;ll review your request and respond with the most relevant next step.
              </div>
            </form>

            {/* Aside */}
            <aside data-reveal className="static tablet:sticky tablet:top-[100px]">
              <div className="eyebrow">CONTACT OPTIONS</div>
              <div className="mt-6 p-6 bg-ink-900 text-paper rounded-xl">
                <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-[10px]">EMAIL</div>
                <a href="mailto:hello@xpandia.global" className="font-display text-[22px] tracking-[-0.01em] block mb-1 hover:underline">hello@xpandia.global</a>
                <div className="text-ink-300 text-[14px]">Tell us what your team is building, launching, or improving in Spanish.</div>
              </div>
              <div className="mt-6 p-6 bg-ink-50 border border-ink-150 rounded-xl">
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-[14px]">START WITH</div>
                <div className="flex flex-col gap-3">
                  <a className="btn btn-primary justify-center" href="#contact-form">Book a diagnostic call <span className="btn-arrow"></span></a>
                  <a className="btn btn-secondary justify-center" href="#contact-form">Request an audit</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow">NEXT STEPS</div>
              <h2 style={{ marginTop: 24 }}>A clear path from first contact to action.</h2>
            </div>
            <ol className="num-list">
              {nextSteps.map(s => (
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

      {/* Final CTA */}
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
            <a className="btn btn-primary" href="#contact-form">Book a diagnostic call <span className="btn-arrow"></span></a>
            <a className="btn btn-secondary" href="mailto:hello@xpandia.global">Email us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
