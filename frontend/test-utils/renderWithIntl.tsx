// frontend/test-utils/renderWithIntl.tsx
import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { enMessages, esMessages } from './messages'

export function renderWithIntl(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale="en" messages={enMessages}>{children}</NextIntlClientProvider>
    ),
    ...options,
  })
}

export function renderWithIntlEs(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale="es" messages={esMessages}>{children}</NextIntlClientProvider>
    ),
    ...options,
  })
}
