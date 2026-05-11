import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(
  'Privacy Policy',
  'Privacy policy for Click & Build Labs. We respect your privacy and do not collect personal data.',
  '/privacy'
);

export default function PrivacyPage() {
  return (
    <Container className="py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Privacy Policy
      </h1>

      <div className="mt-8 space-y-6 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Information We Collect
          </h2>
          <p className="mt-2">
            We do not collect personal information. All tool processing happens
            entirely in your browser - no data is sent to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Cookies
          </h2>
          <p className="mt-2">
            We do not use cookies. No tracking, no analytics, no third-party scripts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Third-Party Services
          </h2>
          <p className="mt-2">
            We may use third-party services like Google AdSense to display
            advertisements. These services may collect information according
            to their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Data Security
          </h2>
          <p className="mt-2">
            Since we do not collect any data, there is nothing to secure on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Contact
          </h2>
          <p className="mt-2">
            For privacy concerns, please contact us via our GitHub repository.
          </p>
        </section>
      </div>
    </Container>
  );
}