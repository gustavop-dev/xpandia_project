import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Footer from '../Footer';
import Header from '../Header';

describe('layout components', () => {
  it('renders footer copy', () => {
    render(<Footer />);
    expect(screen.getByText(/Base Django \+ React \+ Next Feature Template/i)).toBeInTheDocument();
  });

  it('renders header with blog link', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Blogs' })).toHaveAttribute('href', '/blogs');
  });
});
