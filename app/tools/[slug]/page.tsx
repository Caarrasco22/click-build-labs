import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ChevronRight, Home, ArrowRight, Hash, Lock, Shield, Code, Link2, RefreshCw, Palette, Type } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ToolCard } from '@/components/tools/ToolCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { getToolBySlug, getRelatedTools, CATEGORY_LABELS, tools } from '@/lib/registry';
import { TOOL_COMPONENTS, hasToolComponent } from '@/lib/components';
import { createToolJsonLd, createBreadcrumbJsonLd } from '@/lib/seo';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  hash: Hash,
  code: Code,
  link: Link2,
  lock: Lock,
  shield: Shield,
  refresh: RefreshCw,
  palette: Palette,
  type: Type,
};

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: 'Tool Not Found | Click & Build Labs' };
  }

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.tags,
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `https://clickbuildlabs.com/tools/${tool.slug}`,
      siteName: 'Click & Build Labs',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seo.title,
      description: tool.seo.description,
    },
    alternates: {
      canonical: `https://clickbuildlabs.com/tools/${tool.slug}`,
    },
  };
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
      <h3 className="py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {question}
      </h3>
      <p className="pb-4 text-sm text-zinc-600 dark:text-zinc-400">{answer}</p>
    </div>
  );
}

function ToolContent({ slug }: { slug: string }) {
  if (!hasToolComponent(slug)) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500 dark:text-zinc-400">
          This tool is coming soon.
        </p>
        <Link href="/tools">
          <Button variant="secondary" className="mt-4">
            Browse all tools
          </Button>
        </Link>
      </div>
    );
  }

  const ToolComponent = TOOL_COMPONENTS[slug];
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
      </div>
    }>
      <ToolComponent />
    </Suspense>
  );
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(slug);
  const jsonLd = createToolJsonLd(tool);
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: 'Home', url: 'https://clickbuildlabs.com' },
    { name: 'Tools', url: 'https://clickbuildlabs.com/tools' },
    { name: tool.name, url: `https://clickbuildlabs.com/tools/${tool.slug}` },
  ]);

  const Icon = iconMap[tool.icon] || Code;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container className="py-10">
        <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
          <Link
            href="/"
            className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/tools"
            className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Tools
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-zinc-900 dark:text-zinc-100">{tool.name}</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            {Icon && (
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Icon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
              </div>
            )}
            <div className="flex items-center gap-2">
              {tool.featured && <Badge variant="outline">Featured</Badge>}
              {tool.popular && <Badge variant="outline">Popular</Badge>}
              <Badge variant="outline">{tool.category}</Badge>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {tool.name}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {tool.description}
          </p>
        </header>

        {tool.ads.enabled && tool.ads.positions.includes('top') && (
          <div className="flex justify-center mb-6">
            <AdSlot position="top" variant="auto" />
          </div>
        )}

        <Card className="mb-12">
          <div className="p-6 sm:p-8">
            <ToolContent slug={tool.slug} />
          </div>
        </Card>

        {tool.faqs && tool.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Frequently Asked Questions
            </h2>
            <Card>
              {tool.faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </Card>
          </section>
        )}

        {tool.ads.enabled && tool.ads.positions.includes('inline') && (
          <div className="flex justify-center mb-12">
            <AdSlot position="inline" variant="auto" />
          </div>
        )}

        {relatedTools.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Related Tools
              </h2>
              <Link
                href="/tools"
                className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((relatedTool) => (
                <ToolCard key={relatedTool.slug} tool={relatedTool} showCategory={false} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
