'use client';

import { useState } from 'react';
import { Briefcase, Copy } from 'lucide-react';

export function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{ calendarDays: number; businessDays: number } | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      setResult(null);
      return;
    }

    let businessDays = 0;
    let calendarDays = 0;
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      calendarDays++;
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    setResult({ calendarDays, businessDays });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`Calendar days: ${result.calendarDays}, Business days: ${result.businessDays}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Briefcase className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Calendar Days</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{result.calendarDays}</p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Business Days</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{result.businessDays}</p>
            <button onClick={copyResult} className="mt-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
              <Copy className="h-4 w-4 inline mr-1" />
              Copy
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Business days exclude weekends (Sat/Sun). Local holidays are not excluded as this tool does not use external APIs.
      </p>
    </div>
  );
}