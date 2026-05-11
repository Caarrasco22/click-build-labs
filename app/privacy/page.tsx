import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(
  'Privacy Policy',
  'Privacy policy for Click & Build Labs. We respect your privacy and handle your data transparently.',
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
            How We Process Data
          </h2>
          <p className="mt-2">
            All tool processing happens entirely in your browser. No data you enter
            is transmitted to our servers. Your text, passwords, UUIDs, and any
            other input never leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Cookies and Local Storage
          </h2>
          <p className="mt-2">
            We do not use persistent cookies. We may use session storage to remember
            your preferences (such as dark mode settings). No tracking cookies or
            analytics cookies are used.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Third-Party Services
          </h2>
          <p className="mt-2">
            We may display advertisements through third-party networks like Google AdSense.
            These services may collect standard usage data according to their own privacy
            policies. We recommend reviewing the privacy policies of these services.
          </p>
          <p className="mt-2">
            We may also use analytics tools to understand how visitors use our site.
            This helps us improve our tools and user experience.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Data We Collect
          </h2>
          <p className="mt-2">
            We do not collect, store, or log any personal data you process through
            our tools. Any data you process is handled entirely client-side in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Data Security
          </h2>
          <p className="mt-2">
            Since we do not collect your processed data, there is nothing stored
            on our servers to secure. Your data is processed locally on your device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Contact
          </h2>
          <p className="mt-2">
            For privacy concerns or questions, please contact us via our GitHub repository.
          </p>
        </section>
      </div>
    </Container>
  );
}
