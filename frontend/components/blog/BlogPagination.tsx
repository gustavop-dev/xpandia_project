import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { SupportedLocale } from '@/lib/i18n/config'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  lang: SupportedLocale
}

function buildPages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | 'ellipsis')[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)
  if (left > 2) pages.push('ellipsis')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('ellipsis')
  pages.push(total)
  return pages
}

function PaginationArrow({ href, label, disabled }: { href: string; label: string; disabled: boolean }) {
  if (disabled) {
    return <span className="px-3 py-2 border border-ink-100 rounded-md text-ink-300">{label}</span>
  }
  return (
    <Link
      href={href}
      className="px-3 py-2 border border-ink-200 rounded-md text-ink-700 hover:border-ink-900 hover:text-ink-900 transition-colors"
    >
      {label}
    </Link>
  )
}

export default function BlogPagination({ currentPage, totalPages, lang }: BlogPaginationProps) {
  const pages = buildPages(currentPage, totalPages)
  const linkFor = (p: number) => `/blog?lang=${lang}&page=${p}`

  return (
    <nav className="flex items-center justify-center gap-2 font-mono text-[12px]" aria-label="Pagination">
      <PaginationArrow
        href={linkFor(currentPage - 1)}
        label="← PREV"
        disabled={currentPage <= 1}
      />

      {pages.map((p, idx) =>
        p === 'ellipsis' ? (
          <span key={`e-${idx}`} className="px-2 text-ink-400">…</span>
        ) : (
          <Link
            key={p}
            href={linkFor(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={cn(
              'min-w-[36px] text-center px-3 py-2 border rounded-md transition-colors',
              p === currentPage
                ? 'bg-ink-900 text-paper border-ink-900'
                : 'border-ink-200 text-ink-700 hover:border-ink-900 hover:text-ink-900'
            )}
          >
            {p}
          </Link>
        )
      )}

      <PaginationArrow
        href={linkFor(currentPage + 1)}
        label="NEXT →"
        disabled={currentPage >= totalPages}
      />
    </nav>
  )
}
