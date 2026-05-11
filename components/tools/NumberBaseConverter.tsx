'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function NumberBaseConverter() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState<2 | 8 | 10 | 16>(10);
  const [toBase, setToBase] = useState<2 | 8 | 10 | 16>(2);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const bases = [
    { value: 2, label: 'Binary (2)' },
    { value: 8, label: 'Octal (8)' },
    { value: 10, label: 'Decimal (10)' },
    { value: 16, label: 'Hexadecimal (16)' },
  ] as const;

  const digits = '0123456789ABCDEF';

  const isValidInput = (value: string, base: number): boolean => {
    const validChars = digits.slice(0, base);
    return value.split('').every(c => validChars.includes(c.toUpperCase()));
  };

  const convert = () => {
    if (!input.trim()) {
      setResult('');
      setError('');
      return;
    }

    if (!isValidInput(input.trim(), fromBase)) {
      setError(`Invalid number for base ${fromBase}. Use digits 0-${digits[fromBase - 1]}.`);
      setResult('');
      return;
    }

    try {
      const decimal = parseInt(input.trim(), fromBase);
      if (isNaN(decimal)) {
        setError('Invalid input');
        setResult('');
        return;
      }
      const converted = decimal.toString(toBase).toUpperCase();
      setResult(converted);
      setError('');
    } catch {
      setError('Conversion error');
      setResult('');
    }
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const swap = () => {
    const temp = fromBase;
    setFromBase(toBase);
    setToBase(temp);
    setInput(result);
    setResult('');
    setError('');
  };

  const setFrom = (base: 2 | 8 | 10 | 16) => {
    setFromBase(base);
    setError('');
    setResult('');
  };

  const setTo = (base: 2 | 8 | 10 | 16) => {
    setToBase(base);
    setError('');
    setResult('');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">From</label>
          <select
            value={fromBase}
            onChange={(e) => setFrom(parseInt(e.target.value) as 2 | 8 | 10 | 16)}
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          >
            {bases.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">To</label>
          <select
            value={toBase}
            onChange={(e) => setTo(parseInt(e.target.value) as 2 | 8 | 10 | 16)}
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          >
            {bases.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Number ({fromBase === 16 ? '0-9, A-F' : fromBase === 10 ? '0-9' : `0-${fromBase - 1}`})</label>
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(''); setResult(''); }}
          placeholder={`Enter ${fromBase}-based number`}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-lg"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={swap}
          className="px-3 py-1.5 text-sm rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
        >
          Swap
        </button>
        <button
          onClick={convert}
          className="px-4 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Convert
        </button>
        <button
          onClick={() => { setInput(''); setResult(''); setError(''); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">
            Result (Base {toBase})
          </p>
          <p className="text-3xl font-bold font-mono text-green-700 dark:text-green-300 break-all">
            {result}
          </p>
          <p className="text-sm text-green-600/70 dark:text-green-400/70 mt-2">
            Decimal: {parseInt(input.trim() || '0', fromBase)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center">
          <p className="text-xs text-zinc-500 mb-1">Input Base</p>
          <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">{fromBase}</p>
        </div>
        <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center">
          <p className="text-xs text-zinc-500 mb-1">Output Base</p>
          <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">{toBase}</p>
        </div>
      </div>
    </div>
  );
}