'use client'

import { useLocale } from './context'
import { en } from './dictionaries/en/index'
import { es } from './dictionaries/es/index'
import type { SupportedLocale } from './config'

const dictionaries: Record<SupportedLocale, typeof en> = { en, es }

export type Translations = typeof en

export function useTranslations(): Translations {
  const { locale } = useLocale()
  return dictionaries[locale]
}

export function useT() {
  const { locale } = useLocale()
  return { t: dictionaries[locale], locale }
}
