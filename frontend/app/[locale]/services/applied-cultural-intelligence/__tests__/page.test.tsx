import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import AppliedCulturalIntelligencePage, { generateMetadata } from '../page'

const makeParams = (locale = 'en') => Promise.resolve({ locale })

describe('AppliedCulturalIntelligencePage', () => {
  it('renders the hero heading', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /make better decisions with cultural context/i
    )
  })

  it('renders the APPLIED CULTURAL INTELLIGENCE eyebrow', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    const eyebrows = screen.getAllByText('APPLIED CULTURAL INTELLIGENCE')
    expect(eyebrows.length).toBeGreaterThan(0)
  })

  it('renders a link back to all services', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('renders the positioning section headline', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    expect(
      screen.getByText('Culture is the hidden operating system behind global business.')
    ).toBeInTheDocument()
  })

  it('renders the WHAT WE HELP YOU UNDERSTAND section eyebrow', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    expect(screen.getByText('WHAT WE HELP YOU UNDERSTAND')).toBeInTheDocument()
  })

  it('renders the CORE SERVICES eyebrow', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    expect(screen.getByText('CORE SERVICES')).toBeInTheDocument()
  })

  it('renders the methodology section headline', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    expect(
      screen.getByText('A practical path from cultural uncertainty to better decisions.')
    ).toBeInTheDocument()
  })

  it('renders the book an ACI talk CTA link', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /book an aci talk/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the book a diagnostic call CTA link', async () => {
    renderWithIntl(await AppliedCulturalIntelligencePage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})

describe('generateMetadata — applied cultural intelligence page', () => {
  it('returns a title matching Applied Cultural Intelligence', async () => {
    const meta = await generateMetadata({ params: makeParams() })
    expect(meta.title).toMatch(/Applied Cultural Intelligence/i)
  })

  it('returns the canonical alternates for the ACI page', async () => {
    const meta = await generateMetadata({ params: makeParams() })
    expect((meta.alternates as any)?.canonical).toBe('/services/applied-cultural-intelligence')
  })
})
