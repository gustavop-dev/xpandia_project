import { cache } from 'react'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/i18n/config'
import { PAGINATION } from '@/lib/constants'

const BACKEND_ORIGIN = (process.env.NEXT_PUBLIC_BACKEND_ORIGIN || 'http://localhost:8000').replace(/\/$/, '')
const API_BASE = `${BACKEND_ORIGIN}/api`

export interface BlogSection {
  type: 'paragraph' | 'heading' | 'list' | 'image' | 'quote' | 'callout'
    | 'code' | 'divider' | 'video' | 'table' | 'cta'
  text?: string
  level?: 2 | 3
  items?: string[]
  url?: string
  alt?: string
  caption?: string
  author?: string
  variant?: 'tip' | 'warning' | 'info' | 'note'
  title?: string
  language?: string
  code?: string
  headers?: string[]
  rows?: string[][]
  label?: string
}

export interface BlogContent {
  intro?: string
  sections?: BlogSection[]
  conclusion?: string
}

export interface BlogPostListItem {
  id: number
  slug: string
  title: string
  excerpt: string
  cover_image_url: string
  category: string
  category_display: string
  author: string
  author_display: string
  published_at: string | null
}

export interface BlogPostDetail extends BlogPostListItem {
  content_json: BlogContent
  created_at: string
  updated_at: string
}

export interface BlogListResponse {
  results: BlogPostListItem[]
  count: number
  page: number
  page_size: number
  total_pages: number
}

export const fetchBlogPosts = cache(async (
  lang: SupportedLocale = DEFAULT_LOCALE,
  page = 1,
  pageSize: number = PAGINATION.BLOG_PAGE_SIZE,
): Promise<BlogListResponse> => {
  const url = `${API_BASE}/blog/?lang=${lang}&page=${page}&page_size=${pageSize}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Failed to fetch blog posts: ${res.status}`)
  return res.json()
})

export const fetchBlogPost = cache(async (
  slug: string,
  lang: SupportedLocale = DEFAULT_LOCALE,
): Promise<BlogPostDetail | null> => {
  const url = `${API_BASE}/blog/${slug}/?lang=${lang}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch blog post: ${res.status}`)
  return res.json()
})
