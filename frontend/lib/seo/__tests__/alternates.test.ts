import { describe, it, expect } from '@jest/globals'
import { localizedAlternates } from '../alternates'

describe('localizedAlternates', () => {
  it('builds canonical + en/es language URLs for the home path', () => {
    expect(localizedAlternates('/')).toEqual({
      canonical: '/',
      languages: { en: '/', es: '/es' },
    })
  })
  it('builds canonical + en/es language URLs for a nested path', () => {
    expect(localizedAlternates('/services/language-assurance')).toEqual({
      canonical: '/services/language-assurance',
      languages: { en: '/services/language-assurance', es: '/es/services/language-assurance' },
    })
  })
})
