import { describe, it, expect } from '@jest/globals';

import { API_ENDPOINTS, PAGINATION, ROUTES } from '../constants';

describe('constants', () => {
  describe('API_ENDPOINTS', () => {
    it('BLOG_DETAIL returns the correct API path for a given id', () => {
      expect(API_ENDPOINTS.BLOG_DETAIL(42)).toBe('/blogs-data/42/');
    });
  });

  describe('ROUTES', () => {
    it('exposes HOME route as "/"', () => {
      expect(ROUTES.HOME).toBe('/');
    });

    it('exposes BLOGS route', () => {
      expect(ROUTES.BLOGS).toBe('/blogs');
    });
  });

  describe('PAGINATION', () => {
    it('exposes DEFAULT_PAGE_SIZE as 20', () => {
      expect(PAGINATION.DEFAULT_PAGE_SIZE).toBe(20);
    });
  });
});
