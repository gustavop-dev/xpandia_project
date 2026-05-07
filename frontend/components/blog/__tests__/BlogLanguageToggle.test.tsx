import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import BlogLanguageToggle from '../BlogLanguageToggle'

describe('BlogLanguageToggle', () => {
  it('renders both EN and ES options', () => {
    render(<BlogLanguageToggle currentLang="en" />)
    expect(screen.getByRole('link', { name: 'EN' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ES' })).toBeInTheDocument()
  })

  it('marks current lang with aria-current="true"', () => {
    render(<BlogLanguageToggle currentLang="es" />)
    expect(screen.getByRole('link', { name: 'ES' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: 'EN' })).not.toHaveAttribute('aria-current')
  })

  it('links use basePath?lang=<locale>', () => {
    render(<BlogLanguageToggle currentLang="en" basePath="/journal" />)
    expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/journal?lang=en')
    expect(screen.getByRole('link', { name: 'ES' })).toHaveAttribute('href', '/journal?lang=es')
  })
})
