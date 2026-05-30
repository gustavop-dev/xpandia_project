'use client';

import { I18nProvider } from '@/lib/i18n/context';
import type { SupportedLocale } from '@/lib/i18n/config';

interface ProvidersProps {
  children: React.ReactNode;
  locale?: SupportedLocale;
}

export default function Providers({ children, locale }: ProvidersProps) {
  return <I18nProvider initialLocale={locale}>{children}</I18nProvider>;
}
