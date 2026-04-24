import { describe, it, expect } from '@jest/globals';

import { PAGINATION, ROUTES } from '../constants';

describe('constants', () => {
  describe('ROUTES', () => {
    it('exposes HOME route as "/"', () => {
      expect(ROUTES.HOME).toBe('/');
    });
  });

  describe('PAGINATION', () => {
    it('exposes DEFAULT_PAGE_SIZE as 20', () => {
      expect(PAGINATION.DEFAULT_PAGE_SIZE).toBe(20);
    });
  });
});
