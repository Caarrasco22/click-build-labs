'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function RuleOfThreeCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [copied, setCopied] = useState(false);

  const aVal = parseFloat(a);
  const bVal = parseFloat(b);
  const cVal = parseFloat(c);
  const isValid = !isNaN(aVal) && !isNaN(bVal) && !isNaN(cVal) && aVal !== 0;

  const x = isValid ? (bVal * cVal) / aVal : null;
  const xStr = x !== null ? x.toFixed(4).replace(/\.?0+$/, '') : '';

  const copyResult = async () => {
    if (xStr) {
      await navigator.clipboard.writeText(xStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
        <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
          A is to B as C is to <span className="font-bold text-zinc-900 dark:text-zinc-100">X</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">A</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="A"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg text-center"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">B</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="B"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg text-center"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">C</label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="C"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg text-center"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setA(''); setB(''); setC(''); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {xStr && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {x !== null && (
        <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-2">X = (B × C) ÷ A</p>
          <p className="text-4xl font-bold text-green-700 dark:text-green-300">X = {xStr}</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            {c} is to {b} as {xStr} is to {a}
          </p>
        </div>
      )}
    </div>
  );
}