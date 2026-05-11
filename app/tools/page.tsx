import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { tools } from '@/lib/registry';
import { ToolsFilterClient } from './ToolsFilterClient';

export const metadata: Metadata = {
  title: 'All Free Online Tools | Click & Build Labs',
  description:
    'Browse all free online tools: formatters, converters, generators, and utilities. No signup required.',
};

function ToolsLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="h-24 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 animate-pulse"
        />
      ))}
    </div>
  );
}

export default async function ToolsPage() {
  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          All Tools
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {tools.length} free tools. No signup required.
        </p>
      </div>

      <Suspense fallback={<ToolsLoading />}>
        <ToolsFilterClient tools={tools} />
      </Suspense>

      <div className="mt-12 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          More tools coming soon.
        </p>
        <a
          href="https://github.com/Caarrasco22/click-build-labs/issues"
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
