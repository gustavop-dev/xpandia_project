import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import LocaleError from '../error'

describe('LocaleError boundary', () => {
  const error = new Error('boom')

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the localized error title', () => {
    renderWithIntl(<LocaleError error={error} reset={jest.fn()} />)
    expect(screen.getByRole('heading', { level: 1, name: /something went wrong/i })).toBeInTheDocument()
  })

  it('renders a retry button', () => {
    renderWithIntl(<LocaleError error={error} reset={jest.fn()} />)
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('calls reset when the retry button is clicked', async () => {
    const user = userEvent.setup()
    const reset = jest.fn()
    renderWithIntl(<LocaleError error={error} reset={reset} />)
    await user.click(screen.getByRole('button', { name: /try again/i }))
    expect(reset).toHaveBeenCalledTimes(1)
  })

  it('renders a back-to-home link', () => {
    renderWithIntl(<LocaleError error={error} reset={jest.fn()} />)
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
  })
})
