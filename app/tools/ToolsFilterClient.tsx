'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';
import { TOOL_CATEGORIES, CATEGORY_LABELS, type ToolCategory } from '@/lib/registry';
import type { Tool } from '@/lib/types';

interface ToolsFilterClientProps {
  tools: Tool[];
}

export function ToolsFilterClient({ tools }: ToolsFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const category = searchParams.get('category') || 'all';

  const filteredTools = query
    ? tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query.toLowerCase()) ||
          tool.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : category === 'all'
      ? tools
      : tools.filter((t) => t.category === category);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category !== 'all') params.set('category', category);
    router.push(`/tools${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {TOOL_CATEGORIES.map((cat) => (
              <Link key={cat} href={cat === 'all' ? '/tools' : `/tools?category=${cat}`}>
                <Button
                  variant={category === cat ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {cat === 'all' ? 'All' : CATEGORY_LABELS[cat as ToolCategory]}
                </Button>
              </Link>
            ))}
          </div>

          <form method="GET" action="/tools" className="relative" onSubmit={handleSearch}>
            {category !== 'all' && <input type="hidden" name="category" value={category} />}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools..."
              className="pl-10 pr-4 py-2 rounded-lg border border-zinc-200 bg-white text-sm dark:border-zinc-800 dark:bg-zinc-900 w-48 focus:w-64 transition-all outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
            />
          </form>
        </div>
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-zinc-500 dark:text-zinc-400">
            No tools found matching your criteria.
          </p>
          <Link href="/tools" className="mt-4 inline-block">
            <Button variant="secondary">Clear filters</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {tool.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
