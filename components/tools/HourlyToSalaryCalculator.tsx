'use client';

import { useState } from 'react';
import { Clock, DollarSign } from 'lucide-react';

export function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');
  const [result, setResult] = useState<{ weekly: number; monthly: number; annual: number } | null>(null);

  const calculate = () => {
    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);
    if (isNaN(rate) || isNaN(hours) || isNaN(weeks) || rate <= 0 || hours <= 0 || weeks <= 0) {
      setResult(null);
      return;
    }
    const weekly = rate * hours;
    const annual = weekly * weeks;
    const monthly = annual / 12;
    setResult({ weekly, monthly, annual });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hourly Rate ($)</label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => { setHourlyRate(e.target.value); setResult(null); }}
          placeholder="0.00"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hours per Week</label>
          <input
            type="number"
            value={hoursPerWeek}
            onChange={(e) => { setHoursPerWeek(e.target.value); setResult(null); }}
            min="1"
            max="168"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Weeks per Year</label>
          <input
            type="number"
            value={weeksPerYear}
            onChange={(e) => { setWeeksPerYear(e.target.value); setResult(null); }}
            min="1"
            max="52"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Clock className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Weekly</p>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">${result.weekly.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Monthly (avg)</p>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">${result.monthly.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Annual</p>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">${result.annual.toFixed(2)}</p>
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Estimates based on gross income before taxes. Your actual take-home pay will be lower after taxes and deductions.
      </p>
    </div>
  );
}