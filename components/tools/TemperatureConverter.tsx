'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, ArrowUpDown } from 'lucide-react';

type TempUnit = 'c' | 'f' | 'k';

const UNITS: { value: TempUnit; label: string }[] = [
  { value: 'c', label: 'Celsius (C)' },
  { value: 'f', label: 'Fahrenheit (F)' },
  { value: 'k', label: 'Kelvin (K)' },
];

function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

function celsiusToKelvin(c: number): number {
  return c + 273.15;
}

function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

function kelvinToCelsius(k: number): number {
  return k - 273.15;
}

function convert(value: number, from: TempUnit, to: TempUnit): number | null {
  if (isNaN(value)) return null;
  if (from === 'k' && value < 0) return null;

  let celsius: number;
  switch (from) {
    case 'c': celsius = value; break;
    case 'f': celsius = fahrenheitToCelsius(value); break;
    case 'k': celsius = kelvinToCelsius(value); break;
  }

  switch (to) {
    case 'c': return celsius;
    case 'f': return celsiusToFahrenheit(celsius);
    case 'k': {
      const kelvin = celsiusToKelvin(celsius);
      return kelvin < 0 ? null : kelvin;
    }
  }
}

export function TemperatureConverter() {
  const [input, setInput] = useState('');
  const [fromUnit, setFromUnit] = useState<TempUnit>('c');
  const [toUnit, setToUnit] = useState<TempUnit>('f');
  const [copied, setCopied] = useState(false);

  const result = convert(parseFloat(input), fromUnit, toUnit);
  const resultStr = result !== null ? result.toFixed(2) : '';
  const showAbsoluteZeroError = input.trim() !== '' && result === null;

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
            onChange={(e) => setFromUnit(e.target.value as TempUnit)}
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
            onChange={(e) => setToUnit(e.target.value as TempUnit)}
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

      {showAbsoluteZeroError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300">
            Temperature cannot be below absolute zero.
          </p>
        </div>
      )}
    </div>
  );
}
