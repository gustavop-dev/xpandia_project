'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/lib/i18n/useTranslations'

type RadioGroup = 'help' | 'audience' | 'timeline' | 'scope'

export default function ContactPage() {
  const t = useTranslations()
  const { contact } = t

  const [selections, setSelections] = useState<Record<RadioGroup, string>>({
    help: '',
    audience: '',
    timeline: '',
    scope: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function select(group: RadioGroup, value: string) {
    setSelections(prev => ({ ...prev, [group]: value }))
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
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow mb-8">{contact.hero.eyebrow}</div>
          <h1 className="hero-display text-[clamp(36px,4.5vw,64px)] max-w-[20ch]">
            {contact.hero.h1}
          </h1>
          <p className="hero-sub mt-7">
            {contact.hero.sub}
          </p>
        </div>
      </section>

      <section className="tight pt-6 pb-[120px]">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1.3fr_1fr] gap-20 items-start">

            {/* Form */}
            <form data-reveal
              className="bg-white border border-ink-150 rounded-lg p-10"
              onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
            >
              <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-[6px]">{contact.form.eyebrow}</div>
              <h3 className="mb-4">{contact.form.headline}</h3>
              <p className="text-ink-600 text-[15px] mb-8">{contact.form.intro}</p>

              <div className="form-field">
                <label>{contact.form.fields.helpWith}</label>
                <div className="radio-grid">
                  {contact.form.fields.helpOptions.map((option) => (
                    <RadioTile key={option} group="help" value={option} label={option} />
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label>{contact.form.fields.audience}</label>
                <div className="radio-grid">
                  {contact.form.fields.audienceOptions.map((option) => (
                    <RadioTile key={option} group="audience" value={option} label={option} />
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label>{contact.form.fields.timeline}</label>
                <div className="radio-row">
                  {contact.form.fields.timelineOptions.map((option) => (
                    <RadioTile key={option} group="timeline" value={option} label={option} />
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label>{contact.form.fields.scope}</label>
                <div className="radio-grid">
                  {contact.form.fields.scopeOptions.map((option) => (
                    <RadioTile key={option} group="scope" value={option} label={option} />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field">
                  <label>{contact.form.fields.name}</label>
                  <input type="text" placeholder="Jane Doe" />
                </div>
                <div className="form-field">
                  <label>{contact.form.fields.role}</label>
                  <input type="text" placeholder="VP Product" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field">
                  <label>{contact.form.fields.workEmail}</label>
                  <input type="email" placeholder="jane@company.com" />
                </div>
                <div className="form-field">
                  <label>{contact.form.fields.company}</label>
                  <input type="text" placeholder="Company Inc." />
                </div>
              </div>
              <div className="form-field">
                <label>{contact.form.fields.website}</label>
                <input type="url" placeholder="https://yourproduct.com" />
              </div>

              <div className="form-field">
                <label>{contact.form.fields.message}</label>
                <textarea placeholder={contact.form.fields.messagePlaceholder} />
              </div>

              {submitted ? (
                <div className="w-full p-[18px] rounded-full bg-accent text-paper text-center font-body text-[15px] font-medium">
                  ✓ Request received — we'll reply within 24 hours
                </div>
              ) : (
                <button type="submit" className="btn btn-primary w-full justify-center" style={{ padding: 18 }}>
                  {contact.form.submit} <span className="btn-arrow"></span>
                </button>
              )}
              <div className="font-mono text-[11px] text-ink-500 tracking-[0.06em] mt-4 text-center">
                {contact.form.microcopy}
              </div>
            </form>

            {/* Aside */}
            <aside data-reveal className="static tablet:sticky tablet:top-[100px]">
              <div className="eyebrow">{contact.nextSteps.eyebrow}</div>
              <h3 className="mt-4 mb-6">{contact.nextSteps.headline}</h3>
              <ol className="num-list">
                {contact.nextSteps.steps.map((step) => (
                  <li key={step.num}>
                    <div>
                      <div className="font-mono text-[12px] text-accent mb-1">{step.num}</div>
                      <h4>{step.title}</h4>
                      <div className="n-body">{step.body}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 p-6 bg-ink-900 text-paper rounded-xl">
                <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-[10px]">{contact.sidebar.eyebrow}</div>
                <div className="font-display text-[22px] tracking-[-0.01em] mb-1">{contact.sidebar.email}</div>
                <div className="text-ink-300 text-[14px]">For partnership and press inquiries.</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">{contact.finalCta.eyebrow}</div>
          <h2 className="mt-5 text-[clamp(32px,4vw,56px)] leading-[1.08]">
            {contact.finalCta.headline}
          </h2>
          <p className="lede mt-6">{contact.finalCta.body}</p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{contact.finalCta.primaryCta} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
