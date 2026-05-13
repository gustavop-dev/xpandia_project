import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localizedAlternates } from '@/lib/seo/alternates'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
    alternates: localizedAlternates('/'),
  }
}

const serviceHrefs = [
  '/services/language-assurance',
  '/services/localization-adaptation',
  '/services/applied-cultural-intelligence',
]

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')

  const proofItems = t.raw('hero.proof') as Array<{ label: string; text: string }>
  const serviceCards = t.raw('servicesOverview.cards') as Array<{
    num: string
    title: string
    tagline: string
    description: string
    bestForLabel: string
    bestFor: string
    whatYouGetLabel: string
    whatYouGet: string
    cta: string
  }>
  const methodologySteps = t.raw('methodology.steps') as Array<{ title: string; body: string }>
  const deliverableCards = t.raw('deliverables.cards') as Array<{ title: string; body: string }>
  const scorecardRows = t.raw('deliverables.scorecard.rows') as Array<{
    label: string
    width: string
    val: string
    accent?: boolean
    dim?: boolean
  }>
  const scorecardCriteria = t.raw('deliverables.scorecard.criteria') as string[]
  const audienceCards = t.raw('builtFor.cards') as Array<{ title: string; body: string }>
  const buyerRoles = t.raw('buyer.roles') as string[]

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-9">{t('hero.eyebrow')}</div>
          <h1 className="hero-display">
            {t('hero.h1')}{' '}
            <span className="whitespace-nowrap"><span className="accent-underline">{t('hero.h1Accent')}</span>.</span>
          </h1>
          <p className="hero-sub">
            {t('hero.subheadline')}
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">{t('hero.ctaPrimary')} <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">{t('hero.ctaSecondary')}</Link>
          </div>
          <div className="mt-24 pt-7 border-t border-ink-150 grid grid-cols-2 tablet:grid-cols-4 gap-8">
            {proofItems.map(({ label, text }) => (
              <div key={label}>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-[10px]">{label}</div>
                <div className="text-[14px] leading-[1.45] text-ink-700">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning — Why Xpandia */}
      <section className="tight pt-10">
        <div className="container">
          <div data-reveal className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{t('positioning.eyebrow')}</div>
            <div>
              <p className="display max-w-[24ch]" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 28 }}>
                {t('positioning.headline')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[56ch] mb-6">
                {t('positioning.body1')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[56ch] mb-6">
                {t('positioning.body2')}
              </p>
              <p className="text-ink-600 text-[19px] max-w-[56ch]">
                {t('positioning.body3')}
              </p>
              <div className="mt-10 p-7 bg-ink-50 border border-ink-150 rounded-lg">
                <div className="font-display text-[22px] font-medium text-ink-900 tracking-[-0.01em] leading-[1.2]">{t('positioning.calloutTitle')}</div>
                <div className="text-ink-600 text-[15px] mt-2">{t('positioning.calloutLine')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('servicesOverview.eyebrow')}</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>{t('servicesOverview.headline')}</h2>
            </div>
            <p className="head-lede">{t('servicesOverview.intro')}</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-5 mt-12">
            {serviceCards.map((s, i) => (
              <div key={serviceHrefs[i]} className="service-card">
                <div className="xbar"></div>
                <div className="service-num">{s.num}</div>
                <div className="service-title">{s.title}</div>
                <div className="text-ink-900 font-medium text-[15px] mb-3">{s.tagline}</div>
                <div className="service-desc">{s.description}</div>
                <div className="text-[13px] leading-[1.5] text-ink-600 mb-4">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-ink-500 block mb-1">{s.bestForLabel}</span>
                  {s.bestFor}
                </div>
                <div className="text-[13px] leading-[1.5] text-ink-600 mb-6">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-ink-500 block mb-1">{s.whatYouGetLabel}</span>
                  {s.whatYouGet}
                </div>
                <div className="service-meta">
                  <Link href={serviceHrefs[i]} className="text-primary font-medium font-sans normal-case tracking-normal text-[13.5px] hover:underline">{s.cta} →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow !text-ink-400">{t('methodology.eyebrow')}</div>
              <h2 style={{ marginTop: 24 }}>{t('methodology.headline')}</h2>
              <p className="text-ink-300 max-w-[40ch]" style={{ marginTop: 24 }}>{t('methodology.intro')}</p>
            </div>
            <ol className="num-list">
              {methodologySteps.map(s => (
                <li key={s.title} style={{ borderTopColor: 'rgba(255,255,255,0.1)' }}>
                  <div>
                    <h4>{s.title}</h4>
                    <div className="n-body !text-ink-300">{s.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('deliverables.eyebrow')}</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>{t('deliverables.headline')}</h2>
            </div>
            <p className="head-lede">{t('deliverables.body')}</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-[1.1fr_1fr] gap-16 items-start mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {deliverableCards.map(d => (
                <div key={d.title} className="p-6 bg-white border border-ink-150 rounded-lg">
                  <h3 className="text-[19px] font-display font-medium text-ink-900 tracking-[-0.01em] mb-3">{d.title}</h3>
                  <p className="text-ink-600 text-[14.5px] leading-[1.55]">{d.body}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="scorecard" aria-hidden="true">
                <div className="scorecard-head">
                  <div className="scorecard-title">{t('deliverables.scorecard.title')}</div>
                  <div className="font-mono text-[11px] text-ink-500 tracking-[0.06em]">{t('deliverables.scorecard.sampleLabel')}</div>
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
                  {t('deliverables.scorecard.footer')}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {scorecardCriteria.map(criterion => (
                  <span key={criterion} className="tag">{criterion}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built For */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head" style={{ gridTemplateColumns: '1fr' }}>
            <div>
              <div className="eyebrow">{t('builtFor.eyebrow')}</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>{t('builtFor.headline')}</h2>
            </div>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-5 mt-12">
            {audienceCards.map(a => (
              <div key={a.title} className="p-7 bg-white border border-ink-150 rounded-lg">
                <h3 className="text-[18px] font-display font-medium text-ink-900 tracking-[-0.01em] mb-3">{a.title}</h3>
                <p className="text-ink-600 text-[14.5px] leading-[1.55]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer — Who we help */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div>
              <div className="eyebrow">{t('buyer.eyebrow')}</div>
              <h2 style={{ marginTop: 24, fontSize: 'clamp(26px,2.6vw,40px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t('buyer.headline')}</h2>
            </div>
            <ul className="checklist">
              {buyerRoles.map(role => (
                <li key={role}><span className="chk"></span><span>{role}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow">{t('finalCta.eyebrow')}</div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05 }}>
            {t('finalCta.headline')}{' '}
            <span className="relative inline-block">
              {t('finalCta.headlineAccent')}<span className="absolute left-0 right-0 bottom-[0.08em] h-[2px] bg-accent"></span>
            </span>
            .
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            {t('finalCta.body')}
          </p>
          <p className="text-ink-900 font-medium text-[17px]" style={{ marginTop: 20 }}>{t('finalCta.pricingLine')}</p>
          <p className="text-ink-600 text-[15px] max-w-[60ch]" style={{ marginTop: 8 }}>
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
