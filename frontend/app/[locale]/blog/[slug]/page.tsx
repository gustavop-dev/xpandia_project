import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { fetchBlogPost } from '@/lib/services/blog'
import { formatLocaleDate, type SupportedLocale } from '@/lib/i18n/config'
import { localizedAlternates } from '@/lib/seo/alternates'
import BlogContentRenderer from '@/components/blog/BlogContentRenderer'

export const dynamic = 'force-dynamic'

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await fetchBlogPost(slug, locale as SupportedLocale)
  if (!post) return { title: 'Not found — Xpandia' }
  return {
    title: `${post.title} — Xpandia`,
    description: post.excerpt,
    alternates: localizedAlternates(`/blog/${slug}`),
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = await fetchBlogPost(slug, locale as SupportedLocale)
  if (!post) notFound()

  const t = await getTranslations('blog')

  const dateLabel = post.published_at
    ? formatLocaleDate(post.published_at, locale as SupportedLocale, { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <main>
      <section className="hero">
        <div className="container container-narrow max-w-[820px]">
          <Link href="/blog" className="eyebrow mb-8 inline-flex no-bar">
            {t('detail.backToBlog')}
          </Link>
          {post.category_display && (
            <div className="font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-4">
              {post.category_display}
            </div>
          )}
          <h1 className="hero-display">{post.title}</h1>
          <p className="hero-sub mt-6">{post.excerpt}</p>
          <div className="font-mono text-[11px] text-ink-500 tracking-[0.08em] mt-6">
            {post.author_display}{dateLabel ? ` · ${dateLabel}` : ''}
          </div>
        </div>
      </section>

      {post.cover_image_url && (
        <section className="tight pt-0 pb-0">
          <div className="container">
            <div className="relative aspect-[16/9] tablet:aspect-[24/9] rounded-lg overflow-hidden bg-ink-900 max-w-[1080px] mx-auto">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                loading="eager"
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 1080px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="tight">
        <div className="container container-narrow max-w-[720px]">
          <BlogContentRenderer content={post.content_json} />
        </div>
      </section>
    </main>
  )
}
