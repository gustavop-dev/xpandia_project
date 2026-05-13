import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
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

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string; lang?: string }>
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const sp = await searchParams
  const lang: SupportedLocale = sp.lang && isValidLocale(sp.lang) ? sp.lang : 'en'
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1)
  const data = await fetchBlogPosts(lang, page, PAGINATION.BLOG_PAGE_SIZE)
  const t = await getTranslations('blog')

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="eyebrow mb-8">{t('hero.eyebrow')}</div>
          <h1 className="hero-display">
            {t('hero.titleLead')} <span className="accent-underline">{t('hero.titleAccent')}</span> {t('hero.titleTail')}
          </h1>
          <p className="hero-sub mt-8">{t('hero.sub')}</p>
          <div className="mt-2">
            <BlogLanguageToggle currentLang={lang} />
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="container">
          {data.results.length === 0 ? (
            <p className="text-ink-500 text-[15px]">{t('empty.message')}</p>
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
