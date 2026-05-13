import React from 'react';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function NextImage(props: any) {
    const { fill, ...rest } = props;
    return React.createElement('img', { ...rest, alt: props.alt });
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => React.createElement('a', { href, ...rest }, children),
}))

// i18n navigation: make next-intl's Link/useRouter/usePathname behave like plain Next equivalents in tests
jest.mock('@/i18n/navigation', () => {
  const React = require('react')
  return {
    Link: ({ href, children, ...rest }: any) => React.createElement('a', { href: typeof href === 'string' ? href : href?.pathname ?? '/', ...rest }, children),
    usePathname: jest.fn(() => '/'),
    useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), refresh: jest.fn(), back: jest.fn() })),
    redirect: jest.fn(),
    getPathname: jest.fn(({ href }: any) => (typeof href === 'string' ? href : href?.pathname ?? '/')),
  }
});

// next-intl/server: mock getTranslations for async server components under Jest (jsdom runs as client)
jest.mock('next-intl/server', () => {
  const { createTranslator } = require('use-intl/core')
  const { enMessages } = require('./test-utils/messages')

  // Flatten the top-level namespace map into a single messages object
  // enMessages is { common: {...}, home: {...}, ... }
  const messages: Record<string, any> = {}
  for (const [ns, value] of Object.entries(enMessages)) {
    messages[ns] = value
  }

  const getTranslations = async (namespace: string) => {
    return createTranslator({ locale: 'en', messages, namespace })
  }

  return { getTranslations }
});
