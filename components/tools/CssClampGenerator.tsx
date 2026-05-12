'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

type Unit = 'px' | 'rem';

export function CssClampGenerator() {
  const [min, setMin] = useState('12');
  const [preferred, setPreferred] = useState('1vw');
  const [max, setMax] = useState('18');
  const [unit, setUnit] = useState<Unit>('rem');
  const [css, setCss] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const minVal = parseFloat(min);
    const maxVal = parseFloat(max);
    const preferredVal = parseFloat(preferred);

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(preferredVal)) {
      return;
    }

    let cssStr = '';
    if (unit === 'rem') {
      cssStr = `font-size: clamp(${minVal}rem, ${preferred}, ${maxVal}rem);`;
    } else {
      cssStr = `font-size: clamp(${minVal}px, ${preferred}, ${maxVal}px);`;
    }
    setCss(cssStr);
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
      <div className="flex gap-2">
        <button
          onClick={() => setUnit('px')}
          className={`px-3 py-1.5 text-sm rounded-md ${unit === 'px' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
        >
          px
        </button>
        <button
          onClick={() => setUnit('rem')}
          className={`px-3 py-1.5 text-sm rounded-md ${unit === 'rem' ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
        >
          rem
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Min ({unit})</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Preferred</label>
          <input
            type="text"
            value={preferred}
            onChange={(e) => setPreferred(e.target.value)}
            placeholder="1vw or 50%"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Max ({unit})</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
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
          onClick={() => { setMin('12'); setPreferred('1vw'); setMax('18'); setCss(''); }}
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
          <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Preview</p>
            <p style={{ fontSize: css.replace('font-size: ', '').replace(';', '') }} className="text-zinc-700 dark:text-zinc-300">
              This text uses clamp for responsive font sizing
            </p>
          </div>
          <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <p className="text-xs text-zinc-500 mb-1">CSS</p>
            <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{css}</code>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Example usage:</strong> Use this for fluid typography that scales with viewport width. The preferred value typically uses vw units.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}