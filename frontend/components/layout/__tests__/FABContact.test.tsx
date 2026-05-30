import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import FABContact from '../FABContact'

describe('FABContact', () => {
  it('renders a link pointing to the contact page', () => {
    renderWithIntl(<FABContact />)
    expect(screen.getByRole('link', { name: /let.s talk/i })).toHaveAttribute('href', '/contact')
  })

  it('renders the button label text', () => {
    renderWithIntl(<FABContact />)
    expect(screen.getByText(/let.s talk/i)).toBeInTheDocument()
  })

  it('renders the SVG email icon', () => {
    const { container } = renderWithIntl(<FABContact />)
    const svg = container.getElementsByTagName('svg')[0]
    expect(svg).toBeInTheDocument()
  })
})
