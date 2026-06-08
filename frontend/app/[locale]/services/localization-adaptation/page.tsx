import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { localizedAlternates } from '@/lib/seo/alternates'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'localization.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
    alternates: localizedAlternates('/services/localization-adaptation'),
  }
}

export default async function LocalizationAdaptationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('localization')

  const heroProofPoints = t.raw('hero.proofPoints') as Array<{ title: string; desc: string }>
  const coverageCards = t.raw('whatWeAdapt.cards') as Array<{ title: string; desc: string }>
  const whenToUseItems = t.raw('whenToUse.items') as string[]
  const engagementItems = t.raw('engagements.items') as Array<{
    n: string
    title: string
    tagline: string
    bestFor: string
    outcome: string
    canIncludeLabel?: string
    canInclude?: string[]
    deliverablesLabel: string
    deliverables: string[]
    price: string
    timeline: string
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
            {t('hero.h1')} <span className="accent-underline">{t('hero.h1Accent')}</span> {t('hero.h1End')}
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            {t('hero.subheadline')}
          </p>
          <p className="text-ink-600 text-[17px] mt-5 max-w-[64ch]">
            {t('hero.body')}
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">
              {t('hero.ctaPrimary')} <span className="btn-arrow"></span>
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              {t('hero.ctaSecondary')}
            </Link>
          </div>

          <div
            data-stagger
            className="mt-20 pt-6 border-t border-ink-150 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {heroProofPoints.map(p => (
              <div key={p.title}>
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-2">{p.title}</div>
                <div className="text-ink-600 text-[14.5px] leading-[1.5]">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual band */}
      <section className="tight pt-0 pb-0">
        <div className="container">
          <div className="relative aspect-[16/9] tablet:aspect-[24/7] rounded-lg overflow-hidden bg-ink-900">
            <Image
              src="/assets/img-services.jpg"
              alt=""
              fill
              loading="lazy"
              className="object-cover grayscale contrast-[1.05]"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(15,20,25,0.3) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.8) 100%)',
              }}
            ></div>
            <div className="absolute bottom-8 right-8 font-mono text-[11px] tracking-[0.14em] text-white/85 text-right">
              <div className="mb-[6px]">{t('photoBand.line1')}</div>
              <div className="text-accent text-[14px] tracking-[0.08em]">{t('photoBand.line2')}</div>
            </div>
            <div className="absolute bottom-0 left-0 w-[34%] h-[3px] bg-accent"></div>
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
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-5">
                {t('positioning.body1')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch] mb-5">
                {t('positioning.body2')}
              </p>
              <p className="text-ink-500 text-[16px] max-w-[62ch]">
                {t('positioning.callout')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Localize & Adapt */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{t('whatWeAdapt.eyebrow')}</div>
            <h2 className="head-title">{t('whatWeAdapt.headline')}</h2>
            <p className="head-lede">
              {t('whatWeAdapt.intro')}
            </p>
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

      {/* 4. When to Use */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div>
              <div className="eyebrow mb-4">{t('whenToUse.eyebrow')}</div>
              <p className="display text-[clamp(24px,2.6vw,36px)] leading-[1.1] tracking-[-0.02em] max-w-[24ch]">
                {t('whenToUse.headline')}
              </p>
            </div>
            <ul className="checklist">
              {whenToUseItems.map(item => (
                <li key={item}>
                  <span className="chk"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Core Services */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow mb-4">{t('engagements.eyebrow')}</div>
            <h2 className="head-title">{t('engagements.headline')}</h2>
            <p className="head-lede">
              {t('engagements.intro')}
            </p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mt-12">
            {engagementItems.map(e => (
              <div key={e.n} className="flex flex-col p-8 bg-white border border-ink-150 rounded-lg">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="font-mono text-[12px] text-ink-400 tracking-[0.08em]">{e.n}</div>
                  <div className="tag accent">{e.price}</div>
                </div>
                <h3 className="font-display text-[24px] font-medium tracking-[-0.015em] leading-[1.1] mb-3">
                  {e.title}
                </h3>
                <p className="text-ink-600 text-[16px] leading-[1.45] mb-5">{e.tagline}</p>
                <div className="mb-4">
                  <div className="eyebrow no-bar mb-2">{t('engagements.bestForLabel')}</div>
                  <p className="text-ink-600 text-[14.5px] leading-[1.5]">{e.bestFor}</p>
                </div>
                <div className="mb-5">
                  <div className="eyebrow no-bar mb-2">{t('engagements.outcomeLabel')}</div>
                  <p className="text-ink-600 text-[14.5px] leading-[1.5]">{e.outcome}</p>
                </div>
                {e.canInclude && (
                  <div className="mb-5">
                    <div className="eyebrow no-bar mb-3">{(e.canIncludeLabel ?? 'Can include').toUpperCase()}</div>
                    <ul className="space-y-2 text-ink-600 text-[14.5px] leading-[1.5]">
                      {e.canInclude.map(item => (
                        <li key={item} className="flex gap-2.5">
                          <span className="text-accent mt-px">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mb-5">
                  <div className="eyebrow no-bar mb-3">{e.deliverablesLabel.toUpperCase()}</div>
                  <ul className="checklist">
                    {e.deliverables.map(d => (
                      <li key={d} className="!py-[10px] !text-[14.5px]">
                        <span className="chk"></span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-5 border-t border-ink-150 flex flex-col gap-4">
                  <div className="font-mono text-[12px] text-ink-500 tracking-[0.02em]">
                    {t('engagements.timelinePrefix')}{e.timeline}
                  </div>
                  <Link className="btn btn-secondary btn-small self-start" href="/contact">
                    {e.cta} <span className="btn-arrow"></span>
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
          <div className="section-head">
            <div className="eyebrow mb-4">{t('methodology.eyebrow')}</div>
            <h2 className="head-title">{t('methodology.headline')}</h2>
            <p className="head-lede">
              {t('methodology.intro')}
            </p>
          </div>
          <ol className="num-list mt-12">
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

      {/* 8. Final CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">{t('finalCta.eyebrow')}</div>
          <h2 className="mt-5 text-[clamp(36px,4.6vw,64px)] leading-[1.05]">
            {t('finalCta.headline')}
          </h2>
          <p className="lede mt-7">
            {t('finalCta.body')}
          </p>
          <div className="hero-ctas mt-10">
            {t('finalCta.ctaPrimary') && <Link className="btn btn-primary" href="/contact">
              {t('finalCta.ctaPrimary')} <span className="btn-arrow"></span>
            </Link>}
            {t('finalCta.ctaSecondary') && <Link className="btn btn-secondary" href="/contact">
              {t('finalCta.ctaSecondary')}
            </Link>}
          </div>
        </div>
      </section>
    </main>
  )
}
