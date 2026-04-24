import { describe, it, expect } from '@jest/globals'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactPage from '../page'

jest.mock('@/lib/services/contact', () => ({
  submitContactForm: () => Promise.resolve(),
}))

describe('ContactPage', () => {
  it('renders the hero heading', () => {
    render(<ContactPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the Service of interest field label', () => {
    render(<ContactPage />)
    expect(screen.getByText('Service of interest')).toBeInTheDocument()
  })

  it('renders the Company size field label', () => {
    render(<ContactPage />)
    expect(screen.getByText('Company size')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<ContactPage />)
    expect(screen.getByRole('button', { name: /request diagnostic call/i })).toBeInTheDocument()
  })

  it('marks a service radio tile as selected when clicked', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    await user.click(screen.getByText('AI Spanish QA Sprint'))
    expect(screen.getByText('AI Spanish QA Sprint').closest('[role="button"]')).toHaveClass('on')
  })

  it('marks a company size radio tile as selected when clicked', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    await user.click(screen.getByText('50–150'))
    expect(screen.getByText('50–150').closest('[role="button"]')).toHaveClass('on')
  })

  it('shows a confirmation message after form submission', async () => {
    render(<ContactPage />)
    const form = screen.getByRole('button', { name: /request diagnostic call/i }).closest('form')!
    fireEvent.submit(form)
    expect(await screen.findByText(/Request received/i)).toBeInTheDocument()
  })

  it('hides the submit button after form submission', async () => {
    render(<ContactPage />)
    const form = screen.getByRole('button', { name: /request diagnostic call/i }).closest('form')!
    fireEvent.submit(form)
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /request diagnostic call/i })).not.toBeInTheDocument()
    })
  })

  it('renders the process step "You submit" in the aside', () => {
    render(<ContactPage />)
    expect(screen.getByText('You submit')).toBeInTheDocument()
  })

  it('renders the process step "30-minute call" in the aside', () => {
    render(<ContactPage />)
    expect(screen.getByText('30-minute call')).toBeInTheDocument()
  })

  it('renders the direct contact email in the aside', () => {
    render(<ContactPage />)
    expect(screen.getByText('hello@xpandia.co')).toBeInTheDocument()
  })

  it('selects a radio tile when Enter key is pressed on it', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    const tile = screen.getByText('AI Spanish QA Sprint').closest('[role="button"]') as HTMLElement
    tile.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('AI Spanish QA Sprint').closest('[role="button"]')).toHaveClass('on')
  })

  it('selects a radio tile when Space key is pressed on it', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    const tile = screen.getByText('Launch Readiness Audit').closest('[role="button"]') as HTMLElement
    tile.focus()
    await user.keyboard(' ')
    expect(screen.getByText('Launch Readiness Audit').closest('[role="button"]')).toHaveClass('on')
  })
})
