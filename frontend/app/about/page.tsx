'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function AboutPage() {
  const t = useTranslations()
  const { about } = t

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{about.hero.eyebrow}</div>
          <h1 className="hero-display text-[clamp(36px,4.5vw,64px)] max-w-[22ch]">
            {about.hero.h1}
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            {about.hero.sub}
          </p>
          <p className="text-ink-600 text-[16px] mt-4 max-w-[64ch]">{about.hero.supporting}</p>
          <div className="hero-ctas mt-8">
            <Link className="btn btn-primary" href="/contact">{about.hero.primaryCta} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-12 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{about.whoWeAre.eyebrow}</div>
            <div>
              <h2 className="text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em] mb-6">
                {about.whoWeAre.headline}
              </h2>
              <p className="text-ink-600 text-[17px] leading-[1.6] max-w-[60ch]">
                {about.whoWeAre.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Xpandia */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{about.whyXpandia.eyebrow}</div>
            <h2 className="head-title">{about.whyXpandia.headline}</h2>
            <p className="head-lede">{about.whyXpandia.intro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-6 mt-12">
            {about.whyXpandia.values.map((value) => (
              <div key={value.title} className="p-5 bg-white rounded-lg border border-ink-100">
                <h3 className="font-display text-[17px] font-medium text-ink-900 mb-2">{value.title}</h3>
                <p className="text-[14px] text-ink-600 leading-[1.5]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-16 items-start">
            <div>
              <div className="aspect-[4/5] rounded-lg relative overflow-hidden bg-ink-900">
                <Image src="/assets/founder.jpg" alt={about.founder.name} fill loading="lazy" className="object-cover grayscale contrast-[1.05]" sizes="(max-width: 900px) 100vw, 35vw" />
                <div className="absolute top-6 left-6 flex items-center gap-[5px] z-[2]">
                  <div className="w-3 h-px bg-white/55"></div>
                  <div className="w-3 h-px bg-white/75"></div>
                  <div className="w-3 h-px bg-white/95"></div>
                </div>
                <div className="absolute bottom-16 right-0 w-[40%] h-[3px] bg-accent"></div>
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5 flex justify-between font-mono text-[10px] tracking-[0.14em] text-white/80" style={{ background: 'linear-gradient(180deg, transparent, rgba(15,20,25,0.85))' }}>
                  <span>FOUNDER</span>
                  <span>XPANDIA</span>
                </div>
              </div>
              <div className="mt-5">
                <div className="font-display text-[18px] font-medium text-ink-900">{about.founder.name}</div>
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.08em] mt-1">{about.founder.role}</div>
              </div>
            </div>
            <div>
              <div className="eyebrow">{about.founder.eyebrow}</div>
              <h2 className="mt-5 mb-6">{about.founder.headline}</h2>
              <p className="text-ink-600 text-[17px] leading-[1.6] mb-6">
                {about.founder.body}
              </p>
              <p className="text-ink-600 text-[15px] leading-[1.6]">
                {about.founder.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-16 items-start">
            <div>
              <div className="eyebrow !text-ink-400">{about.howWeWork.eyebrow}</div>
              <h2 className="mt-5 text-paper">{about.howWeWork.headline}</h2>
            </div>
            <ol className="num-list">
              {about.howWeWork.steps.map((step) => (
                <li key={step.num} style={{ borderTopColor: 'rgba(255,255,255,0.1)' }}>
                  <div>
                    <div className="font-mono text-[12px] text-accent mb-2">{step.num}</div>
                    <h4 className="text-paper">{step.title}</h4>
                    <div className="n-body !text-ink-300">{step.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Starting Points */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{about.startingPoints.eyebrow}</div>
            <h2 className="head-title">{about.startingPoints.headline}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-6 mt-12">
            {about.startingPoints.items.map((item) => (
              <div key={item.title} className="p-5 border border-ink-150 rounded-lg">
                <h3 className="font-display text-[17px] font-medium text-ink-900 mb-1">{item.title}</h3>
                <div className="font-mono text-[12px] text-accent mb-3">{item.price}</div>
                <p className="text-[14px] text-ink-600 leading-[1.5]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="eyebrow mb-8">{about.trustSignals.eyebrow}</div>
          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-6">
            {about.trustSignals.items.map((item) => (
              <div key={item.label} className="p-5 bg-white rounded-lg border border-ink-100">
                <div className="font-display text-[24px] font-medium text-ink-900 mb-2">{item.label}</div>
                <p className="text-[14px] text-ink-600 leading-[1.5]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">{about.finalCta.eyebrow}</div>
          <h2 className="mt-5 text-[clamp(32px,4vw,56px)] leading-[1.08]">
            {about.finalCta.headline}
          </h2>
          <p className="lede mt-6">{about.finalCta.body}</p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{about.finalCta.primaryCta} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
