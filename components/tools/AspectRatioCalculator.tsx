'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function AspectRatioCalculator() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ ratio: string; w: number; h: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: '16:9', w: 16, h: 9 },
    { label: '4:3', w: 4, h: 3 },
    { label: '1:1', w: 1, h: 1 },
    { label: '9:16', w: 9, h: 16 },
    { label: '3:2', w: 3, h: 2 },
    { label: '21:9', w: 21, h: 9 },
  ];

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const calculate = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;
    const g = gcd(w, h);
    setResult({
      ratio: `${w / g}:${h / g}`,
      w,
      h
    });
  };

  const applyPreset = (p: { w: number; h: number }) => {
    setWidth(String(p.w));
    setHeight(String(p.h));
    setResult({ ratio: `${p.w}:${p.h}`, w: p.w, h: p.h });
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.ratio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Width</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="1920" min="1" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Height</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="1080" min="1" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={calculate} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium">
          Calculate Ratio
        </button>
        <button onClick={() => { setWidth(''); setHeight(''); setResult(null); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result && (
          <button onClick={copyResult} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Aspect Ratio</p>
          <p className="text-4xl font-bold text-green-700 dark:text-green-300">{result.ratio}</p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Common Presets</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.label} onClick={() => applyPreset(p)} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}