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
 * Wait for API response
 */
export async function waitForApiResponse(page: any, url: string) {
  return page.waitForResponse((response: any) => 
    response.url().includes(url) && response.status() === 200
  );
}
