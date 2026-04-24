import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Services — Xpandia',
  description: 'Three engagements. One standard of quality.',
}

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">SERVICES</div>
          <h1 className="hero-display text-[clamp(48px,6vw,96px)] max-w-[18ch]">
            Three engagements. <span className="accent-underline">One standard</span> of quality.
          </h1>
          <p className="hero-sub mt-8">
            Each offering is scoped, timed, and priced for a specific stage of your Spanish/LatAm operation — from AI output validation to continuous senior oversight.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>

      {/* Visual banner */}
      <section className="tight pt-0 pb-0">
        <div className="container">
          <div className="relative aspect-[16/9] tablet:aspect-[24/7] rounded-lg overflow-hidden bg-ink-900">
            <Image src="/assets/img-services.jpg" alt="" fill loading="lazy" className="object-cover grayscale contrast-[1.05] brightness-[0.92]" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,20,25,0.7) 0%, rgba(15,20,25,0.2) 45%, transparent 100%)' }}></div>
            <div className="absolute top-8 left-8 flex items-center gap-[6px]">
              <div className="w-4 h-[1.5px] bg-white/55"></div>
              <div className="w-4 h-[1.5px] bg-white/75"></div>
              <div className="w-4 h-[1.5px] bg-white/95"></div>
            </div>
            <div className="absolute bottom-8 left-8 text-paper max-w-[38ch]">
              <div className="font-mono text-[11px] tracking-[0.14em] text-white/70 mb-[10px]">OUR WORK</div>
              <div className="font-display italic font-normal text-[clamp(22px,2.2vw,34px)] tracking-[-0.02em] leading-[1.15]">Scoped, senior, and measurable — never open-ended.</div>
            </div>
            <div className="absolute bottom-0 right-0 w-[38%] h-[3px] bg-accent"></div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="tight">
        <div className="container">
          <div data-stagger className="grid grid-cols-1 gap-0">
            {[
              {
                href: '/services/qa',
                num: '01 / SPRINT',
                title: 'AI Spanish QA Sprint',
                meta: '10 BUSINESS DAYS · 150–300 OUTPUTS',
                desc: 'Validate your AI in Spanish before your users do. Expert review of AI-generated Spanish/LatAm outputs with scoring, severity and prioritized recommendations.',
              },
              {
                href: '/services/audit',
                num: '02 / AUDIT',
                title: 'Spanish Launch Readiness Audit',
                meta: '10–12 BUSINESS DAYS · 3–5 JOURNEYS',
                desc: "Find what's breaking trust, clarity or conversion in your Spanish experience. Web, app or customer journey review before launch or relaunch.",
              },
              {
                href: '/services/fractional',
                num: '03 / FRACTIONAL',
                title: 'Fractional Language Quality Lead',
                meta: 'MONTHLY RETAINER · 3 MONTH MIN.',
                desc: 'Senior-level language quality leadership, without a full-time hire. Monthly advisory for quality, governance and AI evaluation.',
                last: true,
              },
            ].map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="row-hover service-row grid grid-cols-1 tablet:grid-cols-[140px_1.4fr_2fr_auto] gap-8 items-center py-10 border-t border-ink-150 transition-[background,padding] duration-[150ms] last:border-b last:border-ink-150"
              >
                <div className="font-mono text-[12px] text-ink-500 tracking-[0.1em]">{s.num}</div>
                <div>
                  <div className="font-display text-[clamp(26px,2.6vw,38px)] font-medium tracking-[-0.02em] leading-[1.08]">{s.title}</div>
                  <div className="font-mono text-[11px] text-ink-500 tracking-[0.08em] mt-[10px]">{s.meta}</div>
                </div>
                <div className="text-ink-600 text-[16px] leading-[1.5] max-w-[56ch]">{s.desc}</div>
                <div className="font-mono text-[11px] text-ink-900 tracking-[0.12em]">LEARN MORE →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="bg-ink-50">
        <div className="container">
          <div className="section-head">
            <h2 className="head-title">Which engagement fits?</h2>
            <p className="head-lede">A quick comparison. On a diagnostic call we'll confirm the right fit — or tell you none of them are.</p>
          </div>

          <div data-reveal className="comparison-wrap">
            <div className="comparison-table mt-12 bg-white border border-ink-150 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] px-7 py-[22px] bg-ink-900 text-paper font-mono text-[11px] tracking-[0.1em]">
                <div></div>
                <div>QA SPRINT</div>
                <div>LAUNCH AUDIT</div>
                <div>FRACTIONAL LEAD</div>
              </div>
              {[
                { label: 'You have AI outputs in Spanish', qa: '●', audit: '○', frac: '◐' },
                { label: 'Launching or relaunching a Spanish product', qa: '○', audit: '●', frac: '○' },
                { label: 'Need continuous senior oversight', qa: '○', audit: '○', frac: '●' },
                { label: 'Have vendors but need governance', qa: '○', audit: '◐', frac: '●' },
                { label: 'Timeline to insight', qa: '2 weeks', audit: '2 weeks', frac: 'Ongoing' },
                { label: 'Deliverable', qa: 'Scorecard', audit: 'Backlog', frac: 'Dashboard' },
              ].map(row => (
                <div key={row.label} className="grid grid-cols-[1.4fr_1fr_1fr_1fr] px-7 py-[22px] border-t border-ink-150 text-[14px]">
                  <div className="text-ink-600">{row.label}</div>
                  <div className={row.qa === '●' ? 'text-ink-900 font-medium' : row.qa === '◐' ? 'text-ink-700' : 'text-ink-300'}>{row.qa}</div>
                  <div className={row.audit === '●' ? 'text-ink-900 font-medium' : row.audit === '◐' ? 'text-ink-700' : 'text-ink-300'}>{row.audit}</div>
                  <div className={row.frac === '●' ? 'text-ink-900 font-medium' : row.frac === '◐' ? 'text-ink-700' : 'text-ink-300'}>{row.frac}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="font-mono text-[11px] text-ink-500 tracking-[0.08em] mt-4">
            ● PRIMARY FIT · ◐ POSSIBLE FIT · ○ NOT A FIT
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">STILL NOT SURE?</div>
          <h2 className="mt-5 text-[clamp(36px,4.5vw,60px)] leading-[1.02]">
            Bring your context. We'll tell you what's needed — or that nothing is.
          </h2>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
