'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

import type { Blog } from '@/lib/types'
import { useBlogStore } from '@/lib/stores/blogStore'

export default function BlogDetailPage() {
  const fetchBlog = useBlogStore((s) => s.fetchBlog)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams<{ blogId: string }>()
  const blogId = params?.blogId

  useEffect(() => {
    const id = Number(blogId)
    if (!Number.isFinite(id)) return
    void (async () => {
      const data = await fetchBlog(id)
      setBlog(data)
      setLoading(false)
    })()
  }, [fetchBlog, blogId])

  if (loading) {
    return (
      <main>
        <section className="hero" style={{ paddingBottom: 40 }}>
          <div className="container">
            <div style={{ height: 14, width: '20%', background: 'var(--ink-100)', borderRadius: 4, marginBottom: 32 }} />
            <div style={{ height: 60, width: '70%', background: 'var(--ink-100)', borderRadius: 4, marginBottom: 20 }} />
            <div style={{ height: 20, width: '50%', background: 'var(--ink-100)', borderRadius: 4 }} />
          </div>
        </section>
      </main>
    )
  }

  if (!blog) {
    return (
      <main>
        <section className="hero">
          <div className="container">
            <div className="eyebrow" style={{ marginBottom: 24 }}>INSIGHTS</div>
            <h1 className="hero-display" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>Article not found.</h1>
            <div className="hero-ctas" style={{ marginTop: 40 }}>
              <Link className="btn btn-primary" href="/blogs">← Back to Insights</Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* Post header */}
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Link href="/blogs" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-subtle)' }}>← INSIGHTS</Link>
            {blog.category ? (
              <>
                <span style={{ color: 'var(--fg-subtle)' }}>·</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-900)', fontWeight: 500 }}>{blog.category.toUpperCase()}</span>
              </>
            ) : null}
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.02, margin: '0 0 28px' }}>
            {blog.title}
          </h1>

          {blog.description ? (
            <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--fg-muted)', lineHeight: 1.55, maxWidth: '62ch' }}>
              {blog.description.slice(0, 200)}{blog.description.length > 200 ? '…' : ''}
            </p>
          ) : null}
        </div>
      </section>

      {/* Hero image */}
      {blog.image_url ? (
        <section className="tight" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="container">
            <div style={{ position: 'relative', aspectRatio: '16 / 8', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--ink-900)' }}>
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.05) brightness(0.9)' }}
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30%', height: 3, background: 'var(--accent)' }}></div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Article body */}
      <section className="tight">
        <div className="container" style={{ maxWidth: 720 }}>
          {blog.description ? (
            <div style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 1.7, color: 'var(--fg)', whiteSpace: 'pre-line' }}>
              {blog.description}
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: 'var(--ink-900)', color: 'var(--paper)' }}>
        <div className="container-narrow" style={{ maxWidth: 900 }}>
          <div className="eyebrow" style={{ color: 'var(--ink-400)' }}>NEXT STEP</div>
          <h2 style={{ marginTop: 24, color: 'var(--paper)', fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.02 }}>
            Ready to find out how your Spanish holds up?
          </h2>
          <div className="hero-ctas" style={{ marginTop: 40 }}>
            <Link className="btn btn-primary" href="/contact">Book a diagnostic call <span className="btn-arrow"></span></Link>
            <Link href="/blogs" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--ink-300)' }}>← BACK TO INSIGHTS</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
