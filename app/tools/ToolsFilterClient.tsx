'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';
import { TOOL_CATEGORIES, CATEGORY_LABELS, type ToolCategory } from '@/lib/registry';

function getInitialParams() {
  if (typeof window === 'undefined') {
    return { query: '', category: 'all' };
  }

  const searchParams = new URLSearchParams(window.location.search);
  return {
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
  };
}

export function ToolsFilterClient() {
  const initialParams = useMemo(() => getInitialParams(), []);
  const [query, setQuery] = useState(initialParams.query);
  const [category, setCategory] = useState(initialParams.category);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-tool-card]');
    const normalizedQuery = query.trim().toLowerCase();

    cards.forEach((card) => {
      const matchesCategory =
        category === 'all' || card.dataset.toolCategory === category;
      const matchesQuery =
        !normalizedQuery ||
        card.dataset.toolName?.includes(normalizedQuery) ||
        card.dataset.toolDescription?.includes(normalizedQuery);

      card.hidden = !(matchesCategory && matchesQuery);
    });
  }, [category, query]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category !== 'all') params.set('category', category);

    const url = `/tools${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState(null, '', url);
  }, [category, query]);

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TOOL_CATEGORIES.map((cat) => (
            <Link key={cat} href={cat === 'all' ? '/tools' : `/tools?category=${cat}`}>
              <Button
                variant={category === cat ? 'primary' : 'secondary'}
                size="sm"
                onClick={(event) => {
                  event.preventDefault();
                  setCategory(cat);
                }}
              >
                {cat === 'all' ? 'All' : CATEGORY_LABELS[cat as ToolCategory]}
              </Button>
            </Link>
          ))}
        </div>

        <form method="GET" action="/tools" className="relative">
          {category !== 'all' && <input type="hidden" name="category" value={category} />}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools..."
            className="pl-10 pr-4 py-2 rounded-lg border border-zinc-200 bg-white text-sm dark:border-zinc-800 dark:bg-zinc-900 w-48 focus:w-64 transition-all outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
          />
        </form>
      </div>
    </div>
  );
}
