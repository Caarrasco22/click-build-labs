'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

export function PercentageGradeCalculator() {
  const [pointsEarned, setPointsEarned] = useState('');
  const [pointsTotal, setPointsTotal] = useState('');
  const [result, setResult] = useState<{ percentage: number; letter: string } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const getLetterGrade = (pct: number): string => {
    if (pct >= 97) return 'A+';
    if (pct >= 93) return 'A';
    if (pct >= 90) return 'A-';
    if (pct >= 87) return 'B+';
    if (pct >= 83) return 'B';
    if (pct >= 80) return 'B-';
    if (pct >= 77) return 'C+';
    if (pct >= 73) return 'C';
    if (pct >= 70) return 'C-';
    if (pct >= 67) return 'D+';
    if (pct >= 63) return 'D';
    if (pct >= 60) return 'D-';
    return 'F';
  };

  const calculate = () => {
    setError('');
    setResult(null);

    const earned = parseFloat(pointsEarned);
    const total = parseFloat(pointsTotal);

    if (isNaN(earned) || isNaN(total)) {
      setError('Please enter valid numbers for both fields.');
      return;
    }

    if (total === 0) {
      setError('Total points cannot be zero.');
      return;
    }

    if (earned < 0 || total < 0) {
      setError('Points cannot be negative.');
      return;
    }

    const percentage = (earned / total) * 100;
    const letter = getLetterGrade(percentage);
    setResult({ percentage, letter });
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(`${result.percentage.toFixed(2)}% (${result.letter})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Points Earned</label>
          <input
            type="number"
            value={pointsEarned}
            onChange={(e) => { setPointsEarned(e.target.value); setResult(null); setError(''); }}
            placeholder="e.g. 85"
            step="any"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Points Total</label>
          <input
            type="number"
            value={pointsTotal}
            onChange={(e) => { setPointsTotal(e.target.value); setResult(null); setError(''); }}
            placeholder="e.g. 100"
            step="any"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Calculate
        </button>
        <button
          onClick={() => { setPointsEarned(''); setPointsTotal(''); setResult(null); setError(''); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result && (
          <button
            onClick={copyResult}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Your Score</p>
          <p className="text-4xl font-bold text-green-700 dark:text-green-300">{result.percentage.toFixed(2)}%</p>
          <p className="text-2xl text-green-600/70 dark:text-green-400/70 mt-1">Grade: {result.letter}</p>
        </div>
      )}
    </div>
  );
}