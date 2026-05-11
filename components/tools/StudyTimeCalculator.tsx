'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function StudyTimeCalculator() {
  const [totalHours, setTotalHours] = useState('');
  const [daysAvailable, setDaysAvailable] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [result, setResult] = useState<{ daysNeeded: number; hoursPerDay: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const total = parseFloat(totalHours);
    const days = parseFloat(daysAvailable);
    const hpd = parseFloat(hoursPerDay);

    if (!isNaN(hpd) && hpd > 0 && !isNaN(total) && total > 0) {
      const daysNeeded = Math.ceil(total / hpd);
      setResult({ daysNeeded, hoursPerDay: hpd });
    } else if (!isNaN(days) && days > 0 && !isNaN(total) && total > 0) {
      const calculatedHours = Math.ceil(total / days);
      setResult({ daysNeeded: days, hoursPerDay: calculatedHours });
    } else {
      setResult(null);
    }
  };

  const copyResult = async () => {
    if (result) {
      const text = `Study ${result.hoursPerDay} hours/day for ${result.daysNeeded} day(s) to complete ${totalHours} hours of study.`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Total Hours Needed</label>
          <input
            type="number"
            value={totalHours}
            onChange={(e) => { setTotalHours(e.target.value); setResult(null); }}
            placeholder="e.g. 40"
            min="0"
            step="0.5"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Days Available</label>
            <input
              type="number"
              value={daysAvailable}
              onChange={(e) => { setDaysAvailable(e.target.value); setResult(null); }}
              placeholder="e.g. 10"
              min="1"
              className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hours Per Day (optional)</label>
            <input
              type="number"
              value={hoursPerDay}
              onChange={(e) => { setHoursPerDay(e.target.value); setResult(null); }}
              placeholder="e.g. 4"
              min="0.5"
              step="0.5"
              className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Leave "Hours Per Day" empty to calculate how many hours you need per day based on days available.
      </p>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Calculate
        </button>
        <button
          onClick={() => { setTotalHours(''); setDaysAvailable(''); setHoursPerDay(''); setResult(null); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result && (
          <button
            onClick={copyResult}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Study Plan</p>
          <p className="text-4xl font-bold text-green-700 dark:text-green-300">{result.hoursPerDay} hours/day</p>
          <p className="text-lg text-green-600/70 dark:text-green-400/70 mt-1">for {result.daysNeeded} day(s)</p>
        </div>
      )}
    </div>
  );
}