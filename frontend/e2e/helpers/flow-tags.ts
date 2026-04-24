/**
 * Flow tag constants for consistent E2E test tagging.
 *
 * Each constant bundles @flow:, @module:, and @priority: tags.
 * Use spread syntax to compose tags in tests:
 *
 *   import { HOME_LOADS } from '../helpers/flow-tags';
 *   test('...', { tag: [...HOME_LOADS] }, async ({ page }) => { ... });
 */

// ── Home ──
export const HOME_LOADS = ['@flow:home-loads', '@module:home', '@priority:P1'];

// ── Navigation ──
export const NAVIGATION_BETWEEN_PAGES = ['@flow:navigation-between-pages', '@module:navigation', '@priority:P2'];
export const NAVIGATION_HEADER = ['@flow:navigation-header', '@module:navigation', '@priority:P3'];
export const NAVIGATION_FOOTER = ['@flow:navigation-footer', '@module:navigation', '@priority:P4'];

// ── Services ──
export const SERVICES_OVERVIEW = ['@flow:services-overview', '@module:services', '@priority:P2'];
export const SERVICES_QA = ['@flow:services-qa', '@module:services', '@priority:P2'];
export const SERVICES_AUDIT = ['@flow:services-audit', '@module:services', '@priority:P2'];
export const SERVICES_FRACTIONAL = ['@flow:services-fractional', '@module:services', '@priority:P2'];

// ── Static ──
export const CONTACT_PAGE = ['@flow:contact-page', '@module:static', '@priority:P2'];
export const ABOUT_PAGE = ['@flow:about-page', '@module:static', '@priority:P3'];

// ── Contact interactions ──
export const CONTACT_FORM_SUBMIT = ['@flow:contact-form-submit', '@module:contact', '@priority:P1'];

// ── CTA flows ──
export const CTA_HOME_TO_CONTACT = ['@flow:cta-home-to-contact', '@module:cta', '@priority:P2'];
export const CTA_SERVICE_DETAIL_TO_CONTACT = ['@flow:cta-service-detail-to-contact', '@module:cta', '@priority:P2'];

// ── Services interactions ──
export const SERVICES_CARD_TO_DETAIL = ['@flow:services-card-to-detail', '@module:services', '@priority:P2'];
export const BREADCRUMB_BACK_TO_SERVICES = ['@flow:breadcrumb-back-to-services', '@module:services', '@priority:P2'];

// ── Navigation interactions ──
export const MOBILE_NAVIGATION_DRAWER = ['@flow:mobile-navigation-drawer', '@module:navigation', '@priority:P3'];
export const HEADER_SERVICES_DROPDOWN = ['@flow:header-services-dropdown', '@module:navigation', '@priority:P3'];
export const FAB_CONTACT_BUTTON = ['@flow:fab-contact-button', '@module:navigation', '@priority:P3'];
export const LANGUAGE_TOGGLE_PREFERENCE = ['@flow:language-toggle-preference', '@module:navigation', '@priority:P3'];
export const FOOTER_LINKS_NAVIGATION = ['@flow:footer-links-navigation', '@module:navigation', '@priority:P4'];
