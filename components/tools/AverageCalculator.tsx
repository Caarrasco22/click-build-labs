'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function AverageCalculator() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const parseNumbers = (text: string): number[] => {
    return text
      .split(/[\s,\n]+/)
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));
  };

  const numbers = parseNumbers(input);
  const count = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = count > 0 ? sum / count : null;
  const min = count > 0 ? Math.min(...numbers) : null;
  const max = count > 0 ? Math.max(...numbers) : null;

  const hasInvalid = input.trim() !== '' && numbers.length === 0;

  const avgStr = avg !== null ? avg.toFixed(4).replace(/\.?0+$/, '') : '';
  const sumStr = sum.toFixed(4).replace(/\.?0+$/, '');

  const copyResult = async () => {
    if (avgStr) {
      await navigator.clipboard.writeText(`Average: ${avgStr}, Sum: ${sumStr}, Count: ${count}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Enter numbers (separated by commas, spaces, or new lines)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 10, 20, 30, 40, 50"
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg font-mono resize-none"
        />
      </div>

      {hasInvalid && (
        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-300">No valid numbers found. Please enter numeric values.</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setInput('')}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {avgStr && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {count > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Count</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{count}</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400">Average</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{avgStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">Sum</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{sumStr}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Min</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{min}</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Max</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{max}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}