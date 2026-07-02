'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface Logo {
  name: string
  file: string
}

interface AiEcosystemCarouselProps {
  logos: Logo[]
}

export default function AiEcosystemCarousel({ logos }: AiEcosystemCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId: number
    let offset = 0
    const speed = 1.5

    const animate = () => {
      offset -= speed
      const singleSetWidth = track.scrollWidth / 2
      if (Math.abs(offset) >= singleSetWidth) {
        offset = 0
      }
      track.style.transform = `translateX(${offset}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate) }

    track.addEventListener('mouseenter', handleMouseEnter)
    track.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      track.removeEventListener('mouseenter', handleMouseEnter)
      track.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const doubled = [...logos, ...logos]

  return (
    <div className="ai-carousel-wrapper">
      <div className="ai-carousel-track" ref={trackRef}>
        {doubled.map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="ai-carousel-item">
            <Image
              src={`/ai-logos/${logo.file}`}
              alt={logo.name}
              width={48}
              height={48}
              className="ai-carousel-logo"
            />
            <span className="ai-carousel-label">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
