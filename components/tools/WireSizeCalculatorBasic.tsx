'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

type CircuitType = 'two-conductor' | 'three-phase';

const WIRE_SIZES = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];

function getDrop(current: number, length: number, voltage: number, size: number, material: 'Cu' | 'Al', circuitType: CircuitType) {
  const resistivity = material === 'Cu' ? 0.0175 : 0.0282;
  const multiplier = circuitType === 'three-phase' ? Math.sqrt(3) : 2;
  const drop = (multiplier * resistivity * length * current) / size;
  return { drop, percent: (drop / voltage) * 100 };
}

function suggestWireSize(current: number, length: number, voltage: number, maxDropPercent: number, material: 'Cu' | 'Al', circuitType: CircuitType) {
  for (const size of WIRE_SIZES) {
    const result = getDrop(current, length, voltage, size, material, circuitType);
    if (result.percent <= maxDropPercent) return { size, ...result };
  }
  return null;
}

export function WireSizeCalculatorBasic() {
  const [current, setCurrent] = useState('');
  const [length, setLength] = useState('');
  const [voltage, setVoltage] = useState('');
  const [maxDrop, setMaxDrop] = useState('');
  const [material, setMaterial] = useState<'Cu' | 'Al'>('Cu');
  const [circuitType, setCircuitType] = useState<CircuitType>('two-conductor');
  const [copied, setCopied] = useState(false);

  const I = parseFloat(current);
  const L = parseFloat(length);
  const V = parseFloat(voltage);
  const maxD = parseFloat(maxDrop);

  const isValid = !isNaN(I) && I > 0 && !isNaN(L) && L > 0 && !isNaN(V) && V > 0 && !isNaN(maxD) && maxD > 0;
  const suggestion = isValid ? suggestWireSize(I, L, V, maxD, material, circuitType) : null;

  const copyResult = async () => {
    if (suggestion !== null) {
      await navigator.clipboard.writeText(`Estimated cable size: ${suggestion.size} mm2 | Drop: ${suggestion.drop.toFixed(3)} V (${suggestion.percent.toFixed(2)}%)`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => {
    setCurrent('');
    setLength('');
    setVoltage('');
    setMaxDrop('');
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Max voltage drop target (%)</label>
          <input
            type="number"
            value={maxDrop}
            onChange={(e) => setMaxDrop(e.target.value)}
            placeholder="3"
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
        {suggestion !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {suggestion !== null ? (
        <div className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
              <p className="text-sm text-green-600 dark:text-green-400">Nearest common cable size</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{suggestion.size} mm2</p>
            </div>
            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
              <p className="text-sm text-blue-600 dark:text-blue-400">Estimated drop</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{suggestion.drop.toFixed(3)} V</p>
            </div>
            <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20 text-center">
              <p className="text-sm text-purple-600 dark:text-purple-400">Drop percentage</p>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{suggestion.percent.toFixed(2)}%</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Estimated from voltage drop only. Verify ampacity, protection devices, installation method and local regulations separately.
            </p>
          </div>
        </div>
      ) : (
        isValid && (
          <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              No size in the compared list meets this voltage drop target. Review the target, voltage, current, length or cable range.
            </p>
          </div>
        )
      )}
    </div>
  );
}
