import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { BlogPostListItem } from '@/lib/services/blog'
import { formatLocaleDate, type SupportedLocale } from '@/lib/i18n/config'

interface BlogCardProps {
  post: BlogPostListItem
  lang: SupportedLocale
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  const dateLabel = post.published_at ? formatLocaleDate(post.published_at, lang) : ''

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-ink-150 rounded-lg overflow-hidden transition-[border-color,transform] duration-200 hover:border-ink-900 hover:-translate-y-[2px]"
    >
      <div className="relative aspect-[16/10] bg-ink-100 overflow-hidden">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
            sizes="(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink-300 font-mono text-[11px] tracking-[0.14em]">
            XPANDIA
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-7">
        {post.category_display && (
          <div className="font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-3">
            {post.category_display}
          </div>
        )}
        <h3 className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.15] text-ink-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-ink-600 text-[15px] leading-[1.55] mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-ink-150 flex justify-between items-center font-mono text-[11px] text-ink-500 tracking-[0.06em]">
          <span>{post.author_display}</span>
          {dateLabel && <span>{dateLabel}</span>}
        </div>
      </div>
    </Link>
  )
}
