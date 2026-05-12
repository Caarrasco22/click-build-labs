'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

type LedMode = 'items' | 'strip';

export function LEDPowerCalculator() {
  const [mode, setMode] = useState<LedMode>('items');
  const [count, setCount] = useState('');
  const [powerPerItem, setPowerPerItem] = useState('');
  const [length, setLength] = useState('');
  const [wattsPerMeter, setWattsPerMeter] = useState('');
  const [hours, setHours] = useState('');
  const [price, setPrice] = useState('');
  const [copied, setCopied] = useState(false);

  const itemCount = parseFloat(count);
  const itemPower = parseFloat(powerPerItem);
  const stripLength = parseFloat(length);
  const stripPower = parseFloat(wattsPerMeter);
  const h = parseFloat(hours);
  const pr = parseFloat(price);

  const itemWatts = mode === 'items' && !isNaN(itemCount) && itemCount > 0 && !isNaN(itemPower) && itemPower > 0
    ? itemCount * itemPower
    : null;
  const stripWatts = mode === 'strip' && !isNaN(stripLength) && stripLength > 0 && !isNaN(stripPower) && stripPower > 0
    ? stripLength * stripPower
    : null;
  const totalWatts = mode === 'items' ? itemWatts : stripWatts;
  const dailykWh = totalWatts !== null && !isNaN(h) && h > 0 ? (totalWatts * h) / 1000 : null;
  const cost = dailykWh !== null && !isNaN(pr) && pr >= 0 ? dailykWh * pr : null;

  const copyResult = async () => {
    if (dailykWh !== null && totalWatts !== null) {
      const text = cost !== null
        ? `Total: ${totalWatts.toFixed(1)} W | Daily: ${dailykWh.toFixed(4)} kWh | Est. cost: $${cost.toFixed(4)}/day`
        : `Total: ${totalWatts.toFixed(1)} W | Daily: ${dailykWh.toFixed(4)} kWh`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => {
    setCount('');
    setPowerPerItem('');
    setLength('');
    setWattsPerMeter('');
    setHours('');
    setPrice('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setMode('items'); clear(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'items'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
          }`}
        >
          LEDs / bulbs / modules
        </button>
        <button
          onClick={() => { setMode('strip'); clear(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'strip'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
          }`}
        >
          LED strip by length
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mode === 'items' ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Number of LEDs / bulbs / modules</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="20"
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Power per item (W)</label>
              <input
                type="number"
                value={powerPerItem}
                onChange={(e) => setPowerPerItem(e.target.value)}
                placeholder="0.5"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Strip length (m)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="5"
                step="0.1"
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Power per meter (W/m)</label>
              <input
                type="number"
                value={wattsPerMeter}
                onChange={(e) => setWattsPerMeter(e.target.value)}
                placeholder="14.4"
                step="0.1"
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
              />
            </div>
          </>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hours per day</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="8"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Price per kWh ($) - optional</label>
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
        {dailykWh !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {dailykWh !== null && totalWatts !== null && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">Total power</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalWatts.toFixed(1)} W</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400">Daily energy estimate</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{dailykWh.toFixed(4)} kWh</p>
          </div>
          {cost !== null && (
            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-center">
              <p className="text-sm text-amber-600 dark:text-amber-400">Estimated daily cost</p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">${cost.toFixed(4)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
