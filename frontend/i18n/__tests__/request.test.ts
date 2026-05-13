import { describe, it, expect } from '@jest/globals'
import { routing } from '../routing'

// next-intl's getRequestConfig is a react-server-condition export that cannot
// be called outside a Next.js server request scope (it throws in Jest's jsdom
// environment). We use the fallback the task specifies: assert each
// messages/<locale>/<ns>.json parses to a non-empty object and that routing
// declares both locales.

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

describe('i18n request config', () => {
  it('declares both supported locales', () => {
    expect(routing.locales).toContain('en')
    expect(routing.locales).toContain('es')
  })

  for (const ns of NAMESPACES) {
    it(`messages/en/${ns}.json is a non-empty object`, async () => {
      const mod = await import(`../../messages/en/${ns}.json`)
      expect(typeof mod.default).toBe('object')
      expect(Object.keys(mod.default).length).toBeGreaterThan(0)
    })

    it(`messages/es/${ns}.json is a non-empty object`, async () => {
      const mod = await import(`../../messages/es/${ns}.json`)
      expect(typeof mod.default).toBe('object')
      expect(Object.keys(mod.default).length).toBeGreaterThan(0)
    })
  }
})
