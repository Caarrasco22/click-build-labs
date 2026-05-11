'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function JsonMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const minify = (value: string) => {
    if (!value.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const parsed = JSON.parse(value);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    minify(value);
  };

  const copyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder='{"key": "value", "nested": {"a": 1}}'
        className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
      />

      <div className="flex gap-2">
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        {output && (
          <button onClick={copyOutput} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
            {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {output && !error && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Minified Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-24 px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm font-mono resize-none"
          />
        </div>
      )}
    </div>
  );
}
