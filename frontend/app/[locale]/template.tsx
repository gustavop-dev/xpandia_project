'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

/**
 * Next.js re-mounts this template on every navigation, so it gives each view a
 * lightweight entrance transition. Kept short and opacity-led so it does not
 * fight the per-section scroll reveals in SiteAnimations. Reduced-motion users
 * get no transform/opacity animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Opacity-only (no transform): a transform on this wrapper would shift the
      // page content's box and can break the router's scroll-to-top detection.
      gsap.from(ref.current, {
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'opacity,visibility',
      })
    })
    return () => mm.revert()
  }, { scope: ref })

  return <div ref={ref}>{children}</div>
}
