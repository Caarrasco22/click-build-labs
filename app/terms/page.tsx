import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(
  'Terms of Service',
  'Terms of service for Click & Build Labs. Our tools are provided as-is for free use.',
  '/terms'
);

export default function TermsPage() {
  return (
    <Container className="py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Terms of Service
      </h1>

      <div className="mt-8 space-y-6 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Acceptance of Terms
          </h2>
          <p className="mt-2">
            By using our services, you agree to these terms. If you do not agree,
            please do not use our tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Use of Service
          </h2>
          <p className="mt-2">
            Our tools are provided for free. You may use them for personal or
            commercial projects. No attribution required.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Disclaimer
          </h2>
          <p className="mt-2">
            Tools are provided &quot;as is&quot; without warranty of any kind. We do not
            guarantee accuracy or availability. Use at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Limitation of Liability
          </h2>
          <p className="mt-2">
            We are not liable for any damages arising from the use of our tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Changes to Terms
          </h2>
          <p className="mt-2">
            We may update these terms at any time. Continued use constitutes acceptance.
          </p>
        </section>
      </div>
    </Container>
  );
}