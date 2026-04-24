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
      const heroSel = '.hero, .blog-hero'
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
      ScrollTrigger.batch('.service-card', {
        onEnter: els =>
          gsap.from(els, {
            y: ENTER_Y,
            opacity: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: EASE,
          }),
        once: true,
        start: 'top 90%',
      })

      // ── Blog post cards ────────────────────────────────────────────────────
      ScrollTrigger.batch('.post-card', {
        onEnter: els =>
          gsap.from(els, {
            y: ENTER_Y,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: EASE,
          }),
        once: true,
        start: 'top 92%',
      })

      // ── Featured article ───────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.featured-card').forEach(el => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: ENTER_DURATION,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
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
      })

      // ── Numbered lists (methodology, how-it-works) ─────────────────────────
      gsap.utils.toArray<HTMLElement>('.num-list').forEach(list => {
        gsap.from(list.querySelectorAll('li'), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: { trigger: list, start: 'top 85%', once: true },
        })
      })

      // ── Editorial wall ─────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.editorial-wall').forEach(el => {
        gsap.from(el.querySelector(':scope > .container > *'), {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        })
      })

      // ── [data-stagger] — grid containers whose children stagger in ─────────
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach(container => {
        gsap.from(Array.from(container.children), {
          y: ENTER_Y,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: { trigger: container, start: 'top 88%', once: true },
        })
      })

      // ── [data-reveal] — individual blocks ─────────────────────────────────
      ScrollTrigger.batch('[data-reveal]', {
        onEnter: els =>
          gsap.from(els, {
            y: 20,
            opacity: 0,
            duration: ENTER_DURATION,
            stagger: 0.08,
            ease: EASE,
          }),
        once: true,
        start: 'top 88%',
      })
    })

    return () => mm.revert()
  })

  return null
}
