import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import AboutPage from '../page'

describe('AboutPage', () => {
  it('renders the hero heading', () => {
    render(<AboutPage />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Spanish expertise for companies building across languages, cultures, and markets\./i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the ABOUT XPANDIA eyebrow label', () => {
    render(<AboutPage />)
    expect(screen.getByText('ABOUT XPANDIA')).toBeInTheDocument()
  })

  it('renders the WHO WE ARE positioning eyebrow', () => {
    render(<AboutPage />)
    expect(screen.getByText('WHO WE ARE')).toBeInTheDocument()
  })

  it('renders the WHY XPANDIA differentiators headline', () => {
    render(<AboutPage />)
    expect(screen.getByText('Spanish quality needs more than a fluent speaker.')).toBeInTheDocument()
  })

  it('renders the "Senior Spanish judgment" differentiator card', () => {
    render(<AboutPage />)
    expect(screen.getByText('Senior Spanish judgment')).toBeInTheDocument()
  })

  it('renders the founder name', () => {
    render(<AboutPage />)
    expect(screen.getByText('Nestor Solano')).toBeInTheDocument()
  })

  it('renders the founder portrait image', () => {
    render(<AboutPage />)
    expect(screen.getByAltText('Nestor Solano portrait')).toBeInTheDocument()
  })

  it('renders the STARTING POINTS pricing eyebrow', () => {
    render(<AboutPage />)
    expect(screen.getByText('STARTING POINTS')).toBeInTheDocument()
  })

  it('renders the Diagnostics starting point card', () => {
    render(<AboutPage />)
    expect(screen.getByText('Diagnostics')).toBeInTheDocument()
  })

  it('renders a CTA link to book a diagnostic call', () => {
    render(<AboutPage />)
    const links = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})
