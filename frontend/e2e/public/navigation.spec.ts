import { test, expect } from '@playwright/test';
import { waitForPageLoad } from '../fixtures';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works/i })).toBeVisible();
  });

  test('the header logo returns to the home page', async ({ page }) => {
    await page.goto('/blog');
    await waitForPageLoad(page);

    await page.getByRole('banner').getByRole('link', { name: 'Xpandia' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works/i })).toBeVisible();
  });

  test('the footer About link navigates to /about', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.locator('footer').getByRole('link', { name: 'About' }).click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole('heading', { level: 1, name: /Spanish and English expertise/i })).toBeVisible();
  });

  test('clicking Blog in the header navigates to /blog', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.getByRole('banner').getByRole('link', { name: 'Blog' }).click();

    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('clicking Contact in the header navigates to /contact', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click();

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('navigates between pages via the header nav', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.getByRole('banner').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog$/);

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});
