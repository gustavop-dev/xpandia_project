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
    expect(screen.getByText('Spanish that works for real users.')).toBeInTheDocument()
  })

  it('renders a link to the Language Assurance page', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'Language Assurance' })).toHaveAttribute('href', '/services/language-assurance')
  })

  it('renders a link to the Localization & Adaptation page', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'Localization & Adaptation' })).toHaveAttribute('href', '/services/localization-adaptation')
  })

  it('renders a link to the Applied Cultural Intelligence page', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'Applied Cultural Intelligence' })).toHaveAttribute('href', '/services/applied-cultural-intelligence')
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

  it('renders the email link to hello@xpandia.global', () => {
    render(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'hello@xpandia.global' })).toHaveAttribute('href', 'mailto:hello@xpandia.global')
  })

  it('renders the copyright notice', () => {
    render(<XpandiaFooter />)
    expect(screen.getByText(/© 2026 Xpandia/)).toBeInTheDocument()
  })
})
