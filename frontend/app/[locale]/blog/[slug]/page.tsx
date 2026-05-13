import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchBlogPost } from '@/lib/services/blog'
import { formatLocaleDate, isValidLocale, type SupportedLocale } from '@/lib/i18n/config'
import BlogContentRenderer from '@/components/blog/BlogContentRenderer'

export const dynamic = 'force-dynamic'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}

function resolveLang(raw: string | undefined): SupportedLocale {
  return raw && isValidLocale(raw) ? raw : 'en'
}

export async function generateMetadata({ params, searchParams }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const sp = await searchParams
  const post = await fetchBlogPost(slug, resolveLang(sp.lang))
  if (!post) return { title: 'Not found — Xpandia' }
  return {
    title: `${post.title} — Xpandia`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params, searchParams }: BlogDetailPageProps) {
  const { slug } = await params
  const sp = await searchParams
  const lang = resolveLang(sp.lang)
  const post = await fetchBlogPost(slug, lang)
  if (!post) notFound()

  const dateLabel = post.published_at
    ? formatLocaleDate(post.published_at, lang, { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
  const backLabel = lang === 'es' ? '← VOLVER AL BLOG' : '← BACK TO BLOG'

  return (
    <main>
      <section className="hero">
        <div className="container container-narrow max-w-[820px]">
          <Link href={`/blog?lang=${lang}`} className="eyebrow mb-8 inline-flex no-bar">
            {backLabel}
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
