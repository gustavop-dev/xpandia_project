/**
 * Routing data for the header menu and the footer link columns.
 *
 * Hrefs are not copy, so they do not belong in `messages/`: keeping them here
 * means the translation files hold only translatable strings, and a locale can
 * never ship a broken or missing link. Each entry carries a `key` that maps to
 * the matching label under `common.header.servicesMenu.items` /
 * `common.footer.*` — keyed, not index-based, so reordering a menu cannot
 * silently pair a label with the wrong destination.
 */

export const SERVICES_MENU = [
  { key: 'languageAssurance', num: '01 / VALIDATE', href: '/services/language-assurance' },
  { key: 'localizationAdaptation', num: '02 / ADAPT', href: '/services/localization-adaptation' },
  { key: 'appliedCulturalIntelligence', num: '03 / UNDERSTAND', href: '/services/applied-cultural-intelligence' },
] as const

export const FOOTER_SERVICE_LINKS = [
  { key: 'languageAssurance', href: '/services/language-assurance' },
  { key: 'localizationAdaptation', href: '/services/localization-adaptation' },
  { key: 'appliedCulturalIntelligence', href: '/services/applied-cultural-intelligence' },
] as const

export const FOOTER_COMPANY_LINKS = [
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const
