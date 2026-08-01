import type { BlogPostListItem } from '@/lib/services/blog'

interface Translator {
  (key: string): string
  has: (key: string) => boolean
}

export interface BlogLabels {
  categoryLabel: string
  authorLabel: string
}

/**
 * Resolve the category and author labels in the active locale.
 *
 * The backend derives `category_display` / `author_display` from untranslated
 * model choices, so they always come back in English. The slugs (`category`,
 * `author`) are stable, so we map them through the `blog` namespace instead and
 * only fall back to the backend label for a slug we have no translation for.
 */
export function resolveBlogLabels(t: Translator, post: BlogPostListItem): BlogLabels {
  return {
    categoryLabel: post.category && t.has(`categories.${post.category}`)
      ? t(`categories.${post.category}`)
      : post.category_display,
    authorLabel: post.author && t.has(`authors.${post.author}`)
      ? t(`authors.${post.author}`)
      : post.author_display,
  }
}
