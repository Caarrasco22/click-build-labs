import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ToolCard } from '@/components/tools/ToolCard';
import { SearchBar } from '@/components/tools/SearchBar';
import { tools, getFeaturedTools, getPopularTools, TOOL_CATEGORIES, CATEGORY_LABELS } from '@/lib/registry';
import { ArrowRight, Zap, Shield, Code2, Layers, Sparkles } from 'lucide-react';

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const popularTools = getPopularTools();
  const toolCount = tools.length;
  const categoryCount = TOOL_CATEGORIES.filter((c) => c !== 'all').length;

  return (
    <>
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge variant="outline" className="mb-5">
              100% Free · No Signup · Client-side
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Tools that just work
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
              Fast, free, and no BS. Utilities for developers and creators.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <SearchBar tools={tools} placeholder="Search tools..." />
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-zinc-200 dark:border-zinc-800">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="flex items-center gap-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <Layers className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {toolCount}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Tools</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <Code2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {categoryCount}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Categories</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <Zap className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  100%
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Free</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <Shield className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  0
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Tracking</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Most Used
            </h2>
            <Link
              href="/tools"
              className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-zinc-50/50 dark:bg-zinc-900/30">
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Featured
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-8">
            Browse by Category
          </h2>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {TOOL_CATEGORIES.filter((c) => c !== 'all').map((category) => (
              <Link key={category} href={`/tools?category=${category}`}>
                <Card hover className="text-center py-5">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
              Missing something?
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              Suggest a tool and we might build it for you. We&apos;re always adding new utilities.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Suggest a Tool <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}