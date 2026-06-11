'use client'

import { useState, useEffect, useRef } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n/context'
import { useTranslations } from '@/lib/i18n/useTranslations'
import type { SupportedLocale } from '@/lib/i18n/config'

export default function XpandiaHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { locale, setLocale } = useLocale()

  function switchLocale(next: SupportedLocale) {
    if (locale !== next) {
      setLocale(next)
      router.replace(pathname, { locale: next })
    }
  }
  const t = useTranslations()
  const activePage = pathname === '/' ? 'home'
    : pathname.startsWith('/services') ? 'services'
    : pathname === '/about' ? 'about'
    : pathname.startsWith('/blog') ? 'blog'
    : pathname === '/contact' ? 'contact'
    : ''
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  function closeDrawer() { setDrawerOpen(false) }

  const linkBase = "text-[14px] font-[450] text-ink-700 relative py-2 transition-colors duration-[150ms] hover:text-ink-900"
  const linkActive = "text-ink-900 nav-active"

  const { nav, cta, servicesDropdown } = t.global.header

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[1001] border-b transition-[border-color] duration-[200ms]",
          "bg-paper/82 backdrop-blur-[16px] backdrop-saturate-[180%]",
          scrolled ? "border-ink-150" : "border-transparent"
        )}
        ref={navRef}
        id="site-nav"
      >
        <div className="max-w-[1280px] mx-auto px-5 py-[14px] tablet:px-[clamp(24px,4vw,64px)] tablet:py-[18px] flex items-center justify-between gap-4 tablet:gap-8">

          <Link className="h-[22px] sm:h-[26px] flex items-center shrink-0" href="/" aria-label="Xpandia">
            <Image src="/assets/logo-full-light.webp" alt="Xpandia" width={138} height={26} className="h-full w-auto" priority />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden tablet:flex items-center gap-7" aria-label="Primary">
            <Link className={cn(linkBase, activePage === 'home' && linkActive)} href="/">Home</Link>

            <div className="relative group">
              <Link className={cn(linkBase, "inline-flex items-center", activePage === 'services' && linkActive)} href="/services">
                {nav.services}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-1 shrink-0">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </Link>
              <div
                className="absolute top-[calc(100%+6px)] left-[-20px] w-[380px] bg-white border border-ink-150 rounded-xl p-[10px] shadow-[0_14px_40px_rgba(15,20,25,0.08),0_2px_6px_rgba(15,20,25,0.04)] opacity-0 invisible -translate-y-1 transition-all duration-[150ms] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0"
                role="menu"
              >
                <Link href="/services" className="block px-4 py-[14px] rounded-t-lg rounded-b-none mb-[6px] pb-4 border-b border-ink-150 transition-colors duration-[120ms] hover:bg-ink-50">
                  <div className="font-display text-[16px] tracking-[-0.01em] text-ink-900 font-medium mb-[3px]">{servicesDropdown.allTitle}</div>
                  <div className="text-[12.5px] text-ink-600 leading-[1.4]">{servicesDropdown.allDesc}</div>
                </Link>
                {servicesDropdown.items.map(item => (
                  <Link key={item.href} href={item.href} className="block px-4 py-[14px] rounded-lg transition-colors duration-[120ms] hover:bg-ink-50">
                    <div className="font-mono text-[10px] tracking-[0.12em] text-ink-500 mb-[6px]">{item.num}</div>
                    <div className="font-display text-[16px] tracking-[-0.01em] text-ink-900 font-medium mb-[3px]">{item.label}</div>
                    <div className="text-[12.5px] text-ink-600 leading-[1.4]">{item.desc}</div>
                  </Link>
                ))}
              </div>
            </div>

            <Link className={cn(linkBase, activePage === 'about' && linkActive)} href="/about">{nav.about}</Link>
            <Link className={cn(linkBase, activePage === 'blog' && linkActive)} href="/blog">{nav.blog}</Link>
          </nav>

          <div className="flex items-center gap-3 tablet:gap-4">
            {/* Language toggle — main bar on all breakpoints */}
            <div className="inline-flex font-mono text-[11px] tracking-[0.08em] border border-ink-200 rounded-full overflow-hidden text-ink-500" role="group" aria-label="Language">
              <button
                className={cn("border-0 px-[10px] py-[6px] cursor-pointer transition-colors", locale === 'en' ? "bg-ink-900 text-paper" : "bg-transparent")}
                onClick={() => switchLocale('en')}
              >EN</button>
              <button
                className={cn("border-0 px-[10px] py-[6px] cursor-pointer transition-colors", locale === 'es' ? "bg-ink-900 text-paper" : "bg-transparent")}
                onClick={() => switchLocale('es')}
              >ES</button>
            </div>

            {/* CTA button — desktop only */}
            <div className="hidden tablet:block">
              <Link className="btn btn-primary btn-small" href="/contact">
                {cta} <span className="btn-arrow"></span>
              </Link>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="inline-flex tablet:hidden w-10 h-10 border border-ink-150 rounded-full bg-transparent cursor-pointer items-center justify-center"
              id="nav-burger"
              aria-label="Menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M1 1H15M1 6H15M1 11H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-0 bg-paper z-[1000] px-6 pb-12 pt-20 overflow-y-auto transition-transform duration-[300ms]",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!drawerOpen}
      >
        <Link href="/" className="block py-[18px] border-b border-ink-150 font-display text-[22px] text-ink-900" onClick={closeDrawer}>Home</Link>
        <div className="mt-5 pb-1 font-mono text-[11px] tracking-[0.14em] text-ink-500">{nav.services.toUpperCase()}</div>
        <Link href="/services" className="block py-[10px] pl-5 text-[15px] text-ink-600 border-b border-ink-150" onClick={closeDrawer}>
          <span className="block font-mono text-[10px] tracking-[0.12em] text-accent mb-1">ALL</span>
          {servicesDropdown.allTitle}
        </Link>
        {servicesDropdown.items.map(item => (
          <Link key={item.href} href={item.href} className="block py-[10px] pl-5 text-[15px] text-ink-600 border-b border-ink-150" onClick={closeDrawer}>
            <span className="block font-mono text-[10px] tracking-[0.12em] text-accent mb-1">{item.num}</span>
            {item.label}
          </Link>
        ))}
        <Link href="/about" className="block mt-5 py-[18px] border-b border-ink-150 font-display text-[22px] text-ink-900" onClick={closeDrawer}>{nav.about}</Link>
        <Link href="/blog" className="block py-[18px] border-b border-ink-150 font-display text-[22px] text-ink-900" onClick={closeDrawer}>{nav.blog}</Link>
        <Link href="/contact" className="btn btn-primary mt-8 w-full justify-center" onClick={closeDrawer}>
          {cta} <span className="btn-arrow"></span>
        </Link>
      </aside>
    </>
  )
}
