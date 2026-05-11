'use client';

import { useState } from 'react';
import { Calendar, Copy } from 'lucide-react';

export function CalendarWeekCalculator() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [week, setWeek] = useState('');
  const [result, setResult] = useState<{ start: string; end: string } | null>(null);

  const calculate = () => {
    if (!year || !week) {
      setResult(null);
      return;
    }

    const weekNum = parseInt(week);
    if (isNaN(weekNum) || weekNum < 1 || weekNum > 53) {
      setResult(null);
      return;
    }

    const jan4 = new Date(parseInt(year), 0, 4);
    const dayOfWeek = jan4.getDay();
    const mondayOffset = dayOfWeek <= 1 ? 1 - dayOfWeek : 8 - dayOfWeek;
    const firstMonday = new Date(jan4.getTime() + mondayOffset * 24 * 60 * 60 * 1000);

    const weekStart = new Date(firstMonday.getTime() + (weekNum - 1) * 7 * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

    setResult({
      start: weekStart.toISOString().split('T')[0],
      end: weekEnd.toISOString().split('T')[0],
    });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`${result.start} to ${result.end}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2024"
            min="1900"
            max="2100"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">ISO Week Number</label>
          <input
            type="number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="1-53"
            min="1"
            max="53"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Calendar className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Week Range</p>
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            {result.start} to {result.end}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Monday to Sunday</p>
          <button onClick={copyResult} className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}