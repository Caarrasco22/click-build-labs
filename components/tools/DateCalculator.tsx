'use client';

import { useState } from 'react';
import { Calendar, Plus, Minus, Copy } from 'lucide-react';

export function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('days');
  const [result, setResult] = useState('');

  const calculate = () => {
    if (!startDate || !value) {
      setResult('');
      return;
    }

    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setResult('Please enter a valid number');
      return;
    }

    const date = new Date(startDate);
    let newDate: Date;

    switch (unit) {
      case 'days':
        newDate = new Date(date.getTime() + num * 24 * 60 * 60 * 1000);
        break;
      case 'weeks':
        newDate = new Date(date.getTime() + num * 7 * 24 * 60 * 60 * 1000);
        break;
      case 'months':
        newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + num);
        break;
      case 'years':
        newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + num);
        break;
      default:
        return;
    }

    setResult(newDate.toISOString().split('T')[0]);
  };

  const copyResult = () => {
    if (result) navigator.clipboard.writeText(result);
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Add/Subtract</label>
          <div className="flex gap-2">
            <button
              onClick={() => setValue(String(Math.abs(parseInt(value) || 0)))}
              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Plus className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Amount"
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Unit</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
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
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Result</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{result}</p>
          <button onClick={copyResult} className="mt-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}