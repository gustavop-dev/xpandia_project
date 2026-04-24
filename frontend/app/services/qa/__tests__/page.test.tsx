import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import QASprintPage from '../page'

describe('QASprintPage', () => {
  it('renders the hero heading', () => {
    render(<QASprintPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the AI SPANISH QA SPRINT eyebrow label', () => {
    render(<QASprintPage />)
    expect(screen.getByText('AI SPANISH QA SPRINT')).toBeInTheDocument()
  })

  it('renders a link back to all services', () => {
    render(<QASprintPage />)
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('renders the request CTA link', () => {
    render(<QASprintPage />)
    const links = screen.getAllByRole('link', { name: /request an ai spanish qa sprint/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the TIMELINE spec label', () => {
    render(<QASprintPage />)
    expect(screen.getByText('TIMELINE')).toBeInTheDocument()
  })
})
