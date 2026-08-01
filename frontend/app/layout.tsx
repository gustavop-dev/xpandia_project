// frontend/app/layout.tsx
//
// Root layout. It exists so `app/not-found.tsx` can exist: without a global
// not-found boundary Next.js renders unmatched URLs into its own bare
// `__next_error__` shell, which meant our 404 only appeared after hydration.
//
// The locale segment layout owns the page chrome; this one owns <html>/<body>
// only. The locale comes from next-intl's request config (resolved by the
// middleware in proxy.ts) rather than from route params, which are not
// available at this level.
import { getLocale } from 'next-intl/server'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
