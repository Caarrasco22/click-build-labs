'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function SolarSystemSizeCalculator() {
  const [dailyNeed, setDailyNeed] = useState('');
  const [peakHours, setPeakHours] = useState('');
  const [losses, setLosses] = useState('');
  const [panelPower, setPanelPower] = useState('');
  const [copied, setCopied] = useState(false);

  const dn = parseFloat(dailyNeed);
  const ph = parseFloat(peakHours);
  const lossPercent = parseFloat(losses);
  const pp = parseFloat(panelPower);

  const isValid = !isNaN(dn) && dn > 0 && !isNaN(ph) && ph > 0;
  const usableFactor = !isNaN(lossPercent) && lossPercent >= 0 && lossPercent < 100 ? (100 - lossPercent) / 100 : 0.8;

  const requiredkW = isValid ? dn / (ph * usableFactor) : null;
  const numPanels = requiredkW !== null && !isNaN(pp) && pp > 0 ? Math.ceil((requiredkW * 1000) / pp) : null;
  const dailyProduction = requiredkW !== null ? requiredkW * ph * usableFactor : null;
  const monthlyProduction = dailyProduction !== null ? dailyProduction * 30 : null;

  const copyResult = async () => {
    if (requiredkW !== null) {
      const text = numPanels !== null
        ? `PV array estimate: ${requiredkW.toFixed(2)} kW | ${numPanels} panels of ${pp}W | Daily: ${dailyProduction?.toFixed(2)} kWh`
        : `PV array estimate: ${requiredkW.toFixed(2)} kW | Daily: ${dailyProduction?.toFixed(2)} kWh`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => {
    setDailyNeed('');
    setPeakHours('');
    setLosses('');
    setPanelPower('');
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Daily energy use (kWh)</label>
          <input
            type="number"
            value={dailyNeed}
            onChange={(e) => setDailyNeed(e.target.value)}
            placeholder="25"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Peak sun hours</label>
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">System losses (%), default 20%</label>
          <input
            type="number"
            value={losses}
            onChange={(e) => setLosses(e.target.value)}
            placeholder="20"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Panel wattage (W) - optional</label>
          <input
            type="number"
            value={panelPower}
            onChange={(e) => setPanelPower(e.target.value)}
            placeholder="400"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Does not account for shading, orientation, local weather, inverter clipping, regulations or detailed system design.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={clear}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {requiredkW !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {requiredkW !== null && dailyProduction !== null && monthlyProduction !== null && (
        <div className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
              <p className="text-sm text-green-600 dark:text-green-400">Required PV array size</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{requiredkW.toFixed(2)} kW</p>
            </div>
            {numPanels !== null && (
              <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400">Estimated panel count</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{numPanels}</p>
              </div>
            )}
            <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20 text-center">
              <p className="text-sm text-purple-600 dark:text-purple-400">Daily production estimate</p>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{dailyProduction.toFixed(2)} kWh</p>
            </div>
            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-center">
              <p className="text-sm text-amber-600 dark:text-amber-400">Monthly estimate (30 days)</p>
              <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{monthlyProduction.toFixed(1)} kWh</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Formula: PV kW = daily kWh / (peak sun hours x (1 - losses)).
          </p>
        </div>
      )}
    </div>
  );
}
