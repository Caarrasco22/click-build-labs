'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function ExtractUrls() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const extract = () => {
    const urlRegex = /https?:\/\/[^\s<>"]+/g;
    const matches = input.match(urlRegex) || [];
    const unique = [...new Set(matches)];
    setResult(unique);
  };

  const copyResult = async () => {
    if (result.length > 0) {
      await navigator.clipboard.writeText(result.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text containing URLs..."
          rows={6}
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={extract}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Extract URLs
        </button>
        <button
          onClick={() => { setInput(''); setResult([]); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result.length > 0 && (
          <button
            onClick={copyResult}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Found {result.length} URL{result.length !== 1 ? 's' : ''}
          </p>
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 space-y-2">
            {result.map((url, i) => (
              <div key={i} className="p-2 bg-white dark:bg-zinc-800 rounded font-mono text-sm break-all">
                {url}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}