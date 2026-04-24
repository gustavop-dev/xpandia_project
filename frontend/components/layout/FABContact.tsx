import Link from 'next/link'

export default function FABContact() {
  return (
    <Link
      href="/contact"
      aria-label="Book a diagnostic call"
      className="group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[900] inline-flex items-center gap-[10px] pl-[14px] pr-[18px] py-3 sm:pl-[18px] sm:pr-[22px] sm:py-[14px] bg-ink-900 text-paper rounded-full font-display text-[13px] sm:text-[14px] font-medium tracking-[-0.005em] shadow-[0_1px_2px_rgba(15,20,25,0.08),0_8px_24px_rgba(15,20,25,0.16),0_0_0_1px_rgba(15,20,25,0.04)] transition-all duration-[250ms] hover:bg-ink-800 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,20,25,0.08),0_14px_32px_rgba(15,20,25,0.22),0_0_0_1px_rgba(15,20,25,0.04)]"
    >
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent text-paper shrink-0 transition-colors duration-[200ms] group-hover:bg-accent-hover"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 6L12 13L20 6M4 6V18H20V6M4 6H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span className="whitespace-nowrap text-paper">Book a diagnostic call</span>
    </Link>
  )
}
