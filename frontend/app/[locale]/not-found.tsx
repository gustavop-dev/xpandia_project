// frontend/app/[locale]/not-found.tsx
// Renders inside the locale layout, which already provides the chrome and the
// message provider — so this only needs the body.
import NotFoundContent from '@/components/layout/NotFoundContent'

export default function NotFound() {
  return <NotFoundContent />
}
