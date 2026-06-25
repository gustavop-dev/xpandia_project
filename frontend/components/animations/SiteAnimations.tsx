'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { usePathname } from '@/i18n/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const EASE = 'power2.out'
const ENTER_Y = 28
const ENTER_DURATION = 0.72

// Reveal triggers — fire when the element's top crosses a line well below the
// middle of the viewport (70%). A larger % sits lower on the screen, so the
// entrance plays earlier (while the content is still near the bottom, rising
// up) — this keeps the incoming section from sitting blank/empty until it
// reaches center. One constant per animation so each reveal can be tuned
// independently.
const START_SECTION_HEAD = 'top 70%' // .section-head — every section heading
const START_SERVICE_CARD = 'top 70%' // .service-card — home + /services cards
const START_SCORECARD = 'top 70%'    // .scorecard widget + bar fills (home deliverables)
const START_NUM_SPOTLIGHT = 'top 70%' // .num-list-spotlight — 01→0N title highlight
const START_NUM_LIST = 'top 70%'     // .num-list — numbered list items
const START_STAGGER = 'top 70%'      // [data-stagger] — staggered grids
const START_REVEAL = 'top 70%'       // [data-reveal] — individual blocks

// Counters fire eagerly (as they enter from the bottom) so the number counts up
// while visible instead of resetting to 0 once it reaches the top.
const COUNTER_START = 'top 85%'

// Scroll-linked "illumination" for numbered cards/rows: border + soft background
// tint that intensifies with scroll position, peaking near viewport centre.
// GSAP can't interpolate var() tokens, so these are the resolved hex values of
// the design tokens: --accent, --accent-soft, --rule.
const LIT_BORDER = '#1FB5E7' // --accent
const LIT_BG = '#E7F6FC'     // --accent-soft
const DIM_BORDER = '#E6EDF2' // --rule (ink-150)

export default function SiteAnimations() {
  // SiteAnimations lives in the persistent layout, so it does not re-mount on
  // client-side navigation. Re-run on every route change (revertOnUpdate
  // reverts the previous page's tweens/ScrollTriggers first) so each view gets
  // its animations wired up — not just the first page loaded.
  const pathname = usePathname()
  const firstRun = useRef(true)

  // Take over scroll handling: the browser's automatic restoration was retaining
  // the previous view's scroll position across client-side navigation, so a new
  // view appeared scrolled down and its reveals had already "passed".
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Reset to the top on each route change, before paint (useLayoutEffect), so
  // the new view is shown from the top and its reveals fire on scroll. Skip the
  // first run so a refresh keeps the restored position.
  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    window.scrollTo(0, 0)
  }, [pathname])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // ── Hero entrance ─────────────────────────────────────────────────────
      const hero = document.querySelector<HTMLElement>('.hero')
      if (hero) {
        const items = hero.querySelectorAll(':scope > .container > *')
        gsap.from(items, {
          y: ENTER_Y,
          opacity: 0,
          duration: ENTER_DURATION,
          stagger: 0.12,
          ease: EASE,
          delay: 0.05,
        })
      }

      // ── Section heads ──────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.section-head').forEach(el => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: ENTER_DURATION,
          ease: EASE,
          scrollTrigger: { trigger: el, start: START_SECTION_HEAD, once: true },
        })
      })

      // ── Service cards (home + services index) ──────────────────────────────
      // fromTo (not from) with no stagger: batch can re-fire while a card is
      // mid-flight, and from() would capture that offset as the end value,
      // freezing the cards in a staircase. Explicit end values self-heal.
      ScrollTrigger.batch('.service-card', {
        onEnter: els =>
          gsap.fromTo(els,
            { y: ENTER_Y, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: EASE, overwrite: 'auto', clearProps: 'transform' },
          ),
        once: true,
        start: START_SERVICE_CARD,
      })

      // ── Scorecard widget ───────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.scorecard').forEach(el => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          scale: 0.98,
          duration: ENTER_DURATION,
          ease: EASE,
          scrollTrigger: { trigger: el, start: START_SCORECARD, once: true },
        })
        // Bars fill from the left (scaleX keeps the per-row width from the JSON).
        gsap.fromTo(el.querySelectorAll('.scorecard-bar > span'),
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: EASE,
            overwrite: 'auto',
            clearProps: 'transform',
            scrollTrigger: { trigger: el, start: START_SCORECARD, once: true },
          },
        )
      })

      // ── Numbered lists — sequential title spotlight (01 → 0N) ──────────────
      gsap.utils.toArray<HTMLElement>('.num-list-spotlight').forEach(list => {
        gsap.fromTo(list.querySelectorAll('h4'),
          { opacity: 0.3 },
          {
            opacity: 1,
            duration: 0.55,
            stagger: 0.35,
            ease: EASE,
            overwrite: 'auto',
            clearProps: 'opacity',
            scrollTrigger: { trigger: list, start: START_NUM_SPOTLIGHT, once: true },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.num-list').forEach(list => {
        gsap.fromTo(list.querySelectorAll('li'),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: EASE,
            overwrite: 'auto',
            clearProps: 'transform',
            scrollTrigger: { trigger: list, start: START_NUM_LIST, once: true },
          },
        )
      })

      // ── [data-stagger] — grid containers whose children stagger in ─────────
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach(container => {
        gsap.fromTo(Array.from(container.children),
          { y: ENTER_Y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: EASE,
            overwrite: 'auto',
            clearProps: 'transform',
            scrollTrigger: { trigger: container, start: START_STAGGER, once: true },
          },
        )
      })

      // ── [data-reveal] — individual blocks ─────────────────────────────────
      ScrollTrigger.batch('[data-reveal]', {
        onEnter: els =>
          gsap.fromTo(els,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: ENTER_DURATION, stagger: 0.08, ease: EASE, overwrite: 'auto', clearProps: 'transform' },
          ),
        once: true,
        start: START_REVEAL,
      })

      // ── [data-parallax] — subtle scroll-linked drift ──────────────────────
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => {
        const amount = (parseFloat(el.dataset.parallax || '') || 0.18) * 100
        gsap.fromTo(el,
          { yPercent: amount },
          {
            yPercent: -amount,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      // ── [data-counter] — count up to the number already in the DOM ────────
      gsap.utils.toArray<HTMLElement>('[data-counter]').forEach(el => {
        const raw = (el.textContent || '').trim()
        const m = raw.match(/^(\D*)([\d.,]+)(.*)$/s)
        if (!m) return
        const [, prefix, numStr, suffix] = m
        const target = parseFloat(numStr.replace(/,/g, ''))
        if (!isFinite(target)) return
        const decimals = (numStr.split('.')[1] || '').length
        const grouped = numStr.includes(',')
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: COUNTER_START, once: true },
          onUpdate: () => {
            const n = obj.v.toFixed(decimals)
            el.textContent = prefix + (grouped ? Number(n).toLocaleString('en-US') : n) + suffix
          },
        })
      })

      // ── Scroll-linked illumination — numbered cards + list rows ───────────
      // Border + faint background tint scrubs from neutral → accent as the
      // element rises to the viewport centre (and reverses on scroll-up).
      // Paint-only properties (no layout/shadow) to keep it cheap; gated by the
      // reduced-motion matchMedia block above so it no-ops for those users.
      const illuminate = (
        el: HTMLElement,
        opts: { borderProp: 'borderColor' | 'borderTopColor'; dimBg: string; litBg: string },
      ) => {
        gsap.fromTo(el,
          { [opts.borderProp]: DIM_BORDER, backgroundColor: opts.dimBg },
          {
            [opts.borderProp]: LIT_BORDER,
            backgroundColor: opts.litBg,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: 0.6 },
          },
        )
      }
      // Grid cards: full border + white → soft-cyan background.
      gsap.utils.toArray<HTMLElement>('[data-illuminate], .service-card').forEach(card =>
        illuminate(card, { borderProp: 'borderColor', dimBg: '#FFFFFF', litBg: LIT_BG }),
      )
      // Numbered list rows have only a top rule, so animate borderTopColor and a
      // faint tint. Use a LOW-ALPHA accent (cyan) rather than the opaque light
      // accent-soft: rows appear on both light AND dark sections (e.g. the home
      // "methodology" block), and an opaque light fill would wash the dark
      // background out. Animating alpha only (same rgb 0 → 0.07) stays subtle on
      // either background and avoids a grey haze.
      gsap.utils.toArray<HTMLElement>('.num-list li').forEach(row =>
        illuminate(row, { borderProp: 'borderTopColor', dimBg: 'rgba(31,181,231,0)', litBg: 'rgba(31,181,231,0.07)' }),
      )

      // ── Magnetic hero CTAs — pointer-follow micro-interaction ─────────────
      const magneticCleanups: Array<() => void> = []
      gsap.utils.toArray<HTMLElement>('.hero-ctas .btn').forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' })
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' })
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3)
          yTo((e.clientY - (r.top + r.height / 2)) * 0.45)
        }
        const onLeave = () => { xTo(0); yTo(0) }
        btn.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)
        magneticCleanups.push(() => {
          btn.removeEventListener('mousemove', onMove)
          btn.removeEventListener('mouseleave', onLeave)
        })
      })

      return () => magneticCleanups.forEach(fn => fn())
    })

    // Recalculate trigger positions now that the new view is mounted at the top.
    ScrollTrigger.refresh()

    return () => mm.revert()
  }, { dependencies: [pathname], revertOnUpdate: true })

  return null
}
