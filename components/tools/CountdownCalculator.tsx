'use client';

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export function CountdownCalculator() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    if (!targetDate || !targetTime) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCountdown(null);
      setIsPast(false);
      return;
    }

    const updateCountdown = () => {
      const target = new Date(`${targetDate}T${targetTime}`);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPast(true);
        setCountdown(null);
        return;
      }

      setIsPast(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Target Date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Target Time</label>
          <input
            type="time"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      {isPast && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">This date and time have already passed.</p>
        </div>
      )}

      {countdown && !isPast && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-center gap-1 mb-4">
            <Timer className="h-5 w-5 text-zinc-400" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Time Remaining</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{countdown.days}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Days</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{countdown.hours}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Hours</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{countdown.minutes}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Minutes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{countdown.seconds}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Seconds</p>
            </div>
          </div>
        </div>
      )}

      {countdown && !isPast && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
          Live countdown - updates every second
        </p>
      )}
    </div>
  );
}
