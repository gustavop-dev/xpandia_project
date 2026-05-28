'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function LanguageAssurancePage() {
  const t = useTranslations()
  const { languageAssurance: la } = t

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{la.hero.eyebrow}</div>
          <h1 className="hero-display text-[clamp(36px,4.5vw,64px)] max-w-[20ch]">
            {la.hero.h1}
          </h1>
          <p className="hero-sub mt-8">
            {la.hero.sub}
          </p>
          <p className="text-ink-600 text-[16px] mt-4 max-w-[64ch]">{la.hero.supporting}</p>
          <div className="hero-ctas mt-8">
            <Link className="btn btn-primary" href="/contact">{la.hero.primaryCta} <span className="btn-arrow"></span></Link>
            <a href="#methodology" className="btn btn-secondary">{la.hero.secondaryCta}</a>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {la.hero.proofPoints.map((point) => (
              <span key={point} className="px-4 py-2 bg-ink-50 rounded-full text-[13px] text-ink-600">{point}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Language Assurance */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-12 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{la.why.eyebrow}</div>
            <div>
              <h2 className="text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em] mb-6">
                {la.why.headline}
              </h2>
              <p className="text-ink-600 text-[17px] leading-[1.6] max-w-[60ch]">
                {la.why.body}
              </p>
              <div className="mt-6 p-4 bg-ink-50 border-l-2 border-accent rounded-r-md">
                <p className="text-ink-700 text-[15px] font-medium">{la.why.callout}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Evaluate */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{la.whatWeEvaluate.eyebrow}</div>
            <h2 className="head-title">{la.whatWeEvaluate.headline}</h2>
            <p className="head-lede">{la.whatWeEvaluate.intro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-6 mt-12">
            {la.whatWeEvaluate.cards.map((card) => (
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
              <div className="eyebrow mb-4">{la.whenToUse.eyebrow}</div>
              <h2>{la.whenToUse.headline}</h2>
            </div>
            <ul className="space-y-4">
              {la.whenToUse.items.map((item, i) => (
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
            <div className="eyebrow !text-ink-400 mb-4">{la.coreServices.eyebrow}</div>
            <h2 className="head-title text-paper">{la.coreServices.headline}</h2>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mt-12">
            {la.coreServices.services.map((service) => (
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

      {/* Custom Modules */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="eyebrow mb-4">{la.modules.eyebrow}</div>
              <h2>{la.modules.headline}</h2>
              <p className="text-ink-600 text-[15px] mt-4">{la.modules.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {la.modules.list.map((module) => (
                <span key={module} className="px-4 py-2 bg-ink-50 border border-ink-150 rounded-full text-[13px] text-ink-700">{module}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{la.methodology.eyebrow}</div>
            <h2 className="head-title">{la.methodology.headline}</h2>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-5 gap-6 mt-12">
            {la.methodology.steps.map((step) => (
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
          <div className="eyebrow">{la.finalCta.eyebrow}</div>
          <h2 className="mt-5 text-[clamp(32px,4vw,56px)] leading-[1.08]">
            {la.finalCta.headline}
          </h2>
          <p className="lede mt-6">{la.finalCta.body}</p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{la.finalCta.primaryCta} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
