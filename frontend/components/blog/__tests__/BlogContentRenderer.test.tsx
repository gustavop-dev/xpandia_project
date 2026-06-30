import { describe, it, expect } from '@jest/globals'
import { render, screen, within } from '@testing-library/react'

import BlogContentRenderer from '../BlogContentRenderer'

describe('BlogContentRenderer', () => {
  it('renders intro paragraph', () => {
    render(<BlogContentRenderer content={{ intro: 'Welcome readers.' }} />)
    expect(screen.getByText('Welcome readers.')).toBeInTheDocument()
  })

  it('renders heading as h2 by default', () => {
    render(<BlogContentRenderer content={{ sections: [{ type: 'heading', text: 'A title' }] }} />)
    expect(screen.getByRole('heading', { level: 2, name: 'A title' })).toBeInTheDocument()
  })

  it('renders heading as h3 when level=3', () => {
    render(<BlogContentRenderer content={{ sections: [{ type: 'heading', level: 3, text: 'A subtitle' }] }} />)
    expect(screen.getByRole('heading', { level: 3, name: 'A subtitle' })).toBeInTheDocument()
  })

  it('renders list items as <li>', () => {
    render(<BlogContentRenderer content={{ sections: [{ type: 'list', items: ['One', 'Two'] }] }} />)
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('renders image figure with alt and caption', () => {
    render(
      <BlogContentRenderer
        content={{ sections: [{ type: 'image', url: 'https://example.com/x.jpg', alt: 'photo', caption: 'a caption' }] }}
      />
    )
    expect(screen.getByRole('img', { name: 'photo' })).toBeInTheDocument()
    expect(screen.getByText('a caption')).toBeInTheDocument()
  })

  it('renders quote with author', () => {
    render(<BlogContentRenderer content={{ sections: [{ type: 'quote', text: 'be brief', author: 'Xpandia' }] }} />)
    expect(screen.getByText(/be brief/)).toBeInTheDocument()
    expect(screen.getByText(/Xpandia/)).toBeInTheDocument()
  })

  it('renders callout with variant', () => {
    render(
      <BlogContentRenderer
        content={{ sections: [{ type: 'callout', variant: 'tip', title: 'Tip', text: 'Do this.' }] }}
      />
    )
    expect(screen.getByText('Tip')).toBeInTheDocument()
    expect(screen.getByText('Do this.')).toBeInTheDocument()
  })

  it('renders conclusion paragraph', () => {
    render(<BlogContentRenderer content={{ conclusion: 'Goodbye.' }} />)
    expect(screen.getByText('Goodbye.')).toBeInTheDocument()
  })

  it('returns null when content is null', () => {
    const { container } = render(<BlogContentRenderer content={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a code block with its content', () => {
    render(<BlogContentRenderer content={{ sections: [{ type: 'code', language: 'python', code: "print('hi')" }] }} />)
    expect(screen.getByText("print('hi')")).toBeInTheDocument()
  })

  it('renders a divider as a horizontal rule', () => {
    const { container } = render(<BlogContentRenderer content={{ sections: [{ type: 'divider' }] }} />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('renders a video as an embedded iframe', () => {
    const { container } = render(
      <BlogContentRenderer content={{ sections: [{ type: 'video', url: 'https://www.youtube.com/watch?v=abc123' }] }} />
    )
    const iframe = container.querySelector('iframe')
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123')
  })

  it('renders a table with headers and cells', () => {
    render(
      <BlogContentRenderer
        content={{ sections: [{ type: 'table', headers: ['H1', 'H2'], rows: [['a', 'b']] }] }}
      />
    )
    expect(screen.getByRole('columnheader', { name: 'H1' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'a' })).toBeInTheDocument()
  })

  it('renders a cta as a link to its url', () => {
    render(<BlogContentRenderer content={{ sections: [{ type: 'cta', label: 'Contact us', url: '/contact' }] }} />)
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/contact')
  })

  it('numbers h2 headings without changing their accessible name', () => {
    render(
      <BlogContentRenderer
        content={{ sections: [
          { type: 'heading', level: 2, text: 'First' },
          { type: 'heading', level: 2, text: 'Second' },
        ] }}
      />
    )
    expect(screen.getByRole('heading', { level: 2, name: 'First' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Second' })).toBeInTheDocument()
  })

  it('gives headings anchor ids derived from their text', () => {
    const { container } = render(
      <BlogContentRenderer content={{ sections: [{ type: 'heading', level: 2, text: 'Hello World' }] }} />
    )
    expect(container.querySelector('#hello-world')).toBeInTheDocument()
  })

  it('renders a table of contents when there are multiple headings', () => {
    render(
      <BlogContentRenderer
        tocLabel="Contents"
        content={{ sections: [
          { type: 'heading', level: 2, text: 'Alpha' },
          { type: 'heading', level: 2, text: 'Beta' },
        ] }}
      />
    )
    const toc = screen.getByRole('navigation', { name: 'Contents' })
    expect(toc).toBeInTheDocument()
    expect(within(toc).getByRole('link', { name: /Alpha/ })).toHaveAttribute('href', '#alpha')
  })

  it('omits the table of contents when there is only one heading', () => {
    render(
      <BlogContentRenderer
        tocLabel="Contents"
        content={{ sections: [{ type: 'heading', level: 2, text: 'Solo' }] }}
      />
    )
    expect(screen.queryByRole('navigation', { name: 'Contents' })).not.toBeInTheDocument()
  })
})
