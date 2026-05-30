'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function XpandiaFooter() {
  const t = useTranslations()
  const { footer } = t.global

  return (
    <footer className="pt-20 pb-10 bg-ink-900 text-ink-300">
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(24px,4vw,64px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 sm:gap-10 tablet:gap-12 pb-14 border-b border-white/[0.08]">
          <div>
            <Image
              src="/assets/logo-full-dark.svg"
              alt="Xpandia"
              width={113}
              height={32}
              className="h-8 w-auto block mb-5"
            />
            <div className="text-[14px] text-ink-300 max-w-[34ch] leading-[1.5]">
              {footer.tagline}
            </div>
            <div className="mt-3 text-[13px] text-ink-400 max-w-[38ch] leading-[1.5]">
              {footer.description}
            </div>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">{footer.servicesTitle}</h5>
            <ul className="list-none p-0 m-0">
              {footer.serviceLinks.map((link) => (
                <li key={link.href} className="mb-[10px] text-[14px]">
                  <Link href={link.href} className="text-ink-200 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">{footer.companyTitle}</h5>
            <ul className="list-none p-0 m-0">
              {footer.companyLinks.map((link) => (
                <li key={link.href} className="mb-[10px] text-[14px]">
                  <Link href={link.href} className="text-ink-200 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">{footer.startTitle}</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-[10px] text-[14px]">
                <Link href="/contact" className="text-ink-200 hover:text-white transition-colors">{footer.startLink}</Link>
              </li>
            </ul>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-6 mb-4 font-medium">{footer.contactTitle}</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-[10px] text-[14px]">
                <a href={`mailto:${footer.email}`} className="text-ink-200 hover:text-white transition-colors">{footer.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 flex justify-between items-center font-mono text-[11px] tracking-[0.08em] text-ink-400">
          <div>{footer.copyright}</div>
        </div>
      </div>
    </footer>
  )
}
