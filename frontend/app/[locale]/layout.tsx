// frontend/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import { routing } from '@/i18n/routing'
import XpandiaHeader from '@/components/layout/XpandiaHeader'
import XpandiaFooter from '@/components/layout/XpandiaFooter'
import FABContact from '@/components/layout/FABContact'
import SiteAnimations from '@/components/animations/SiteAnimations'
import HtmlLangSync from '@/components/layout/HtmlLangSync'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xpandia.global'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common.metadata' })
  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      siteName: 'Xpandia',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: t('ogTitle') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/og-image.png'],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  // <html>/<body> live in the root layout (app/layout.tsx) so that a global
  // not-found boundary can exist alongside this segment.
  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLangSync />
      <XpandiaHeader />
      {children}
      <XpandiaFooter />
      <FABContact />
      <SiteAnimations />
    </NextIntlClientProvider>
  )
}
