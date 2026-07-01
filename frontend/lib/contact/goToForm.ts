export const FORM_HINT_EVENT = 'xpandia:form-hint'
export const CONTACT_FORM_ID = 'contact-form'

/**
 * Smooth-scroll to the contact form and fire the hint event so the form can
 * surface a "fill this out" tooltip. Used by every CTA that points at the form
 * instead of opening the Cal.com scheduler.
 */
export function goToContactForm() {
  const form = document.getElementById(CONTACT_FORM_ID)
  if (form) {
    // Offset for the fixed header so the hint banner (form's first child)
    // isn't tucked underneath it.
    const header = document.querySelector('header')
    const offset = (header?.getBoundingClientRect().height ?? 0) + 24
    const top = form.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
  window.dispatchEvent(new CustomEvent(FORM_HINT_EVENT))
}
