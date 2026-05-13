import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import AppliedCulturalIntelligencePage from '../page'

describe('AppliedCulturalIntelligencePage', () => {
  it('renders the hero heading', () => {
    render(<AppliedCulturalIntelligencePage />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /read the invisible rules behind/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the APPLIED CULTURAL INTELLIGENCE eyebrow', () => {
    render(<AppliedCulturalIntelligencePage />)
    expect(screen.getByText('APPLIED CULTURAL INTELLIGENCE')).toBeInTheDocument()
  })

  it('renders a CTA link to book a CQ talk', () => {
    render(<AppliedCulturalIntelligencePage />)
    const links = screen.getAllByRole('link', { name: /book a cq talk/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})
