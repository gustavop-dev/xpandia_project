import { describe, it, expect } from '@jest/globals'
import { screen } from '@testing-library/react'
import { renderWithIntl } from '@/test-utils/renderWithIntl'

import BlogPagination from '../BlogPagination'

describe('BlogPagination', () => {
  it('renders page links 1..n when totalPages <= 7', async () => {
    const ui = await BlogPagination({ currentPage: 1, totalPages: 5, lang: 'en' })
    renderWithIntl(ui)
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole('link', { name: String(i) })).toBeInTheDocument()
    }
  })

  it('renders ellipsis when totalPages > 7', async () => {
    const ui = await BlogPagination({ currentPage: 5, totalPages: 20, lang: 'en' })
    renderWithIntl(ui)
    expect(screen.getAllByText('…').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '20' })).toBeInTheDocument()
  })

  it('marks current page with aria-current="page"', async () => {
    const ui = await BlogPagination({ currentPage: 3, totalPages: 5, lang: 'en' })
    renderWithIntl(ui)
    const current = screen.getByRole('link', { name: '3' })
    expect(current).toHaveAttribute('aria-current', 'page')
  })

  it('disables PREV on first page (renders span, not link)', async () => {
    const ui = await BlogPagination({ currentPage: 1, totalPages: 3, lang: 'en' })
    renderWithIntl(ui)
    const prev = screen.getByText('← PREV')
    expect(prev.tagName.toLowerCase()).toBe('span')
  })

  it('disables NEXT on last page (renders span, not link)', async () => {
    const ui = await BlogPagination({ currentPage: 3, totalPages: 3, lang: 'en' })
    renderWithIntl(ui)
    const next = screen.getByText('NEXT →')
    expect(next.tagName.toLowerCase()).toBe('span')
  })

  it('links use lang query param', async () => {
    const ui = await BlogPagination({ currentPage: 1, totalPages: 3, lang: 'es' })
    renderWithIntl(ui)
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/blog?lang=es&page=2')
  })
})
