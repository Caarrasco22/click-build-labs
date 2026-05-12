'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

type SolveMode = 'P' | 'V' | 'I';
type CircuitMode = 'dc' | 'single-phase' | 'three-phase';

function multiplier(circuitMode: CircuitMode, powerFactor: number) {
  if (circuitMode === 'three-phase') return Math.sqrt(3) * powerFactor;
  if (circuitMode === 'single-phase') return powerFactor;
  return 1;
}

export function PowerCurrentVoltageCalculator() {
  const [solveMode, setSolveMode] = useState<SolveMode>('P');
  const [circuitMode, setCircuitMode] = useState<CircuitMode>('dc');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [power, setPower] = useState('');
  const [powerFactor, setPowerFactor] = useState('');
  const [copied, setCopied] = useState(false);

  const V = parseFloat(voltage);
  const I = parseFloat(current);
  const P = parseFloat(power);
  const pfInput = parseFloat(powerFactor);
  const pf = circuitMode === 'dc' ? 1 : (!isNaN(pfInput) && pfInput > 0 && pfInput <= 1 ? pfInput : 1);
  const factor = multiplier(circuitMode, pf);

  let result = '';
  let formula = '';

  if (solveMode === 'P') {
    if (!isNaN(V) && !isNaN(I) && V > 0 && I > 0) {
      result = (V * I * factor).toFixed(3);
      formula = circuitMode === 'dc'
        ? `P = V x I = ${V} x ${I} = ${result} W`
        : circuitMode === 'single-phase'
          ? `P = V x I x PF = ${V} x ${I} x ${pf} = ${result} W`
          : `P = sqrt(3) x V x I x PF = sqrt(3) x ${V} x ${I} x ${pf} = ${result} W`;
    }
  } else if (solveMode === 'V') {
    if (!isNaN(P) && !isNaN(I) && P > 0 && I > 0 && factor > 0) {
      result = (P / (I * factor)).toFixed(3);
      formula = circuitMode === 'dc'
        ? `V = P / I = ${P} / ${I} = ${result} V`
        : `V = P / (I x factor) = ${result} V`;
    }
  } else {
    if (!isNaN(P) && !isNaN(V) && P > 0 && V > 0 && factor > 0) {
      result = (P / (V * factor)).toFixed(3);
      formula = circuitMode === 'dc'
        ? `I = P / V = ${P} / ${V} = ${result} A`
        : `I = P / (V x factor) = ${result} A`;
    }
  }

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => {
    setVoltage('');
    setCurrent('');
    setPower('');
    setPowerFactor('');
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice. Always follow local regulations and consult a qualified professional for real installations.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['P', 'V', 'I'] as SolveMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => { setSolveMode(mode); clear(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              solveMode === mode
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            Calculate {mode === 'P' ? 'active power (W)' : mode === 'V' ? 'voltage (V)' : 'current (A)'}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Circuit model</label>
        <select
          value={circuitMode}
          onChange={(e) => setCircuitMode(e.target.value as CircuitMode)}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
        >
          <option value="dc">DC / simple resistive load: P = V x I</option>
          <option value="single-phase">AC single-phase: P = V x I x PF</option>
          <option value="three-phase">AC three-phase: P = sqrt(3) x V x I x PF</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Voltage (V)</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            placeholder="12"
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Active power (W)</label>
          <input
            type="number"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            placeholder="120"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        {circuitMode !== 'dc' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Power factor, default 1</label>
            <input
              type="number"
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              placeholder="0.9"
              step="0.01"
              min="0.01"
              max="1"
              className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
            />
          </div>
        )}
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
              {solveMode === 'P' ? 'Active power' : solveMode === 'V' ? 'Voltage' : 'Current'}
            </p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">
              {result} {solveMode === 'P' ? 'W' : solveMode === 'V' ? 'V' : 'A'}
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
