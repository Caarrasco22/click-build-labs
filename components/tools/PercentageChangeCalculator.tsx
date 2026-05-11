'use client';

import { useState } from 'react';
import { Percent, Copy } from 'lucide-react';

export function PercentageChangeCalculator() {
  const [initial, setInitial] = useState('');
  const [final, setFinal] = useState('');
  const [result, setResult] = useState<{ absolute: number; percentage: number; isIncrease: boolean } | null>(null);

  const calculate = () => {
    const init = parseFloat(initial);
    const fin = parseFloat(final);
    if (isNaN(init) || isNaN(fin) || init === 0) {
      setResult(null);
      return;
    }
    const absolute = fin - init;
    const percentage = (absolute / init) * 100;
    setResult({ absolute, percentage, isIncrease: absolute >= 0 });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`Change: ${result.percentage.toFixed(2)}% (${result.absolute.toFixed(2)})`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Initial Value</label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Final Value</label>
          <input
            type="number"
            value={final}
            onChange={(e) => setFinal(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Percent className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Absolute Change</p>
              <p className={`text-2xl font-semibold ${result.isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {result.isIncrease ? '+' : ''}{result.absolute.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Percentage Change</p>
              <p className={`text-2xl font-semibold ${result.isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {result.isIncrease ? '+' : ''}{result.percentage.toFixed(2)}%
              </p>
            </div>
          </div>
          <button onClick={copyResult} className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}