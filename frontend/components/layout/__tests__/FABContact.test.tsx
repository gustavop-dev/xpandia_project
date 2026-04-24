import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import FABContact from '../FABContact'

describe('FABContact', () => {
  it('renders a link pointing to the contact page', () => {
    render(<FABContact />)
    expect(screen.getByRole('link', { name: /book a diagnostic call/i })).toHaveAttribute('href', '/contact')
  })

  it('renders the button label text', () => {
    render(<FABContact />)
    expect(screen.getByText('Book a diagnostic call')).toBeInTheDocument()
  })

  it('renders the SVG email icon', () => {
    render(<FABContact />)
    const link = screen.getByRole('link', { name: /book a diagnostic call/i })
    expect(link.querySelector('svg')).toBeInTheDocument()
  })
})
