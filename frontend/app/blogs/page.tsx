'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useBlogStore } from '@/lib/stores/blogStore'
import type { Blog } from '@/lib/types'

function PostCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.id}`} className="post-card">
      <div className="img-wrap">
        {blog.image_url ? (
          <Image src={blog.image_url} alt={blog.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 33vw" />
        ) : (
          <div className="w-full h-full bg-ink-700" />
        )}
      </div>
      <div className="post-meta">
        <span className="cat">{(blog.category || 'INSIGHTS').toUpperCase()}</span>
      </div>
      <h3>{blog.title}</h3>
      {blog.description ? <p>{blog.description.slice(0, 120)}{blog.description.length > 120 ? '…' : ''}</p> : null}
      <span className="readmore">READ →</span>
    </Link>
  )
}

export default function BlogsPage() {
  const blogs = useBlogStore((s) => s.blogs)
  const loading = useBlogStore((s) => s.loading)
  const error = useBlogStore((s) => s.error)
  const fetchBlogs = useBlogStore((s) => s.fetchBlogs)

  useEffect(() => { void fetchBlogs() }, [fetchBlogs])

  const featured = blogs[0] ?? null
  const rest = blogs.slice(1)

  return (
    <main>
      {/* Hero */}
      <section className="blog-hero">
        <div className="container">
          <div className="eyebrow mb-8">INSIGHTS</div>
          <h1 className="hero-display text-[clamp(48px,6vw,96px)] max-w-[16ch]">
            Notes on <span className="accent-underline">language assurance</span> for AI and global product teams.
          </h1>
          <p className="hero-sub mt-8 max-w-[64ch]">
            Frameworks, field reports and opinionated takes on Spanish/LatAm quality — from a senior practitioner with 20+ years in the trenches.
          </p>
        </div>
      </section>

      {/* Error state */}
      {error ? (
        <section className="tight pt-6">
          <div className="container">
            <div className="p-10 border border-ink-150 rounded-lg bg-white flex justify-between items-center gap-6">
              <div>
                <div className="font-display text-[18px] mb-2">Could not load articles</div>
                <div className="text-ink-600 text-[15px]">{error}</div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => void fetchBlogs()}
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {/* Loading skeletons */}
      {loading ? (
        <section className="tight pt-6">
          <div className="container">
            <div className="post-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-[18px]">
                  <div className="aspect-[4/3] rounded-md bg-ink-100" />
                  <div className="h-3 w-[60%] rounded bg-ink-100" />
                  <div className="h-5 w-[85%] rounded bg-ink-100" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Empty state */}
      {!loading && !error && !blogs.length ? (
        <section className="tight">
          <div className="container">
            <div className="px-10 py-20 border border-dashed border-ink-150 rounded-lg text-center">
              <div className="font-display text-[24px] mb-3">No articles yet</div>
              <div className="text-ink-600">Generate fake blogs or create new ones from admin.</div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Featured article */}
      {!loading && !error && featured ? (
        <section className="tight pt-0">
          <div className="container">
            <div className="featured-card">
              <Link href={`/blogs/${featured.id}`} className="featured-image" style={{ textDecoration: 'none' }}>
                {featured.image_url ? (
                  <Image src={featured.image_url} alt={featured.title} fill className="object-cover grayscale contrast-[1.05] brightness-[0.92]" sizes="50vw" />
                ) : (
                  <div className="w-full h-full bg-ink-700" />
                )}
              </Link>
              <div>
                <div className="flex items-center gap-[14px] mb-6">
                  <span className="inline-block px-3 py-[5px] rounded-full bg-accent text-paper font-mono text-[10px] tracking-[0.14em]">FEATURED</span>
                  {featured.category ? <span className="font-mono text-[11px] tracking-[0.12em] text-ink-500">{featured.category.toUpperCase()}</span> : null}
                </div>
                <h2 className="font-display font-medium text-[clamp(32px,3.5vw,52px)] leading-[1.08] tracking-[-0.02em] mb-6 max-w-[20ch]">
                  {featured.title}
                </h2>
                {featured.description ? (
                  <p className="text-ink-600 text-[19px] leading-[1.55] max-w-[52ch] mb-8">
                    {featured.description}
                  </p>
                ) : null}
                <Link className="btn btn-primary" href={`/blogs/${featured.id}`}>Read the article <span className="btn-arrow"></span></Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Post grid */}
      {!loading && !error && rest.length > 0 ? (
        <section className="tight">
          <div className="container">
            <div className="post-grid">
              {rest.map(b => <PostCard key={b.id} blog={b} />)}
            </div>
          </div>
        </section>
      ) : null}

      {/* Editorial wall */}
      <section className="editorial-wall">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <div className="eyebrow text-ink-400">FROM THE ARCHIVE</div>
            </div>
            <div>
              <div className="font-mono text-[40px] text-accent leading-none mb-4">"</div>
              <h2>A language isn't a locale. It's a trust contract between your product and the person trying to use it.</h2>
              <div className="byline">MILENA · FIELD NOTES · XPANDIA 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="tight">
        <div className="container">
          <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.4fr] gap-16 py-20 border-t border-b border-ink-150 items-start">
            <div>
              <div className="eyebrow">INSIGHTS — MONTHLY</div>
              <h2 className="mt-5 text-[clamp(32px,3.2vw,48px)] leading-[1.08]">One email. <span className="accent-underline">One idea.</span> No recycled content.</h2>
            </div>
            <div>
              <p className="text-ink-600 text-[19px] leading-[1.55] mb-7 max-w-[54ch]">
                A monthly note for Product, Localization, CX and AI leaders shipping into Spanish and LatAm markets. Frameworks you can use on Monday. No fluff, no newsletters-about-newsletters.
              </p>
              <form
                className="newsletter-form"
                onSubmit={e => { e.preventDefault(); alert('Subscription demo — connect to your email provider.') }}
              >
                <input type="email" placeholder="your.name@company.com" required className="flex-1 px-5 py-4 rounded-full border border-ink-150 bg-white font-body text-[15px]" />
                <button type="submit" className="btn btn-primary whitespace-nowrap">Subscribe <span className="btn-arrow"></span></button>
              </form>
              <div className="mt-4 font-mono text-[11px] tracking-[0.08em] text-ink-500">
                ~1,400 READERS · UNSUBSCRIBE ANYTIME
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
