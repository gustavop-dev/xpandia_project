import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { BlogContent, BlogSection } from '@/lib/services/blog'

interface BlogContentRendererProps {
  content: BlogContent | null | undefined
  tocLabel?: string
}

interface HeadingMeta {
  id: string
  number?: number
}

const calloutVariantClass: Record<NonNullable<BlogSection['variant']>, string> = {
  tip: 'border-accent/40 bg-accent-soft',
  info: 'border-accent/40 bg-accent-soft',
  note: 'border-ink-200 bg-ink-50',
  warning: 'border-ink-700 bg-ink-50',
}

function slugify(text: string): string {
  const slug = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'section'
}

function toVideoEmbedUrl(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}`
    }
  } catch {
    return url
  }
  return url
}

// Pre-compute stable anchor ids (deduped) and running h2 numbers for every heading.
function buildHeadingMeta(sections: BlogSection[]): Map<number, HeadingMeta> {
  const meta = new Map<number, HeadingMeta>()
  const seen = new Map<string, number>()
  let h2Count = 0
  sections.forEach((section, index) => {
    if (section.type !== 'heading' || !section.text) return
    const base = slugify(section.text)
    const used = seen.get(base) ?? 0
    seen.set(base, used + 1)
    const id = used === 0 ? base : `${base}-${used}`
    const entry: HeadingMeta = { id }
    if ((section.level ?? 2) !== 3) {
      h2Count += 1
      entry.number = h2Count
    }
    meta.set(index, entry)
  })
  return meta
}

function Paragraph({ children }: { children: string }) {
  return (
    <p className="text-ink-700 text-[17px] leading-[1.7] mb-6">{children}</p>
  )
}

function TableOfContents({ items, label }: { items: TocItem[]; label: string }) {
  if (items.length < 2) return null
  return (
    <nav aria-label={label} className="mb-12 border border-ink-200 rounded-md px-6 py-5 bg-ink-50">
      <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-500 mb-3">{label}</div>
      <ol className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-5' : ''}>
            <a href={`#${item.id}`} className="text-ink-700 hover:text-accent text-[15px] leading-[1.5]">
              {item.number ? `${item.number}. ` : ''}{item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function SectionRenderer({ section, meta }: { section: BlogSection; meta?: HeadingMeta }) {
  switch (section.type) {
    case 'paragraph':
      return section.text ? <Paragraph>{section.text}</Paragraph> : null

    case 'heading': {
      const level = section.level === 3 ? 3 : 2
      const Tag = (`h${level}`) as 'h2' | 'h3'
      const className = level === 2
        ? 'font-display text-[28px] font-medium tracking-[-0.018em] leading-[1.15] text-ink-900 mt-12 mb-4 scroll-mt-28'
        : 'font-display text-[22px] font-medium tracking-[-0.012em] leading-[1.2] text-ink-900 mt-10 mb-3 scroll-mt-28'
      return (
        <Tag id={meta?.id} className={className}>
          {meta?.number != null && (
            <span aria-hidden="true" className="text-accent mr-2">{meta.number}.</span>
          )}
          {section.text}
        </Tag>
      )
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

    case 'code': {
      if (!section.code) return null
      return (
        <figure className="my-8">
          {section.language && (
            <figcaption className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-400 mb-1">
              {section.language}
            </figcaption>
          )}
          <pre className="overflow-x-auto rounded-md bg-ink-900 text-ink-50 px-5 py-4 text-[13.5px] leading-[1.6]">
            <code className="font-mono whitespace-pre">{section.code}</code>
          </pre>
        </figure>
      )
    }

    case 'divider':
      return <hr className="my-12 border-0 border-t border-ink-200" />

    case 'video': {
      if (!section.url) return null
      return (
        <figure className="my-10">
          <div className="relative aspect-video rounded-md overflow-hidden bg-ink-900">
            <iframe
              src={toVideoEmbedUrl(section.url)}
              title={section.caption || 'Video'}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {section.caption && (
            <figcaption className="mt-3 font-mono text-[11px] text-ink-500 tracking-[0.06em]">
              {section.caption}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'table': {
      if (!section.rows || section.rows.length === 0) return null
      return (
        <figure className="my-8 overflow-x-auto">
          <table className="w-full text-left border-collapse text-[15px]">
            {section.headers && section.headers.length > 0 && (
              <thead>
                <tr>
                  {section.headers.map((header, i) => (
                    <th key={i} className="border-b-2 border-ink-300 py-2 pr-4 font-display font-medium text-ink-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c} className="border-b border-ink-100 py-2 pr-4 text-ink-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {section.caption && (
            <figcaption className="mt-3 font-mono text-[11px] text-ink-500 tracking-[0.06em]">
              {section.caption}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'cta': {
      if (!section.url || !section.label) return null
      const external = /^https?:\/\//.test(section.url)
      const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
      return (
        <div className="my-10">
          <a
            href={section.url}
            {...linkProps}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-900 text-white text-[14px] font-medium hover:bg-accent transition-colors no-underline"
          >
            {section.label}
          </a>
          {section.text && <p className="mt-3 text-ink-500 text-[14px]">{section.text}</p>}
        </div>
      )
    }

    default:
      return null
  }
}

export default function BlogContentRenderer({ content, tocLabel = 'Contents' }: BlogContentRendererProps) {
  if (!content) return null
  const { intro, sections, conclusion } = content
  const list = sections ?? []
  const meta = buildHeadingMeta(list)

  const tocItems: TocItem[] = list
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => section.type === 'heading' && section.text)
    .map(({ section, index }) => ({
      id: meta.get(index)!.id,
      number: meta.get(index)!.number,
      level: section.level === 3 ? 3 : 2,
      text: section.text as string,
    }))

  return (
    <article className="font-body">
      <TableOfContents items={tocItems} label={tocLabel} />
      {intro && <Paragraph>{intro}</Paragraph>}
      {list.map((section, i) => <SectionRenderer key={i} section={section} meta={meta.get(i)} />)}
      {conclusion && <Paragraph>{conclusion}</Paragraph>}
    </article>
  )
}

interface TocItem {
  id: string
  number?: number
  level: 2 | 3
  text: string
}
