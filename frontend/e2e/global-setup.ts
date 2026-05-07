import { execFileSync } from 'node:child_process'
import path from 'node:path'

export default async function globalSetup(): Promise<void> {
  const backendDir = path.resolve(__dirname, '../../backend')
  const python = path.join(backendDir, 'venv/bin/python')
  execFileSync(
    python,
    ['manage.py', 'seed_blog_e2e'],
    { cwd: backendDir, stdio: 'inherit' },
  )
}
