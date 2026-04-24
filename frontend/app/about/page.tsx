import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About — Xpandia',
  description: 'Built by a senior operator. Not by an agency.',
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">ABOUT XPANDIA</div>
          <h1 className="hero-display text-[clamp(48px,6vw,92px)] max-w-[18ch]">
            Built by a senior operator. Not by an agency.
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            Xpandia is a boutique firm of language assurance for Spanish/LatAm in AI, digital product and localization operations. We help companies move from "acceptable" Spanish to a Spanish that is accurate, natural, regionally appropriate and ready to scale.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="tight">
        <div className="container">
          <div data-stagger className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-16 py-14 border-t border-ink-150 items-start">
            <div>
              <div className="aspect-[4/5] rounded-lg relative overflow-hidden bg-ink-900">
                <Image src="/assets/founder.jpg" alt="Founder portrait" fill loading="lazy" className="object-cover grayscale contrast-[1.05]" sizes="(max-width: 900px) 100vw, 35vw" />
                <div className="absolute top-6 left-6 flex items-center gap-[5px] z-[2]">
                  <div className="w-3 h-px bg-white/55"></div>
                  <div className="w-3 h-px bg-white/75"></div>
                  <div className="w-3 h-px bg-white/95"></div>
                </div>
                <div className="absolute bottom-16 right-0 w-[40%] h-[3px] bg-accent"></div>
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5 flex justify-between font-mono text-[10px] tracking-[0.14em] text-white/80" style={{ background: 'linear-gradient(180deg, transparent, rgba(15,20,25,0.85))' }}>
                  <span>FOUNDER · PRINCIPAL</span>
                  <span>XPANDIA</span>
                </div>
              </div>
              <div className="mt-5 font-mono text-[11px] text-ink-500 tracking-[0.08em]">FOUNDER &amp; PRINCIPAL · XPANDIA</div>
            </div>
            <div>
              <div className="eyebrow">FOUNDING LINE</div>
              <p className="display text-[clamp(26px,2.8vw,42px)] leading-[1.1] tracking-[-0.02em] mt-5 mb-8">
                Built by a former Senior Global Localization Program Manager with 20+ years in translation, localization and multilingual operations.
              </p>
              <p className="text-ink-600 text-[19px] leading-[1.55] mb-5">
                Two decades running localization programs for AI, SaaS and EdTech companies — where "good enough" Spanish silently costs conversion, trust and retention. Xpandia exists because these problems rarely get the senior attention they need inside growing companies.
              </p>
              <p className="text-ink-600 text-[19px] leading-[1.55]">
                The work is small by design. One engagement at a time, scoped tightly, senior-led end-to-end. No junior hand-offs. No outsourced reviews. No 360° anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Track record */}
      <section className="tight pt-8 pb-[72px]">
        <div className="container">
          <div className="eyebrow mb-8">TRACK RECORD</div>
          <div data-stagger className="stats-strip grid grid-cols-2 tablet:grid-cols-4 border-t border-ink-900">
            {[
              { display: <><span>20</span><span className="text-accent">+</span></>, label: 'YEARS LEADING LOCALIZATION PROGRAMS', first: true },
              { display: <><span>40</span><span className="text-accent">+</span></>, label: 'ENTERPRISE PROGRAMS SHIPPED TO LATAM & US-HISPANIC', first: false },
              { display: <span>3</span>, label: 'FORTUNE 500 GLOBAL TEAMS LED', first: false },
              { display: <span className="text-[36px]">EN · ES</span>, label: 'NATIVE-LEVEL IN BOTH LANGUAGES', first: false, last: true },
            ].map((s, i) => (
              <div
                key={i}
                className={`py-10 ${i === 0 ? 'pr-7 pl-0' : i === 3 ? 'pl-7 pr-0' : 'px-7'} ${!s.last ? 'border-r border-ink-150' : ''}`}
              >
                <div className="font-display text-[56px] font-medium tracking-[-0.03em] leading-none">
                  {s.display}
                </div>
                <div className="font-mono text-[11px] tracking-[0.08em] text-ink-500 mt-3 leading-[1.5]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div className="section-head">
            <h2 className="head-title">How we operate.</h2>
            <p className="head-lede">Four principles that shape every engagement — from scope definition to the final readout.</p>
          </div>
          <div data-stagger className="grid grid-cols-1 tablet:grid-cols-2 gap-px mt-12 bg-ink-150">
            {[
              { n: '01', title: 'Evidence over opinion.', body: 'Every claim is backed by a defined rubric, a measurable score, and examples pulled from your product. No vibes-based judgments.' },
              { n: '02', title: 'Senior-led, end-to-end.', body: 'The person on the discovery call is the person on the readout. No hand-offs to juniors, no subcontracted reviews, no surprise team changes.' },
              { n: '03', title: 'Scope before speed.', body: 'We define use case, audience and success criteria before a single output is reviewed. Fast work on the wrong scope is worse than no work.' },
              { n: '04', title: 'Commercially useful.', body: 'Every deliverable ends in a decision: ship, fix, escalate, invest, defer. We write for leaders who need to act this quarter — not for a linguistics journal.' },
            ].map(p => (
              <div key={p.n} className="bg-paper p-10">
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.1em] mb-[14px]">{p.n}</div>
                <div className="font-display text-[26px] tracking-[-0.015em] mb-[14px]">{p.title}</div>
                <p className="text-ink-600 leading-[1.55]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section>
        <div className="container">
          <div className="relative aspect-[16/9] tablet:aspect-[24/7] rounded-lg overflow-hidden bg-ink-900 mb-16">
            <Image src="/assets/img-markets.jpg" alt="" fill loading="lazy" className="object-cover grayscale contrast-[1.05] brightness-[0.9]" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,20,25,0.2) 0%, rgba(15,20,25,0.7) 100%)' }}></div>
            <div className="absolute bottom-8 left-8 text-paper">
              <div className="font-mono text-[11px] tracking-[0.14em] text-white/60 mb-[10px]">NORTH AMERICA · EUROPE · LATAM</div>
              <div className="font-display text-[clamp(22px,2.2vw,32px)] tracking-[-0.02em] max-w-[28ch]">Working across borders in English, Spanish and LatAm markets.</div>
            </div>
            <div className="absolute bottom-0 right-0 w-[32%] h-[3px] bg-accent"></div>
          </div>

          <div className="section-head">
            <h2 className="head-title">Where Xpandia works.</h2>
            <p className="head-lede">We work with mid-market AI, SaaS and EdTech teams headquartered in the US, Canada and Europe — selling into Spanish-speaking markets or about to.</p>
          </div>

          <div data-stagger className="grid grid-cols-2 tablet:grid-cols-4 gap-5 mt-12">
            {[
              { label: 'SECTORS', text: 'SaaS B2B · EdTech · AI companies · Fintech · Health-adjacent · BPO/CX tech' },
              { label: 'COMPANY SIZE', text: '50 – 1,500 employees · Series A/B/C or PE-backed' },
              { label: 'HEADQUARTERS', text: 'United States · Canada · Europe' },
              { label: 'BUYER ROLES', text: 'Product · Localization · CX · AI/ML Ops · International Expansion' },
            ].map(c => (
              <div key={c.label} className="p-7 border border-ink-150 rounded-md bg-white">
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.08em] mb-[10px]">{c.label}</div>
                <div className="font-display text-[20px] tracking-[-0.01em] leading-[1.25]">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Xpandia is not — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <div>
              <div className="eyebrow text-ink-400">WHAT XPANDIA IS NOT</div>
              <h2 className="mt-6 text-paper">Clear on what we don't do.</h2>
            </div>
            <ul className="checklist mt-2">
              {['Not a general translation agency', 'Not a generic cultural consultancy', 'Not a low-cost vendor', 'Not a full-service 360° solution', 'Not a replacement for in-house engineering, design or product'].map(item => (
                <li key={item}><span className="chk-x"></span><span className="text-ink-300">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">WORK WITH XPANDIA</div>
          <h2 className="mt-5 text-[clamp(40px,5vw,72px)] leading-none">
            Start with a conversation, not a contract.
          </h2>
          <p className="lede mt-7">A diagnostic call takes 30 minutes. If we can help, we scope. If we can't, we tell you.</p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
