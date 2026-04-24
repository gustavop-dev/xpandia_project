/**
 * Flow tag constants for consistent E2E test tagging.
 *
 * Each constant bundles @flow:, @module:, and @priority: tags.
 * Use spread syntax to compose tags in tests:
 *
 *   import { BLOG_LIST_VIEW } from '../helpers/flow-tags';
 *   test('...', { tag: [...BLOG_LIST_VIEW] }, async ({ page }) => { ... });
 */

// ── Home ──
export const HOME_LOADS = ['@flow:home-loads', '@module:home', '@priority:P1'];
export const HOME_TO_BLOG = ['@flow:home-to-blog', '@module:home', '@priority:P2'];

// ── Blog ──
export const BLOG_LIST_VIEW = ['@flow:blog-list-view', '@module:blog', '@priority:P2'];
export const BLOG_DETAIL_VIEW = ['@flow:blog-detail-view', '@module:blog', '@priority:P2'];
export const BLOG_DETAIL_BACK = ['@flow:blog-detail-back', '@module:blog', '@priority:P3'];

// ── Navigation ──
export const NAVIGATION_BETWEEN_PAGES = ['@flow:navigation-between-pages', '@module:navigation', '@priority:P2'];
export const NAVIGATION_HEADER = ['@flow:navigation-header', '@module:navigation', '@priority:P3'];
export const NAVIGATION_FOOTER = ['@flow:navigation-footer', '@module:navigation', '@priority:P4'];
