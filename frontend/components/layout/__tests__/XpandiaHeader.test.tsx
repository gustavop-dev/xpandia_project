import { describe, it, expect, beforeEach } from '@jest/globals'
import { screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithIntl, renderWithIntlEs } from '@/test-utils/renderWithIntl'

import { usePathname, useRouter } from '@/i18n/navigation'
import XpandiaHeader from '../XpandiaHeader'

const mockUsePathname = usePathname as jest.Mock
const mockUseRouter = useRouter as jest.Mock

describe('XpandiaHeader', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
    mockUseRouter.mockReturnValue({ push: jest.fn(), replace: jest.fn(), refresh: jest.fn(), back: jest.fn() })
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  it('renders the Xpandia logo', () => {
    renderWithIntl(<XpandiaHeader />)
    expect(screen.getByAltText('Xpandia')).toBeInTheDocument()
  })

  it('links the logo to the home route', () => {
    renderWithIntl(<XpandiaHeader />)
    expect(screen.getByRole('link', { name: 'Xpandia' })).toHaveAttribute('href', '/')
  })

  it('renders the Services navigation link', () => {
    renderWithIntl(<XpandiaHeader />)
    const servicesLinks = screen.getAllByRole('link', { name: 'Services' })
    const desktopServices = servicesLinks.find(l => l.closest('nav'))
    expect(desktopServices).toHaveAttribute('href', '/services')
  })

  it('renders the Blog navigation link', () => {
    renderWithIntl(<XpandiaHeader />)
    const blogLinks = screen.getAllByRole('link', { name: 'Blog' })
    expect(blogLinks[0]).toHaveAttribute('href', '/blog')
  })

  it('renders the About navigation link', () => {
    renderWithIntl(<XpandiaHeader />)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    expect(aboutLinks[0]).toHaveAttribute('href', '/about')
  })

  it('renders the Contact navigation link', () => {
    renderWithIntl(<XpandiaHeader />)
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' })
    expect(contactLinks[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the Language Assurance link in the services dropdown', () => {
    renderWithIntl(<XpandiaHeader />)
    const links = screen.getAllByRole('link', { name: /language assurance/i })
    expect(links[0]).toHaveAttribute('href', '/services/language-assurance')
  })

  it('renders the CTA link to the contact page', () => {
    renderWithIntl(<XpandiaHeader />)
    const ctaLinks = screen.getAllByRole('link', { name: /book a diagnostic call/i })
    expect(ctaLinks.length).toBeGreaterThan(0)
    expect(ctaLinks[0]).toHaveAttribute('href', '/contact')
  })

  it('renders the hamburger menu button', () => {
    renderWithIntl(<XpandiaHeader />)
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument()
  })

  it('opens the mobile drawer when the hamburger button is clicked', async () => {
    const user = userEvent.setup()
    renderWithIntl(<XpandiaHeader />)
    const burger = screen.getByRole('button', { name: 'Menu' })
    await user.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the mobile drawer when the hamburger button is clicked again', async () => {
    const user = userEvent.setup()
    renderWithIntl(<XpandiaHeader />)
    const burger = screen.getByRole('button', { name: 'Menu' })
    await user.click(burger)
    await user.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'false')
  })

  it('hides the mobile drawer aside initially', () => {
    renderWithIntl(<XpandiaHeader />)
    // <aside> has implicit ARIA role 'complementary'. Use { hidden: true } so RTL
    // returns the element regardless of its aria-hidden state.
    const aside = screen.getByRole('complementary', { hidden: true })
    expect(aside).toHaveAttribute('aria-hidden', 'true')
  })

  it('shows the mobile drawer aside after the hamburger is clicked', async () => {
    const user = userEvent.setup()
    renderWithIntl(<XpandiaHeader />)
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    const aside = screen.getByRole('complementary', { hidden: true })
    expect(aside).toHaveAttribute('aria-hidden', 'false')
  })

  it('renders a Home link inside the mobile drawer', () => {
    renderWithIntl(<XpandiaHeader />)
    const homeLinks = screen.getAllByRole('link', { name: 'Home', hidden: true })
    expect(homeLinks[0]).toHaveAttribute('href', '/')
  })

  it('calls router.replace with es locale when ES is clicked', async () => {
    const user = userEvent.setup()
    const replace = jest.fn()
    mockUseRouter.mockReturnValue({ replace, push: jest.fn(), refresh: jest.fn(), back: jest.fn() })
    mockUsePathname.mockReturnValue('/about')
    renderWithIntl(<XpandiaHeader />)
    const langGroup = screen.getByRole('group', { name: 'Language' })
    await user.click(within(langGroup).getByRole('button', { name: 'ES' }))
    expect(replace).toHaveBeenCalledWith('/about', { locale: 'es' })
  })

  it('does not call router.replace when the current locale is already EN and EN is clicked', async () => {
    const user = userEvent.setup()
    const replace = jest.fn()
    mockUseRouter.mockReturnValue({ replace, push: jest.fn(), refresh: jest.fn(), back: jest.fn() })
    mockUsePathname.mockReturnValue('/about')
    renderWithIntl(<XpandiaHeader />)
    const langGroup = screen.getByRole('group', { name: 'Language' })
    await user.click(within(langGroup).getByRole('button', { name: 'EN' }))
    expect(replace).not.toHaveBeenCalled()
  })

  it('adds a visible border to the header after the page is scrolled', () => {
    renderWithIntl(<XpandiaHeader />)
    Object.defineProperty(window, 'scrollY', { value: 20, writable: true })
    fireEvent.scroll(window)
    // <header> has implicit ARIA role 'banner'.
    expect(screen.getByRole('banner')).toHaveClass('border-ink-150')
  })

  it('marks the Services link as active on a services sub-route', () => {
    mockUsePathname.mockReturnValue('/services/language-assurance')
    renderWithIntl(<XpandiaHeader />)
    const servicesLinks = screen.getAllByRole('link', { name: 'Services' })
    const desktopServicesLink = servicesLinks.find(l => l.closest('nav'))
    expect(desktopServicesLink).toHaveClass('nav-active')
  })

  it('marks the About link as active on the about route', () => {
    mockUsePathname.mockReturnValue('/about')
    renderWithIntl(<XpandiaHeader />)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    const desktopAboutLink = aboutLinks.find(l => l.closest('nav'))
    expect(desktopAboutLink).toHaveClass('nav-active')
  })

  it('does not mark the Services link as active on an unrecognised route', () => {
    mockUsePathname.mockReturnValue('/unknown')
    renderWithIntl(<XpandiaHeader />)
    const servicesLinks = screen.getAllByRole('link', { name: 'Services' })
    const desktopServicesLink = servicesLinks.find(l => l.closest('nav'))
    expect(desktopServicesLink).not.toHaveClass('nav-active')
  })

  it('renders correctly on the contact route', () => {
    mockUsePathname.mockReturnValue('/contact')
    renderWithIntl(<XpandiaHeader />)
    expect(screen.getByAltText('Xpandia')).toBeInTheDocument()
  })

  it('renders the Spanish Services navigation label when given Spanish messages', () => {
    renderWithIntlEs(<XpandiaHeader />)
    const servicesLinks = screen.getAllByRole('link', { name: 'Servicios' })
    const desktopServices = servicesLinks.find(l => l.closest('nav'))
    expect(desktopServices).toHaveAttribute('href', '/services')
  })
})
