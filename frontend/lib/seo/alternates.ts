import type { Metadata } from 'next'

/** Given the locale-independent path (e.g. "/services/x"), returns Metadata.alternates with
 *  a self-canonical and en/es hreflang URLs. en is unprefixed; es is "/es"-prefixed. */
export function localizedAlternates(path: string): NonNullable<Metadata['alternates']> {
  const clean = path === '/' ? '' : path
  return {
    canonical: clean === '' ? '/' : clean,
    languages: {
      en: clean === '' ? '/' : clean,
      es: `/es${clean}`,
    },
  }
}
