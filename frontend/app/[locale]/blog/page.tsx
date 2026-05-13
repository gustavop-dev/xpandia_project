import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { fetchBlogPosts } from '@/lib/services/blog'
import type { SupportedLocale } from '@/lib/i18n/config'
import { localizedAlternates } from '@/lib/seo/alternates'
import { PAGINATION } from '@/lib/constants'
import BlogCard from '@/components/blog/BlogCard'
import BlogPagination from '@/components/blog/BlogPagination'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: localizedAlternates('/blog'),
  }
}

interface BlogIndexPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function BlogIndexPage({ params, searchParams }: BlogIndexPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1)
  const data = await fetchBlogPosts(locale as SupportedLocale, page, PAGINATION.BLOG_PAGE_SIZE)
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
        </div>
      </section>

      <section className="tight">
        <div className="container">
          {data.results.length === 0 ? (
            <p className="text-ink-500 text-[15px]">{t('empty.message')}</p>
          ) : (
            <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.results.map(post => (
                <BlogCard key={post.id} post={post} lang={locale as SupportedLocale} />
              ))}
            </div>
          )}

          {data.total_pages > 1 && (
            <div className="mt-16">
              <BlogPagination currentPage={data.page} totalPages={data.total_pages} />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
