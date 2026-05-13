import Link from 'next/link'
import Image from 'next/image'

export default function XpandiaFooter() {
  return (
    <footer className="pt-20 pb-10 bg-ink-900 text-ink-300">
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(24px,4vw,64px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-[1.7fr_1fr_1fr_1fr] gap-8 sm:gap-10 tablet:gap-12 pb-14 border-b border-white/[0.08]">
          <div>
            <Image
              src="/assets/logo-full-dark.svg"
              alt="Xpandia"
              width={113}
              height={32}
              className="h-8 w-auto block mb-5"
            />
            <div className="font-display text-[18px] text-white tracking-[-0.01em] mb-2">
              Spanish that works for real users.
            </div>
            <div className="text-[14px] text-ink-300 max-w-[44ch] leading-[1.5]">
              Xpandia helps AI, SaaS, EdTech, and digital product teams validate, localize, and culturally adapt Spanish experiences for Hispanic and Spanish-speaking audiences.
            </div>
            <div className="mt-5 font-mono text-[11px] tracking-[0.08em] text-ink-400">
              SPANISH EXPERTISE · 2026
            </div>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">Services</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-[10px] text-[14px]"><Link href="/services/language-assurance" className="text-ink-200 hover:text-white transition-colors">Language Assurance</Link></li>
              <li className="mb-[10px] text-[14px]"><Link href="/services/localization-adaptation" className="text-ink-200 hover:text-white transition-colors">Localization &amp; Adaptation</Link></li>
              <li className="mb-[10px] text-[14px]"><Link href="/services/applied-cultural-intelligence" className="text-ink-200 hover:text-white transition-colors">Applied Cultural Intelligence</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">Company</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-[10px] text-[14px]"><Link href="/about" className="text-ink-200 hover:text-white transition-colors">About</Link></li>
              <li className="mb-[10px] text-[14px]"><Link href="/contact" className="text-ink-200 hover:text-white transition-colors">Contact</Link></li>
              <li className="mb-[10px] text-[14px]"><Link href="/contact" className="text-ink-200 hover:text-white transition-colors">Book a diagnostic call</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">Contact</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-[10px] text-[14px]"><a href="mailto:hello@xpandia.global" className="text-ink-200 hover:text-white transition-colors">hello@xpandia.global</a></li>
              <li className="mb-[10px] text-[14px]"><Link href="/contact" className="text-ink-200 hover:text-white transition-colors">Request an audit</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 flex justify-between items-center font-mono text-[11px] tracking-[0.08em] text-ink-400">
          <div>© 2026 Xpandia. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
