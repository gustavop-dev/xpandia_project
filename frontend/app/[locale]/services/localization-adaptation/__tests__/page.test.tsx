import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import LocalizationAdaptationPage, { generateMetadata } from '../page'

const makeParams = (locale = 'en') => Promise.resolve({ locale })

describe('LocalizationAdaptationPage', () => {
  it('renders the hero heading', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'More than translated. Built for Spanish-speaking audiences.'
    )
  })

  it('renders the SPANISH EXPERIENCE REPAIR & ADAPTATION eyebrow label', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    const eyebrows = screen.getAllByText('SPANISH EXPERIENCE REPAIR & ADAPTATION')
    expect(eyebrows.length).toBeGreaterThan(0)
  })

  it('renders a link back to all services', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('renders the request Spanish Experience Repair CTA link', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /request spanish experience repair/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the positioning section headline', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    expect(
      screen.getByText('Translation helps users read. Adaptation helps users trust, understand, and act.')
    ).toBeInTheDocument()
  })

  it('renders the WHAT WE ADAPT eyebrow', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    expect(screen.getByText('WHAT WE ADAPT')).toBeInTheDocument()
  })

  it('renders the CORE SERVICES eyebrow', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    expect(screen.getByText('CORE SERVICES')).toBeInTheDocument()
  })

  it('renders the methodology headline', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    expect(
      screen.getByText('A practical path from existing Spanish to audience-ready Spanish.')
    ).toBeInTheDocument()
  })

  it('renders the book diagnostic call CTA link', async () => {
    renderWithIntl(await LocalizationAdaptationPage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})

describe('generateMetadata — localization page', () => {
  it('returns a title matching Spanish Experience Repair & Adaptation', async () => {
    const meta = await generateMetadata({ params: makeParams() })
    expect(meta.title).toMatch(/Spanish Experience Repair & Adaptation/i)
  })

  it('returns the canonical alternates for the localization page', async () => {
    const meta = await generateMetadata({ params: makeParams() })
    expect((meta.alternates as any)?.canonical).toBe('/services/localization-adaptation')
  })
})
