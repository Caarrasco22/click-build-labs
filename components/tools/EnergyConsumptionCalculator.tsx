'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function EnergyConsumptionCalculator() {
  const [power, setPower] = useState('');
  const [unit, setUnit] = useState<'W' | 'kW'>('W');
  const [hours, setHours] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [copied, setCopied] = useState(false);

  const p = parseFloat(power);
  const h = parseFloat(hours);
  const d = parseFloat(days);
  const pr = parseFloat(price);

  const powerInkW = unit === 'W' ? p / 1000 : p;
  const isValid = !isNaN(p) && p > 0 && !isNaN(h) && h > 0 && !isNaN(d) && d > 0;

  const dailykWh = isValid ? powerInkW * h : null;
  const totalkWh = dailykWh !== null ? dailykWh * d : null;
  const cost = totalkWh !== null && !isNaN(pr) && pr >= 0 ? totalkWh * pr : null;

  const copyResult = async () => {
    if (totalkWh !== null) {
      const text = cost !== null
        ? `Daily: ${dailykWh?.toFixed(3)} kWh | Total (${d} days): ${totalkWh?.toFixed(3)} kWh | Est. Cost: $${cost.toFixed(2)}`
        : `Daily: ${dailykWh?.toFixed(3)} kWh | Total (${d} days): ${totalkWh?.toFixed(3)} kWh`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setPower(''); setHours(''); setDays(''); setPrice(''); };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only. Actual consumption varies by device efficiency and usage patterns.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Power</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              placeholder="1500"
              className="flex-1 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'W' | 'kW')}
              className="px-3 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            >
              <option value="W">W</option>
              <option value="kW">kW</option>
            </select>
          </div>
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Days of Use</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="30"
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
        {totalkWh !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {totalkWh !== null && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">Daily Consumption</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{dailykWh?.toFixed(3)} kWh</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400">Total ({d} days)</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{totalkWh.toFixed(3)} kWh</p>
          </div>
          {cost !== null && (
            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-center">
              <p className="text-sm text-amber-600 dark:text-amber-400">Est. Cost</p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">${cost.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}