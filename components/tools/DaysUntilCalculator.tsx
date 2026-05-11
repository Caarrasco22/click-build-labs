'use client';

import { useState } from 'react';
import { Calendar, Copy } from 'lucide-react';

export function DaysUntilCalculator() {
  const [targetDate, setTargetDate] = useState('');
  const [result, setResult] = useState<{ days: number; weeks: number; months: string } | null>(null);
  const [isPast, setIsPast] = useState(false);

  const calculate = () => {
    if (!targetDate) {
      setResult(null);
      setIsPast(false);
      return;
    }

    const target = new Date(targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diff = target.getTime() - today.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    setIsPast(days < 0);

    if (days < 0) {
      setResult(null);
      return;
    }

    const weeks = Math.floor(days / 7);
    const months = days >= 30 ? `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''}` : '';

    setResult({ days, weeks, months });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`${result.days} days (${result.weeks} weeks)`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Target Date</label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Calendar className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {isPast && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">This date has already passed.</p>
        </div>
      )}

      {result && !isPast && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Days Remaining</p>
          <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{result.days}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Approximately {result.weeks} weeks
            {result.months ? ` (${result.months})` : ''}
          </p>
          <button onClick={copyResult} className="mt-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}