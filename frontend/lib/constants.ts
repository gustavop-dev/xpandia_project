export const ROUTES = {
  HOME: '/',
  BLOGS: '/blogs',
} as const;

export const API_ENDPOINTS = {
  BLOGS: '/blogs-data/',
  BLOG_DETAIL: (id: number) => `/blogs-data/${id}/`,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
} as const;
