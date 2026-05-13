import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/lib/i18n/config'

interface BlogLanguageToggleProps {
  currentLang: SupportedLocale
  basePath?: string
}

const LOCALE_TOGGLE_LABELS: Record<SupportedLocale, string> = {
  en: 'EN',
  es: 'ES',
}

export default async function BlogLanguageToggle({ currentLang, basePath = '/blog' }: BlogLanguageToggleProps) {
  const t = await getTranslations('blog')

  return (
    <div className="inline-flex rounded-full overflow-hidden border border-ink-200" role="group" aria-label={t('languageToggle.ariaLabel')}>
      {SUPPORTED_LOCALES.map(locale => {
        const active = locale === currentLang
        return (
          <Link
            key={locale}
            href={`${basePath}?lang=${locale}`}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'inline-flex items-center justify-center px-4 py-2 font-mono text-[11px] tracking-[0.12em] transition-colors',
              active ? 'bg-ink-900 text-paper' : 'bg-transparent text-ink-700 hover:text-ink-900',
            )}
          >
            {LOCALE_TOGGLE_LABELS[locale]}
          </Link>
        )
      })}
    </div>
  )
}
