'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

export function RgbToHex() {
  const [r, setR] = useState('');
  const [g, setG] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const toHex = (n: number): string => {
    const clamped = Math.min(255, Math.max(0, Math.round(n)));
    return clamped.toString(16).padStart(2, '0').toUpperCase();
  };

  const convert = () => {
    setError('');
    setResult(null);

    const rVal = parseInt(r);
    const gVal = parseInt(g);
    const bVal = parseInt(b);

    if (isNaN(rVal) || isNaN(gVal) || isNaN(bVal)) {
      setError('Please enter valid numbers for R, G, and B.');
      return;
    }

    if (rVal < 0 || rVal > 255 || gVal < 0 || gVal > 255 || bVal < 0 || bVal > 255) {
      setError('RGB values must be between 0 and 255.');
      return;
    }

    setResult(`#${toHex(rVal)}${toHex(gVal)}${toHex(bVal)}`);
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const previewColor = result || 'transparent';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">R (0-255)</label>
          <input
            type="number"
            value={r}
            onChange={(e) => { setR(e.target.value); setResult(null); setError(''); }}
            placeholder="255"
            min="0"
            max="255"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">G (0-255)</label>
          <input
            type="number"
            value={g}
            onChange={(e) => { setG(e.target.value); setResult(null); setError(''); }}
            placeholder="0"
            min="0"
            max="255"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">B (0-255)</label>
          <input
            type="number"
            value={b}
            onChange={(e) => { setB(e.target.value); setResult(null); setError(''); }}
            placeholder="0"
            min="0"
            max="255"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
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
          onClick={() => { setR(''); setG(''); setB(''); setResult(null); setError(''); }}
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
        <div className="space-y-4">
          <div
            className="w-full h-24 rounded-lg border border-zinc-200 dark:border-zinc-700"
            style={{ backgroundColor: result }}
          />
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">HEX Color</p>
            <p className="text-3xl font-bold font-mono text-green-700 dark:text-green-300">{result}</p>
          </div>
        </div>
      )}
    </div>
  );
}