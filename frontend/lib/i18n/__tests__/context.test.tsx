import { describe, it, expect, beforeEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { I18nProvider, useLocale } from '../context'
import type { SupportedLocale } from '../config'

function LocaleProbe() {
  const { locale, setLocale } = useLocale()
  return (
    <>
      <span data-testid="current-locale">{locale}</span>
      <button onClick={() => setLocale('es')}>switch-es</button>
    </>
  )
}

function renderProvider(initialLocale: SupportedLocale) {
  return render(
    <I18nProvider initialLocale={initialLocale}>
      <LocaleProbe />
    </I18nProvider>,
  )
}

describe('I18nProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = ''
  })

  it('exposes the initialLocale as the current locale', () => {
    renderProvider('es')
    expect(screen.getByTestId('current-locale')).toHaveTextContent('es')
  })

  it('ignores a stored locale that contradicts the URL locale', () => {
    localStorage.setItem('xpandia-lang', 'es')
    renderProvider('en')
    expect(screen.getByTestId('current-locale')).toHaveTextContent('en')
  })

  it('updates the locale when initialLocale changes after a navigation', () => {
    const { rerender } = renderProvider('en')
    rerender(
      <I18nProvider initialLocale="es">
        <LocaleProbe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('current-locale')).toHaveTextContent('es')
  })

  it('persists the chosen locale to localStorage when setLocale is called', async () => {
    const user = userEvent.setup()
    renderProvider('en')
    await user.click(screen.getByRole('button', { name: 'switch-es' }))
    expect(localStorage.getItem('xpandia-lang')).toBe('es')
  })

  it('updates the html lang attribute when setLocale is called', async () => {
    const user = userEvent.setup()
    renderProvider('en')
    await user.click(screen.getByRole('button', { name: 'switch-es' }))
    expect(document.documentElement.lang).toBe('es')
  })
})
