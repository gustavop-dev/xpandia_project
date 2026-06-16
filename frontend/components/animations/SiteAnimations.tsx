'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const EASE = 'power2.out'
const ENTER_Y = 28
const ENTER_DURATION = 0.72

export default function SiteAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // ── Hero entrance ─────────────────────────────────────────────────────
      const heroSel = '.hero'
      const hero = document.querySelector<HTMLElement>(heroSel)
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
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      // ── Service cards (home + services index) ──────────────────────────────
      // fromTo (not from) with no stagger: batch can re-fire while a card is
      // mid-flight, and from() would capture that offset as the end value,
      // freezing the cards in a staircase. Explicit end values self-heal, and
      // animating the row as one block keeps the cards visually aligned.
      ScrollTrigger.batch('.service-card', {
        onEnter: els =>
          gsap.fromTo(els,
            { y: ENTER_Y, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: EASE,
              overwrite: 'auto',
              clearProps: 'transform',
            },
          ),
        once: true,
        start: 'top 90%',
      })

      // ── Scorecard widget ───────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.scorecard').forEach(el => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          scale: 0.98,
          duration: ENTER_DURATION,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
        // Bars fill from the left once the card is in view. scaleX (not width)
        // keeps the per-row width from the copy JSON as the single source of
        // the final value.
        gsap.fromTo(el.querySelectorAll('.scorecard-bar > span'),
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: EASE,
            overwrite: 'auto',
            clearProps: 'transform',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      })

      // ── Numbered lists (methodology, how-it-works) ─────────────────────────
      // Spotlight variant: after the list enters, step titles light up in
      // sequence (01 → 04) to walk the reader through the transition.
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
            scrollTrigger: { trigger: list, start: 'top 75%', once: true },
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
            scrollTrigger: { trigger: list, start: 'top 85%', once: true },
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
            scrollTrigger: { trigger: container, start: 'top 88%', once: true },
          },
        )
      })

      // ── [data-reveal] — individual blocks ─────────────────────────────────
      ScrollTrigger.batch('[data-reveal]', {
        onEnter: els =>
          gsap.fromTo(els,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: ENTER_DURATION,
              stagger: 0.08,
              ease: EASE,
              overwrite: 'auto',
              clearProps: 'transform',
            },
          ),
        once: true,
        start: 'top 88%',
      })
    })

    return () => mm.revert()
  })

  return null
}
