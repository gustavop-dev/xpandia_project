'use client'

// Segment-level error boundary for the [locale] tree. Next.js renders this in
// place of a crashed page while the [locale] layout (and its
// NextIntlClientProvider) stays mounted, so translations resolve here. This
// replaces the raw browser "page can't load" message with a friendly,
// localized screen plus a retry affordance.
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common.error')

  useEffect(() => {
    // Surface the crash for monitoring; the digest links to the server log entry.
    console.error('[locale] segment error boundary caught:', error)
  }, [error])

  return (
    <main className="container" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="eyebrow mb-6">500</div>
      <h1 className="hero-display text-[clamp(40px,5vw,72px)]">{t('title')}</h1>
      <p className="lede mt-6">{t('description')}</p>
      <div className="hero-ctas mt-8 flex flex-wrap gap-4">
        <button type="button" className="btn btn-primary" onClick={reset}>
          {t('retry')} <span className="btn-arrow"></span>
        </button>
        <Link className="btn btn-secondary" href="/">
          {t('back')}
        </Link>
      </div>
    </main>
  )
}
