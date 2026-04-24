import Link from 'next/link'
import Image from 'next/image'

export default function XpandiaFooter() {
  return (
    <footer className="pt-20 pb-10 bg-ink-900 text-ink-300">
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(24px,4vw,64px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 sm:gap-10 tablet:gap-12 pb-14 border-b border-white/[0.08]">
          <div>
            <Image
              src="/assets/logo-full-dark.png"
              alt="Xpandia"
              width={120}
              height={32}
              className="h-8 w-auto block mb-5"
            />
            <div className="text-[14px] text-ink-300 max-w-[34ch] leading-[1.5]">
              Spanish that works. Quality you can measure.
            </div>
            <div className="mt-5 font-mono text-[11px] tracking-[0.08em] text-ink-400">
              LANGUAGE ASSURANCE · 2026
            </div>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">Services</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-[10px] text-[14px]"><Link href="/services/qa" className="text-ink-200 hover:text-white transition-colors">AI Spanish QA Sprint</Link></li>
              <li className="mb-[10px] text-[14px]"><Link href="/services/audit" className="text-ink-200 hover:text-white transition-colors">Launch Readiness Audit</Link></li>
              <li className="mb-[10px] text-[14px]"><Link href="/services/fractional" className="text-ink-200 hover:text-white transition-colors">Fractional Lead</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">Company</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-[10px] text-[14px]"><Link href="/about" className="text-ink-200 hover:text-white transition-colors">About</Link></li>
              <li className="mb-[10px] text-[14px]"><Link href="/contact" className="text-ink-200 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mt-0 mb-4 font-medium">Get in touch</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-[10px] text-[14px]"><Link href="/contact" className="text-ink-200 hover:text-white transition-colors">Book a diagnostic call</Link></li>
              <li className="mb-[10px] text-[14px]"><Link href="/contact" className="text-ink-200 hover:text-white transition-colors">Request an audit</Link></li>
              <li className="mb-[10px] text-[14px]"><a href="mailto:hello@xpandia.co" className="text-ink-200 hover:text-white transition-colors">hello@xpandia.co</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 flex justify-between items-center font-mono text-[11px] tracking-[0.08em] text-ink-400">
          <div>© 2026 XPANDIA — ALL RIGHTS RESERVED</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
