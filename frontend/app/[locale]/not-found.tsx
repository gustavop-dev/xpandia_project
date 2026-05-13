// frontend/app/[locale]/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="eyebrow mb-6">404</div>
      <h1 className="hero-display text-[clamp(40px,5vw,72px)]">Page not found.</h1>
      <p className="lede mt-6">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <div className="hero-ctas mt-8"><Link className="btn btn-primary" href="/">Back to home <span className="btn-arrow"></span></Link></div>
    </main>
  )
}
