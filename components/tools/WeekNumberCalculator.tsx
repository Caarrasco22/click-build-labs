'use client';

import { useState } from 'react';
import { Calendar, Copy } from 'lucide-react';

export function WeekNumberCalculator() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<{ weekNumber: number; isoYear: number; dayOfWeek: string } | null>(null);

  const calculate = () => {
    if (!date) {
      setResult(null);
      return;
    }

    const d = new Date(date);
    const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });

    const thursday = new Date(d);
    thursday.setDate(d.getDate() + (4 - d.getDay()) % 7);
    const isoYear = thursday.getFullYear();
    const isoWeek = Math.ceil(((thursday.getTime() - new Date(isoYear, 0, 1).getTime()) / 86400000 + 1) / 7);

    setResult({ weekNumber: isoWeek, isoYear, dayOfWeek });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`Week ${result.weekNumber}, ${result.isoYear}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => { setDate(e.target.value); setResult(null); }}
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

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">ISO Week Number</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{result.weekNumber}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">ISO Year</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">{result.isoYear}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Day of Week</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">{result.dayOfWeek}</p>
            </div>
          </div>
          <button onClick={copyResult} className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
            ISO week starts on Monday. The first week of the year is the week containing the first Thursday.
          </p>
        </div>
      )}
    </div>
  );
}