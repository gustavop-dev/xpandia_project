# 🔧 Frontend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Variables

Copy the example file and configure:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Optional - API base URL (defaults to /api which uses Next.js rewrites)
NEXT_PUBLIC_API_BASE_URL=/api

# Django backend origin (used by rewrites and media proxy)
NEXT_PUBLIC_BACKEND_ORIGIN=http://localhost:8000

# Only needed once authenticated flows are enabled in the frontend
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`.

---

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── __tests__/            # Page tests
│   ├── page.tsx              # Home
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   ├── services/             # Services overview
│   │   ├── qa/
│   │   ├── audit/
│   │   └── fractional/
│   ├── providers.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/               # XpandiaHeader, XpandiaFooter, FABContact
│   └── animations/           # SiteAnimations (GSAP)
├── lib/
│   ├── __tests__/            # Shared test helpers
│   ├── constants.ts          # Route + pagination constants
│   ├── hooks/                # Reusable hooks
│   ├── i18n/                 # next-intl config
│   ├── stores/
│   │   └── localeStore.ts    # Persisted en/es preference
│   ├── services/
│   │   ├── http.ts           # Axios instance with JWT refresh
│   │   └── tokens.ts         # Token management
│   └── types.ts              # TypeScript types
└── e2e/                      # Playwright E2E tests
```

---

## 🧪 Testing

### Unit Tests
```bash
npm run test              # Run unit tests (Jest)
npm run test:watch        # Unit tests in watch mode
npm run test:ci           # Unit tests in CI mode
npm run test:coverage     # Unit tests with coverage + summary
```

### E2E Tests
```bash
npm run test:e2e          # All E2E tests
npm run e2e               # Alias for test:e2e
npm run test:e2e:ui       # Interactive UI
npm run test:e2e:headed   # With visible browser
npm run test:e2e:debug    # Debug mode
npm run e2e:desktop       # Desktop Chrome only
npm run e2e:clean         # Clear Playwright reports
```

### All Tests
```bash
npm run test:all          # Unit coverage + E2E
```

---

## 🚀 Available Scripts

```json
{
  "dev": "Start development server (Next.js)",
  "build": "Build for production",
  "start": "Start production server",
  "lint": "Run ESLint",
  "test": "Run unit tests (Jest)",
  "test:watch": "Unit tests in watch mode",
  "test:ci": "Unit tests in CI mode",
  "test:coverage": "Unit tests with coverage + summary",
  "test:e2e": "Run Playwright E2E tests",
  "test:e2e:ui": "E2E with Playwright UI",
  "test:e2e:headed": "E2E with visible browser",
  "test:e2e:debug": "E2E in debug mode",
  "e2e": "Alias for test:e2e",
  "e2e:desktop": "E2E on Desktop Chrome",
  "e2e:clean": "Clean Playwright reports",
  "e2e:coverage": "Clean reports then run all E2E tests",
  "test:all": "Run unit coverage + E2E"
}
```

---

## 📊 State Management (Zustand)

### Locale Store
```typescript
import { useLocaleStore } from '@/lib/stores/localeStore';

const { locale, setLocale } = useLocaleStore();
```

Persisted to `localStorage` under the key used by the store implementation.

---

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs -r kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs -r kill -9
```

### Backend not reachable

The Playwright config expects the Django API to be reachable at `http://127.0.0.1:8000/api/health/`. Start the backend in another terminal:

```bash
cd backend && source venv/bin/activate && python manage.py runserver
```

---

## Documentation

| Guide | Scope |
|-------|-------|
| [`TESTING.md`](./TESTING.md) | Unit tests (Jest + RTL): tools, structure, coverage, commands, best practices |
| [`e2e/README.md`](./e2e/README.md) | E2E tests (Playwright): structure, commands, Flow Coverage system, flow definitions |

---

**Last Updated:** 2026-04-24
