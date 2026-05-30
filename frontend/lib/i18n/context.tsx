'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { SupportedLocale } from './config'
import { DEFAULT_LOCALE, isValidLocale } from './config'

interface I18nContextValue {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
}

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
})

const STORAGE_KEY = 'xpandia-lang'

export function I18nProvider({ children, initialLocale = DEFAULT_LOCALE }: { children: React.ReactNode; initialLocale?: SupportedLocale }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && isValidLocale(stored)) {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = useCallback((l: SupportedLocale) => {
    setLocaleState(l)
    localStorage.setItem(STORAGE_KEY, l)
    document.documentElement.lang = l
  }, [])

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLocale() {
  return useContext(I18nContext)
}
