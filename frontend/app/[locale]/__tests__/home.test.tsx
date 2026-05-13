import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import HomePage, { generateMetadata } from '../page'

const makeParams = (locale = 'en') => Promise.resolve({ locale })

describe('HomePage', () => {
  it('renders the hero heading text', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Spanish that works for')
  })

  it('renders a link to book a diagnostic call', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders a secondary link to request an audit', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /request an audit/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the hero eyebrow', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    expect(screen.getByText('SPANISH EXPERTISE · AI · SAAS · EDTECH · DIGITAL PRODUCTS')).toBeInTheDocument()
  })

  it('renders the Why Xpandia positioning headline', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    expect(screen.getByText('Spanish quality is product quality.')).toBeInTheDocument()
  })

  it('renders the services overview headline', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    expect(screen.getByText('The Spanish expertise your product needs.')).toBeInTheDocument()
  })

  it('links the Language Assurance service card to its route', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    const link = screen.getByRole('link', { name: /explore language assurance/i })
    expect(link).toHaveAttribute('href', '/services/language-assurance')
  })

  it('links the Localization & Adaptation service card to its route', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    const link = screen.getByRole('link', { name: /explore localization & adaptation/i })
    expect(link).toHaveAttribute('href', '/services/localization-adaptation')
  })

  it('links the Applied Cultural Intelligence service card to its route', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    const link = screen.getByRole('link', { name: /explore applied cultural intelligence/i })
    expect(link).toHaveAttribute('href', '/services/applied-cultural-intelligence')
  })

  it('renders the methodology section eyebrow', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    expect(screen.getByText('METHODOLOGY')).toBeInTheDocument()
  })

  it('renders the deliverables headline', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    expect(screen.getByText('Evidence your team can act on.')).toBeInTheDocument()
  })

  it('renders the Built For section headline', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    expect(screen.getByText('For teams building products and experiences in Spanish.')).toBeInTheDocument()
  })

  it('renders the buyer section headline', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    expect(screen.getByText('Built for the leaders responsible for Spanish quality.')).toBeInTheDocument()
  })

  it('renders the final CTA section eyebrow', async () => {
    renderWithIntl(await HomePage({ params: makeParams() }))
    expect(screen.getByText('NEXT STEP')).toBeInTheDocument()
  })
})

describe('generateMetadata', () => {
  it('returns a title containing the Xpandia brand and Spanish Language Assurance', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    expect(metadata.title).toMatch(/Spanish Language Assurance|Xpandia/)
  })

  it('returns the canonical alternates for the home path', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    expect(metadata.alternates?.canonical).toBe('/')
  })

  it('returns hreflang for the es locale', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    const languages = metadata.alternates?.languages as Record<string, string> | undefined
    expect(languages?.es).toBe('/es')
  })
})
