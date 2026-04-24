import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-9">BOUTIQUE LANGUAGE ASSURANCE · AI · SAAS · EDTECH</div>
          <h1 className="hero-display">
            Spanish that works.<br />
            Quality you can <span className="whitespace-nowrap"><span className="accent-underline">measure</span>.</span>
          </h1>
          <p className="hero-sub">
            We help AI, SaaS and EdTech teams validate and improve Spanish/LatAm quality across AI outputs, digital experiences and localization operations.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Request an audit</Link>
          </div>
          <div className="mt-24 pt-7 border-t border-ink-150 grid grid-cols-2 tablet:grid-cols-4 gap-8">
            {[
              { label: 'FOUNDER', text: '20+ years in global localization programs' },
              { label: 'FOCUS', text: 'Spanish · LatAm · 21 regional variants' },
              { label: 'BUYERS', text: 'Product · Localization · AI/ML Ops' },
              { label: 'MARKETS', text: 'US · Canada · Europe' },
            ].map(({ label, text }) => (
              <div key={label}>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mb-[10px]">{label}</div>
                <div className="text-[14px] leading-[1.45] text-ink-700">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero visual */}
      <section className="tight pt-6 pb-6">
        <div className="container">
          <div className="relative aspect-[24/8] bg-ink-900 rounded-lg overflow-hidden">
            <Image
              src="/assets/img-hero-text.jpg"
              alt=""
              fill
              loading="lazy"
              className="object-cover grayscale contrast-[1.05] brightness-[0.85]"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, rgba(15,20,25,0.85) 0%, rgba(15,20,25,0.5) 35%, rgba(15,20,25,0.15) 65%, rgba(15,20,25,0.55) 100%)' }}
            />
            <div className="absolute top-8 left-8 flex items-center gap-[6px] z-[2]">
              <div className="w-4 h-[1.5px] bg-white/55" />
              <div className="w-4 h-[1.5px] bg-white/75" />
              <div className="w-4 h-[1.5px] bg-white/95" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 tablet:bottom-9 tablet:left-8 tablet:right-8 flex justify-between items-start tablet:items-end flex-wrap tablet:flex-nowrap gap-4 tablet:gap-10 z-[2] text-paper">
              <div className="font-display text-[clamp(20px,2vw,32px)] font-normal tracking-[-0.02em] leading-[1.15] max-w-[24ch]">
                Every word your users read is a <em className="italic text-[#7FBEDD]">decision</em>.
              </div>
              <div className="hidden tablet:block font-mono text-[10px] tracking-[0.14em] text-white/60 whitespace-nowrap">
                BOUTIQUE · LANGUAGE ASSURANCE
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-[42%] h-[3px] bg-accent" />
          </div>
        </div>
      </section>

      {/* Value statement */}
      <section className="tight pt-10">
        <div className="container">
          <div data-reveal className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-8 py-14 border-t border-b border-ink-150 items-start">
            <div className="eyebrow">WHY XPANDIA</div>
            <div>
              <p className="display max-w-[22ch]" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 28 }}>
                Most companies can generate Spanish. Fewer can trust it.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[56ch]">
                Not translation. Not generic consulting. <strong className="text-ink-900 font-medium">Expert assurance</strong> — structured quality review, measurable scoring, and senior oversight for AI outputs, digital experiences and localization operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="tight pt-10 pb-10">
        <div className="container">
          <div data-stagger className="grid grid-cols-2 tablet:grid-cols-4 border-t border-b border-ink-150">
            <div className="py-8 pr-4 pl-0 tablet:py-12 tablet:pr-8 border-b border-ink-150 tablet:border-b-0 tablet:border-r tablet:border-ink-150">
              <div className="font-display text-[clamp(44px,4.4vw,68px)] font-medium tracking-[-0.03em] leading-none">20<span className="text-accent">+</span></div>
              <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-[14px]">YEARS IN GLOBAL LOCALIZATION</div>
            </div>
            <div className="py-8 pl-4 pr-0 tablet:py-12 tablet:px-8 border-b border-ink-150 tablet:border-b-0 tablet:border-r tablet:border-ink-150">
              <div className="font-display text-[clamp(44px,4.4vw,68px)] font-medium tracking-[-0.03em] leading-none">12<span className="text-ink-500 text-[0.5em]">/mo</span></div>
              <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-[14px]">MAX. CONCURRENT ENGAGEMENTS</div>
            </div>
            <div className="py-8 pr-4 pl-0 tablet:py-12 tablet:px-8 tablet:border-r tablet:border-ink-150">
              <div className="font-display text-[clamp(44px,4.4vw,68px)] font-medium tracking-[-0.03em] leading-none">21</div>
              <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-[14px]">SPANISH REGIONAL VARIANTS</div>
            </div>
            <div className="py-8 pl-4 pr-0 tablet:py-12 tablet:pl-8 tablet:pr-0">
              <div className="font-display text-[clamp(44px,4.4vw,68px)] font-medium tracking-[-0.03em] leading-none">100<span className="text-accent">%</span></div>
              <div className="font-mono text-[11px] tracking-[0.1em] text-ink-500 mt-[14px]">SENIOR-LED ENGAGEMENTS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="container">
          <div className="section-head">
            <h2 className="head-title">Three focused engagements.</h2>
            <p className="head-lede">Each engagement has a defined scope, timeline and measurable deliverables. No retainers unless you want one.</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-5 mt-12">
            {[
              { href: '/services/qa', num: '01 / SPRINT', title: 'AI Spanish QA Sprint', desc: 'Validate your AI in Spanish before your users do. Expert review of AI-generated Spanish/LatAm outputs with scoring, severity and prioritized recommendations.', meta: '10 BUSINESS DAYS' },
              { href: '/services/audit', num: '02 / AUDIT', title: 'Spanish Launch Readiness Audit', desc: "Find what's breaking trust, clarity or conversion in your Spanish experience. Web, app or customer journey review before launch.", meta: '10–12 BUSINESS DAYS' },
              { href: '/services/fractional', num: '03 / FRACTIONAL', title: 'Fractional Language Quality Lead', desc: 'Senior-level language quality leadership, without a full-time hire. Monthly advisory for quality, governance and AI evaluation processes.', meta: 'MONTHLY RETAINER' },
            ].map(s => (
              <Link key={s.href} className="service-card" href={s.href}>
                <div className="xbar"></div>
                <div className="service-num">{s.num}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-meta">
                  <span>{s.meta}</span>
                  <span>LEARN MORE →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div>
              <div className="eyebrow !text-ink-400">METHODOLOGY</div>
              <h2 style={{ marginTop: 24 }}>A structured path from uncertain quality to deployable Spanish.</h2>
              <p className="text-ink-300 max-w-[38ch]" style={{ marginTop: 24 }}>Every engagement begins with scope and criteria. Every deliverable ends with evidence — not opinions.</p>
            </div>
            <ol className="num-list">
              {[
                { title: 'Diagnose', body: 'Structured intake. We define use case, audience, target variant of Spanish, and what "good" looks like for your product or AI surface.' },
                { title: 'Assess', body: 'Expert review against a defined rubric — accuracy, clarity, naturalness, tone, terminology, regional fit, risk. Scoring per criterion, not vibes.' },
                { title: 'Report', body: 'Executive readout with scorecard, issue taxonomy, severity, prioritized recommendations, and a remediation checklist your team can actually execute.' },
                { title: 'Govern', body: 'Optional continuous engagement: standards, dashboards, vendor oversight, and AI evaluation cadence — as a fractional role, not a full-time hire.' },
              ].map(s => (
                <li key={s.title} style={{ borderTopColor: 'rgba(255,255,255,0.1)' }}>
                  <div>
                    <h4>{s.title}</h4>
                    <div className="n-body !text-ink-300">{s.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Scorecard preview */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div>
              <div className="eyebrow">THE DELIVERABLE</div>
              <h2 style={{ marginTop: 24 }}>Evidence, not guesswork.</h2>
              <p className="lede" style={{ marginTop: 24 }}>Every Xpandia engagement ends with a quality scorecard your Product, CX and AI leaders can read in minutes and act on this quarter.</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Accuracy', 'Clarity', 'Naturalness', 'Tone & register', 'Terminology', 'Regional fit', 'Instruction-following', 'Severity'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="scorecard" aria-hidden="true">
              <div className="scorecard-head">
                <div className="scorecard-title">Quality Scorecard</div>
                <div className="font-mono text-[11px] text-ink-500 tracking-[0.06em]">SAMPLE · N=240 OUTPUTS</div>
              </div>
              {[
                { label: 'Pass rate', width: '78%', val: '78%', accent: true },
                { label: 'Accuracy', width: '86%', val: '4.3 / 5' },
                { label: 'Clarity', width: '72%', val: '3.6 / 5' },
                { label: 'Naturalness', width: '64%', val: '3.2 / 5' },
                { label: 'Terminology', width: '58%', val: '2.9 / 5' },
                { label: 'Regional fit', width: '81%', val: '4.1 / 5' },
                { label: 'Critical error rate', width: '12%', val: '3.1%', dim: true },
              ].map(r => (
                <div key={r.label} className="scorecard-row">
                  <div className="scorecard-label">{r.label}</div>
                  <div className={`scorecard-bar${r.accent ? ' accent' : ''}`}>
                    <span style={{ width: r.width, ...(r.dim ? { background: '#4A5259' } : {}) }}></span>
                  </div>
                  <div className="scorecard-value">{r.val}</div>
                </div>
              ))}
              <div className="mt-[18px] pt-4 border-t border-ink-150 text-[11px] text-ink-500 leading-[1.5]">
                OUTPUT SAMPLE · USE CASE: SUPPORT COPILOT · VARIANT: es-MX · REVIEWER: XPANDIA SENIOR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience fit */}
      <section className="tight bg-ink-50">
        <div className="container">
          <div data-stagger className="grid grid-cols-1 tablet:grid-cols-3 gap-12">
            <div>
              <div className="eyebrow">BUILT FOR</div>
              <ul className="checklist" style={{ marginTop: 24 }}>
                <li><span className="chk"></span><span>SaaS entering LatAm with existing Spanish content</span></li>
                <li><span className="chk"></span><span>EdTech platforms with multilingual users</span></li>
                <li><span className="chk"></span><span>AI companies shipping chatbots, tutors or copilots in Spanish</span></li>
                <li><span className="chk"></span><span>Product teams preparing launches or relaunches</span></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow">WHO BUYS</div>
              <ul className="checklist" style={{ marginTop: 24 }}>
                <li><span className="chk"></span><span>Head of Product · VP Product</span></li>
                <li><span className="chk"></span><span>Director of Localization</span></li>
                <li><span className="chk"></span><span>VP Customer Experience</span></li>
                <li><span className="chk"></span><span>AI / ML Product Lead · Trust &amp; Safety</span></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow">NOT A FIT</div>
              <ul className="checklist" style={{ marginTop: 24 }}>
                <li><span className="chk-x"></span><span className="text-ink-500">Teams looking for cheap, fast translation</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">Companies without a live digital product</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">One-off prompt localization tasks</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">Organizations with no internal owner</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow">NEXT STEP</div>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1.0 }}>
            In{' '}
            <span className="relative inline-block">
              30 minutes<span className="absolute left-0 right-0 bottom-[0.08em] h-[2px] bg-accent"></span>
            </span>
            , we tell you whether your Spanish is ready to scale.
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            A diagnostic call is free and scoped to your product. We review your current Spanish surface, identify the biggest risks, and recommend the right engagement — or no engagement at all.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Request an audit</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
