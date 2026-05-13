import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localizedAlternates } from '@/lib/seo/alternates'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
    alternates: localizedAlternates('/services'),
  }
}

const serviceHrefs = [
  '/services/language-assurance',
  '/services/localization-adaptation',
  '/services/applied-cultural-intelligence',
]

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')

  const decisionCards = t.raw('decision.cards') as Array<{
    title: string
    choose: string
    body: string
    bestWhen: string[]
    cta: string
  }>

  const serviceLineCards = t.raw('serviceLines.cards') as Array<{
    num: string
    name: string
    tagline: string
    overview: string
    whenToUse: string[]
    bestFor: string
    coreEngagements: string[]
    whatYouGet: string[]
    pricing: string[]
    timeline: string
    cta: string
  }>

  const comparisonRows = t.raw('comparison.rows') as Array<{
    need: string
    choose: string
    outcome: string
  }>

  const comparisonHeaders = t.raw('comparison.headers') as string[]

  const startingPointCards = t.raw('startingPoints.cards') as Array<{
    name: string
    tagline?: string
    overview?: string
    bestFor: string
    outcome: string
    themesLabel?: string
    themes?: string[]
    deliverablesLabel: string
    deliverables: string[]
    price: string[]
    timeline: string
    cta: string
  }>

  const engagementSteps = t.raw('engagementModel.steps') as Array<{
    title: string
    body: string
  }>

  const pricingCards = t.raw('pricing.cards') as Array<{
    name: string
    price: string
    desc: string
  }>

  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{t('hero.eyebrow')}</div>
          <h1 className="hero-display text-[clamp(44px,6vw,92px)] max-w-[18ch]">
            {t('hero.headline')}
          </h1>
          <p className="hero-sub mt-8">
            {t('hero.subheadline')}
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">
              {t('hero.ctaPrimary')} <span className="btn-arrow"></span>
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              {t('hero.ctaSecondary')}
            </Link>
          </div>
          <p className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-12 max-w-[64ch]">
            {t('hero.supportingLine')}
          </p>
        </div>
      </section>

      {/* 2. Service Decision Section */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('decision.eyebrow')}</div>
              <h2 className="head-title mt-5">{t('decision.headline')}</h2>
            </div>
            <p className="head-lede">
              {t('decision.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-5 mt-12">
            {decisionCards.map((card, i) => (
              <div
                key={card.title}
                className="flex flex-col p-7 bg-white border border-ink-150 rounded-lg"
              >
                <div className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.15] text-ink-900">
                  {card.title}
                </div>
                <div className="text-primary font-medium text-[15px] mt-2">{card.choose}</div>
                <p className="text-ink-600 text-[15px] leading-[1.55] mt-4">{card.body}</p>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-6 mb-3">
                  {t('decision.bestWhenLabel')}
                </div>
                <ul className="space-y-2 text-ink-600 text-[14.5px] leading-[1.5]">
                  {card.bestWhen.map(b => (
                    <li key={b} className="flex gap-2.5">
                      <span className="text-accent mt-px">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link href={serviceHrefs[i]} className="btn btn-secondary btn-small">
                    {card.cta} <span className="btn-arrow"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Service Line Cards */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('serviceLines.eyebrow')}</div>
              <h2 className="head-title mt-5">{t('serviceLines.headline')}</h2>
            </div>
            <p className="head-lede">
              {t('serviceLines.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12">
            {serviceLineCards.map((line, i) => (
              <div
                key={line.name}
                className="grid grid-cols-1 tablet:grid-cols-[1fr_1.4fr] gap-10 p-8 tablet:p-10 bg-white border border-ink-150 rounded-lg"
              >
                <div>
                  <div className="font-mono text-[12px] tracking-[0.1em] text-ink-500">{line.num} {t('serviceLines.serviceLineLabel')}</div>
                  <h3 className="font-display text-[clamp(26px,2.8vw,38px)] font-medium tracking-[-0.02em] leading-[1.08] mt-3 text-ink-900">
                    {line.name}
                  </h3>
                  <p className="text-accent font-medium text-[16px] mt-3">{line.tagline}</p>
                  <p className="text-ink-600 text-[16px] leading-[1.55] mt-5">{line.overview}</p>
                  <div className="mt-8">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">{t('serviceLines.bestForLabel')}</div>
                    <p className="text-ink-600 text-[15px] leading-[1.55]">{line.bestFor}</p>
                  </div>
                  <div className="mt-8">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3">
                      {t('serviceLines.engagementStartingPointsLabel')}
                    </div>
                    <ul className="space-y-1.5">
                      {line.pricing.map(p => (
                        <li key={p} className="text-ink-900 text-[15px] font-medium">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">{t('serviceLines.timelineLabel')}</div>
                    <p className="text-ink-600 text-[15px] leading-[1.55]">{line.timeline}</p>
                  </div>
                  <div className="mt-8">
                    <Link href={serviceHrefs[i]} className="btn btn-primary">
                      {line.cta} <span className="btn-arrow"></span>
                    </Link>
                  </div>
                </div>

                <div className="border-t border-ink-150 pt-8 tablet:border-t-0 tablet:border-l tablet:border-ink-150 tablet:pt-0 tablet:pl-10">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3">{t('serviceLines.whenToUseLabel')}</div>
                  <ul className="space-y-2 text-ink-600 text-[15px] leading-[1.5]">
                    {line.whenToUse.map(w => (
                      <li key={w} className="flex gap-2.5">
                        <span className="text-accent mt-px">·</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3 mt-8">
                    {t('serviceLines.coreEngagementsLabel')}
                  </div>
                  <ul className="space-y-2 text-ink-600 text-[15px] leading-[1.5]">
                    {line.coreEngagements.map(e => (
                      <li key={e} className="flex gap-2.5">
                        <span className="text-accent mt-px">·</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-3 mt-8">
                    {t('serviceLines.whatYouGetLabel')}
                  </div>
                  <ul className="checklist">
                    {line.whatYouGet.map(g => (
                      <li key={g}>
                        <span className="chk"></span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Comparison Section */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('comparison.eyebrow')}</div>
              <h2 className="head-title mt-5">{t('comparison.headline')}</h2>
            </div>
            <p className="head-lede">
              {t('comparison.intro')}
            </p>
          </div>

          <div className="comparison-wrap mt-12">
            <table className="comparison-table w-full border-collapse bg-white border border-ink-150 rounded-lg overflow-hidden text-left">
              <thead>
                <tr className="bg-ink-900 text-paper">
                  <th className="px-6 py-4 font-mono text-[11px] tracking-[0.1em] font-normal">
                    {comparisonHeaders[0]}
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] tracking-[0.1em] font-normal">{comparisonHeaders[1]}</th>
                  <th className="px-6 py-4 font-mono text-[11px] tracking-[0.1em] font-normal">
                    {comparisonHeaders[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(row => (
                  <tr key={row.choose} className="border-t border-ink-150 align-top">
                    <td className="px-6 py-5 text-ink-600 text-[15px] leading-[1.5]">{row.need}</td>
                    <td className="px-6 py-5 text-ink-900 text-[15px] font-medium whitespace-nowrap">
                      {row.choose}
                    </td>
                    <td className="px-6 py-5 text-ink-600 text-[15px] leading-[1.5]">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Recommended Starting Points */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('startingPoints.eyebrow')}</div>
              <h2 className="head-title mt-5">{t('startingPoints.headline')}</h2>
            </div>
            <p className="head-lede">
              {t('startingPoints.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mt-12">
            {startingPointCards.map(sp => (
              <div
                key={sp.name}
                className="flex flex-col p-8 bg-white border border-ink-150 rounded-lg"
              >
                <h3 className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.15] text-ink-900">
                  {sp.name}
                </h3>
                {sp.tagline && <p className="text-accent font-medium text-[15px] mt-2">{sp.tagline}</p>}
                {sp.overview && <p className="text-ink-600 text-[15px] leading-[1.55] mt-4">{sp.overview}</p>}

                <div className="mt-5">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1.5">{t('startingPoints.bestForLabel')}</div>
                  <p className="text-ink-600 text-[15px] leading-[1.5]">{sp.bestFor}</p>
                </div>

                <div className="mt-5">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-1.5">{t('startingPoints.outcomeLabel')}</div>
                  <p className="text-ink-600 text-[15px] leading-[1.5]">{sp.outcome}</p>
                </div>

                {sp.themes && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">
                      {sp.themesLabel?.toUpperCase()}
                    </div>
                    <ul className="space-y-2 text-ink-600 text-[14.5px] leading-[1.5]">
                      {sp.themes.map(theme => (
                        <li key={theme} className="flex gap-2.5">
                          <span className="text-accent mt-px">·</span>
                          <span>{theme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-5">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">
                    {(sp.deliverablesLabel ?? 'Deliverables').toUpperCase()}
                  </div>
                  <ul className="checklist">
                    {sp.deliverables.map(d => (
                      <li key={d}>
                        <span className="chk"></span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-ink-150">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">
                    {t('startingPoints.engagementStartsAtLabel')}
                  </div>
                  <ul className="space-y-1">
                    {sp.price.map(p => (
                      <li key={p} className="text-ink-900 text-[15px] font-medium">{p}</li>
                    ))}
                  </ul>
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-4 mb-1">{t('startingPoints.timelineLabel')}</div>
                  <p className="text-ink-600 text-[15px] leading-[1.5]">{sp.timeline}</p>
                </div>

                <div className="mt-auto pt-6">
                  <Link href="/contact" className="btn btn-primary">
                    {sp.cta} <span className="btn-arrow"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Engagement Model */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-16 items-start">
            <div>
              <div className="eyebrow">{t('engagementModel.eyebrow')}</div>
              <h2 style={{ marginTop: 24 }}>{t('engagementModel.headline')}</h2>
            </div>
            <ol className="num-list">
              {engagementSteps.map(step => (
                <li key={step.title}>
                  <div>
                    <h4>{step.title}</h4>
                    <div className="n-body">{step.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7. Pricing */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('pricing.eyebrow')}</div>
              <h2 className="head-title mt-5">{t('pricing.headline')}</h2>
            </div>
            <p className="head-lede">
              {t('pricing.body')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-5 mt-12">
            {pricingCards.map(card => (
              <div key={card.name} className="flex flex-col p-7 bg-white border border-ink-150 rounded-lg">
                <div className="font-display text-[19px] font-medium tracking-[-0.012em] text-ink-900">
                  {card.name}
                </div>
                <div className="font-display text-[clamp(22px,2vw,30px)] font-medium tracking-[-0.02em] text-primary mt-2">
                  {card.price}
                </div>
                <p className="text-ink-600 text-[14.5px] leading-[1.55] mt-4">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-[64ch] text-ink-600 text-[15px] leading-[1.6]">
            <p className="font-medium text-ink-900">
              {t('pricing.noteTitle')}
            </p>
            <p className="mt-2">
              {t('pricing.noteBody')}
            </p>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow">{t('finalCta.eyebrow')}</div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(36px,4.5vw,64px)', lineHeight: 1.02 }}>
            {t('finalCta.headline')}
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            {t('finalCta.body')}
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">
              {t('finalCta.ctaPrimary')} <span className="btn-arrow"></span>
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              {t('finalCta.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
