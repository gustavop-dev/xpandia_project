import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localizedAlternates } from '@/lib/seo/alternates'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'aci.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
    alternates: localizedAlternates('/services/applied-cultural-intelligence'),
  }
}

export default async function AppliedCulturalIntelligencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('aci')

  const coverageCards = t.raw('whatWeUnderstand.cards') as Array<{ title: string; desc: string }>
  const whenToUseItems = t.raw('whenToUse.items') as string[]
  const coreSolutionCards = t.raw('coreSolutions.cards') as Array<{
    name: string
    bestFor?: string
    outcome?: string
    canIncludeLabel?: string
    canInclude?: string[]
    deliverables?: string[]
    investment?: string
    timeline?: string
    cta: string
  }>
  const methodologySteps = t.raw('methodology.steps') as Array<{ title: string; body: string }>

  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="flex gap-3 mb-7">
            <Link href="/services" className="font-mono text-[11px] tracking-[0.1em] text-ink-500">
              {t('breadcrumb.allServices')}
            </Link>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-500">{t('breadcrumb.current')}</span>
          </div>
          <div className="eyebrow mb-8">{t('hero.eyebrow')}</div>
          <h1 className="hero-display text-[clamp(44px,5.6vw,84px)] max-w-[18ch]">
            {t('hero.h1')} <span className="accent-underline">{t('hero.h1Accent')}</span>{t('hero.h1End')}
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            {t('hero.subheadline')}
          </p>
          <p className="mt-5 text-ink-600 text-[17px] max-w-[64ch]">
            {t('hero.body')}
          </p>
          <div className="hero-ctas mt-9">
            <Link className="btn btn-primary" href="/contact">{t('hero.ctaPrimary')} <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">{t('hero.ctaSecondary')}</Link>
          </div>
        </div>
      </section>

      {/* 2. Positioning */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{t('positioning.eyebrow')}</div>
            <div>
              <p className="display text-[clamp(26px,2.8vw,40px)] leading-[1.08] tracking-[-0.02em] max-w-[34ch] mb-6">
                {t('positioning.headline')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[64ch] mb-5">
                {t('positioning.body1')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[64ch] mb-5">
                {t('positioning.body2')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[64ch] mb-7">
                {t('positioning.body3')}
              </p>
              <div className="p-7 bg-white border-l-2 border-primary rounded-r-md max-w-[64ch]">
                <p className="text-ink-700 text-[17px] leading-[1.5]">
                  {t('positioning.supporting')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What ACI Covers */}
      <section>
        <div className="container">
          <div className="section-head section-head--no-rule" style={{ gridTemplateColumns: '1fr' }}>
            <div className="eyebrow mb-5">{t('whatWeUnderstand.eyebrow')}</div>
            <h2 className="head-title max-w-[30ch]">{t('whatWeUnderstand.headline')}</h2>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {coverageCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md transition-all hover:border-primary hover:shadow-[0_4px_20px_rgba(15,20,25,0.06)]">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. When to Use */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div>
              <div className="eyebrow mb-5">{t('whenToUse.eyebrow')}</div>
              <p className="display text-[clamp(24px,2.6vw,36px)] leading-[1.1] tracking-[-0.02em] max-w-[26ch]">
                {t('whenToUse.headline')}
              </p>
            </div>
            <ul className="checklist checklist-flush">
              {whenToUseItems.map(item => (
                <li key={item}><span className="chk"></span><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Core solutions */}
      <section>
        <div className="container">
          <div className="eyebrow mb-5">{t('coreSolutions.eyebrow')}</div>
          <div className="section-head section-head--no-rule" style={{ gridTemplateColumns: '1fr' }}>
            <h2 className="head-title max-w-[28ch]">{t('coreSolutions.headline')}</h2>
          </div>
          <div data-stagger className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mt-12 items-start">
            {coreSolutionCards.map((card, i) => (
              <div key={card.name} data-illuminate className="flex flex-col p-8 bg-white border border-ink-150 rounded-lg">
                <div data-card-num className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.15] text-ink-900">
                  {card.name}
                </h3>

                {card.bestFor && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1.5">{t('coreSolutions.bestForLabel')}</div>
                    <p className="text-ink-600 text-[15px] leading-[1.5]">{card.bestFor}</p>
                  </div>
                )}

                {card.outcome && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1.5">{t('coreSolutions.outcomeLabel')}</div>
                    <p className="text-ink-600 text-[15px] leading-[1.5]">{card.outcome}</p>
                  </div>
                )}

                {card.canInclude && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1.5">{card.canIncludeLabel}</div>
                    <ul className="space-y-1 text-ink-600 text-[14.5px] leading-[1.5]">
                      {card.canInclude.map(item => (
                        <li key={item} className="flex gap-2.5">
                          <span className="text-accent mt-px">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {card.deliverables && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1.5">{t('coreSolutions.deliverablesLabel')}</div>
                    <ul className="space-y-1 text-ink-600 text-[14.5px] leading-[1.5]">
                      {card.deliverables.map(d => (
                        <li key={d} className="flex gap-2.5">
                          <span className="text-accent mt-px">·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(card.investment || card.timeline) && (
                  <div className="mt-6 pt-5 border-t border-ink-150 flex flex-wrap gap-x-10 gap-y-3">
                    {card.investment && (
                      <div>
                        <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1">{t('coreSolutions.investmentLabel')}</div>
                        <p className="text-ink-900 text-[15px] font-medium">{card.investment}</p>
                      </div>
                    )}
                    {card.timeline && (
                      <div>
                        <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1">{t('coreSolutions.timelineLabel')}</div>
                        <p className="text-ink-600 text-[15px]">{card.timeline}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <Link href="/contact" className="btn btn-primary btn-small">
                    {card.cta} <span className="btn-arrow"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Methodology */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head section-head--no-rule" style={{ gridTemplateColumns: '1fr' }}>
            <div className="eyebrow mb-5">{t('methodology.eyebrow')}</div>
            <h2 className="head-title max-w-[30ch]">
              {t.rich('methodology.headline', { u: chunks => <span className="accent-underline">{chunks}</span> })}
            </h2>
          </div>
          <ol className="num-list num-list-spotlight mt-12">
            {methodologySteps.map(s => (
              <li key={s.title}>
                <div>
                  <h4>{s.title}</h4>
                  <div className="n-body">{s.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">{t('finalCta.eyebrow')}</div>
          <h2 className="mt-5 text-[clamp(40px,5vw,72px)] leading-none">
            {t('finalCta.headline')}
          </h2>
          <p className="lede mt-7">
            {t('finalCta.body')}
          </p>
          <div className="hero-ctas mt-10">
            {t('finalCta.ctaPrimary') && <Link className="btn btn-primary" href="/contact">{t('finalCta.ctaPrimary')} <span className="btn-arrow"></span></Link>}
            {t('finalCta.ctaSecondary') && <Link className="btn btn-secondary" href="/contact">{t('finalCta.ctaSecondary')}</Link>}
          </div>
        </div>
      </section>
    </main>
  )
}
