'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, ArrowUpDown } from 'lucide-react';

type StorageUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'KiB' | 'MiB' | 'GiB' | 'TiB';

const UNITS: { value: StorageUnit; label: string; factor: number; binary?: boolean }[] = [
  { value: 'B', label: 'Bytes (B)', factor: 1 },
  { value: 'KB', label: 'Kilobytes (KB)', factor: 1000, binary: false },
  { value: 'MB', label: 'Megabytes (MB)', factor: 1000000, binary: false },
  { value: 'GB', label: 'Gigabytes (GB)', factor: 1000000000, binary: false },
  { value: 'TB', label: 'Terabytes (TB)', factor: 1000000000000, binary: false },
  { value: 'KiB', label: 'Kibibytes (KiB)', factor: 1024, binary: true },
  { value: 'MiB', label: 'Mebibytes (MiB)', factor: 1048576, binary: true },
  { value: 'GiB', label: 'Gibibytes (GiB)', factor: 1073741824, binary: true },
  { value: 'TiB', label: 'Tebibytes (TiB)', factor: 1099511627776, binary: true },
];

export function DataStorageConverter() {
  const [input, setInput] = useState('');
  const [fromUnit, setFromUnit] = useState<StorageUnit>('GB');
  const [toUnit, setToUnit] = useState<StorageUnit>('MB');
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

  const fromIsBinary = UNITS.find((u) => u.value === fromUnit)?.binary;
  const toIsBinary = UNITS.find((u) => u.value === toUnit)?.binary;
  const showNote = fromIsBinary !== toIsBinary;

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> KB/MB/GB use decimal (1000-based). KiB/MiB/GiB use binary (1024-based).
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
            onChange={(e) => setFromUnit(e.target.value as StorageUnit)}
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
            onChange={(e) => setToUnit(e.target.value as StorageUnit)}
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