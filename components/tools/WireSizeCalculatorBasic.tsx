'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

const WIRE_SIZES = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];

function suggestWireSize(current: number, length: number, voltage: number, maxDropPercent: number): number | null {
  const resistivity = 0.0168;
  for (const size of WIRE_SIZES) {
    const drop = (2 * resistivity * length * current) / size;
    const percent = (drop / voltage) * 100;
    if (percent <= maxDropPercent) return size;
  }
  return null;
}

export function WireSizeCalculatorBasic() {
  const [current, setCurrent] = useState('');
  const [length, setLength] = useState('');
  const [voltage, setVoltage] = useState('');
  const [maxDrop, setMaxDrop] = useState('');
  const [copied, setCopied] = useState(false);

  const I = parseFloat(current);
  const L = parseFloat(length);
  const V = parseFloat(voltage);
  const maxD = parseFloat(maxDrop);

  const isValid = !isNaN(I) && I > 0 && !isNaN(L) && L > 0 && !isNaN(V) && V > 0 && !isNaN(maxD) && maxD > 0;
  const suggestedSize = isValid ? suggestWireSize(I, L, V, maxD) : null;

  const copyResult = async () => {
    if (suggestedSize !== null) {
      await navigator.clipboard.writeText(`${suggestedSize} mm²`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setCurrent(''); setLength(''); setVoltage(''); setMaxDrop(''); };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice. Always follow local regulations and consult a qualified professional for real installations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Current (A)</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="15"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">One-way Length (m)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="50"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Voltage (V)</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            placeholder="230"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Max Voltage Drop (%)</label>
          <input
            type="number"
            value={maxDrop}
            onChange={(e) => setMaxDrop(e.target.value)}
            placeholder="3"
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
        {suggestedSize !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {suggestedSize !== null && (
        <div className="space-y-3">
          <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Minimum Wire Size</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{suggestedSize} mm²</p>
          </div>
          <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Standard sizes available</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">{WIRE_SIZES.join(', ')} mm²</p>
          </div>
        </div>
      )}
    </div>
  );
}