'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function ServicesPage() {
  const t = useTranslations()
  const { services } = t

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{services.hero.eyebrow}</div>
          <h1 className="hero-display text-[clamp(40px,5vw,72px)] max-w-[22ch]">
            {services.hero.h1}
          </h1>
          <p className="hero-sub mt-8">
            {services.hero.sub}
          </p>
          <p className="text-ink-500 text-[15px] mt-4">{services.hero.supporting}</p>
          <div className="hero-ctas mt-8">
            <Link className="btn btn-primary" href="/contact">{services.hero.primaryCta} <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">{services.hero.secondaryCta}</Link>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{services.choosePath.eyebrow}</div>
            <h2 className="head-title">{services.choosePath.headline}</h2>
            <p className="head-lede">{services.choosePath.intro}</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mt-12">
            {services.choosePath.cards.map((card) => (
              <div key={card.title} className="p-6 border border-ink-150 rounded-xl flex flex-col">
                <h3 className="font-display text-[20px] font-medium tracking-[-0.01em] text-ink-900 mb-3">{card.title}</h3>
                <p className="text-accent font-medium text-[14px] mb-4">{card.selection}</p>
                <p className="text-[14px] text-ink-600 leading-[1.6] mb-4">{card.description}</p>
                <div className="mb-4">
                  <div className="font-mono text-[10px] tracking-[0.1em] text-ink-500 mb-2">BEST WHEN</div>
                  <ul className="space-y-2">
                    {card.bestWhen.map((item, i) => (
                      <li key={i} className="text-[13px] text-ink-600 flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-4 border-t border-ink-100">
                  <Link href={card.href} className="text-accent font-medium text-[14px] hover:underline">
                    {card.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow !text-ink-400 mb-4">{services.coreServices.eyebrow}</div>
            <h2 className="head-title text-paper">{services.coreServices.headline}</h2>
            <p className="head-lede !text-ink-300">{services.coreServices.intro}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-12">
            {services.coreServices.services.map((service) => (
              <div key={service.title} className="p-6 border border-white/10 rounded-xl">
                <h3 className="font-display text-[22px] font-medium tracking-[-0.01em] text-paper mb-4">{service.title}</h3>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.1em] text-ink-400 mb-2">BEST FOR</div>
                    <p className="text-[14px] text-ink-300 leading-[1.6]">{service.bestFor}</p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.1em] text-ink-400 mb-2">OUTCOME</div>
                    <p className="text-[14px] text-ink-300 leading-[1.6]">{service.outcome}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-mono text-[10px] tracking-[0.1em] text-ink-400 mb-2">DELIVERABLES</div>
                  <p className="text-[14px] text-ink-200">{service.deliverables}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[13px] text-ink-400">{service.startsAt}</span>
                  <Link href="/contact" className="text-accent font-medium text-[14px] hover:underline">
                    {service.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{services.howToChoose.eyebrow}</div>
            <h2 className="head-title">{services.howToChoose.headline}</h2>
          </div>
          <div className="mt-10 bg-white border border-ink-150 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1.5fr] px-6 py-4 bg-ink-900 text-paper font-mono text-[11px] tracking-[0.1em]">
              <div>NEED</div>
              <div>CHOOSE</div>
              <div>OUTCOME</div>
            </div>
            {services.howToChoose.rows.map((row, i) => (
              <div key={i} className="grid grid-cols-[2fr_1fr_1.5fr] px-6 py-5 border-t border-ink-150 text-[14px]">
                <div className="text-ink-700">{row.need}</div>
                <div className="text-accent font-medium">{row.choose}</div>
                <div className="text-ink-600">{row.outcome}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-ink-600 max-w-[80ch]">{services.howToChoose.supporting}</p>
        </div>
      </section>

      {/* Engagement Model */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-16 items-start">
            <div>
              <div className="eyebrow mb-4">{services.engagementModel.eyebrow}</div>
              <h2>{services.engagementModel.headline}</h2>
            </div>
            <ol className="num-list">
              {services.engagementModel.steps.map((step) => (
                <li key={step.num} className="border-t border-ink-150 py-6">
                  <div>
                    <div className="font-mono text-[12px] text-accent mb-2">{step.num}</div>
                    <h4 className="font-display text-[18px] font-medium text-ink-900 mb-2">{step.title}</h4>
                    <p className="text-[15px] text-ink-600 leading-[1.6]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">{services.finalCta.eyebrow}</div>
          <h2 className="mt-5 text-[clamp(32px,4vw,56px)] leading-[1.08]">
            {services.finalCta.headline}
          </h2>
          <p className="lede mt-6">{services.finalCta.body}</p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{services.finalCta.primaryCta} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
