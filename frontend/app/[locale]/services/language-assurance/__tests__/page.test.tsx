import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import LanguageAssurancePage, { generateMetadata } from '../page'

const makeParams = (locale = 'en') => Promise.resolve({ locale })

describe('LanguageAssurancePage', () => {
  it('renders the hero heading', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Validate Spanish before your users do.')
  })

  it('renders the LANGUAGE ASSURANCE eyebrow label', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    const eyebrows = screen.getAllByText('LANGUAGE ASSURANCE')
    expect(eyebrows.length).toBeGreaterThan(0)
  })

  it('renders a link back to all services', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('renders the request AI QA Sprint CTA link', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /request an ai qa sprint/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the WHY LANGUAGE ASSURANCE positioning headline', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    expect(screen.getByText('Spanish quality is too important to leave unmeasured.')).toBeInTheDocument()
  })

  it('renders the WHAT WE EVALUATE eyebrow', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    expect(screen.getByText('WHAT WE EVALUATE')).toBeInTheDocument()
  })

  it('renders the CORE SERVICES section eyebrow', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    expect(screen.getByText('CORE ENGAGEMENTS')).toBeInTheDocument()
  })

  it('renders the methodology headline', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    expect(screen.getByText('A structured path from Spanish review to release confidence.')).toBeInTheDocument()
  })

  it('renders a book diagnostic call CTA link', async () => {
    renderWithIntl(await LanguageAssurancePage({ params: makeParams() }))
    const links = screen.getAllByRole('link', { name: /talk to an expert/i })
    expect(links[0]).toHaveAttribute('href', '/contact')
  })
})

describe('generateMetadata — LanguageAssurancePage', () => {
  it('returns a title containing Language Assurance', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    expect(metadata.title).toMatch(/Language Assurance/)
  })

  it('returns the canonical alternates for the language-assurance path', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    expect(metadata.alternates?.canonical).toBe('/services/language-assurance')
  })

  it('returns hreflang for the es locale', async () => {
    const metadata = await generateMetadata({ params: makeParams() })
    const languages = metadata.alternates?.languages as Record<string, string> | undefined
    expect(languages?.es).toBe('/es/services/language-assurance')
  })
})
