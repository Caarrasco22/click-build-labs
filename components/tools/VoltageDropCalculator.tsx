'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function VoltageDropCalculator() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [length, setLength] = useState('');
  const [wireArea, setWireArea] = useState('');
  const [material, setMaterial] = useState<'Cu' | 'Al'>('Cu');
  const [copied, setCopied] = useState(false);

  const V = parseFloat(voltage);
  const I = parseFloat(current);
  const L = parseFloat(length);
  const A = parseFloat(wireArea);

  const isValid = !isNaN(V) && V > 0 && !isNaN(I) && I > 0 && !isNaN(L) && L > 0 && !isNaN(A) && A > 0;
  const resistivity = material === 'Cu' ? 0.0168 : 0.0282;
  const drop = isValid ? (2 * resistivity * L * I) / A : null;
  const dropPercent = drop !== null ? (drop / V) * 100 : null;

  const copyResult = async () => {
    if (drop !== null && dropPercent !== null) {
      await navigator.clipboard.writeText(`Drop: ${drop.toFixed(3)} V (${dropPercent.toFixed(2)}%)`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setVoltage(''); setCurrent(''); setLength(''); setWireArea(''); };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice. Always follow local regulations and consult a qualified professional for real installations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Wire Cross-section (mm²)</label>
          <input
            type="number"
            value={wireArea}
            onChange={(e) => setWireArea(e.target.value)}
            placeholder="2.5"
            step="0.1"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Material</label>
        <div className="flex gap-2">
          <button
            onClick={() => setMaterial('Cu')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              material === 'Cu'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            Copper (Cu)
          </button>
          <button
            onClick={() => setMaterial('Al')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              material === 'Al'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            Aluminum (Al)
          </button>
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
        {drop !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {drop !== null && dropPercent !== null && (
        <div className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
              <p className="text-sm text-green-600 dark:text-green-400">Voltage Drop</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{drop.toFixed(3)} V</p>
            </div>
            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
              <p className="text-sm text-blue-600 dark:text-blue-400">Drop Percentage</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{dropPercent.toFixed(2)}%</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Formula: Vd = 2 × ρ × L × I / A | ρ(Cu)=0.0168, ρ(Al)=0.0282 Ω·mm²/m
          </p>
        </div>
      )}
    </div>
  );
}