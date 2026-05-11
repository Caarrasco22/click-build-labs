import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ToolCard } from '@/components/tools/ToolCard';
import { CATEGORY_LABELS, CATEGORY_INFO, tools, type ToolCategory } from '@/lib/registry';

const VALID_CATEGORIES: ToolCategory[] = ['dev', 'converter', 'calculators', 'generator', 'text', 'utility'];

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORY_INFO[category as ToolCategory];

  if (!info) {
    return { title: 'Category Not Found | Click & Build Labs' };
  }

  return {
    title: info.seoTitle,
    description: info.seoDescription,
    openGraph: {
      title: info.seoTitle,
      description: info.seoDescription,
      url: `https://clickbuildlabs.com/categories/${category}`,
      siteName: 'Click & Build Labs',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: info.seoTitle,
      description: info.seoDescription,
    },
    alternates: {
      canonical: `https://clickbuildlabs.com/categories/${category}`,
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = CATEGORY_INFO[category as ToolCategory];

  if (!info) {
    return (
      <Container className="py-10">
        <p className="text-zinc-500">Category not found.</p>
        <Link href="/tools" className="text-blue-600 hover:underline mt-4 inline-block">
          Browse all tools
        </Link>
      </Container>
    );
  }

  const categoryTools = tools.filter((t) => t.category === category);
  const categoryLabel = CATEGORY_LABELS[category as ToolCategory] || category;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://clickbuildlabs.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://clickbuildlabs.com/tools' },
      { '@type': 'ListItem', position: 3, name: categoryLabel, item: `https://clickbuildlabs.com/categories/${category}` },
    ],
  };

  const faqJsonLd = info.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: info.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Container className="py-10">
        <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/tools" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            Tools
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-zinc-900 dark:text-zinc-100">{categoryLabel}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {info.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {info.description}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'} available
          </p>
        </header>

        {categoryTools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} showCategory={false} />
            ))}
          </div>
        ) : (
          <Card className="mb-12">
            <div className="p-6 text-center text-zinc-500">
              No tools in this category yet.
            </div>
          </Card>
        )}

        {info.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Frequently Asked Questions
            </h2>
            <Card>
              {info.faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </Card>
          </section>
        )}

        {info.relatedCategories.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Related Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {info.relatedCategories.map((relCat) => {
                const relInfo = CATEGORY_INFO[relCat];
                const relLabel = CATEGORY_LABELS[relCat];
                return relInfo ? (
                  <Link
                    key={relCat}
                    href={`/categories/${relCat}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {relLabel}
                  </Link>
                ) : null;
              })}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}