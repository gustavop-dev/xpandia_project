'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function CulturalIntelligencePage() {
  const t = useTranslations()
  const { culturalIntelligence: ci } = t

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{ci.hero.eyebrow}</div>
          <h1 className="hero-display text-[clamp(36px,4.5vw,64px)] max-w-[20ch]">
            {ci.hero.h1}
          </h1>
          <p className="hero-sub mt-8">
            {ci.hero.sub}
          </p>
          <p className="text-ink-600 text-[16px] mt-4 max-w-[64ch]">{ci.hero.supporting}</p>
          <div className="hero-ctas mt-8">
            <Link className="btn btn-primary" href="/contact">{ci.hero.primaryCta} <span className="btn-arrow"></span></Link>
            <a href="#services" className="btn btn-secondary">{ci.hero.secondaryCta}</a>
          </div>
        </div>
      </section>

      {/* Why ACI */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-12 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{ci.why.eyebrow}</div>
            <div>
              <h2 className="text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em] mb-6">
                {ci.why.headline}
              </h2>
              <p className="text-ink-600 text-[17px] leading-[1.6] max-w-[60ch]">
                {ci.why.body}
              </p>
              <div className="mt-6 p-4 bg-ink-50 border-l-2 border-accent rounded-r-md">
                <p className="text-ink-700 text-[15px] font-medium">{ci.why.callout}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Help Understand */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{ci.whatWeHelp.eyebrow}</div>
            <h2 className="head-title">{ci.whatWeHelp.headline}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-6 mt-12">
            {ci.whatWeHelp.items.map((item) => (
              <div key={item.title} className="p-5 bg-white rounded-lg border border-ink-100">
                <h3 className="font-display text-[17px] font-medium text-ink-900 mb-2">{item.title}</h3>
                <p className="text-[14px] text-ink-600 leading-[1.5]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Use */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="eyebrow mb-4">{ci.whenToUse.eyebrow}</div>
              <h2>{ci.whenToUse.headline}</h2>
            </div>
            <ul className="space-y-4">
              {ci.whenToUse.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-ink-700">
                  <span className="text-accent mt-1 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section id="services" className="bg-ink-900 text-paper">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow !text-ink-400 mb-4">{ci.coreServices.eyebrow}</div>
            <h2 className="head-title text-paper">{ci.coreServices.headline}</h2>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mt-12">
            {ci.coreServices.services.map((service) => (
              <div key={service.title} className="p-6 border border-white/10 rounded-xl">
                <h3 className="font-display text-[20px] font-medium text-paper mb-4">{service.title}</h3>
                <Link href="/contact" className="text-accent font-medium text-[14px] hover:underline">
                  {service.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{ci.methodology.eyebrow}</div>
            <h2 className="head-title">{ci.methodology.headline}</h2>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-5 gap-6 mt-12">
            {ci.methodology.steps.map((step) => (
              <div key={step.num} className="p-5 bg-white rounded-lg border border-ink-100">
                <div className="font-mono text-[12px] text-accent mb-3">{step.num}</div>
                <h3 className="font-display text-[16px] font-medium text-ink-900 mb-2">{step.title}</h3>
                <p className="text-[13px] text-ink-600 leading-[1.5]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">{ci.finalCta.eyebrow}</div>
          <h2 className="mt-5 text-[clamp(32px,4vw,56px)] leading-[1.08]">
            {ci.finalCta.headline}
          </h2>
          <p className="lede mt-6">{ci.finalCta.body}</p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{ci.finalCta.primaryCta} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
