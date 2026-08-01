// frontend/app/not-found.tsx
//
// Global not-found boundary. Its presence is what makes Next.js render a real
// 404 page on the server instead of falling back to its bare __next_error__
// shell. It sits outside [locale], so it mounts the chrome and the message
// provider itself.
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import XpandiaHeader from '@/components/layout/XpandiaHeader'
import XpandiaFooter from '@/components/layout/XpandiaFooter'
import FABContact from '@/components/layout/FABContact'
import NotFoundContent from '@/components/layout/NotFoundContent'

export default async function NotFound() {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <XpandiaHeader />
      <NotFoundContent />
      <XpandiaFooter />
      <FABContact />
    </NextIntlClientProvider>
  )
}
