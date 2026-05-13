import { describe, it, expect } from '@jest/globals'
import { routing } from '../routing'

describe('i18n routing', () => {
  it('declares en and es as the supported locales', () => {
    expect(routing.locales).toEqual(['en', 'es'])
  })

  it('uses en as the default locale', () => {
    expect(routing.defaultLocale).toBe('en')
  })

  it('uses as-needed locale prefixing (no prefix for the default locale)', () => {
    expect(routing.localePrefix).toBe('as-needed')
  })
})
