import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { localizedAlternates } from '@/lib/seo/alternates'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
    alternates: localizedAlternates('/about'),
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')

  const differentiatorCards = t.raw('differentiators.cards') as Array<{ title: string; body: string }>
  const howWeWorkSteps = t.raw('howWeWork.steps') as Array<{ title: string; body: string }>
  const startingPointCards = t.raw('startingPoints.cards') as Array<{ title: string; price: string; body: string }>
  const proofSignalItems = t.raw('proofSignals.items') as Array<{ label: string; text: string }>

  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{t('hero.eyebrow')}</div>
          <h1 className="hero-display text-[clamp(32px,4.2vw,62px)] max-w-[24ch]">
            {t('hero.h1')}
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            {t('hero.sub')}
          </p>
          <p className="text-ink-600 text-[17px] leading-[1.6] mt-5 max-w-[64ch]">
            {t('hero.body')}
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">{t('hero.ctaPrimary')} <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>

      {/* 2. Company Positioning */}
      <section className="tight pt-10">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">{t('positioning.eyebrow')}</div>
            <div>
              <p className="display max-w-[24ch]" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 28 }}>
                {t('positioning.headline')}
              </p>
              <p className="text-ink-600 text-[19px] leading-[1.55] max-w-[56ch] mb-6">
                {t('positioning.body1')}
              </p>
              <p className="text-ink-600 text-[19px] leading-[1.55] max-w-[56ch] mb-6">
                {t('positioning.body2')}
              </p>
              <div className="mt-4 p-7 bg-ink-50 border border-ink-150 rounded-lg">
                <div className="font-display text-[20px] font-medium text-ink-900 tracking-[-0.01em] leading-[1.3]">
                  {t('positioning.callout')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What Makes Xpandia Different */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('differentiators.eyebrow')}</div>
              <h2 className="head-title" style={{ marginTop: 16 }}>{t('differentiators.headline')}</h2>
            </div>
            <p className="head-lede">
              {t('differentiators.intro')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-5 mt-12">
            {differentiatorCards.map((d, i) => (
              <div key={d.title} className="p-7 bg-white border border-ink-150 rounded-lg">
                <div className="font-mono text-[11px] tracking-[0.1em] text-accent mb-3">{t('differentiators.valueLabel')} {i + 1}</div>
                <h3 className="text-[19px] font-display font-medium text-ink-900 tracking-[-0.01em] mb-3">{d.title}</h3>
                <p className="text-ink-600 text-[14.5px] leading-[1.55]">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Founder / Leadership */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="max-w-[760px]">
            <div className="eyebrow">{t('founder.eyebrow')}</div>
            <h2 style={{ marginTop: 24, fontSize: 'clamp(26px,2.8vw,42px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {t('founder.headline')}
            </h2>
            <p className="text-ink-600 text-[19px] leading-[1.55] mt-7 mb-5">
              {t('founder.body1')}
            </p>
            <p className="text-ink-600 text-[19px] leading-[1.55]">
              {t('founder.body2')}
            </p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-[0.85fr_1.6fr] gap-10 items-start mt-12">
            <div>
              <div className="aspect-[4/5] rounded-lg relative overflow-hidden bg-ink-900">
                <Image src="/assets/founder.webp" alt={t('founder.imageAlt')} fill loading="lazy" className="object-cover object-[62%_center] scale-110" sizes="(max-width: 900px) 100vw, 30vw" />
                <div className="absolute bottom-0 right-0 w-[40%] h-[3px] bg-accent"></div>
              </div>
              <div className="mt-5">
                <div className="font-display text-[22px] font-medium text-ink-900 tracking-[-0.01em]">{t('founder.name')}</div>
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.08em] mt-1">{t('founder.title')}</div>
              </div>
            </div>
            <div className="p-7 bg-white border border-ink-150 rounded-lg">
              <p className="text-ink-600 text-[15.5px] leading-[1.6] mb-4">
                {t('founder.bio1')}
              </p>
              <p className="text-ink-600 text-[15.5px] leading-[1.6]">
                {t('founder.bio2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How We Work */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow">{t('howWeWork.eyebrow')}</div>
              <h2 style={{ marginTop: 24 }}>{t('howWeWork.headline')}</h2>
            </div>
            <ol className="num-list num-list-spotlight">
              {howWeWorkSteps.map(s => (
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

      {/* 6. Engagement Starting Points */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head section-head--no-rule" style={{ gridTemplateColumns: '1fr' }}>
            <div className="eyebrow">{t('startingPoints.eyebrow')}</div>
            <h2 className="head-title max-w-[26ch]" style={{ marginTop: 16 }}>{t('startingPoints.headline')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-5 mt-12 items-start">
            {startingPointCards.map(p => (
              <Link
                key={p.title}
                href="/contact"
                className="group p-7 bg-white border border-ink-150 rounded-lg flex flex-col transition-all hover:border-primary hover:shadow-[0_4px_20px_rgba(15,20,25,0.06)]"
              >
                <h3 className="text-[19px] font-display font-medium text-ink-900 tracking-[-0.01em] mb-1">{p.title}</h3>
                <div className="font-mono text-[12px] text-primary tracking-[0.06em] mb-3">{p.price}</div>
                <p className="text-ink-600 text-[14.5px] leading-[1.55]">{p.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-primary font-medium text-[14px]">
                  {t('startingPoints.cardCta')} <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="text-ink-500 text-[14px] mt-8">{t('startingPoints.pricingNote')}</p>
        </div>
      </section>

      {/* 7. Proof-of-expertise signals */}
      <section className="tight">
        <div className="container">
          <div className="eyebrow mb-8">{t('proofSignals.eyebrow')}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-4 gap-5 border-t border-ink-150 pt-10">
            {proofSignalItems.map(s => (
              <div key={s.label}>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-[10px]">{s.label}</div>
                <div className="text-[14.5px] leading-[1.5] text-ink-700">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow">{t('finalCta.eyebrow')}</div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05 }}>
            {t('finalCta.headline')}
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
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
