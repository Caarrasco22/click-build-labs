'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function SortLines() {
  const [input, setInput] = useState('');
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    const lines = input.split('\n').filter(l => l.trim());
    lines.sort((a, b) => {
      const valA = ignoreCase ? a.toLowerCase() : a;
      const valB = ignoreCase ? b.toLowerCase() : b;
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    setResult(lines.join('\n'));
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lineCount = input.split('\n').filter(l => l.trim()).length;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter lines to sort..."
          rows={6}
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setDirection('asc')}
            className={`px-3 py-1.5 text-sm rounded-md ${direction === 'asc' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
          >
            A → Z
          </button>
          <button
            onClick={() => setDirection('desc')}
            className={`px-3 py-1.5 text-sm rounded-md ${direction === 'desc' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
          >
            Z → A
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="rounded"
          />
          Ignore case
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={process}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Sort Lines
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
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{lineCount} lines sorted</p>
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