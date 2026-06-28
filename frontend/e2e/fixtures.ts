/**
 * E2E Test Fixtures and Helpers
 * 
 * Este archivo contiene fixtures y funciones auxiliares para las pruebas E2E
 */

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

export async function waitForPageLoad(page: any) {
  await page.waitForLoadState('load');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction(
    () => {
      const el = document.querySelector('header') ?? document.body
      if (!el) return false
      return Object.keys(el).some(k =>
        k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'),
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
  page: any,
  message = 'We need a quality review of our Spanish AI outputs.',
) {
  // Radio tiles use role="button" (no native <input type="radio">)
  await page.getByRole('button', { name: 'Language Assurance' }).click()
  await page.getByRole('button', { name: 'LatAm' }).click()
  // Labels are not linked to inputs via for/id — use placeholder instead
  await page.getByPlaceholder('Jane Doe').fill('Jane Doe')
  await page.getByPlaceholder(/VP Product/).fill('VP Product')
  await page.getByPlaceholder('jane@company.com').fill('jane@company.com')
  await page.getByPlaceholder('Company Inc.').fill('Acme Inc.')
  await page.getByPlaceholder(/Example: We launched/).fill(message)
}

/**
 * Wait for API response
 */
export async function waitForApiResponse(page: any, url: string) {
  return page.waitForResponse((response: any) => 
    response.url().includes(url) && response.status() === 200
  );
}
