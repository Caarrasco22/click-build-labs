'use client';

import { useState } from 'react';

declare global {
  interface Window {
    googlefc?: {
      callbackQueue: Array<(() => void) | Record<string, () => void>>;
      showRevocationMessage?: () => void;
    };
  }
}

export function PrivacySettings() {
  const [unavailable, setUnavailable] = useState(false);
  const reopen = () => {
    const cmp = window.googlefc;
    if (!cmp?.showRevocationMessage) {
      setUnavailable(true);
      return;
    }
    setUnavailable(false);
    cmp.callbackQueue.push(cmp.showRevocationMessage);
  };
  return <div>
    <button type="button" onClick={reopen}
      className="text-sm text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
      Privacy and cookie settings
    </button>
    {unavailable && <p role="status" className="mt-2 max-w-sm text-xs text-zinc-500">
      Privacy settings are unavailable. Reload the page and try again. The consent message may not apply in your region or may be blocked by your browser.
    </p>}
  </div>;
}
