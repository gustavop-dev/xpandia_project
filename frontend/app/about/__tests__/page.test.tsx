import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import AboutPage from '../page'

describe('AboutPage', () => {
  it('renders the hero heading', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the ABOUT XPANDIA eyebrow label', () => {
    render(<AboutPage />)
    expect(screen.getByText('ABOUT XPANDIA')).toBeInTheDocument()
  })

  it('renders the founder portrait image', () => {
    render(<AboutPage />)
    expect(screen.getByAltText('Founder portrait')).toBeInTheDocument()
  })

  it('renders the TRACK RECORD section label', () => {
    render(<AboutPage />)
    expect(screen.getByText('TRACK RECORD')).toBeInTheDocument()
  })

  it('renders the years of experience statistic', () => {
    render(<AboutPage />)
    expect(screen.getByText('YEARS LEADING LOCALIZATION PROGRAMS')).toBeInTheDocument()
  })

  it('renders the principles section heading', () => {
    render(<AboutPage />)
    expect(screen.getByText('How we operate.')).toBeInTheDocument()
  })

  it('renders the "Evidence over opinion" principle', () => {
    render(<AboutPage />)
    expect(screen.getByText('Evidence over opinion.')).toBeInTheDocument()
  })

  it('renders the "Senior-led, end-to-end" principle', () => {
    render(<AboutPage />)
    expect(screen.getByText('Senior-led, end-to-end.')).toBeInTheDocument()
  })

  it('renders a CTA link to book a diagnostic call', () => {
    render(<AboutPage />)
    expect(screen.getByRole('link', { name: /book a diagnostic call/i })).toHaveAttribute('href', '/contact')
  })
})
