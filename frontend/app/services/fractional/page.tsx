import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Fractional Language Quality Lead — Xpandia',
  description: 'Senior language quality leadership, without a full-time hire.',
}

export default function FractionalPage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="flex gap-3 mb-7">
            <Link href="/services" className="font-mono text-[11px] tracking-[0.1em] text-ink-500">← ALL SERVICES</Link>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-500">· 03 / FRACTIONAL</span>
          </div>
          <div className="eyebrow mb-8">FRACTIONAL LANGUAGE QUALITY LEAD</div>
          <h1 className="hero-display text-[clamp(48px,6vw,92px)] max-w-[16ch]">
            Senior language quality leadership, without a <span className="accent-underline">full-time hire</span>.
          </h1>
          <p className="hero-sub mt-8">
            Ongoing advisory for teams that need expert oversight in Spanish/LatAm quality, localization workflows and AI-related language governance.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">Request fractional advisory support <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Book a diagnostic call</Link>
          </div>

          <div data-stagger className="mt-20 pt-6 border-t border-ink-150 grid grid-cols-2 tablet:grid-cols-4 gap-8">
            {[
              { label: 'ENGAGEMENT', num: 'Monthly', unit: 'retainer' },
              { label: 'MIN. TERM', num: '3', unit: 'months' },
              { label: 'CADENCE', num: '2–4', unit: 'meetings / mo.' },
              { label: 'OWNERSHIP', num: 'Senior', unit: 'decisions' },
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
            <Image src="/assets/photo-fractional.jpg" alt="" fill loading="lazy" className="object-cover grayscale contrast-[1.05] brightness-[0.88]" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,20,25,0.3) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.8) 100%)' }}></div>
            <div className="absolute bottom-8 right-8 font-mono text-[11px] tracking-[0.14em] text-white/85 text-right">
              <div className="mb-[6px]">03 / FRACTIONAL</div>
              <div className="text-accent text-[14px] tracking-[0.08em]">ONGOING — EMBEDDED LEADERSHIP</div>
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
                You need senior judgment. You don't need a full-time executive.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch]">
                Vendors, volume, AI workflows and shifting priorities — but no single leader owning Spanish/LatAm quality. The result is rework, inconsistency, and quality decisions made in the wrong room. A Fractional Lead fills the gap without the cost and complexity of a senior hire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="tight">
        <div className="container">
          <div className="section-head">
            <h2 className="head-title">What we support.</h2>
            <p className="head-lede">Every engagement is shaped to your operation. These are the areas we most often own.</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {[
              { title: 'Quality frameworks', desc: 'Definitions of "good", rubrics, severity scales and sign-off gates.' },
              { title: 'Localization workflows', desc: 'End-to-end process design across source, MT, review and publication.' },
              { title: 'Vendor review & governance', desc: 'Scorecards, SLAs, escalation paths and honest assessment of partners.' },
              { title: 'Terminology & style', desc: 'Glossaries, style guides, naming decisions — documented, not tribal.' },
              { title: 'Quality dashboards', desc: 'What leadership sees monthly — the metrics that actually matter.' },
              { title: 'AI output evaluation', desc: 'Structured evals for Spanish, human-in-the-loop design, drift monitoring.' },
              { title: 'Escalation & prioritization', desc: 'Clear rules for what blocks release and what enters the backlog.' },
              { title: 'Governance standards', desc: 'Documentation and oversight aligned with AI Act, GDPR and enterprise risk.' },
              { title: 'Monthly action plans', desc: 'Decisions, not just meetings. Priorities set and reviewed every month.' },
            ].map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
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
            <p className="head-lede text-ink-300">Not a consultant parachuting in. A senior leader embedded in your monthly rhythm — with decision-making, not just input.</p>
          </div>
          <ol className="num-list mt-12">
            {[
              { title: 'Initial diagnosis', body: 'The first 30 days: map of your current operation, risks, vendors, standards, and fastest wins.' },
              { title: 'Governance charter', body: 'Who owns what, how decisions are made, how quality is measured — written and agreed.' },
              { title: 'QA framework', body: 'Rubrics, severity, sign-off gates and escalation paths adapted to your product and markets.' },
              { title: 'Monthly dashboard', body: 'One view, updated monthly: pass rate, rework, defect recurrence, vendor SLAs, cost leakage.' },
              { title: 'Monthly summary & action plan', body: 'A short executive brief with decisions required, trade-offs flagged, next-month priorities.' },
              { title: 'Vendor scorecards', body: 'Quarterly view of partner performance — honest, comparable, and useful in renewal conversations.' },
              { title: 'Quarterly roadmap', body: 'Where quality investments go next — aligned with product, market and AI roadmap.' },
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
                <li><span className="chk"></span><span>Do not need a full-time executive hire</span></li>
                <li><span className="chk"></span><span>Do need consistent expert guidance</span></li>
                <li><span className="chk"></span><span>Want to reduce rework and improve quality over time</span></li>
                <li><span className="chk"></span><span>Operate multilingually with AI or localization at scale</span></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow">NOT THE RIGHT FIT IF</div>
              <ul className="checklist mt-5">
                <li><span className="chk-x"></span><span className="text-ink-500">You want a one-off tactical project</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">There's no internal owner to execute decisions</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">Your organization has no real operation yet</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">You're not ready to commit to a quarter of work</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">START THIS ENGAGEMENT</div>
          <h2 className="mt-5 text-[clamp(40px,5vw,72px)] leading-none">
            Senior oversight, in your monthly cadence.
          </h2>
          <p className="lede mt-7">
            Buy the executive judgment, not the headcount. A fractional engagement starts with a diagnosis and scales to where your operation needs it.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Request fractional advisory support <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Book a diagnostic call</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
