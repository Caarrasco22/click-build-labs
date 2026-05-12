'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function SolarPanelOutputCalculator() {
  const [panelPower, setPanelPower] = useState('');
  const [numPanels, setNumPanels] = useState('');
  const [peakHours, setPeakHours] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [copied, setCopied] = useState(false);

  const pp = parseFloat(panelPower);
  const np = parseInt(numPanels);
  const ph = parseFloat(peakHours);
  const eff = parseFloat(efficiency);

  const isValid = !isNaN(pp) && pp > 0 && !isNaN(np) && np > 0 && !isNaN(ph) && ph > 0;
  const effDecimal = !isNaN(eff) && eff >= 0 ? (100 - eff) / 100 : 0.85;

  const dailykWh = isValid ? (pp * np * ph * effDecimal) / 1000 : null;
  const monthlykWh = dailykWh !== null ? dailykWh * 30 : null;

  const outputBlock = dailykWh !== null && monthlykWh !== null ? (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
        <p className="text-sm text-green-600 dark:text-green-400">Daily Output</p>
        <p className="text-3xl font-bold text-green-700 dark:text-green-300">{dailykWh.toFixed(2)} kWh</p>
      </div>
      <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
        <p className="text-sm text-blue-600 dark:text-blue-400">Monthly Output (×30)</p>
        <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{monthlykWh.toFixed(2)} kWh</p>
      </div>
    </div>
  ) : null;

  const copyResult = async () => {
    if (dailykWh !== null && monthlykWh !== null) {
      await navigator.clipboard.writeText(`Daily: ${dailykWh.toFixed(2)} kWh | Monthly: ${monthlykWh.toFixed(2)} kWh`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => { setPanelPower(''); setNumPanels(''); setPeakHours(''); setEfficiency(''); };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice. Actual output depends on location, orientation, shadows, weather, and installation quality.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Panel Power (W)</label>
          <input
            type="number"
            value={panelPower}
            onChange={(e) => setPanelPower(e.target.value)}
            placeholder="400"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Number of Panels</label>
          <input
            type="number"
            value={numPanels}
            onChange={(e) => setNumPanels(e.target.value)}
            placeholder="10"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Peak Sun Hours</label>
          <input
            type="number"
            value={peakHours}
            onChange={(e) => setPeakHours(e.target.value)}
            placeholder="5"
            step="0.1"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Losses/Efficiency (%), default 15%</label>
          <input
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            placeholder="15"
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
{dailykWh !== null && monthlykWh !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {outputBlock}
    </div>
  );
}