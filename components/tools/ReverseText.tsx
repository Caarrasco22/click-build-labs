'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function ReverseText() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'full' | 'lines' | 'both'>('full');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    if (mode === 'full') {
      setResult(input.split('').reverse().join(''));
    } else if (mode === 'lines') {
      setResult(input.split('\n').reverse().join('\n'));
    } else {
      setResult(input.split('\n').map(line => line.split('').reverse().join('')).reverse().join('\n'));
    }
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
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
          placeholder="Enter text to reverse..."
          rows={6}
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode('full')}
          className={`px-3 py-1.5 text-sm rounded-md ${mode === 'full' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
        >
          Reverse all
        </button>
        <button
          onClick={() => setMode('lines')}
          className={`px-3 py-1.5 text-sm rounded-md ${mode === 'lines' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
        >
          Reverse line order
        </button>
        <button
          onClick={() => setMode('both')}
          className={`px-3 py-1.5 text-sm rounded-md ${mode === 'both' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
        >
          Reverse chars + line order
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={process}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Reverse
        </button>
        <button
          onClick={() => { setInput(''); setResult(''); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result && (
          <button
            onClick={copyResult}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="space-y-2">
          <textarea
            value={result}
            readOnly
            rows={6}
            className="w-full px-3 py-2 rounded-md border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 font-mono text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}