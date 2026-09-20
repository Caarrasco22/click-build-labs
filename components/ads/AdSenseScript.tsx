import Script from 'next/script';
import { getAdSenseConfig } from '@/lib/adsense.mjs';

// Only mounted in the root layout: next/script deduplicates across navigation.
export function AdSenseScript() {
  const { publisherId, enabled } = getAdSenseConfig();
  if (!enabled) return null;
  return <Script id="google-adsense" strategy="afterInteractive" async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
    crossOrigin="anonymous" />;
}
