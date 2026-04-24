import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import HomePage from '../page'

describe('HomePage', () => {
  it('renders the hero heading', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
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

  it('renders the AI Spanish QA Sprint service card', () => {
    render(<HomePage />)
    expect(screen.getByText('AI Spanish QA Sprint')).toBeInTheDocument()
  })

  it('renders the Spanish Launch Readiness Audit service card', () => {
    render(<HomePage />)
    expect(screen.getByText('Spanish Launch Readiness Audit')).toBeInTheDocument()
  })

  it('renders the Fractional Language Quality Lead service card', () => {
    render(<HomePage />)
    expect(screen.getByText('Fractional Language Quality Lead')).toBeInTheDocument()
  })

  it('renders the methodology section', () => {
    render(<HomePage />)
    expect(screen.getByText('METHODOLOGY')).toBeInTheDocument()
  })

  it('renders the Quality Scorecard preview', () => {
    render(<HomePage />)
    expect(screen.getByText('Quality Scorecard')).toBeInTheDocument()
  })

  it('renders the WHY XPANDIA section', () => {
    render(<HomePage />)
    expect(screen.getByText('WHY XPANDIA')).toBeInTheDocument()
  })

  it('renders the CTA section', () => {
    render(<HomePage />)
    expect(screen.getByText('NEXT STEP')).toBeInTheDocument()
  })
})
