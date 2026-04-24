import type { Blog } from '../types';

export const mockBlogs: Blog[] = [
  {
    id: 1,
    title: 'How to Choose the Perfect Candle',
    description: 'A comprehensive guide to selecting the right candle for your space',
    category: 'Tips & Tricks',
    image_url: 'http://example.com/blog1.jpg',
  },
  {
    id: 2,
    title: 'The Art of Candle Making',
    description: 'Learn about the traditional craft of candle making',
    category: 'Education',
    image_url: 'http://example.com/blog2.jpg',
  },
  {
    id: 3,
    title: 'Top 10 Candle Scents for 2026',
    description: 'Discover the trending scents for this year',
    category: 'Trends',
    image_url: 'http://example.com/blog3.jpg',
  },
];

export const mockBlog: Blog = mockBlogs[0];
