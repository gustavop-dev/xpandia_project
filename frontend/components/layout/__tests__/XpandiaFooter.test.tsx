import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import XpandiaFooter from '../XpandiaFooter'

describe('XpandiaFooter', () => {
  it('renders the Xpandia logo image', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    expect(screen.getByAltText('Xpandia')).toBeInTheDocument()
  })

  it('renders the tagline text', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    expect(screen.getByText('Spanish that works for real users.')).toBeInTheDocument()
  })

  it('renders a link to the Language Assurance page', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: 'Language Assurance' })).toHaveAttribute('href', '/services/language-assurance')
  })

  it('renders a link to the Spanish Experience Repair & Adaptation page', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: 'Spanish Experience Repair & Adaptation' })).toHaveAttribute('href', '/services/localization-adaptation')
  })

  it('renders a link to the Applied Cultural Intelligence page', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: 'Applied Cultural Intelligence' })).toHaveAttribute('href', '/services/applied-cultural-intelligence')
  })

  it('renders a link to the About page', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('renders a link to the Contact page', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' })
    expect(contactLinks[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the email link to hello@xpandia.global', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: 'hello@xpandia.global' })).toHaveAttribute('href', 'mailto:hello@xpandia.global')
  })

  it('renders the copyright notice', async () => {
    const ui = await XpandiaFooter()
    renderWithIntl(ui)
    expect(screen.getByText(/© 2013–2026 Xpandia/)).toBeInTheDocument()
  })
})
