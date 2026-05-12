'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function AspectRatioResizer() {
  const [ratio, setRatio] = useState<{ w: number; h: number }>({ w: 16, h: 9 });
  const [dimension, setDimension] = useState<'width' | 'height'>('width');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<{ width: number; height: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: '16:9', w: 16, h: 9 },
    { label: '4:3', w: 4, h: 3 },
    { label: '1:1', w: 1, h: 1 },
    { label: '9:16', w: 9, h: 16 },
    { label: '3:2', w: 3, h: 2 },
    { label: '21:9', w: 21, h: 9 },
  ];

  const calculate = () => {
    const val = parseFloat(value);
    if (isNaN(val) || val <= 0) return;
    if (dimension === 'width') {
      setResult({ width: val, height: Math.round(val * ratio.h / ratio.w) });
    } else {
      setResult({ width: Math.round(val * ratio.w / ratio.h), height: val });
    }
  };

  const applyPreset = (p: { w: number; h: number }) => {
    setRatio(p);
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(`${result.width} × ${result.height}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Aspect Ratio</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.label} onClick={() => applyPreset(p)} className={`px-3 py-1.5 text-sm rounded-md ${ratio.w === p.w && ratio.h === p.h ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Calculate</label>
          <select value={dimension} onChange={(e) => { setDimension(e.target.value as 'width' | 'height'); setResult(null); }} className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <option value="width">From Width</option>
            <option value="height">From Height</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{dimension === 'width' ? 'Width' : 'Height'}</label>
          <input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder={dimension === 'width' ? '1920' : '1080'} min="1" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={calculate} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium">
          Calculate
        </button>
        <button onClick={() => { setValue(''); setResult(null); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
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
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Result</p>
          <p className="text-3xl font-bold text-green-700 dark:text-green-300">{result.width} × {result.height}</p>
        </div>
      )}
    </div>
  );
}
