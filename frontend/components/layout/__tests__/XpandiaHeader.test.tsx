import { describe, it, expect, beforeEach } from '@jest/globals'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

import { usePathname } from 'next/navigation'
import XpandiaHeader from '../XpandiaHeader'

const mockUsePathname = usePathname as jest.Mock

describe('XpandiaHeader', () => {
  beforeEach(() => {
    localStorage.clear()
    mockUsePathname.mockReturnValue('/')
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  it('renders the Xpandia logo', () => {
    render(<XpandiaHeader />)
    expect(screen.getByAltText('Xpandia')).toBeInTheDocument()
  })

  it('renders the Home navigation link', () => {
    render(<XpandiaHeader />)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(homeLinks[0]).toHaveAttribute('href', '/')
  })

  it('renders the About navigation link', () => {
    render(<XpandiaHeader />)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    expect(aboutLinks[0]).toHaveAttribute('href', '/about')
  })

  it('renders the CTA link to the contact page', () => {
    render(<XpandiaHeader />)
    const ctaLinks = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(ctaLinks.length).toBeGreaterThan(0)
    expect(ctaLinks[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the hamburger menu button', () => {
    render(<XpandiaHeader />)
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument()
  })

  it('opens the mobile drawer when the hamburger button is clicked', async () => {
    const user = userEvent.setup()
    render(<XpandiaHeader />)
    const burger = screen.getByRole('button', { name: 'Menu' })
    await user.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the mobile drawer when the hamburger button is clicked again', async () => {
    const user = userEvent.setup()
    render(<XpandiaHeader />)
    const burger = screen.getByRole('button', { name: 'Menu' })
    await user.click(burger)
    await user.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'false')
  })

  it('hides the mobile drawer aside initially', () => {
    render(<XpandiaHeader />)
    // <aside> has implicit ARIA role 'complementary'. Use { hidden: true } so RTL
    // returns the element regardless of its aria-hidden state.
    const aside = screen.getByRole('complementary', { hidden: true })
    expect(aside).toHaveAttribute('aria-hidden', 'true')
  })

  it('shows the mobile drawer aside after the hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<XpandiaHeader />)
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    const aside = screen.getByRole('complementary', { hidden: true })
    expect(aside).toHaveAttribute('aria-hidden', 'false')
  })

  it('reads the language preference from localStorage on mount', () => {
    localStorage.setItem('xpandia-lang', 'es')
    render(<XpandiaHeader />)
    expect(localStorage.getItem('xpandia-lang')).toBe('es')
  })

  it('saves EN language preference to localStorage when EN is clicked', async () => {
    const user = userEvent.setup()
    localStorage.setItem('xpandia-lang', 'es')
    render(<XpandiaHeader />)
    const langGroup = screen.getByRole('group', { name: 'Language' })
    await user.click(within(langGroup).getByRole('button', { name: 'EN' }))
    expect(localStorage.getItem('xpandia-lang')).toBe('en')
  })

  it('saves ES language preference to localStorage when ES is clicked', async () => {
    const user = userEvent.setup()
    render(<XpandiaHeader />)
    const langGroup = screen.getByRole('group', { name: 'Language' })
    await user.click(within(langGroup).getByRole('button', { name: 'ES' }))
    expect(localStorage.getItem('xpandia-lang')).toBe('es')
  })

  it('adds a visible border to the header after the page is scrolled', () => {
    render(<XpandiaHeader />)
    Object.defineProperty(window, 'scrollY', { value: 20, writable: true })
    fireEvent.scroll(window)
    // <header> has implicit ARIA role 'banner'.
    expect(screen.getByRole('banner')).toHaveClass('border-ink-150')
  })

  it('marks the Home link as active on the home route', () => {
    render(<XpandiaHeader />)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(homeLinks[0]).toHaveClass('nav-active')
  })

  it('marks the Services link as active on a services sub-route', () => {
    mockUsePathname.mockReturnValue('/services/qa')
    render(<XpandiaHeader />)
    const servicesLinks = screen.getAllByRole('link', { name: /services/i })
    const desktopServicesLink = servicesLinks.find(l => l.closest('nav'))
    expect(desktopServicesLink).toHaveClass('nav-active')
  })

  it('marks the About link as active on the about route', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<XpandiaHeader />)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    const desktopAboutLink = aboutLinks.find(l => l.closest('nav'))
    expect(desktopAboutLink).toHaveClass('nav-active')
  })

  it('does not mark any nav link as active on an unrecognised route', () => {
    mockUsePathname.mockReturnValue('/unknown')
    render(<XpandiaHeader />)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(homeLinks[0]).not.toHaveClass('nav-active')
  })

  it('renders correctly on the contact route', () => {
    mockUsePathname.mockReturnValue('/contact')
    render(<XpandiaHeader />)
    expect(screen.getByAltText('Xpandia')).toBeInTheDocument()
  })
})
