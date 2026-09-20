import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { createPageMetadata } from '@/lib/seo';
import { getAdSenseConfig } from '@/lib/adsense.mjs';
import { PrivacySettings } from '@/components/ads/PrivacySettings';

export const metadata: Metadata = createPageMetadata('Privacy Policy',
  'How Click & Build Labs handles tool inputs, browser preferences, hosting and advertising.', '/privacy');

export default function PrivacyPage() {
  const { enabled } = getAdSenseConfig();
  return (
    <Container className="py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Privacy Policy</h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: September 20, 2026</p>
      <div className="mt-8 space-y-6 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Tool inputs and results</h2>
          <p className="mt-2">The tools calculate, convert and format the text, numbers and files you provide in your browser. Their processing code does not upload these inputs or results to a server. Inputs are held in the page while you use it; copying or downloading a result saves it to your clipboard or device at your request. We do not provide account storage or a history of your tool inputs.</p>
          <p className="mt-2">This local processing is separate from the network requests needed to load the website and any advertising services described below. Following an external link opens another service. Avoid putting passwords, private tokens or other confidential information in public feedback.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Browser preferences</h2>
          <p className="mt-2">The theme selector saves your light, dark or system preference in localStorage under the key <code>theme</code>. This is persistent browser storage, not session storage, and remains until you change it or clear your site data. It is used for appearance, not advertising or audience measurement.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Hosting and external services</h2>
          <p className="mt-2">Cloudflare Pages hosts this website. Loading pages necessarily sends technical information such as your IP address, requested URL and browser headers to the hosting service so it can deliver and protect the site. This is different from uploading data entered into a tool. See <a className="underline" href="https://www.cloudflare.com/privacypolicy/">Cloudflare&apos;s privacy policy</a> for its handling of data.</p>
          <p className="mt-2">Links to the project and feedback pages open GitHub, where <a className="underline" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub&apos;s privacy statement</a> applies. GitHub issues are public. The fonts used by this site are served with the site&apos;s own assets.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Advertising and consent</h2>
          {enabled ? <>
            <p className="mt-2">This site loads Google AdSense and uses Google&apos;s consent management platform. Google and other advertising vendors may process IP addresses, browser or device information, and advertising interactions. Third-party vendors, including Google, use cookies to serve ads based on previous visits to this site or other websites. Google&apos;s advertising cookies allow it and its partners to personalize advertising based on those visits, subject to applicable consent choices.</p>
            <p className="mt-2">For visitors in the EEA, UK and Switzerland, the consent message provides options to consent, decline consent or manage purposes and vendors. The message identifies the configured advertising partners and links to their policies. You can revisit your choices below or through the footer. Non-personalized advertising can still involve cookies or other storage and does not remove consent requirements. Depending on your choices and Google&apos;s settings, ads may be limited or unavailable.</p>
            <p className="mt-2">Read <a className="underline" href="https://policies.google.com/technologies/partner-sites">how Google uses information from partner sites</a> and <a className="underline" href="https://policies.google.com/privacy">Google&apos;s privacy policy</a>. You can also manage personalized advertising in <a className="underline" href="https://myadcenter.google.com/">Google My Ad Center</a>; those account settings are separate from this site&apos;s consent choices.</p>
            <div className="mt-3"><PrivacySettings /></div>
          </> : <p className="mt-2">Google AdSense advertising and its consent message are not enabled in this version of the site. The website does not load advertising tags. If advertising is enabled in a later release, this section will explain the active service and the available consent controls.</p>}
        </section>
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Analytics</h2>
          <p className="mt-2">We use the traffic statistics available in the Cloudflare hosting dashboard to understand requests to this website. These statistics are separate from the inputs processed locally by the tools. The website code does not install Google Analytics or a separate analytics beacon. We will update this policy if we add another analytics service.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Email correspondence</h2>
          <p className="mt-2">If you contact us by email, we receive your email address, message and any attachments you choose to send so we can respond to your enquiry. This is separate from using the tools, which do not automatically email us your inputs. Our contact mailbox uses Gmail; see <a className="underline" href="https://policies.google.com/privacy">Google&apos;s privacy policy</a> for information about that service. Do not send passwords or unnecessary sensitive information.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">About the project and contact</h2>
          <p className="mt-2">Click &amp; Build Labs is maintained by Pablo Carrasco under the Click &amp; Build name. For privacy enquiries, email <a className="underline break-all" href="mailto:clickandbuild.info@gmail.com">clickandbuild.info@gmail.com</a>. Visit <Link className="underline" href="/contact/">Contact</Link> for other feedback options and <Link className="underline" href="/about/">About</Link> for more information.</p>
        </section>
      </div>
    </Container>
  );
}
