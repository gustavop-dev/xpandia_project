import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'AI Spanish QA Sprint — Xpandia',
  description: 'Validate your AI in Spanish before your users do.',
}

export default function QASprintPage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="flex gap-3 mb-7">
            <Link href="/services" className="font-mono text-[11px] tracking-[0.1em] text-ink-500">← ALL SERVICES</Link>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-500">· 01 / SPRINT</span>
          </div>
          <div className="eyebrow mb-8">AI SPANISH QA SPRINT</div>
          <h1 className="hero-display text-[clamp(48px,6vw,92px)] max-w-[16ch]">
            Validate your AI in Spanish before your <span className="accent-underline">users</span> do.
          </h1>
          <p className="hero-sub mt-8">
            Expert review of AI-generated Spanish/LatAm outputs to identify critical quality issues, measure performance and improve readiness for real-world use.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/contact">Request an AI Spanish QA Sprint <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Book a diagnostic call</Link>
          </div>

          <div data-stagger className="mt-20 pt-6 border-t border-ink-150 grid grid-cols-2 tablet:grid-cols-4 gap-8">
            {[
              { label: 'TIMELINE', num: '10', unit: 'business days' },
              { label: 'SCOPE', num: '150–300', unit: 'outputs' },
              { label: 'USE CASE', num: '1', unit: 'per sprint' },
              { label: 'VARIANT', num: '1', unit: 'target Spanish' },
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
            <Image src="/assets/photo-qa.jpg" alt="" fill loading="lazy" className="object-cover grayscale contrast-[1.05]" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,20,25,0.3) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.8) 100%)' }}></div>
            <div className="absolute bottom-8 right-8 font-mono text-[11px] tracking-[0.14em] text-white/85 text-right">
              <div className="mb-[6px]">01 / SPRINT</div>
              <div className="text-accent text-[14px] tracking-[0.08em]">VALIDATION — MEASURABLE</div>
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
                Your AI speaks Spanish. Nobody can tell you if it's good enough to ship.
              </p>
              <p className="text-ink-600 text-[19px] max-w-[62ch]">
                LLMs are variable. Spot checks aren't evaluation. Most teams have copilots, chatbots, tutors or automated content workflows producing Spanish outputs — without a reliable way to know if they're accurate, natural, consistent, or deployable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal for */}
      <section className="tight">
        <div className="container">
          <div className="section-head">
            <h2 className="head-title">Ideal for AI surfaces already in production or pilot.</h2>
            <p className="head-lede">Any product that generates Spanish for real users and needs a structured quality baseline.</p>
          </div>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 mt-12">
            {[
              { title: 'AI copilots', desc: 'In-product assistants generating Spanish responses at scale.' },
              { title: 'Chatbots', desc: 'Customer-facing conversational agents across web, mobile, WhatsApp.' },
              { title: 'Support agents', desc: 'Automated tier-1 support, ticket triage, deflection copy.' },
              { title: 'Tutors', desc: 'EdTech learning agents, feedback engines, adaptive instruction.' },
              { title: 'Knowledge assistants', desc: 'RAG-powered Q&A over internal or customer documentation.' },
              { title: 'Automated content', desc: 'Marketing workflows, product descriptions, email generation.' },
            ].map(c => (
              <div key={c.title} className="p-7 bg-white border border-ink-150 rounded-md">
                <div className="font-display text-[20px] font-medium tracking-[-0.012em] mb-[10px]">{c.title}</div>
                <div className="text-ink-600 text-[15px] leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria — dark */}
      <section className="bg-ink-900 text-paper">
        <div className="container">
          <div className="section-head" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="head-title text-paper">What we assess.</h2>
            <p className="head-lede text-ink-300">Eight criteria, scored against a defined rubric and severity scale — the same framework every deliverable is built on.</p>
          </div>
          <div data-stagger className="grid grid-cols-2 tablet:grid-cols-4 gap-px mt-12 bg-white/[0.08]">
            {[
              { n: '01', title: 'Accuracy', desc: 'Faithful meaning. Factual correctness against source intent.' },
              { n: '02', title: 'Clarity', desc: 'Plain, unambiguous Spanish. No syntactic fog, no double meaning.' },
              { n: '03', title: 'Naturalness', desc: 'Native rhythm and fluency. Not a translation smell.' },
              { n: '04', title: 'Tone & register', desc: "Aligned with your brand voice and the audience's expectations." },
              { n: '05', title: 'Terminology', desc: 'Consistent product and domain terms. No drift across outputs.' },
              { n: '06', title: 'Regional fit', desc: 'Correct variant — es-MX, es-AR, es-419, es-ES — no accidental mix.' },
              { n: '07', title: 'Instruction-following', desc: 'Did the model actually do what it was asked to do, in Spanish?' },
              { n: '08', title: 'Risk & severity', desc: 'Classified by impact: cosmetic, functional, critical, unsafe.' },
            ].map(c => (
              <div key={c.n} className="bg-ink-900 px-6 py-8">
                <div className="font-mono text-[11px] text-ink-400 tracking-[0.1em] mb-3">{c.n}</div>
                <div className="font-display text-[22px] tracking-[-0.012em] mb-2">{c.title}</div>
                <div className="text-[13.5px] text-ink-300 leading-[1.5]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section>
        <div className="container">
          <div className="section-head">
            <h2 className="head-title">What you get.</h2>
            <p className="head-lede">Every Sprint produces these deliverables. They land in one shared folder, documented and presentable to your leadership.</p>
          </div>
          <ol className="num-list mt-12">
            {[
              { title: 'Scope brief', body: 'One document capturing use case, audience, target variant, rubric, sample definition and success criteria — signed off before any review begins.' },
              { title: 'Evaluation rubric', body: 'Custom rubric mapped to your product. Scoring scale per criterion, severity definitions, and examples of each level.' },
              { title: 'Reviewed output master', body: 'The full sample of 150–300 outputs, reviewed line-by-line. Every row annotated with scores, issue tags, severity and reviewer notes.' },
              { title: 'Quality scorecard', body: 'One-page summary per criterion: pass rate, accuracy, clarity, naturalness, terminology, regional fit, critical error rate.' },
              { title: 'Issue taxonomy', body: 'Categorized and counted issues across the sample — what breaks, how often, and where it clusters.' },
              { title: 'Executive readout', body: 'A 5–10 page summary and a 45-minute presentation to your Product, CX, or AI leadership. Findings, recommendations, priorities.' },
              { title: 'Remediation checklist', body: 'A prioritized action list your team can execute: prompt fixes, RAG content cleanup, terminology updates, guardrails to add.' },
            ].map(d => (
              <li key={d.title}>
                <div>
                  <h4>{d.title}</h4>
                  <div className="n-body">{d.body}</div>
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
                <li><span className="chk"></span><span>Already have AI in production or pilot</span></li>
                <li><span className="chk"></span><span>Need a clear quality baseline before scaling</span></li>
                <li><span className="chk"></span><span>Want expert input before expanding markets or increasing volume</span></li>
                <li><span className="chk"></span><span>Need evidence, not guesswork, for leadership</span></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow">NOT THE RIGHT FIT IF</div>
              <ul className="checklist mt-5">
                <li><span className="chk-x"></span><span className="text-ink-500">Your AI product is still pre-prototype</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">You only want prompts translated</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">You can't provide access to output samples</span></li>
                <li><span className="chk-x"></span><span className="text-ink-500">You don't have a defined use case</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-narrow max-w-[900px]">
          <div className="eyebrow">REQUEST THIS SPRINT</div>
          <h2 className="mt-5 text-[clamp(40px,5vw,72px)] leading-none">
            Your AI speaks Spanish.<br />Let's find out how well.
          </h2>
          <p className="lede mt-7">
            Start with a 30-minute diagnostic call. If a Sprint is the right fit, we scope it on the call. If it isn't, we say so.
          </p>
          <div className="hero-ctas mt-10">
            <Link className="btn btn-primary" href="/contact">Request an AI Spanish QA Sprint <span className="btn-arrow"></span></Link>
            <Link className="btn btn-secondary" href="/contact">Book a diagnostic call</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
