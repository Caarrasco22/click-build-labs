'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, ArrowUpDown } from 'lucide-react';

type AreaUnit = 'm2' | 'cm2' | 'km2' | 'ft2' | 'yd2' | 'ac' | 'ha';

const UNITS: { value: AreaUnit; label: string; factor: number }[] = [
  { value: 'm2', label: 'Square Meters (m²)', factor: 1 },
  { value: 'cm2', label: 'Square Centimeters (cm²)', factor: 0.0001 },
  { value: 'km2', label: 'Square Kilometers (km²)', factor: 1000000 },
  { value: 'ft2', label: 'Square Feet (ft²)', factor: 0.092903 },
  { value: 'yd2', label: 'Square Yards (yd²)', factor: 0.836127 },
  { value: 'ac', label: 'Acres (ac)', factor: 4046.86 },
  { value: 'ha', label: 'Hectares (ha)', factor: 10000 },
];

export function AreaConverter() {
  const [input, setInput] = useState('');
  const [fromUnit, setFromUnit] = useState<AreaUnit>('m2');
  const [toUnit, setToUnit] = useState<AreaUnit>('ft2');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    const value = parseFloat(input);
    if (isNaN(value)) return null;
    const from = UNITS.find((u) => u.value === fromUnit)?.factor || 1;
    const to = UNITS.find((u) => u.value === toUnit)?.factor || 1;
    return (value * from) / to;
  };

  const result = convert();
  const resultStr = result !== null ? result.toFixed(6).replace(/\.?0+$/, '') : '';

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
            onChange={(e) => setFromUnit(e.target.value as AreaUnit)}
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
            onChange={(e) => setToUnit(e.target.value as AreaUnit)}
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