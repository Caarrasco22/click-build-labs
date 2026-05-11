'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

type Mode = 'toRoman' | 'toArabic';

export function RomanNumeralConverter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('toRoman');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const toRoman = (num: number): string => {
    if (num < 1 || num > 3999) return 'Out of range (1-3999)';
    const romanMap: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    for (const [value, symbol] of romanMap) {
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
    return result;
  };

  const toArabic = (roman: string): number => {
    const romanValues: Record<string, number> = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };
    let result = 0;
    let prev = 0;
    for (let i = roman.length - 1; i >= 0; i--) {
      const curr = romanValues[roman[i].toUpperCase()] || 0;
      if (curr < prev) {
        result -= curr;
      } else {
        result += curr;
      }
      prev = curr;
    }
    return result;
  };

  const convert = () => {
    setError('');
    setResult('');

    if (!input.trim()) return;

    if (mode === 'toRoman') {
      const num = parseInt(input);
      if (isNaN(num)) {
        setError('Please enter a valid number.');
        return;
      }
      if (num < 1 || num > 3999) {
        setError('Number must be between 1 and 3999.');
        return;
      }
      setResult(toRoman(num));
    } else {
      const arabic = toArabic(input);
      if (arabic === 0 && !input.match(/^[IVXLCDM]+$/i)) {
        setError('Invalid Roman numeral. Use I, V, X, L, C, D, M.');
        return;
      }
      setResult(String(arabic));
    }
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => { setMode('toRoman'); setResult(''); setError(''); }}
          className={`px-4 py-2 rounded-md font-medium ${mode === 'toRoman' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'}`}
        >
          Number → Roman
        </button>
        <button
          onClick={() => { setMode('toArabic'); setResult(''); setError(''); }}
          className={`px-4 py-2 rounded-md font-medium ${mode === 'toArabic' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'}`}
        >
          Roman → Number
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {mode === 'toRoman' ? 'Enter number (1-3999)' : 'Enter Roman numeral'}
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(''); setError(''); }}
          placeholder={mode === 'toRoman' ? 'e.g. 1987' : 'e.g. MCMLXXXVII'}
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-lg"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={convert}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Convert
        </button>
        <button
          onClick={() => { setInput(''); setResult(''); setError(''); }}
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
        <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">
            {mode === 'toRoman' ? 'Roman Numeral' : 'Arabic Number'}
          </p>
          <p className="text-4xl font-bold font-mono text-green-700 dark:text-green-300">{result}</p>
        </div>
      )}
    </div>
  );
}