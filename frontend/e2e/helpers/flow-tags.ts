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
export const SERVICES_LANGUAGE_ASSURANCE = ['@flow:services-language-assurance', '@module:services', '@priority:P2'];
export const SERVICES_LOCALIZATION_ADAPTATION = ['@flow:services-localization-adaptation', '@module:services', '@priority:P2'];
export const SERVICES_APPLIED_CULTURAL_INTELLIGENCE = ['@flow:services-applied-cultural-intelligence', '@module:services', '@priority:P2'];

// ── Static ──
export const CONTACT_PAGE = ['@flow:contact-page', '@module:static', '@priority:P2'];
export const ABOUT_PAGE = ['@flow:about-page', '@module:static', '@priority:P3'];

// ── Contact interactions ──
export const CONTACT_FORM_SUBMIT = ['@flow:contact-form-submit', '@module:contact', '@priority:P1'];

// ── CTA flows ──
export const CTA_HOME_TO_CONTACT = ['@flow:cta-home-to-contact', '@module:cta', '@priority:P2'];
export const CTA_SERVICE_DETAIL_TO_CONTACT = ['@flow:cta-service-detail-to-contact', '@module:cta', '@priority:P2'];
export const CTA_SERVICES_CORE_SOLUTION_TO_CONTACT = ['@flow:cta-services-core-solution-to-contact', '@module:cta', '@priority:P3'];

// ── Services interactions ──
export const SERVICES_CARD_TO_DETAIL = ['@flow:services-card-to-detail', '@module:services', '@priority:P2'];
export const BREADCRUMB_BACK_TO_SERVICES = ['@flow:breadcrumb-back-to-services', '@module:services', '@priority:P2'];

// ── Navigation interactions ──
export const MOBILE_NAVIGATION_DRAWER = ['@flow:mobile-navigation-drawer', '@module:navigation', '@priority:P3'];
export const HEADER_SERVICES_DROPDOWN = ['@flow:header-services-dropdown', '@module:navigation', '@priority:P3'];
export const FAB_CONTACT_BUTTON = ['@flow:fab-contact-button', '@module:navigation', '@priority:P3'];
export const LANGUAGE_TOGGLE_PREFERENCE = ['@flow:language-toggle-preference', '@module:navigation', '@priority:P3'];
export const MOBILE_LANGUAGE_TOGGLE = ['@flow:mobile-language-toggle', '@module:navigation', '@priority:P3'];
export const I18N_LOCALE_SWITCH = ['@flow:i18n-locale-switch', '@module:navigation', '@priority:P2'];
export const I18N_LOCALE_PERSISTENCE_NAV = ['@flow:i18n-locale-persistence-nav', '@module:navigation', '@priority:P2'];
export const FOOTER_LINKS_NAVIGATION = ['@flow:footer-links-navigation', '@module:navigation', '@priority:P4'];

// ── Blog ──
export const BLOG_LIST = ['@flow:blog-list', '@module:blog', '@priority:P2'];
export const BLOG_DETAIL = ['@flow:blog-detail', '@module:blog', '@priority:P2'];
export const BLOG_PAGINATION = ['@flow:blog-pagination', '@module:blog', '@priority:P3'];
export const BLOG_LANGUAGE_SWITCH = ['@flow:blog-language-switch', '@module:blog', '@priority:P3'];
export const BLOG_NOT_FOUND = ['@flow:blog-not-found', '@module:blog', '@priority:P4'];
export const BLOG_CARD_TO_DETAIL = ['@flow:blog-card-to-detail', '@module:blog', '@priority:P3'];
export const BLOG_BACK_FROM_DETAIL_TO_LIST = ['@flow:blog-back-from-detail-to-list', '@module:blog', '@priority:P3'];

// ── Contact (extended) ──
export const CONTACT_FORM_ERROR_STATE = ['@flow:contact-form-error-state', '@module:contact', '@priority:P3'];
export const CONTACT_FORM_REQUEST_TYPE = ['@flow:contact-form-request-type', '@module:contact', '@priority:P1'];

// ── Navigation (extended) ──
export const HEADER_BLOG_LINK = ['@flow:header-blog-link', '@module:navigation', '@priority:P4'];
export const HEADER_CONTACT_LINK = ['@flow:header-contact-link', '@module:navigation', '@priority:P3'];
