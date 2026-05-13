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
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Tell us what your team is building, launching, or improving in Spanish\./i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the "What do you need help with?" field label', () => {
    render(<ContactPage />)
    expect(screen.getByText('What do you need help with?')).toBeInTheDocument()
  })

  it('renders the "Target audience / market" field label', () => {
    render(<ContactPage />)
    expect(screen.getByText('Target audience / market')).toBeInTheDocument()
  })

  it('renders the Send request submit button', () => {
    render(<ContactPage />)
    expect(screen.getByRole('button', { name: /send request/i })).toBeInTheDocument()
  })

  it('marks a service radio tile as selected when clicked', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    await user.click(screen.getByText('Language Assurance'))
    expect(screen.getByText('Language Assurance').closest('[role="button"]')).toHaveClass('on')
  })

  it('marks a target audience radio tile as selected when clicked', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    await user.click(screen.getByText('US Hispanic'))
    expect(screen.getByText('US Hispanic').closest('[role="button"]')).toHaveClass('on')
  })

  it('shows a confirmation message after form submission', async () => {
    render(<ContactPage />)
    const form = screen.getByRole('button', { name: /send request/i }).closest('form')!
    fireEvent.submit(form)
    expect(await screen.findByText(/Request received/i)).toBeInTheDocument()
  })

  it('hides the submit button after form submission', async () => {
    render(<ContactPage />)
    const form = screen.getByRole('button', { name: /send request/i }).closest('form')!
    fireEvent.submit(form)
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /send request/i })).not.toBeInTheDocument()
    })
  })

  it('renders the NEXT STEPS process eyebrow', () => {
    render(<ContactPage />)
    expect(screen.getByText('NEXT STEPS')).toBeInTheDocument()
  })

  it('renders the process step "Share your context"', () => {
    render(<ContactPage />)
    expect(screen.getByText('Share your context')).toBeInTheDocument()
  })

  it('renders the direct contact email', () => {
    render(<ContactPage />)
    expect(screen.getAllByText('hello@xpandia.global').length).toBeGreaterThan(0)
  })

  it('links the email address as a mailto link', () => {
    render(<ContactPage />)
    const links = screen.getAllByRole('link', { name: 'hello@xpandia.global' })
    expect(links[0]).toHaveAttribute('href', 'mailto:hello@xpandia.global')
  })

  it('selects a radio tile when Enter key is pressed on it', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    const tile = screen.getByText('Language Assurance').closest('[role="button"]') as HTMLElement
    tile.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('Language Assurance').closest('[role="button"]')).toHaveClass('on')
  })

  it('selects a radio tile when Space key is pressed on it', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    const tile = screen.getByText('AI Spanish QA').closest('[role="button"]') as HTMLElement
    tile.focus()
    await user.keyboard(' ')
    expect(screen.getByText('AI Spanish QA').closest('[role="button"]')).toHaveClass('on')
  })
})
