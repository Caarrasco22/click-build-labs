'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

type CalcMode = 'percent-of' | 'what-percent' | 'change';

export function PercentageCalculator() {
  const [mode, setMode] = useState<CalcMode>('percent-of');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) return null;

    switch (mode) {
      case 'percent-of':
        return ((n1 / 100) * n2).toFixed(2);
      case 'what-percent':
        return n2 === 0 ? 'Error' : ((n1 / n2) * 100).toFixed(2) + '%';
      case 'change':
        return n2 === 0 ? 'Error' : (((n1 - n2) / n2) * 100).toFixed(2) + '%';
    }
  };

  const result = calculate();

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5">
        {[
          { key: 'percent-of', label: 'X% of Y' },
          { key: 'what-percent', label: 'X is what % of Y' },
          { key: 'change', label: 'Change %' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setMode(key as CalcMode); setNum1(''); setNum2(''); }}
            className={`flex-1 px-3 py-2 text-sm rounded-md transition-all ${mode === key ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900' : 'text-zinc-600'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {mode === 'percent-of' ? 'Percentage' : mode === 'what-percent' ? 'Value' : 'Old Value'}
          </label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {mode === 'percent-of' ? 'Total' : mode === 'what-percent' ? 'Total' : 'New Value'}
          </label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setNum1(''); setNum2(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        {result && result !== 'Error' && (
          <button onClick={copyResult} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
            {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="px-4 py-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{result}</p>
        </div>
      )}
    </div>
  );
}
