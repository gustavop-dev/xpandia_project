import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import FractionalPage from '../page'

describe('FractionalPage', () => {
  it('renders the hero heading', () => {
    render(<FractionalPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the FRACTIONAL LANGUAGE QUALITY LEAD eyebrow label', () => {
    render(<FractionalPage />)
    expect(screen.getByText('FRACTIONAL LANGUAGE QUALITY LEAD')).toBeInTheDocument()
  })

  it('renders a link back to all services', () => {
    render(<FractionalPage />)
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('renders the request CTA link', () => {
    render(<FractionalPage />)
    const links = screen.getAllByRole('link', { name: /request fractional advisory support/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the ENGAGEMENT spec label', () => {
    render(<FractionalPage />)
    expect(screen.getByText('ENGAGEMENT')).toBeInTheDocument()
  })
})
