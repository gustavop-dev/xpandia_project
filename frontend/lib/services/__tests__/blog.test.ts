import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn: unknown) => fn,
}))

const fetchMock = jest.fn() as jest.Mock
;(global as unknown as { fetch: jest.Mock }).fetch = fetchMock

const ORIGIN_ENV = process.env.NEXT_PUBLIC_BACKEND_ORIGIN

function loadService() {
  let mod: typeof import('../blog')
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    mod = require('../blog') as typeof import('../blog')
  })
  return mod!
}

function jsonResponse(payload: unknown, init: { ok?: boolean; status?: number } = { ok: true, status: 200 }) {
  return {
    ok: init.ok !== false,
    status: init.status ?? 200,
    json: async () => payload,
  } as unknown as Response
}

beforeEach(() => {
  fetchMock.mockReset()
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN = 'https://api.test'
})

afterEach(() => {
  if (ORIGIN_ENV === undefined) delete process.env.NEXT_PUBLIC_BACKEND_ORIGIN
  else process.env.NEXT_PUBLIC_BACKEND_ORIGIN = ORIGIN_ENV
})

describe('fetchBlogPosts', () => {
  it('builds URL with default lang/page/page_size', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ results: [], count: 0, page: 1, page_size: 9, total_pages: 1 }))
    const { fetchBlogPosts } = loadService()
    await fetchBlogPosts()
    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.test/api/blog/?lang=en&page=1&page_size=9')
  })

  it('passes lang/page/pageSize through to URL', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ results: [], count: 0, page: 2, page_size: 5, total_pages: 1 }))
    const { fetchBlogPosts } = loadService()
    await fetchBlogPosts('es', 2, 5)
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.test/api/blog/?lang=es&page=2&page_size=5')
  })

  it('throws on non-OK response', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, { ok: false, status: 500 }))
    const { fetchBlogPosts } = loadService()
    await expect(fetchBlogPosts()).rejects.toThrow(/500/)
  })

  it('uses NEXT_PUBLIC_BACKEND_ORIGIN when set', async () => {
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN = 'https://staging.example.com/'
    fetchMock.mockResolvedValueOnce(jsonResponse({ results: [], count: 0, page: 1, page_size: 9, total_pages: 1 }))
    const { fetchBlogPosts } = loadService()
    await fetchBlogPosts()
    expect(fetchMock.mock.calls[0][0]).toMatch(/^https:\/\/staging\.example\.com\/api\/blog\//)
  })
})

describe('fetchBlogPost', () => {
  it('returns parsed post for 200', async () => {
    const payload = { id: 1, slug: 'hello', title: 'Hello' }
    fetchMock.mockResolvedValueOnce(jsonResponse(payload))
    const { fetchBlogPost } = loadService()
    const post = await fetchBlogPost('hello')
    expect(post).toEqual(payload)
  })

  it('returns null for 404', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ detail: 'Not found.' }, { ok: false, status: 404 }))
    const { fetchBlogPost } = loadService()
    const post = await fetchBlogPost('missing')
    expect(post).toBeNull()
  })

  it('throws on 500', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, { ok: false, status: 500 }))
    const { fetchBlogPost } = loadService()
    await expect(fetchBlogPost('boom')).rejects.toThrow(/500/)
  })

  it('builds URL with the slug and lang', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ slug: 'my-post' }))
    const { fetchBlogPost } = loadService()
    await fetchBlogPost('my-post', 'es')
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.test/api/blog/my-post/?lang=es')
  })
})
