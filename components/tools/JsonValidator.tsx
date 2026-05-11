'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function JsonValidator() {
  const [input, setInput] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = (value: string) => {
    if (!value.trim()) {
      setValid(null);
      setError('');
      return;
    }
    try {
      JSON.parse(value);
      setValid(true);
      setError('');
    } catch (err) {
      setValid(false);
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    validate(value);
  };

  const copyJson = async () => {
    if (valid) {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder='{"key": "value"}'
        className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
      />

      <div className="flex gap-2">
        <button onClick={() => { setInput(''); setValid(null); setError(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        {valid && (
          <button onClick={copyJson} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
            {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
        )}
      </div>

      {valid === true && (
        <div className="px-4 py-3 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">Valid JSON</p>
        </div>
      )}

      {valid === false && (
        <div className="px-4 py-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">Invalid JSON</p>
          <p className="text-sm text-red-600 dark:text-red-500 mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}
