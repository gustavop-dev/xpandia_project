import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import ServicesPage from '../page'

describe('ServicesPage', () => {
  it('renders the hero heading', () => {
    render(<ServicesPage />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'The Spanish expertise your product needs.' }),
    ).toBeInTheDocument()
  })

  it('renders the SERVICES eyebrow label', () => {
    render(<ServicesPage />)
    expect(screen.getByText('SERVICES')).toBeInTheDocument()
  })

  it('links Explore Language Assurance to the language-assurance route', () => {
    render(<ServicesPage />)
    const links = screen.getAllByRole('link', { name: /Explore Language Assurance/i })
    expect(links[0]).toHaveAttribute('href', '/services/language-assurance')
  })

  it('links Explore Localization & Adaptation to the localization-adaptation route', () => {
    render(<ServicesPage />)
    const links = screen.getAllByRole('link', { name: /Explore Localization & Adaptation/i })
    expect(links[0]).toHaveAttribute('href', '/services/localization-adaptation')
  })

  it('links Explore Applied Cultural Intelligence to the applied-cultural-intelligence route', () => {
    render(<ServicesPage />)
    const links = screen.getAllByRole('link', { name: /Explore Applied Cultural Intelligence/i })
    expect(links[0]).toHaveAttribute('href', '/services/applied-cultural-intelligence')
  })

  it('renders the comparison section heading', () => {
    render(<ServicesPage />)
    expect(
      screen.getByText('The difference is simple: validate, adapt, or understand.'),
    ).toBeInTheDocument()
  })

  it('renders a CTA link to book a diagnostic call', () => {
    render(<ServicesPage />)
    const links = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})
