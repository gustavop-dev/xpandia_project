import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  globalSetup: require.resolve('./e2e/global-setup.ts'),
  timeout: 60_000, // Increased to 60s for slower environments
  expect: {
    timeout: 10_000, // Increased to 10s
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Reduced to 1 for environments with limited resources
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'e2e-results/results.json' }],
  ],
  webServer: [
    {
      command: '../backend/venv/bin/python ../backend/manage.py runserver 127.0.0.1:8001',
      url: 'http://127.0.0.1:8001/api/health/',
      reuseExistingServer: !process.env.CI,
      timeout: 180_000, // 3 minutes for server startup
      stdout: 'ignore',
      stderr: 'ignore',
      env: {
        // The contact happy-path spec posts to the real backend, and settings_dev
        // picks SMTP whenever backend/.env has credentials. Without this the suite
        // sends real mail to the fixture address. Keep it in memory instead.
        DJANGO_EMAIL_BACKEND: 'django.core.mail.backends.locmem.EmailBackend',
      },
    },
    {
      command: 'npm run dev -- --port 3004',
      url: 'http://localhost:3004',
      reuseExistingServer: !process.env.CI,
      timeout: 180_000, // 3 minutes for server startup
      env: {
        NEXT_PUBLIC_BACKEND_ORIGIN: 'http://127.0.0.1:8001',
      },
    },
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3004',
    trace: 'on-first-retry',
    reducedMotion: 'reduce',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Tablet',
    //   use: {
    //     ...devices['iPad Mini'],
    //     browserName: 'chromium',
    //   },
    // },
  ],
});
