'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function RandomColorGenerator() {
  const [color, setColor] = useState({ hex: '#3B82F6', r: 59, g: 130, b: 246 });
  const [copied, setCopied] = useState('');

  const generate = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0').toUpperCase()).join('');
    setColor({ hex, r, g, b });
  };

  const copyHex = async () => {
    await navigator.clipboard.writeText(color.hex);
    setCopied('hex');
    setTimeout(() => setCopied(''), 2000);
  };

  const copyRgb = async () => {
    await navigator.clipboard.writeText(`rgb(${color.r}, ${color.g}, ${color.b})`);
    setCopied('rgb');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={generate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Generate Random Color
        </button>
        <button
          onClick={() => generate()}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          New
        </button>
      </div>

      <div className="w-full h-32 rounded-lg border border-zinc-200 dark:border-zinc-700" style={{ backgroundColor: color.hex }} />

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-xs text-zinc-500 mb-1">HEX</p>
          <p className="text-xl font-bold font-mono">{color.hex}</p>
          <button
            onClick={copyHex}
            className="mt-2 px-3 py-1 text-xs rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied === 'hex' ? <Check className="h-3 w-3 inline mr-1" /> : <Copy className="h-3 w-3 inline mr-1" />}
            {copied === 'hex' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-xs text-zinc-500 mb-1">RGB</p>
          <p className="text-lg font-bold font-mono">rgb({color.r}, {color.g}, {color.b})</p>
          <button
            onClick={copyRgb}
            className="mt-2 px-3 py-1 text-xs rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied === 'rgb' ? <Check className="h-3 w-3 inline mr-1" /> : <Copy className="h-3 w-3 inline mr-1" />}
            {copied === 'rgb' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}