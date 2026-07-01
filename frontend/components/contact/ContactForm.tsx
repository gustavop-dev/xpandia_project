'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { submitContactForm } from '@/lib/services/contact'
import { FORM_HINT_EVENT, goToContactForm } from '@/lib/contact/goToForm'
import CalScript, { calTriggerProps } from '@/components/contact/CalScript'

type RadioGroup = 'service' | 'size' | 'variant' | 'urgency'

export default function ContactForm() {
  const t = useTranslations('contact')

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
  const [website, setWebsite] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hint, setHint] = useState(false)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function onHint() {
      setHint(true)
      if (hintTimer.current) clearTimeout(hintTimer.current)
      hintTimer.current = setTimeout(() => setHint(false), 5000)
    }
    window.addEventListener(FORM_HINT_EVENT, onHint)
    return () => {
      window.removeEventListener(FORM_HINT_EVENT, onHint)
      if (hintTimer.current) clearTimeout(hintTimer.current)
    }
  }, [])

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
        website,
        message,
        service: selections.service,
        size: selections.size,
        variant: selections.variant,
        urgency: selections.urgency,
      })
      setSubmitted(true)
    } catch {
      setError(t('form.error'))
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

  const serviceOptions = t.raw('form.fields.service.options') as string[]
  const serviceValues = [
    'language-assurance',
    'ai-language-qa',
    'launch-readiness',
    'experience-repair',
    'cultural-intelligence',
    'hispanic-messaging-review',
    'quality-advisory',
    'unsure',
  ]

  const audienceOptions = t.raw('form.fields.audience.options') as string[]
  const audienceValues = [
    'latam',
    'us-hispanic',
    'usa',
    'canada',
    'europe',
    'spain',
    'global-english',
    'neutral-spanish',
    'specific-region',
    'unsure',
  ]

  const timelineOptions = t.raw('form.fields.timeline.options') as string[]
  const timelineValues = ['urgent', '1-2-months', '3-plus-months', 'exploring']

  const scopeOptions = t.raw('form.fields.scope.options') as string[]
  const scopeValues = [
    'small-sample',
    'ai-outputs',
    'product-review',
    'repair-adaptation',
    'workshop-advisory',
    'unsure',
  ]

  const asideLinks = t.raw('aside.links') as string[]

  return (
    <section className="tight pt-6 pb-[120px]">
      <CalScript />
      <div className="container">
        <div className="grid grid-cols-1 tablet:grid-cols-[1.3fr_1fr] gap-20 items-start">

          {/* Form */}
          <form
            id="contact-form"
            data-reveal
            className={cn('bg-white border border-ink-150 rounded-lg p-10', hint && 'form-attention')}
            onSubmit={handleSubmit}
          >
            <div className={cn('form-hint', hint && 'show')} role="status" aria-live="polite">
              <span>{t('form.hint')}</span>
            </div>
            <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-[6px]">{t('form.eyebrow')}</div>
            <h3 className="mb-3">{t('form.title')}</h3>
            <p className="text-ink-600 text-[15px] leading-[1.55] mb-8">
              {t('form.intro')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-field">
                <label htmlFor="contact-name">{t('form.fields.name.label')}</label>
                <input id="contact-name" type="text" placeholder={t('form.fields.name.placeholder')} value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">{t('form.fields.email.label')}</label>
                <input id="contact-email" type="email" placeholder={t('form.fields.email.placeholder')} value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-field">
                <label htmlFor="contact-company">{t('form.fields.company.label')}</label>
                <input id="contact-company" type="text" placeholder={t('form.fields.company.placeholder')} value={company} onChange={e => setCompany(e.target.value)} required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-role">{t('form.fields.role.label')}</label>
                <input id="contact-role" type="text" placeholder={t('form.fields.role.placeholder')} value={role} onChange={e => setRole(e.target.value)} required />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-website">{t('form.fields.website.label')}</label>
              <input id="contact-website" type="text" placeholder={t('form.fields.website.placeholder')} value={website} onChange={e => setWebsite(e.target.value)} />
            </div>

            <div className="form-field">
              <label>{t('form.fields.service.label')}</label>
              <div className="radio-grid">
                {serviceOptions.map((label, i) => (
                  <RadioTile key={serviceValues[i]} group="service" value={serviceValues[i]} label={label} />
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>{t('form.fields.audience.label')}</label>
              <div className="radio-grid">
                {audienceOptions.map((label, i) => (
                  <RadioTile key={audienceValues[i]} group="size" value={audienceValues[i]} label={label} />
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>{t('form.fields.timeline.label')}</label>
              <div className="radio-row">
                {timelineOptions.map((label, i) => (
                  <RadioTile key={timelineValues[i]} group="variant" value={timelineValues[i]} label={label} />
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>{t('form.fields.scope.label')}</label>
              <div className="radio-grid">
                {scopeOptions.map((label, i) => (
                  <RadioTile key={scopeValues[i]} group="urgency" value={scopeValues[i]} label={label} />
                ))}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">{t('form.fields.message.label')}</label>
              <textarea
                id="contact-message"
                placeholder={t('form.fields.message.placeholder')}
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
                {t('form.success')}
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={cn('btn btn-primary w-full justify-center', loading && 'opacity-60 cursor-not-allowed')}
                style={{ padding: 18 }}
              >
                {loading ? t('form.submitting') : <>{t('form.submit')} <span className="btn-arrow"></span></>}
              </button>
            )}
            <div className="text-ink-500 text-[13px] mt-4 text-center">
              {t('form.microcopy')}
            </div>
          </form>

          {/* Aside */}
          <aside data-reveal className="static tablet:sticky tablet:top-[100px]">
            <div className="eyebrow">{t('aside.eyebrow')}</div>
            <div className="mt-6 p-6 bg-ink-900 text-paper rounded-xl">
              <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-[10px]">{t('aside.emailLabel')}</div>
              <a href={`mailto:${t('aside.email')}`} className="font-display text-[22px] tracking-[-0.01em] block mb-1 hover:underline">{t('aside.email')}</a>
              <div className="text-ink-300 text-[14px]">{t('aside.emailBody')}</div>
            </div>
            <div className="mt-6 p-6 bg-ink-50 border border-ink-150 rounded-xl">
              <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-[14px]">{t('aside.startWithLabel')}</div>
              <div className="flex flex-col gap-3">
                {asideLinks.map((label, i) => {
                  // Indices 0 ("Book a diagnostic call") and 3 ("Book an ACI Talk")
                  // open the Cal.com scheduler; the rest lead to the form.
                  const opensCal = i === 0 || i === 3
                  return (
                    <button
                      key={label}
                      type="button"
                      className={cn('btn justify-center', i === 0 ? 'btn-primary' : 'btn-secondary')}
                      {...(opensCal ? calTriggerProps : {})}
                      onClick={opensCal ? undefined : goToContactForm}
                    >
                      {label}
                      {i === 0 && <span className="btn-arrow"></span>}
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
