'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function LEDPowerCalculator() {
  const [numLEDs, setNumLEDs] = useState('');
  const [powerPerLED, setPowerPerLED] = useState('');
  const [hours, setHours] = useState('');
  const [price, setPrice] = useState('');
  const [copied, setCopied] = useState(false);

  const n = parseFloat(numLEDs);
  const p = parseFloat(powerPerLED);
  const h = parseFloat(hours);
  const pr = parseFloat(price);

  const isValid = !isNaN(n) && n > 0 && !isNaN(p) && p > 0 && !isNaN(h) && h > 0;
  const totalWatts = isValid ? n * p : null;
  const dailykWh = totalWatts !== null ? (totalWatts * h) / 1000 : null;
  const cost = dailykWh !== null && !isNaN(pr) && pr >= 0 ? dailykWh * pr : null;

  const copyResult = async () => {
    if (dailykWh !== null) {
      const text = cost !== null
        ? `Total: ${totalWatts?.toFixed(1)}W | Daily: ${dailykWh?.toFixed(4)} kWh | Est. cost: $${cost.toFixed(4)}/day`
        : `Total: ${totalWatts?.toFixed(1)}W | Daily: ${dailykWh?.toFixed(4)} kWh`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setNumLEDs(''); setPowerPerLED(''); setHours(''); setPrice(''); };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Number of LEDs / Strips</label>
          <input
            type="number"
            value={numLEDs}
            onChange={(e) => setNumLEDs(e.target.value)}
            placeholder="20"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Power per LED/Strip (W)</label>
          <input
            type="number"
            value={powerPerLED}
            onChange={(e) => setPowerPerLED(e.target.value)}
            placeholder="0.5"
            step="0.01"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hours per Day</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="8"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Price per kWh ($) — optional</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.12"
            step="0.01"
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
        {totalWatts !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {totalWatts !== null && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">Total Power</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalWatts.toFixed(1)} W</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400">Daily Consumption</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{dailykWh?.toFixed(4)} kWh</p>
          </div>
          {cost !== null && (
            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-center">
              <p className="text-sm text-amber-600 dark:text-amber-400">Est. Daily Cost</p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">${cost.toFixed(4)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}