import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import AboutPage, { generateMetadata } from '../page'

describe('AboutPage', () => {
  it('renders the hero heading', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /spanish and english expertise for companies building across languages, cultures, and markets\./i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the ABOUT XPANDIA eyebrow label', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('ABOUT XPANDIA')).toBeInTheDocument()
  })

  it('renders the WHO WE ARE positioning eyebrow', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('WHO WE ARE')).toBeInTheDocument()
  })

  it('renders the WHY XPANDIA differentiators headline', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('Spanish quality shapes trust, adoption, and growth.')).toBeInTheDocument()
  })

  it('renders the "Senior Spanish judgment" differentiator card', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('Senior language judgment')).toBeInTheDocument()
  })

  it('renders the founder name', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('Nestor Solano')).toBeInTheDocument()
  })

  it('renders the founder portrait image', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByAltText('Nestor Solano portrait')).toBeInTheDocument()
  })

  it('renders the STARTING POINTS pricing eyebrow', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('STARTING POINTS')).toBeInTheDocument()
  })

  it('renders the Diagnostics starting point card', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('QA Diagnostics')).toBeInTheDocument()
  })

  it('renders CTA links to book a diagnostic call', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    const links = screen.getAllByRole('link', { name: /talk to an expert/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the HOW WE WORK eyebrow', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('HOW WE WORK')).toBeInTheDocument()
  })

  it('renders the WHY TEAMS TRUST XPANDIA proof signals eyebrow', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('WHY TEAMS TRUST XPANDIA')).toBeInTheDocument()
  })

  it('renders the READY TO START? final CTA eyebrow', async () => {
    renderWithIntl(await AboutPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('READY TO START?')).toBeInTheDocument()
  })
})

describe('generateMetadata (About)', () => {
  it('returns a title matching /About Xpandia/', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) })
    expect(meta.title).toMatch(/About Xpandia/)
  })

  it('returns the canonical alternates path /about', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) })
    expect(meta.alternates?.canonical).toBe('/about')
  })
})
