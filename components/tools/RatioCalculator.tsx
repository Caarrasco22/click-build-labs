'use client';

import { useState } from 'react';
import { Divide, Copy } from 'lucide-react';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function RatioCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<{ ratio: string; decimal: number } | null>(null);

  const calculate = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB) || numB === 0) {
      setResult(null);
      return;
    }

    const intA = Math.round(numA * 100);
    const intB = Math.round(numB * 100);
    const divisor = gcd(intA, intB);
    const simplifiedA = intA / divisor;
    const simplifiedB = intB / divisor;

    setResult({
      ratio: `${simplifiedA}:${simplifiedB}`,
      decimal: numA / numB,
    });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`Ratio: ${result.ratio} (${result.decimal.toFixed(4)})`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Value A</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Value B</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Divide className="h-4 w-4 inline mr-2" />
        Simplify
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Simplified Ratio</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{result.ratio}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Decimal Value</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{result.decimal.toFixed(4)}</p>
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