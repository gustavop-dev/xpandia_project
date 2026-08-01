import { resolveBlogLabels } from '../labels'
import type { BlogPostListItem } from '@/lib/services/blog'

const TRANSLATIONS: Record<string, string> = {
  'categories.ai-quality': 'Calidad de IA',
  'authors.xpandia-team': 'Equipo Xpandia',
}

function makeTranslator() {
  const t = ((key: string) => TRANSLATIONS[key]) as ((key: string) => string) & {
    has: (key: string) => boolean
  }
  t.has = (key: string) => key in TRANSLATIONS
  return t
}

function makePost(overrides: Partial<BlogPostListItem> = {}): BlogPostListItem {
  return {
    id: 1,
    slug: 'a-post',
    title: 'A Post',
    excerpt: 'An excerpt.',
    cover_image_url: '',
    category: 'ai-quality',
    category_display: 'AI Quality',
    author: 'xpandia-team',
    author_display: 'Xpandia Team',
    published_at: '2026-07-01T00:00:00Z',
    ...overrides,
  }
}

describe('resolveBlogLabels', () => {
  it('translates the category slug instead of using the backend display value', () => {
    const { categoryLabel } = resolveBlogLabels(makeTranslator(), makePost())
    expect(categoryLabel).toBe('Calidad de IA')
  })

  it('translates the author slug instead of using the backend display value', () => {
    const { authorLabel } = resolveBlogLabels(makeTranslator(), makePost())
    expect(authorLabel).toBe('Equipo Xpandia')
  })

  it('falls back to the backend category label for an untranslated slug', () => {
    const post = makePost({ category: 'industry', category_display: 'Industry' })
    const { categoryLabel } = resolveBlogLabels(makeTranslator(), post)
    expect(categoryLabel).toBe('Industry')
  })

  it('falls back to the backend category label when the post has no category', () => {
    const post = makePost({ category: '', category_display: '' })
    const { categoryLabel } = resolveBlogLabels(makeTranslator(), post)
    expect(categoryLabel).toBe('')
  })
})
