'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function PercentageErrorCalculator() {
  const [experimental, setExperimental] = useState('');
  const [theoretical, setTheoretical] = useState('');
  const [result, setResult] = useState<{ absoluteError: number; percentError: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const exp = parseFloat(experimental);
    const theo = parseFloat(theoretical);

    if (isNaN(exp) || isNaN(theo)) {
      setResult(null);
      return;
    }

    if (theo === 0) {
      setResult(null);
      return;
    }

    const absoluteError = Math.abs(exp - theo);
    const percentError = (absoluteError / Math.abs(theo)) * 100;

    setResult({
      absoluteError: Math.round(absoluteError * 1000) / 1000,
      percentError: Math.round(percentError * 1000) / 1000
    });
  };

  const copyResult = async () => {
    if (result) {
      const text = `Absolute Error: ${result.absoluteError}, Percent Error: ${result.percentError}%`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Experimental Value</label>
          <input
            type="number"
            value={experimental}
            onChange={(e) => { setExperimental(e.target.value); setResult(null); }}
            placeholder="e.g. 9.8"
            step="any"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Theoretical Value</label>
          <input
            type="number"
            value={theoretical}
            onChange={(e) => { setTheoretical(e.target.value); setResult(null); }}
            placeholder="e.g. 10"
            step="any"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Calculate
        </button>
        <button
          onClick={() => { setExperimental(''); setTheoretical(''); setResult(null); }}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Absolute Error</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.absoluteError}</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Percent Error</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{result.percentError}%</p>
          </div>
        </div>
      )}

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        <p><strong>Percent Error</strong> = |Experimental - Theoretical| / |Theoretical| × 100%</p>
        <p>Commonly used in physics and chemistry experiments to compare measured vs accepted values.</p>
      </div>
    </div>
  );
}