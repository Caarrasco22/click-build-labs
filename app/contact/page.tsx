import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('Contact',
  'Report a tool problem or suggest an improvement to Click & Build Labs.', '/contact');

export default function ContactPage() {
  return <Container className="py-12 max-w-3xl">
    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Contact</h1>
    <div className="mt-8 space-y-6 text-zinc-600 dark:text-zinc-400">
      <p>Click &amp; Build Labs is maintained by Pablo Carrasco. You can report a problem or suggest a tool through the project&apos;s GitHub issues.</p>
      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Email and privacy questions</h2>
        <p className="mt-2">For general enquiries or privacy requests, email <a className="underline break-all" href="mailto:clickandbuild.info@gmail.com">clickandbuild.info@gmail.com</a>. Email is not posted to the public issue tracker. Please do not send passwords, private tokens or unnecessary personal documents.</p>
      </section>
      <p><a className="underline" href="https://github.com/Caarrasco22/click-build-labs/issues">View feedback and report an issue on GitHub</a></p>
      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Reporting a problem</h2>
        <p className="mt-2">Include the tool URL, your browser, the steps that caused the problem, and the result you expected. Use a small example with made-up data so the issue can be reproduced.</p>
      </section>
      <p>GitHub requires an account to submit an issue, and issues are public. Do not include passwords, private tokens, personal documents or sensitive privacy requests there. This website does not have a private contact form.</p>
      <p>For information about tool inputs, browser storage and external services, read our <Link href="/privacy/" className="underline">Privacy Policy</Link>.</p>
    </div>
  </Container>;
}
