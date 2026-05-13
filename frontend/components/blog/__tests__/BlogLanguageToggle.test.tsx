import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'

import BlogLanguageToggle from '../BlogLanguageToggle'

describe('BlogLanguageToggle', () => {
  it('renders both EN and ES options', async () => {
    const ui = await BlogLanguageToggle({ currentLang: 'en' })
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: 'EN' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ES' })).toBeInTheDocument()
  })

  it('marks current lang with aria-current="true"', async () => {
    const ui = await BlogLanguageToggle({ currentLang: 'es' })
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: 'ES' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: 'EN' })).not.toHaveAttribute('aria-current')
  })

  it('links use basePath?lang=<locale>', async () => {
    const ui = await BlogLanguageToggle({ currentLang: 'en', basePath: '/journal' })
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/journal?lang=en')
    expect(screen.getByRole('link', { name: 'ES' })).toHaveAttribute('href', '/journal?lang=es')
  })
})
