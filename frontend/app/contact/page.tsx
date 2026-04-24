'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type RadioGroup = 'service' | 'size' | 'variant' | 'urgency'

export default function ContactPage() {
  const [selections, setSelections] = useState<Record<RadioGroup, string>>({
    service: '',
    size: '',
    variant: '',
    urgency: '',
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
          <div className="eyebrow mb-8">DIAGNOSTIC CALL</div>
          <h1 className="hero-display text-[clamp(44px,5.4vw,84px)] max-w-[18ch]">
            Tell us where your <span className="accent-underline">Spanish</span> is today.
          </h1>
          <p className="hero-sub mt-7">
            A 30-minute call to understand your product, team and timeline — and recommend an engagement, or none at all.
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
              <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-[6px]">QUALIFIER</div>
              <h3 className="mb-8">Start here.</h3>

              <div className="form-field">
                <label>Service of interest</label>
                <div className="radio-grid">
                  <RadioTile group="service" value="qa" label="AI Spanish QA Sprint" />
                  <RadioTile group="service" value="audit" label="Launch Readiness Audit" />
                  <RadioTile group="service" value="fractional" label="Fractional Lead" />
                  <RadioTile group="service" value="unsure" label="Not sure yet" />
                </div>
              </div>

              <div className="form-field">
                <label>Company size</label>
                <div className="radio-row">
                  <RadioTile group="size" value="50-150" label="50–150" />
                  <RadioTile group="size" value="150-500" label="150–500" />
                  <RadioTile group="size" value="500-1500" label="500–1,500" />
                  <RadioTile group="size" value="1500+" label="1,500+" />
                </div>
              </div>

              <div className="form-field">
                <label>Target variant of Spanish</label>
                <div className="radio-row">
                  <RadioTile group="variant" value="latam" label="LatAm neutral" />
                  <RadioTile group="variant" value="mx" label="Mexico" />
                  <RadioTile group="variant" value="es" label="Spain" />
                  <RadioTile group="variant" value="multi" label="Multiple" />
                </div>
              </div>

              <div className="form-field">
                <label>Urgency</label>
                <div className="radio-row">
                  <RadioTile group="urgency" value="pre-launch" label="Pre-launch" />
                  <RadioTile group="urgency" value="quarter" label="This quarter" />
                  <RadioTile group="urgency" value="half" label="This half" />
                  <RadioTile group="urgency" value="exploring" label="Exploring" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field"><label>Full name</label><input type="text" placeholder="Jane Doe" /></div>
                <div className="form-field"><label>Role</label><input type="text" placeholder="VP Product" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field"><label>Work email</label><input type="email" placeholder="jane@company.com" /></div>
                <div className="form-field"><label>Company</label><input type="text" placeholder="Company Inc." /></div>
              </div>

              <div className="form-field">
                <label>What's the situation, in one paragraph?</label>
                <textarea placeholder="e.g., We launched our AI tutor in Spanish last quarter. Support tickets mention confusion. We need a read on quality before expanding to Mexico." />
              </div>

              {submitted ? (
                <div className="w-full p-[18px] rounded-full bg-accent text-paper text-center font-body text-[15px] font-medium">
                  ✓ Request received — we'll reply within 24 hours
                </div>
              ) : (
                <button type="submit" className="btn btn-primary w-full justify-center" style={{ padding: 18 }}>
                  Request diagnostic call <span className="btn-arrow"></span>
                </button>
              )}
              <div className="font-mono text-[11px] text-ink-500 tracking-[0.06em] mt-4 text-center">
                WE RESPOND WITHIN 1 BUSINESS DAY
              </div>
            </form>

            {/* Aside */}
            <aside data-reveal className="static tablet:sticky tablet:top-[100px]">
              <div className="eyebrow">WHAT HAPPENS NEXT</div>
              <ol className="num-list mt-6">
                <li>
                  <div>
                    <h4>You submit</h4>
                    <div className="n-body">A short qualifier — nothing invasive. We need enough to know if we can help.</div>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>We reply within 24 hours</h4>
                    <div className="n-body">If there's a fit, we send a calendar link. If there isn't, we tell you — and often point elsewhere.</div>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>30-minute call</h4>
                    <div className="n-body">Senior-led. Founder on the call. We discuss your product, risks and the right next step.</div>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Scoped proposal</h4>
                    <div className="n-body">Within 3 business days. Clear scope, timeline, deliverables, price. No surprises.</div>
                  </div>
                </li>
              </ol>

              <div className="mt-10 p-6 bg-ink-900 text-paper rounded-xl">
                <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-[10px]">DIRECT</div>
                <div className="font-display text-[22px] tracking-[-0.01em] mb-1">hello@xpandia.co</div>
                <div className="text-ink-300 text-[14px]">For partnership and press inquiries.</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
