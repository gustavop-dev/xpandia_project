import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

// One JSON file per namespace under messages/<locale>/. Add new namespaces here.
const NAMESPACES = [
  'common',
  'home',
  'services',
  'language-assurance',
  'localization',
  'aci',
  'about',
  'contact',
  'blog',
] as const

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const entries = await Promise.all(
    NAMESPACES.map(async ns => {
      const mod = await import(`../messages/${locale}/${ns}.json`)
      return [ns, mod.default] as const
    }),
  )

  return {
    locale,
    messages: Object.fromEntries(entries),
    // Defensive: a missing/malformed key must never crash a page render. Log it
    // (so gaps surface in dev/monitoring) and fall back to the key path instead
    // of throwing. Spanish copy is a living draft, so this guards against an
    // incomplete namespace taking down a whole route.
    onError(error) {
      console.error('[next-intl]', error)
    },
    getMessageFallback({ namespace, key }) {
      return namespace ? `${namespace}.${key}` : key
    },
  }
})
