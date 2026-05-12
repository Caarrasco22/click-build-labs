'use client';

import { useState } from 'react';
import { Clock, Plus, Minus, Copy } from 'lucide-react';

export function AddSubtractTimeCalculator() {
  const [time, setTime] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [result, setResult] = useState('');

  const calculate = () => {
    if (!time) {
      setResult('');
      return;
    }

    const [h, m] = time.split(':').map(Number);
    const addHours = parseInt(hours) || 0;
    const addMinutes = parseInt(minutes) || 0;

    let totalMinutes = h * 60 + m;

    if (operation === 'add') {
      totalMinutes += addHours * 60 + addMinutes;
    } else {
      totalMinutes -= addHours * 60 + addMinutes;
    }

    if (totalMinutes < 0) totalMinutes += 24 * 60;
    if (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;

    const resultHours = Math.floor(totalMinutes / 60);
    const resultMinutes = totalMinutes % 60;

    setResult(`${String(resultHours).padStart(2, '0')}:${String(resultMinutes).padStart(2, '0')}`);
  };

  const copyResult = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Starting Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => { setTime(e.target.value); setResult(''); }}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Add or Subtract</label>
        <div className="flex gap-2">
          <button
            onClick={() => { setOperation('add'); setResult(''); }}
            className={`px-4 py-2 rounded-lg border ${
              operation === 'add'
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
            }`}
          >
            <Plus className="h-4 w-4 inline mr-1" />
            Add
          </button>
          <button
            onClick={() => { setOperation('subtract'); setResult(''); }}
            className={`px-4 py-2 rounded-lg border ${
              operation === 'subtract'
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
            }`}
          >
            <Minus className="h-4 w-4 inline mr-1" />
            Subtract
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hours</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => { setHours(e.target.value); setResult(''); }}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Minutes</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => { setMinutes(e.target.value); setResult(''); }}
            placeholder="0"
            min="0"
            max="59"
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
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Result</p>
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{result}</p>
          <button onClick={copyResult} className="mt-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
