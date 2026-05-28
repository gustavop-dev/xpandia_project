'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function HomePage() {
  const t = useTranslations()
  const { home } = t

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-9">{home.hero.eyebrow}</div>
          <h1 className="hero-display">
            {home.hero.h1}
          </h1>
          <p className="hero-sub">
            {home.hero.sub}
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">{home.hero.primaryCta} <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/services">{home.hero.secondaryCta}</Link>
          </div>
          <div className="mt-24 pt-7 border-t border-ink-150 grid grid-cols-2 tablet:grid-cols-4 gap-8">
            {home.proofBar.map((item) => (
              <div key={item.label}>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-[10px]">{item.label}</div>
                <div className="text-[14px] leading-[1.45] text-ink-700">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Xpandia */}
      <section className="tight pt-10">
        <div className="container">
          <div data-reveal className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{home.whyXpandia.eyebrow}</div>
            <div>
              <p className="display max-w-[28ch]" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 28 }}>
                {home.whyXpandia.headline}
              </p>
              <p className="text-ink-600 text-[17px] max-w-[64ch] leading-[1.6]">
                {home.whyXpandia.body}
              </p>
              <div className="mt-6 p-4 bg-ink-50 border-l-2 border-accent rounded-r-md">
                <p className="text-ink-700 text-[15px] font-medium">{home.whyXpandia.callout}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{home.servicesOverview.eyebrow}</div>
            <h2 className="head-title">{home.servicesOverview.headline}</h2>
            <p className="head-lede">{home.servicesOverview.intro}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12">
            {home.servicesOverview.cards.map((card) => (
              <Link key={card.href} className="block p-6 border border-ink-150 rounded-xl hover:border-ink-300 hover:shadow-sm transition-all" href={card.href}>
                <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-6">
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.1em] text-accent mb-3">{card.num}</div>
                    <h3 className="font-display text-[24px] font-medium tracking-[-0.01em] text-ink-900 mb-2">{card.title}</h3>
                    <p className="text-[15px] text-ink-600 italic">{card.tagline}</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[15px] text-ink-700 leading-[1.6]">{card.description}</p>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.1em] text-ink-500 mb-1">BEST FOR</div>
                      <p className="text-[14px] text-ink-600">{card.bestFor}</p>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.1em] text-ink-500 mb-1">CORE SERVICES</div>
                      <p className="text-[14px] text-ink-700 font-medium">{card.coreServices}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-ink-100">
                      <span className="text-[13px] text-ink-500">{card.whatYouGet}</span>
                      <span className="text-accent font-medium text-[14px]">{card.cta} →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow !text-ink-400">{home.method.eyebrow}</div>
              <h2 style={{ marginTop: 24 }}>{home.method.headline}</h2>
              <p className="text-ink-300 max-w-[38ch]" style={{ marginTop: 24 }}>{home.method.intro}</p>
            </div>
            <ol className="num-list">
              {home.method.steps.map(s => (
                <li key={s.num} style={{ borderTopColor: 'rgba(255,255,255,0.1)' }}>
                  <div>
                    <div className="font-mono text-[12px] text-accent mb-2">{s.num}</div>
                    <h4>{s.title}</h4>
                    <div className="n-body !text-ink-300">{s.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{home.whatYouGet.eyebrow}</div>
            <h2 className="head-title">{home.whatYouGet.headline}</h2>
            <p className="head-lede">{home.whatYouGet.intro}</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mt-12">
            {home.whatYouGet.cards.map((card) => (
              <div key={card.title} className="p-6 border border-ink-150 rounded-xl">
                <h3 className="font-display text-[18px] font-medium tracking-[-0.01em] text-ink-900 mb-3">{card.title}</h3>
                <p className="text-[15px] text-ink-600 leading-[1.6]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="section-head mb-10">
            <div className="eyebrow mb-4">{home.whoWeWorkWith.eyebrow}</div>
            <h2 className="head-title">{home.whoWeWorkWith.headline}</h2>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-6">
            {home.whoWeWorkWith.teams.map((team) => (
              <div key={team.title} className="p-5 bg-white rounded-lg border border-ink-100">
                <h3 className="font-display text-[16px] font-medium text-ink-900 mb-2">{team.title}</h3>
                <p className="text-[14px] text-ink-600 leading-[1.5]">{team.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models Ecosystem */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{home.aiModels.eyebrow}</div>
            <h2 className="head-title">{home.aiModels.headline}</h2>
            <p className="head-lede">{home.aiModels.intro}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {home.aiModels.logos.map((logo) => (
              <span key={logo} className="px-4 py-2 bg-ink-50 rounded-full text-[13px] text-ink-600 font-medium">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow">{home.finalCta.eyebrow}</div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(32px,4vw,56px)', lineHeight: 1.1 }}>
            {home.finalCta.headline}
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            {home.finalCta.body}
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{home.finalCta.primaryCta} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
