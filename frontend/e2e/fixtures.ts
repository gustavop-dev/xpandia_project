import type { Page } from '@playwright/test'

/** Shared data and helpers for the end-to-end tests. */

export const testUser = {
  email: 'test@example.com',
  password: 'password123',
};

export const testAdminUser = {
  email: 'admin@example.com',
  password: 'admin123',
};

export const testCheckoutData = {
  email: 'customer@example.com',
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  postal_code: '10001',
};

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('load');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction(
    () => {
      const elements = [
        document.querySelector('header'),
        document.querySelector('footer'),
      ]

      return elements.every(element =>
        element && Object.keys(element).some(key =>
          key.startsWith('__reactFiber') || key.startsWith('__reactInternalInstance'),
        ),
      )
    },
    undefined,
    { timeout: 30000 },
  )
}

/**
 * Fill the contact qualifier form with valid values. The default message is
 * shared by the happy-path and failure-path specs; pass an override only when a
 * test needs distinct content.
 */
export async function fillContactForm(
  page: Page,
  message = 'We need a quality review of our Spanish AI outputs.',
) {
  // Radio tiles use role="button" (no native <input type="radio">)
  await page.getByRole('button', { name: 'Language Assurance' }).click()
  await page.getByRole('button', { name: 'LatAm' }).click()
  // Labels are not linked to inputs via for/id — use placeholder instead
  await page.getByPlaceholder('Jane Doe').fill('Jane Doe')
  await page.getByPlaceholder(/VP Product/).fill('VP Product')
  // example.com is reserved (RFC 2606) — never a real mail destination
  await page.getByPlaceholder('jane@example.com').fill('jane@example.com')
  await page.getByPlaceholder('Company Inc.').fill('Acme Inc.')
  await page.getByPlaceholder(/Example: We launched/).fill(message)
}

/**
 * Wait for API response
 */
export async function waitForApiResponse(page: Page, url: string) {
  return page.waitForResponse(response =>
    response.url().includes(url) && response.status() === 200
  );
}
