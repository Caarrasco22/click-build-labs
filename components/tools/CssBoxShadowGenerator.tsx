'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function CssBoxShadowGenerator() {
  const [offsetX, setOffsetX] = useState('5');
  const [offsetY, setOffsetY] = useState('5');
  const [blur, setBlur] = useState('10');
  const [spread, setSpread] = useState('0');
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState('30');
  const [css, setCss] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const alpha = (parseInt(opacity) / 100).toFixed(2);
    const shadow = `${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${alpha})`;
    setCss(`box-shadow: ${shadow};`);
  };

  const hexToRgb = (hex: string) => {
    const clean = hex.replace('#', '');
    return `${parseInt(clean.substring(0, 2), 16)}, ${parseInt(clean.substring(2, 4), 16)}, ${parseInt(clean.substring(4, 6), 16)}`;
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Offset X</label>
          <input type="number" value={offsetX} onChange={(e) => setOffsetX(e.target.value)} className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Offset Y</label>
          <input type="number" value={offsetY} onChange={(e) => setOffsetY(e.target.value)} className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Blur</label>
          <input type="number" value={blur} onChange={(e) => setBlur(e.target.value)} className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Spread</label>
          <input type="number" value={spread} onChange={(e) => setSpread(e.target.value)} className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Color</label>
          <div className="flex gap-2">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Opacity (%)</label>
          <input type="number" value={opacity} onChange={(e) => setOpacity(e.target.value)} min="0" max="100" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
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
          onClick={() => { setOffsetX('5'); setOffsetY('5'); setBlur('10'); setSpread('0'); setColor('#000000'); setOpacity('30'); setCss(''); }}
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
              className="w-32 h-32 bg-white rounded-lg flex items-center justify-center text-zinc-400 text-xs"
              style={{ boxShadow: css.replace('box-shadow: ', '') }}
            >
              Preview
            </div>
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