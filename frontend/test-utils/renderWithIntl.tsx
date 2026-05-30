// frontend/test-utils/renderWithIntl.tsx
import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { I18nProvider } from '@/lib/i18n/context'
import { enMessages, esMessages } from './messages'

export function renderWithIntl(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => (
      <I18nProvider initialLocale="en">
        <NextIntlClientProvider locale="en" messages={enMessages}>{children}</NextIntlClientProvider>
      </I18nProvider>
    ),
    ...options,
  })
}

export function renderWithIntlEs(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => (
      <I18nProvider initialLocale="es">
        <NextIntlClientProvider locale="es" messages={esMessages}>{children}</NextIntlClientProvider>
      </I18nProvider>
    ),
    ...options,
  })
}
