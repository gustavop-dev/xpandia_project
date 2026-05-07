import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import BlogCard from '../BlogCard'
import type { BlogPostListItem } from '@/lib/services/blog'

function makePost(overrides: Partial<BlogPostListItem> = {}): BlogPostListItem {
  return {
    id: 1,
    slug: 'hello-world',
    title: 'Hello World',
    excerpt: 'A short excerpt.',
    cover_image_url: 'https://example.com/cover.jpg',
    category: 'ai-quality',
    category_display: 'AI Quality',
    author: 'xpandia-team',
    author_display: 'Xpandia Team',
    published_at: '2026-05-07T12:00:00Z',
    ...overrides,
  }
}

describe('BlogCard', () => {
  it('renders title and excerpt', () => {
    render(<BlogCard post={makePost()} lang="en" />)
    expect(screen.getByRole('heading', { level: 3, name: 'Hello World' })).toBeInTheDocument()
    expect(screen.getByText('A short excerpt.')).toBeInTheDocument()
  })

  it('link href includes slug and current lang', () => {
    render(<BlogCard post={makePost({ slug: 'my-post' })} lang="es" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/blog/my-post?lang=es')
  })

  it('formats published_at via formatLocaleDate', () => {
    render(<BlogCard post={makePost({ published_at: '2026-05-07T12:00:00Z' })} lang="en" />)
    expect(screen.getByText(/May/)).toBeInTheDocument()
  })

  it('renders cover image when cover_image_url present', () => {
    render(<BlogCard post={makePost()} lang="en" />)
    const img = screen.getByRole('img', { name: 'Hello World' })
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg')
  })

  it('renders fallback "XPANDIA" placeholder when cover_image_url is empty', () => {
    render(<BlogCard post={makePost({ cover_image_url: '' })} lang="en" />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('XPANDIA')).toBeInTheDocument()
  })
})
