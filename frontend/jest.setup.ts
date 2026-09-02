import React from 'react';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

type MockHref = string | { pathname?: string };
type MockLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: MockHref;
  children?: React.ReactNode;
};

const resolveHref = (href: MockHref) =>
  typeof href === 'string' ? href : href.pathname ?? '/';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function NextImage({ fill, priority, ...rest }: MockImageProps) {
    void fill;
    void priority;
    return React.createElement('img', rest);
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: MockLinkProps) =>
    React.createElement('a', { href: resolveHref(href), ...rest }, children),
}))

// i18n navigation: make next-intl's Link/useRouter/usePathname behave like plain Next equivalents in tests
jest.mock('@/i18n/navigation', () => {
  return {
    Link: ({ href, children, ...rest }: MockLinkProps) =>
      React.createElement('a', { href: resolveHref(href), ...rest }, children),
    usePathname: jest.fn(() => '/'),
    useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), refresh: jest.fn(), back: jest.fn() })),
    redirect: jest.fn(),
    getPathname: jest.fn(({ href }: { href: MockHref }) => resolveHref(href)),
  }
});

// next-intl/server: mock getTranslations for async server components under Jest (jsdom runs as client)
jest.mock('next-intl/server', () => {
  const { createTranslator } = jest.requireActual<typeof import('use-intl/core')>('use-intl/core')
  const { enMessages } = jest.requireActual<typeof import('./test-utils/messages')>('./test-utils/messages')

  const messages = { ...enMessages }
  type MessageNamespace = keyof typeof messages

  const getTranslations = async (
    namespaceOrOptions: MessageNamespace | { locale?: string; namespace: MessageNamespace },
  ) => {
    const namespace = typeof namespaceOrOptions === 'string' ? namespaceOrOptions : namespaceOrOptions.namespace
    return createTranslator({ locale: 'en', messages, namespace })
  }

  return { getTranslations, setRequestLocale: jest.fn() }
});
