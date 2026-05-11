import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { TOOL_CATEGORIES, CATEGORY_LABELS } from '@/lib/registry';

const FEATURED_TOOLS = [
  { name: 'JSON Formatter', slug: 'json-formatter', description: 'Format, validate and beautify JSON instantly', category: 'dev' as const, popular: true },
  { name: 'Color Converter', slug: 'color-converter', description: 'Convert between HEX, RGB, HSL and more', category: 'converter' as const, popular: true },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', description: 'Generate placeholder text for your designs', category: 'generator' as const, popular: false },
];

export function HeroSection() {
  return (
    <section className="flex flex-col items-center py-20 text-center">
      <Badge variant="outline" className="mb-4">
        Free & No Signup Required
      </Badge>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
        Online tools that just work
      </h1>

      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Fast, clean, and free utilities for developers and creators.
        No ads, no signup, no fluff.
      </p>
    </section>
  );
}

export function FeaturedTools() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Popular Tools
        </h2>
        <Link
          href="/tools"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_TOOLS.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <Card hover className="h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {tool.description}
                  </p>
                </div>
                {tool.popular && (
                  <Badge>Popular</Badge>
                )}
              </div>
              <div className="mt-4">
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  {CATEGORY_LABELS[tool.category]}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CategoriesSection() {
  const categories = TOOL_CATEGORIES.filter((c) => c !== 'all');

  return (
    <section className="py-12">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
        Browse by Category
      </h2>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link key={category} href={`/tools?category=${category}`}>
            <Card hover className="text-center">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}