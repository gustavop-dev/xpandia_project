import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import AuditPage from '../page'

describe('AuditPage', () => {
  it('renders the hero heading', () => {
    render(<AuditPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the SPANISH LAUNCH READINESS AUDIT eyebrow label', () => {
    render(<AuditPage />)
    expect(screen.getByText('SPANISH LAUNCH READINESS AUDIT')).toBeInTheDocument()
  })

  it('renders a link back to all services', () => {
    render(<AuditPage />)
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('renders the request CTA link', () => {
    render(<AuditPage />)
    const links = screen.getAllByRole('link', { name: /request a launch readiness audit/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the TIMELINE spec label', () => {
    render(<AuditPage />)
    expect(screen.getByText('TIMELINE')).toBeInTheDocument()
  })
})
