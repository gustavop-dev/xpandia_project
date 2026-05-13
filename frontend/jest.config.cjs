const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/**/__tests__/**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/e2e/**',
    '!app/layout.tsx',
    '!app/globals.css',
    '!lib/types.ts',
  ],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageReporters: ['text-summary', 'text', 'lcov', 'html', 'json-summary'],
};

// next/jest hardcodes a /node_modules/ transformIgnorePatterns entry that blocks
// ESM-only packages like next-intl. We post-process the resolved config to inject
// next-intl and use-intl into the existing allow-list in that pattern.
const ESM_PACKAGES = ['next-intl', 'use-intl']
async function jestConfig() {
  const config = await createJestConfig(customJestConfig)()
  config.transformIgnorePatterns = (config.transformIgnorePatterns || []).map(p =>
    p.startsWith('/node_modules/(?!')
      ? p.replace('/node_modules/(?!', `/node_modules/(?!(${ESM_PACKAGES.join('|')})|`)
      : p,
  )
  return config
}
module.exports = jestConfig
