// frontend/app/[locale]/[...rest]/page.tsx
// Catch-all so unmatched paths render the locale layout's not-found boundary
// instead of Next.js's built-in, untranslated 404 page.
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

export default async function CatchAllPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  notFound()
}
