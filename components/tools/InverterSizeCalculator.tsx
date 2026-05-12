'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertTriangle } from 'lucide-react';

export function InverterSizeCalculator() {
  const [totalLoad, setTotalLoad] = useState('');
  const [margin, setMargin] = useState('');
  const [copied, setCopied] = useState(false);

  const tl = parseFloat(totalLoad);
  const m = parseFloat(margin);
  const isValid = !isNaN(tl) && tl > 0;
  const marginDecimal = !isNaN(m) && m > 0 ? 1 + m / 100 : 1.25;
  const recommended = isValid ? tl * marginDecimal : null;

  const copyResult = async () => {
    if (recommended !== null) {
      await navigator.clipboard.writeText(`${recommended.toFixed(0)} W`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setTotalLoad(''); setMargin(''); };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice. Always follow local regulations and consult a qualified professional for real installations.
        </p>
      </div>

      <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 flex gap-2 items-start">
        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
        <p className="text-xs text-yellow-700 dark:text-yellow-300">
          Motors and compressors can need 3–7× their rated power at startup. Consider this when sizing your inverter.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Total Load (W)</label>
          <input
            type="number"
            value={totalLoad}
            onChange={(e) => setTotalLoad(e.target.value)}
            placeholder="2000"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Safety Margin (%), default 25%</label>
          <input
            type="number"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            placeholder="25"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={clear}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {recommended !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {recommended !== null && (
        <div className="space-y-3">
          <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Recommended Inverter Size</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{recommended.toFixed(0)} W</p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Formula: Recommended = Total Load × (1 + Margin%)
          </p>
        </div>
      )}
    </div>
  );
}