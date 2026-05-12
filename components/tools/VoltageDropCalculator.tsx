'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

type CircuitType = 'two-conductor' | 'three-phase';

function voltageDrop(current: number, length: number, area: number, material: 'Cu' | 'Al', circuitType: CircuitType): number {
  const resistivity = material === 'Cu' ? 0.0175 : 0.0282;
  const multiplier = circuitType === 'three-phase' ? Math.sqrt(3) : 2;
  return (multiplier * resistivity * length * current) / area;
}

export function VoltageDropCalculator() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [length, setLength] = useState('');
  const [wireArea, setWireArea] = useState('');
  const [material, setMaterial] = useState<'Cu' | 'Al'>('Cu');
  const [circuitType, setCircuitType] = useState<CircuitType>('two-conductor');
  const [copied, setCopied] = useState(false);

  const V = parseFloat(voltage);
  const I = parseFloat(current);
  const L = parseFloat(length);
  const A = parseFloat(wireArea);

  const isValid = !isNaN(V) && V > 0 && !isNaN(I) && I > 0 && !isNaN(L) && L > 0 && !isNaN(A) && A > 0;
  const drop = isValid ? voltageDrop(I, L, A, material, circuitType) : null;
  const dropPercent = drop !== null ? (drop / V) * 100 : null;
  const voltageAtLoad = drop !== null ? V - drop : null;
  const highDrop = dropPercent !== null && dropPercent > 5;

  const copyResult = async () => {
    if (drop !== null && dropPercent !== null && voltageAtLoad !== null) {
      await navigator.clipboard.writeText(`Drop: ${drop.toFixed(3)} V (${dropPercent.toFixed(2)}%) | Voltage at load: ${voltageAtLoad.toFixed(3)} V`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => {
    setVoltage('');
    setCurrent('');
    setLength('');
    setWireArea('');
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice. Always follow local regulations and consult a qualified professional for real installations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">System voltage (V)</label>
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">One-way cable length (m)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="20"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Conductor cross-section (mm2)</label>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Conductor material</label>
          <div className="flex gap-2">
            <button
              onClick={() => setMaterial('Cu')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                material === 'Cu'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              Copper
            </button>
            <button
              onClick={() => setMaterial('Al')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                material === 'Al'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              Aluminum
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Circuit type</label>
          <select
            value={circuitType}
            onChange={(e) => setCircuitType(e.target.value as CircuitType)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="two-conductor">DC / single-phase two-conductor</option>
            <option value="three-phase">Three-phase AC basic approximation</option>
          </select>
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

      {drop !== null && dropPercent !== null && voltageAtLoad !== null && (
        <div className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
              <p className="text-sm text-green-600 dark:text-green-400">Voltage drop</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{drop.toFixed(3)} V</p>
            </div>
            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
              <p className="text-sm text-blue-600 dark:text-blue-400">Drop percentage</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{dropPercent.toFixed(2)}%</p>
            </div>
            <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20 text-center">
              <p className="text-sm text-purple-600 dark:text-purple-400">Voltage at load</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{voltageAtLoad.toFixed(3)} V</p>
            </div>
          </div>
          {highDrop && (
            <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This voltage drop is high for many installations. Review cable length, current, conductor size and project requirements.
              </p>
            </div>
          )}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Formulas: two-conductor Vd = 2 x rho x L x I / A. Three-phase Vd = sqrt(3) x rho x L x I / A. Ignores temperature, reactance and installation method.
          </p>
        </div>
      )}
    </div>
  );
}
