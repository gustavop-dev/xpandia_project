import { execFileSync } from 'node:child_process'
import path from 'node:path'

const FRONTEND_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3004'

async function warmRoute(url: string): Promise<void> {
  try {
    const res = await fetch(url)
    await res.text()
  } catch {
    // best-effort — if the server isn't up yet, tests will handle it
  }
}

export default async function globalSetup(): Promise<void> {
  const backendDir = path.resolve(__dirname, '../../backend')
  const python = path.join(backendDir, 'venv/bin/python')
  execFileSync(
    python,
    ['manage.py', 'migrate', '--no-input'],
    { cwd: backendDir, stdio: 'inherit' },
  )
  execFileSync(
    python,
    ['manage.py', 'seed_blog_e2e'],
    { cwd: backendDir, stdio: 'inherit' },
  )

  // Pre-compile routes that are slow on cold-start in dev mode.
  // Next.js compiles each route on first request; doing it here prevents
  // the first test to visit these pages from racing against compilation.
  const routes = [
    '/',
    '/es',
    '/about',
    '/es/about',
    '/services/language-assurance',
    '/es/services/language-assurance',
    '/services/localization-adaptation',
    '/services/applied-cultural-intelligence',
    '/services',
    '/blog',
    '/blog/e2e-post-01',
    '/blog/this-slug-does-not-exist',
    '/es/blog',
    '/es/blog/e2e-post-12',
    '/contact',
    '/es/contact',
  ]

  // Next.js compiles routes into a shared development cache. Warming them one
  // at a time avoids concurrent writes to that cache on resource-limited hosts.
  for (const route of routes) {
    await warmRoute(`${FRONTEND_URL}${route}`)
  }
}
