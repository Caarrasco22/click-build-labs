import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ToolCard } from '@/components/tools/ToolCard';
import { tools, searchTools } from '@/lib/registry';
import { TOOL_CATEGORIES, CATEGORY_LABELS, type ToolCategory } from '@/lib/registry';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Free Online Tools | Click & Build Labs',
  description:
    'Browse all free online tools: formatters, converters, generators, and utilities. No signup required.',
};

interface ToolsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams;
  const category = params.category || 'all';
  const query = params.q || '';

  const filteredTools = query
    ? searchTools(query)
    : category === 'all'
      ? tools
      : tools.filter((t) => t.category === category);

  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          All Tools
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {tools.length} free tools. No signup, no ads, no BS.
        </p>
      </div>

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

          <form method="GET" action="/tools" className="relative">
            <input type="hidden" name="category" value={category} />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="search"
              name="q"
              defaultValue={query}
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
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          More tools coming soon.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Suggest a tool on GitHub →
        </a>
      </div>
    </Container>
  );
}