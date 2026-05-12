'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

type Mode = 'P' | 'V' | 'I';

export function PowerCurrentVoltageCalculator() {
  const [mode, setMode] = useState<Mode>('P');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [power, setPower] = useState('');
  const [copied, setCopied] = useState(false);

  const V = parseFloat(voltage);
  const I = parseFloat(current);
  const P = parseFloat(power);

  let result = '';
  let formula = '';

  if (mode === 'P') {
    if (!isNaN(V) && !isNaN(I) && V > 0 && I > 0) {
      result = (V * I).toFixed(3);
      formula = `P = V × I = ${V} × ${I} = ${result} W`;
    }
  } else if (mode === 'V') {
    if (!isNaN(P) && !isNaN(I) && P > 0 && I > 0) {
      result = (P / I).toFixed(3);
      formula = `V = P / I = ${P} / ${I} = ${result} V`;
    }
  } else {
    if (!isNaN(P) && !isNaN(V) && P > 0 && V > 0) {
      result = (P / V).toFixed(3);
      formula = `I = P / V = ${P} / ${V} = ${result} A`;
    }
  }

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setVoltage(''); setCurrent(''); setPower(''); };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['P', 'V', 'I'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); clear(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            Calculate {m === 'P' ? 'Power (W)' : m === 'V' ? 'Voltage (V)' : 'Current (A)'}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
            placeholder="10"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Power (W)</label>
          <input
            type="number"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            placeholder="2300"
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
        {result && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="space-y-3">
          <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">
              {mode === 'P' ? 'Power' : mode === 'V' ? 'Voltage' : 'Current'}
            </p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">
              {result} {mode === 'P' ? 'W' : mode === 'V' ? 'V' : 'A'}
            </p>
          </div>
          {formula && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center font-mono bg-zinc-50 dark:bg-zinc-900 p-2 rounded">
              {formula}
            </p>
          )}
        </div>
      )}
    </div>
  );
}