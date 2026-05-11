'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface ParsedUrl {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  queryParams: Record<string, string>;
}

function parseUrl(urlString: string): ParsedUrl | null {
  try {
    const url = new URL(urlString);
    const queryParams: Record<string, string> = {};
    url.searchParams.forEach((value, key) => { queryParams[key] = value; });
    return {
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      queryParams,
    };
  } catch {
    return null;
  }
}

export function UrlParser() {
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<ParsedUrl | null>(null);
  const [error, setError] = useState('');

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!value.trim()) {
      setParsed(null);
      setError('');
      return;
    }
    const result = parseUrl(value);
    if (result) {
      setParsed(result);
      setError('');
    } else {
      setParsed(null);
      setError('Invalid URL. Please enter a valid URL including protocol (e.g., https://)');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">URL Input</label>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="https://example.com/path?key=value#section"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setInput(''); setParsed(null); setError(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {parsed && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Protocol', value: parsed.protocol },
              { label: 'Hostname', value: parsed.hostname },
              { label: 'Port', value: parsed.port || '(default)' },
              { label: 'Pathname', value: parsed.pathname },
              { label: 'Search', value: parsed.search || '(none)' },
              { label: 'Hash', value: parsed.hash || '(none)' },
            ].map(({ label, value }) => (
              <div key={label} className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <p className="text-xs text-zinc-500 mb-1">{label}</p>
                <p className="text-sm font-mono text-zinc-900 dark:text-zinc-100 break-all">{value}</p>
              </div>
            ))}
          </div>

          {Object.keys(parsed.queryParams).length > 0 && (
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Query Parameters</p>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                {Object.entries(parsed.queryParams).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                    <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400">{key}</span>
                    <span className="text-sm font-mono text-zinc-900 dark:text-zinc-100">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
