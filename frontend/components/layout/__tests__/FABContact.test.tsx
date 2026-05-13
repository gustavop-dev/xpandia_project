import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import FABContact from '../FABContact'

describe('FABContact', () => {
  it('renders a link pointing to the contact page', async () => {
    const ui = await FABContact()
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: /book a diagnostic call/i })).toHaveAttribute('href', '/contact')
  })

  it('renders the button label text', async () => {
    const ui = await FABContact()
    renderWithIntl(ui)
    expect(screen.getByText('Book a diagnostic call')).toBeInTheDocument()
  })

  it('renders the SVG email icon', async () => {
    const ui = await FABContact()
    const { container } = renderWithIntl(ui)
    // Scope the SVG lookup to the rendered container rather than the global document.
    const svg = container.getElementsByTagName('svg')[0]
    expect(svg).toBeInTheDocument()
  })
})
