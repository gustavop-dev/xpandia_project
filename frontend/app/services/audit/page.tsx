import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Spanish Launch Readiness Audit — Xpandia',
  description: "Find what's breaking trust, clarity or conversion in your Spanish experience.",
}

export default function AuditPage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="flex gap-3 mb-7">
            <Link href="/services" className="font-mono text-[11px] tracking-[0.1em] text-ink-500">← ALL SERVICES</Link>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-500">· 02 / AUDIT</span>
          </div>
          <div className="eyebrow mb-8">SPANISH LAUNCH READINESS AUDIT</div>
          <h1 className="hero-display text-[clamp(48px,6vw,92px)] max-w-[17ch]">
            Find what's breaking trust, clarity or <span className="accent-underline">conversion</span> in your Spanish experience.
          </h1>
          <p className="hero-sub mt-8">
            A focused audit of your Spanish/LatAm website, app or user journey to identify quality issues that affect real customers — before they affect revenue.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">Request a Launch Readiness Audit <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Book a diagnostic call</Link>
          </div>

          <div data-stagger className="mt-20 pt-6 border-t border-ink-150 grid grid-cols-2 tablet:grid-cols-4 gap-8">
            {[
              { label: 'TIMELINE', num: '10–12', unit: 'business days' },
              { label: 'SCOPE', num: '3–5', unit: 'critical journeys' },
              { label: 'MARKET', num: '1', unit: 'variant or neutral' },
              { label: 'OUTPUT', num: '1', unit: 'prioritized backlog' },
            ].map(f => (
              <div key={f.label}>
                <div className="eyebrow no-bar">{f.label}</div>
                <div className="font-display text-[28px] mt-2 tracking-[-0.015em]">
                  {f.num} <span className="text-[14px] text-ink-600 font-body">{f.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual */}
      <section className="tight pt-0 pb-0">
        <div className="container">
          <div className="relative aspect-[16/9] tablet:aspect-[24/7] rounded-lg overflow-hidden bg-ink-900">
            <Image src="/assets/photo-audit.jpg" alt="" fill loading="lazy" className="object-cover grayscale contrast-[1.08] brightness-[0.9]" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,20,25,0.3) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.8) 100%)' }}></div>
            <div className="absolute bottom-8 right-8 font-mono text-[11px] tracking-[0.14em] text-white/85 text-right">
              <div className="mb-[6px]">02 / AUDIT</div>
              <div className="text-accent text-[14px] tracking-[0.08em]">PRE-LAUNCH — STRUCTURED REVIEW</div>
            </div>
            <div className="absolute bottom-0 left-0 w-[34%] h-[3px] bg-accent"></div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">THE PROBLEM</div>
            <div>
              <p className="display text-[clamp(26px,2.8vw,40px)] leading-[1.08] tracking-[-0.02em] max-w-[28ch] mb-6">
                You translated your product. You don't know if it's actually ready.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch]">
                Web, app, onboarding, emails, help center, checkout — translated, but untested against real buyer expectations. Conversion is softer than expected. Support tickets mention confusion. Feedback in Spanish reads off. You need expert eyes before launch or relaunch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we review */}
      <section className="tight">
        <div className="container">
          <div className="section-head">
            <h2 className="head-title">What we review.</h2>
            <p className="head-lede">A full pass across the surfaces that shape first impression, usability and trust.</p>
          </div>
          <div data-stagger className="grid grid-cols-2 tablet:grid-cols-4 gap-3 mt-12">
            {[
              { n: '01', title: 'Homepage & key pages' },
              { n: '02', title: 'Onboarding flow' },
              { n: '03', title: 'Lifecycle messages' },
              { n: '04', title: 'Help center content' },
              { n: '05', title: 'UI copy & microcopy' },
              { n: '06', title: 'Forms & flows' },
              { n: '07', title: 'Terminology & consistency' },
              { n: '08', title: 'Regional appropriateness' },
            ].map(c => (
              <div key={c.n} className="p-6 border border-ink-150 rounded-md bg-white">
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.08em] mb-[10px]">{c.n}</div>
                <div className="font-display text-[18px] tracking-[-0.01em]">{c.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="section-head" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="head-title text-paper">What you get.</h2>
            <p className="head-lede text-ink-300">A package your product, marketing and localization leads can act on the same week.</p>
          </div>
          <ol className="num-list mt-12">
            {[
              { title: 'Findings summary', body: "The headline story: what's working, what's breaking, and what needs to move first." },
              { title: 'Issue log with severity', body: 'Every issue documented, categorized, and scored — cosmetic, functional, critical, blocking.' },
              { title: 'Screenshots & examples', body: 'Visual evidence, annotated. Your team sees exactly what the buyer sees.' },
              { title: 'Prioritized backlog', body: 'A backlog your engineers, designers, and content leads can pull into sprint planning on Monday.' },
              { title: 'Quick wins', body: 'The five to ten fixes you can ship this week with the biggest impact on trust and conversion.' },
              { title: 'Remediation guidance', body: "Recommendations on tone, terminology, regional adaptation, and process — not just a list of what's wrong." },
            ].map(d => (
              <li key={d.title} style={{ borderTopColor: 'rgba(255,255,255,0.1)' }}>
                <div>
                  <h4 className="text-paper">{d.title}</h4>
                  <div className="n-body text-ink-300">{d.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fit */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12">
            <div>
              <div className="eyebrow">BEST FOR TEAMS THAT</div>
              <ul className="checklist mt-5">
                <li><span className="chk"></span><span>Have already translated content</span></li>
                <li><span className="chk"></span><span>Need to know whether it is actually ready to ship</span></li>
                <li><span className="chk"></span><span>Want expert eyes before launch or relaunch</span></li>
                <li><span className="chk"></span><span>Are seeing soft conversion, high support, or strange feedback in Spanish</span></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow">NOT THE RIGHT FIT IF</div>
              <ul className="checklist mt-5">
                <li><span className="chk-x"></span><span className="text-ink-500">You only want a simple translation pass</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">No live product or journey exists yet</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">The buyer doesn't control web, product or content</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">You want to skip measurable quality criteria</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">REQUEST THIS AUDIT</div>
          <h2 className="mt-5 text-[clamp(40px,5vw,72px)] leading-none">
            In two weeks, know if your Spanish experience is ready to sell.
          </h2>
          <p className="lede mt-7">
            We'll review your most critical journeys and hand you a backlog prioritized by impact — not a pile of opinions.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Request a Launch Readiness Audit <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Book a diagnostic call</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
