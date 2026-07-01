'use client'

import { cn } from '@/lib/utils'
import { goToContactForm } from '@/lib/contact/goToForm'

interface ScrollToFormButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  withArrow?: boolean
}

/**
 * CTA that scrolls to the contact form and surfaces the "fill this out" hint.
 * Client wrapper so it can be dropped into server-rendered pages.
 */
export default function ScrollToFormButton({ label, variant = 'primary', withArrow = false }: ScrollToFormButtonProps) {
  return (
    <button
      type="button"
      className={cn('btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary')}
      onClick={goToContactForm}
    >
      {label}
      {withArrow && <span className="btn-arrow"></span>}
    </button>
  )
}
