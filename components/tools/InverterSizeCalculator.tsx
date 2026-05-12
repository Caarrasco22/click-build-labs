'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertTriangle } from 'lucide-react';

type UseCase = 'backup' | 'hybrid' | 'gridTie' | 'vfd';
type BatteryVoltage = '12' | '24' | '48';

const USE_CASE_LABELS: Record<UseCase, string> = {
  backup: 'Off-grid / backup inverter',
  hybrid: 'Solar hybrid inverter',
  gridTie: 'Grid-tie solar inverter',
  vfd: 'Motor / VFD note only',
};

export function InverterSizeCalculator() {
  const [useCase, setUseCase] = useState<UseCase>('backup');
  const [continuousLoad, setContinuousLoad] = useState('');
  const [surgeLoad, setSurgeLoad] = useState('');
  const [margin, setMargin] = useState('');
  const [batteryVoltage, setBatteryVoltage] = useState<BatteryVoltage>('24');
  const [efficiency, setEfficiency] = useState('');
  const [powerFactor, setPowerFactor] = useState('');
  const [copied, setCopied] = useState(false);

  const loadW = parseFloat(continuousLoad);
  const surgeW = parseFloat(surgeLoad);
  const marginPercent = parseFloat(margin);
  const efficiencyPercent = parseFloat(efficiency);
  const pf = parseFloat(powerFactor);
  const voltage = parseFloat(batteryVoltage);

  const isSizingMode = useCase !== 'vfd';
  const isValidLoad = isSizingMode && !isNaN(loadW) && loadW > 0;
  const marginDecimal = !isNaN(marginPercent) && marginPercent >= 0 ? 1 + marginPercent / 100 : 1.25;
  const efficiencyDecimal = !isNaN(efficiencyPercent) && efficiencyPercent > 0 && efficiencyPercent <= 100 ? efficiencyPercent / 100 : 0.9;
  const validPowerFactor = !isNaN(pf) && pf > 0 && pf <= 1 ? pf : null;

  const recommendedContinuous = isValidLoad ? loadW * marginDecimal : null;
  const estimatedVa = recommendedContinuous !== null && validPowerFactor !== null ? recommendedContinuous / validPowerFactor : null;
  const recommendedSurge = !isNaN(surgeW) && surgeW > 0 && recommendedContinuous !== null
    ? Math.max(surgeW, recommendedContinuous)
    : null;
  const dcCurrent = isValidLoad && useCase !== 'gridTie' ? loadW / (voltage * efficiencyDecimal) : null;
  const highCurrentWarning = dcCurrent !== null && batteryVoltage === '12' && dcCurrent > 80;

  const copyResult = async () => {
    if (recommendedContinuous !== null) {
      const parts = [`Continuous estimate: ${recommendedContinuous.toFixed(0)} W`];
      if (estimatedVa !== null) parts.push(`Estimated VA: ${estimatedVa.toFixed(0)} VA`);
      if (recommendedSurge !== null) parts.push(`Surge estimate: ${recommendedSurge.toFixed(0)} W`);
      if (dcCurrent !== null) parts.push(`Battery-side current: ${dcCurrent.toFixed(1)} A`);
      await navigator.clipboard.writeText(parts.join(' | '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clear = () => {
    setContinuousLoad('');
    setSurgeLoad('');
    setMargin('');
    setEfficiency('');
    setPowerFactor('');
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not professional engineering or electrical advice. Always follow local regulations and consult a qualified professional for real installations.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Use case</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(USE_CASE_LABELS) as UseCase[]).map((key) => (
            <button
              key={key}
              onClick={() => setUseCase(key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-left ${
                useCase === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {USE_CASE_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {useCase === 'vfd' ? (
        <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 flex gap-2 items-start">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Motor/VFD sizing depends on motor type, starting current, duty cycle and manufacturer specifications. This tool does not replace VFD selection.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Total continuous AC load (W)</label>
              <input
                type="number"
                value={continuousLoad}
                onChange={(e) => setContinuousLoad(e.target.value)}
                placeholder="1000"
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Surge/startup load (W) - optional</label>
              <input
                type="number"
                value={surgeLoad}
                onChange={(e) => setSurgeLoad(e.target.value)}
                placeholder="2500"
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Planning margin (%), default 25%</label>
              <input
                type="number"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                placeholder="25"
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Inverter efficiency (%), default 90%</label>
              <input
                type="number"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                placeholder="90"
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
              />
            </div>
            {useCase !== 'gridTie' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Battery system voltage</label>
                <select
                  value={batteryVoltage}
                  onChange={(e) => setBatteryVoltage(e.target.value as BatteryVoltage)}
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
                >
                  <option value="12">12V</option>
                  <option value="24">24V</option>
                  <option value="48">48V</option>
                </select>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Power factor for VA - optional</label>
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
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {useCase === 'gridTie'
                ? 'Grid-tie inverter selection also depends on PV string voltage/current, MPPT range, clipping strategy, utility rules and manufacturer limits.'
                : 'Single-phase and three-phase behavior, surge duration and manufacturer overload ratings vary. Check the inverter datasheet before selecting hardware.'}
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
            {recommendedContinuous !== null && (
              <button
                onClick={copyResult}
                className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {recommendedContinuous !== null && (
            <div className="space-y-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
                  <p className="text-sm text-green-600 dark:text-green-400">Estimated continuous rating</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">{recommendedContinuous.toFixed(0)} W</p>
                </div>
                {estimatedVa !== null && (
                  <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
                    <p className="text-sm text-blue-600 dark:text-blue-400">Estimated apparent power</p>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{estimatedVa.toFixed(0)} VA</p>
                  </div>
                )}
                {recommendedSurge !== null && (
                  <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-center">
                    <p className="text-sm text-amber-600 dark:text-amber-400">Surge rating to check</p>
                    <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{recommendedSurge.toFixed(0)} W</p>
                  </div>
                )}
                {dcCurrent !== null && (
                  <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20 text-center">
                    <p className="text-sm text-purple-600 dark:text-purple-400">Estimated battery-side current</p>
                    <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{dcCurrent.toFixed(1)} A</p>
                  </div>
                )}
              </div>
              {highCurrentWarning && (
                <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This is a high current for a 12V battery system. Consider voltage, cabling, protection devices, and equipment ratings carefully.
                  </p>
                </div>
              )}
              <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                Formulas: inverter W = continuous load x (1 + margin). DC current = AC load W / (battery voltage x efficiency).
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
