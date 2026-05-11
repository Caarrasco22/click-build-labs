'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function MultiplicationTableGenerator() {
  const [base, setBase] = useState('');
  const [from, setFrom] = useState('1');
  const [to, setTo] = useState('10');
  const [result, setResult] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const b = parseFloat(base);
    const start = parseInt(from);
    const end = parseInt(to);

    if (isNaN(b) || isNaN(start) || isNaN(end)) {
      setResult([]);
      return;
    }

    if (start > end) {
      setResult([]);
      return;
    }

    const table: string[] = [];
    for (let i = start; i <= end; i++) {
      table.push(`${b} × ${i} = ${b * i}`);
    }
    setResult(table);
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
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Base Number</label>
          <input
            type="number"
            value={base}
            onChange={(e) => { setBase(e.target.value); setResult([]); }}
            placeholder="e.g. 7"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">From</label>
          <input
            type="number"
            value={from}
            onChange={(e) => { setFrom(e.target.value); setResult([]); }}
            placeholder="1"
            min="0"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">To</label>
          <input
            type="number"
            value={to}
            onChange={(e) => { setTo(e.target.value); setResult([]); }}
            placeholder="10"
            min="0"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={generate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Generate
        </button>
        <button
          onClick={() => { setBase(''); setFrom('1'); setTo('10'); setResult([]); }}
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
        <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-3">
            Multiplication Table for {base}
          </p>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {result.map((row, i) => (
              <div key={i} className="p-2 bg-white dark:bg-zinc-800 rounded text-center font-mono text-sm">
                {row}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}