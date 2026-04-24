# Frontend Testing Guide

This guide covers the **unit testing** strategy, tools, and commands for the Xpandia frontend project. For E2E tests, see [`e2e/README.md`](./e2e/README.md).

---

## Table of Contents

1. [Testing Tools](#testing-tools)
2. [Test Structure](#test-structure)
3. [Unit Tests](#unit-tests)
4. [Code Coverage](#code-coverage)
5. [Available Commands](#available-commands)
6. [Best Practices](#best-practices)

---

## Testing Tools

### Jest + Testing Library
- **Purpose:** Unit and integration tests for components, stores, hooks, and services.
- **Framework:** Jest 30 with React Testing Library.
- **Configuration:** `jest.config.cjs`, `jest.setup.ts`.

### Playwright
- **Purpose:** End-to-End (E2E) tests — see [`e2e/README.md`](./e2e/README.md).
- **Configuration:** `playwright.config.ts`.
- **Projects:** Desktop Chrome (additional device profiles are commented out; re-enable as needed).

---

## Test Structure

Unit tests live alongside source files inside `__tests__/` subdirectories. Current layout:

```
frontend/
├── app/
│   └── __tests__/             # App-level / provider tests
├── lib/
│   ├── __tests__/             # constants.test.ts
│   ├── hooks/__tests__/
│   ├── i18n/__tests__/
│   ├── services/__tests__/
│   └── stores/__tests__/      # localeStore.test.ts
└── e2e/
    └── public/                # Playwright flows (smoke + navigation)
```

New components and stores should follow the same convention: add a sibling `__tests__/` directory.

---

## Unit Tests

### Running Unit Tests

```bash
npm run test              # Full Jest suite
npm run test:watch        # Watch mode
npm run test:ci           # CI mode (single run, JSON output)
npm run test:coverage     # Coverage report + summary
```

### Writing Tests

Follow the Arrange → Act → Assert pattern. Each test should verify ONE behavior, use accessible queries (`getByRole`, `getByLabelText`) and `userEvent` over `fireEvent`.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should call onSubmit with the form data when the user submits', async () => {
  // Arrange
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  render(<ContactForm onSubmit={onSubmit} />);

  // Act
  await user.type(screen.getByLabelText(/email/i), 'a@b.co');
  await user.click(screen.getByRole('button', { name: /send/i }));

  // Assert
  expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.co' });
});
```

### Current Coverage Targets

| Layer | Minimum |
|-------|---------|
| Stores | 75% |
| Components | 60% |
| Utils | 90% |

Full reference: `docs/TESTING_QUALITY_STANDARDS.md`.

---

## Code Coverage

```bash
npm run test:coverage
```

Generates:
- `coverage/lcov-report/index.html` — interactive HTML report
- `coverage/coverage-summary.json` — machine-readable summary
- Terminal output with per-file coverage

CI produces the same output via `scripts/coverage-summary.cjs` and `scripts/coverage-summary-ci.cjs`.

---

## Available Commands

```json
{
  "test": "Run unit tests (Jest)",
  "test:watch": "Unit tests in watch mode",
  "test:ci": "Unit tests in CI mode",
  "test:coverage": "Unit tests with coverage + summary",
  "e2e": "Run Playwright E2E tests",
  "e2e:clean": "Clean Playwright reports",
  "e2e:coverage": "Clean + run all E2E tests",
  "test:all": "Run unit coverage + E2E"
}
```

---

## Best Practices

### Prefer accessible queries
`getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` → `getByTestId` (last resort).

### Test behavior, not implementation
- ✅ Assert on rendered text, URLs, DOM state.
- ❌ Avoid asserting on class names, inner state, or internal function names.

### Avoid flakiness
- Use `findBy*` / `waitFor` for async state; never `waitForTimeout`.
- Control `Date`, `Math.random`, timers with `jest.useFakeTimers()` and restore them in `afterEach`.

### Mocks only at boundaries
Mock network/http, browser APIs (`localStorage`), and external SDKs. Do NOT mock the component under test or pure utilities.

### Test data factories
Build fixtures with plain factory functions co-located with the tests. Do NOT commit large static mock datasets.

```typescript
const buildUser = (overrides = {}) => ({
  id: 1,
  email: 'user@example.com',
  first_name: 'Test',
  last_name: 'User',
  ...overrides,
});
```

---

**Last Updated:** 2026-04-24
