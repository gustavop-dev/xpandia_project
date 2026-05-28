'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function ExperienceRepairPage() {
  const t = useTranslations()
  const { experienceRepair: er } = t

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{er.hero.eyebrow}</div>
          <h1 className="hero-display text-[clamp(36px,4.5vw,64px)] max-w-[20ch]">
            {er.hero.h1}
          </h1>
          <p className="hero-sub mt-8">
            {er.hero.sub}
          </p>
          <p className="text-ink-600 text-[16px] mt-4 max-w-[64ch]">{er.hero.supporting}</p>
          <div className="hero-ctas mt-8">
            <Link className="btn btn-primary" href="/contact">{er.hero.primaryCta} <span className="btn-arrow"></span></Link>
            <a href="#methodology" className="btn btn-secondary">{er.hero.secondaryCta}</a>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {er.hero.proofPoints.map((point) => (
              <div key={point.title} className="p-4 bg-ink-50 rounded-lg">
                <h3 className="font-display text-[15px] font-medium text-ink-900 mb-1">{point.title}</h3>
                <p className="text-[13px] text-ink-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-12 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{er.positioning.eyebrow}</div>
            <div>
              <h2 className="text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em] mb-6">
                {er.positioning.headline}
              </h2>
              <p className="text-ink-600 text-[17px] leading-[1.6] max-w-[60ch]">
                {er.positioning.body}
              </p>
              <div className="mt-6 p-4 bg-ink-50 border-l-2 border-accent rounded-r-md">
                <p className="text-ink-700 text-[15px] font-medium">{er.positioning.callout}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Adapt */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{er.whatWeAdapt.eyebrow}</div>
            <h2 className="head-title">{er.whatWeAdapt.headline}</h2>
            <p className="head-lede">{er.whatWeAdapt.intro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-6 mt-12">
            {er.whatWeAdapt.cards.map((card) => (
              <div key={card.title} className="p-5 bg-white rounded-lg border border-ink-100">
                <h3 className="font-display text-[17px] font-medium text-ink-900 mb-2">{card.title}</h3>
                <p className="text-[14px] text-ink-600 leading-[1.5]">{card.description}</p>
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
              <div className="eyebrow mb-4">{er.whenToUse.eyebrow}</div>
              <h2>{er.whenToUse.headline}</h2>
            </div>
            <ul className="space-y-4">
              {er.whenToUse.items.map((item, i) => (
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
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow !text-ink-400 mb-4">{er.coreServices.eyebrow}</div>
            <h2 className="head-title text-paper">{er.coreServices.headline}</h2>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mt-12">
            {er.coreServices.services.map((service) => (
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
      <section id="methodology" className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{er.methodology.eyebrow}</div>
            <h2 className="head-title">{er.methodology.headline}</h2>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-5 gap-6 mt-12">
            {er.methodology.steps.map((step) => (
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
          <div className="eyebrow">{er.finalCta.eyebrow}</div>
          <h2 className="mt-5 text-[clamp(32px,4vw,56px)] leading-[1.08]">
            {er.finalCta.headline}
          </h2>
          <p className="lede mt-6">{er.finalCta.body}</p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{er.finalCta.primaryCta} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
