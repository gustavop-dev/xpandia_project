import type { Metadata } from 'next'
import './globals.css'
import XpandiaHeader from '@/components/layout/XpandiaHeader'
import XpandiaFooter from '@/components/layout/XpandiaFooter'
import FABContact from '@/components/layout/FABContact'
import Providers from './providers'
import SiteAnimations from '@/components/animations/SiteAnimations'

export const metadata: Metadata = {
  title: 'Xpandia — Spanish that works. Quality you can measure.',
  description: 'Expert Spanish/LatAm language assurance for AI, SaaS and EdTech teams.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <XpandiaHeader />
          {children}
          <XpandiaFooter />
          <FABContact />
          <SiteAnimations />
        </Providers>
      </body>
    </html>
  )
}
