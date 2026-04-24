import { describe, it, expect } from '@jest/globals'
import { render } from '@testing-library/react'

jest.mock('gsap', () => ({
  __esModule: true,
  default: {
    registerPlugin: jest.fn(),
    from: jest.fn(),
    matchMedia: jest.fn(() => ({
      add: jest.fn((_query: string, cb: () => void) => cb()),
      revert: jest.fn(),
    })),
    utils: { toArray: jest.fn(() => []) },
  },
}))

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { batch: jest.fn() },
}))

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn((cb: () => void) => cb()),
}))

import SiteAnimations from '../SiteAnimations'

describe('SiteAnimations', () => {
  it('mounts without throwing', () => {
    expect(() => render(<SiteAnimations />)).not.toThrow()
  })

  it('renders no visible DOM elements', () => {
    const { container } = render(<SiteAnimations />)
    expect(container).toBeEmptyDOMElement()
  })
})
