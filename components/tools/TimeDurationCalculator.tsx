'use client';

import { useState } from 'react';
import { Clock, Copy } from 'lucide-react';

export function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [result, setResult] = useState<{ hours: number; minutes: number; totalMinutes: number } | null>(null);

  const calculate = () => {
    if (!startTime || !endTime) {
      setResult(null);
      return;
    }

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;

    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }

    const diff = endMinutes - startMinutes;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    setResult({ hours, minutes, totalMinutes: diff });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`${result.hours}h ${result.minutes}m (${result.totalMinutes} minutes)`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => { setStartTime(e.target.value); setResult(null); }}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => { setEndTime(e.target.value); setResult(null); }}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Clock className="h-4 w-4 inline mr-2" />
        Calculate Duration
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Duration</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                {result.hours}h {result.minutes}m
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Minutes</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">{result.totalMinutes} minutes</p>
            </div>
          </div>
          <button onClick={copyResult} className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
