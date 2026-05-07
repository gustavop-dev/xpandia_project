import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import BlogPagination from '../BlogPagination'

describe('BlogPagination', () => {
  it('renders page links 1..n when totalPages <= 7', () => {
    render(<BlogPagination currentPage={1} totalPages={5} lang="en" />)
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole('link', { name: String(i) })).toBeInTheDocument()
    }
  })

  it('renders ellipsis when totalPages > 7', () => {
    render(<BlogPagination currentPage={5} totalPages={20} lang="en" />)
    expect(screen.getAllByText('…').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '20' })).toBeInTheDocument()
  })

  it('marks current page with aria-current="page"', () => {
    render(<BlogPagination currentPage={3} totalPages={5} lang="en" />)
    const current = screen.getByRole('link', { name: '3' })
    expect(current).toHaveAttribute('aria-current', 'page')
  })

  it('disables PREV on first page (renders span, not link)', () => {
    render(<BlogPagination currentPage={1} totalPages={3} lang="en" />)
    const prev = screen.getByText('← PREV')
    expect(prev.tagName.toLowerCase()).toBe('span')
  })

  it('disables NEXT on last page (renders span, not link)', () => {
    render(<BlogPagination currentPage={3} totalPages={3} lang="en" />)
    const next = screen.getByText('NEXT →')
    expect(next.tagName.toLowerCase()).toBe('span')
  })

  it('links use lang query param', () => {
    render(<BlogPagination currentPage={1} totalPages={3} lang="es" />)
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/blog?lang=es&page=2')
  })
})
