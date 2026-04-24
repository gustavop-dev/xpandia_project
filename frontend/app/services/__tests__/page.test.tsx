import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import ServicesPage from '../page'

describe('ServicesPage', () => {
  it('renders the hero heading', () => {
    render(<ServicesPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the SERVICES eyebrow label', () => {
    render(<ServicesPage />)
    expect(screen.getByText('SERVICES')).toBeInTheDocument()
  })

  it('renders a link to the AI Spanish QA Sprint service', () => {
    render(<ServicesPage />)
    expect(screen.getByRole('link', { name: /AI Spanish QA Sprint/i })).toHaveAttribute('href', '/services/qa')
  })

  it('renders a link to the Spanish Launch Readiness Audit service', () => {
    render(<ServicesPage />)
    expect(screen.getByRole('link', { name: /Spanish Launch Readiness Audit/i })).toHaveAttribute('href', '/services/audit')
  })

  it('renders a link to the Fractional Language Quality Lead service', () => {
    render(<ServicesPage />)
    expect(screen.getByRole('link', { name: /Fractional Language Quality Lead/i })).toHaveAttribute('href', '/services/fractional')
  })

  it('renders the comparison section heading', () => {
    render(<ServicesPage />)
    expect(screen.getByText('Which engagement fits?')).toBeInTheDocument()
  })

  it('renders a CTA link to book a diagnostic call', () => {
    render(<ServicesPage />)
    const links = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})
