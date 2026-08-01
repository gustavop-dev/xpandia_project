// frontend/app/[locale]/not-found.tsx
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function NotFound() {
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
