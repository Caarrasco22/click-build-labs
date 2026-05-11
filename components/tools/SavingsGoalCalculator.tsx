'use client';

import { useState } from 'react';
import { Target, Copy } from 'lucide-react';

export function SavingsGoalCalculator() {
  const [goal, setGoal] = useState('');
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [result, setResult] = useState<{ months: number; years: number } | null>(null);

  const calculate = () => {
    const g = parseFloat(goal);
    const i = parseFloat(initial) || 0;
    const m = parseFloat(monthly);
    if (isNaN(g) || isNaN(m) || m <= 0) {
      setResult(null);
      return;
    }
    if (i >= g) {
      setResult({ months: 0, years: 0 });
      return;
    }
    const remaining = g - i;
    const months = Math.ceil(remaining / m);
    setResult({ months, years: months / 12 });
  };

  const copyResult = () => {
    if (result) {
      if (result.months === 0) {
        navigator.clipboard.writeText('Goal already reached!');
      } else {
        navigator.clipboard.writeText(`${result.months} months (${result.years.toFixed(1)} years)`);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Savings Goal ($)</label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="0.00"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Initial Savings ($)</label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            placeholder="0 (optional)"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Monthly Contribution ($)</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Target className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          {result.months === 0 ? (
            <p className="text-lg text-green-600 dark:text-green-400 font-medium">Goal already reached with initial savings!</p>
          ) : (
            <>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Time to Reach Goal</p>
              <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{result.months} months</p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-1">({result.years.toFixed(1)} years)</p>
            </>
          )}
          <button onClick={copyResult} className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-3">
        Results are estimates for informational purposes only and are not financial advice.
      </p>
    </div>
  );
}