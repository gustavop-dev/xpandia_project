import type { Metadata } from 'next'
import { fetchBlogPosts } from '@/lib/services/blog'
import { isValidLocale, type SupportedLocale } from '@/lib/i18n/config'
import { PAGINATION } from '@/lib/constants'
import BlogCard from '@/components/blog/BlogCard'
import BlogPagination from '@/components/blog/BlogPagination'
import BlogLanguageToggle from '@/components/blog/BlogLanguageToggle'

export const metadata: Metadata = {
  title: 'Blog — Xpandia',
  description: 'Insights on AI Spanish quality, localization, and language operations.',
}

export const dynamic = 'force-dynamic'

const HERO_COPY: Record<SupportedLocale, {
  eyebrow: string
  title: { lead: string; accent: string; tail: string }
  sub: string
  empty: string
}> = {
  en: {
    eyebrow: 'JOURNAL',
    title: { lead: 'Notes on', accent: 'Spanish quality', tail: 'for AI products.' },
    sub: 'Field reports, audits and frameworks from boutique language assurance work.',
    empty: 'No posts published yet.',
  },
  es: {
    eyebrow: 'JOURNAL',
    title: { lead: 'Notas sobre', accent: 'calidad en español', tail: 'para productos de IA.' },
    sub: 'Reportes, auditorías y frameworks desde el trabajo boutique de aseguramiento lingüístico.',
    empty: 'Aún no hay publicaciones.',
  },
}

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string; lang?: string }>
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const sp = await searchParams
  const lang: SupportedLocale = sp.lang && isValidLocale(sp.lang) ? sp.lang : 'en'
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1)
  const data = await fetchBlogPosts(lang, page, PAGINATION.BLOG_PAGE_SIZE)
  const heroCopy = HERO_COPY[lang]

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{heroCopy.eyebrow}</div>
          <h1 className="hero-display">
            {heroCopy.title.lead} <span className="accent-underline">{heroCopy.title.accent}</span> {heroCopy.title.tail}
          </h1>
          <p className="hero-sub mt-8">{heroCopy.sub}</p>
          <div className="mt-2">
            <BlogLanguageToggle currentLang={lang} />
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="container">
          {data.results.length === 0 ? (
            <p className="text-ink-500 text-[15px]">{heroCopy.empty}</p>
          ) : (
            <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.results.map(post => (
                <BlogCard key={post.id} post={post} lang={lang} />
              ))}
            </div>
          )}

          {data.total_pages > 1 && (
            <div className="mt-16">
              <BlogPagination
                currentPage={data.page}
                totalPages={data.total_pages}
                lang={lang}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
