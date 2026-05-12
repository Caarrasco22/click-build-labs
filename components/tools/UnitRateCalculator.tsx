'use client';

import { useState } from 'react';
import { Hash, Copy } from 'lucide-react';

export function UnitRateCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<{ rate: number; label: string } | null>(null);

  const calculate = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB) || numB === 0) {
      setResult(null);
      return;
    }
    setResult({ rate: numA / numB, label: `${numA} per ${numB}` });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`1 unit = ${result.rate.toFixed(4)} (${result.label})`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Quantity A</label>
          <input
            type="number"
            value={a}
            onChange={(e) => { setA(e.target.value); setResult(null); }}
            placeholder="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Quantity B</label>
          <input
            type="number"
            value={b}
            onChange={(e) => { setB(e.target.value); setResult(null); }}
            placeholder="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Example: 500 calories per 100g → enter 500 and 100
      </p>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Hash className="h-4 w-4 inline mr-2" />
        Calculate Unit Rate
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Rate per 1 Unit of B</p>
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{result.rate.toFixed(4)}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            ({result.label})
          </p>
          <button onClick={copyResult} className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}