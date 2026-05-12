'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function BatteryRuntimeCalculator() {
  const [capacity, setCapacity] = useState('');
  const [capacityUnit, setCapacityUnit] = useState<'Wh' | 'Ah'>('Wh');
  const [voltage, setVoltage] = useState('');
  const [load, setLoad] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [copied, setCopied] = useState(false);

  const cap = parseFloat(capacity);
  const v = parseFloat(voltage);
  const loadW = parseFloat(load);
  const eff = parseFloat(efficiency);

  let capacityWh: number | null = null;
  if (capacityUnit === 'Wh') {
    capacityWh = !isNaN(cap) && cap > 0 ? cap : null;
  } else {
    capacityWh = !isNaN(cap) && !isNaN(v) && cap > 0 && v > 0 ? cap * v : null;
  }

  const isValid = capacityWh !== null && !isNaN(loadW) && loadW > 0;
  const effDecimal = !isNaN(eff) && eff > 0 ? (100 - eff) / 100 : 1;
  let hours: number | null = null;
  if (isValid && capacityWh !== null) {
    hours = (capacityWh * effDecimal) / loadW;
  }

  const copyResult = async () => {
    if (hours !== null) {
      await navigator.clipboard.writeText(`${hours.toFixed(2)} hours`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setCapacity(''); setVoltage(''); setLoad(''); setEfficiency(''); };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only. Actual runtime varies with battery age, temperature, and discharge characteristics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Battery Capacity</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="100"
              className="flex-1 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
            />
            <select
              value={capacityUnit}
              onChange={(e) => setCapacityUnit(e.target.value as 'Wh' | 'Ah')}
              className="px-3 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            >
              <option value="Wh">Wh</option>
              <option value="Ah">Ah</option>
            </select>
          </div>
        </div>
        {capacityUnit === 'Ah' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">System Voltage (V)</label>
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="12"
              className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
            />
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Load (W)</label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            placeholder="50"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Efficiency (%), default 0%</label>
          <input
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            placeholder="0"
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
        {hours !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {hours !== null && (
        <div className="space-y-3">
          <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Estimated Runtime</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{hours.toFixed(2)} hours</p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Formula: Runtime = (Capacity × Efficiency) / Load
          </p>
        </div>
      )}
    </div>
  );
}