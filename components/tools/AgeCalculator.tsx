'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [copied, setCopied] = useState(false);

  const calculateAge = (dateStr: string) => {
    const birth = new Date(dateStr);
    const today = new Date();
    if (isNaN(birth.getTime()) || birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    const daysUntilBirthday = nextBirthday > today
      ? Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      : Math.ceil((new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate()).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, daysUntilBirthday };
  };

  const age = birthDate ? calculateAge(birthDate) : null;
  const isFutureDate = birthDate && new Date(birthDate) > new Date();

  const yearsStr = age ? `${age.years}` : '';
  const monthsStr = age ? `${age.months}` : '';
  const daysStr = age ? `${age.days}` : '';
  const daysBdayStr = age ? `${age.daysUntilBirthday}` : '';

  const copyResult = async () => {
    if (yearsStr) {
      await navigator.clipboard.writeText(`${yearsStr} years, ${monthsStr} months, ${daysStr} days`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Date of Birth</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setBirthDate('')}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {yearsStr && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {isFutureDate && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300">Date of birth cannot be in the future.</p>
        </div>
      )}

      {age && !isFutureDate && (
        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-2">Your Age</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">
              {yearsStr} years, {monthsStr} months, {daysStr} days
            </p>
          </div>
          <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-center">
            <p className="text-sm text-amber-600 dark:text-amber-400">Days Until Next Birthday</p>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{daysBdayStr} days</p>
          </div>
        </div>
      )}
    </div>
  );
}