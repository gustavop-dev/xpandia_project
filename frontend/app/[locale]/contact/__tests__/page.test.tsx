import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import ContactPage, { generateMetadata } from '../page'

jest.mock('@/lib/services/contact', () => ({
  submitContactForm: () => Promise.resolve(),
}))

describe('ContactPage', () => {
  it('renders the hero heading', async () => {
    renderWithIntl(await ContactPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Tell us what your team is building, launching, or improving in Spanish\/English\./i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the CONTACT eyebrow', async () => {
    renderWithIntl(await ContactPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('CONTACT')).toBeInTheDocument()
  })

  it('renders the NEXT STEPS process eyebrow', async () => {
    renderWithIntl(await ContactPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('NEXT STEPS')).toBeInTheDocument()
  })

  it('renders the "A clear path from first contact to action." headline', async () => {
    renderWithIntl(await ContactPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('A clear path from first contact to action.')).toBeInTheDocument()
  })

  it('renders the READY TO START? final CTA eyebrow', async () => {
    renderWithIntl(await ContactPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText('READY TO START?')).toBeInTheDocument()
  })

  it('renders the direct contact email in the hero section', async () => {
    renderWithIntl(await ContactPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getAllByText('hello@xpandia.global').length).toBeGreaterThan(0)
  })

  it('links the hero email as a mailto link', async () => {
    renderWithIntl(await ContactPage({ params: Promise.resolve({ locale: 'en' }) }))
    const links = screen.getAllByRole('link', { name: 'hello@xpandia.global' })
    expect(links[0]).toHaveAttribute('href', 'mailto:hello@xpandia.global')
  })

  it('renders the final CTA headline', async () => {
    renderWithIntl(await ContactPage({ params: Promise.resolve({ locale: 'en' }) }))
    expect(screen.getByText(/find the right Spanish\/English quality path for your team/i)).toBeInTheDocument()
  })
})

describe('generateMetadata (Contact)', () => {
  it('returns a title matching /Contact/', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) })
    expect(meta.title).toMatch(/Contact/)
  })

  it('returns the canonical alternates path /contact', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) })
    expect(meta.alternates?.canonical).toBe('/contact')
  })
})
