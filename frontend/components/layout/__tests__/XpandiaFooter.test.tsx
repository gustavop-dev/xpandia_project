import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import XpandiaFooter from '../XpandiaFooter'

describe('XpandiaFooter', () => {
  it('renders the Xpandia logo image', () => {
    renderWithIntl(<XpandiaFooter />)
    expect(screen.getByAltText('Xpandia')).toBeInTheDocument()
  })

  it('renders the tagline text', () => {
    renderWithIntl(<XpandiaFooter />)
    expect(screen.getByText('Spanish and English that work for real users.')).toBeInTheDocument()
  })

  it('renders a link to the Language Assurance page', () => {
    renderWithIntl(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'Language Assurance' })).toHaveAttribute('href', '/services/language-assurance')
  })

  it('renders a link to the Experience Repair & Adaptation page', () => {
    renderWithIntl(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'Experience Repair & Adaptation' })).toHaveAttribute('href', '/services/localization-adaptation')
  })

  it('renders a link to the Applied Cultural Intelligence page', () => {
    renderWithIntl(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'Applied Cultural Intelligence' })).toHaveAttribute('href', '/services/applied-cultural-intelligence')
  })

  it('renders a link to the About page', () => {
    renderWithIntl(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('renders a link to the Contact page', () => {
    renderWithIntl(<XpandiaFooter />)
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' })
    expect(contactLinks[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the email link to hello@xpandia.global', () => {
    renderWithIntl(<XpandiaFooter />)
    expect(screen.getByRole('link', { name: 'hello@xpandia.global' })).toHaveAttribute('href', 'mailto:hello@xpandia.global')
  })

  it('renders the copyright notice', () => {
    renderWithIntl(<XpandiaFooter />)
    expect(screen.getByText(/© 2013–2026 Xpandia/)).toBeInTheDocument()
  })
})
