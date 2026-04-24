import { describe, it, expect } from '@jest/globals'
import { cn } from '../utils'

describe('cn', () => {
  it('returns empty string when called with no arguments', () => {
    expect(cn()).toBe('')
  })

  it('joins multiple class strings with a space', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('filters out false boolean values', () => {
    expect(cn('a', false, 'b')).toBe('a b')
  })

  it('filters out null values', () => {
    expect(cn('a', null, 'b')).toBe('a b')
  })

  it('filters out undefined values', () => {
    expect(cn('a', undefined, 'b')).toBe('a b')
  })

  it('filters out empty string values', () => {
    expect(cn('a', '', 'b')).toBe('a b')
  })

  it('flattens nested arrays of class strings', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c')
  })

  it('includes the number 0 as a class string', () => {
    expect(cn(0)).toBe('0')
  })
})
