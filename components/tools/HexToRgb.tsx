'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

export function HexToRgb() {
  const [hex, setHex] = useState('');
  const [alpha, setAlpha] = useState('1');
  const [result, setResult] = useState<{ r: number; g: number; b: number; a: number } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError('');
    setResult(null);

    let cleanHex = hex.replace('#', '').trim();

    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex) && !/^[0-9A-Fa-f]{3}$/.test(hex.replace('#', '').trim())) {
      if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
        setError('Invalid HEX color. Use 3 or 6 digit hex format (e.g., FF5500 or F50).');
        return;
      }
    }

    if (cleanHex.length !== 6) {
      setError('Invalid HEX color. Use 3 or 6 digit format.');
      return;
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const a = parseFloat(alpha);

    setResult({ r, g, b, a: isNaN(a) ? 1 : Math.min(1, Math.max(0, a)) });
  };

  const copyResult = async () => {
    if (result) {
      const text = alpha !== '1' && alpha !== ''
        ? `rgba(${result.r}, ${result.g}, ${result.b}, ${result.a})`
        : `rgb(${result.r}, ${result.g}, ${result.b})`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const previewColor = result ? `rgba(${result.r}, ${result.g}, ${result.b}, ${result.a})` : 'transparent';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">HEX Color</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => { setHex(e.target.value); setResult(null); setError(''); }}
            placeholder="#FF5500 or FF5500"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Alpha (0-1)</label>
          <input
            type="text"
            value={alpha}
            onChange={(e) => setAlpha(e.target.value)}
            placeholder="1"
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
          onClick={() => { setHex(''); setAlpha('1'); setResult(null); setError(''); }}
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
          {previewColor && (
            <div
              className="w-full h-24 rounded-lg border border-zinc-200 dark:border-zinc-700"
              style={{ backgroundColor: previewColor }}
            />
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-xs text-zinc-500 mb-1">RGB</p>
              <p className="text-lg font-mono font-bold">rgb({result.r}, {result.g}, {result.b})</p>
            </div>
            {alpha !== '1' && alpha !== '' && (
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
                <p className="text-xs text-zinc-500 mb-1">RGBA</p>
                <p className="text-lg font-mono font-bold">rgba({result.r}, {result.g}, {result.b}, {result.a})</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}