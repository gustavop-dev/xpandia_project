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
    ['manage.py', 'seed_blog_e2e'],
    { cwd: backendDir, stdio: 'inherit' },
  )

  // Pre-compile routes that are slow on cold-start in dev mode.
  // Next.js compiles each route on first request; doing it here prevents
  // the first test to visit these pages from racing against compilation.
  await Promise.all([
    warmRoute(`${FRONTEND_URL}/services/language-assurance`),
    warmRoute(`${FRONTEND_URL}/services`),
    warmRoute(`${FRONTEND_URL}/blog`),
    warmRoute(`${FRONTEND_URL}/blog/e2e-post-01`),
    warmRoute(`${FRONTEND_URL}/blog/this-slug-does-not-exist`),
    warmRoute(`${FRONTEND_URL}/es/blog`),
    warmRoute(`${FRONTEND_URL}/es/blog/e2e-post-12`),
    warmRoute(`${FRONTEND_URL}/contact`),
  ])
}
