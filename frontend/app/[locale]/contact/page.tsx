import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { localizedAlternates } from '@/lib/seo/alternates'
import ContactForm from '@/components/contact/ContactForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
    alternates: localizedAlternates('/contact'),
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  const nextSteps = t.raw('whatHappensNext.steps') as Array<{ title: string; body: string }>

  return (
    <main>
      {/* Hero / header */}
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow mb-8">{t('hero.eyebrow')}</div>
          <h1 className="hero-display text-[clamp(40px,5vw,80px)] max-w-[22ch]">
            {t('hero.headline')}
          </h1>
          <p className="hero-sub mt-7 max-w-[64ch]">
            {t('hero.body')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href={`mailto:${t('hero.email')}`} className="text-primary font-medium text-[16px] hover:underline">{t('hero.email')}</a>
          </div>
          {(t('hero.ctaPrimary') || t('hero.ctaSecondary')) && <div className="hero-ctas mt-8">
            {t('hero.ctaPrimary') && <a className="btn btn-primary" href="#contact-form">{t('hero.ctaPrimary')} <span className="btn-arrow"></span></a>}
            {t('hero.ctaSecondary') && <a className="btn btn-secondary" href="#contact-form">{t('hero.ctaSecondary')}</a>}
          </div>}
        </div>
      </section>

      {/* Form + aside */}
      <ContactForm />

      {/* What Happens Next */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow">{t('whatHappensNext.eyebrow')}</div>
              <h2 style={{ marginTop: 24 }}>{t('whatHappensNext.headline')}</h2>
            </div>
            <ol className="num-list">
              {nextSteps.map(s => (
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

      {/* Final CTA */}
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
            {t('finalCta.ctaPrimary') && <a className="btn btn-primary" href="#contact-form">{t('finalCta.ctaPrimary')} <span className="btn-arrow"></span></a>}
            {t('finalCta.ctaSecondary') && <a className="btn btn-secondary" href={`mailto:${t('hero.email')}`}>{t('finalCta.ctaSecondary')}</a>}
          </div>
        </div>
      </section>
    </main>
  )
}
