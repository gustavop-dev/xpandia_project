import { describe, it, expect } from '@jest/globals'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithIntl } from '@/test-utils/renderWithIntl'
import ContactForm from '../ContactForm'
import { submitContactForm } from '@/lib/services/contact'

jest.mock('@/lib/services/contact', () => ({
  submitContactForm: jest.fn(() => Promise.resolve()),
}))

const mockSubmit = jest.mocked(submitContactForm)

// jsdom does not implement window.scrollTo; the "Request…" buttons call it (via goToContactForm) on click.
beforeAll(() => {
  window.scrollTo = jest.fn()
})

describe('ContactForm', () => {
  it('renders the form title', () => {
    renderWithIntl(<ContactForm />)
    expect(screen.getByRole('heading', { level: 3, name: /let's talk about your spanish\/english products/i })).toBeInTheDocument()
  })

  it('renders the Send request submit button', () => {
    renderWithIntl(<ContactForm />)
    expect(screen.getByRole('button', { name: /send request/i })).toBeInTheDocument()
  })

  it('renders the contact email in the aside', () => {
    renderWithIntl(<ContactForm />)
    expect(screen.getAllByText('hello@xpandia.global').length).toBeGreaterThan(0)
  })

  it('links the aside email as a mailto link', () => {
    renderWithIntl(<ContactForm />)
    const links = screen.getAllByRole('link', { name: 'hello@xpandia.global' })
    expect(links[0]).toHaveAttribute('href', 'mailto:hello@xpandia.global')
  })

  it('renders the "Language Assurance" service radio option', () => {
    renderWithIntl(<ContactForm />)
    expect(screen.getByText('Language Assurance')).toBeInTheDocument()
  })

  it('renders the "LatAm" audience radio option', () => {
    renderWithIntl(<ContactForm />)
    expect(screen.getByText('LatAm')).toBeInTheDocument()
  })

  it('renders the "What do you need help with?" field label', () => {
    renderWithIntl(<ContactForm />)
    expect(screen.getByText('What do you need help with?')).toBeInTheDocument()
  })

  it('renders the "Target audience / market" field label', () => {
    renderWithIntl(<ContactForm />)
    expect(screen.getByText('Target audience / market')).toBeInTheDocument()
  })

  it('marks a service radio tile as selected when clicked', async () => {
    const user = userEvent.setup()
    renderWithIntl(<ContactForm />)
    await user.click(screen.getByText('Language Assurance'))
    expect(screen.getByText('Language Assurance').closest('[role="button"]')).toHaveClass('on')
  })

  it('marks a target audience radio tile as selected when clicked', async () => {
    const user = userEvent.setup()
    renderWithIntl(<ContactForm />)
    await user.click(screen.getByText('US Hispanic'))
    expect(screen.getByText('US Hispanic').closest('[role="button"]')).toHaveClass('on')
  })

  it('selects a radio tile when Enter key is pressed on it', async () => {
    const user = userEvent.setup()
    renderWithIntl(<ContactForm />)
    const tile = screen.getByText('Language Assurance').closest('[role="button"]') as HTMLElement
    tile.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('Language Assurance').closest('[role="button"]')).toHaveClass('on')
  })

  it('selects a radio tile when Space key is pressed on it', async () => {
    const user = userEvent.setup()
    renderWithIntl(<ContactForm />)
    const tile = screen.getByText('AI Language QA').closest('[role="button"]') as HTMLElement
    tile.focus()
    await user.keyboard(' ')
    expect(screen.getByText('AI Language QA').closest('[role="button"]')).toHaveClass('on')
  })

  it('marks the Request an audit button as pressed when clicked', async () => {
    const user = userEvent.setup()
    renderWithIntl(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /request an audit/i }))
    expect(screen.getByRole('button', { name: /request an audit/i })).toHaveAttribute('aria-pressed', 'true')
  })

  it('leaves the other request button unpressed when one is clicked', async () => {
    const user = userEvent.setup()
    renderWithIntl(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /request an audit/i }))
    expect(screen.getByRole('button', { name: /request language experience repair/i })).toHaveAttribute('aria-pressed', 'false')
  })

  it('tags the audit intent when Request an audit is submitted', async () => {
    const user = userEvent.setup()
    renderWithIntl(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /request an audit/i }))
    const form = screen.getByRole('button', { name: /send request/i }).closest('form')!
    fireEvent.submit(form)
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({ intent: 'audit' }))
    })
  })

  it('shows a confirmation message after form submission', async () => {
    renderWithIntl(<ContactForm />)
    const form = screen.getByRole('button', { name: /send request/i }).closest('form')!
    fireEvent.submit(form)
    expect(await screen.findByText(/Request received/i)).toBeInTheDocument()
  })

  it('hides the submit button after form submission', async () => {
    renderWithIntl(<ContactForm />)
    const form = screen.getByRole('button', { name: /send request/i }).closest('form')!
    fireEvent.submit(form)
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /send request/i })).not.toBeInTheDocument()
    })
  })

  it('shows the error banner when submission fails', async () => {
    mockSubmit.mockRejectedValueOnce(new Error('network'))
    renderWithIntl(<ContactForm />)
    const form = screen.getByRole('button', { name: /send request/i }).closest('form')!
    fireEvent.submit(form)
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('keeps the submit button visible when submission fails', async () => {
    mockSubmit.mockRejectedValueOnce(new Error('network'))
    renderWithIntl(<ContactForm />)
    const form = screen.getByRole('button', { name: /send request/i }).closest('form')!
    fireEvent.submit(form)
    await screen.findByText(/something went wrong/i)
    expect(screen.getByRole('button', { name: /send request/i })).toBeInTheDocument()
  })

  it('does not show the success banner when submission fails', async () => {
    mockSubmit.mockRejectedValueOnce(new Error('network'))
    renderWithIntl(<ContactForm />)
    const form = screen.getByRole('button', { name: /send request/i }).closest('form')!
    fireEvent.submit(form)
    await screen.findByText(/something went wrong/i)
    expect(screen.queryByText(/Request received/i)).not.toBeInTheDocument()
  })
})
