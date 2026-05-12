'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function BatteryCapacityCalculator() {
  const [load, setLoad] = useState('');
  const [hours, setHours] = useState('');
  const [depthOfDischarge, setDepthOfDischarge] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [voltage, setVoltage] = useState('');
  const [copied, setCopied] = useState(false);

  const loadW = parseFloat(load);
  const h = parseFloat(hours);
  const dod = parseFloat(depthOfDischarge);
  const eff = parseFloat(efficiency);
  const v = parseFloat(voltage);

  const isValid = !isNaN(loadW) && loadW > 0 && !isNaN(h) && h > 0;
  const dodDecimal = !isNaN(dod) && dod > 0 && dod <= 100 ? dod / 100 : 1;
  const efficiencyDecimal = !isNaN(eff) && eff > 0 && eff <= 100 ? eff / 100 : 0.8;
  const requiredNominalWh = isValid ? (loadW * h) / (dodDecimal * efficiencyDecimal) : null;
  const requiredAh = requiredNominalWh !== null && !isNaN(v) && v > 0 ? requiredNominalWh / v : null;
  const usableWh = isValid ? loadW * h : null;

  const copyResult = async () => {
    if (requiredNominalWh !== null) {
      const text = requiredAh !== null
        ? `Required nominal capacity: ${requiredNominalWh.toFixed(1)} Wh (${requiredAh.toFixed(1)} Ah)`
        : `Required nominal capacity: ${requiredNominalWh.toFixed(1)} Wh`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => {
    setLoad('');
    setHours('');
    setDepthOfDischarge('');
    setEfficiency('');
    setVoltage('');
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Load (W)</label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            placeholder="100"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Desired runtime (hours)</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="10"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Depth of discharge (%), default 100%</label>
          <input
            type="number"
            value={depthOfDischarge}
            onChange={(e) => setDepthOfDischarge(e.target.value)}
            placeholder="100"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">System efficiency (%), default 80%</label>
          <input
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            placeholder="80"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">System voltage (V) - optional</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            placeholder="12"
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
        {requiredNominalWh !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {requiredNominalWh !== null && usableWh !== null && (
        <div className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
              <p className="text-sm text-green-600 dark:text-green-400">Required nominal capacity</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{requiredNominalWh.toFixed(1)} Wh</p>
            </div>
            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
              <p className="text-sm text-blue-600 dark:text-blue-400">Usable energy needed</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{usableWh.toFixed(1)} Wh</p>
            </div>
          </div>
          {requiredAh !== null && (
            <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20 text-center">
              <p className="text-sm text-purple-600 dark:text-purple-400">At {v}V system</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{requiredAh.toFixed(1)} Ah</p>
            </div>
          )}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Formula: required nominal Wh = load W x hours / (DoD x efficiency). Required Ah = Wh / system voltage.
          </p>
        </div>
      )}
    </div>
  );
}
