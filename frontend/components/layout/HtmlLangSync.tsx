'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

/**
 * Keeps `<html lang>` in sync with the active locale on client-side navigation.
 *
 * The server renders it correctly, but `<html>` lives in the root layout
 * (app/layout.tsx), which sits above the [locale] segment and therefore does not
 * re-render when the language toggle calls router.replace(). Without this the
 * attribute would keep the locale the page was first loaded with.
 */
export default function HtmlLangSync() {
  const locale = useLocale()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
