import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'

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
})
