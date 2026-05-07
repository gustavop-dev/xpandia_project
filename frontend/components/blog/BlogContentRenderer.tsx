import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { BlogContent, BlogSection } from '@/lib/services/blog'

interface BlogContentRendererProps {
  content: BlogContent | null | undefined
}

const calloutVariantClass: Record<NonNullable<BlogSection['variant']>, string> = {
  tip: 'border-accent/40 bg-accent-soft',
  info: 'border-accent/40 bg-accent-soft',
  note: 'border-ink-200 bg-ink-50',
  warning: 'border-ink-700 bg-ink-50',
}

function Paragraph({ children }: { children: string }) {
  return (
    <p className="text-ink-700 text-[17px] leading-[1.7] mb-6">{children}</p>
  )
}

function SectionRenderer({ section }: { section: BlogSection }) {
  switch (section.type) {
    case 'paragraph':
      return section.text ? <Paragraph>{section.text}</Paragraph> : null

    case 'heading': {
      const level = section.level === 3 ? 3 : 2
      const Tag = (`h${level}`) as 'h2' | 'h3'
      const className = level === 2
        ? 'font-display text-[28px] font-medium tracking-[-0.018em] leading-[1.15] text-ink-900 mt-12 mb-4'
        : 'font-display text-[22px] font-medium tracking-[-0.012em] leading-[1.2] text-ink-900 mt-10 mb-3'
      return <Tag className={className}>{section.text}</Tag>
    }

    case 'list':
      if (!section.items || section.items.length === 0) return null
      return (
        <ul className="checklist mb-8">
          {section.items.map((item, i) => (
            <li key={i}>
              <span className="chk" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'image':
      if (!section.url) return null
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-ink-100">
            <Image
              src={section.url}
              alt={section.alt || ''}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 720px"
            />
          </div>
          {section.caption && (
            <figcaption className="mt-3 font-mono text-[11px] text-ink-500 tracking-[0.06em]">
              {section.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'quote':
      if (!section.text) return null
      return (
        <blockquote className="border-l-2 border-accent pl-6 my-10 font-display italic font-normal text-[22px] tracking-[-0.012em] leading-[1.35] text-ink-900">
          <p className="m-0">&ldquo;{section.text}&rdquo;</p>
          {section.author && (
            <footer className="mt-4 font-body not-italic text-[13px] text-ink-500 font-normal">
              — {section.author}
            </footer>
          )}
        </blockquote>
      )

    case 'callout': {
      const variant = section.variant || 'info'
      return (
        <aside className={cn('border rounded-md px-6 py-5 my-8', calloutVariantClass[variant])}>
          {section.title && (
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-700 mb-2">
              {section.title}
            </div>
          )}
          {section.text && (
            <p className="text-ink-700 text-[16px] leading-[1.6] m-0">{section.text}</p>
          )}
        </aside>
      )
    }

    default:
      return null
  }
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  if (!content) return null
  const { intro, sections, conclusion } = content

  return (
    <article className="font-body">
      {intro && <Paragraph>{intro}</Paragraph>}
      {sections?.map((section, i) => <SectionRenderer key={i} section={section} />)}
      {conclusion && <Paragraph>{conclusion}</Paragraph>}
    </article>
  )
}
