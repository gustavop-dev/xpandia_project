'use client'

// Last-resort boundary: catches errors thrown by the root layout itself, where
// even the [locale] layout (and the NextIntlClientProvider) never mounted. It
// must render its own <html>/<body> and cannot use next-intl, so copy lives in
// a small inline dictionary keyed off the <html lang> the root layout set. This
// is the only place we hardcode user-facing strings, by framework constraint.
import { useEffect } from 'react'

const COPY = {
  en: {
    title: 'Something went wrong',
    description: "This page didn't load correctly. Try again, or go back to the homepage.",
    retry: 'Try again',
    back: 'Back to home',
  },
  es: {
    title: 'Algo salió mal',
    description: 'Esta página no se cargó correctamente. Vuelve a intentarlo o regresa al inicio.',
    retry: 'Reintentar',
    back: 'Volver al inicio',
  },
} as const

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('global-error boundary caught:', error)
  }, [error])

  const lang =
    typeof document !== 'undefined' && document.documentElement.lang === 'es' ? 'es' : 'en'
  const t = COPY[lang]

  return (
    <html lang={lang}>
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          padding: '24px',
          textAlign: 'center',
          color: '#1a1a1a',
          background: '#ffffff',
        }}
      >
        <h1 style={{ fontSize: '28px', margin: '0 0 12px' }}>{t.title}</h1>
        <p style={{ fontSize: '16px', maxWidth: '420px', margin: '0 0 24px', color: '#555' }}>
          {t.description}
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              border: 'none',
              background: '#1a1a1a',
              color: '#ffffff',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            {t.retry}
          </button>
          <a
            href={lang === 'es' ? '/es' : '/'}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              border: '1px solid #d0d0d0',
              color: '#1a1a1a',
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            {t.back}
          </a>
        </div>
      </body>
    </html>
  )
}
