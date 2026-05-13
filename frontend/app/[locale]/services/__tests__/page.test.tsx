import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import ServicesPage, { generateMetadata } from '../page'

const makeParams = (locale = 'en') => Promise.resolve({ locale })

describe('ServicesPage', () => {
  it('renders the hero heading text', async () => {
    renderWithIntl(await ServicesPage({ params: makeParams() }))
    expect(
      screen.getByRole('heading', { level: 1, name: 'The Spanish expertise your product needs.' }),
    ).toBeInTheDocument()
  })

  it('renders the SERVICES eyebrow label', async () => {
    renderWithIntl(await ServicesPage({ params: makeParams() }))
    expect(screen.getByText('SERVICES')).toBeInTheDocument()
  })

  it('links Explore Language Assurance to the language-assurance route', async () => {
    renderWithIntl(await ServicesPage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /Explore Language Assurance/i })
    expect(links[0]).toHaveAttribute('href', '/services/language-assurance')
  })

  it('links Explore Localization & Adaptation to the localization-adaptation route', async () => {
    renderWithIntl(await ServicesPage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /Explore Localization & Adaptation/i })
    expect(links[0]).toHaveAttribute('href', '/services/localization-adaptation')
  })

  it('links Explore Applied Cultural Intelligence to the applied-cultural-intelligence route', async () => {
    renderWithIntl(await ServicesPage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /Explore Applied Cultural Intelligence/i })
    expect(links[0]).toHaveAttribute('href', '/services/applied-cultural-intelligence')
  })

  it('renders the comparison section heading', async () => {
    renderWithIntl(await ServicesPage({ params: makeParams() }))
    expect(
      screen.getByText('The difference is simple: validate, adapt, or understand.'),
    ).toBeInTheDocument()
  })

  it('renders a CTA link to book a diagnostic call', async () => {
    renderWithIntl(await ServicesPage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})

describe('generateMetadata', () => {
  it('returns a title containing Services and Xpandia', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    expect(metadata.title).toMatch(/Services.*Xpandia|Xpandia.*Services/)
  })

  it('returns the canonical alternates for the services path', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    expect(metadata.alternates?.canonical).toBe('/services')
  })

  it('returns hreflang for the es locale', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    const languages = metadata.alternates?.languages as Record<string, string> | undefined
    expect(languages?.es).toBe('/es/services')
  })
})
