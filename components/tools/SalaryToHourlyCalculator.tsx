'use client';

import { useState } from 'react';
import { DollarSign, Clock } from 'lucide-react';

export function SalaryToHourlyCalculator() {
  const [annualSalary, setAnnualSalary] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');
  const [result, setResult] = useState<{ hourly: number; monthly: number } | null>(null);

  const calculate = () => {
    const salary = parseFloat(annualSalary);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);
    if (isNaN(salary) || isNaN(hours) || isNaN(weeks) || salary <= 0 || hours <= 0 || weeks <= 0) {
      setResult(null);
      return;
    }
    const totalHours = hours * weeks;
    const hourly = salary / totalHours;
    const monthly = salary / 12;
    setResult({ hourly, monthly });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Annual Salary ($)</label>
        <input
          type="number"
          value={annualSalary}
          onChange={(e) => setAnnualSalary(e.target.value)}
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
            onChange={(e) => setHoursPerWeek(e.target.value)}
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
            onChange={(e) => setWeeksPerYear(e.target.value)}
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
        <DollarSign className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Hourly Rate</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">${result.hourly.toFixed(2)}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">per hour</p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Monthly (avg)</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">${result.monthly.toFixed(2)}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">per month</p>
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Estimates based on gross income before taxes. Your actual hourly rate after taxes may differ.
      </p>
    </div>
  );
}