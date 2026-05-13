import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import HomePage from '../page'

describe('HomePage', () => {
  it('renders the hero heading text', () => {
    render(<HomePage />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Spanish that works for real users.')
  })

  it('renders a link to book a diagnostic call', () => {
    render(<HomePage />)
    const links = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders a secondary link to request an audit', () => {
    render(<HomePage />)
    const links = screen.getAllByRole('link', { name: /request an audit/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the new hero eyebrow', () => {
    render(<HomePage />)
    expect(screen.getByText('SPANISH EXPERTISE · AI · SAAS · EDTECH · DIGITAL PRODUCTS')).toBeInTheDocument()
  })

  it('renders the Why Xpandia positioning headline', () => {
    render(<HomePage />)
    expect(screen.getByText('Spanish quality is product quality.')).toBeInTheDocument()
  })

  it('renders the services overview headline', () => {
    render(<HomePage />)
    expect(screen.getByText('The Spanish expertise your product needs.')).toBeInTheDocument()
  })

  it('links the Language Assurance service card to its route', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /explore language assurance/i })
    expect(link).toHaveAttribute('href', '/services/language-assurance')
  })

  it('links the Localization & Adaptation service card to its route', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /explore localization & adaptation/i })
    expect(link).toHaveAttribute('href', '/services/localization-adaptation')
  })

  it('links the Applied Cultural Intelligence service card to its route', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /explore applied cultural intelligence/i })
    expect(link).toHaveAttribute('href', '/services/applied-cultural-intelligence')
  })

  it('renders the methodology section', () => {
    render(<HomePage />)
    expect(screen.getByText('METHODOLOGY')).toBeInTheDocument()
  })

  it('renders the deliverables headline', () => {
    render(<HomePage />)
    expect(screen.getByText('Evidence your team can act on.')).toBeInTheDocument()
  })

  it('renders the Built For section headline', () => {
    render(<HomePage />)
    expect(screen.getByText('For teams building products and experiences in Spanish.')).toBeInTheDocument()
  })

  it('renders the buyer section headline', () => {
    render(<HomePage />)
    expect(screen.getByText('Built for the leaders responsible for Spanish quality.')).toBeInTheDocument()
  })

  it('renders the final CTA section', () => {
    render(<HomePage />)
    expect(screen.getByText('NEXT STEP')).toBeInTheDocument()
  })
})
