import { describe, it, expect } from '@jest/globals';

import {
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  formatLocaleDate,
  isValidLocale,
} from '../config';

describe('i18n config', () => {
  describe('isValidLocale', () => {
    it('returns true for supported locale "en"', () => {
      expect(isValidLocale('en')).toBe(true);
    });

    it('returns true for supported locale "es"', () => {
      expect(isValidLocale('es')).toBe(true);
    });

    it('returns false for unsupported locale', () => {
      expect(isValidLocale('fr')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isValidLocale('')).toBe(false);
    });
  });

  describe('constants', () => {
    it('exposes DEFAULT_LOCALE as "en"', () => {
      expect(DEFAULT_LOCALE).toBe('en');
    });

    it('exposes SUPPORTED_LOCALES containing "en" and "es"', () => {
      expect(SUPPORTED_LOCALES).toContain('en');
      expect(SUPPORTED_LOCALES).toContain('es');
    });

    it('exposes LOCALE_LABELS with English display name', () => {
      expect(LOCALE_LABELS.en).toBe('English');
    });

    it('exposes LOCALE_LABELS with Spanish display name', () => {
      expect(LOCALE_LABELS.es).toBe('Español');
    });
  });

  describe('formatLocaleDate', () => {
    const iso = '2026-05-07T15:00:00Z';

    it('formats English date with default short month', () => {
      const out = formatLocaleDate(iso, 'en');
      expect(out).toMatch(/May/);
      expect(out).toMatch(/2026/);
    });

    it('formats Spanish date in es-ES locale', () => {
      const out = formatLocaleDate(iso, 'es');
      expect(out).toMatch(/may/i);
      expect(out).toMatch(/2026/);
    });

    it('respects custom DateTimeFormatOptions', () => {
      const out = formatLocaleDate(iso, 'en', { year: 'numeric', month: 'long', day: 'numeric' });
      expect(out).toMatch(/May/);
      expect(out).not.toMatch(/^May$/);
    });

    it('handles ISO string with timezone', () => {
      const out = formatLocaleDate('2026-01-15T08:00:00-05:00', 'en');
      expect(out).toMatch(/2026/);
      expect(out).toMatch(/Jan/);
    });
  });
});
