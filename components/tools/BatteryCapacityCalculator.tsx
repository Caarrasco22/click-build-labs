'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function BatteryCapacityCalculator() {
  const [load, setLoad] = useState('');
  const [hours, setHours] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [voltage, setVoltage] = useState('');
  const [copied, setCopied] = useState(false);

  const loadW = parseFloat(load);
  const h = parseFloat(hours);
  const eff = parseFloat(efficiency);
  const v = parseFloat(voltage);

  const isValid = !isNaN(loadW) && loadW > 0 && !isNaN(h) && h > 0;
  const effDecimal = !isNaN(eff) && eff > 0 ? 1 + eff / 100 : 1.2;
  const capacityWh = isValid ? loadW * h * effDecimal : null;
  const capacityAh = capacityWh !== null && !isNaN(v) && v > 0 ? capacityWh / v : null;

  const copyResult = async () => {
    if (capacityWh !== null) {
      const text = capacityAh !== null
        ? `Capacity: ${capacityWh.toFixed(2)} Wh (${capacityAh.toFixed(2)} Ah)`
        : `Capacity: ${capacityWh.toFixed(2)} Wh`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setLoad(''); setHours(''); setEfficiency(''); setVoltage(''); };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice. Always follow local regulations and consult a qualified professional for real installations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Load (W)</label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            placeholder="200"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Desired Hours</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="8"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Losses (%), default 20%</label>
          <input
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            placeholder="20"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">System Voltage (V) — optional</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            placeholder="12"
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
        {capacityWh !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {capacityWh !== null && (
        <div className="space-y-3">
          <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Required Capacity</p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300">{capacityWh.toFixed(2)} Wh</p>
          </div>
          {capacityAh !== null && (
            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">At {v}V System</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{capacityAh.toFixed(2)} Ah</p>
            </div>
          )}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Formula: Capacity = Load × Hours × (1 + Losses%)
          </p>
        </div>
      )}
    </div>
  );
}