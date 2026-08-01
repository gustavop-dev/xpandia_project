import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

/**
 * The 404 body, shared by the global boundary (app/not-found.tsx) and the
 * locale one (app/[locale]/not-found.tsx). The CTA goes through
 * @/i18n/navigation so it returns to the homepage of the active locale.
 */
export default async function NotFoundContent() {
  const t = await getTranslations('common.notFound')

  return (
    <main className="container" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="eyebrow mb-6">{t('eyebrow')}</div>
      <h1 className="hero-display text-[clamp(40px,5vw,72px)]">{t('title')}</h1>
      <p className="lede mt-6">{t('description')}</p>
      <div className="hero-ctas mt-8"><Link className="btn btn-primary" href="/">{t('back')} <span className="btn-arrow"></span></Link></div>
    </main>
  )
}
