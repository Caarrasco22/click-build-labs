'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function PrimeNumberChecker() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ isPrime: boolean; divisors: number[] } | null>(null);
  const [copied, setCopied] = useState(false);

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const getDivisors = (n: number): number[] => {
    const divs: number[] = [];
    for (let i = 2; i <= n / 2; i++) {
      if (n % i === 0) divs.push(i);
    }
    return divs;
  };

  const check = () => {
    const n = parseInt(number);
    if (isNaN(n)) {
      setResult(null);
      return;
    }

    const prime = isPrime(n);
    const divisors = prime ? [] : getDivisors(n);
    setResult({ isPrime: prime, divisors });
  };

  const copyResult = async () => {
    if (result) {
      const text = result.isPrime
        ? `${number} is a prime number.`
        : `${number} is not a prime number. Divisors: ${result.divisors.join(', ')}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Enter a Number</label>
        <input
          type="number"
          value={number}
          onChange={(e) => { setNumber(e.target.value); setResult(null); }}
          placeholder="e.g. 17"
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={check}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Check
        </button>
        <button
          onClick={() => { setNumber(''); setResult(null); }}
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
        <div className={`p-6 rounded-lg border ${result.isPrime ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20' : 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20'} text-center`}>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{number}</p>
          <p className={`text-xl font-bold mt-2 ${result.isPrime ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}`}>
            {result.isPrime ? 'Is a Prime Number' : 'Is NOT a Prime Number'}
          </p>
          {!result.isPrime && result.divisors.length > 0 && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Divisors: {result.divisors.join(', ')}
            </p>
          )}
          {!result.isPrime && parseInt(number) <= 1 && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Numbers less than 2 are not prime by definition.
            </p>
          )}
        </div>
      )}

      <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        <p>A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.</p>
      </div>
    </div>
  );
}