import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { createAboutPageJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(
  'About Click & Build Labs',
  'Learn what Click & Build Labs is: a free collection of practical online tools, calculators, converters and developer utilities.',
  '/about'
);

export default function AboutPage() {
  const jsonLd = createAboutPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            About
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Simple tools for practical web work
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            ClickBuildLabs is a free collection of online tools, calculators,
            converters, and developer utilities. It is built for people who want
            a small task done quickly without creating an account, installing an
            app, or sorting through a complicated interface.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Free to use
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              The tools are free and do not require signup. Open a page, use the
              tool, and move on with your work.
            </p>
          </Card>
          <Card>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Browser-based
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Many tools run client-side in your browser, especially formatters,
              converters, generators, and common utility tools.
            </p>
          </Card>
          <Card>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Practical by design
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              The project focuses on simple, useful tools rather than large
              workflows or corporate software.
            </p>
          </Card>
        </div>

        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Who is it for?
            </h2>
            <p className="mt-3">
              ClickBuildLabs is for developers, creators, students, makers, and
              anyone who needs quick online utilities such as JSON tools,
              password generators, calculators, converters, image helpers, and
              text tools.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Who makes it?
            </h2>
            <p className="mt-3">
              The project is created and maintained by Pablo Carrasco under the
              Click & Build name. The goal is to keep the site honest, fast, and
              useful: small tools that do what they say.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Explore the site
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/tools', label: 'All tools' },
              { href: '/categories/dev', label: 'Developer tools' },
              { href: '/categories/calculators', label: 'Calculators' },
              { href: '/categories/converter', label: 'Converters' },
              { href: '/categories/image', label: 'Image tools' },
              { href: '/categories/text', label: 'Text tools' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
