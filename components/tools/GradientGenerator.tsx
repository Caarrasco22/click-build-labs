'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function GradientGenerator() {
  const [colorStart, setColorStart] = useState('#3B82F6');
  const [colorEnd, setColorEnd] = useState('#8B5CF6');
  const [direction, setDirection] = useState('to right');
  const [css, setCss] = useState('');
  const [copied, setCopied] = useState(false);

  const directions = [
    { value: 'to right', label: 'Left → Right' },
    { value: 'to left', label: 'Right → Left' },
    { value: 'to bottom', label: 'Top → Bottom' },
    { value: 'to top', label: 'Bottom → Top' },
    { value: 'to bottom right', label: 'TopLeft → BottomRight' },
    { value: 'to bottom left', label: 'TopRight → BottomLeft' },
    { value: 'to top right', label: 'BottomLeft → TopRight' },
    { value: 'to top left', label: 'BottomRight → TopLeft' },
  ];

  const generate = () => {
    const gradient = `linear-gradient(${direction}, ${colorStart}, ${colorEnd})`;
    setCss(gradient);
  };

  const copyResult = async () => {
    if (css) {
      await navigator.clipboard.writeText(`background: ${css};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Start Color</label>
          <div className="flex gap-2">
            <input type="color" value={colorStart} onChange={(e) => setColorStart(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <input type="text" value={colorStart} onChange={(e) => setColorStart(e.target.value)} className="flex-1 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">End Color</label>
          <div className="flex gap-2">
            <input type="color" value={colorEnd} onChange={(e) => setColorEnd(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <input type="text" value={colorEnd} onChange={(e) => setColorEnd(e.target.value)} className="flex-1 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Direction</label>
        <div className="flex flex-wrap gap-2">
          {directions.map(d => (
            <button
              key={d.value}
              onClick={() => setDirection(d.value)}
              className={`px-2 py-1 text-xs rounded-md ${direction === d.value ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={generate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Generate
        </button>
        <button
          onClick={() => { setColorStart('#3B82F6'); setColorEnd('#8B5CF6'); setCss(''); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Reset
        </button>
        {css && (
          <button
            onClick={copyResult}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        )}
      </div>

      {css && (
        <div className="space-y-4">
          <div
            className="w-full h-32 rounded-lg border border-zinc-200 dark:border-zinc-700"
            style={{ background: css }}
          />
          <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <p className="text-xs text-zinc-500 mb-1">CSS</p>
            <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">background: {css};</code>
          </div>
        </div>
      )}
    </div>
  );
}