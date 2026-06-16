import { test, expect } from '../test-with-coverage';
import { waitForPageLoad } from '../fixtures';
import { HOME_LOADS, NAVIGATION_BETWEEN_PAGES, NAVIGATION_HEADER, NAVIGATION_FOOTER, HEADER_BLOG_LINK, HEADER_CONTACT_LINK } from '../helpers/flow-tags';

test.describe('Navigation', () => {
  test('should navigate to home page', { tag: [...HOME_LOADS] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works/i })).toBeVisible();
  });

  test('should navigate to about page', { tag: [...NAVIGATION_BETWEEN_PAGES] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/.*about/);
    await expect(page.getByRole('heading', { level: 1, name: /Spanish and English expertise/i })).toBeVisible();
  });

  test('should have working header navigation', { tag: [...NAVIGATION_HEADER] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const header = page.getByRole('banner');
    await expect(header).toBeVisible();
    // Logo links to home
    await expect(header.getByRole('link', { name: 'Xpandia' })).toHaveAttribute('href', '/');
    // Header CTA
    await expect(header.getByRole('link', { name: /Talk to an Expert/i })).toBeVisible();
  });

  test('should have working footer', { tag: [...NAVIGATION_FOOTER] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(footer.getByText('hello@xpandia.global')).toBeVisible();
  });

  test('clicking Blog in the header navigates to /blog', { tag: [...HEADER_BLOG_LINK] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.getByRole('banner').getByRole('link', { name: 'Blog' }).click();

    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('clicking Contact in the header navigates to /contact', { tag: [...HEADER_CONTACT_LINK] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click();

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should maintain navigation across pages', { tag: [...NAVIGATION_BETWEEN_PAGES] }, async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForURL('/');

    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/.*services/);

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });
});
