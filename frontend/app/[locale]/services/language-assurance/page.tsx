import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { localizedAlternates } from '@/lib/seo/alternates'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'language-assurance.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
    alternates: localizedAlternates('/services/language-assurance'),
  }
}

export default async function LanguageAssurancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('language-assurance')

  const heroProofPoints = t.raw('hero.proofPoints') as Array<{ title: string; desc: string }>
  const coverageCards = t.raw('whatWeEvaluate.cards') as Array<{ title: string; desc: string }>
  const whenToUseItems = t.raw('whenToUse.items') as string[]
  const criteriaCards = t.raw('qualityCriteria.cards') as Array<{ n: string; title: string; desc: string }>
  const engagementItems = t.raw('engagements.items') as Array<{
    name: string
    tagline: string | null
    bestFor: string
    outcome: string
    deliverablesLabel: string
    deliverables: string[]
    extras: Array<{ label: string; body: string | null; items: string[] | null }>
    price: string
    timeline: string
    note?: string
    cta: string
  }>
  const methodologySteps = t.raw('methodology.steps') as Array<{ title: string; body: string }>
  const deliverableCards = t.raw('deliverables.cards') as Array<{ title: string; desc: string }>
  const scorecardCriteria = t.raw('scorecardPreview.criteria') as string[]
  const scorecardRows = t.raw('scorecardPreview.rows') as Array<{
    label: string
    width: string
    val: string
    accent?: boolean
    dim?: boolean
  }>
  const audienceCards = t.raw('builtFor.cards') as Array<{ title: string; desc: string }>
  const pricingCards = t.raw('pricing.cards') as Array<{ title: string; price: string; desc: string }>
  const faqItems = t.raw('faq.items') as Array<{ q: string; a: string }>

  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="flex gap-3 mb-7">
            <Link href="/services" className="font-mono text-[11px] tracking-[0.1em] text-ink-500">{t('breadcrumb.allServices')}</Link>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-500">{t('breadcrumb.current')}</span>
          </div>
          <div className="eyebrow mb-8">{t('hero.eyebrow')}</div>
          <h1 className="hero-display text-[clamp(48px,6vw,92px)] max-w-[16ch]">
            {t('hero.h1')} <span className="accent-underline">{t('hero.h1Accent')}</span> {t('hero.h1End')}
          </h1>
          <p className="hero-sub mt-8">
            {t('hero.subheadline')}
          </p>
          <p className="text-ink-600 text-[17px] max-w-[62ch] mt-5">
            {t('hero.body')}
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">{t('hero.ctaPrimary')} <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">{t('hero.ctaSecondary')}</Link>
          </div>

          <div data-stagger className="mt-20 pt-6 border-t border-ink-150 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {heroProofPoints.map(p => (
              <div key={p.title}>
                <div className="font-display text-[20px] font-medium tracking-[-0.012em]">{p.title}</div>
                <div className="text-ink-600 text-[14px] leading-[1.5] mt-2">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual band */}
      <section className="tight pt-0 pb-0">
        <div className="container">
          <div className="relative aspect-[16/9] tablet:aspect-[24/7] rounded-lg overflow-hidden bg-ink-900">
            <Image src="/assets/photo-qa.jpg" alt="" fill loading="lazy" className="object-cover grayscale contrast-[1.05]" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,20,25,0.3) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.85) 100%)' }}></div>
            <div className="absolute bottom-8 right-8 font-mono text-[11px] tracking-[0.14em] text-white/85 text-right">
              <div className="mb-[6px]">{t('photoBand.line1')}</div>
              <div className="text-accent text-[14px] tracking-[0.08em]">{t('photoBand.line2')}</div>
            </div>
            <div className="absolute bottom-0 left-0 w-[34%] h-[3px] bg-accent"></div>
          </div>
        </div>
      </section>

      {/* 2. Problem / Positioning */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{t('positioning.eyebrow')}</div>
            <div>
              <p className="display text-[clamp(26px,2.8vw,40px)] leading-[1.08] tracking-[-0.02em] max-w-[28ch] mb-6">
                {t('positioning.headline')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-5">
                {t('positioning.body1')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-5">
                {t('positioning.body2')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-7">
                {t('positioning.body3')}
              </p>
              <div className="p-7 bg-ink-50 border-l-2 border-primary rounded-r-md">
                <p className="text-ink-700 text-[17px] leading-[1.5]">
                  {t('positioning.callout')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What it covers */}
      <section className="tight">
        <div className="container">
          <div className="eyebrow mb-3">{t('whatWeEvaluate.eyebrow')}</div>
          <div className="section-head">
            <h2 className="head-title">{t('whatWeEvaluate.headline')}</h2>
            <p className="head-lede">{t('whatWeEvaluate.intro')}</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {coverageCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. When to use */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-12 items-start">
            <div>
              <div className="eyebrow mb-3">{t('whenToUse.eyebrow')}</div>
              <h2 className="head-title">{t('whenToUse.headline')}</h2>
            </div>
            <ul className="checklist">
              {whenToUseItems.map(item => (
                <li key={item}><span className="chk"></span><span className="text-ink-700">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Core evaluation criteria — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="eyebrow no-bar !text-ink-400 mb-3">{t('qualityCriteria.eyebrow')}</div>
          <div className="section-head" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="head-title text-paper">{t('qualityCriteria.headline')}</h2>
            <p className="head-lede text-ink-300">{t('qualityCriteria.intro')}</p>
          </div>
          <div data-stagger className="grid grid-cols-2 tablet:grid-cols-4 gap-px mt-12 bg-white/[0.08]">
            {criteriaCards.map(c => (
              <div key={c.n} className="bg-ink-900 px-6 py-8">
                <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-3">{c.n}</div>
                <div className="font-display text-[22px] tracking-[-0.012em] mb-2">{c.title}</div>
                <div className="text-[13.5px] text-ink-300 leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Core engagements */}
      <section>
        <div className="container">
          <div className="eyebrow mb-3">{t('engagements.eyebrow')}</div>
          <div className="section-head">
            <h2 className="head-title">{t('engagements.headline')}</h2>
            <p className="head-lede">{t('engagements.intro')}</p>
          </div>
          <div className="flex flex-col gap-5 mt-12">
            {engagementItems.map((e, i) => (
              <div key={e.name} className="p-8 tablet:p-10 bg-white border border-ink-150 rounded-lg">
                <div className="grid grid-cols-1 tablet:grid-cols-[1.4fr_2fr] gap-8 tablet:gap-12">
                  <div>
                    <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-3">{`0${i + 1}`} / {t('engagements.engagementLabel')}</div>
                    <h3 className="font-display text-[clamp(24px,2.4vw,32px)] font-medium tracking-[-0.02em] leading-[1.1] mb-2">{e.name}</h3>
                    {e.tagline && <p className="text-ink-600 text-[16px] italic mb-4">{e.tagline}</p>}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="tag accent">{e.price}</span>
                      <span className="tag">{e.timeline}</span>
                    </div>
                    <div className="mt-6">
                      <Link className="btn btn-secondary btn-small" href="/contact">{e.cta}</Link>
                    </div>
                  </div>
                  <div>
                    <div className="mb-5">
                      <div className="eyebrow no-bar text-[10px] mb-2">{t('engagements.bestForLabel')}</div>
                      <p className="text-ink-600 text-[15px] leading-[1.5]">{e.bestFor}</p>
                    </div>
                    <div className="mb-5">
                      <div className="eyebrow no-bar text-[10px] mb-2">{t('engagements.outcomeLabel')}</div>
                      <p className="text-ink-600 text-[15px] leading-[1.5]">{e.outcome}</p>
                    </div>
                    {e.extras.map(ex => (
                      <div key={ex.label} className="mb-5">
                        <div className="eyebrow no-bar text-[10px] mb-2">{ex.label.toUpperCase()}</div>
                        {ex.body && <p className="text-ink-600 text-[15px] leading-[1.5]">{ex.body}</p>}
                        {ex.items && (
                          <ul className="mt-1 space-y-1.5">
                            {ex.items.map(it => (
                              <li key={it} className="text-ink-600 text-[15px] leading-[1.5] flex gap-2">
                                <span className="text-primary mt-[2px]">•</span><span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                    <div>
                      <div className="eyebrow no-bar text-[10px] mb-3">{e.deliverablesLabel.toUpperCase()}</div>
                      <ul className="checklist">
                        {e.deliverables.map(d => (
                          <li key={d} className="!py-[10px] !text-[15px]"><span className="chk"></span><span className="text-ink-700">{d}</span></li>
                        ))}
                      </ul>
                    </div>
                    {e.note && (
                      <p className="text-ink-500 text-[13px] leading-[1.5] mt-5">{e.note}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Methodology */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow mb-3">{t('methodology.eyebrow')}</div>
              <h2 className="head-title">{t('methodology.headline')}</h2>
              <p className="text-ink-600 max-w-[38ch] mt-6">{t('methodology.intro')}</p>
            </div>
            <ol className="num-list">
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
        </div>
      </section>

      {/* 8. Deliverables */}
      <section>
        <div className="container">
          <div className="eyebrow mb-3">{t('deliverables.eyebrow')}</div>
          <div className="section-head">
            <h2 className="head-title">{t('deliverables.headline')}</h2>
            <p className="head-lede">{t('deliverables.intro')}</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {deliverableCards.map(d => (
              <div key={d.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{d.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scorecard preview */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div>
              <div className="eyebrow">{t('scorecardPreview.eyebrow')}</div>
              <h2 style={{ marginTop: 24 }}>{t('scorecardPreview.headline')}</h2>
              <p className="lede" style={{ marginTop: 24 }}>{t('scorecardPreview.body')}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {scorecardCriteria.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="scorecard" aria-hidden="true">
              <div className="scorecard-head">
                <div className="scorecard-title">{t('scorecardPreview.scorecardTitle')}</div>
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.06em]">{t('scorecardPreview.scorecardSample')}</div>
              </div>
              {scorecardRows.map(r => (
                <div key={r.label} className="scorecard-row">
                  <div className="scorecard-label">{r.label}</div>
                  <div className={`scorecard-bar${r.accent ? ' accent' : ''}`}>
                    <span style={{ width: r.width, ...(r.dim ? { background: '#4A5259' } : {}) }}></span>
                  </div>
                  <div className="scorecard-value">{r.val}</div>
                </div>
              ))}
              <div className="mt-[18px] pt-4 border-t border-ink-150 text-[11px] text-ink-500 leading-[1.5]">
                {t('scorecardPreview.scorecardFooter')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Built for */}
      <section className="tight">
        <div className="container">
          <div className="eyebrow mb-3">{t('builtFor.eyebrow')}</div>
          <div className="section-head">
            <h2 className="head-title">{t('builtFor.headline')}</h2>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {audienceCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pricing */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="eyebrow mb-3">{t('pricing.eyebrow')}</div>
          <div className="section-head">
            <h2 className="head-title">{t('pricing.headline')}</h2>
            <p className="head-lede">{t('pricing.intro')}</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {pricingCards.map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md flex flex-col">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-1">{c.title}</div>
                <div className="font-mono text-[13px] text-accent tracking-[0.04em] mb-3">{c.price}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-ink-500 tracking-[0.06em] mt-6">
            {t('pricing.note')}
          </p>
        </div>
      </section>

      {/* 11. FAQ */}
      <section>
        <div className="container">
          <div className="eyebrow mb-3">{t('faq.eyebrow')}</div>
          <div className="section-head">
            <h2 className="head-title">{t('faq.headline')}</h2>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-12 gap-y-0 mt-12">
            {faqItems.map(f => (
              <div key={f.q} className="py-7 border-t border-ink-150">
                <h3 className="font-display text-[20px] font-medium tracking-[-0.012em] mb-3">{f.q}</h3>
                <p className="text-ink-600 text-[16px] leading-[1.55]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">{t('finalCta.eyebrow')}</div>
          <h2 className="mt-5 text-[clamp(36px,4.5vw,64px)] leading-[1.02]">
            {t('finalCta.headline')}
          </h2>
          <p className="lede mt-7">
            {t('finalCta.body')}
          </p>
          <p className="font-mono text-[12px] text-ink-500 tracking-[0.06em] mt-6">
            {t('finalCta.pricingNote')}
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{t('finalCta.ctaPrimary')} <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">{t('finalCta.ctaSecondary')}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
