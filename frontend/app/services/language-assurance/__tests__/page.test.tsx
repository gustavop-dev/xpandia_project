import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import LanguageAssurancePage from '../page'

describe('LanguageAssurancePage', () => {
  it('renders the hero heading', () => {
    render(<LanguageAssurancePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Validate Spanish before your users do.')
  })

  it('renders the LANGUAGE ASSURANCE eyebrow label', () => {
    render(<LanguageAssurancePage />)
    const eyebrows = screen.getAllByText('LANGUAGE ASSURANCE')
    expect(eyebrows.length).toBeGreaterThan(0)
  })

  it('renders a link back to all services', () => {
    render(<LanguageAssurancePage />)
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('renders the request audit CTA link', () => {
    render(<LanguageAssurancePage />)
    const links = screen.getAllByRole('link', { name: /request a language assurance audit/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the WHY LANGUAGE ASSURANCE positioning headline', () => {
    render(<LanguageAssurancePage />)
    expect(screen.getByText('Spanish quality is too important to leave unmeasured.')).toBeInTheDocument()
  })

  it('renders the CORE ENGAGEMENTS section eyebrow', () => {
    render(<LanguageAssurancePage />)
    expect(screen.getByText('CORE ENGAGEMENTS')).toBeInTheDocument()
  })

  it('renders the methodology headline', () => {
    render(<LanguageAssurancePage />)
    expect(screen.getByText('A structured path from Spanish review to release confidence.')).toBeInTheDocument()
  })
})
