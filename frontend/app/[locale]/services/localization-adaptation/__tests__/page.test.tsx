import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import LocalizationAdaptationPage from '../page'

describe('LocalizationAdaptationPage', () => {
  it('renders the hero heading', () => {
    render(<LocalizationAdaptationPage />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /more than translated\. built for spanish-speaking audiences\./i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the LOCALIZATION & ADAPTATION eyebrow label', () => {
    render(<LocalizationAdaptationPage />)
    expect(screen.getByText('LOCALIZATION & ADAPTATION')).toBeInTheDocument()
  })

  it('renders a link back to all services', () => {
    render(<LocalizationAdaptationPage />)
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('renders the request a localization review CTA link', () => {
    render(<LocalizationAdaptationPage />)
    const links = screen.getAllByRole('link', { name: /request a localization review/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})
