'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link className="font-semibold tracking-tight" href="/">
          Blog
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 text-sm">
          <Link className="px-2 py-1 rounded hover:bg-gray-100" href="/blogs">
            Blogs
          </Link>
        </nav>
      </div>
    </header>
  );
}
