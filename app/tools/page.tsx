import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ToolCard } from '@/components/tools/ToolCard';
import { tools } from '@/lib/registry';
import { ToolsFilterClient } from './ToolsFilterClient';

export const metadata: Metadata = {
  title: 'All Free Online Tools & Utilities',
  description: 'Browse all free online tools: formatters, converters, generators, calculators, and utilities for developers and creators. No signup required.',
  openGraph: {
    title: 'All Tools | Click & Build Labs',
    description: 'Browse all free online tools: formatters, converters, generators, calculators, and utilities.',
    siteName: 'Click & Build Labs',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'All Tools | Click & Build Labs',
    description: 'Browse all free online tools: formatters, converters, generators, calculators, and utilities.',
  },
  alternates: {
    canonical: 'https://clickbuildlabs.com/tools/',
  },
};

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

      <ToolsFilterClient />

      <div id="tools-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <div
            key={tool.slug}
            data-tool-card
            data-tool-name={tool.name.toLowerCase()}
            data-tool-description={tool.shortDescription.toLowerCase()}
            data-tool-category={tool.category}
          >
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>

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
