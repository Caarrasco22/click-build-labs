'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function BorderRadiusGenerator() {
  const [all, setAll] = useState('8');
  const [topLeft, setTopLeft] = useState('');
  const [topRight, setTopRight] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [css, setCss] = useState('');
  const [copied, setCopied] = useState(false);
  const [unlinked, setUnlinked] = useState(false);

  const generate = () => {
    const tl = unlinked && topLeft ? topLeft : all;
    const tr = unlinked && topRight ? topRight : all;
    const br = unlinked && bottomRight ? bottomRight : all;
    const bl = unlinked && bottomLeft ? bottomLeft : all;
    setCss(`border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`);
  };

  const copyResult = async () => {
    if (css) {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="unlinked"
          checked={unlinked}
          onChange={(e) => setUnlinked(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="unlinked" className="text-sm text-zinc-600 dark:text-zinc-400">
          Set each corner separately
        </label>
      </div>

      {unlinked ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Top Left</label>
            <input type="number" value={topLeft} onChange={(e) => setTopLeft(e.target.value)} placeholder={all} min="0" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Top Right</label>
            <input type="number" value={topRight} onChange={(e) => setTopRight(e.target.value)} placeholder={all} min="0" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bottom Right</label>
            <input type="number" value={bottomRight} onChange={(e) => setBottomRight(e.target.value)} placeholder={all} min="0" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bottom Left</label>
            <input type="number" value={bottomLeft} onChange={(e) => setBottomLeft(e.target.value)} placeholder={all} min="0" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">All Corners (px)</label>
          <input type="number" value={all} onChange={(e) => setAll(e.target.value)} min="0" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={generate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Generate
        </button>
        <button
          onClick={() => { setAll('8'); setTopLeft(''); setTopRight(''); setBottomRight(''); setBottomLeft(''); setCss(''); }}
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
          <div className="p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <div
              className="w-32 h-32 bg-blue-500"
              style={{ borderRadius: css.replace('border-radius: ', '').replace(';', '') }}
            />
          </div>
          <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <p className="text-xs text-zinc-500 mb-1">CSS</p>
            <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{css}</code>
          </div>
        </div>
      )}
    </div>
  );
}