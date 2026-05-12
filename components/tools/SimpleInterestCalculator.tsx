'use client';

import { useState } from 'react';
import { Calculator, Copy } from 'lucide-react';

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);
    if (isNaN(p) || isNaN(r) || isNaN(t) || r < 0 || t < 0) {
      setResult(null);
      return;
    }
    const interest = p * (r / 100) * t;
    setResult({ interest, total: p + interest });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`Interest: $${result.interest.toFixed(2)}, Total: $${result.total.toFixed(2)}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Principal ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => { setPrincipal(e.target.value); setResult(null); }}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Rate (% per year)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => { setRate(e.target.value); setResult(null); }}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Time (years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => { setYears(e.target.value); setResult(null); }}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Calculator className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Interest Earned</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">${result.interest.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">${result.total.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={copyResult} className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-3">
        Results are estimates for informational purposes only and are not financial advice.
      </p>
    </div>
  );
}