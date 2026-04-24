import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import XpandiaFooter from '../XpandiaFooter'

describe('XpandiaFooter', () => {
  it('renders the Xpandia logo image', () => {
    render(<XpandiaFooter />)
    expect(screen.getByAltText('Xpandia')).toBeInTheDocument()
  })

  it('renders the tagline text', () => {
    render(<XpandiaFooter />)
    expect(screen.getByText('Spanish that works. Quality you can measure.')).toBeInTheDocument()
  })

  it('renders a link to the AI Spanish QA Sprint page', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'AI Spanish QA Sprint' })).toHaveAttribute('href', '/services/qa')
  })

  it('renders a link to the Launch Readiness Audit page', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'Launch Readiness Audit' })).toHaveAttribute('href', '/services/audit')
  })

  it('renders a link to the Fractional Lead page', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'Fractional Lead' })).toHaveAttribute('href', '/services/fractional')
  })

  it('renders a link to the About page', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('renders a link to the Contact page', () => {
    render(<XpandiaFooter />)
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' })
    expect(contactLinks[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the email link to hello@xpandia.co', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'hello@xpandia.co' })).toHaveAttribute('href', 'mailto:hello@xpandia.co')
  })

  it('renders the copyright notice', () => {
    render(<XpandiaFooter />)
    expect(screen.getByText(/© 2026 XPANDIA/)).toBeInTheDocument()
  })
})
