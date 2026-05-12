'use client';

import { useState } from 'react';
import { Clock, RefreshCw, Copy } from 'lucide-react';

export function UnixTimeNow() {
  const [timestamp, setTimestamp] = useState(() => {
    const now = Date.now();
    return { seconds: Math.floor(now / 1000), milliseconds: now };
  });
  const [localTime, setLocalTime] = useState(() => new Date().toLocaleString());
  const [utcTime, setUtcTime] = useState(() => new Date().toUTCString());

  const refresh = () => {
    const now = Date.now();
    setTimestamp({ seconds: Math.floor(now / 1000), milliseconds: now });
    setLocalTime(new Date().toLocaleString());
    setUtcTime(new Date().toUTCString());
  };

  const copySeconds = () => navigator.clipboard.writeText(String(timestamp.seconds));
  const copyMilliseconds = () => navigator.clipboard.writeText(String(timestamp.milliseconds));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Unix Timestamp (seconds)</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{timestamp.seconds}</p>
          <button onClick={copySeconds} className="mt-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Unix Timestamp (milliseconds)</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{timestamp.milliseconds}</p>
          <button onClick={copyMilliseconds} className="mt-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Local Time</p>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">{localTime}</p>
        </div>
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">UTC Time</p>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">{utcTime}</p>
        </div>
      </div>

      <button
        onClick={refresh}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <RefreshCw className="h-4 w-4 inline mr-2" />
        Refresh
      </button>
    </div>
  );
}
