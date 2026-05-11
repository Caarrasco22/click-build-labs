'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, ArrowUpDown } from 'lucide-react';

type FuelUnit = 'l100km' | 'kml' | 'mpgus' | 'mpguk';

const UNITS: { value: FuelUnit; label: string; type: string }[] = [
  { value: 'l100km', label: 'Liters/100km (L/100km)', type: 'consumption' },
  { value: 'kml', label: 'Kilometers/Liter (km/L)', type: 'efficiency' },
  { value: 'mpgus', label: 'MPG US (miles/gallon US)', type: 'efficiency' },
  { value: 'mpguk', label: 'MPG UK (miles/gallon UK)', type: 'efficiency' },
];

function convert(value: number, from: FuelUnit, to: FuelUnit): number | null {
  if (isNaN(value) || value <= 0) return null;
  if (from === to) return value;

  if (from === 'l100km' && to === 'kml') {
    return 100 / value;
  }
  if (from === 'l100km' && to === 'mpgus') {
    const kml = 100 / value;
    return kml * 2.352145;
  }
  if (from === 'l100km' && to === 'mpguk') {
    const kml = 100 / value;
    return kml * 2.824817;
  }

  if (from === 'kml' && to === 'l100km') {
    return 100 / value;
  }
  if (from === 'kml' && to === 'mpgus') {
    return value * 2.352145;
  }
  if (from === 'kml' && to === 'mpguk') {
    return value * 2.824817;
  }

  if (from === 'mpgus' && to === 'l100km') {
    const kml = value / 2.352145;
    return 100 / kml;
  }
  if (from === 'mpgus' && to === 'kml') {
    return value / 2.352145;
  }
  if (from === 'mpgus' && to === 'mpguk') {
    return value * 0.832674;
  }

  if (from === 'mpguk' && to === 'l100km') {
    const kml = value / 2.824817;
    return 100 / kml;
  }
  if (from === 'mpguk' && to === 'kml') {
    return value / 2.824817;
  }
  if (from === 'mpguk' && to === 'mpgus') {
    return value * 1.20095;
  }

  return null;
}

export function FuelConsumptionConverter() {
  const [input, setInput] = useState('');
  const [fromUnit, setFromUnit] = useState<FuelUnit>('l100km');
  const [toUnit, setToUnit] = useState<FuelUnit>('mpgus');
  const [copied, setCopied] = useState(false);

  const result = convert(parseFloat(input), fromUnit, toUnit);
  const resultStr = result !== null ? result.toFixed(2) : '';

  const copyResult = async () => {
    if (resultStr) {
      await navigator.clipboard.writeText(resultStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> L/100km is consumption (lower is better). km/L and MPG are efficiency (higher is better).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">From</label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as FuelUnit)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">To</label>
          <input
            type="text"
            value={resultStr}
            readOnly
            placeholder="Result"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-lg text-zinc-900 dark:text-zinc-100"
          />
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as FuelUnit)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={swap}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <ArrowUpDown className="h-4 w-4 inline mr-1" />
          Swap
        </button>
        <button
          onClick={() => { setInput(''); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {resultStr && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  );
}